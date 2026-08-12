import { getArticlesByCategory, getFeaturedArticlesByCategory } from "@/lib/api";
import { publicSans } from "@/lib/fonts";
import BlogTechClient from "./tech/blog-tech-client";

export default async function BlogTechSection() {
  let regularPosts: Awaited<ReturnType<typeof getArticlesByCategory>>["articles"] = [];
  let featuredArticles: Awaited<ReturnType<typeof getFeaturedArticlesByCategory>> = [];
  let error = false;

  try {
    const [regularData, featured] = await Promise.all([
      getArticlesByCategory("teknologi", 1, 10),
      getFeaturedArticlesByCategory("teknologi", 2),
    ]);
    regularPosts = regularData.articles.filter((post) => !post.featured);
    featuredArticles = featured;
  } catch (err) {
    error = true;
    console.error("Error fetching articles:", err);
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header — dua kolom di desktop: judul kiri, subjudul kanan */}
        <div className="mb-10 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-10">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900">
            Artikel <span className="text-accent">Teknologi</span>
          </h2>
          <p className={`${publicSans.className} text-base md:text-lg text-neutral-600 md:max-w-sm md:text-right md:pb-1`}>
            Mengupas tips dan fenomena teknologi dari berbagai
            sudut pandang.
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className={`${publicSans.className} text-gray-600 text-lg`}>Gagal memuat artikel saat ini</p>
          </div>
        )}

        {/* Content */}
        {!error && (
          <BlogTechClient regularPosts={regularPosts} featuredArticles={featuredArticles} />
        )}
      </div>
    </section>
  );
}
