import "./globals.css";
import { Bricolage_Grotesque, Lato } from "next/font/google";
import type { Metadata } from "next";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import Script from "next/script";
import { generateWebsiteSchema, generateOrganizationSchema } from "@/lib/schema";

const fonts = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "700", "800"],
});

export const montserrat = Lato({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Kata Komunikasi - Komunikasi dan Teknologi",
  description:
    "Dapatkan artikel, wawasan, dan tips komunikasi dan informasi teknologi.",
  keywords: [
    "komunikasi digital",
    "komunikasi klasik",
    "teknologi komunikasi",
    "media digital",
    "strategi komunikasi",
    "artikel komunikasi",
  ],
  openGraph: {
    siteName: "Kata Komunikasi",
    locale: "id_ID",
    type: "website",
    url: "https://archipelago.web.id",
    title: "Kata Komunikasi - Komunikasi dan Teknologi",
    description:
      "Dapatkan artikel, wawasan, dan tips komunikasi dan informasi teknologi.",
    images: [
      {
        url: "https://archipelago.web.id/logo.webp",
        width: 1200,
        height: 630,
        alt: "Kata Komunikasi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@katakomunikasi",
    title: "Kata Komunikasi - Komunikasi dan Teknologi",
    description:
      "Dapatkan artikel, wawasan, dan tips komunikasi digital maupun klasik.",
    images: ["https://archipelago.web.id/logo.webp"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteSchema = generateWebsiteSchema();
  const orgSchema = generateOrganizationSchema();

  return (
    <html lang="id" data-scroll-behavior="smooth">
      <body className={`${fonts.className} bg-white text-slate-900`}>
        {/* Ahrefs Analytics */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="nCZwxPo3mN754U1NAe84aQ"
          strategy="afterInteractive"
        />

        {/* Schema Markup */}
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Script
          id="org-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />

        {/* Layout */}
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}