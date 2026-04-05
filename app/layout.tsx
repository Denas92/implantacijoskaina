import type { Metadata } from "next";
import { DM_Mono, Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import {
  GoogleTagManagerNoScript,
  GoogleTagManagerScripts,
} from "@/components/analytics/GoogleTagManager";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { siteName } from "@/lib/site";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
});

const dmMono = DM_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://implantacijoskaina.lt"),
  title: {
    default: "Dantų implantų kainos Lietuvoje 2026 | Skaičiuoklė ir palyginimas",
    template: `%s | ${siteName}`,
  },
  description:
    "Sužinokite tikslią dantų implantacijos kainą per 30 sekundžių. Interaktyvi skaičiuoklė, klinikų palyginimas ir ekspertų patarimai.",
  openGraph: {
    type: "website",
    locale: "lt_LT",
    siteName,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="lt">
      <body
        className={`${playfair.variable} ${sourceSans.variable} ${dmMono.variable} min-h-screen flex flex-col`}
      >
        <GoogleTagManagerScripts />
        <GoogleTagManagerNoScript />
        <Navigation />
        <main className="flex-1 pb-24 md:pb-0">{children}</main>
        <Footer />
        <WhatsAppButton />
        <StickyCTA />
      </body>
    </html>
  );
}
