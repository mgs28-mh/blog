import BlogList from "@/components/blog/blog-page";
import Hero from "@/components/blog/hero";
import PaginationLinks from "@/components/blog/pagination-links";
import { Metadata } from "next";
import { getArticlesByCategory } from "@/lib/api";
import { notFound } from "next/navigation";

interface BlogTeknologiPageProps {
  params: Promise<{ page: string }>;
}

export async function generateMetadata({ params }: BlogTeknologiPageProps): Promise<Metadata> {
  const { page: pageParam } = await params;
  const page = parseInt(pageParam, 10);
  
  if (isNaN(page) || page < 1) {
    return {
      title: "Page Not Found - Kata Komunikasi",
      description: "The page you requested could not be found.",
    };
  }

  try {
    const paginatedData = await getArticlesByCategory("teknologi", page, 6);
    
    const metadata: Metadata = {
      title: `Blog Teknologi - Halaman ${page} - Kata Komunikasi`,
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
        canonical: `https://archipelago.web.id/blog/teknologi/page/${page}`,
      },
      openGraph: {
        title: `Blog Teknologi - Halaman ${page} - Kata Komunikasi`,
        description:
          "Dapatkan artikel, wawasan, dan tips seputar perkembangan teknologi komunikasi dan informasi terbaru di Archipelago, sumber informasi relevan untuk mengikuti inovasi teknologi di era modern.",
        url: `https://archipelago.web.id/blog/teknologi/page/${page}`,
        siteName: "Kata Komunikasi",
        images: [
          {
            url: "https://archipelago.web.id/logo.webp",
            width: 1200,
            height: 630,
            alt: "Kata Komunikasi - Blog Teknologi",
          },
        ],
        locale: "id_ID",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        site: `https://archipelago.web.id/blog/teknologi/page/${page}`,
        title: `Blog Teknologi - Halaman ${page} - Kata Komunikasi`,
        description:
          "Dapatkan artikel dan wawasan seputar perkembangan teknologi komunikasi dan informasi terbaru untuk mengikuti inovasi di era modern.",
        images: ["https://archipelago.web.id/logo.webp"],
      },
    };

    return metadata;
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: `Blog Teknologi - Halaman ${page} - Kata Komunikasi`,
      description: "Dapatkan artikel, wawasan, dan tips seputar perkembangan teknologi komunikasi dan informasi terbaru.",
    };
  }
}

export default async function BlogTeknologiPage({ params }: BlogTeknologiPageProps) {
  const { page: pageParam } = await params;
  const page = parseInt(pageParam, 10);
  
  // Validate page number
  if (isNaN(page) || page < 1) {
    notFound();
  }
  
  // Get pagination data for head links
  const paginatedData = await getArticlesByCategory("teknologi", page, 6);
  
  // Check if page exists
  if (page > paginatedData.pagination.totalPages && paginatedData.pagination.totalPages > 0) {
    notFound();
  }
  
  return (
    <>
      <PaginationLinks
        currentPage={page}
        hasNextPage={paginatedData.pagination.hasNextPage}
        hasPreviousPage={paginatedData.pagination.hasPreviousPage}
        baseUrl="https://archipelago.web.id"
        category="teknologi"
      />
      <main>
        <Hero />
        <BlogList currentPage={page} category="teknologi" />
      </main>
    </>
  );
}
