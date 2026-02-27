import { getAllArticles, getArticle } from "@/lib/api";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { ReactNode, Suspense } from "react";
import Link from "next/link";
import { Calendar, Clock, User, Share2 } from "lucide-react";
import { draftMode } from "next/headers";
import SocialShareButtons from "@/components/ui/social";
import RelatedArticles from "@/components/ui/related";
import TableOfContents from "@/components/ui/table-of-contents";
import { generateArticleSchema, generateJsonLd } from "@/lib/schema";
import { montserrat } from "@/app/layout";

export const revalidate = 60;

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
  return `${minutes} menit baca`;
}

const richTextRenderOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node: any, children: ReactNode) => (
      <p className={`mb-4 text-lg font-normal leading-relaxed text-slate-700 md:text-left ${montserrat.className}`}>
        {children}
      </p>
    ),
    [BLOCKS.HEADING_1]: (_node: any, children: ReactNode) => (
      <h1 className="text-4xl font-bold mt-16 mb-8 text-gray-900 pb-4">
        {children}
      </h1>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: ReactNode) => {
      const text = node.content?.map((child: any) => child.value || "").join("").trim();
      const id = text?.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim() || "";
      return (
        <h2 id={id} className="text-3xl font-bold mt-10 mb-4 text-gray-900 scroll-mt-24">
          {children}
        </h2>
      );
    },
    [BLOCKS.HEADING_3]: (node: any, children: ReactNode) => {
      const text = node.content?.map((child: any) => child.value || "").join("").trim();
      const id = text?.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim() || "";
      return (
        <h3 id={id} className="text-2xl font-bold mt-8 mb-3 text-gray-900 scroll-mt-24">
          {children}
        </h3>
      );
    },
    [BLOCKS.HEADING_4]: (_node: any, children: ReactNode) => (
      <h4 className="text-xl font-semibold mt-6 mb-3 text-gray-900">{children}</h4>
    ),
    [BLOCKS.UL_LIST]: (_node: any, children: ReactNode) => (
      <ul className="list-disc pl-6 mb-3 space-y-3 text-slate-900">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (_node: any, children: ReactNode) => (
      <ol className="list-decimal pl-6 mb-3 space-y-3 text-slate-900">
        {children}
      </ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node: any, children: ReactNode) => (
      <li className="text-lg leading-normal">{children}</li>
    ),
    [BLOCKS.QUOTE]: (_node: any, children: ReactNode) => (
      <blockquote className="border-l-4 rounded-l-md border-red-500 p-4 py-4 italic text-gray-700 bg-red-50">
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
        className="text-red-600 hover:text-red-800 underline decoration-2 underline-offset-2 transition-colors duration-200"
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

function ArticleSkeletonLoading() {
  return (
    <div className="animate-pulse bg-white">
      {/* Hero Section Skeleton */}
      <div className="relative bg-gray-900 py-16 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px),
                               linear-gradient(to bottom, #fff 1px, transparent 1px)`,
              backgroundSize: '4rem 4rem'
            }} />
          </div>
        </div>
        <div className="relative z-10 container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col justify-center items-center text-center">
            {/* Breadcrumb Skeleton */}
            <div className="flex items-center gap-2 mb-6 justify-center">
              <div className="h-4 w-16 bg-gray-700 rounded"></div>
              <div className="h-4 w-1 bg-gray-700 rounded"></div>
              <div className="h-4 w-12 bg-gray-700 rounded"></div>
              <div className="h-4 w-1 bg-gray-700 rounded"></div>
              <div className="h-4 w-32 bg-gray-700 rounded"></div>
            </div>

            {/* Category Badge Skeleton */}
            <div className="h-6 w-24 bg-red-500/10 rounded-full mb-4"></div>

            {/* Title Skeleton */}
            <div className="h-12 w-3/4 max-w-4xl bg-gray-700 rounded-lg mb-4 mx-auto"></div>
            <div className="h-12 w-2/3 max-w-3xl bg-gray-700 rounded-lg mb-6 mx-auto"></div>

            {/* Metadata Skeleton */}
            <div className="flex items-center gap-4 mb-6 justify-center">
              <div className="h-5 w-32 bg-gray-700 rounded-md"></div>
              <div className="w-1 h-1 rounded-full bg-gray-600"></div>
              <div className="h-5 w-24 bg-gray-700 rounded-md"></div>
              <div className="w-1 h-1 rounded-full bg-gray-600"></div>
              <div className="h-5 w-28 bg-gray-700 rounded-md"></div>
            </div>

            {/* Social Share Skeleton */}
            <div className="flex items-center gap-4 justify-center">
              <div className="h-5 w-5 bg-gray-700 rounded"></div>
              <div className="flex gap-2">
                <div className="h-8 w-8 bg-gray-700 rounded"></div>
                <div className="h-8 w-8 bg-gray-700 rounded"></div>
                <div className="h-8 w-8 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Featured Image Skeleton */}
        <div className="aspect-[3/2] w-full bg-gray-200 rounded-lg mb-10"></div>

        {/* Layout 2 kolom */}
        <div className="flex gap-12">
          {/* Article Content Skeleton */}
          <div className="flex-1 max-w-3xl space-y-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-7 w-2/3 bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-4/5 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>

          {/* ToC Skeleton */}
          <div className="hidden xl:block w-64 shrink-0 self-start sticky top-24">
            <div className="space-y-3">
              <div className="h-4 w-20 bg-gray-200 rounded mb-4"></div>
              <div className="h-3 w-40 bg-gray-200 rounded"></div>
              <div className="h-3 w-36 bg-gray-200 rounded"></div>
              <div className="h-3 w-44 bg-gray-200 rounded"></div>
              <div className="h-3 w-32 bg-gray-200 rounded"></div>
            </div>
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
  const articleUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://archipelago.web.id"
    }/blog/${params.slug}`;

  const articleSchema = generateArticleSchema(article);

  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<ArticleSkeletonLoading />}>
        {/* Hero Section */}
        <div className="relative bg-gray-900 py-16 overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px),
                                 linear-gradient(to bottom, #fff 1px, transparent 1px)`,
                backgroundSize: '4rem 4rem'
              }} />
            </div>
            
            {/* Decorative lines */}
            <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-slate-700/50 to-transparent" />
            <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-slate-700/50 to-transparent" />
          </div>

          <div className="relative z-10 container mx-auto px-6 max-w-6xl">
            <div className="flex flex-col justify-center items-center text-center">
              {/* Breadcrumb */}
              <div className="mb-6 text-sm text-gray-400 flex gap-2 justify-center items-center flex-wrap">
                <Link href="/" className="hover:underline text-gray-300 hover:text-red-400 transition-colors">
                  Beranda
                </Link>
                <span className="text-gray-600">/</span>
                <Link href="/blog" className="hover:underline text-gray-300 hover:text-red-400 transition-colors">
                  Blog
                </Link>
                {article.category && (
                  <>
                    <span className="text-gray-600">/</span>
                    <Link href={`/blog/${article.category}`} className="hover:underline text-gray-300 hover:text-red-400 transition-colors capitalize">
                      {article.category}
                    </Link>
                  </>
                )}
                <span className="text-gray-600">/</span>
              </div>

              {/* Kategori Badge */}
              {article.category && (
                <Link 
                  href={`/blog/${article.category}`}
                  className="inline-block px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-wider text-red-400 bg-red-500/10 rounded-full hover:bg-red-500/20 transition-colors"
                >
                  {article.category}
                </Link>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-snug max-w-4xl">
                {article.title}
              </h1>

              {/* Metadata */}
              <div className="flex items-center gap-4 text-gray-400 text-sm flex-wrap justify-center mb-6">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.date).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {readingTime}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  Galang Saputra
                </span>
              </div>

              {/* Social Share Buttons in Hero */}
              <div className="flex items-center gap-4">
                <Share2 className="w-5 h-5 text-gray-400" />
                <SocialShareButtons
                  url={articleUrl}
                  title={article.title}
                  variant="hero"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Konten Artikel */}
        <div className="max-w-5xl mx-auto px-6 py-12">
          {/* Featured Image */}
          {article.image && (
            <div className="mb-10">
              <figure className="overflow-hidden">
                <div className="aspect-[3/2] w-full relative">
                  <Image
                    src={article.image.url}
                    fill
                    alt={article.title}
                    priority
                    quality={75}
                    className="object-cover"
                  />
                </div>
              </figure>
            </div>
          )}

          {/* Layout 2 kolom: Artikel + ToC */}
          <div className="flex gap-12">
            {/* Artikel Utama */}
            <article className="flex-1 max-w-2xl">
              <div className="prose prose-lg prose-slate max-w-none">
                {documentToReactComponents(
                  article.details.json,
                  richTextRenderOptions
                )}
              </div>

              {/* Share di akhir artikel */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <p className="text-gray-900 font-bold">Suka artikel ini? Bagikan ke temanmu!</p>
                  <SocialShareButtons
                    url={articleUrl}
                    title={article.title}
                    variant="inline"
                  />
                </div>
              </div>
            </article>

            {/* Table of Contents - Sticky di kanan */}
            <aside className="w-64 shrink-0 self-start sticky top-24">
              <TableOfContents content={article.details.json} />
            </aside>
          </div>

          {/* Artikel Terkait */}
          <div className="mt-16">
            <RelatedArticles currentSlug={params.slug} currentCategory={article.category} />
          </div>
        </div>

        {/* JSON-LD Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={generateJsonLd(articleSchema)}
        />
      </Suspense>
    </div>
  );
}