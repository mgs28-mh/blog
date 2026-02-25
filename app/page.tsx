import BlogComSection from "@/components/blog-com";
import BlogTechSection from "@/components/blog-tech";
import HeroSection from "@/components/hero";
import { Metadata } from "next";

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
  alternates: {
    canonical: "https://archipelago.web.id",
  },
  openGraph: {
    title: "Kata Komunikasi - Komunikasi dan Teknologi",
    description:
      "Dapatkan artikel, wawasan, dan tips seputar komunikasi digital maupun klasik di Archipelago, sumber informasi relevan untuk mendukung perkembangan komunikasi di era modern.",
    url: "https://archipelago.web.id",
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
    site: "https://archipelago.web.id",
    title: "Kata Komunikasi - Komunikasi dan Teknologi",
    description:
      "Dapatkan artikel dan wawasan seputar komunikasi digital maupun klasik untuk mendukung perkembangan di era modern.",
    images: ["https://archipelago.web.id/logo.webp"],
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <BlogComSection />
      <BlogTechSection />
    </>
  );
}
