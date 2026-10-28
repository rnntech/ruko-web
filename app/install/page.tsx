import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import styles from "./install.module.css";
import { FullFilm } from "./FullFilm";
import { ReviewerDownload } from "./ReviewerDownload";

export const metadata: Metadata = {
  title: "Get the Ruko app",
  description: "Download Ruko Lite for Android, and see what the full Ruko app does.",
};

/**
 * Get Ruko (D-101): Ruko Lite is the download (it installs from a website); the full app is shown in a short video,
 * because Google Play Protect blocks installing it from a website (IS1, IS2) until it is on the Play Store.
 */
type Cell = { has: "yes" | "no" | "info"; note?: string };

const COMPARE: { what: string; full: Cell; lite: Cell }[] = [
  {
    what: "How to get it",
    full: { has: "info", note: "Coming to the Play Store (reviewers: a code from the team)" },
    lite: { has: "info", note: "Download from this page" },
  },
  {
    what: "Stranger calls: bank or payment app opened, screen sharing, very long calls",
    full: { has: "yes" },
    lite: { has: "yes" },
  },
  {
    what: "WhatsApp calls",
    full: { has: "yes", note: "Knows who is calling" },
    lite: { has: "yes", note: "Asks if you know them" },
  },
  { what: "An OTP arriving during a call", full: { has: "yes" }, lite: { has: "no" } },
  {
    what: "Scam messages on SMS, WhatsApp, Telegram, Instagram and Messenger, warned as they arrive",
    full: { has: "yes", note: "Checked for new scams" },
    lite: { has: "no", note: "You can show it a message" },
  },
  {
    what: "App files sent in messages",
    full: { has: "yes", note: "Warned before you install" },
    lite: { has: "no" },
  },
  { what: "Links checked before they open", full: { has: "yes" }, lite: { has: "yes" } },
  { what: "Calls someone you trust; six languages (beta), read aloud", full: { has: "yes" }, lite: { has: "yes" } },
  {
    what: "Reads message notifications",
    full: { has: "info", note: "Yes, on your phone only" },
    lite: { has: "info", note: "No" },
  },
];

/** A table cell: a filled tick, a plain "Not included", or just the words. */
function Mark({ cell }: { cell: Cell }) {
  if (cell.has === "info") return <span className={styles.cellNote}>{cell.note}</span>;
  return (
    <span className={cell.has === "yes" ? styles.mark : styles.markStack}>
      {cell.has === "yes" ? (
        <span className={styles.yes} aria-label="Yes" role="img">
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      ) : (
        <span className={styles.no}>Not included</span>
      )}
      {cell.note && <span className={cell.has === "yes" ? styles.cellNote : styles.cellNoteSoft}>{cell.note}</span>}
    </span>
  );
}

export default function InstallPage() {
  return (
    <>
      <PageHead
        title="Get the app"
        lead="Ruko is in testing with a small group of families, on Android phones only. There are two versions: the full app, and Ruko Lite."
      />
      <section className="field">
        {/* "Get the app" links land here (/install#download). The reviewers' note shows only after a valid code. */}
        <div id="download" className={`container ${styles.options} ${styles.downloadAnchor}`}>
          {/* ---- Ruko (full): the video and the reviewer download ---- */}
          <article className={styles.option} aria-labelledby="full-title">
            <div className={styles.optionHead}>
              <h2 id="full-title" className={styles.optionTitle}>
                Ruko (full app)
              </h2>
              <p className={styles.optionLead}>Everything in Lite, plus warnings for scam messages on SMS, WhatsApp, Telegram, Instagram and Messenger, and for OTPs during a call.</p>
            </div>
            <div className={styles.optionBody}>
              <ReviewerDownload />
              <FullFilm />
            </div>
          </article>

          {/* ---- Ruko Lite: the download ---- */}
          <article className={styles.option} aria-labelledby="lite-title">
            <div className={styles.optionHead}>
              <h2 id="lite-title" className={styles.optionTitle}>
                Ruko Lite
              </h2>
              <p className={styles.optionLead}>Warns you during calls with strangers, and checks links before they open.</p>
            </div>
            <div className={styles.optionBody}>
              <a className={`button ${styles.download}`} href="/download/ruko-lite.apk" download>
                Download Ruko Lite
              </a>
              <p className="note">Android phones only · about 13 MB · testing version</p>
              <ul className="rows">
                <li>Warns if you open a bank or payment app, or a screen-sharing app, during a stranger&rsquo;s call.</li>
                <li>On WhatsApp calls, asks &ldquo;Is this someone you know?&rdquo;</li>
                <li>Checks links before they open, and any message you show it.</li>
                <li>Can call someone you trust from the warning. Six languages (beta), read aloud.</li>
              </ul>
            </div>
          </article>
        </div>

        {/* ---- Full vs Lite ---- */}
        <div className="container">
          <h2 className={styles.compareTitle}>Ruko (full) and Ruko Lite</h2>
          <table className={styles.compare}>
            <thead>
              <tr>
                <th scope="col">What it does</th>
                <th scope="col">Ruko (full)</th>
                <th scope="col">Ruko Lite</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((row) => (
                <tr key={row.what}>
                  <th scope="row">{row.what}</th>
                  <td data-label="Ruko (full)">
                    <Mark cell={row.full} />
                  </td>
                  <td data-label="Ruko Lite">
                    <Mark cell={row.lite} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="field field-white">
        <div className="container">
          <h2 id="lite-steps">Installing Ruko Lite</h2>
          <p className="measure">
            Only install Ruko from this page or from someone on our team.{" "}
            <strong>Never install any app sent to you as a file on WhatsApp</strong>, including Ruko.
          </p>
          {/* Version 12 (1.3) is signed with a new key (D-133): Android won't update an older Ruko over it. */}
          <p className="measure">
            <strong>Already have Ruko?</strong> Uninstall it first, then install this version. Android won&rsquo;t
            install it over an older Ruko.
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
