import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { ScamCardView } from "@/components/ScamCardView";
import { type ScamCard, safetyPortals, showDrafts, trustedOutlets } from "@/lib/cards";
import { liveCards } from "@/lib/liveFeed";
import { t } from "@/lib/content";
import styles from "./scams.module.css";

/** Six scams per page (owner, 23 Oct): 52 approved cards make 9 pages. */
export const PER_PAGE = 6;

export function pageCount(cards: ScamCard[]): number {
  return Math.max(1, Math.ceil(cards.length / PER_PAGE));
}

export function pageHref(page: number): string {
  return page <= 1 ? "/scams" : `/scams/page/${page}`;
}

/** The cards come from the live feed (D-106), so a new card appears without a redeploy. */
export async function ScamsPageBody({ page }: { page: number }) {
  const all = await liveCards();
  const pages = pageCount(all);
  const cards = all.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const first = (page - 1) * PER_PAGE + 1;
  return (
    <>
      <PageHead title={t.scams.title} lead={t.scams.lead} />

      <section className="field">
        <div className="container">
          {showDrafts && <p className="note">{t.scams.draftNote}</p>}
          {cards.length === 0 ? (
            <p className="measure">{t.scams.empty}</p>
          ) : (
            <>
              <p className={styles.count}>
                Scams {first}&ndash;{first + cards.length - 1} of {all.length}, newest first
              </p>
              <div className={styles.grid}>
                {cards.map((card) => (
                  <div key={card.id} id={card.id}>
                    <ScamCardView card={card} full />
                  </div>
                ))}
              </div>
              {pages > 1 && <Pager page={page} pages={pages} />}
            </>
          )}
        </div>
      </section>

      <section className="field field-white">
        <div className={`container ${styles.split}`}>
          <div>
            <h2>{t.scams.followTitle}</h2>
            <p className="measure">{t.scams.followBody}</p>
            {t.whatsappChannelUrl ? (
              <a className="button" href={t.whatsappChannelUrl} rel="noopener noreferrer">
                {t.scams.follow}
              </a>
            ) : (
              <p className="note">{t.scams.followSoon}</p>
            )}
          </div>
          <div>
            <h2>{t.scams.rulesTitle}</h2>
            <ul className="rows">
              {t.scams.rules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="field">
        <div className="container">
          <h2>{t.scams.sourcesTitle}</h2>
          <p className="measure">{t.scams.sourcesBody}</p>
          <div className={styles.split}>
            <div>
              <h3>{t.scams.portalsTitle}</h3>
              <ul className="rows">
                {safetyPortals.map((p) => (
                  <li key={p.domain}>
                    <a href={p.url} rel="noopener noreferrer">
                      {p.name}
                    </a>
                    <br />
                    <span className="note">{p.use}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>{t.scams.outletsTitle}</h3>
              <p className="measure">{trustedOutlets.join(" · ")}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/** Big, plain page links: Previous, the page numbers, Next. */
function Pager({ page, pages }: { page: number; pages: number }) {
  return (
    <nav className={styles.pager} aria-label="Scam pages">
      {page > 1 ? (
        <Link href={pageHref(page - 1)} className={styles.step}>
          &larr; Previous
        </Link>
      ) : (
        <span className={styles.stepOff} aria-hidden="true">
          &larr; Previous
        </span>
      )}
      <ol className={styles.numbers}>
        {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
          <li key={n}>
            {n === page ? (
              <span className={styles.current} aria-current="page">
                {n}
              </span>
            ) : (
              <Link href={pageHref(n)} className={styles.number} aria-label={`Page ${n}`}>
                {n}
              </Link>
            )}
          </li>
        ))}
      </ol>
      {page < pages ? (
        <Link href={pageHref(page + 1)} className={styles.step}>
          Next &rarr;
        </Link>
      ) : (
        <span className={styles.stepOff} aria-hidden="true">
          Next &rarr;
        </span>
      )}
    </nav>
  );
}
