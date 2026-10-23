import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import styles from "./install.module.css";
import { ReviewerDownload } from "./ReviewerDownload";

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
        lead="Ruko is in testing with a small group of families, on Android phones only. There are two versions: the full app, and Ruko Lite."
      />
      <section className="field">
        <div className="container">
          {/* Reviewers first see why the full app needs Play Protect off (owner, 24 Oct). */}
          <aside className={styles.reviewerNote} aria-label="Reviewers, please note">
            <p className={styles.reviewerNoteTitle}>Reviewers, please note</p>
            <p>
              The full app reads your message notifications only on your phone, and your messages are never sent
              anywhere: a complete local guarantee. It isn&rsquo;t on the Play Store yet. So to install it you&rsquo;ll need to turn off Play Protect for a moment, then turn it back
              on: when we did, Play Protect&rsquo;s scan found nothing harmful in Ruko. If you&rsquo;d rather not, choose Ruko
              Lite.
            </p>
          </aside>
        </div>
        <div className={`container ${styles.options}`}>
          {/* ---- Ruko (full): the video and the reviewer download ---- */}
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
            <ReviewerDownload />
          </article>

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
        </div>

        {/* ---- Full vs Lite ---- */}
        <div className="container">
          <h2 className={styles.compareTitle}>Ruko (full) and Ruko Lite</h2>
          <div className="table-wrap">
            <table className={styles.compare}>
              <thead>
                <tr>
                  <th scope="col">What it does</th>
                  <th scope="col">Ruko (full)</th>
                  <th scope="col">Ruko Lite</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">How to get it</th>
                  <td>Reviewer code, and Play Protect off for a moment</td>
                  <td>Download from this page</td>
                </tr>
                <tr>
                  <th scope="row">Stranger calls: bank or payment app opened, screen sharing, very long calls</th>
                  <td>✓</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <th scope="row">WhatsApp calls</th>
                  <td>✓ Knows who is calling</td>
                  <td>Asks &ldquo;Is this someone you know?&rdquo;</td>
                </tr>
                <tr>
                  <th scope="row">An OTP arriving during a call</th>
                  <td>✓</td>
                  <td>–</td>
                </tr>
                <tr>
                  <th scope="row">Scam SMS and WhatsApp messages, warned as they arrive</th>
                  <td>✓ Checked against the latest scams</td>
                  <td>– (show it a message yourself)</td>
                </tr>
                <tr>
                  <th scope="row">App files sent in messages</th>
                  <td>✓ Warned on arrival and before installing</td>
                  <td>–</td>
                </tr>
                <tr>
                  <th scope="row">Links checked before they open</th>
                  <td>✓</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <th scope="row">Calls someone you trust; six languages, read aloud</th>
                  <td>✓</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <th scope="row">Reads message notifications</th>
                  <td>Yes, on your phone only</td>
                  <td>No</td>
                </tr>
              </tbody>
            </table>
          </div>
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
