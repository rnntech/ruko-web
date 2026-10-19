import styles from "./Phone.module.css";
import { LogoMark } from "./Logo";

/**
 * Drawn phones showing real moments (docs/DESIGN_LANGUAGE.md Section 8). They copy real Android
 * screens (status bar, in-call chip, dialer, payment screen) so they read as the real thing (D-032).
 * Labelled as mock-ups until screenshots from tested phones replace them.
 */
export function PhoneFrame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className={styles.phone} role="img" aria-label={label}>
      <div className={styles.camera} aria-hidden="true" />
      {children}
    </div>
  );
}

/** Android status bar. [call] shows the green "call in progress" chip that stays on screen during a call. */
function StatusBar({ dark = false, call = false }: { dark?: boolean; call?: boolean }) {
  return (
    <div className={`${styles.status} ${dark ? styles.statusDark : ""}`} aria-hidden="true">
      {call ? <span className={styles.callChip}>Call 41:12</span> : <span>4:41</span>}
      <span className={styles.statusIcons}>
        <span className={styles.signal} />
        <span className={styles.battery} />
      </span>
    </div>
  );
}

export function IncomingCallScreen() {
  return (
    <div className={`${styles.screen} ${styles.callScreen}`}>
      <StatusBar dark />
      <p className={styles.callNumber}>+91 98xxx xx210</p>
      <p className={styles.callMeta}>Mumbai · Not in contacts</p>
      <p className={styles.callTimer}>41:12</p>
      <p className={styles.callQuote}>&ldquo;You are under digital arrest. Stay on the call. Tell no one.&rdquo;</p>
      <div className={styles.callGrid} aria-hidden="true">
        {["Mute", "Keypad", "Speaker", "Add call", "Video", "Hold"].map((label) => (
          <span key={label} className={styles.callKey}>
            <span className={styles.callKeyDot} />
            {label}
          </span>
        ))}
      </div>
      <span className={styles.endCall} aria-hidden="true" />
    </div>
  );
}

export function BankAppScreen() {
  return (
    <div className={`${styles.screen} ${styles.bankScreen}`}>
      <StatusBar call />
      <div className={styles.bankBar}>Pay to new account</div>
      <div className={styles.bankBody}>
        <span className={styles.payee} aria-hidden="true">
          RV
        </span>
        <p className={styles.payeeName}>RBI Verification Cell</p>
        <p className={styles.payeeId}>A/c xxxx 4471 · new payee</p>
        <p className={styles.amount}>&#8377;2,40,000</p>
        <p className={styles.remark}>&ldquo;Refundable after verification&rdquo;</p>
      </div>
      <span className={styles.bankButton}>Enter PIN to pay</span>
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
      <StatusBar dark call={!isMessage} />
      <div className={styles.warnBody}>
        <LogoMark size={48} variant="warning" />
        <p className={styles.warnHeadline}>
          {isMessage ? "Pause. This message looks like a scam." : "Pause. This call looks like a scam."}
        </p>
        <p className={styles.warnReason}>
          {isMessage
            ? "It has an app file pretending to be a wedding card."
            : "A stranger has kept you on the phone for 41 minutes, and you just opened your bank app."}
        </p>
        <p className={styles.warnAdvice}>
          {isMessage
            ? "Do not open the file. Call the sender on their saved number."
            : "Police, CBI and banks never ask for money on a call. Hang up."}
        </p>
        <span className={styles.warnButton}>{isMessage ? "Got it" : helperName ? `Call ${helperName}` : "Call 1930"}</span>
        {!isMessage && (
          <span className={styles.warnLinks}>
            {helperName ? "Call 1930 · " : ""}I know this caller · Continue in 30s
          </span>
        )}
      </div>
    </div>
  );
}
