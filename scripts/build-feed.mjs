// Builds and signs the live feed phones download (docs/CONTRACTS.md Section 5b, D-050):
//   web/public/feed/v1/ruko-feed.json      approved cards + extra detection data + practice questions
//   web/public/feed/v1/ruko-feed.json.sig  ECDSA P-256 / SHA-256 signature of the exact bytes (Base64, DER)
//
// Run on the owner's computer after approving a card or a detection change:  npm run feed
// The private key never enters the repo: its path is RUKO_FEED_KEY in the local ../.env (or the environment).
// Refuses to sign unless the engine tests ran after the last change to cards/detection.json and found 0 false alarms.
import { createSign, createPublicKey, createVerify } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const web = join(dirname(fileURLToPath(import.meta.url)), "..");
const root = join(web, "..");
const out = join(web, "public", "feed", "v1");
const feedFile = join(out, "ruko-feed.json");
const sigFile = join(out, "ruko-feed.json.sig");

function fail(message) {
  console.error(`build-feed: ${message}`);
  process.exit(1);
}

function keyPath() {
  if (process.env.RUKO_FEED_KEY) return process.env.RUKO_FEED_KEY;
  const env = join(root, ".env");
  if (existsSync(env)) {
    const line = readFileSync(env, "utf8").split(/\r?\n/).find((l) => l.startsWith("RUKO_FEED_KEY="));
    if (line) return line.slice("RUKO_FEED_KEY=".length).trim();
  }
  return null;
}

// 1. The gate: the whole message collection must have passed after the last detection change.
const detectionPath = join(root, "cards", "detection.json");
const reportPath = join(root, "docs", "MESSAGE_TEST_REPORT.md");
if (!existsSync(reportPath)) fail("no docs/MESSAGE_TEST_REPORT.md. Run: cd android && ./gw :engine:test");
if (statSync(reportPath).mtimeMs < statSync(detectionPath).mtimeMs) {
  fail("cards/detection.json changed after the last test run. Run: cd android && ./gw :engine:test");
}
const report = readFileSync(reportPath, "utf8");
if (!/False alarms on genuine messages:\*\* 0 of/.test(report)) fail("the last test run had false alarms; fix them first");

// 2. What goes in: approved cards only, the detection data, the practice questions.
const cards = JSON.parse(readFileSync(join(root, "cards", "scam-cards.json"), "utf8")).cards.filter((c) => c.status === "approved");
const detection = JSON.parse(readFileSync(detectionPath, "utf8"));
delete detection.note;
delete detection.format;
const practice = JSON.parse(readFileSync(join(web, "lib", "spot-the-scam.json"), "utf8")).items;
const content = { cards, detection, practice };

// 3. A new sequence number only when something changed.
let sequence = 1;
if (existsSync(feedFile)) {
  const previous = JSON.parse(readFileSync(feedFile, "utf8"));
  const same = JSON.stringify({ cards: previous.cards, detection: previous.detection, practice: previous.practice }) === JSON.stringify(content);
  if (same) {
    console.log(`build-feed: nothing changed (sequence ${previous.sequence}), feed kept as it is`);
    process.exit(0);
  }
  sequence = previous.sequence + 1;
}

// 4. Sign the exact bytes.
const path = keyPath();
if (!path || !existsSync(path)) fail("signing key not found. Set RUKO_FEED_KEY in ../.env to the private key file (outside the repo)");
const privateKey = readFileSync(path, "utf8");
const feed = JSON.stringify({ format: 1, sequence, published: new Date().toISOString(), ...content }, null, 1) + "\n";
const bytes = Buffer.from(feed, "utf8");
const signature = createSign("SHA256").update(bytes).sign(privateKey).toString("base64");

// The app's public key must accept it, or phones would ignore the feed.
const appKey = readFileSync(join(root, "android", "app", "src", "main", "assets", "feed_public_key.pem"), "utf8");
if (!createVerify("SHA256").update(bytes).verify(createPublicKey(appKey), Buffer.from(signature, "base64"))) {
  fail("the app's public key doesn't match the signing key; phones would reject this feed");
}

mkdirSync(out, { recursive: true });
writeFileSync(feedFile, bytes);
writeFileSync(sigFile, signature + "\n");
console.log(`build-feed: sequence ${sequence}: ${cards.length} approved cards, ${practice.length} practice questions, signed`);
