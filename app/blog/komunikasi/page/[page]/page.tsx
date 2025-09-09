import BlogList from "@/components/blog/blog-page";
import Hero from "@/components/blog/hero";
import PaginationLinks from "@/components/blog/pagination-links";
import { Metadata } from "next";
import { getArticlesByCategory } from "@/lib/api";
import { notFound } from "next/navigation";

interface BlogKomunikasiPageProps {
  params: Promise<{ page: string }>;
}

export async function generateMetadata({ params }: BlogKomunikasiPageProps): Promise<Metadata> {
  const { page: pageParam } = await params;
  const page = parseInt(pageParam, 10);
  
  if (isNaN(page) || page < 1) {
    return {
      title: "Page Not Found - Kata Komunikasi",
      description: "The page you requested could not be found.",
    };
  }

  try {
    const paginatedData = await getArticlesByCategory("komunikasi", page, 6);
    
    const metadata: Metadata = {
      title: `Blog Komunikasi - Halaman ${page} - Kata Komunikasi`,
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
        canonical: `https://archipelago.web.id/blog/komunikasi/page/${page}`,
      },
      openGraph: {
        title: `Blog Komunikasi - Halaman ${page} - Kata Komunikasi`,
        description:
          "Dapatkan artikel, wawasan, dan tips seputar komunikasi digital maupun klasik di Archipelago, sumber informasi relevan untuk mendukung perkembangan komunikasi di era modern.",
        url: `https://archipelago.web.id/blog/komunikasi/page/${page}`,
        siteName: "Kata Komunikasi",
        images: [
          {
            url: "https://archipelago.web.id/logo.webp",
            width: 1200,
            height: 630,
            alt: "Kata Komunikasi - Blog Komunikasi",
          },
        ],
        locale: "id_ID",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        site: `https://archipelago.web.id/blog/komunikasi/page/${page}`,
        title: `Blog Komunikasi - Halaman ${page} - Kata Komunikasi`,
        description:
          "Dapatkan artikel dan wawasan seputar komunikasi digital maupun klasik untuk mendukung perkembangan di era modern.",
        images: ["https://archipelago.web.id/logo.webp"],
      },
    };

    return metadata;
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: `Blog Komunikasi - Halaman ${page} - Kata Komunikasi`,
      description: "Dapatkan artikel, wawasan, dan tips seputar komunikasi digital maupun klasik.",
    };
  }
}

export default async function BlogKomunikasiPage({ params }: BlogKomunikasiPageProps) {
  const { page: pageParam } = await params;
  const page = parseInt(pageParam, 10);
  
  // Validate page number
  if (isNaN(page) || page < 1) {
    notFound();
  }
  
  // Get pagination data for head links
  const paginatedData = await getArticlesByCategory("komunikasi", page, 6);
  
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
        category="komunikasi"
      />
      <main>
        <Hero />
        <BlogList currentPage={page} category="komunikasi" />
      </main>
    </>
  );
}
