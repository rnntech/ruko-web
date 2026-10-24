// Copies cards/scam-cards.json (the only copy we edit, docs/CONTRACTS.md Section 5) into the website:
//  - lib/scam-cards.json: every card, for the pages (drafts show only in `npm run dev`).
//  - public/scam-cards.json: approved cards only, the public file phones can download later (D-031).
//  - lib/sources.json: the trusted-source list (cards/sources.json, D-035) for the /scams page.
//  - lib/feed-public-key.ts: the app's feed public key, so the site checks the live feed's signature like phones (D-106).
// When deploying only web/ (e.g. Vercel), ../cards isn't there, so the copies already in web/ are used.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const web = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(web, "..", "cards", "scam-cards.json");

if (!existsSync(source)) {
  console.log("copy-cards: ../cards not found, keeping the existing copies");
} else {
  const file = JSON.parse(readFileSync(source, "utf8"));
  writeFileSync(join(web, "lib", "scam-cards.json"), JSON.stringify(file, null, 2) + "\n");
  const approved = { ...file, cards: file.cards.filter((c) => c.status === "approved") };
  delete approved.note;
  writeFileSync(join(web, "public", "scam-cards.json"), JSON.stringify(approved, null, 2) + "\n");
  writeFileSync(join(web, "lib", "sources.json"), readFileSync(join(web, "..", "cards", "sources.json"), "utf8"));
  const key = join(web, "..", "android", "app", "src", "main", "assets", "feed_public_key.pem");
  if (existsSync(key)) {
    const pem = readFileSync(key, "utf8").trim();
    writeFileSync(join(web, "lib", "feed-public-key.ts"), `// Copied from the app by scripts/copy-cards.mjs (D-106). Public: it only checks signatures.
export const FEED_PUBLIC_KEY = ${JSON.stringify(pem)};
`);
  }
  console.log(`copy-cards: ${file.cards.length} cards (${approved.cards.length} approved), sources list`);
}
