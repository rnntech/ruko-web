import styles from "./Phone.module.css";
import { LogoMark } from "./Logo";

/**
 * Drawn phones showing real moments (docs/DESIGN_LANGUAGE.md Section 8). Labelled as mock-ups
 * until real screenshots from tested phones replace them.
 */
export function PhoneFrame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className={styles.phone} role="img" aria-label={label}>
      <div className={styles.notch} aria-hidden="true" />
      {children}
    </div>
  );
}

export function IncomingCallScreen() {
  return (
    <div className={`${styles.screen} ${styles.callScreen}`}>
      <p className={styles.callStatus}>Ongoing call · 41:12</p>
      <div className={styles.avatar} aria-hidden="true">?</div>
      <p className={styles.callName}>+91 98xxx xx210</p>
      <p className={styles.callSub}>Not in your contacts</p>
      <p className={styles.callQuote}>&ldquo;This is Mumbai Police. You are under digital arrest. Tell no one.&rdquo;</p>
      <div className={styles.callButtons} aria-hidden="true">
        <span className={styles.endCall} />
      </div>
    </div>
  );
}

export function BankAppScreen() {
  return (
    <div className={`${styles.screen} ${styles.bankScreen}`}>
      <p className={styles.bankTitle}>Your bank</p>
      <p className={styles.bankLabel}>Send money to a new account</p>
      <div className={styles.bankField}>
        <span>To</span>
        <strong>&ldquo;RBI verification account&rdquo;</strong>
      </div>
      <div className={styles.bankField}>
        <span>Amount</span>
        <strong>₹2,40,000</strong>
      </div>
      <span className={styles.bankButton}>Pay now</span>
    </div>
  );
}

export function WarningScreen({
  kind = "call",
  helperName = null,
}: {
  kind?: "call" | "message";
  helperName?: string | null;
}) {
  const isMessage = kind === "message";
  return (
    <div className={`${styles.screen} ${styles.warnScreen}`}>
      <LogoMark size={44} variant="warning" />
      <p className={styles.warnHeadline}>{isMessage ? "This message looks like a scam." : "Stop. This may be a scam."}</p>
      <p className={styles.warnReason}>
        {isMessage
          ? "It has an app file pretending to be a wedding card."
          : "Unknown caller for 41 minutes. You just opened your bank app."}
      </p>
      <p className={styles.warnAdvice}>
        {isMessage ? "Don't open the file. Call the sender on their saved number." : "Police, CBI and banks never ask for money on a call. Hang up."}
      </p>
      <span className={styles.warnButton}>
        {isMessage ? "Got it" : helperName ? `Call ${helperName}` : "Call 1930"}
      </span>
      {!isMessage && (
        <span className={styles.warnLinks}>
          {helperName ? "Call 1930 · " : ""}I know this caller · Continue in 30s
        </span>
      )}
    </div>
  );
}
