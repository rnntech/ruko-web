"use client";

import { useState } from "react";
import { PhoneFrame, WarningScreen, type WarnSituation } from "@/components/Phone";
import styles from "./demo.module.css";

type Mode = "just-me" | "ask-first" | "auto";

// The moments Ruko acts on, as the app words them (rules R1, R3, R2; message tones red and calm).
const SITUATIONS: { id: WarnSituation; label: string }[] = [
  { id: "bank", label: "A stranger keeps me on a call, and I open my bank or UPI app" },
  { id: "otp", label: "During the call, an OTP or bank code arrives" },
  { id: "screen", label: "The caller gets me to open a screen-sharing app" },
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
  const isMessage = situation === "message" || situation === "calm";
  const helperName = !isMessage && mode !== "just-me" ? "Arjun" : null;

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

        <fieldset className={styles.group} disabled={isMessage}>
          <legend>Who should Ruko involve?</legend>
          {MODES.map((m) => (
            <label key={m.id} className={styles.option}>
              <input type="radio" name="mode" checked={mode === m.id} onChange={() => setMode(m.id)} />
              <span>
                <strong>{m.title}.</strong> {m.body}
              </span>
            </label>
          ))}
          {isMessage && <p className="note">Message warnings never involve anyone else.</p>}
        </fieldset>

        <p className="note measure">
          In the real app the warning appears at once and is read aloud. During a call, &ldquo;Continue&rdquo; unlocks
          after 30 seconds, so there&rsquo;s time to think. Urgent scam messages show red; known tricks get a calm
          &ldquo;You&rsquo;re safe&rdquo;.
        </p>
      </div>

      <PhoneFrame width={340} label={`Mock-up: Ruko's warning ${isMessage ? "for a scam message" : "during a risky call"}`}>
        <WarningScreen
          situation={situation}
          helperName={helperName}
          helperRinging={mode === "auto"}
          quote={situation === "calm" ? "Congratulations! Your number has won \u20b925 lakh in the KBC lucky draw\u2026" : undefined}
        />
      </PhoneFrame>
    </div>
  );
}
