import BlogList from "@/components/blog/blog-page";
import Hero from "@/components/blog/hero";
import PaginationLinks from "@/components/blog/pagination-links";
import { Metadata } from "next";
import { getArticlesByCategory } from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  try {
    // Get pagination data to determine if there's a next page
    const paginatedData = await getArticlesByCategory("teknologi", 1, 6);
    
    const metadata: Metadata = {
      title: "Blog Teknologi - Kata Komunika",
      description:
        "Dapatkan artikel, wawasan, dan tips seputar perkembangan teknologi komunikasi dan informasi terbaru.",
      keywords: [
        "teknologi komunikasi",
        "teknologi informasi",
        "media digital",
        "teknologi terbaru",
        "inovasi teknologi",
        "artikel teknologi",
      ],
      alternates: {
        canonical: "https://archipelago.web.id/blog/teknologi",
      },
      openGraph: {
        title: "Blog Teknologi - Kata Komunika",
        description:
          "Dapatkan artikel, wawasan, dan tips seputar perkembangan teknologi komunikasi dan informasi terbaru di Archipelago, sumber informasi relevan untuk mengikuti inovasi teknologi di era modern.",
        url: "https://archipelago.web.id/blog/teknologi",
        siteName: "Kata Komunika",
        images: [
          {
            url: "https://archipelago.web.id/logo.webp",
            width: 1200,
            height: 630,
            alt: "Kata Komunika - Blog Teknologi",
          },
        ],
        locale: "id_ID",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        site: "https://archipelago.web.id/blog/teknologi",
        title: "Blog Teknologi - Kata Komunika",
        description:
          "Dapatkan artikel dan wawasan seputar perkembangan teknologi komunikasi dan informasi terbaru untuk mengikuti inovasi di era modern.",
        images: ["https://archipelago.web.id/logo.webp"],
      },
    };

    return metadata;
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Teknologi - Kata Komunika",
      description: "Dapatkan artikel, wawasan, dan tips seputar perkembangan teknologi komunikasi dan informasi terbaru.",
    };
  }
}

export default async function BlogTeknologi() {
  // Get pagination data for head links
  const paginatedData = await getArticlesByCategory("teknologi", 1, 6);
  
  return (
    <>
      <PaginationLinks
        currentPage={1}
        hasNextPage={paginatedData.pagination.hasNextPage}
        hasPreviousPage={false}
        baseUrl="https://archipelago.web.id"
        category="teknologi"
      />
      <>
        <Hero />
        <BlogList currentPage={1} category="teknologi" />
      </>
    </>
  );
}
