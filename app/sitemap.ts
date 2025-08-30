import type { MetadataRoute } from 'next'
import { getAllArticleSitemap } from '@/lib/api'

const baseUrl = 'https://archipelago.web.id'

interface StaticPage {
  slug: string;
  updatedAt: string;
  priority?: number;
  changeFrequency?: MetadataRoute.Sitemap[0]['changeFrequency'];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap: MetadataRoute.Sitemap = []

  // Halaman statis
  const pages: StaticPage[] = [
    {
      slug: 'home',
      updatedAt: new Date().toISOString(),
      priority: 1,
      changeFrequency: 'monthly'
    },
    {
      slug: 'about',
      updatedAt: new Date().toISOString(),
      priority: 0.8,
      changeFrequency: 'monthly'
    },
    {
      slug: 'blog',
      updatedAt: new Date().toISOString(),
      priority: 0.9,
      changeFrequency: 'weekly'
    },
  ]

  for (const page of pages) {
    sitemap.push({
      changeFrequency: page.changeFrequency || 'monthly',
      lastModified: page.updatedAt,
      priority: page.priority || 0.7,
      url: `${baseUrl}/${page.slug === 'home' ? '' : page.slug}`,
    })
  }

  // Ambil artikel dari Contentful
  try {
    const articles = await getAllArticleSitemap(50)

    for (const article of articles) {
      // Pastikan article memiliki slug
      if (!article.slug) continue;

      // Determine last modified date
      const lastModified = article.date
        ? new Date(article.date)
        : article.sys?.createdAt
          ? new Date(article.sys.createdAt)
          : new Date();

      sitemap.push({
        changeFrequency: 'weekly',
        lastModified: lastModified.toISOString(),
        priority: article.featured ? 0.9 : 0.7,
        url: `${baseUrl}/blog/${article.slug}`,
      });
    }
  } catch (error) {
    console.error('Error fetching articles for sitemap:', error)
    // Continue with static pages only
  }

  return sitemap
}