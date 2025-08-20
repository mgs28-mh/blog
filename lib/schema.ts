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
    logo: string;
  };
}

const defaultConfig: SchemaConfig = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://blogkita.id",
  siteName: "BlogKita - Portal Komunikasi Digital Indonesia",
  author: {
    name: "Tim BlogKita",
    url: "https://blogkita.id/tentang-kami",
  },
  publisher: {
    name: "BlogKita Indonesia",
    logo: "https://blogkita.id/images/logo-blogkita.png",
  },
};

// Website Schema (for homepage and main pages)
export function generateWebsiteSchema(config: Partial<SchemaConfig> = {}) {
  const finalConfig = { ...defaultConfig, ...config };

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: finalConfig.siteName,
    url: finalConfig.baseUrl,
    description:
      "Temukan wawasan mendalam tentang komunikasi digital, tren teknologi, dan pengembangan profesional melalui cerita menarik dan perspektif ahli.",
    publisher: {
      "@type": "Organization",
      name: finalConfig.publisher.name,
      logo: {
        "@type": "ImageObject",
        url: finalConfig.publisher.logo,
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${finalConfig.baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// Blog Schema (for blog listing pages)
export function generateBlogSchema(
  articles: Article[],
  config: Partial<SchemaConfig> = {}
) {
  const finalConfig = { ...defaultConfig, ...config };

  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${finalConfig.siteName} - Blog`,
    url: `${finalConfig.baseUrl}/blog`,
    description:
      "Artikel-artikel terbaru tentang komunikasi digital, teknologi, dan pengembangan profesional.",
    author: {
      "@type": "Person",
      name: finalConfig.author.name,
      url: finalConfig.author.url,
    },
    publisher: {
      "@type": "Organization",
      name: finalConfig.publisher.name,
      logo: {
        "@type": "ImageObject",
        url: finalConfig.publisher.logo,
      },
    },
    blogPost: articles.slice(0, 10).map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      url: `${finalConfig.baseUrl}/${article.slug}`,
      datePublished: article.date,
      dateModified: article.sys.createdAt || article.date,
      author: {
        "@type": "Person",
        name: article.author,
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

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    url: `${finalConfig.baseUrl}/${article.slug}`,
    datePublished: article.date,
    dateModified: article.sys.createdAt || article.date,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: finalConfig.publisher.name,
      logo: {
        "@type": "ImageObject",
        url: finalConfig.publisher.logo,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${finalConfig.baseUrl}/${article.slug}`,
    },
    image: article.image?.url
      ? {
          "@type": "ImageObject",
          url: article.image.url,
          width: 1200,
          height: 630,
        }
      : undefined,
    articleSection: "Blog",
    inLanguage: "id-ID",
    isPartOf: {
      "@type": "WebSite",
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

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
    "@type": "Organization",
    name: finalConfig.publisher.name,
    url: finalConfig.baseUrl,
    logo: {
      "@type": "ImageObject",
      url: finalConfig.publisher.logo,
    },
    description:
      "Platform blog yang menyediakan wawasan mendalam tentang komunikasi digital, tren teknologi, dan pengembangan profesional.",
    sameAs: [
      "https://twitter.com/blogkita_id",
      "https://facebook.com/blogkita.indonesia",
      "https://linkedin.com/company/blogkita-indonesia",
      "https://instagram.com/blogkita.id",
      "https://youtube.com/@blogkitaindonesia",
    ],
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

// Helper function to generate JSON-LD script tag
export function generateJsonLd(schema: object) {
  return {
    __html: JSON.stringify(schema, null, 2),
  };
}
