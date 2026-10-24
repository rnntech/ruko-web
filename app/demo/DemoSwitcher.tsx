"use client";

import { useState } from "react";
import { PhoneFrame, WarningScreen, type WarnSituation } from "@/components/Phone";
import styles from "./demo.module.css";

type Mode = "just-me" | "ask-first" | "auto";

// The moments the full app acts on, as it words them: calls (R1, R3, R2), messages (red, calm, and an app file while
// a stranger is on the line, D-109), a scam link before it opens (D-090) and an app file as it installs (R8, D-093).
const SITUATIONS: { id: WarnSituation; label: string }[] = [
  { id: "bank", label: "A stranger keeps me on a call, and I open my bank or UPI app" },
  { id: "otp", label: "During the call, an OTP or bank code arrives" },
  { id: "screen", label: "The caller gets me to open a screen-sharing app" },
  { id: "message-call", label: "During a stranger’s call, the caller sends me an app file on WhatsApp" },
  { id: "install", label: "A WhatsApp message sends me an app file, and I try to install it" },
  { id: "link", label: "I tap a link in a message that pretends to be my bank" },
  { id: "message", label: "A WhatsApp message says my electricity will be cut tonight" },
  { id: "calm", label: "A WhatsApp message says I won a lucky draw" },
];

// Helper modes, as in the app's Settings (strings mode_*_title / mode_*_body).
const MODES: { id: Mode; title: string; body: string }[] = [
  { id: "just-me", title: "Just me", body: "Only warn me." },
  { id: "ask-first", title: "Ask me first", body: "The warning shows a big button to call my son, Arjun." },
  { id: "auto", title: "Tell them automatically", body: "Arjun's phone rings when Ruko warns me. Needs Ruko on his phone too." },
];

export function DemoSwitcher() {
  const [situation, setSituation] = useState<WarnSituation>("bank");
  const [mode, setMode] = useState<Mode>("just-me");
  // A message on its own never involves anyone; a fake link or app file while a stranger is on the line does (D-109).
  const alone = situation === "message" || situation === "calm" || situation === "link";
  const isMessage = situation === "message" || situation === "calm" || situation === "message-call";
  const helperName = !alone && mode !== "just-me" ? "Arjun" : null;

  return (
    <div className={styles.layout}>
      <div>
        <fieldset className={styles.group}>
          <legend>Situation</legend>
          {SITUATIONS.map((s) => (
            <label key={s.id} className={styles.option}>
              <input type="radio" name="situation" checked={situation === s.id} onChange={() => setSituation(s.id)} />
              {s.label}
            </label>
          ))}
        </fieldset>

        <fieldset className={styles.group} disabled={alone}>
          <legend>Who should Ruko involve?</legend>
          {MODES.map((m) => (
            <label key={m.id} className={styles.option}>
              <input type="radio" name="mode" checked={mode === m.id} onChange={() => setMode(m.id)} />
              <span>
                <strong>{m.title}.</strong> {m.body}
              </span>
            </label>
          ))}
          {alone && (
            <p className="note">
              A scam message on its own never involves anyone else. A fake link or app file while a stranger is on the
              line does, and so does opening the scam link or installing the app file later.
            </p>
          )}
        </fieldset>

        <p className="note measure">
          In the real app the warning appears at once and is read aloud. During a call, &ldquo;Continue&rdquo; unlocks
          after 30 seconds, so there&rsquo;s time to think. Urgent scam messages show red; known tricks get a calm
          &ldquo;You&rsquo;re safe&rdquo;.
        </p>
        <p className="note measure">
          One more, if you turn it on in Settings: when a number you haven&rsquo;t saved keeps you on a call for 45
          minutes or more, your helper gets a calm alert, with no warning on your screen. Fake links and app files are
          flagged from anyone, even a saved contact, because accounts get hacked.
        </p>
      </div>

      <PhoneFrame
        width={340}
        label={`Mock-up: Ruko's warning ${situation === "link" ? "for a scam link" : situation === "install" ? "before installing an app file" : isMessage ? "for a scam message" : "during a risky call"}`}
      >
        <WarningScreen
          situation={situation}
          helperName={helperName}
          helperRinging={mode === "auto"}
          quote={
            situation === "calm"
              ? "Congratulations! Your number has won \u20b925 lakh in the KBC lucky draw\u2026"
              : situation === "message-call"
                ? "MSEB_Bill_Update.apk"
                : undefined
          }
        />
      </PhoneFrame>
    </div>
  );
}
