import "./globals.css";
import { Bricolage_Grotesque } from "next/font/google";
import type { Metadata } from "next";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import Script from "next/script";

const fonts = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Kata Komunikasi - Komunikasi dan Teknologi",
    template: "%s | Kata Komunikasi"
  },
  description: "Dapatkan artikel, wawasan, dan tips komunikasi dan informasi teknologi.",
  keywords: [
    "komunikasi digital",
    "komunikasi klasik",
    "teknologi komunikasi",
    "media digital",
    "strategi komunikasi",
    "artikel komunikasi",
  ],
  openGraph: {
    siteName: "Archipelago",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "https://archipelago.web.id",
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
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="nCZwxPo3mN754U1NAe84aQ"
          strategy="afterInteractive"
        />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
