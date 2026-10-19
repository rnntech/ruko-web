import Link from "next/link";
import styles from "./page.module.css";
import { BankAppScreen, IncomingCallScreen, PhoneFrame, WarningScreen } from "@/components/Phone";

const timeline: { time: string; text: string; ruko?: boolean }[] = [
  { time: "0:00", text: "A call from “TRAI”: your SIM will be blocked because it was used for money laundering." },
  { time: "0:04", text: "You are put through to “Mumbai Police” on a WhatsApp video call. There is a uniform and an office behind him." },
  { time: "0:20", text: "“You are under digital arrest. Stay on the call. Do not tell your family.”" },
  { time: "0:41", text: "“To clear your name, move your savings to this RBI verification account.” You open your bank app." },
  { time: "0:41", text: "Ruko stops the moment: a red warning, read aloud, with one button to call your son.", ruko: true },
];

export default function Home() {
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
              Scammers rush you to pay, share an OTP, install an app or tap a link. Ruko notices the risky moment on your
              Android phone and stops you with a clear warning, in your language.
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
          <div className={styles.heroPhone}>
            <PhoneFrame label="Mock-up: Ruko's red warning during a call with an unknown number">
              <WarningScreen helperName="Arjun" />
            </PhoneFrame>
          </div>
        </div>
      </section>

      {/* The moment, in three phones */}
      <section className="field" id="how">
        <div className="container">
          <h2 className={styles.sectionTitle}>Scams follow the same three steps. Ruko steps in at the third.</h2>
          <ol className={styles.moment}>
            <li>
              <PhoneFrame label="Mock-up: an ongoing call with an unknown number, 41 minutes long">
                <IncomingCallScreen />
              </PhoneFrame>
              <h3>1. A stranger keeps you on the call</h3>
              <p>Police, a bank, a courier, TRAI. They say it&rsquo;s urgent and secret.</p>
            </li>
            <li>
              <PhoneFrame label="Mock-up: a bank app about to send money to a new account">
                <BankAppScreen />
              </PhoneFrame>
              <h3>2. They push you to act</h3>
              <p>Open your bank app, read out an OTP, install an app, tap a link.</p>
            </li>
            <li>
              <PhoneFrame label="Mock-up: Ruko's warning appears over the bank app">
                <WarningScreen />
              </PhoneFrame>
              <h3>3. Ruko makes you pause</h3>
              <p>A red warning explains why, reads it aloud, and offers one clear next step.</p>
            </li>
          </ol>
          <p className="note">Mock-ups. The real app runs on Android; screenshots will replace these after testing.</p>
        </div>
      </section>

      {/* A real pattern, minute by minute */}
      <section className="field field-white">
        <div className={`container ${styles.split}`}>
          <div>
            <h2>A real pattern, minute by minute</h2>
            <p className="measure">
              Built from &ldquo;digital arrest&rdquo; cases reported in Indian news in 2025 and 2026. People were kept on
              calls for hours, even days, and moved their savings themselves.
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

      {/* Why a person matters */}
      <section className="field field-teal">
        <div className={`container ${styles.facts}`}>
          <div>
            <p className={styles.bigNumber}>₹22,495 crore</p>
            <p>
              lost by Indians to cyber fraud in 2025, mostly to investment scams (Home Ministry data reported by{" "}
              <a href="https://theprint.in/india/cybercrime-saw-24-spike-in-2025-indians-lost-rs-22495-crore-mainly-in-investment-scams/2859930/">
                ThePrint
              </a>
              ).
            </p>
          </div>
          <div>
            <p className={styles.bigNumber}>Every one</p>
            <p>
              of the scams we found that was stopped in time was stopped because another person stepped in: a bank
              officer, the police or a family member. That&rsquo;s the moment Ruko creates.
            </p>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="field">
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
              Scam calls come in every language, so Ruko is built for eight: English first, then Hindi, Bengali, Marathi,
              Telugu, Tamil, Gujarati and Kannada. Each one is written or checked by a native speaker before it ships.
            </p>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="field field-teal">
        <div className="container">
          <h2 className={styles.closing}>Set it up once. It waits quietly until the moment it matters.</h2>
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
