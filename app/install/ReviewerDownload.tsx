"use client";

import { useState } from "react";
import styles from "./install.module.css";

type Steps = { off: string[]; install: string; on: string };

/**
 * "Download Ruko (full)" (D-101, D-103): a green button like Lite's, so the journey looks the same; it opens a code box.
 * The Play Protect steps and the download come from the server after a valid code, so the page itself never tells an
 * elder to turn off Play Protect (scammers say exactly that).
 */
export function ReviewerDownload() {
  const [code, setCode] = useState("");
  const [state, setState] = useState<"idle" | "checking" | "wrong" | "error">("idle");
  const [unlocked, setUnlocked] = useState<{ url: string; steps: Steps } | null>(null);
  const [open, setOpen] = useState(false);

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
      if (data.ok && data.url && data.steps) {
        setUnlocked({ url: data.url, steps: data.steps });
        setState("idle");
      } else {
        setState(res.status === 403 ? "wrong" : "error");
      }
    } catch {
      setState("error");
    }
  }

  return (
    <>
      <button
        type="button"
        className={`button ${styles.download}`}
        aria-expanded={open}
        aria-controls="reviewer-panel"
        onClick={() => setOpen(!open)}
      >
        Download Ruko (full)
      </button>
      <p className="note">Reviewers only: needs a code from the Ruko team, and Play Protect off for a moment · about 13 MB</p>

      {open && (
        <div id="reviewer-panel" className={styles.reviewer}>
          {!unlocked ? (
            <form className={styles.codeForm} onSubmit={submit}>
              <p className={styles.reviewerText}>Enter the code from the Ruko team to see the install steps and the download.</p>
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
                  Continue
                </button>
              </div>
              {state === "wrong" && <p className={styles.codeError}>That code isn&rsquo;t right. Check it with the Ruko team.</p>}
              {state === "error" && <p className={styles.codeError}>Couldn&rsquo;t check the code just now. Try again.</p>}
            </form>
          ) : (
            <div aria-live="polite">
              <h3 className={styles.reviewerHeading}>1. Turn off Play Protect</h3>
              <ol className={styles.reviewerSteps}>
                {unlocked.steps.off.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <h3 className={styles.reviewerHeading}>2. Download and install</h3>
              <p className={styles.reviewerText}>{unlocked.steps.install}</p>
              <a className={`button ${styles.download}`} href={unlocked.url} download>
                Download the full app
              </a>
              <h3 className={styles.reviewerHeading}>3. Turn Play Protect back on</h3>
              <p className={styles.reviewerText}>{unlocked.steps.on}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
