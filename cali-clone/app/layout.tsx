import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import CookieStrip from "@/components/layout/CookieStrip";
import FloatingCTA from "@/components/layout/FloatingCTA";
import Preloader from "@/components/layout/Preloader";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Raji — strategy for service providers & coaches",
  description: "Rajeshwari Chauhan, social media strategist for women-led service businesses.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${dmSans.variable}`}>
      <body>
        <Preloader />
        <Nav />
        {children}
        <Footer />
        <CookieStrip />
        <FloatingCTA />
      </body>
    </html>
  );
}
