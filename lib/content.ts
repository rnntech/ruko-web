/**
 * All website text in one place (English first). Other languages get their own file with the same keys,
 * written or checked by a native speaker (docs/DECISIONS.md D-019). Writing rules: docs/DESIGN.md Section 7.
 */
export const en = {
  siteName: "Ruko",
  /** Used in WhatsApp share text. Change when the site is deployed. */
  siteUrl: "https://ruko.vercel.app",
  /** The "Ruko scam alerts" WhatsApp Channel (D-031). Empty until the owner creates it; the button is hidden until then. */
  whatsappChannelUrl: "",
  tagline: "The pause scammers don't want you to take.",
  description:
    "Ruko is an Android app that warns you, in your own language, when a stranger on a call rushes you to pay, share an OTP, install an app or tap a link.",
  nav: {
    how: "How it works",
    scams: "Scams going around",
    demo: "See the warning",
    privacy: "Privacy",
    install: "Get the app",
  },
  scams: {
    title: "Scams going around",
    lead: "Scams reported recently by the police, the government and news outlets. A person checks every one before it appears here. Send them to your family before a scammer calls them.",
    homeTitle: "Scams going around now",
    homeLead: "Short, checked and sourced. Read one, then send it to the family group.",
    seeAll: "See all scams",
    draft: "Draft, not yet checked",
    draftNote: "You're seeing the local preview, so draft cards are shown. The live site shows checked cards only.",
    empty: "No checked scam alerts yet. Each card is checked by a person before it appears here.",
    theySay: "What they say",
    theyAsk: "They ask you to:",
    redFlag: "How to spot it",
    whatToDo: "What to do",
    readMore: "Read the full alert",
    channelsLabel: "How this scam reaches people",
    channels: {
      call: "Phone call",
      video_call: "Video call",
      sms: "SMS",
      whatsapp: "WhatsApp",
      telegram: "Telegram",
      social_media: "Social media",
      website: "Fake website",
      app_file: "App file (.apk)",
    },
    added: "Added",
    source: "Source:",
    share: "Send to family on WhatsApp",
    followTitle: "Get one scam a week on WhatsApp",
    followBody: "Follow the Ruko WhatsApp Channel for one checked scam alert a week. WhatsApp doesn't show your number to us or to other followers. Ruko users can also turn on “Scam of the week” in the app.",
    follow: "Follow on WhatsApp",
    followSoon: "The Ruko WhatsApp Channel opens soon.",
    rulesTitle: "Three rules that stop most scams",
    rules: [
      "Police, CBI, TRAI and banks never ask for money or an OTP on a call. There is no “digital arrest”.",
      "Never install an app or open an .apk file because someone asked you to.",
      "Hang up, then call back on a number you already have. If you lost money, call 1930 at once.",
    ],
    sourcesTitle: "Where these come from",
    sourcesBody: "Only credible sources: government safety portals, regulators, the police and courts, and established news outlets. Never forwards, social media posts or blogs. Each card links to its sources.",
    portalsTitle: "Government safety portals you can use yourself",
    outletsTitle: "News outlets and fact-checkers we cite",
  },
  footer: {
    helpline: "If you have lost money to a scam, call 1930 now or report it at cybercrime.gov.in. The sooner you report, the better the chance of stopping the money.",
    built: "Built for the HelloPM Buildathon, October 2026. Now testing with a small group of families.",
  },
};

export type Content = typeof en;
export const t: Content = en;
