import { Article } from "./api";

interface SchemaConfig {
  baseUrl: string;
  siteName: string;
  author: {
    name: string;
    url?: string;
  };
  publisher: {
    name: string;
    url: string;
    logo: {
      url: string;
      width: number;
      height: number;
    };
    sameAs: string[];
  };
}

const defaultConfig: SchemaConfig = {
  baseUrl: "https://katakomunika.web.id",
  siteName: "Kata Komunika",
  author: {
    name: "Galang Saputra",
    url: "https://katakomunika.web.id/about",
  },
  publisher: {
    name: "Kata Komunika",
    url: "https://katakomunika.web.id",
    logo: {
      url: "https://katakomunika.web.id/logo.webp",
      width: 3300,
      height: 3300,
    },
    sameAs: [
      "https://x.com/katakomunika",
      "https://facebook.com/katakomunika",
      "https://linkedin.com/company/kata-komunika",
      "https://instagram.com/katakomunika",
      "https://youtube.com/@katakomunika",
    ],
  },
};

// Shared Organization node — reused by generateWebsiteSchema, generateBlogSchema,
// generateArticleSchema, and generateOrganizationSchema so the @id-merged graph
// stays consistent everywhere instead of duplicating a thinner copy per call site.
function buildPublisherOrganization(config: SchemaConfig) {
  return {
    "@type": "Organization",
    "@id": `${config.baseUrl}/#organization`,
    name: config.publisher.name,
    url: config.publisher.url,
    logo: {
      "@type": "ImageObject",
      url: config.publisher.logo.url,
      width: config.publisher.logo.width,
      height: config.publisher.logo.height,
    },
    sameAs: config.publisher.sameAs,
  };
}

// Website Schema (for homepage and main pages)
export function generateWebsiteSchema(config: Partial<SchemaConfig> = {}) {
  const finalConfig = { ...defaultConfig, ...config };

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${finalConfig.baseUrl}/#website`,
    name: finalConfig.siteName,
    url: finalConfig.baseUrl,
    description:
      "Dapatkan artikel, wawasan, dan tips komunikasi dan informasi teknologi.",
    publisher: buildPublisherOrganization(finalConfig),
  };
}

// Blog Schema (for blog listing pages)
export function generateBlogSchema(
  articles: Article[],
  options: { path?: string; name?: string; description?: string } = {},
  config: Partial<SchemaConfig> = {}
) {
  const finalConfig = { ...defaultConfig, ...config };
  const path = options.path || "/blog";
  const pageUrl = `${finalConfig.baseUrl}${path}`;

  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${pageUrl}#blog`,
    name: options.name || `${finalConfig.siteName} - Blog`,
    url: pageUrl,
    description:
      options.description ||
      "Dapatkan artikel, wawasan, dan tips komunikasi dan informasi teknologi.",
    author: {
      "@type": "Person",
      "@id": `${finalConfig.baseUrl}/about#person`,
      name: finalConfig.author.name,
      url: finalConfig.author.url,
    },
    publisher: buildPublisherOrganization(finalConfig),
    isPartOf: {
      "@id": `${finalConfig.baseUrl}/#website`,
    },
    blogPost: articles.slice(0, 10).map((article) => ({
      "@type": "BlogPosting",
      "@id": `${finalConfig.baseUrl}/blog/${article.slug}#article`,
      headline: article.title,
      url: `${finalConfig.baseUrl}/blog/${article.slug}`,
      datePublished: article.date,
      dateModified: article.sys.createdAt || article.date,
      author: {
        "@type": "Person",
        "@id": `${finalConfig.baseUrl}/about#person`,
        name: article.author || finalConfig.author.name,
        url: finalConfig.author.url,
      },
      description: article.excerpt,
      image: article.image?.url
        ? {
            "@type": "ImageObject",
            url: article.image.url,
          }
        : undefined,
    })),
  };
}

// Article Schema (for individual blog posts)
export function generateArticleSchema(
  article: Article,
  config: Partial<SchemaConfig> = {}
) {
  const finalConfig = { ...defaultConfig, ...config };

  const articleUrl = `${finalConfig.baseUrl}/blog/${article.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${articleUrl}#article`,
    headline: article.title,
    description: article.excerpt,
    url: articleUrl,
    datePublished: article.date,
    dateModified: article.sys.createdAt || article.date,
    author: {
      "@type": "Person",
      "@id": `${finalConfig.baseUrl}/about#person`,
      name: article.author || finalConfig.author.name,
      url: finalConfig.author.url,
    },
    publisher: buildPublisherOrganization(finalConfig),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    image: article.image?.url
      ? {
          "@type": "ImageObject",
          url: article.image.url,
          width: 1200,
          height: 630,
        }
      : undefined,
    articleSection: article.category || "Blog",
    inLanguage: "id-ID",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${finalConfig.baseUrl}/#website`,
      name: finalConfig.siteName,
      url: finalConfig.baseUrl,
    },
  };
}

// Breadcrumb Schema
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
  config: Partial<SchemaConfig> = {}
) {
  const finalConfig = { ...defaultConfig, ...config };
  const lastItem = items[items.length - 1];
  const pageUrl = lastItem
    ? lastItem.url.startsWith("http")
      ? lastItem.url
      : `${finalConfig.baseUrl}${lastItem.url}`
    : finalConfig.baseUrl;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${finalConfig.baseUrl}${item.url}`,
    })),
  };
}

// Organization Schema (for about page)
export function generateOrganizationSchema(config: Partial<SchemaConfig> = {}) {
  const finalConfig = { ...defaultConfig, ...config };

  return {
    "@context": "https://schema.org",
    ...buildPublisherOrganization(finalConfig),
    description:
      "Dapatkan artikel, wawasan, dan tips komunikasi dan informasi teknologi.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "layanan pelanggan",
      availableLanguage: ["Indonesian", "id-ID"],
      areaServed: "ID",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "ID",
      addressLocality: "Indonesia",
    },
  };
}

// Person Schema (for about page)
export function generatePersonSchema(config: Partial<SchemaConfig> = {}) {
  const finalConfig = { ...defaultConfig, ...config };

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${finalConfig.baseUrl}/about#person`,
    name: finalConfig.author.name,
    url: finalConfig.author.url,
    image: `${finalConfig.baseUrl}/about-me.jpg`,
    jobTitle: "Penulis dan Pengembang",
    description:
      "Penulis dan pengembang yang berbagi wawasan seputar komunikasi dan teknologi di Kata Komunika.",
    worksFor: {
      "@type": "Organization",
      name: finalConfig.publisher.name,
      url: finalConfig.baseUrl,
    },
    sameAs: [
      "https://x.com/mgs28mh",
      "https://facebook.com/mgs28mh",
      "https://instagram.com/mgs28mh",
      "https://github.com/mgs28-mh",
      "https://mgalangs.vercel.app",
    ],
  };
}

// Helper function to generate JSON-LD script tag
export function generateJsonLd(schema: object) {
  return {
    __html: JSON.stringify(schema, null, 2),
  };
}
