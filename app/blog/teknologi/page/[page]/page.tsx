import BlogList from "@/components/blog/blog-page";
import Hero from "@/components/blog/hero";
import PaginationLinks from "@/components/blog/pagination-links";
import { Metadata } from "next";
import { getArticlesByCategory } from "@/lib/api";
import { generateBlogSchema, generateJsonLd } from "@/lib/schema";
import { notFound } from "next/navigation";

interface BlogTeknologiPageProps {
  params: Promise<{ page: string }>;
}

export async function generateMetadata({ params }: BlogTeknologiPageProps): Promise<Metadata> {
  const { page: pageParam } = await params;
  const page = parseInt(pageParam, 10);
  
  if (isNaN(page) || page < 1) {
    return {
      title: "Halaman Tidak Ditemukan - Kata Komunika",
      description: "Halaman yang kamu cari tidak ditemukan.",
    };
  }

  try {
    const paginatedData = await getArticlesByCategory("teknologi", page, 6);
    
    const metadata: Metadata = {
      title: `Blog Teknologi - Halaman ${page} - Kata Komunika`,
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
        canonical: `https://katakomunika.web.id/blog/teknologi/page/${page}`,
      },
      openGraph: {
        title: `Blog Teknologi - Halaman ${page} - Kata Komunika`,
        description:
          "Dapatkan artikel, wawasan, dan tips seputar perkembangan teknologi komunikasi dan informasi terbaru di Kata Komunika, sumber informasi relevan untuk mengikuti inovasi teknologi di era modern.",
        url: `https://katakomunika.web.id/blog/teknologi/page/${page}`,
        siteName: "Kata Komunika",
        images: [
          {
            url: "https://katakomunika.web.id/logo.webp",
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
        site: `https://katakomunika.web.id/blog/teknologi/page/${page}`,
        title: `Blog Teknologi - Halaman ${page} - Kata Komunika`,
        description:
          "Dapatkan artikel dan wawasan seputar perkembangan teknologi komunikasi dan informasi terbaru untuk mengikuti inovasi di era modern.",
        images: ["https://katakomunika.web.id/logo.webp"],
      },
    };

    return metadata;
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: `Blog Teknologi - Halaman ${page} - Kata Komunika`,
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
        baseUrl="https://katakomunika.web.id"
        category="teknologi"
      />
      <Hero />
      <BlogList paginatedData={paginatedData} category="teknologi" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJsonLd(
          generateBlogSchema(paginatedData.articles, {
            path: `/blog/teknologi/page/${page}`,
            name: `Blog Teknologi - Halaman ${page} - Kata Komunika`,
            description:
              "Dapatkan artikel, wawasan, dan tips seputar perkembangan teknologi komunikasi dan informasi terbaru.",
          })
        )}
      />
    </>
  );
}
