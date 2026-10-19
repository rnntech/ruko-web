import data from "./scam-cards.json";
import sourceList from "./sources.json";

/** Format: docs/CONTRACTS.md Section 5. Copied from cards/scam-cards.json by scripts/copy-cards.mjs. */
export type Lang = "en" | "hi" | "bn" | "mr" | "te" | "ta" | "gu" | "kn";
type Text = Partial<Record<Lang, string>> & { en: string };

export type ScamCard = {
  id: string;
  status: "draft" | "approved" | "retired" | string;
  added: string;
  notify?: boolean;
  name: Text;
  they_say: Text;
  they_ask: Text;
  red_flag: Text;
  do: Text;
  sources: { name: string; url: string }[];
};

/** The live site shows approved cards only; `npm run dev` also shows drafts, labelled (D-025, D-030). */
export const showDrafts = process.env.NODE_ENV !== "production";

export function visibleCards(): ScamCard[] {
  return (data.cards as ScamCard[])
    .filter((c) => c.status === "approved" || (showDrafts && c.status === "draft"))
    .sort((a, b) => b.added.localeCompare(a.added));
}

export function pretty(date: string): string {
  const d = new Date(`${date}T00:00:00Z`);
  return Number.isNaN(d.getTime())
    ? date
    : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

/** A wa.me link that opens WhatsApp's own share screen with the card as plain text. Ruko sees nothing. */
export function whatsappShareLink(card: ScamCard, pageUrl: string): string {
  const text = [
    `Scam going around: ${card.name.en}`,
    "",
    `They say: ${card.they_say.en}`,
    `They ask: ${card.they_ask.en}`,
    `Red flag: ${card.red_flag.en}`,
    `What to do: ${card.do.en}`,
    "",
    `Source: ${card.sources.map((s) => s.name).join(", ")}`,
    "If you lost money, call 1930 or go to cybercrime.gov.in.",
    `More: ${pageUrl}`,
  ].join("\n");
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

/** Trusted sources (cards/sources.json, D-035). */
export type TrustedSource = { name: string; domain: string; type: string; url?: string; public?: boolean; use?: string };
const sources = sourceList.sources as TrustedSource[];

/** Government and regulator portals people can visit themselves. */
export const safetyPortals = sources.filter((s) => s.public && s.url);

/** Newspapers, wire services, court reporters and fact-checkers we may cite. */
export const trustedOutlets = sources.filter((s) => ["news", "wire", "court", "fact_check"].includes(s.type)).map((s) => s.name);
