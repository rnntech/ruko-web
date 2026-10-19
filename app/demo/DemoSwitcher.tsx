"use client";

import { useState } from "react";
import { PhoneFrame, WarningScreen } from "@/components/Phone";
import styles from "./demo.module.css";

type Situation = "call" | "message";
type Mode = "just-me" | "ask-first";

export function DemoSwitcher() {
  const [situation, setSituation] = useState<Situation>("call");
  const [mode, setMode] = useState<Mode>("just-me");
  const helperName = situation === "call" && mode === "ask-first" ? "Arjun" : null;

  return (
    <div className={styles.layout}>
      <div>
        <fieldset className={styles.group}>
          <legend>Situation</legend>
          <label className={styles.option}>
            <input type="radio" name="situation" checked={situation === "call"} onChange={() => setSituation("call")} />
            A stranger has kept me on a call for 41 minutes, and I open my bank app
          </label>
          <label className={styles.option}>
            <input type="radio" name="situation" checked={situation === "message"} onChange={() => setSituation("message")} />
            I get a WhatsApp message with a &ldquo;wedding card&rdquo; app file
          </label>
        </fieldset>

        <fieldset className={styles.group} disabled={situation === "message"}>
          <legend>Who should Ruko involve?</legend>
          <label className={styles.option}>
            <input type="radio" name="mode" checked={mode === "just-me"} onChange={() => setMode("just-me")} />
            Just me. Only warn me.
          </label>
          <label className={styles.option}>
            <input type="radio" name="mode" checked={mode === "ask-first"} onChange={() => setMode("ask-first")} />
            Ask me first. Show a big button to call my son, Arjun.
          </label>
          {situation === "message" && <p className="note">Message warnings never involve anyone else.</p>}
        </fieldset>

        <p className="note measure">
          In the real app the warning appears instantly, is read aloud, and &ldquo;Continue&rdquo; unlocks after 30
          seconds, so there&rsquo;s time to think.
        </p>
      </div>

      <PhoneFrame label={`Mock-up: Ruko's warning ${situation === "message" ? "for a scam message" : "during a risky call"}`}>
        <WarningScreen kind={situation} helperName={helperName} />
      </PhoneFrame>
    </div>
  );
}
