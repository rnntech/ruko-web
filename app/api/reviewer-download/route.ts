import { timingSafeEqual } from "node:crypto";

/**
 * Reviewer download of the full app (D-101, D-103). The full app can't be installed from a website while Play Protect
 * is on (IS1, IS2), so it isn't offered to the public: reviewers get a code from the owner. The code and the file's
 * random path live only in the environment (REVIEWER_CODE, REVIEWER_APK_PATH: web/.env.local, Vercel project settings).
 * Since D-112 the path is the full app's Supabase Storage link, kept by `npm run publish-apks`.
 * The reviewers' note and the Play Protect steps are sent only after a valid code, so the public page never mentions
 * turning Play Protect off (independent review and owner, 24 Oct: that is the line scammers use).
 */
export const dynamic = "force-dynamic";

const STEPS = {
  note: {
    title: "Reviewers, please note",
    body:
      "The full app reads your message notifications only on your phone; your message text never leaves it. It isn’t on the Play Store yet, so to install it you’ll need to turn off Play Protect for a moment, then turn it back on. On our three test phones, Play Protect didn’t flag it. If you’d rather not, choose Ruko Lite. See the tutorial here: https://youtube.com/shorts/jFjoKQka5JI",
    warn: "No bank, police officer or genuine app will ever ask you to turn off Play Protect. This step is only for reviewers testing Ruko.",
    // Owner, 28 Oct: battery savers stop Ruko on many phones, and the testing guide as a PDF.
    keep: "After installing, keep Ruko running: battery savers on Xiaomi, Redmi, Oppo, Vivo, Realme, OnePlus and Samsung phones stop apps in the background, and a stopped Ruko can’t warn.",
    keepLink: "Steps for your phone",
    guide: "Testing guide (PDF): the rules, sample scam messages and what Ruko should do",
  },
  off: {
    heading: "1. Turn off Play Protect",
    items: [
      "Open the Play Store app.",
      "Tap your profile picture at the top right.",
      "Tap Play Protect, then the settings icon (⚙) at the top right.",
      "Turn off “Scan apps with Play Protect” and confirm. Android doesn’t allow this during a phone call.",
    ],
  },
  install: {
    heading: "2. Download and install",
    text: "Download the full app below, open the file and tap Install (allow your browser to install apps if asked).",
  },
  on: {
    heading: "3. Turn Play Protect back on",
    text: "Turn it back on straight away: Play Store → profile picture → Play Protect → ⚙ → “Scan apps with Play Protect” on.",
  },
};

function same(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export async function POST(request: Request) {
  const code = process.env.REVIEWER_CODE?.trim();
  const path = process.env.REVIEWER_APK_PATH?.trim();
  if (!code || !path) return Response.json({ ok: false, reason: "not-set-up" }, { status: 503 });
  let given = "";
  try {
    given = String((await request.json())?.code ?? "").trim().toUpperCase();
  } catch {
    return Response.json({ ok: false, reason: "bad-request" }, { status: 400 });
  }
  if (!given || !same(given, code.toUpperCase())) {
    return Response.json({ ok: false, reason: "wrong-code" }, { status: 403 });
  }
  return Response.json({ ok: true, url: path, steps: STEPS });
}
