import type { Metadata } from "next";
import { getArticle } from "@/lib/api";

interface BlogLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = "https://archipelago.web.id";

  const article = await getArticle(slug);

  if (!article) {
    return {
      title: "Artikel tidak ditemukan | Kata Komunika",
      description: "Artikel ini tidak tersedia.",
      alternates: { canonical: `${baseUrl}/blog/${slug}` },
    };
  }

  const title = `${article.title} | Kata Komunika`;
  const description = article.excerpt;
  const image = article.image?.url || `${baseUrl}/logo.webp`;

  return {
    title,
    description,
    keywords: [
      "komunikasi digital",
      "komunikasi klasik",
      "teknologi komunikasi",
      "media digital",
      "strategi komunikasi",
      "artikel komunikasi",
    ],
    alternates: {
      canonical: `${baseUrl}/blog/${article.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/blog/${article.slug}`,
      siteName: "Kata Komunika",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "id_ID",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  return <div className="bg-white text-slate-900">{children}</div>;
}