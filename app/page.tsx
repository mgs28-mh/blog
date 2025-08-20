import AboutSection from "@/components/about";
import BlogSection from "@/components/blog";
import CTASection from "@/components/cta";
import HeroSection from "@/components/hero";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <BlogSection />
      <CTASection />
      <AboutSection />
    </main>
  );
}
