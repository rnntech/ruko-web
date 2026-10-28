"use client";

import { useState } from "react";
import styles from "./install.module.css";

type Steps = {
  note: {
    title: string;
    body: string;
    warn: string;
    tutorial?: string;
    tutorialNote?: string;
    tutorialUrl?: string;
    keep?: string;
    keepLink?: string;
    guide?: string;
    guideNote?: string;
  };
  off: { heading: string; items: string[] };
  install: { heading: string; text: string };
  on: { heading: string; text: string };
};

/**
 * "Download Ruko (full)" (D-101, D-103): a green button like Lite's, so the journey looks the same; it opens a code box.
 * The reviewers' note, the Play Protect steps and the download come from the server after a valid code, so the public
 * page never mentions turning Play Protect off (scammers say exactly that).
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
      <p className="note">Reviewers only: needs a code from the Ruko team · about 14 MB</p>

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
              <aside className={styles.reviewerNote} aria-label={unlocked.steps.note.title}>
                <p className={styles.reviewerNoteTitle}>{unlocked.steps.note.title}</p>
                <p>{unlocked.steps.note.body}</p>
                {/* Owner, 28 Oct: the tutorial and the testing guide must catch a reviewer's eye. */}
                {(unlocked.steps.note.tutorialUrl || unlocked.steps.note.guide) && (
                  <div className={styles.reviewerLinks}>
                    {unlocked.steps.note.tutorial && unlocked.steps.note.tutorialUrl && (
                      <a className={styles.reviewerLink} href={unlocked.steps.note.tutorialUrl} target="_blank" rel="noopener noreferrer">
                        <span className={styles.reviewerLinkIcon} aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="20" height="20"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
                        </span>
                        <span>
                          <span className={styles.reviewerLinkTitle}>{unlocked.steps.note.tutorial}</span>
                          {unlocked.steps.note.tutorialNote && <span className={styles.reviewerLinkNote}>{unlocked.steps.note.tutorialNote}</span>}
                        </span>
                      </a>
                    )}
                    {unlocked.steps.note.guide && (
                      <a className={styles.reviewerLink} href="/ruko-reviewer-guide.pdf" target="_blank" rel="noopener">
                        <span className={styles.reviewerLinkIcon} aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="20" height="20">
                            <path d="M6 2.5h8l4.5 4.5v14.5h-12.5z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                            <path d="M13.5 2.5v5h5M9 12.5h6M9 16h6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          </svg>
                        </span>
                        <span>
                          <span className={styles.reviewerLinkTitle}>{unlocked.steps.note.guide}</span>
                          {unlocked.steps.note.guideNote && <span className={styles.reviewerLinkNote}>{unlocked.steps.note.guideNote}</span>}
                        </span>
                      </a>
                    )}
                  </div>
                )}
                <p className={styles.reviewerNoteWarn}>{unlocked.steps.note.warn}</p>
              </aside>
              <h3 className={styles.reviewerHeading}>{unlocked.steps.off.heading}</h3>
              <ol className={styles.reviewerSteps}>
                {unlocked.steps.off.items.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <h3 className={styles.reviewerHeading}>{unlocked.steps.install.heading}</h3>
              <p className={styles.reviewerText}>{unlocked.steps.install.text}</p>
              {/* From 1.3 Ruko is signed with its own key (D-133): Android won't update a Ruko older than 1.3 over it. */}
              <p className={styles.reviewerText}>
                <strong>Have a Ruko older than 1.3?</strong> Uninstall it first, then install this version. Android won&rsquo;t
                install it over an older Ruko.
              </p>
              <a className={`button ${styles.download}`} href={unlocked.url} download>
                Download the full app
              </a>
              <h3 className={styles.reviewerHeading}>{unlocked.steps.on.heading}</h3>
              <p className={styles.reviewerText}>{unlocked.steps.on.text}</p>
              {/* Owner, 28 Oct: after the install steps, not in the note. */}
              {unlocked.steps.note.keep && (
                <p className={styles.reviewerText}>
                  {unlocked.steps.note.keep} <a href="#lite-steps">{unlocked.steps.note.keepLink}</a>
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
