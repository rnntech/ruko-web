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
        <nav aria-label="Main">
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
            <li>
              <Link href="/install" className={styles.cta}>
                {t.nav.install}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
