import "./globals.css";
import { Rubik } from "next/font/google";
import type { Metadata } from "next";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import Script from "next/script";

const fonts = Rubik({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Archipelago - Informasi Komunikasi",
  description:
    "Dapatkan artikel, wawasan, dan tips komunikasi digital maupun klasik yang relevan di era modern.",
  keywords: [
    "komunikasi digital",
    "komunikasi klasik",
    "teknologi komunikasi",
    "media digital",
    "strategi komunikasi",
    "artikel komunikasi",
  ],
  alternates: {
    canonical: "https://archipelago.web.id",
  },
  openGraph: {
    title: "Archipelago - Informasi Komunikasi",
    description:
      "Dapatkan artikel, wawasan, dan tips seputar komunikasi digital maupun klasik di Archipelago, sumber informasi relevan untuk mendukung perkembangan komunikasi di era modern.",
    url: "https://archipelago.web.id",
    siteName: "Archipelago",
    images: [
      {
        url: "https://archipelago.web.id/logo.webp",
        width: 1200,
        height: 630,
        alt: "Archipelago - Informasi Komunikasi",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "https://archipelago.web.id",
    title: "Archipelago - Informasi Komunikasi",
    description:
      "Dapatkan artikel dan wawasan seputar komunikasi digital maupun klasik untuk mendukung perkembangan di era modern.",
    images: ["https://archipelago.web.id/logo.webp"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* ahrefs analytics pakai next/script */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="nCZwxPo3mN754U1NAe84aQ"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${fonts.className} bg-white text-slate-900`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
