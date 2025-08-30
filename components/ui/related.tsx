import { getAllArticles } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

interface RelatedArticlesProps {
  currentSlug: string;
}

export default async function RelatedArticles({
  currentSlug,
}: RelatedArticlesProps) {
  const allArticles = await getAllArticles();
  const relatedArticles = allArticles
    .filter((article) => article.slug !== currentSlug)
    .slice(0, 3);

  if (relatedArticles.length === 0) return null;

  return (
    <section className="bg-white">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Related Articles</h2>
        <Link
          href="/"
          className="hidden md:flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors text-sm font-medium"
        >
          View all articles
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group block bg-white overflow-hidden transition-all duration-300 transform hover:-translate-y-1"
          >
            {article.image && (
              <div className="aspect-[16/10] relative overflow-hidden">
                <Image
                  src={article.image.url}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )}

            <div className="p-3">
              <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(article.date).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-3 group-hover:text-emerald-600 group-hover:underline decoration-emerald-600 underline-offset-4 transition-all leading-snug">
                {article.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      <div className="md:hidden mt-8 flex justify-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition"
        >
          View all articles
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
