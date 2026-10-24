import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { visibleCards } from "@/lib/cards";
import { liveCards } from "@/lib/liveFeed";
import { ScamsPageBody, pageCount } from "../../ScamsPageBody";

/** Pages 2 and up (page 1 is /scams). Built for the built-in cards; a page the live feed adds is made on request. */
export function generateStaticParams() {
  return Array.from({ length: pageCount(visibleCards()) - 1 }, (_, i) => ({ n: String(i + 2) }));
}

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ n: string }> }): Promise<Metadata> {
  const { n } = await params;
  return { title: `Scams going around in India, page ${n}` };
}

export default async function ScamsPageN({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  const page = Number(n);
  if (!Number.isInteger(page) || page < 2 || page > pageCount(await liveCards())) notFound();
  return <ScamsPageBody page={page} />;
}
