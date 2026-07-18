import AboutSection from "@/components/about";
import Hero from "@/components/about/hero";
import { Metadata } from "next";
import { generateJsonLd, generatePersonSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Profile - Kata Komunika",
  description:
    "Kenali Galang Saputra, penulis dan pengembang di balik Kata Komunika yang berbagi wawasan seputar komunikasi dan teknologi.",
  keywords: [
    "komunikasi digital",
    "komunikasi klasik",
    "teknologi komunikasi",
    "media digital",
    "strategi komunikasi",
    "artikel komunikasi",
  ],
  alternates: {
    canonical: "https://katakomunika.web.id/about",
  },
  openGraph: {
    title: "Profile - Kata Komunika",
    description:
      "Dapatkan artikel, wawasan, dan tips seputar komunikasi digital maupun klasik di Kata Komunika, sumber informasi relevan untuk mendukung perkembangan komunikasi di era modern.",
    url: "https://katakomunika.web.id/about",
    siteName: "Kata Komunika",
    images: [
      {
        url: "https://katakomunika.web.id/logo.webp",
        width: 1200,
        height: 630,
        alt: "Kata Komunika - Komunikasi dan Teknologi",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "https://katakomunika.web.id/about",
    title: "Profile - Kata Komunika",
    description:
      "Dapatkan artikel dan wawasan seputar komunikasi digital maupun klasik untuk mendukung perkembangan di era modern.",
    images: ["https://katakomunika.web.id/logo.webp"],
  },
};

export default function About() {
    const personSchema = generatePersonSchema();

    return (
        <>
            <Hero />
            <AboutSection />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={generateJsonLd(personSchema)}
            />
        </>
    );
}