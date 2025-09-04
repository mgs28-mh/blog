import AboutSection from "@/components/about";
import BlogComSection from "@/components/blog-com";
import BlogTechSection from "@/components/blog-tech";
import CTASection from "@/components/cta";
import HeroSection from "@/components/hero";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <BlogComSection />
      <BlogTechSection />
      <CTASection />
      <AboutSection />
    </main>
  );
}
