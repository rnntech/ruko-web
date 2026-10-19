import Link from "next/link";
import styles from "./SiteHeader.module.css";
import { t } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="Ruko home">
          Ruko
        </Link>
        <nav aria-label="Main">
          <ul className={styles.nav}>
            <li>
              <Link href="/#how">{t.nav.how}</Link>
            </li>
            <li>
              <Link href="/demo">{t.nav.demo}</Link>
            </li>
            <li>
              <Link href="/privacy">{t.nav.privacy}</Link>
            </li>
            <li>
              <Link href="/install">{t.nav.install}</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
