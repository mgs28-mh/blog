import BlogList from "@/components/blog/blog-page";
import Hero from "@/components/blog/hero";
import PaginationLinks from "@/components/blog/pagination-links";
import { Metadata } from "next";
import { getArticlesByCategory } from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  try {
    // Get pagination data to determine if there's a next page
    const paginatedData = await getArticlesByCategory("komunikasi", 1, 6);
    
    const metadata: Metadata = {
      title: "Blog Komunikasi - Kata Komunika",
      description:
        "Dapatkan artikel, wawasan, dan tips seputar komunikasi digital maupun klasik.",
      keywords: [
        "komunikasi digital",
        "komunikasi klasik",
        "strategi komunikasi",
        "artikel komunikasi",
        "media komunikasi",
        "teknik komunikasi",
      ],
      alternates: {
        canonical: "https://archipelago.web.id/blog/komunikasi",
      },
      openGraph: {
        title: "Blog Komunikasi - Kata Komunika",
        description:
          "Dapatkan artikel, wawasan, dan tips seputar komunikasi digital maupun klasik di Archipelago, sumber informasi relevan untuk mendukung perkembangan komunikasi di era modern.",
        url: "https://archipelago.web.id/blog/komunikasi",
        siteName: "Kata Komunika",
        images: [
          {
            url: "https://archipelago.web.id/logo.webp",
            width: 1200,
            height: 630,
            alt: "Kata Komunika - Blog Komunikasi",
          },
        ],
        locale: "id_ID",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        site: "https://archipelago.web.id/blog/komunikasi",
        title: "Blog Komunikasi - Kata Komunika",
        description:
          "Dapatkan artikel dan wawasan seputar komunikasi digital maupun klasik untuk mendukung perkembangan di era modern.",
        images: ["https://archipelago.web.id/logo.webp"],
      },
    };

    return metadata;
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Komunikasi - Kata Komunika",
      description: "Dapatkan artikel, wawasan, dan tips seputar komunikasi digital maupun klasik.",
    };
  }
}

export default async function BlogKomunikasi() {
  // Get pagination data for head links
  const paginatedData = await getArticlesByCategory("komunikasi", 1, 6);
  
  return (
    <>
      <PaginationLinks
        currentPage={1}
        hasNextPage={paginatedData.pagination.hasNextPage}
        hasPreviousPage={false}
        baseUrl="https://archipelago.web.id"
        category="komunikasi"
      />
      <>
        <Hero />
        <BlogList currentPage={1} category="komunikasi" />
      </>
    </>
  );
}
