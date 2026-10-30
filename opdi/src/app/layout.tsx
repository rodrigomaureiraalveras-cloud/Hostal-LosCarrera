import type { Metadata, Viewport } from "next";
import { Lexend, Lexend_Exa } from "next/font/google";
import { FAVICON } from "@/lib/assets";
import { META } from "@/lib/content";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700"],
  variable: "--font-lexend",
  display: "swap",
});

const lexendExa = Lexend_Exa({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-lexend-exa",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(META.url),
  title: META.title,
  description: META.description,
  openGraph: {
    type: "website",
    locale: "es_CL",
    title: META.title,
    description: META.description,
  },
  icons: { icon: FAVICON },
};

export const viewport: Viewport = {
  /* Next no acepta `var()` acá: es el fondo `--color-ink`. */
  themeColor: "#121820",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${lexend.variable} ${lexendExa.variable}`}>
      <body>{children}</body>
    </html>
  );
}
