import { getAllArticleSitemap } from "@/lib/api";
import { MetadataRoute } from "next";

const baseUrl = 'https://archipelago.web.id';

export const revalidate = 3600;

async function getRoutes(): Promise<MetadataRoute.Sitemap> {

  let routes: MetadataRoute.Sitemap = [];

  // Static routes
  const staticRoutes = [
    { path: "/", priority: 1.0, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.9, changeFrequency: "weekly" as const },
  ];

  // Add static routes
  routes = staticRoutes.map(route => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Add dynamic blog routes
  try {
    const articles = await getAllArticleSitemap(100);

    const blogRoutes: MetadataRoute.Sitemap = articles
      .filter(article => article.slug) // hanya artikel yang punya slug
      .map(article => {
        const lastModified = article.date
          ? new Date(article.date)
          : new Date();

        return {
          url: `${baseUrl}/blog/${article.slug}`,
          lastModified,
          changeFrequency: "weekly" as const,
          priority: article.featured ? 0.9 : 0.7,
        };
      });

    routes = [...routes, ...blogRoutes];
  } catch (error) {
    console.error("Failed to fetch blog articles for sitemap:", error);
  }

  return routes;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return getRoutes();
}