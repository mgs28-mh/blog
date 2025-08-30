import "./globals.css";
import { IBM_Plex_Sans } from "next/font/google";
import type { Metadata } from "next";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

const fonts = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Archipelago - Informasi Komunikasi",
  description:
    "Temukan artikel, wawasan, dan tips terbaru seputar komunikasi digital maupun klasik. Archipelago menghadirkan informasi yang relevan untuk mendukung perkembangan komunikasi di era modern.",
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
      "Artikel terbaru seputar komunikasi digital dan klasik. Dapatkan wawasan dan inspirasi di Archipelago.",
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
    title: "Archipelago - Informasi Komunikasi",
    description:
      "Artikel, tips, dan wawasan terbaru seputar komunikasi digital maupun klasik.",
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
      <body className={`${fonts.className} bg-white text-slate-900`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
