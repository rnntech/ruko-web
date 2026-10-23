import { timingSafeEqual } from "node:crypto";

/**
 * Reviewer download of the full app (D-101, D-103). The full app can't be installed from a website while Play Protect
 * is on (IS1, IS2), so it isn't offered to the public: reviewers get a code from the owner. The code and the file's
 * random path live only in the environment (REVIEWER_CODE, REVIEWER_APK_PATH: web/.env.local, Vercel project settings).
 * The Play Protect steps are sent only after a valid code, so the public page never tells anyone to turn it off
 * (independent review, 24 Oct: that is the line scammers use).
 */
export const dynamic = "force-dynamic";

const STEPS = {
  off: [
    "Open the Play Store app.",
    "Tap your profile picture at the top right.",
    "Tap Play Protect, then the settings icon (⚙) at the top right.",
    "Turn off “Scan apps with Play Protect” and confirm. Android doesn’t allow this during a phone call.",
  ],
  install: "Download the full app below, open the file and tap Install (allow your browser to install apps if asked).",
  on: "Turn Play Protect back on straight away: Play Store → profile picture → Play Protect → ⚙ → “Scan apps with Play Protect” on.",
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
