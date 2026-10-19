/** Ruko mark: an octagon (stop) with pause bars. docs/DESIGN_LANGUAGE.md Section 7. */
export function LogoMark({
  size = 32,
  variant = "primary",
}: {
  size?: number;
  variant?: "primary" | "reversed" | "warning";
}) {
  const shape = variant === "primary" ? "var(--teal-900)" : "#ffffff";
  const bars = variant === "primary" ? "#ffffff" : variant === "reversed" ? "var(--teal-900)" : "var(--danger)";
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path
        d="M14.89,2 L33.11,2 L46,14.89 L46,33.11 L33.11,46 L14.89,46 L2,33.11 L2,14.89 Z"
        fill={shape}
        stroke={shape}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <rect x="15" y="15" width="6" height="18" rx="3" fill={bars} />
      <rect x="27" y="15" width="6" height="18" rx="3" fill={bars} />
    </svg>
  );
}
