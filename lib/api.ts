export interface ContentfulSys {
  id: string;
}

export interface ContentfulAsset {
  sys: ContentfulSys;
  url: string;
  description?: string;
}

export interface ContentfulRichText {
  json: any;
  links?: {
    assets?: {
      block?: ContentfulAsset[];
    };
  };
}

export interface Article {
  sys: {
    id: string;
    createdAt?: string;
  };
  author: string;
  title: string;
  slug: string;
  excerpt: string;
  details: ContentfulRichText;
  date: string;
  image?: {
    url: string;
  };
  featured: boolean;
  category?: string;
}

export interface ArticleCollection {
  items: Article[];
  total?: number;
  skip?: number;
  limit?: number;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemsPerPage: number;
}

export interface PaginatedArticles {
  articles: Article[];
  pagination: PaginationInfo;
}

export interface GraphQLResponse {
  errors: any;
  data?: {
    artikelPostCollection?: ArticleCollection;
  };
}

// Set a variable that contains all the fields needed for articles when a fetch for
// content is performed
const ARTICLE_GRAPHQL_FIELDS = `
    sys {
      id
    }
    title
    slug
    excerpt
    details {
      json
      links {
        assets {
          block {
            sys {
              id
            }
            url
            description
          }
        }
      }
    }
    date
    image {
      url
    }
    featured
    category
  `;

const ARTICLE_GRAPHQL_HOMEPAGE = `
    sys {
      id
    }
    title
    slug
    excerpt
    date
    image {
      url
    }
    featured
    category
`;

async function fetchGraphQL(
  query: string,
  preview = false
): Promise<GraphQLResponse> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Switch the Bearer token depending on whether the fetch is supposed to retrieve live
        // Contentful content or draft content
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      // Associate all fetches for articles with an "articles" cache tag so content can
      // be revalidated or updated from Contentful on publish
      next: { tags: ["articles"] },
    }
  ).then((response) => response.json());
}

function extractArticleEntries(fetchResponse: GraphQLResponse): Article[] {
  return fetchResponse?.data?.artikelPostCollection?.items || [];
}

function extractArticleCollection(fetchResponse: GraphQLResponse): ArticleCollection {
  return fetchResponse?.data?.artikelPostCollection || { items: [] };
}

export async function getAllArticles(
  // For this demo set the default limit to always return 3 articles.
  limit = 6,
  // By default this function will return published content but will provide an option to
  // return draft content for reviewing articles before they are live
  isDraftMode = false
): Promise<Article[]> {
  const articles = await fetchGraphQL(
    `query {
          artikelPostCollection(where:{slug_exists: true}, order: date_DESC, limit: ${limit}, preview: ${
            isDraftMode ? "true" : "false"
          }) {
            items {
              ${ARTICLE_GRAPHQL_FIELDS}
            }
          }
        }`,
    isDraftMode
  );
  return extractArticleEntries(articles);
}

export async function getArticlesPreview(
  // For this demo set the default limit to always return 3 articles.
  limit = 6,
  // By default this function will return published content but will provide an option to
  // return draft content for reviewing articles before they are live
  isDraftMode = false
): Promise<Article[]> {
  const articles = await fetchGraphQL(
    `query {
          artikelPostCollection(where:{slug_exists: true}, order: date_DESC, limit: ${limit}, preview: ${
            isDraftMode ? "true" : "false"
          }) {
            items {
              ${ARTICLE_GRAPHQL_HOMEPAGE}
            }
          }
        }`,
    isDraftMode
  );
  return extractArticleEntries(articles);
}

export async function getArticle(
  slug: string,
  isDraftMode = false
): Promise<Article | undefined> {
  const query = `
    query {
      artikelPostCollection(where:{slug: "${slug}"}, limit: 1, preview: ${
        isDraftMode ? "true" : "false"
      }) {
        items {
          ${ARTICLE_GRAPHQL_FIELDS}
        }
      }
    }`;

  const response = await fetchGraphQL(query, isDraftMode);
  return extractArticleEntries(response)[0];
}

// Paginated version of getAllArticles
export async function getArticlesPaginated(
  page = 1,
  itemsPerPage = 6,
  isDraftMode = false
): Promise<PaginatedArticles> {
  const skip = (page - 1) * itemsPerPage;
  
  const query = `
    query {
      artikelPostCollection(
        where: {slug_exists: true}, 
        order: [date_DESC, sys_id_DESC],
        limit: ${itemsPerPage},
        skip: ${skip},
        preview: ${isDraftMode ? "true" : "false"}
      ) {
        total
        items {
          ${ARTICLE_GRAPHQL_HOMEPAGE}
        }
      }
    }`;

  const response = await fetchGraphQL(query, isDraftMode);
  const collection = extractArticleCollection(response);
  
  const totalItems = collection.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  return {
    articles: collection.items,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
      itemsPerPage,
    },
  };
}

// Get featured articles with pagination
export async function getFeaturedArticles(
  limit = 3,
  isDraftMode = false
): Promise<Article[]> {
  const query = `
    query {
      artikelPostCollection(
        where: {slug_exists: true, featured: true}, 
        order: date_DESC, 
        limit: ${limit},
        preview: ${isDraftMode ? "true" : "false"}
      ) {
        items {
          ${ARTICLE_GRAPHQL_FIELDS}
        }
      }
    }`;

  const response = await fetchGraphQL(query, isDraftMode);
  return extractArticleEntries(response);
}

// Get articles by author with pagination
export async function getArticlesByAuthor(
  author: string,
  page = 1,
  itemsPerPage = 6,
  isDraftMode = false
): Promise<PaginatedArticles> {
  const skip = (page - 1) * itemsPerPage;
  
  const query = `
    query {
      artikelPostCollection(
        where: {slug_exists: true, author: "${author}"}, 
        order: date_DESC, 
        limit: ${itemsPerPage},
        skip: ${skip},
        preview: ${isDraftMode ? "true" : "false"}
      ) {
        total
        items {
          ${ARTICLE_GRAPHQL_FIELDS}
        }
      }
    }`;

  const response = await fetchGraphQL(query, isDraftMode);
  const collection = extractArticleCollection(response);
  
  const totalItems = collection.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  return {
    articles: collection.items,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
      itemsPerPage,
    },
  };
}

// Get recent articles (duplicate of getAllArticles with different naming)
export async function getRecentArticles(
  limit = 6,
  isDraftMode = false
): Promise<Article[]> {
  return getAllArticles(limit, isDraftMode);
}

// Get articles for search with pagination
export async function searchArticles(
  searchTerm: string,
  page = 1,
  itemsPerPage = 6,
  isDraftMode = false
): Promise<PaginatedArticles> {
  const skip = (page - 1) * itemsPerPage;
  
  const query = `
    query {
      artikelPostCollection(
        where: {
          slug_exists: true,
          OR: [
            {title_contains: "${searchTerm}"},
            {excerpt_contains: "${searchTerm}"}
          ]
        }, 
        order: date_DESC, 
        limit: ${itemsPerPage},
        skip: ${skip},
        preview: ${isDraftMode ? "true" : "false"}
      ) {
        total
        items {
          ${ARTICLE_GRAPHQL_FIELDS}
        }
      }
    }`;

  const response = await fetchGraphQL(query, isDraftMode);
  const collection = extractArticleCollection(response);
  
  const totalItems = collection.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  return {
    articles: collection.items,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
      itemsPerPage,
    },
  };
}

// Get total article count
export async function getTotalArticleCount(isDraftMode = false): Promise<number> {
  const query = `
    query {
      artikelPostCollection(
        where: {slug_exists: true}, 
        limit: 0,
        preview: ${isDraftMode ? "true" : "false"}
      ) {
        total
      }
    }`;

  const response = await fetchGraphQL(query, isDraftMode);
  return response?.data?.artikelPostCollection?.total || 0;
}

// Get related articles (duplicate with enhanced logic)
export async function getRelatedArticles(
  currentSlug: string,
  limit = 3,
  isDraftMode = false
): Promise<Article[]> {
  const query = `
    query {
      artikelPostCollection(
        where: {slug_exists: true, slug_not: "${currentSlug}"}, 
        order: date_DESC, 
        limit: ${limit},
        preview: ${isDraftMode ? "true" : "false"}
      ) {
        items {
          ${ARTICLE_GRAPHQL_FIELDS}
        }
      }
    }`;

  const response = await fetchGraphQL(query, isDraftMode);
  return extractArticleEntries(response);
}

export async function getAllArticleSitemap(
  limit = 100,
  isDraftMode = false
): Promise<Article[]> {
  try {
    const query = `query {
      artikelPostCollection(
        where: {slug_exists: true}, 
        order: date_DESC, 
        limit: ${limit},
        preview: ${isDraftMode ? "true" : "false"}
      ) {
        items {
          sys {
            id
          }
          slug
          date
          featured
        }
      }
    }`;

    const response = await fetchGraphQL(query, isDraftMode);

    if (response.errors) {
      return [];
    }

    const items = response?.data?.artikelPostCollection?.items || [];

    return items.map(item => ({
      sys: { id: item.sys?.id || '' },
      slug: item.slug || '',
      date: item.date || new Date().toISOString(),
      featured: item.featured || false,
      author: '',
      title: '',
      excerpt: '',
      details: { json: {} },
      image: { url: '' },
      category: ''
    }));
    
  } catch {
    return [];
  }
}

// Get articles by category with pagination
export async function getArticlesByCategory(
  category: string,
  page = 1,
  itemsPerPage = 6,
  isDraftMode = false
): Promise<PaginatedArticles> {
  const skip = (page - 1) * itemsPerPage;
  
  const query = `
    query {
      artikelPostCollection(
        where: {slug_exists: true, category: "${category}"}, 
        order: [date_DESC, sys_id_DESC],
        limit: ${itemsPerPage},
        skip: ${skip},
        preview: ${isDraftMode ? "true" : "false"}
      ) {
        total
        items {
          ${ARTICLE_GRAPHQL_HOMEPAGE}
        }
      }
    }`;

  const response = await fetchGraphQL(query, isDraftMode);
  const collection = extractArticleCollection(response);
  
  const totalItems = collection.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  return {
    articles: collection.items,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
      itemsPerPage,
    },
  };
}

// Get all articles from a specific category (without pagination)
export async function getAllArticlesByCategory(
  category: string,
  limit = 100,
  isDraftMode = false
): Promise<Article[]> {
  const articles = await fetchGraphQL(
    `query {
          artikelPostCollection(where:{slug_exists: true, category: "${category}"}, order: date_DESC, limit: ${limit}, preview: ${
            isDraftMode ? "true" : "false"
          }) {
            items {
              ${ARTICLE_GRAPHQL_FIELDS}
            }
          }
        }`,
    isDraftMode
  );
  return extractArticleEntries(articles);
}

// Get featured articles by category
export async function getFeaturedArticlesByCategory(
  category: string,
  limit = 3,
  isDraftMode = false
): Promise<Article[]> {
  const query = `
    query {
      artikelPostCollection(
        where: {slug_exists: true, featured: true, category: "${category}"}, 
        order: date_DESC, 
        limit: ${limit},
        preview: ${isDraftMode ? "true" : "false"}
      ) {
        items {
          ${ARTICLE_GRAPHQL_FIELDS}
        }
      }
    }`;

  const response = await fetchGraphQL(query, isDraftMode);
  return extractArticleEntries(response);
}