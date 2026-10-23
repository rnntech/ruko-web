import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import styles from "./install.module.css";

export const metadata: Metadata = {
  title: "Get the Ruko app",
  description: "Download Ruko Lite for Android, and see what the full Ruko app does.",
};

/**
 * Get Ruko (D-101): Ruko Lite is the download (it installs from a website); the full app is shown in a short video,
 * because Google Play Protect blocks installing it from a website (IS1, IS2) until it is on the Play Store.
 */
export default function InstallPage() {
  return (
    <>
      <PageHead
        title="Get the app"
        lead="Ruko is in testing with a small group of families, on Android phones only. Start with Ruko Lite: it installs from this page."
      />
      <section className="field">
        <div className={`container ${styles.options}`}>
          {/* ---- Ruko Lite: the download ---- */}
          <article className={styles.option} aria-labelledby="lite-title">
            <h2 id="lite-title" className={styles.optionTitle}>
              Ruko Lite
            </h2>
            <p className={styles.optionLead}>Warns you during calls with strangers, and checks links before they open.</p>
            <ul className="rows">
              <li>Warns if you open a bank or payment app, or a screen-sharing app, during a stranger&rsquo;s call.</li>
              <li>On WhatsApp calls, asks &ldquo;Is this someone you know?&rdquo;</li>
              <li>Checks links before they open, and any message you show it.</li>
              <li>Can call someone you trust from the warning. Six languages, read aloud.</li>
            </ul>
            <a className={`button ${styles.download}`} href="/download/ruko-lite.apk" download>
              Download Ruko Lite
            </a>
            <p className="note">Android phones only · about 13 MB · testing version</p>
          </article>

          {/* ---- Ruko (full): the video ---- */}
          <article className={styles.option} aria-labelledby="full-title">
            <h2 id="full-title" className={styles.optionTitle}>
              Ruko (full app)
            </h2>
            <p className={styles.optionLead}>Everything in Lite, plus warnings for scam SMS and WhatsApp messages and for OTPs during a call.</p>
            <video
              className={styles.film}
              controls
              preload="metadata"
              playsInline
              poster="/video/ruko-full-otp-poster.jpg"
              aria-label="Ruko full app: an OTP during a scam call, the helper's phone ringing, and a fake power-cut message flagged"
            >
              <source src="/video/ruko-full-otp.mp4" type="video/mp4" />
            </video>
            <p className={styles.blocked}>
              The full app is ready, but Android&rsquo;s Play Protect blocks installing it from a website. It&rsquo;s
              coming to the Play Store.
            </p>
          </article>
        </div>
      </section>

      <section className="field field-white">
        <div className="container">
          <h2>Installing Ruko Lite</h2>
          <p className="measure">
            Only install Ruko from this page or from someone on our team.{" "}
            <strong>Never install any app sent to you as a file on WhatsApp</strong>, including Ruko.
          </p>
          <ol className="steps">
            <li>
              <strong>Download the file</strong> with the button above.
            </li>
            <li>
              <strong>Allow the install.</strong> Android asks whether your browser may install apps. Allow it for this one
              install.
            </li>
            <li>
              <strong>Open Ruko</strong> and follow the setup. It explains each permission before Android asks.
            </li>
            <li>
              <strong>If Android says &ldquo;Restricted setting&rdquo;:</strong> open <em>Settings → Apps → Ruko</em>, tap
              the <em>⋮</em> menu at the top right, choose <em>Allow restricted settings</em>, enter your phone&rsquo;s PIN,
              then go back to Ruko and turn the setting on.
            </li>
            <li>
              <strong>Keep Ruko running.</strong> Some phones close apps to save battery.{" "}
              <a href="/keep-running">Follow the battery steps for your phone</a>.
            </li>
          </ol>
          <h2 style={{ marginTop: 48 }}>Reviewers: see the family member&rsquo;s side</h2>
          <p className="measure">
            With one phone you can still see what the helper gets. In Ruko, choose <em>Help someone you love</em>, type the
            demo code <strong>000000</strong> and tap <em>Connect</em>, then lock the phone. Five seconds later it rings with a
            demo alert, exactly as a helper&rsquo;s phone does. Nothing is sent anywhere.
          </p>
        </div>
      </section>
    </>
  );
}
