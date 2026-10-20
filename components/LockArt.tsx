import styles from "./LockArt.module.css";

/**
 * "Nothing leaves your phone" (D-048): your calls, messages and contacts sit inside a phone; a padlock snaps
 * shut over it, a ring pulses out, and the cloud stays crossed out. Same shapes and timing as the app's
 * PrivacyArt (android/.../ui/SetupIllustrations.kt). Decorative: the screen's text says the same.
 */
export function LockArt({ className }: { className?: string }) {
  const cloud: [number, number, number][] = [
    [229, 56, 13],
    [245, 47, 17],
    [261, 57, 12],
  ];
  return (
    <svg className={`${styles.art} ${className ?? ""}`} viewBox="0 0 300 212" aria-hidden="true" focusable="false">
      <rect width="300" height="212" rx="14" fill="var(--mint-100)" />

      {/* The crossed-out cloud: dark outline first, white on top, then a slash with a mint gap. */}
      {cloud.map(([x, y, r]) => (
        <circle key={`o${x}`} cx={x} cy={y} r={r + 3} fill="var(--ink-soft)" />
      ))}
      <rect x="213" y="53" width="64" height="20" rx="10" fill="var(--ink-soft)" />
      {cloud.map(([x, y, r]) => (
        <circle key={`w${x}`} cx={x} cy={y} r={r} fill="#ffffff" />
      ))}
      <rect x="216" y="56" width="58" height="14" rx="7" fill="#ffffff" />
      <line x1="212" y1="28" x2="278" y2="86" stroke="var(--mint-100)" strokeWidth="10" strokeLinecap="round" />
      <line x1="212" y1="28" x2="278" y2="86" stroke="var(--ink)" strokeWidth="4.5" strokeLinecap="round" />

      {/* The phone with your things inside. */}
      <rect x="104" y="22" width="92" height="168" rx="16" fill="var(--ink)" />
      <rect x="110" y="29" width="80" height="154" rx="11" fill="#ffffff" />
      {[52, 78, 104].map((y, i) => (
        <g key={y} className={styles.row} style={{ animationDelay: `${-0.6 * i}s` }}>
          <circle cx="128" cy={y} r="8" fill="var(--teal-700)" />
          <rect x="142" y={y - 3} width={36 - i * 6} height="6" rx="3" fill="var(--line)" />
        </g>
      ))}

      {/* The ring that pulses out when the lock shuts, then the padlock. */}
      <circle className={styles.ring} cx="150" cy="156" r="30" fill="none" stroke="var(--mint-300)" strokeWidth="3" />
      <path
        className={styles.shackle}
        d="M136 148 L136 132 C136 114 164 114 164 132 L164 148"
        fill="none"
        stroke="var(--teal-900)"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <rect x="124" y="140" width="52" height="40" rx="9" fill="var(--teal-900)" />
      <circle cx="150" cy="156" r="5" fill="#ffffff" />
      <rect x="148" y="158" width="4" height="11" rx="2" fill="#ffffff" />
    </svg>
  );
}
