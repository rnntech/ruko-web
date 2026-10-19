import Link from "next/link";
import styles from "./page.module.css";
import { PhoneMock } from "@/components/PhoneMock";
import { t } from "@/lib/content";

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div>
            <h1>{t.tagline}</h1>
            <p className="lead">
              Scammers rush you to pay, share an OTP, install an app or tap a link. When a stranger keeps you on a call
              and you open your bank app, Ruko shows a warning and reads it aloud, in your language. If you choose, the
              same screen lets you call someone you trust with one tap.
            </p>
            <p>
              <Link href="/demo" className="button">
                See how the warning looks
              </Link>
            </p>
            <p>
              <Link href="/install" className="text-link">
                How to get the testing version (Android)
              </Link>
            </p>
          </div>
          <PhoneMock />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Why a pause matters</h2>
          <p className={styles.measure}>
            In 2025, Indians lost ₹22,495 crore to cyber fraud, according to Home Ministry data reported by{" "}
            <a href="https://theprint.in/india/cybercrime-saw-24-spike-in-2025-indians-lost-rs-22495-crore-mainly-in-investment-scams/2859930/">
              ThePrint
            </a>
            . In fake &ldquo;digital arrest&rdquo; scams, people are kept on video calls for hours and told to tell no one,
            then pushed to move their savings.
          </p>
          <p className={styles.measure}>
            In the 50 cases we studied from Indian news reports, every scam that was stopped in time was stopped because
            someone else stepped in: a bank officer, the police or a family member. Ruko is built to create that moment.
          </p>
        </div>
      </section>

      <section className="section" id="how">
        <div className="container">
          <h2>How it works</h2>
          <ol className="steps">
            <li>
              <strong>Ruko notices a risky moment.</strong> A call with a number you haven&rsquo;t saved, and then you open
              a bank or payment app, a bank OTP arrives, or the call goes on for a very long time.
            </li>
            <li>
              <strong>It stops you with a clear warning.</strong> A red screen tells you why, and reads it aloud in your
              language.
            </li>
            <li>
              <strong>You decide what happens next.</strong> Call 1930, call the person you chose, or continue after 30
              seconds if you know the caller.
            </li>
          </ol>
          <p className={styles.measure}>
            You can also share any message you&rsquo;re unsure about with Ruko. It checks it on your phone against known
            scams, like fake KYC messages, fake electricity bills and wedding-card app files.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>What Ruko never does</h2>
          <ul className="plain-list">
            <li>Listen to or record your calls.</li>
            <li>Store or send your messages. Message checks happen on your phone.</li>
            <li>Block your calls or payments. It only warns you.</li>
            <li>Ask for access to your SMS, call history, microphone or location.</li>
            <li>Tell anyone about your calls, unless you choose someone to call.</li>
          </ul>
          <p>
            <Link href="/privacy" className="text-link">
              Read exactly what Ruko can see
            </Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Where Ruko is today</h2>
          <p className={styles.measure}>
            Ruko is being built for the HelloPM Buildathon (October 2026) and tested with a small group of families on
            Android. It starts in English, with Hindi, Bengali, Marathi, Telugu, Tamil, Gujarati and Kannada to follow,
            each checked by a native speaker.
          </p>
        </div>
      </section>
    </>
  );
}
