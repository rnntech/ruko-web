/**
 * All website text in one place (English first). Other languages get their own file with the same keys,
 * written or checked by a native speaker (docs/DECISIONS.md D-019). Writing rules: docs/DESIGN.md Section 7.
 */
export const en = {
  siteName: "Ruko",
  tagline: "The pause scammers don't want you to take.",
  description:
    "Ruko is an Android app that warns you, in your own language, when a stranger on a call rushes you to pay, share an OTP, install an app or tap a link.",
  nav: {
    how: "How it works",
    demo: "See the warning",
    privacy: "Privacy",
    install: "Get the app",
  },
  footer: {
    helpline: "If you have lost money to a scam, call 1930 now or report it at cybercrime.gov.in. The sooner you report, the better the chance of stopping the money.",
    built: "Built for the HelloPM Buildathon, October 2026. Now testing with a small group of families.",
  },
};

export type Content = typeof en;
export const t: Content = en;
