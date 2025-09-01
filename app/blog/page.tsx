import BlogPage from "@/components/blog-page";
import Hero from "@/components/blog/hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://archipelago.web.id/blog",
  },
};

export default function Blog() {
    return (
        <main>
            <Hero />
            <BlogPage />
        </main>
    );
}