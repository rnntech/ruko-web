import Link from "next/link";
import { t } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="section" style={{ background: "var(--surface)" }}>
      <div className="container">
        <p>
          <strong>{t.footer.helpline}</strong>
        </p>
        <p className="note">{t.footer.built}</p>
        <p className="note">
          <Link href="/privacy">Privacy</Link> · <Link href="/concept/bank">Concept: a family check inside your bank</Link>
        </p>
      </div>
    </footer>
  );
}
