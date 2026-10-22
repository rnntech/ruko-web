"use client";

import { useEffect, useState } from "react";
import styles from "./PhoneTour.module.css";
import { HomeOnScreen, PhoneFrame, PrivacyScreen, WarningScreen, WelcomeScreen } from "./Phone";

/**
 * The hero phone (D-048): plays through four real Ruko screens, sliding like setup. The bar under the phone
 * shows where it is; tap a segment to jump. It pauses on hover, while a control has keyboard focus (not after a
 * mouse click), with the
 * pause button, and for people who ask for reduced motion (then it only moves when they tap).
 * Each screen restarts its own animation when it slides in. The active bar's fill drives the timing.
 */
const SLIDES = [
  { name: "Welcome", ms: 5000 },
  { name: "Nothing leaves your phone", ms: 4200 },
  { name: "Pause. This call looks like a scam.", ms: 6000 },
  { name: "Protection is on", ms: 4500 },
];

export function PhoneTour({ scamCount }: { scamCount: number }) {
  const [index, setIndex] = useState(0);
  const [visits, setVisits] = useState(() => SLIDES.map(() => 0));
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const paused = userPaused || hovered || focused || reduced;

  const go = (i: number) => {
    setIndex(i);
    setVisits((v) => v.map((n, k) => (k === i ? n + 1 : n)));
  };

  const screens = [
    <WelcomeScreen key="w" />,
    <PrivacyScreen key="p" />,
    <WarningScreen key="c" kind="call" helperName="Arjun" />,
    <HomeOnScreen key="h" scamCount={scamCount} />,
  ];

  return (
    <div
      className={styles.tour}
      data-ui
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={(e) => setFocused(e.target.matches(":focus-visible"))}
      onBlur={() => setFocused(false)}
    >
      <PhoneFrame
        width={330}
        label="Mock-up of the Ruko app, playing through four screens: Meet Ruko, Nothing leaves your phone, the red warning during a scam call, and Home with protection on"
      >
        <div className={styles.track} style={{ transform: `translateX(-${index * 100}%)` }}>
          {screens.map((screen, i) => (
            <div key={`${i}-${visits[i]}`} className={styles.slot} aria-hidden={i !== index}>
              {screen}
            </div>
          ))}
        </div>
      </PhoneFrame>

      <div className={styles.controls}>
        {SLIDES.map((s, i) => (
          <button
            key={s.name}
            type="button"
            className={styles.segment}
            aria-label={`Show screen ${i + 1} of ${SLIDES.length}: ${s.name}`}
            aria-current={i === index ? "step" : undefined}
            onClick={() => go(i)}
          >
            <span className={styles.track2}>
              <span
                key={`${i}-${visits[i]}`}
                className={i === index ? styles.fillActive : i < index ? styles.fillDone : styles.fill}
                style={i === index ? { animationDuration: `${s.ms}ms`, animationPlayState: paused ? "paused" : "running" } : undefined}
                onAnimationEnd={i === index ? () => go((index + 1) % SLIDES.length) : undefined}
              />
            </span>
          </button>
        ))}
        <button
          type="button"
          className={styles.pause}
          aria-label={userPaused ? "Play the tour" : "Pause the tour"}
          onClick={() => setUserPaused((p) => !p)}
        >
          {userPaused ? (
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M5 3.5 L12.5 8 L5 12.5 Z" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <rect x="4" y="3.5" width="2.8" height="9" rx="1.2" fill="currentColor" />
              <rect x="9.2" y="3.5" width="2.8" height="9" rx="1.2" fill="currentColor" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
