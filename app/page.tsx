import Link from "next/link";
import styles from "./page.module.css";
import { PhoneTour } from "@/components/PhoneTour";
import { curly, unquote, visibleCards } from "@/lib/cards";
import { t } from "@/lib/content";

const timeline: { time: string; text: string; ruko?: boolean }[] = [
  { time: "0:00", text: "A call from “TRAI”: your SIM will be blocked because it was used for money laundering." },
  { time: "0:04", text: "You are put through to “Mumbai Police” on a WhatsApp video call. There is a uniform and an office behind him." },
  { time: "0:20", text: "“You are under digital arrest. Stay on the call. Do not tell your family.”" },
  { time: "0:41", text: "“To clear your name, move your savings to this RBI verification account.” You open your bank app." },
  { time: "0:41", text: "Ruko makes you pause: a red warning, read aloud, with one button to call your son.", ruko: true },
];

export default function Home() {
  const latest = visibleCards().slice(0, 3);
  return (
    <>
      {/* Hero: a big teal field (Wise), the product as the hero (Monzo) */}
      <section className={`field-teal ${styles.hero}`}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <h1>
              The <span className="highlight">pause</span> scammers don&rsquo;t want you to take.
            </h1>
            <p className="lead">
              <strong>Ruko checks before you even wonder.</strong> It looks at every new message in SMS, WhatsApp and other popular messaging apps, and
              notices when a stranger on a call rushes you to pay, share an OTP or tap a link. Then it stops you with a
              clear warning, in your language.
            </p>
            <div className={styles.actions}>
              <Link href="/demo" className="button button-light">
                See the warning
              </Link>
              <Link href="/install" className="text-link">
                Get the testing version
              </Link>
            </div>
          </div>
          {/* The app in a phone: four real screens, sliding like setup (D-048) */}
          <div className={styles.heroPhone}>
            <PhoneTour scamCount={visibleCards().length} />
          </div>
        </div>
      </section>

      {/* How it works: the explainer film (D-086; no autoplay, DESIGN.md) */}
      <section className="field" id="how">
        <div className="container">
          <h2 className={styles.sectionTitle}>How Ruko works</h2>
          <video
            className={styles.film}
            controls
            preload="metadata"
            playsInline
            poster="/video/ruko-explainer-poster.jpg"
            aria-label="Ruko explainer film"
          >
            <source src="/video/ruko-explainer.mp4" type="video/mp4" />
            <track kind="captions" src="/video/ruko-explainer.en.vtt" srcLang="en" label="English" default />
          </video>
          <p className="note">Every phone screen in the film is from the real Android app.</p>
        </div>
      </section>

      {/* A real pattern, minute by minute */}
      <section className="field">
        <div className={`container ${styles.split}`}>
          <div>
            <h2>A real pattern, minute by minute</h2>
            <p className="measure">
              Built from &ldquo;digital arrest&rdquo; cases reported in Indian news in 2025 and 2026. People were kept on
              calls for hours, even days, and moved their savings themselves.
            </p>
            <p className="measure">
              In every case we found that was stopped in time, another person stepped in: a bank officer, the police or a
              family member. That&rsquo;s the moment Ruko creates.
            </p>
          </div>
          <ol className={styles.timeline}>
            {timeline.map((item, i) => (
              <li key={i} className={item.ruko ? styles.rukoStep : undefined}>
                <span className={styles.time}>{item.time}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The backup to the automatic checks: show Ruko any message (growth hook 3, D-049; after them, D-051). */}
      <section className="field field-mint">
        <div className={`container ${styles.split}`}>
          <div>
            <h2 className={styles.checkTitle}>{t.check.title}</h2>
            <p className="lead">{t.check.lead}</p>
          </div>
          <div>
            <ol className={styles.checkSteps}>
              {t.check.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <div className={styles.testCallout}>
              <p className={styles.testTitle}>{t.check.testTitle}</p>
              <p>{t.check.testBody}</p>
              <Link href="/spot-the-scam" className="button">
                {t.check.testLink}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Scams going around (D-030): one scam per row */}
      <section className="field field-white" id="scams">
        <div className="container">
          <div className={styles.scamsHead}>
            <div>
              <h2>{t.scams.homeTitle}</h2>
              <p className="lead">{t.scams.homeLead}</p>
              <p className="note">
                Indians lost &#8377;22,495 crore to cyber fraud in 2025 (Home Ministry data reported by{" "}
                <a href="https://theprint.in/india/cybercrime-saw-24-spike-in-2025-indians-lost-rs-22495-crore-mainly-in-investment-scams/2859930/">
                  ThePrint
                </a>
                ).
              </p>
            </div>
          </div>
          <div className={styles.scamList}>
            {latest.map((card) => (
              <article key={card.id} className={styles.scamRow} aria-labelledby={`home-${card.id}`}>
                <div>
                  <h3 id={`home-${card.id}`} className={styles.scamName}>
                    {curly(card.name.en)}
                  </h3>
                  <p className={styles.scamChannels}>
                    {(card.channels ?? []).map((c) => t.scams.channels[c as keyof typeof t.scams.channels] ?? c).join(" · ")}
                  </p>
                  <Link href={`/scams#${card.id}`} className="text-link">
                    {t.scams.readMore}
                  </Link>
                </div>
                <blockquote className={styles.scamSays}>{curly(unquote(card.they_say.en))}</blockquote>
                <div className={styles.scamFlag}>
                  <p className={styles.scamFlagLabel}>{t.scams.redFlag}</p>
                  <p>{curly(card.red_flag.en)}</p>
                </div>
              </article>
            ))}
          </div>
          <Link href="/scams" className="button">
            {t.scams.seeAll}
          </Link>
        </div>
      </section>

      {/* Trust */}
      <section className="field field-white">
        <div className={`container ${styles.split}`}>
          <div>
            <h2>What Ruko never does</h2>
            <p className="measure">It asks for strong permissions, so here is the promise in plain words.</p>
            <Link href="/privacy" className="text-link">
              See exactly what Ruko can see
            </Link>
          </div>
          <ul className="rows">
            <li>Listen to or record your calls.</li>
            <li>Store or send your messages. Checks happen on your phone.</li>
            <li>Block your calls or payments. It only warns you.</li>
            <li>Ask for your SMS, call history, microphone or location.</li>
            <li>Tell anyone about your calls, unless you choose someone to call.</li>
          </ul>
        </div>
      </section>

      {/* Languages */}
      <section className="field field-mint">
        <div className={`container ${styles.split}`}>
          <p className={styles.devanagari} lang="hi">
            रुको
          </p>
          <div>
            <h2>Ruko means &ldquo;stop&rdquo;</h2>
            <p className="measure">
              Scam calls come in every language, so Ruko speaks six: English, Hindi, Tamil, Telugu, Malayalam and
              Kannada. The Indian languages are in beta. Every line is written from its meaning, never translated word
              for word, using the words the police and banks use, and checked against how the news says it. A native
              speaker&rsquo;s check takes the beta label off.
            </p>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="field field-teal">
        <div className={`container ${styles.closingInner}`}>
          <h2 className={styles.closing}>Set it up once. It waits until it matters.</h2>
          <div className={styles.actions}>
            <Link href="/install" className="button button-light">
              Get the testing version
            </Link>
            <Link href="/demo" className="text-link">
              See the warning first
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
