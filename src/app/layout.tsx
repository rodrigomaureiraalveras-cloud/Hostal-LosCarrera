import type { Metadata, Viewport } from "next";
import { Anybody, Figtree } from "next/font/google";
import { HERO } from "@/lib/content";
import "./globals.css";

const anybody = Anybody({
  subsets: ["latin"],
  variable: "--font-anybody",
  axes: ["wdth"],
  display: "swap",
});

const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });

export const metadata: Metadata = {
  title: HERO.srTitle,
  description: HERO.body,
};

export const viewport: Viewport = {
  /* Next no acepta `var()` acá: es el negro de `--color-night`. */
  themeColor: "#0b1420",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${anybody.variable} ${figtree.variable}`}>
      <body>{children}</body>
    </html>
  );
}
