import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { bricolage } from "@/lib/fonts";
import { generateJsonLd, generateWebsiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Kata Komunika - Komunikasi dan Teknologi",
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
    siteName: "Kata Komunika",
    locale: "id_ID",
    type: "website",
    url: "https://katakomunika.web.id",
    title: "Kata Komunika - Komunikasi dan Teknologi",
    description:
      "Dapatkan artikel, wawasan, dan tips komunikasi dan informasi teknologi.",
    images: [
      {
        url: "https://katakomunika.web.id/logo.webp",
        width: 1200,
        height: 630,
        alt: "Kata Komunika",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@katakomunika",
    title: "Kata Komunika - Komunikasi dan Teknologi",
    description:
      "Dapatkan artikel, wawasan, dan tips komunikasi digital maupun klasik.",
    images: ["https://katakomunika.web.id/logo.webp"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = generateWebsiteSchema();

  return (
    <html lang="id" data-scroll-behavior="smooth">
      <head>
        <link
          rel="preconnect"
          href="https://images.ctfassets.net"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${bricolage.className} bg-white text-slate-900`}>
        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Layout */}
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}