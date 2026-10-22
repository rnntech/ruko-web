import styles from "./Phone.module.css";
import { LogoMark } from "./Logo";
import { LockArt } from "./LockArt";
import { RukoScene } from "./RukoScene";

/**
 * Drawn phones showing real moments (docs/DESIGN_LANGUAGE.md Section 8). They copy real Android
 * screens (status bar, in-call chip, dialer, payment screen) so they read as the real thing (D-032).
 * Labelled as mock-ups until screenshots from tested phones replace them.
 */
export function PhoneFrame({ children, label, width }: { children: React.ReactNode; label: string; width?: number }) {
  return (
    <div
      className={styles.phone}
      data-ui /* the app's own screens: their borders, shadows and small text are the app's (taste-skill) */
      role="img"
      aria-label={label}
      style={
        width
          ? ({ width, "--bezel": `${(width * 0.041).toFixed(1)}px`, "--radius": `${Math.round(width / 7)}px` } as React.CSSProperties)
          : undefined
      }
    >
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

/** The app's first setup screen (D-048): teal header, the RukoBot scene, a short intro, Continue. */
export function WelcomeScreen() {
  return (
    <div className={`${styles.screen} ${styles.welcomeScreen}`}>
      <div className={styles.welcomeHead}>
        <StatusBar dark />
        <div className={styles.welcomeBrand}>
          <LogoMark size={22} variant="reversed" />
          <span>ruko</span>
        </div>
        <p className={styles.welcomeTitle}>Meet Ruko</p>
      </div>
      <RukoScene className={styles.welcomeScene} viewBox="36 56 576 318" />
      <div className={styles.welcomeBody}>
        <p>Ruko steps in when a stranger on a call gets you to:</p>
        <ul className={styles.welcomeList}>
          <li>open your bank or UPI app</li>
          <li>share an OTP</li>
          <li>share your screen</li>
        </ul>
        <p>It also checks messages for scam links and app files. You see a warning, hear it aloud, and pause before you pay.</p>
      </div>
      <span className={styles.welcomeButton}>Continue</span>
    </div>
  );
}

/** The app's teal header: status bar, logo (with a back arrow on inner screens), an optional thin progress bar, the title. */
export function AppHeader({ title, progress, sub, back = false }: { title: string; progress?: number; sub?: string; back?: boolean }) {
  return (
    <div className={styles.welcomeHead}>
      <StatusBar dark />
      <div className={styles.welcomeBrand}>
        {back && (
          <svg className={styles.backArrow} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 12H6M11 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        <LogoMark size={22} variant="reversed" />
        <span>ruko</span>
      </div>
      {progress !== undefined && (
        <span className={styles.setupProgress} aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </span>
      )}
      <p className={styles.welcomeTitle}>{title}</p>
      {sub && <p className={styles.homeSub}>{sub}</p>}
    </div>
  );
}

/** Setup step 2 (D-048): "Nothing leaves your phone", with the lock. */
export function PrivacyScreen() {
  return (
    <div className={`${styles.screen} ${styles.welcomeScreen}`}>
      <AppHeader title="Nothing leaves your phone" progress={14} />
      <LockArt className={styles.lockArt} />
      <p className={styles.welcomeBody}>
        Ruko checks calls and messages right here, on your phone. It never listens to your calls, and never sends
        your messages or contacts anywhere.
      </p>
      <span className={styles.welcomeButton}>Continue</span>
    </div>
  );
}

/** Home with protection on; Ruko's own "protecting you" notification drops in from the top. */
export function HomeOnScreen({ scamCount }: { scamCount: number }) {
  return (
    <div className={`${styles.screen} ${styles.welcomeScreen} ${styles.homeScreen}`}>
      <AppHeader title="Protection is on" sub="Helper: Arjun" />
      <div className={styles.homeCard}>
        <div className={styles.homeRow}>
          <span>
            <b>Scams going around</b>
            {scamCount} scams to know about. Share them with family.
          </span>
          <i aria-hidden="true">&rsaquo;</i>
        </div>
        <div className={styles.homeRow}>
          <span>
            <b>Check a message</b>
            Paste a message, or choose a screenshot
          </span>
          <i aria-hidden="true">&rsaquo;</i>
        </div>
      </div>
      <span className={styles.homeSettings}>Settings</span>
      <div className={styles.homeNotif} aria-hidden="true">
        <LogoMark size={18} />
        <span>
          <b>Ruko</b> &middot; now
          <br />
          Ruko is protecting you
        </span>
      </div>
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

/** Ruko's red warning, worded and laid out like the app's (strings from res/values/strings.xml: warning_*, reason_r1). */
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
        <LogoMark size={44} variant="warning" />
        {isMessage ? (
          <>
            <p className={styles.warnHeadline}>Pause. This message looks like a scam.</p>
            <p className={styles.warnFrom}>From +91 99999 00000 on WhatsApp, Oct 21, 3:16 PM</p>
            <p className={styles.warnQuote}>&ldquo;Aapka bijli connection aaj raat 9:30 baje kat jayega&hellip;&rdquo;</p>
            <p className={styles.warnAdvice}>Don&rsquo;t reply, tap links or open files in it.</p>
            <span className={styles.warnButton}>Got it</span>
            <span className={styles.warnLink}>Lost money? Call 1930</span>
            <span className={styles.warnLink}>Report this message on Chakshu</span>
          </>
        ) : (
          <>
            <p className={styles.warnHeadline}>Pause. This call looks like a scam.</p>
            <p className={styles.warnReason}>You opened a payment or bank app.</p>
            <p className={styles.warnAdvice}>Hang up. Never pay, share a code or install an app for a caller.</p>
            <p className={styles.warnFamily}>Says they&rsquo;re family? Ask your family word.</p>
            <span className={styles.warnButton}>{helperName ? `Call ${helperName}` : "Call 1930 (cyber crime helpline)"}</span>
            {helperName && <span className={styles.warnLink}>Call 1930 (cyber crime helpline)</span>}
            <span className={styles.warnLink}>Report this number on Chakshu</span>
            <span className={styles.warnLink}>You can continue in 30 seconds</span>
          </>
        )}
      </div>
    </div>
  );
}
