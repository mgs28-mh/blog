import AboutSection from "@/components/about";
import Hero from "@/components/about/hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://archipelago.web.id/about",
  },
};

export default function About() {
    return (
        <main>
            <Hero />
            <AboutSection />
        </main>
    );
}