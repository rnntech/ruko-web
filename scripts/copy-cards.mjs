// Copies cards/scam-cards.json (the only copy we edit, docs/CONTRACTS.md Section 5) into the website:
//  - lib/scam-cards.json: every card, for the pages (drafts show only in `npm run dev`).
//  - public/scam-cards.json: approved cards only, the public file phones can download later (D-031).
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
  console.log(`copy-cards: ${file.cards.length} cards (${approved.cards.length} approved)`);
}
