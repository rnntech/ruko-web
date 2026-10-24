// Uploads (or replaces) the two app downloads in Supabase Storage, so an updated APK reaches testers without a website
// redeploy or a GitHub push (D-112). The links never change:
//   Ruko Lite:  <SUPABASE_URL>/storage/v1/object/public/downloads/ruko-lite.apk   (the website's /download/ruko-lite.apk
//               redirects here, RUKO_LITE_URL)
//   Full app:   <SUPABASE_URL>/storage/v1/object/public/downloads/r/<random>/ruko-full.apk   (REVIEWER_APK_PATH: given
//               only after a valid reviewer code, D-103)
//
// Run on the owner's computer after building:  npm run publish-apks [-- --lite <apk>] [-- --full <apk>]
//   --new-reviewer-path   a new random folder for the full app (the old link stops working)
//   --same-version        allow re-uploading an APK whose version isn't higher (a fix to the same build)
// Android only installs an update over the old app if its versionCode is higher and it is signed with the same key, so
// the script reads each APK's real version (aapt2 from the Android SDK) and refuses one that isn't newer than the copy
// online. Needs SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in ../.env; writes RUKO_LITE_URL and REVIEWER_APK_PATH into
// web/.env.local (copy both to Vercel's project settings). Never prints the full app's link.
import { execFileSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const web = join(dirname(fileURLToPath(import.meta.url)), "..");
const root = join(web, "..");
const BUCKET = "downloads";
const APK_TYPE = "application/vnd.android.package-archive";

function fail(message) {
  console.error(`publish-apks: ${message}`);
  process.exit(1);
}

function envFrom(file, name) {
  if (!existsSync(file)) return "";
  const line = readFileSync(file, "utf8").split(/\r?\n/).find((l) => l.startsWith(name + "="));
  return line ? line.slice(name.length + 1).trim().replace(/^"|"$/g, "") : "";
}
const env = (name) => (process.env[name] || envFrom(join(root, ".env"), name)).trim();
const localEnv = join(web, ".env.local");

function setLocal(name, value) {
  const lines = existsSync(localEnv) ? readFileSync(localEnv, "utf8").split(/\r?\n/) : [];
  const i = lines.findIndex((l) => l.startsWith(name + "="));
  if (i >= 0) lines[i] = `${name}=${value}`;
  else lines.push(`${name}=${value}`);
  writeFileSync(localEnv, lines.join("\n").replace(/\n*$/, "\n"));
}

const args = process.argv.slice(2);
const arg = (flag) => {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : null;
};
const android = join(root, "android", "app", "build", "outputs", "apk");
const files = {
  lite: arg("--lite") ?? join(android, "lite", "debug", "app-lite-debug.apk"),
  full: arg("--full") ?? join(android, "full", "debug", "app-full-debug.apk"),
};
for (const [k, f] of Object.entries(files)) if (!existsSync(f)) fail(`${k}: no APK at ${f}`);

const url = env("SUPABASE_URL").replace(/\/$/, "");
const key = env("SUPABASE_SERVICE_ROLE_KEY");
if (!url || !key) fail("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be in ../.env");
const auth = { apikey: key, ...(key.startsWith("eyJ") ? { Authorization: `Bearer ${key}` } : {}) };
const publicBase = `${url}/storage/v1/object/public/${BUCKET}`;

// 1. The real version inside each APK, read by aapt2 from the Android SDK (android/local.properties sdk.dir).
function aapt2() {
  const props = join(root, "android", "local.properties");
  const line = existsSync(props) ? readFileSync(props, "utf8").split(/\r?\n/).find((l) => l.startsWith("sdk.dir=")) : null;
  const sdk = (line ? line.slice(8) : process.env.ANDROID_HOME || "").replace(/\\:/g, ":").replace(/\\\\/g, "/").replace(/\\/g, "/");
  const tools = join(sdk, "build-tools");
  if (!sdk || !existsSync(tools)) fail("Android SDK build-tools not found (sdk.dir in android/local.properties)");
  const versions = readdirSync(tools).filter((v) => existsSync(join(tools, v, "aapt2.exe")) || existsSync(join(tools, v, "aapt2"))).sort();
  if (!versions.length) fail("no aapt2 in the Android SDK build-tools");
  const dir = join(tools, versions.at(-1));
  return existsSync(join(dir, "aapt2.exe")) ? join(dir, "aapt2.exe") : join(dir, "aapt2");
}
const tool = aapt2();
function versionOf(apk) {
  const out = execFileSync(tool, ["dump", "badging", apk], { encoding: "utf8" }).split(/\r?\n/)[0];
  const m = out.match(/versionCode='(\d+)' versionName='([^']*)'/);
  if (!m) fail(`couldn't read the version of ${apk}`);
  return { versionCode: Number(m[1]), versionName: m[2] };
}
const versions = { lite: versionOf(files.lite), full: versionOf(files.full) };

// 2. The bucket: public (anyone with the link can download), only this key can write, APKs only.
const bucket = await fetch(`${url}/storage/v1/bucket/${BUCKET}`, { headers: auth });
if (bucket.status === 404 || bucket.status === 400) {
  const made = await fetch(`${url}/storage/v1/bucket`, {
    method: "POST",
    headers: { ...auth, "content-type": "application/json" },
    body: JSON.stringify({ id: BUCKET, name: BUCKET, public: true, file_size_limit: 50 * 1024 * 1024, allowed_mime_types: [APK_TYPE, "application/json"] }),
  });
  if (!made.ok) fail(`couldn't create the bucket: ${made.status} ${await made.text()}`);
  console.log(`publish-apks: created the public bucket "${BUCKET}"`);
} else if (!bucket.ok) fail(`couldn't read the bucket: ${bucket.status} ${await bucket.text()}`);

// 3. Refuse an APK that isn't newer than the one online (Android would refuse to install it as an update).
const online = await fetch(`${publicBase}/versions.json`, { cache: "no-store" }).then((r) => (r.ok ? r.json() : {})).catch(() => ({}));
if (!args.includes("--same-version")) {
  for (const k of ["lite", "full"]) {
    const before = online[k]?.versionCode;
    if (before != null && versions[k].versionCode <= before) {
      fail(`${k}: versionCode ${versions[k].versionCode} isn't higher than the ${before} online. Raise versionCode in android/app/build.gradle.kts, rebuild, or pass --same-version to replace the same build.`);
    }
  }
}

// 4. Where the full app goes: the hidden folder already in use, or a new random one.
const current = envFrom(localEnv, "REVIEWER_APK_PATH");
let fullPath = current.startsWith(publicBase + "/r/") ? current.slice(publicBase.length + 1) : null;
if (!fullPath || args.includes("--new-reviewer-path")) fullPath = `r/${randomBytes(16).toString("hex")}/ruko-full.apk`;

async function upload(path, body, type) {
  const res = await fetch(`${url}/storage/v1/object/${BUCKET}/${path}`, {
    method: "POST",
    headers: { ...auth, "content-type": type, "cache-control": "max-age=300", "x-upsert": "true" },
    body,
  });
  if (!res.ok) fail(`upload of ${path.startsWith("r/") ? "the full app" : path} failed: ${res.status} ${await res.text()}`);
}
async function check(path, size) {
  const res = await fetch(`${publicBase}/${path}`, { method: "HEAD", cache: "no-store" });
  const length = Number(res.headers.get("content-length"));
  if (!res.ok || (length && length !== size)) fail(`${path.startsWith("r/") ? "the full app" : path} isn't downloadable yet (${res.status})`);
}

await upload("ruko-lite.apk", readFileSync(files.lite), APK_TYPE);
await upload(fullPath, readFileSync(files.full), APK_TYPE);
const stamp = new Date().toISOString();
await upload("versions.json", JSON.stringify({
  lite: { ...versions.lite, uploaded: stamp, bytes: statSync(files.lite).size },
  full: { ...versions.full, uploaded: stamp, bytes: statSync(files.full).size },
}, null, 1) + "\n", "application/json");
await check("ruko-lite.apk", statSync(files.lite).size);
await check(fullPath, statSync(files.full).size);

setLocal("RUKO_LITE_URL", `${publicBase}/ruko-lite.apk`);
setLocal("REVIEWER_APK_PATH", `${publicBase}/${fullPath}`);
const fresh = fullPath !== (current.startsWith(publicBase + "/r/") ? current.slice(publicBase.length + 1) : null);
console.log(`publish-apks: Lite ${versions.lite.versionName} (versionCode ${versions.lite.versionCode}) is live at ${publicBase}/ruko-lite.apk`);
console.log(`publish-apks: full ${versions.full.versionName} (versionCode ${versions.full.versionCode}) is live at the reviewer link${fresh ? " (a NEW link: update REVIEWER_APK_PATH in Vercel too)" : ""}`);
console.log("publish-apks: web/.env.local updated (RUKO_LITE_URL, REVIEWER_APK_PATH). Phones may see the old file for up to 5 minutes.");
