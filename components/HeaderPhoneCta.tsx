"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { t } from "@/lib/content";
import styles from "./SiteHeader.module.css";

/**
 * "Get the app" on the logo row, phones only (the menu's copy is hidden there). Not on the homepage, where the hero's
 * own button is just below: one main button per screen (DESIGN.md; owner, 24 Oct).
 */
export function HeaderPhoneCta() {
  if (usePathname() === "/") return null;
  return (
    <Link href="/install#download" className={`${styles.cta} ${styles.ctaPhone}`}>
      {t.nav.install}
    </Link>
  );
}
