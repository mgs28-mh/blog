import { getAllArticles, getArticle } from "@/lib/api";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Calendar, Clock, User, Share2, } from "lucide-react";
import { draftMode } from "next/headers";
import dynamic from "next/dynamic";
import SocialShareButtons from "@/components/ui/social";
import RelatedArticles from "@/components/ui/related";
import PageHero, { HeroGridShell } from "@/components/ui/page-hero";

// Below-fold / collapsed-by-default instances of the same widgets are code-split
// out of the initial hydration bundle — the hero share buttons stay as a
// regular import since it's visible immediately on load.
const SocialShareButtonsBelowFold = dynamic(() => import("@/components/ui/social"));
import { generateArticleSchema, generateBreadcrumbSchema, generateJsonLd } from "@/lib/schema";
import { richTextRenderOptions } from "@/lib/contentful-renderer";
import { calculateReadingTime } from "@/lib/utils";
import type { Metadata } from "next";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const allArticles = await getAllArticles();
  return allArticles.map((article) => ({
    slug: article.slug,
  }));
}

interface GenerateMetadataProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan",
      description: "Artikel yang Anda cari tidak ditemukan.",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://katakomunika.web.id";
  const canonicalUrl = `${siteUrl}/blog/${slug}`;
  const imageUrl = article.image?.url || `${siteUrl}/logo.webp`;

  return {
    title: article.title,
    description: article.excerpt,
    authors: [{ name: article.author || "Galang Saputra" }],
    keywords: article.category ? [article.category, "blog", "artikel"] : ["blog", "artikel"],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: canonicalUrl,
      siteName: "Kata Komunika",
      locale: "id_ID",
      type: "article",
      publishedTime: article.date,
      authors: [article.author || "Galang Saputra"],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [imageUrl],
    },
  };
}

function ArticleSkeletonLoading() {
  return (
    <div className="animate-pulse bg-white">
      {/* Hero Section Skeleton — shares the same shell as the real PageHero */}
      <HeroGridShell className="py-8 sm:py-10 md:py-12">
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-12">
            <div className="flex-1">
              {/* Breadcrumb Skeleton */}
              <div className="flex items-center gap-2 mb-4">
                <div className="h-4 w-16 bg-gray-700 rounded"></div>
                <div className="h-4 w-1 bg-gray-700 rounded"></div>
                <div className="h-4 w-12 bg-gray-700 rounded"></div>
              </div>

              {/* Category Label Skeleton */}
              <div className="h-3 w-20 bg-gray-700 rounded mb-4"></div>

              {/* Title Skeleton */}
              <div className="h-9 w-full max-w-md bg-gray-700 rounded-lg mb-3"></div>
              <div className="h-9 w-2/3 max-w-sm bg-gray-700 rounded-lg mb-6"></div>

              {/* Metadata Skeleton */}
              <div className="flex items-center gap-4 mb-6">
                <div className="h-5 w-32 bg-gray-700 rounded-md"></div>
                <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                <div className="h-5 w-24 bg-gray-700 rounded-md"></div>
              </div>

              {/* Social Share Skeleton */}
              <div className="flex items-center gap-4">
                <div className="h-5 w-5 bg-gray-700 rounded"></div>
                <div className="flex gap-2">
                  <div className="h-8 w-8 bg-gray-700 rounded"></div>
                  <div className="h-8 w-8 bg-gray-700 rounded"></div>
                  <div className="h-8 w-8 bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>

            {/* Featured Image Skeleton */}
            <div className="w-full lg:w-80 xl:w-96 shrink-0">
              <div className="aspect-[16/10] lg:aspect-auto lg:h-full bg-gray-700"></div>
            </div>
          </div>
        </div>
      </HeroGridShell>

      {/* Content Skeleton */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Layout 2 kolom */}
        <div className="flex gap-8">
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

          {/* Sidebar Skeleton */}
          <div className="hidden xl:block w-72 shrink-0 xl:pl-8 xl:border-l xl:border-gray-200 space-y-5">
            <div className="h-3 w-24 bg-gray-200 rounded mb-2"></div>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-20 h-16 shrink-0 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-2 pt-1">
                  <div className="h-3 w-16 bg-gray-200 rounded"></div>
                  <div className="h-3 w-full bg-gray-200 rounded"></div>
                  <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
                </div>
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
  const articleUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://katakomunika.web.id"
    }/blog/${params.slug}`;

  const articleSchema = generateArticleSchema(article);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", url: "/" },
    { name: "Blog", url: "/blog" },
    ...(article.category
      ? [
          {
            name: article.category === "komunikasi" ? "Komunikasi" : article.category === "teknologi" ? "Teknologi" : article.category,
            url: `/blog/${article.category}`,
          },
        ]
      : []),
    { name: article.title, url: `/blog/${params.slug}` },
  ]);

  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<ArticleSkeletonLoading />}>
        {/* Hero Section */}
        <PageHero
          size="md"
          align="left"
          headline={article.title}
          image={article.image ? { url: article.image.url, alt: article.title } : undefined}
          breadcrumb={
            <>
              <div className="mb-1 text-sm text-gray-400 flex gap-2 items-center flex-wrap">
                <Link href="/" className="focus-ring-dark hover:underline text-gray-300 hover:text-brand transition-colors">
                  Beranda
                </Link>
                <span className="text-gray-600">/</span>
                <Link href="/blog" className="focus-ring-dark hover:underline text-gray-300 hover:text-brand transition-colors">
                  Blog
                </Link>
                {article.category && (
                  <>
                    <span className="text-gray-600">/</span>
                    <Link href={`/blog/${article.category}`} className="focus-ring-dark hover:underline text-gray-300 hover:text-brand transition-colors capitalize">
                      {article.category}
                    </Link>
                  </>
                )}
              </div>

              {article.category && (
                <Link
                  href={`/blog/${article.category}`}
                  className={`focus-ring-dark group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    article.category === "teknologi"
                      ? "text-blue-400 hover:text-blue-300"
                      : "text-brand hover:text-brand-hover"
                  }`}
                >
                  <span
                    className={`h-px w-6 transition-colors ${
                      article.category === "teknologi" ? "bg-blue-400" : "bg-brand"
                    }`}
                  />
                  {article.category}
                </Link>
              )}
            </>
          }
          meta={
            <>
              <div className="flex items-center gap-4 text-gray-400 text-sm flex-wrap">
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

              <div className="flex items-center gap-4">
                <Share2 className="w-5 h-5 text-gray-400" />
                <SocialShareButtons
                  url={articleUrl}
                  title={article.title}
                  variant="hero"
                />
              </div>
            </>
          }
        />

        {/* Konten Artikel — kontainer selebar hero (max-w-6xl) supaya tepi kiri
            sejajar dengan judul di atas, bukan ikut ke tengah halaman. */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Layout 2 kolom: Artikel + Artikel Terkait */}
          <div className="flex flex-col xl:flex-row gap-8">
            {/* Artikel Utama — lebar dibatasi untuk kenyamanan baca */}
            <article className="w-full max-w-3xl">
              <div>
                {documentToReactComponents(
                  article.details.json,
                  richTextRenderOptions
                )}
              </div>

              {/* Share di akhir artikel */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <p className="text-gray-900 font-bold">Suka artikel ini? Bagikan ke temanmu!</p>
                  <SocialShareButtonsBelowFold
                    url={articleUrl}
                    title={article.title}
                    variant="inline"
                  />
                </div>
              </div>
            </article>

            {/* Artikel Terkait — sidebar kanan, garis pemisah membentang sepanjang artikel */}
            <aside className="hidden xl:block w-72 shrink-0 xl:pl-8 xl:border-l xl:border-gray-200">
              <div className="pb-8 border-b border-gray-200">
                <RelatedArticles
                  currentSlug={params.slug}
                  currentCategory={article.category}
                  variant="sidebar"
                />
              </div>
            </aside>
          </div>

          {/* Artikel Terkait — versi grid untuk mobile/tablet (sidebar disembunyikan di bawah xl) */}
          <div className="mt-16 pb-12 border-b border-gray-200 xl:hidden">
            <RelatedArticles currentSlug={params.slug} currentCategory={article.category} />
          </div>
        </div>

        {/* JSON-LD Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={generateJsonLd(articleSchema)}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={generateJsonLd(breadcrumbSchema)}
        />
      </Suspense>
    </div>
  );
}
