import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { curly, unquote } from "@/lib/cards";
import { liveCards } from "@/lib/liveFeed";
import { t } from "@/lib/content";

/**
 * The WhatsApp picture for a scam card (D-049, growth hook 4), drawn when someone asks for it, from the card's
 * current text: the scam's name, what they say, how to spot it, RukoBot holding up its palms, and "Ruko catches
 * this. Get it for your family". New and edited cards get their picture automatically; drafts get none on the
 * live site (visibleCards hides them). Used by "Send to family on WhatsApp" and as /scams/<id>'s link preview.
 */
const SIZE = 1080;
const TEAL = "#0A4D49";
const MINT = "#DDF2EA";
const MINT_300 = "#9FD9C3";
const INK = "#14191E";
const INK_SOFT = "#4A535C";
const PAPER = "#F3F5F4";
const LINE = "#D6DEDB";
const DANGER = "#B3261E";
const DANGER_BG = "#FCEBE9";

/** RukoBot (mascot G, docs/design/rukobot.html) in its "Ruko!" pose: palms up. */
const ROBOT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-16 -12 80 78">
<g fill="none" stroke="${TEAL}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
<path d="M18 45 L16 57 L10 57"/><path d="M30 45 L32 57 L38 57"/>
<path d="M4 27 L-6 27 L-6 15"/><path d="M44 27 L54 27 L54 15"/></g>
<rect x="-10.5" y="3" width="9" height="12" rx="4" fill="${TEAL}"/><rect x="49.5" y="3" width="9" height="12" rx="4" fill="${TEAL}"/>
<path d="M14.89,2 L33.11,2 L46,14.89 L46,33.11 L33.11,46 L14.89,46 L2,33.11 L2,14.89 Z" fill="${TEAL}" stroke="${TEAL}" stroke-width="4" stroke-linejoin="round"/>
<rect x="15" y="15" width="6" height="18" rx="3" fill="#fff"/><rect x="27" y="15" width="6" height="18" rx="3" fill="#fff"/>
</svg>`;

/** The logo reversed (white octagon, teal bars) for the teal footer. */
const LOGO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
<path d="M14.89,2 L33.11,2 L46,14.89 L46,33.11 L33.11,46 L14.89,46 L2,33.11 L2,14.89 Z" fill="#fff" stroke="#fff" stroke-width="4" stroke-linejoin="round"/>
<rect x="15" y="15" width="6" height="18" rx="3" fill="${TEAL}"/><rect x="27" y="15" width="6" height="18" rx="3" fill="${TEAL}"/>
</svg>`;

const svgSrc = (svg: string) => `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
const font = (file: string) => readFile(join(process.cwd(), "assets", "fonts", file));

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const card = (await liveCards()).find((c) => c.id === id);
  if (!card) return new Response("Not found", { status: 404 });

  const [archivo, lexend, lexendSemi] = await Promise.all([
    font("archivo-latin-800-normal.woff"),
    font("lexend-latin-400-normal.woff"),
    font("lexend-latin-600-normal.woff"),
  ]);
  const site = t.siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
  // The image renderer can't draw the rupee sign without fetching an outside font, so write "Rs" (like most cards).
  const rs = (text: string) => text.replace(/₹\s?/g, "Rs ");
  const say = rs(curly(unquote(card.they_say.en)));
  const flag = rs(curly(card.red_flag.en));
  // Longer cards get smaller text so everything fits above the footer.
  const sayFont = say.length <= 110 ? 34 : say.length <= 170 ? 30 : 26;
  const flagFont = flag.length <= 120 ? 30 : flag.length <= 170 ? 27 : 24;
  const label = { fontSize: 22, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" as const };

  return new ImageResponse(
    (
      <div style={{ width: SIZE, height: SIZE, display: "flex", flexDirection: "column", background: PAPER, fontFamily: "Lexend", color: INK }}>
        <div style={{ height: 300, display: "flex", flexDirection: "column", background: TEAL, padding: "56px 64px 0" }}>
          <div style={{ ...label, fontSize: 28, color: MINT_300 }}>Scam going around</div>
          <div style={{ fontFamily: "Archivo", fontSize: 56, lineHeight: 1.12, color: "#fff", marginTop: 16, letterSpacing: -0.5 }}>
            {rs(curly(card.name.en))}
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", padding: "40px 64px 0", overflow: "hidden" }}>
          <div style={{ width: 656, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "column", background: "#fff", border: `3px solid ${LINE}`, borderRadius: 28, padding: "24px 32px 28px" }}>
              <div style={{ ...label, color: INK_SOFT }}>They say</div>
              <div style={{ fontSize: sayFont, lineHeight: 1.45, marginTop: 8 }}>{say}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", background: DANGER_BG, borderRadius: 24, padding: "24px 32px 28px", marginTop: 28 }}>
              <div style={{ ...label, fontWeight: 600, color: DANGER }}>How to spot it</div>
              <div style={{ fontSize: flagFont, lineHeight: 1.45, marginTop: 8 }}>{flag}</div>
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", paddingBottom: 40 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={svgSrc(ROBOT)} width={300} height={292} alt="" />
            <div style={{ width: 230, height: 20, borderRadius: 999, background: LINE, marginTop: -14 }} />
          </div>
        </div>

        <div style={{ height: 140, display: "flex", alignItems: "center", background: TEAL, padding: "0 64px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={svgSrc(LOGO)} width={52} height={52} alt="" />
          <div style={{ display: "flex", flexDirection: "column", marginLeft: 20 }}>
            <div style={{ fontFamily: "Archivo", fontSize: 32, color: "#fff" }}>Ruko catches this.</div>
            <div style={{ fontSize: 24, color: MINT, marginTop: 4 }}>{`Get it for your family: ${site}`}</div>
          </div>
        </div>
      </div>
    ),
    {
      width: SIZE,
      height: SIZE,
      fonts: [
        { name: "Archivo", data: archivo, weight: 800, style: "normal" },
        { name: "Lexend", data: lexend, weight: 400, style: "normal" },
        { name: "Lexend", data: lexendSemi, weight: 600, style: "normal" },
      ],
      headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
    },
  );
}
