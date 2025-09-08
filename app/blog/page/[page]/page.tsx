import BlogList from "@/components/blog/blog-page";
import Hero from "@/components/blog/hero";
import PaginationLinks from "@/components/blog/pagination-links";
import type { Metadata } from "next";
import { getArticlesPaginated } from "@/lib/api";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ page: string }>;
}

// Generate static params for pagination pages
export async function generateStaticParams() {
  try {
    // Get first page to determine total pages
    const data = await getArticlesPaginated(1, 6);
    const totalPages = data.pagination.totalPages;

    // Generate params for pages 2 and beyond (page 1 is handled by /blog)
    return Array.from({ length: totalPages - 1 }, (_, i) => ({
      page: (i + 2).toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page: pageParam } = await params;
  const pageNumber = parseInt(pageParam, 10);

  if (isNaN(pageNumber) || pageNumber < 2) {
    return { title: "Page Not Found" };
  }

  try {
    const data = await getArticlesPaginated(pageNumber, 6);

    if (pageNumber > data.pagination.totalPages) {
      return { title: "Page Not Found" };
    }

    const baseUrl = "https://archipelago.web.id";
    const metadata: Metadata = {
      title: `Blog - Kata Komunikasi | Page ${pageNumber}`,
      description: `Dapatkan artikel, wawasan, dan tips komunikasi & teknologi. Halaman ${pageNumber} dari artikel terbaru di Kata Komunikasi.`,
      keywords: [
        "komunikasi digital",
        "komunikasi klasik",
        "teknologi komunikasi",
        "media digital",
        "strategi komunikasi",
        "artikel komunikasi",
      ],
      alternates: {
        canonical: `${baseUrl}/blog/page/${pageNumber}`,
      },
      openGraph: {
        title: `Blog - Kata Komunikasi | Page ${pageNumber}`,
        description: `Artikel, wawasan, dan tips komunikasi & teknologi – Halaman ${pageNumber}.`,
        url: `${baseUrl}/blog/page/${pageNumber}`,
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
        title: `Blog - Kata Komunikasi | Page ${pageNumber}`,
        description: `Artikel, wawasan, dan tips komunikasi & teknologi – Halaman ${pageNumber}.`,
        images: ["https://archipelago.web.id/logo.webp"],
      },
    };

    return metadata;
  } catch (error) {
    return { title: "Page Not Found" };
  }
}

export default async function BlogPage({ params }: PageProps) {
  const { page: pageParam } = await params;
  const pageNumber = parseInt(pageParam, 10);

  if (isNaN(pageNumber) || pageNumber < 2) {
    notFound();
  }

  try {
    const data = await getArticlesPaginated(pageNumber, 6);
    if (pageNumber > data.pagination.totalPages) {
      notFound();
    }

    return (
      <>
        <PaginationLinks
          currentPage={pageNumber}
          hasNextPage={data.pagination.hasNextPage}
          hasPreviousPage={data.pagination.hasPreviousPage}
          baseUrl="https://archipelago.web.id"
        />
        <main>
          <Hero />
          <BlogList currentPage={pageNumber} />
        </main>
      </>
    );
  } catch (error) {
    notFound();
  }
}