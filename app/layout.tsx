import type { Metadata } from "next";
import { Archivo, Lexend, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { t } from "@/lib/content";

// Text: Lexend (D-034). Headlines: Archivo (D-033). Both are the owner's choice, English only for now;
// Hindi text uses Noto Sans Devanagari (docs/DESIGN_LANGUAGE.md Section 5).
const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
  variable: "--font-display",
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
      <body className={`${lexend.className} ${archivo.variable} ${notoDevanagari.variable}`}>
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
