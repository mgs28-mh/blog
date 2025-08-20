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
}

export interface ArticleCollection {
  items: Article[];
}

export interface GraphQLResponse {
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
