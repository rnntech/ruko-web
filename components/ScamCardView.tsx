import styles from "./ScamCardView.module.css";
import { pretty, whatsappShareLink, type ScamCard } from "@/lib/cards";
import { t } from "@/lib/content";

/**
 * One scam card as plain editorial text (like Monzo's fraud page: no icons, no coloured boxes).
 * [full] adds what they say, what to do, sources and the WhatsApp share link.
 */
export function ScamCardView({ card, full = false }: { card: ScamCard; full?: boolean }) {
  return (
    <article className={styles.card} aria-labelledby={`scam-${card.id}`}>
      {card.status !== "approved" && <span className={`tag ${styles.draft}`}>{t.scams.draft}</span>}
      <h3 id={`scam-${card.id}`} className={styles.name}>
        {card.name.en}
      </h3>
      {full && <p className={styles.quote}>{card.they_say.en}</p>}
      <p>
        <strong>{t.scams.theyAsk}</strong> {card.they_ask.en}
      </p>
      <p className={styles.flag}>
        <strong>{t.scams.redFlag}</strong> {card.red_flag.en}
      </p>
      {full && (
        <>
          <p>
            <strong>{t.scams.whatToDo}</strong> {card.do.en}
          </p>
          <p className={styles.meta}>
            {t.scams.added} {pretty(card.added)} · {t.scams.source}{" "}
            {card.sources.map((s, i) => (
              <span key={s.url}>
                {i > 0 && ", "}
                <a href={s.url} rel="noopener noreferrer">
                  {s.name}
                </a>
              </span>
            ))}
          </p>
          <a className={`button ${styles.share}`} href={whatsappShareLink(card, `${t.siteUrl}/scams#${card.id}`)} rel="noopener noreferrer">
            {t.scams.share}
          </a>
        </>
      )}
    </article>
  );
}
