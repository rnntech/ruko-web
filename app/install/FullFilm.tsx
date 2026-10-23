"use client";

import { useEffect, useRef } from "react";
import styles from "./install.module.css";

/**
 * The full app's 25 s film (D-101). The one exception to "no auto-playing video" (DESIGN.md, D-104): it has no sound,
 * so it plays muted, once, when half of it is on screen, and stops on the end card. It never plays by itself when the
 * phone asks for less motion, and the controls stay so anyone can pause or replay it.
 */
export function FullFilm() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const seen = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        seen.disconnect();
        // Only if nobody has started it yet.
        if (video.paused && video.currentTime === 0) {
          video.muted = true;
          video.play().catch(() => {});
        }
      },
      { threshold: 0.5 },
    );
    seen.observe(video);
    return () => seen.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={styles.film}
      controls
      muted
      preload="metadata"
      playsInline
      poster="/video/ruko-full-otp-poster.jpg"
      aria-label="Ruko full app: an OTP during a scam call, the helper's phone ringing, and a fake power-cut message flagged"
    >
      <source src="/video/ruko-full-otp.mp4" type="video/mp4" />
    </video>
  );
}
