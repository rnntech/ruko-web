import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHead } from "@/components/PageHead";
import { ScamCardView } from "@/components/ScamCardView";
import { curly, shareImagePath, visibleCards } from "@/lib/cards";
import { liveCards } from "@/lib/liveFeed";
import { t } from "@/lib/content";

/**
 * One scam card on its own page (D-049), so a WhatsApp link shows the card's picture as its preview
 * (scripts/share_images.py). Only cards the site shows get a page.
 */
export function generateStaticParams() {
  return visibleCards().map((c) => ({ id: c.id }));
}

/** A card the live feed adds (D-106) gets its page on request; all pages refresh at most hourly. */
export const revalidate = 3600;

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const card = (await liveCards()).find((c) => c.id === id);
  if (!card) return {};
  const title = `Scam going around: ${curly(card.name.en)}`;
  const image = { url: `${t.siteUrl}${shareImagePath(card)}`, width: 1080, height: 1080 };
  return {
    title,
    description: card.red_flag.en,
    openGraph: { title, description: card.red_flag.en, images: [image], type: "article", locale: "en_IN" },
    twitter: { card: "summary_large_image", title, description: card.red_flag.en, images: [image.url] },
  };
}

export default async function ScamCardPage({ params }: Props) {
  const { id } = await params;
  const card = (await liveCards()).find((c) => c.id === id);
  if (!card) notFound();
  return (
    <>
      <PageHead title={t.scams.title} />
      <section className="field">
        <div className="container measure">
          <ScamCardView card={card} full />
          <p style={{ marginTop: 24 }}>
            <Link href="/scams">{t.scams.allLink}</Link> &middot; <Link href="/spot-the-scam">{t.nav.spot}</Link>
          </p>
        </div>
      </section>
    </>
  );
}
