import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { t } from "@/lib/content";

// One family for all of Ruko's languages (docs/DESIGN_LANGUAGE.md Section 5).
const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["800"],
  display: "swap",
  variable: "--font-devanagari",
});

export const metadata: Metadata = {
  title: `${t.siteName}: ${t.tagline}`,
  description: t.description,
  openGraph: {
    title: `${t.siteName}: ${t.tagline}`,
    description: t.description,
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${notoSans.className} ${notoDevanagari.variable}`}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
