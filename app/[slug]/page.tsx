import { getAllArticles, getArticle } from "@/lib/api";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { ReactNode, Suspense } from "react";
import Link from "next/link";
import { Calendar, Clock, User, Share2 } from "lucide-react";
import { draftMode } from "next/headers";
import ReadingProgressBar from "@/components/ui/reading";
import SocialShareButtons from "@/components/ui/social";
import AuthorCard from "@/components/ui/author";
import RelatedArticles from "@/components/ui/related";
import { generateArticleSchema, generateJsonLd } from "@/lib/schema";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const allArticles = await getAllArticles();
  return allArticles.map((article) => ({
    slug: article.slug,
  }));
}

function calculateReadingTime(content: any): string {
  // More accurate reading time calculation
  const text = JSON.stringify(content);
  const wordCount = text.split(/\s+/).length;
  const wordsPerMinute = 200;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

const richTextRenderOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node: any, children: ReactNode) => (
      <p className="mb-6 text-xl font-base leading-relaxed text-slate-900 md:text-justify">
        {children}
      </p>
    ),
    [BLOCKS.HEADING_1]: (_node: any, children: ReactNode) => (
      <h1 className="text-4xl font-bold mt-16 mb-8 text-gray-900 border-b border-gray-200 pb-4">
        {children}
      </h1>
    ),
    [BLOCKS.HEADING_2]: (_node: any, children: ReactNode) => (
      <h2 className="text-4xl font-extrabold mt-12 mb-4 text-gray-900">
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (_node: any, children: ReactNode) => (
      <h3 className="text-2xl font-bold mt-10 mb-5 text-gray-900">
        {children}
      </h3>
    ),
    [BLOCKS.HEADING_4]: (_node: any, children: ReactNode) => (
      <h4 className="text-xl font-bold mt-8 mb-4 text-gray-900">{children}</h4>
    ),
    [BLOCKS.UL_LIST]: (_node: any, children: ReactNode) => (
      <ul className="list-disc pl-6 mb-8 space-y-3 text-gray-700">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (_node: any, children: ReactNode) => (
      <ol className="list-decimal pl-6 mb-8 space-y-3 text-gray-700">
        {children}
      </ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node: any, children: ReactNode) => (
      <li className="text-lg leading-relaxed">{children}</li>
    ),
    [BLOCKS.QUOTE]: (_node: any, children: ReactNode) => (
      <blockquote className="border-l-4 border-emerald-500 pl-6 py-4 my-8 italic text-gray-700 bg-blue-50 rounded-r-lg">
        {children}
      </blockquote>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const file = node.data.target?.fields?.file;
      const title = node.data.target?.fields?.title;
      const description = node.data.target?.fields?.description;

      if (!file) return null;

      return (
        <figure className="my-10 rounded-xl overflow-hidden shadow-lg">
          <div className="aspect-[16/10] w-full relative">
            <Image
              src={`https:${file.url}`}
              fill
              alt={description || title || "Embedded content"}
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          {(title || description) && (
            <figcaption className="p-4 bg-gray-50">
              {title && (
                <div className="font-medium text-lg text-gray-900">{title}</div>
              )}
              {description && (
                <div className="text-sm text-gray-600 mt-1">{description}</div>
              )}
            </figcaption>
          )}
        </figure>
      );
    },
    [INLINES.HYPERLINK]: (node: any, children: ReactNode) => (
      <Link
        href={node.data.uri}
        className="text-emerald-600 hover:text-emerald-800 underline decoration-2 underline-offset-2 transition-colors duration-200"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </Link>
    ),
  },
  renderMark: {
    bold: (text: ReactNode) => (
      <strong className="font-bold text-gray-900">{text}</strong>
    ),
    italic: (text: ReactNode) => <em className="italic">{text}</em>,
    underline: (text: ReactNode) => <u className="underline">{text}</u>,
    code: (text: ReactNode) => (
      <code className="font-mono bg-gray-100 px-2 py-1 rounded-md text-sm text-gray-800 border">
        {text}
      </code>
    ),
  },
};

function ReadingProgressSkeleton() {
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div
        className="h-full bg-gray-300 animate-pulse"
        style={{ width: "0%" }}
      />
    </div>
  );
}

function ArticleSkeletonLoading() {
  return (
    <div className="animate-pulse bg-white">
      <ReadingProgressSkeleton />

      {/* Hero Section Skeleton */}
      <div className="relative h-[70vh] bg-gray-200 overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <div className="h-6 w-24 bg-gray-300 rounded-full mb-6"></div>
          <div className="h-12 w-3/4 max-w-2xl bg-gray-300 rounded-lg mb-4"></div>
          <div className="h-12 w-2/3 max-w-xl bg-gray-300 rounded-lg mb-8"></div>
          <div className="flex items-center gap-4">
            <div className="h-5 w-32 bg-gray-300 rounded-md"></div>
            <div className="w-1 h-1 rounded-full bg-gray-400"></div>
            <div className="h-5 w-24 bg-gray-300 rounded-md"></div>
          </div>
        </div>
      </div>

      {/* Content Skeleton with Left Sidebar */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Sidebar Skeleton */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="h-64 bg-gray-200 rounded-lg"></div>
          </div>
          {/* Main Content Skeleton */}
          <div className="flex-1 space-y-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="h-8 w-2/3 bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface BlogPostArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostArticlePage(
  props: BlogPostArticlePageProps
) {
  const params = await props.params;
  const draft = await draftMode();
  const isEnabled = draft.isEnabled;

  let article;
  try {
    article = await getArticle(params.slug, isEnabled);
    if (!article) {
      notFound();
    }
  } catch (error) {
    notFound();
  }

  const readingTime = calculateReadingTime(article.details);
  const articleUrl = `${
    process.env.NEXT_PUBLIC_SITE_URL || "https://yoursite.com"
  }/${params.slug}`;

  const articleSchema = generateArticleSchema(article);

  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={<ArticleSkeletonLoading />}>
        {/* Reading Progress Bar */}
        <ReadingProgressBar />

        {/* Hero Section */}
        <div className="relative h-[70vh] overflow-hidden">
          {article.image ? (
            <div className="absolute inset-0">
              <Image
                src={article.image.url}
                alt={article.title}
                fill
                priority
                quality={100}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gray-900/60" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gray-100" />
          )}

          <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
            {/* Breadcrumb */}
            <div className="mb-6 text-sm text-white/80 flex gap-2 justify-start lg:justify-center items-center flex-wrap text-left lg:text-center">
              <Link href="/" className="hover:underline text-white/80">
                Beranda
              </Link>
              <span className="text-white/50">/</span>
              <span className="text-sm text-white">{article.title}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-snug max-w-4xl">
              {article.title}
            </h1>

            {/* Metadata */}
            <div className="flex items-center gap-4 text-white text-sm flex-wrap justify-center mb-6">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(article.date).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="w-1 h-1 rounded-full bg-white"></span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {readingTime}
              </span>
              <span className="w-1 h-1 rounded-full bg-white"></span>
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                Galang Saputra
              </span>
            </div>

            {/* Social Share Buttons in Hero */}
            <div className="flex items-center gap-3">
              <Share2 className="w-5 h-5 text-white/80" />
              <SocialShareButtons
                url={articleUrl}
                title={article.title}
                variant="hero"
              />
            </div>
          </div>
        </div>

        {/* Main Content with Right Sidebar using Flexbox */}
        <div className="container mx-auto p-6 lg:px-8 py-12 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content - Takes remaining space */}
            <main className="flex-1 min-w-0 max-w-5xl order-2 lg:order-2">
              <article className="bg-white mb-12">
                <div className="prose prose-base prose-gray max-w-none leading-relaxed">
                  {documentToReactComponents(
                    article.details.json,
                    richTextRenderOptions
                  )}
                </div>
              </article>

              {/* Related Articles */}
              <RelatedArticles currentSlug={params.slug} />
            </main>

            {/* Sidebar - Now on the right side */}
            <aside className="lg:w-60 flex-shrink-0 space-y-8 order-1 lg:order-2">
              {/* Author Section */}
              <AuthorCard />

              {/* Share Section - sticky */}
              <div className="sticky top-21 bg-white">
                <h3 className="text-md font-bold text-gray-900 mb-4 tracking-wider">
                  Bagikan
                </h3>
                <SocialShareButtons
                  url={articleUrl}
                  title={article.title}
                  variant="sidebar"
                />
              </div>
            </aside>
          </div>
        </div>

        {/* JSON-LD Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={generateJsonLd(articleSchema)}
        />
      </Suspense>
    </main>
  );
}