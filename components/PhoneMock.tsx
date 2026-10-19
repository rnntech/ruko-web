import styles from "./PhoneMock.module.css";

type Props = {
  kind?: "call" | "message";
  helperName?: string | null;
};

/**
 * A drawn mock-up of Ruko's warning screen, clearly labelled as a mock-up.
 * Replace with real screenshots once the app has been tested on a phone (docs/DESIGN.md Section 5.4).
 */
export function PhoneMock({ kind = "call", helperName = null }: Props) {
  const isMessage = kind === "message";
  return (
    <figure className={styles.figure}>
      <div className={styles.phone} role="img" aria-label={`Mock-up of Ruko's red warning screen${isMessage ? " for a scam message" : " during a risky call"}`}>
        <div className={styles.screen}>
          <p className={styles.headline}>{isMessage ? "This message looks like a scam." : "Stop. This may be a scam."}</p>
          <p className={styles.reason}>
            {isMessage
              ? "This message matches a known scam."
              : "You opened a payment or bank app during a call with an unknown number."}
          </p>
          <p className={styles.advice}>
            {isMessage
              ? "Don't tap links or open files in it."
              : "Police, CBI and banks never ask for money on a call. Hang up."}
          </p>
          <span className={styles.button}>
            {isMessage ? "Got it" : helperName ? `Call ${helperName}` : "Call 1930 (cyber crime helpline)"}
          </span>
          {!isMessage && (
            <>
              {helperName && <span className={styles.link}>Call 1930</span>}
              <span className={styles.link}>I know this caller</span>
              <span className={styles.link}>You can continue in 30 seconds</span>
            </>
          )}
        </div>
      </div>
      <figcaption className={styles.caption}>Mock-up. The real app shows this on Android, and reads it aloud.</figcaption>
    </figure>
  );
}
