// app/sitemap.ts
import { MetadataRoute } from "next";
import { getAllArticles, Article } from "@/lib/api";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://archipelago.web.id";

  try {
    const articles: Article[] = await getAllArticles(1000);

    const articleUrls: MetadataRoute.Sitemap = articles.map((article) => ({
      url: `${baseUrl}/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: "weekly",
      priority: article.featured ? 0.9 : 0.7,
    }));

    const staticPages: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      },
    ];

    return [...staticPages, ...articleUrls];
  } catch (error) {
    console.error("Error fetching sitemap:", error);

    const fallbackArticles = [
      {
        slug: "etika-komunikasi-digital",
        date: "2025-08-19",
        featured: true,
      },
      {
        slug: "mengapa-literasi-digital-menjadi-kunci-dalam-komunikasi-modern",
        date: "2025-08-19",
        featured: true,
      },
    ];

    return fallbackArticles.map((article) => ({
      url: `${baseUrl}/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: "weekly",
      priority: article.featured ? 0.9 : 0.7,
    }));
  }
}