import { getAllArticleSitemap } from "@/lib/api";
import { MetadataRoute } from "next";

const baseUrl = 'https://katakomunika.web.id';

// Fixed "last verified" date for /about — its content doesn't change when new
// articles are published, so it shouldn't track a rolling date. Update this
// manually whenever the About page content is actually edited.
const ABOUT_LAST_MODIFIED = new Date("2026-08-08");

async function getRoutes(): Promise<MetadataRoute.Sitemap> {

  let routes: MetadataRoute.Sitemap = [];

  // Static routes - only main pages, no pagination routes
  const staticRoutes = [
    { path: "/", priority: 1.0, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/blog/komunikasi", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/blog/teknologi", priority: 0.9, changeFrequency: "weekly" as const },
  ];

  try {
    // Fetch once, reuse both for blog routes and as a proxy lastmod for the
    // listing/home pages (they surface whatever the newest article is).
    const articles = await getAllArticleSitemap(100);
    const mostRecentDate = articles[0]?.date ? new Date(articles[0].date) : new Date();

    // Add static routes
    routes = staticRoutes.map(route => ({
      url: `${baseUrl}${route.path}`,
      lastModified: route.path === "/about" ? ABOUT_LAST_MODIFIED : mostRecentDate,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }));

    // Add dynamic blog article routes (canonical URLs only)
    const blogRoutes: MetadataRoute.Sitemap = articles
      .filter(article => article.slug)
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
    // Fall back to static routes with a plain timestamp if the article fetch fails.
    routes = staticRoutes.map(route => ({
      url: `${baseUrl}${route.path}`,
      lastModified: route.path === "/about" ? ABOUT_LAST_MODIFIED : new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }));
  }

  return routes;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return getRoutes();
}