import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";

export const metadata: Metadata = {
  title: "Keep Ruko running on your phone",
  description: "Battery settings for Samsung, Xiaomi, Vivo, Oppo, Realme and OnePlus phones so Ruko keeps protecting you.",
};

// Build plan Day 2: "Keep Ruko running" guide. Menu names differ by phone and Android version.
const brands: { name: string; steps: string[] }[] = [
  {
    name: "Every Android phone",
    steps: [
      "Open Settings → Apps → Ruko → Battery.",
      "Choose “Unrestricted” (or “Don’t optimise”).",
    ],
  },
  {
    name: "Samsung",
    steps: [
      "Settings → Apps → Ruko → Battery → Unrestricted.",
      "Settings → Battery → Background usage limits: make sure Ruko is not in “Sleeping apps” or “Deep sleeping apps”.",
    ],
  },
  {
    name: "Xiaomi, Redmi, POCO",
    steps: [
      "Settings → Apps → Manage apps → Ruko → Autostart: on.",
      "In the same screen: Battery saver → No restrictions.",
      "Open recent apps and lock Ruko (press and hold its card, then tap the lock).",
    ],
  },
  {
    name: "Vivo, iQOO",
    steps: [
      "Settings → Battery → Background power consumption management → Ruko → Allow.",
      "Settings → Apps → Autostart → Ruko: on.",
    ],
  },
  {
    name: "Oppo, Realme, OnePlus",
    steps: [
      "Settings → Apps → App management → Ruko → Battery usage.",
      "Turn on “Allow background activity” and “Allow auto launch”.",
    ],
  },
];

export default function KeepRunningPage() {
  return (
    <>
      <PageHead
        title="Keep Ruko running"
        lead="Some phones close apps in the background to save battery. If that happens, Ruko can’t warn you. These settings take a minute and keep it on. Ruko itself uses very little battery: it only checks which app is open during calls with unknown numbers."
      />
      <section className="field">
        <div className="container">
          <ol className="steps">
            {brands.map((b) => (
              <li key={b.name}>
                <strong>{b.name}</strong>
                <ul className="rows" style={{ marginTop: 8 }}>
                  {b.steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <p className="note measure">
            Menu names differ between phones and Android versions. If you can&rsquo;t find a step, search
            &ldquo;battery&rdquo; in Settings. Ruko&rsquo;s home screen says &ldquo;Protection is off&rdquo; if something
            stops it. More phone-by-phone help: <a href="https://dontkillmyapp.com">dontkillmyapp.com</a>.
          </p>
        </div>
      </section>
    </>
  );
}
