import type { Metadata } from "next";

// Temporary page for the owner to choose the headline font. Delete after the choice (D-032).
export const metadata: Metadata = { title: "Font options", robots: { index: false } };

const options: { n: number; name: string; family: string; weight: number; note: string; scripts: string }[] = [
  { n: 1, name: "Hind", family: "'Hind', sans-serif", weight: 700, note: "Indian Type Foundry. Plain, sturdy, very readable. Used widely in Indian apps and news sites.", scripts: "All 8 (Hind, Hind Siliguri, Madurai, Guntur, Vadodara, Mysuru)" },
  { n: 2, name: "Mukta", family: "'Mukta', sans-serif", weight: 800, note: "Ek Type. Friendly and open, a little softer than Hind.", scripts: "English, Hindi, Marathi (+ Mukta Vaani, Malar for Gujarati, Tamil)" },
  { n: 3, name: "Martel Sans", family: "'Martel Sans', sans-serif", weight: 900, note: "Dan Reynolds. Solid and serious, like a public notice.", scripts: "English, Hindi, Marathi" },
  { n: 4, name: "Baloo 2", family: "'Baloo 2', sans-serif", weight: 800, note: "Ek Type. Rounded and warm, very Indian, but more playful.", scripts: "All 8 (Baloo Da, Bhai, Tamma, Thambi, Tammudu 2)" },
  { n: 5, name: "Tiro (serif)", family: "'Tiro Devanagari Hindi', serif", weight: 400, note: "Tiro Typeworks. A newspaper-style serif: calm, trustworthy, editorial.", scripts: "All 8 (Tiro Bangla, Tamil, Telugu, Kannada, Gujarati)" },
  { n: 6, name: "Noto Sans", family: "'Noto Sans', 'Noto Sans Devanagari', sans-serif", weight: 800, note: "Google. Neutral and safe. What the app uses for body text already.", scripts: "All 8" },
  { n: 7, name: "Archivo", family: "'Archivo', 'Noto Sans Devanagari', sans-serif", weight: 800, note: "Omnibus-Type. Strong, newsy grotesque. English only (Hindi falls back to Noto).", scripts: "English only" },
  { n: 8, name: "Anek (current)", family: "var(--font-display), var(--font-devanagari), sans-serif", weight: 800, note: "Ek Type. Condensed. The one you didn't like, for comparison.", scripts: "All 8" },
];

const css =
  "https://fonts.googleapis.com/css2?family=Hind:wght@400;700&family=Mukta:wght@400;800&family=Martel+Sans:wght@400;900" +
  "&family=Baloo+2:wght@400;800&family=Tiro+Devanagari+Hindi&family=Noto+Sans:wght@400;800" +
  "&family=Noto+Sans+Devanagari:wght@400;800&family=Archivo:wght@400;800&display=swap";

export default function FontsPage() {
  return (
    <section className="field">
      <link rel="stylesheet" href={css} />
      <div className="container">
        <p className="note">Temporary page: choose the headline font. Body text stays Noto Sans unless you pick otherwise.</p>
        {options.map((o) => (
          <div key={o.n} style={{ borderTop: "3px solid var(--ink)", padding: "28px 0 40px" }}>
            <p style={{ fontWeight: 700, marginBottom: 4 }}>
              {o.n}. {o.name}
            </p>
            <p className="note" style={{ marginBottom: 20 }}>
              {o.note} Scripts: {o.scripts}.
            </p>
            <div style={{ background: "var(--teal-900)", color: "#fff", padding: "32px 28px", borderRadius: 12 }}>
              <p style={{ fontFamily: o.family, fontWeight: o.weight, fontSize: "clamp(2.4rem, 6vw, 4.2rem)", lineHeight: 1.05, margin: 0 }}>
                The <span style={{ color: "var(--mint-300)" }}>pause</span> scammers don&rsquo;t want you to take.
              </p>
              <p lang="hi" style={{ fontFamily: o.family, fontWeight: o.weight, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", lineHeight: 1.3, margin: "18px 0 0" }}>
                रुको। यह कॉल धोखाधड़ी हो सकती है।
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, marginTop: 20 }}>
              <div style={{ background: "var(--danger)", color: "#fff", padding: "24px 22px", borderRadius: 12 }}>
                <p style={{ fontFamily: o.family, fontWeight: o.weight, fontSize: 30, lineHeight: 1.1, margin: 0 }}>Pause. This call looks like a scam.</p>
              </div>
              <div>
                <p style={{ fontFamily: o.family, fontWeight: o.weight, fontSize: 28, lineHeight: 1.1, margin: "0 0 8px" }}>Fake courier: &ldquo;drugs found in your parcel&rdquo;</p>
                <p style={{ fontSize: 17, margin: 0 }}>Body text in Noto Sans: they ask you to talk to &ldquo;Mumbai police&rdquo;, then pay to clear your name.</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
