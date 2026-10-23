"use client";

import Link from "next/link";
import { useState } from "react";
import data from "@/lib/spot-the-scam.json";
import { t } from "@/lib/content";
import styles from "./spot.module.css";

/**
 * "Can you spot the scam?" (D-049): 8 messages, 4 real and 4 scam, drawn from near-identical pairs where the
 * tell is who sent it and what they ask, not the wording. Runs only in the browser; answers aren't sent anywhere.
 */
type Item = {
  id: string;
  label: "scam" | "real";
  channel: "sms" | "whatsapp" | "call" | "situation";
  sender: string;
  senderNote?: string;
  text: string;
  context?: string;
  clue: string;
  source?: { name: string; url: string };
  /** The scam card this question belongs to (D-097: one per card). */
  card?: string;
  /** A hard scam Ruko's message rules don't catch (D-097): the answer says so. */
  rukoMayMiss?: boolean;
};

const ITEMS = data.items as Item[];
const s = t.spot;
const PER_SIDE = 4;

function shuffle<T>(list: T[]): T[] {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRound(): Item[] {
  const scams = shuffle(ITEMS.filter((i) => i.label === "scam")).slice(0, PER_SIDE);
  const real = shuffle(ITEMS.filter((i) => i.label === "real")).slice(0, PER_SIDE);
  return shuffle([...scams, ...real]);
}

export function SpotTheScam() {
  const [round, setRound] = useState<Item[] | null>(null);
  const [at, setAt] = useState(0);
  const [answers, setAnswers] = useState<("scam" | "real")[]>([]);

  const start = () => {
    setRound(pickRound());
    setAt(0);
    setAnswers([]);
  };

  if (!round) {
    return (
      <div className={styles.intro}>
        <p className={styles.introText}>{s.intro(PER_SIDE * 2)}</p>
        <button type="button" className="button" onClick={start}>
          {s.start}
        </button>
        <p className="note">{s.privacyNote}</p>
      </div>
    );
  }

  const score = answers.filter((a, i) => a === round[i].label).length;

  if (answers.length === round.length && at >= round.length) {
    const shareText = s.shareText(score, round.length, t.siteUrl);
    return (
      <div className={styles.result} aria-live="polite">
        <p className={styles.score}>{s.score(score, round.length)}</p>
        <p className={styles.resultLead}>{s.resultLead}</p>
        <ol className={styles.habits}>
          {s.habits.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ol>
        <div className={styles.actions}>
          <a className="button" href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer">
            {s.share}
          </a>
          <button type="button" className={styles.again} onClick={start}>
            {s.again}
          </button>
        </div>
        <p className={styles.cta}>
          {s.cta} <Link href="/install#download">{s.ctaLink}</Link>
        </p>
      </div>
    );
  }

  const item = round[Math.min(at, round.length - 1)];
  const answered = answers.length > at;
  const right = answered && answers[at] === item.label;

  return (
    <div className={styles.play}>
      <p className={styles.progress}>
        {s.progress(at + 1, round.length)}
      </p>

      <div className={`${styles.message} ${item.channel === "call" || item.channel === "situation" ? styles.call : ""}`}>
        <p className={styles.channel}>
          {s.channels[item.channel]}
        </p>
        <p className={styles.sender}>{item.sender}</p>
        {item.senderNote && <p className={styles.senderNote}>{item.senderNote}</p>}
        <p className={styles.bubble}>{item.text}</p>
        {item.context && <p className={styles.context}>{item.context}</p>}
      </div>

      {!answered ? (
        <div className={styles.choices}>
          <button type="button" className={styles.choice} onClick={() => setAnswers([...answers, "real"])}>
            {s.real}
          </button>
          <button type="button" className={`${styles.choice} ${styles.choiceScam}`} onClick={() => setAnswers([...answers, "scam"])}>
            {s.scam}
          </button>
        </div>
      ) : (
        <div className={`${styles.feedback} ${right ? styles.right : styles.wrong}`} aria-live="polite">
          <p className={styles.verdict}>
            {right ? s.right : s.wrong} {item.label === "scam" ? s.isScam : s.isReal}
          </p>
          <p>{item.clue}</p>
          {item.label === "scam" && item.rukoMayMiss && <p>{s.mayMiss}</p>}
          {item.source && (
            <p className={styles.source}>
              {s.reportedBy}{" "}
              <a href={item.source.url} target="_blank" rel="noopener noreferrer">
                {item.source.name}
              </a>
            </p>
          )}
          <button type="button" className="button" onClick={() => setAt(at + 1)}>
            {at + 1 < round.length ? s.next : s.seeScore}
          </button>
        </div>
      )}
      <p className="note">{s.examplesNote}</p>
    </div>
  );
}
