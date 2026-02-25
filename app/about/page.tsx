import AboutSection from "@/components/about";
import Hero from "@/components/about/hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile - Kata Komunikasi",
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
  alternates: {
    canonical: "https://archipelago.web.id/about",
  },
  openGraph: {
    title: "Profile - Kata Komunikasi",
    description:
      "Dapatkan artikel, wawasan, dan tips seputar komunikasi digital maupun klasik di Archipelago, sumber informasi relevan untuk mendukung perkembangan komunikasi di era modern.",
    url: "https://archipelago.web.id/about",
    siteName: "Kata Komunikasi",
    images: [
      {
        url: "https://archipelago.web.id/logo.webp",
        width: 1200,
        height: 630,
        alt: "Kata Komunikasi - Komunikasi dan Teknologi",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "https://archipelago.web.id/about",
    title: "Profile - Kata Komunikasi",
    description:
      "Dapatkan artikel dan wawasan seputar komunikasi digital maupun klasik untuk mendukung perkembangan di era modern.",
    images: ["https://archipelago.web.id/logo.webp"],
  },
};

export default function About() {
    return (
        <>
            <Hero />
            <AboutSection />
        </>
    );
}