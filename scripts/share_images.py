"""
WhatsApp share images for scam cards (D-049, growth hook 4): a 1080x1080 picture per card with the scam's name,
what they say, how to spot it, RukoBot holding up its palms, and "Ruko catches this. Get it for your family".

Approved cards  -> web/public/share/<id>.png        (published with the site)
Draft cards     -> web/public/share/draft/<id>.png  (gitignored: drafts never leave this computer)

Run after a card is approved:  python -I web/scripts/share_images.py   (needs Pillow)
Fonts are the app's own Archivo and Lexend (android/app/src/main/res/font). RukoBot is drawn from the same shapes as
docs/design/rukobot.html (variant G, the "stop" pose).
"""
import json
import os
import re
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
CARDS = os.path.join(ROOT, "cards", "scam-cards.json")
FONTS = os.path.join(ROOT, "android", "app", "src", "main", "res", "font")
OUT = os.path.join(ROOT, "web", "public", "share")
CONTENT = os.path.join(ROOT, "web", "lib", "content.ts")

TEAL, TEAL_700, MINT, MINT_300 = "#0A4D49", "#0B6E69", "#DDF2EA", "#9FD9C3"
INK, INK_SOFT, PAPER, LINE = "#14191E", "#4A535C", "#F3F5F4", "#D6DEDB"
DANGER, DANGER_BG = "#B3261E", "#FCEBE9"
SIZE = 1080
SCALE = 2  # draw at 2x, then shrink, for smooth edges


def font(name, size, weight):
    f = ImageFont.truetype(os.path.join(FONTS, name), size * SCALE)
    try:
        f.set_variation_by_axes([weight])
    except Exception:
        pass
    return f


def display(size):
    return font("archivo_variable.ttf", size, 800)


def body(size, weight=400):
    return font("lexend_variable.ttf", size, weight)


def curly(text):
    text = re.sub(r'(^|[\s(\[])"', "\\1\u201c", text)
    text = text.replace('"', "\u201d")
    return text.replace("'", "\u2019")


def unquote(text):
    t = text.strip()
    if t.count('"') == 2 and t.startswith('"') and t.endswith('"'):
        return t[1:-1]
    if t.startswith("\u201c") and t.endswith("\u201d") and t.count("\u201c") == 1:
        return t[1:-1]
    return t


def wrap(draw, text, f, width):
    lines, line = [], ""
    for word in text.split():
        trial = f"{line} {word}".strip()
        if draw.textlength(trial, font=f) <= width * SCALE:
            line = trial
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def text_block(draw, xy, text, f, width, fill, leading, max_lines=None):
    x, y = xy
    lines = wrap(draw, text, f, width)
    if max_lines and len(lines) > max_lines:
        lines = lines[:max_lines]
        while draw.textlength(lines[-1] + "\u2026", font=f) > width * SCALE and " " in lines[-1]:
            lines[-1] = lines[-1].rsplit(" ", 1)[0]
        lines[-1] += "\u2026"
    for line in lines:
        draw.text((x * SCALE, y * SCALE), line, font=f, fill=fill)
        y += leading
    return y


def S(*v):
    return [c * SCALE for c in v]


def limb(draw, pts, width, fill):
    pts = [(x * SCALE, y * SCALE) for x, y in pts]
    draw.line(pts, fill=fill, width=int(width * SCALE), joint="curve")
    r = width * SCALE / 2
    for x, y in (pts[0], pts[-1]):
        draw.ellipse([x - r, y - r, x + r, y + r], fill=fill)


def rukobot(draw, ox, oy, k):
    """RukoBot, palms up ("Ruko!"), in its 80x78 box; (ox, oy) is the octagon's top-left, k the scale."""
    P = lambda x, y: (ox + x * k, oy + y * k)
    w = 6 * k
    limb(draw, [P(18, 45), P(16, 57), P(10, 57)], w, TEAL)
    limb(draw, [P(30, 45), P(32, 57), P(38, 57)], w, TEAL)
    limb(draw, [P(4, 27), P(-6, 27), P(-6, 15)], w, TEAL)
    limb(draw, [P(44, 27), P(54, 27), P(54, 15)], w, TEAL)
    for px in (-10.5, 49.5):
        x0, y0 = P(px, 3)
        draw.rounded_rectangle(S(x0, y0, x0 + 9 * k, y0 + 12 * k), radius=4 * k * SCALE, fill=TEAL)
    octagon = [P(14.89, 2), P(33.11, 2), P(46, 14.89), P(46, 33.11), P(33.11, 46), P(14.89, 46), P(2, 33.11), P(2, 14.89)]
    draw.polygon([(x * SCALE, y * SCALE) for x, y in octagon], fill=TEAL)
    # The logo's rounded stroke: each edge as a thick line with round ends, so corners come out soft.
    for a, b in zip(octagon, octagon[1:] + octagon[:1]):
        limb(draw, [a, b], 4 * k, TEAL)
    for bx in (15, 27):
        x0, y0 = P(bx, 15)
        draw.rounded_rectangle(S(x0, y0, x0 + 6 * k, y0 + 18 * k), radius=3 * k * SCALE, fill="#FFFFFF")


def logo(draw, x, y, s, shape, bars):
    k = s / 48
    octagon = [(14.89, 2), (33.11, 2), (46, 14.89), (46, 33.11), (33.11, 46), (14.89, 46), (2, 33.11), (2, 14.89)]
    draw.polygon([((x + a * k) * SCALE, (y + b * k) * SCALE) for a, b in octagon], fill=shape)
    for bx in (15, 27):
        draw.rounded_rectangle(S(x + bx * k, y + 15 * k, x + (bx + 6) * k, y + 33 * k), radius=3 * k * SCALE, fill=bars)


def site_url():
    m = re.search(r'siteUrl:\s*"([^"]+)"', open(CONTENT, encoding="utf-8").read())
    return (m.group(1) if m else "ruko.app").replace("https://", "").replace("http://", "").rstrip("/")


def make(card, url):
    img = Image.new("RGB", (SIZE * SCALE, SIZE * SCALE), PAPER)
    d = ImageDraw.Draw(img)

    # Header: teal field with the scam's name.
    d.rectangle(S(0, 0, SIZE, 300), fill=TEAL)
    d.text(S(64, 58), "SCAM GOING AROUND", font=body(28, 600), fill=MINT_300)
    text_block(d, (64, 104), curly(card["name"]["en"]), display(56), 950, "#FFFFFF", 64, max_lines=3)

    # What they say, as a speech bubble.
    say = curly(unquote(card["they_say"]["en"]))
    f_say = body(34)
    lines = wrap(d, say, f_say, 600)[:5]
    bubble_h = 70 + len(lines) * 50
    d.rounded_rectangle(S(64, 344, 720, 344 + bubble_h), radius=28 * SCALE, fill="#FFFFFF", outline=LINE, width=3 * SCALE)
    d.text(S(96, 368), "THEY SAY", font=body(22, 600), fill=INK_SOFT)
    text_block(d, (96, 404), say, f_say, 600, INK, 50, max_lines=5)

    # How to spot it.
    top = 344 + bubble_h + 32
    flag = curly(card["red_flag"]["en"])
    f_flag = body(30)
    flag_lines = min(len(wrap(d, flag, f_flag, 600)), 5)
    d.rounded_rectangle(S(64, top, 720, top + 84 + flag_lines * 44), radius=24 * SCALE, fill=DANGER_BG)
    d.text(S(96, top + 24), "HOW TO SPOT IT", font=body(22, 700), fill=DANGER)
    text_block(d, (96, top + 62), flag, f_flag, 600, INK, 44, max_lines=5)

    # RukoBot, palms up, standing on the footer.
    d.ellipse(S(764, 872, 994, 892), fill=LINE)
    rukobot(d, 779, 626, 4.2)

    # Footer: what to do next.
    d.rectangle(S(0, 940, SIZE, SIZE), fill=TEAL)
    logo(d, 64, 966, 48, "#FFFFFF", TEAL)
    d.text(S(130, 966), "Ruko catches this.", font=display(32), fill="#FFFFFF")
    d.text(S(130, 1006), f"Get it for your family: {url}", font=body(24), fill=MINT)

    return img.resize((SIZE, SIZE), Image.LANCZOS)


def main():
    cards = json.load(open(CARDS, encoding="utf-8"))["cards"]
    url = site_url()
    os.makedirs(os.path.join(OUT, "draft"), exist_ok=True)
    made = 0
    for card in cards:
        if card.get("status") not in ("approved", "draft"):
            continue
        folder = OUT if card["status"] == "approved" else os.path.join(OUT, "draft")
        make(card, url).save(os.path.join(folder, f"{card['id']}.png"), optimize=True)
        made += 1
    print(f"share images: {made} made ({sum(c.get('status') == 'approved' for c in cards)} approved)")


if __name__ == "__main__":
    main()
