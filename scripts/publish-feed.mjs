// Uploads the signed live feed to Supabase Storage (docs/CONTRACTS.md Section 5b, D-106), where phones and the website
// read it, so an update needs no website redeploy:
//   <SUPABASE_URL>/storage/v1/object/public/feed/v1/ruko-feed.json   (+ .sig)
//
// Run on the owner's computer after `npm run feed`:  npm run publish-feed
// Needs SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the local ../.env (or the environment); never in git or a doc.
// Creates the public bucket the first time, uploads the signature after the feed, then downloads both back and checks
// the signature with the app's public key, so a half-finished upload is caught here and not on phones.
import { createPublicKey, createVerify } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const web = join(dirname(fileURLToPath(import.meta.url)), "..");
const root = join(web, "..");
const BUCKET = "feed";
const FILES = ["v1/ruko-feed.json", "v1/ruko-feed.json.sig"];

function fail(message) {
  console.error(`publish-feed: ${message}`);
  process.exit(1);
}

function env(name) {
  if (process.env[name]) return process.env[name].trim();
  const file = join(root, ".env");
  if (!existsSync(file)) return "";
  const line = readFileSync(file, "utf8").split(/\r?\n/).find((l) => l.startsWith(name + "="));
  return line ? line.slice(name.length + 1).trim().replace(/^"|"$/g, "") : "";
}

const url = env("SUPABASE_URL").replace(/\/$/, "");
const key = env("SUPABASE_SERVICE_ROLE_KEY");
if (!url) fail("SUPABASE_URL is not in ../.env");
if (!key) fail("SUPABASE_SERVICE_ROLE_KEY is not in ../.env (Supabase → Project Settings → API keys; local .env only)");

// New secret keys go in `apikey` only; a legacy service_role JWT also goes in Authorization.
const auth = { apikey: key, ...(key.startsWith("eyJ") ? { Authorization: `Bearer ${key}` } : {}) };

const feedPath = join(web, "public", "feed", "v1", "ruko-feed.json");
if (!existsSync(feedPath) || !existsSync(feedPath + ".sig")) fail("no signed feed. Run: npm run feed");
const feed = readFileSync(feedPath);
const sig = readFileSync(feedPath + ".sig");
const sequence = JSON.parse(feed.toString("utf8")).sequence;

// 1. The bucket: public (anyone can read, only this key can write), small JSON and text files only.
const bucket = await fetch(`${url}/storage/v1/bucket/${BUCKET}`, { headers: auth });
if (bucket.status === 404 || bucket.status === 400) {
  const made = await fetch(`${url}/storage/v1/bucket`, {
    method: "POST",
    headers: { ...auth, "content-type": "application/json" },
    body: JSON.stringify({ id: BUCKET, name: BUCKET, public: true, file_size_limit: 2 * 1024 * 1024, allowed_mime_types: ["application/json", "text/plain"] }),
  });
  if (!made.ok) fail(`couldn't create the bucket: ${made.status} ${await made.text()}`);
  console.log(`publish-feed: created the public bucket "${BUCKET}"`);
} else if (!bucket.ok) {
  fail(`couldn't read the bucket: ${bucket.status} ${await bucket.text()}`);
}

// 2. Upload: the feed first, then its signature. A short cache, so phones and the site see a new feed within a minute.
async function upload(path, body, type) {
  const res = await fetch(`${url}/storage/v1/object/${BUCKET}/${path}`, {
    method: "POST",
    headers: { ...auth, "content-type": type, "cache-control": "max-age=60", "x-upsert": "true" },
    body,
  });
  if (!res.ok) fail(`upload of ${path} failed: ${res.status} ${await res.text()}`);
}
await upload(FILES[0], feed, "application/json");
await upload(FILES[1], sig, "text/plain");

// 3. Read it back the way a phone does (plain GET of the public URL) and check the signature.
const publicUrl = `${url}/storage/v1/object/public/${BUCKET}/${FILES[0]}`;
const [gotFeed, gotSig] = await Promise.all(
  [publicUrl, publicUrl + ".sig"].map(async (u) => {
    const r = await fetch(u, { cache: "no-store" });
    if (!r.ok) fail(`couldn't read back ${u}: ${r.status}`);
    return Buffer.from(await r.arrayBuffer());
  }),
);
const appKey = readFileSync(join(root, "android", "app", "src", "main", "assets", "feed_public_key.pem"), "utf8");
const ok = createVerify("SHA256").update(gotFeed).verify(createPublicKey(appKey), Buffer.from(gotSig.toString("utf8").trim(), "base64"));
if (!ok) fail("the copy in the bucket doesn't pass the signature check (a cache may still hold the old file; run again in a minute)");
console.log(`publish-feed: sequence ${sequence} is live at ${publicUrl}`);
