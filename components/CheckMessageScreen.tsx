"use client";

import { useEffect, useState } from "react";
import { AppHeader } from "./Phone";
import styles from "./Phone.module.css";

/**
 * "Check a message" in the hero phone (D-048): a scam SMS types itself in, Check is pressed, then the verdict
 * and the matching scam card appear. Wording is the app's own (check_* strings); Ruko's real rules flag this
 * message (a bank name in a lookalike link). Plays once each time the screen slides in; with reduced motion
 * it shows the finished result straight away.
 */
const MESSAGE =
  "Dear Customer, your SBI account KYC has expired. Update now or your account will be blocked: sbi-kyc-online.xyz";
const START_MS = 500;
const PER_CHAR_MS = 18;

export function CheckMessageScreen() {
  const [typed, setTyped] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pressing" | "done">("typing");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(MESSAGE.length);
      setPhase("done");
      return;
    }
    const timers: number[] = [];
    for (let i = 1; i <= MESSAGE.length; i++) {
      timers.push(window.setTimeout(() => setTyped(i), START_MS + i * PER_CHAR_MS));
    }
    const typedAt = START_MS + MESSAGE.length * PER_CHAR_MS;
    timers.push(window.setTimeout(() => setPhase("pressing"), typedAt + 300));
    timers.push(window.setTimeout(() => setPhase("done"), typedAt + 600));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  const done = phase === "done";
  return (
    <div className={`${styles.screen} ${styles.welcomeScreen}`}>
      <AppHeader title="Check a message" back />
      <p className={styles.checkIntro}>
        Paste a message, or choose a screenshot. It&rsquo;s checked on this phone and never sent anywhere.
      </p>
      <div className={styles.checkField}>
        <span className={styles.checkLabel}>Paste the message here</span>
        <p>
          {MESSAGE.slice(0, typed)}
          {!done && <span className={styles.caret} aria-hidden="true" />}
        </p>
      </div>
      <div className={`${styles.verdict} ${done ? styles.shown : ""}`}>
        <b>This looks like a scam.</b>
        It has a link that hides where it goes, or copies a bank&rsquo;s website.
      </div>
      <div className={`${styles.match} ${done ? styles.shown : ""}`}>
        <p className={styles.matchTitle}>The scam it matches</p>
        <div className={styles.matchCard}>
          <span className={styles.matchTags}>
            <i>SMS</i>
            <i>WhatsApp</i>
          </span>
          <b>Fake bank &ldquo;KYC expired&rdquo; message</b>
        </div>
      </div>
      <span className={`${styles.welcomeButton} ${phase === "pressing" ? styles.pressed : ""}`}>
        {done ? "Check another message" : "Check"}
      </span>
    </div>
  );
}
