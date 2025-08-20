import { MetadataRoute } from "next";
import { getAllArticles, Article } from "../lib/api";

async function getBlogPosts() {
  try {
    // Get all articles from Contentful CMS with extended limit for comprehensive sitemap
    const articles = await getAllArticles(1000); // Increased limit for full sitemap coverage
    
    // Filter out articles without slugs and sort by date
    const validArticles = articles
      .filter((article: Article) => article.slug && article.slug.trim() !== "")
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return validArticles.map((article: Article) => ({
      slug: article.slug,
      lastModified: article.sys.createdAt 
        ? new Date(article.sys.createdAt)
        : new Date(article.date),
      featured: article.featured || false,
    }));
  } catch (error) {
    console.error("Error fetching articles for sitemap:", error);
    
    // Fallback: return cached/static articles if API fails
    const fallbackArticles = [
      {
        slug: "komunikasi-digital-era-modern",
        lastModified: new Date("2024-12-15"),
        featured: false,
      },
      {
        slug: "tren-teknologi-2025",
        lastModified: new Date("2024-12-10"), 
        featured: true,
      },
    ];
    
    console.log("Using fallback articles for sitemap");
    return fallbackArticles;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://archipelago.web.id";
  
  // Get all blog posts
  const posts = await getBlogPosts();
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamic blog post pages with enhanced metadata
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/${post.slug}`,
    lastModified: post.lastModified,
    changeFrequency: "monthly" as const,
    priority: (post as any).featured ? 0.9 : 0.8, // Higher priority for featured articles
  }));

  // Combine all pages
  return [...staticPages, ...blogPages];
}
