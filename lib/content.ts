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
    spot: "Spot the scam",
  },
  /** Home: "Check a message", the everyday use (growth hook 3, D-049). */
  check: {
    title: "Got a strange message? Forward it to Ruko.",
    lead: "You don't have to wait for a scam call. Any SMS or WhatsApp message that worries you, Ruko checks in a second, on your phone.",
    steps: [
      "Long-press the message, tap Share, and choose Ruko. Or share a screenshot of it.",
      "Ruko checks it right there. Nothing is sent anywhere.",
      "It tells you if it looks like a scam, which one, and what to do.",
    ],
    testTitle: "Think you'd spot it yourself?",
    testBody: "Real bank messages and scams often say the same thing. Try 8 of them.",
    testLink: "Take the 60-second test",
  },
  /** "Can you spot the scam?" (D-049). The messages themselves are in lib/spot-the-scam.json. */
  spot: {
    title: "Can you spot the scam?",
    lead: "Real bank messages and scams often say the same thing. The difference is who sent it and what they ask you to do.",
    metaDescription:
      "Eight real and fake messages and calls, modelled on scams reported in India this past year. Most of them look exactly like the real thing.",
    intro: (n: number) =>
      `You'll see ${n} messages and calls. Some are real, some are scams copied from ones reported in India this past year. For each one, decide: real or scam?`,
    start: "Start the test",
    privacyNote: "Takes about a minute. Your answers stay in your browser.",
    progress: (at: number, n: number) => `${at} of ${n}`,
    channels: { sms: "SMS", whatsapp: "WhatsApp", call: "Incoming call" },
    real: "Real",
    scam: "Scam",
    right: "Right.",
    wrong: "Not quite.",
    isScam: "This one is a scam.",
    isReal: "This one is real.",
    reportedBy: "Reported by",
    next: "Next",
    seeScore: "See your score",
    score: (got: number, n: number) => `You got ${got} of ${n} right.`,
    resultLead: "The tell is rarely the wording. It's who sent it, and what they ask you to do.",
    habits: [
      "Banks message you from their sender name (like JD-SBIUPI) and call from numbers starting 1600, not from ordinary mobile numbers.",
      "Never reply, read out an OTP or send money because a message says so. Open your bank's own app and check.",
      "If family asks for money from a new number, call them back on the number you've saved.",
    ],
    share: "Share on WhatsApp",
    shareText: (got: number, n: number, url: string) => `I got ${got} of ${n} on Ruko's "Can you spot the scam?" test. Try it: ${url}/spot-the-scam`,
    again: "Try another round",
    cta: "Ruko pauses the people you love at exactly these moments.",
    ctaLink: "Get Ruko for your family",
    examplesNote: "Examples modelled on real messages. Numbers, names and links are made up.",
  },
  scams: {
    title: "Scams going around",
    lead: "Scams reported recently by the police, the government and news outlets. A person checks every one before it appears here. Send them to your family before a scammer calls them.",
    homeTitle: "Scams going around now",
    homeLead: "Short, checked and sourced. Read one, then send it to the family group.",
    seeAll: "See all scams",
    draft: "Waiting for review",
    draftNote: "You're seeing the local preview, so cards waiting for review are shown. The live site only shows cards a person has checked against their sources.",
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
    allLink: "See all scams going around",
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
