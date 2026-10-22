import Link from "next/link";
import styles from "./ScamCardView.module.css";
import { curly, pretty, shareImagePath, shareImageText, unquote, whatsappShareLink, type ScamCard } from "@/lib/cards";
import { ShareCardButton } from "./ShareCardButton";
import { t } from "@/lib/content";

/**
 * One scam tile (D-036; references: Scamwatch, Monzo and Which? scam pages).
 * Order: how it reaches you → what they say (as a speech bubble you'd recognise) → what they ask →
 * how to spot it (red tint) → what to do (teal tint) → sources and share.
 * [full] = the /scams page. The short version (home) links to the full card.
 */
export function ScamCardView({ card, full = false }: { card: ScamCard; full?: boolean }) {
  return (
    <article className={styles.card} aria-labelledby={`scam-${card.id}`}>
      <h3 id={`scam-${card.id}`} className={styles.name}>
        {curly(card.name.en)}
      </h3>
      <div className={styles.meta}>
        <ul className={styles.channels} aria-label={t.scams.channelsLabel}>
          {(card.channels ?? []).map((c) => (
            <li key={c} className="tag">
              {t.scams.channels[c as keyof typeof t.scams.channels] ?? c}
            </li>
          ))}
        </ul>
        {card.status !== "approved" && <span className={`tag ${styles.draft}`}>{t.scams.draft}</span>}
      </div>


      <figure className={styles.says}>
        <figcaption>{t.scams.theySay}</figcaption>
        <blockquote>{curly(unquote(card.they_say.en))}</blockquote>
      </figure>

      {full && (
        <p className={styles.ask}>
          <strong>{t.scams.theyAsk}</strong> {curly(card.they_ask.en)}
        </p>
      )}

      <div className={styles.flag}>
        <p className={styles.label}>{t.scams.redFlag}</p>
        <p>{curly(card.red_flag.en)}</p>
      </div>

      {full ? (
        <>
          <div className={styles.todo}>
            <p className={styles.label}>{t.scams.whatToDo}</p>
            <p>{curly(card.do.en)}</p>
          </div>
          <div className={styles.footer}>
            <p className={styles.sources}>
              {t.scams.added} {pretty(card.added)}
              <br />
              {t.scams.source}{" "}
              {card.sources.map((s, i) => (
                <span key={s.url}>
                  {i > 0 && ", "}
                  <a href={s.url} rel="noopener noreferrer">
                    {s.name}
                  </a>
                </span>
              ))}
            </p>
            <ShareCardButton
              className={styles.share}
              label={t.scams.share}
              href={whatsappShareLink(card, `${t.siteUrl}/scams/${card.id}`)}
              imagePath={shareImagePath(card)}
              fileName={`ruko-${card.id}.png`}
              text={shareImageText(card, `${t.siteUrl}/scams/${card.id}`)}
            />
          </div>
        </>
      ) : (
        <Link href={`/scams#${card.id}`} className={styles.more}>
          {t.scams.readMore}
        </Link>
      )}
    </article>
  );
}
