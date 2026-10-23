import { timingSafeEqual } from "node:crypto";

/**
 * Reviewer download of the full app (D-101). The full app can't be installed from a website while Play Protect is on
 * (IS1, IS2), so it isn't offered to the public: reviewers get a code from the owner. The code and the file's random
 * path live only in the environment (REVIEWER_CODE, REVIEWER_APK_PATH: web/.env.local, Vercel project settings),
 * never in the repo or the page.
 */
export const dynamic = "force-dynamic";

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
  return Response.json({ ok: true, url: path });
}
