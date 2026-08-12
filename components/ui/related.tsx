import { getArticlesPreview } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import CategoryBadge from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";

interface RelatedArticlesProps {
  currentSlug: string;
  currentCategory?: string;
  variant?: "grid" | "sidebar";
}

export default async function RelatedArticles({
  currentSlug,
  currentCategory,
  variant = "grid",
}: RelatedArticlesProps) {
  // Ambil dari kumpulan artikel yang lebih besar (bukan cuma 6 terbaru) supaya
  // prioritas kategori yang sama di bawah punya kandidat yang cukup, dan pakai
  // field set ringan (tanpa rich-text body) karena hanya kartu ringkasan yang
  // dirender di sini.
  const allArticles = await getArticlesPreview(20);

  // Prioritaskan artikel dari kategori yang sama
  const sameCategoryArticles = allArticles
    .filter((article) => article.slug !== currentSlug && article.category === currentCategory);

  const otherArticles = allArticles
    .filter((article) => article.slug !== currentSlug && article.category !== currentCategory);

  // Gabungkan: kategori sama dulu, sisanya dari kategori lain
  const relatedArticles = [...sameCategoryArticles, ...otherArticles].slice(0, variant === "sidebar" ? 4 : 3);

  if (relatedArticles.length === 0) return null;

  if (variant === "sidebar") {
    return (
      <section aria-label="Artikel terkait">
        <div className="flex items-center gap-2 mb-5 text-gray-400">
          <span className="text-xs font-semibold uppercase tracking-wider">
            Artikel Terkait
          </span>
        </div>

        <div className="flex flex-col gap-5">
          {relatedArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="focus-ring group flex gap-3"
            >
              {article.image && (
                <div className="w-24 h-18 shrink-0 relative overflow-hidden rounded">
                  <Image
                    src={article.image.url}
                    alt={article.title}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col min-w-0">
                {article.category && (
                  <CategoryBadge category={article.category} variant="text" className="mb-1" />
                )}
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:underline decoration-1 underline-offset-2">
                  {article.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/blog"
          className="focus-ring mt-6 inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-brand transition-colors"
        >
          Lihat semua artikel
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    );
  }


  return (
    <section className="bg-white">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Artikel Terkait</h2>
        <Link
          href="/blog"
          className="focus-ring hidden md:flex items-center gap-2 text-brand hover:text-brand-hover transition-colors text-sm font-medium"
        >
          Lihat semua artikel
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group block bg-white overflow-hidden transition-all duration-300 transform"
          >
            {article.image && (
              <div className="aspect-[16/10] relative overflow-hidden">
                <Image
                  src={article.image.url}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 368px"
                  className="object-cover transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )}

            <div className="p-4">
              {article.category && (
                <CategoryBadge category={article.category} variant="chip" className="mb-2" />
              )}
              <div className="flex items-center gap-4 mb-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(article.date).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-3 group-hover:text-brand group-hover:underline decoration-brand underline-offset-4 transition-all leading-snug">
                {article.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      <div className="md:hidden mt-8 flex justify-center">
        <Link
          href="/blog"
          className={buttonClasses({ variant: "primary", size: "sm" })}
        >
          Lihat semua artikel
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
