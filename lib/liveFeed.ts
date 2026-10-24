import { createPublicKey, createVerify } from "node:crypto";
import builtIn from "../public/feed/v1/ruko-feed.json";
import { type ScamCard, visibleCards } from "./cards";
import { FEED_PUBLIC_KEY } from "./feed-public-key";

/**
 * The scam cards the site shows, read live from the signed feed in Supabase Storage (D-106), the same file phones
 * download, so a new card reaches the site without a redeploy. Server only. Checked like the phone checks it: the
 * signature must match the app's public key and the sequence must not be older than the copy built into the site.
 * Then it is merged over the built-in cards (the feed wins for the same id, built-in cards stay: additive, like the
 * phone). Anything wrong (no address set, offline, bad signature, older file) means the built-in cards, as before.
 */
const FEED_URL = process.env.RUKO_FEED_URL;
const REFRESH_SECONDS = 3600;

type Feed = { format: number; sequence: number; cards: ScamCard[] };

async function fetchBytes(url: string): Promise<Buffer | null> {
  const res = await fetch(url, { next: { revalidate: REFRESH_SECONDS }, signal: AbortSignal.timeout(4000) });
  return res.ok ? Buffer.from(await res.arrayBuffer()) : null;
}

async function liveFeed(): Promise<Feed | null> {
  if (!FEED_URL) return null;
  try {
    const [bytes, sig] = await Promise.all([fetchBytes(FEED_URL), fetchBytes(FEED_URL + ".sig")]);
    if (!bytes || !sig) return null;
    const signed = createVerify("SHA256")
      .update(bytes)
      .verify(createPublicKey(FEED_PUBLIC_KEY), Buffer.from(sig.toString("utf8").trim(), "base64"));
    if (!signed) return null;
    const feed = JSON.parse(bytes.toString("utf8")) as Feed;
    if (feed.format !== 1 || !Array.isArray(feed.cards) || feed.sequence < builtIn.sequence) return null;
    return feed;
  } catch {
    return null;
  }
}

/** Every card the site shows, newest first: the live feed's approved cards over the built-in ones. */
export async function liveCards(): Promise<ScamCard[]> {
  const cards = visibleCards();
  const feed = await liveFeed();
  if (!feed) return cards;
  const byId = new Map(cards.map((c) => [c.id, c]));
  for (const card of feed.cards) if (card.status === "approved" && card.id && card.name?.en) byId.set(card.id, card);
  return [...byId.values()].sort((a, b) => b.added.localeCompare(a.added));
}
