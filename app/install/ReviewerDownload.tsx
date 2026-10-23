"use client";

import { useState } from "react";
import styles from "./install.module.css";

/**
 * "Reviewers, download here" (D-101): a drop-down, closed by default, where a code from the owner unlocks the full app.
 * Kept small and below the public options: elders are never asked to turn off Play Protect (scammers say exactly that).
 */
export function ReviewerDownload() {
  const [code, setCode] = useState("");
  const [state, setState] = useState<"idle" | "checking" | "wrong" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("checking");
    try {
      const res = await fetch("/api/reviewer-download", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (data.ok && data.url) {
        setState("idle");
        window.location.href = data.url;
      } else {
        setState(res.status === 403 ? "wrong" : "error");
      }
    } catch {
      setState("error");
    }
  }

  return (
    <details className={styles.reviewer}>
      <summary className={styles.reviewerSummary}>
        Reviewer download <span className={styles.reviewerHint}>(with Play Protect off)</span>
      </summary>

      <h3 className={styles.reviewerHeading}>1. Turn off Play Protect</h3>
      <ol className={styles.reviewerSteps}>
        <li>Open the <strong>Play Store</strong> app.</li>
        <li>Tap your <strong>profile picture</strong> at the top right.</li>
        <li>
          Tap <strong>Play Protect</strong>, then the <strong>⚙ settings</strong> icon at the top right.
        </li>
        <li>
          Turn off <strong>Scan apps with Play Protect</strong> and confirm. (Android doesn&rsquo;t allow this during a
          phone call.)
        </li>
      </ol>

      <h3 className={styles.reviewerHeading}>2. Download and install</h3>
      <form className={styles.codeForm} onSubmit={submit}>
        <label className={styles.codeLabel} htmlFor="reviewer-code">
          Reviewer code
        </label>
        <div className={styles.codeRow}>
          <input
            id="reviewer-code"
            className={styles.codeInput}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            required
          />
          <button type="submit" className="button" disabled={state === "checking"}>
            Download
          </button>
        </div>
        {state === "wrong" && <p className={styles.codeError}>That code isn&rsquo;t right. Check it with the Ruko team.</p>}
        {state === "error" && <p className={styles.codeError}>Couldn&rsquo;t check the code just now. Try again.</p>}
      </form>
      <ol className={styles.reviewerSteps}>
        <li>Open the downloaded file and tap <strong>Install</strong> (allow your browser to install apps if asked).</li>
        <li>
          If Ruko&rsquo;s <em>Notification access</em> step says &ldquo;Restricted setting&rdquo;: <em>Settings → Apps → Ruko</em>{" "}
          → <em>⋮</em> → <strong>Allow restricted settings</strong>.
        </li>
      </ol>

      <h3 className={styles.reviewerHeading}>3. Turn Play Protect back on</h3>
      <p className={styles.reviewerText}>
        Same place: Play Store → profile picture → Play Protect → ⚙ → turn <strong>Scan apps with Play Protect</strong> back
        on. Ruko keeps working.
      </p>
      <p className="note">Ruko will never ask anyone else to turn off Play Protect.</p>
    </details>
  );
}
