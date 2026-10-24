import Link from "next/link";
import styles from "./SiteHeader.module.css";
import { LogoMark } from "./Logo";
import { t } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="Ruko home">
          <LogoMark size={34} variant="reversed" />
          <span>ruko</span>
        </Link>
        {/* Phones: the action sits on the logo row (the copy in the menu is hidden there), so the header is two rows. */}
        <Link href="/install#download" className={`${styles.cta} ${styles.ctaPhone}`}>
          {t.nav.install}
        </Link>
        <nav aria-label="Main" className={styles.menu}>
          <ul className={styles.nav}>
            <li className={styles.secondary}>
              <Link href="/#how">{t.nav.how}</Link>
            </li>
            <li>
              <Link href="/scams">{t.nav.scams}</Link>
            </li>
            <li>
              <Link href="/spot-the-scam">{t.nav.spot}</Link>
            </li>
            <li className={styles.secondary}>
              <Link href="/demo">{t.nav.demo}</Link>
            </li>
            <li className={styles.secondary}>
              <Link href="/privacy">{t.nav.privacy}</Link>
            </li>
            <li className={styles.ctaItem}>
              <Link href="/install#download" className={styles.cta}>
                {t.nav.install}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
