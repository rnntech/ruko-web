import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { ScamCardView } from "@/components/ScamCardView";
import { showDrafts, visibleCards } from "@/lib/cards";
import { t } from "@/lib/content";
import styles from "./scams.module.css";

export const metadata: Metadata = {
  title: "Scams going around in India",
  description:
    "Scams reported recently by the police, government and news outlets, checked by a person, with what to do. Share them with your family on WhatsApp.",
};

export default function ScamsPage() {
  const cards = visibleCards();
  return (
    <>
      <PageHead title={t.scams.title} lead={t.scams.lead} />

      <section className="field">
        <div className="container">
          {showDrafts && <p className="note">{t.scams.draftNote}</p>}
          {cards.length === 0 ? (
            <p className="measure">{t.scams.empty}</p>
          ) : (
            <div className={styles.grid}>
              {cards.map((card) => (
                <div key={card.id} id={card.id}>
                  <ScamCardView card={card} full />
                </div>
              ))}
            </div>
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
        </div>
      </section>
    </>
  );
}
