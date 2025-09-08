import BlogList from "@/components/blog/blog-page";
import Hero from "@/components/blog/hero";
import PaginationLinks from "@/components/blog/pagination-links";
import { Metadata } from "next";
import { getArticlesPaginated } from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  try {
    // Get pagination data to determine if there's a next page
    const paginatedData = await getArticlesPaginated(1, 6);
    
    const metadata: Metadata = {
      title: "Blog - Kata Komunikasi",
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
        canonical: "https://archipelago.web.id/blog",
      },
      openGraph: {
        title: "Blog - Kata Komunikasi",
        description:
          "Dapatkan artikel, wawasan, dan tips seputar komunikasi digital maupun klasik di Archipelago, sumber informasi relevan untuk mendukung perkembangan komunikasi di era modern.",
        url: "https://archipelago.web.id/blog",
        siteName: "Archipelago",
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
        site: "https://archipelago.web.id/blog",
        title: "Blog - Kata Komunikasi",
        description:
          "Dapatkan artikel dan wawasan seputar komunikasi digital maupun klasik untuk mendukung perkembangan di era modern.",
        images: ["https://archipelago.web.id/logo.webp"],
      },
    };

    return metadata;
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog - Kata Komunikasi",
      description: "Dapatkan artikel, wawasan, dan tips komunikasi dan informasi teknologi.",
    };
  }
}

export default async function Blog() {
  // Get pagination data for head links
  const paginatedData = await getArticlesPaginated(1, 6);
  
  return (
    <>
      <PaginationLinks
        currentPage={1}
        hasNextPage={paginatedData.pagination.hasNextPage}
        hasPreviousPage={false}
        baseUrl="https://archipelago.web.id"
      />
      <main>
        <Hero />
        <BlogList currentPage={1} />
      </main>
    </>
  );
}