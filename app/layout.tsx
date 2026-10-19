import type { Metadata } from "next";
import { Anek_Devanagari, Anek_Latin, Noto_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { t } from "@/lib/content";

// Text: Noto Sans. Headlines: Anek, by the Indian foundry Ek Type (docs/DESIGN_LANGUAGE.md Section 5, D-032).
// Both families cover all eight of Ruko's languages.
const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const anek = Anek_Latin({
  subsets: ["latin"],
  weight: "variable",
  axes: ["wdth"],
  display: "swap",
  variable: "--font-display",
});

const anekDevanagari = Anek_Devanagari({
  subsets: ["devanagari"],
  weight: "variable",
  axes: ["wdth"],
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
      <body className={`${notoSans.className} ${anek.variable} ${anekDevanagari.variable}`}>
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
