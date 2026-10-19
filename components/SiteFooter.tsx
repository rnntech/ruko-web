import Link from "next/link";
import styles from "./SiteFooter.module.css";
import { LogoMark } from "./Logo";
import { t } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.help}>
          <p className={styles.helpTitle}>Lost money to a scam?</p>
          <p>
            Call <strong>1930</strong> now or report it at <a href="https://cybercrime.gov.in">cybercrime.gov.in</a>. The
            sooner you report, the better the chance of stopping the money.
          </p>
        </div>
        <div className={styles.meta}>
          <span className={styles.brand}>
            <LogoMark size={28} variant="reversed" /> ruko
          </span>
          <p className={styles.small}>{t.footer.built}</p>
          <p className={styles.small}>
            <Link href="/privacy">Privacy</Link> · <Link href="/install">Get the app</Link> ·{" "}
            <Link href="/concept/bank">Concept: a family check inside your bank</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
