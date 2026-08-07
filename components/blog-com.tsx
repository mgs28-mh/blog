import { getArticlesByCategory, getFeaturedArticlesByCategory } from "@/lib/api";
import { publicSans } from "@/lib/fonts";
import BlogComClient from "./com/blog-com-client";

export default async function BlogComSection() {
  let regularPosts: Awaited<ReturnType<typeof getArticlesByCategory>>["articles"] = [];
  let featuredArticles: Awaited<ReturnType<typeof getFeaturedArticlesByCategory>> = [];
  let error = false;

  try {
    const [regularData, featured] = await Promise.all([
      getArticlesByCategory("komunikasi", 1, 5),
      getFeaturedArticlesByCategory("komunikasi", 2),
    ]);
    regularPosts = regularData.articles.filter((post) => !post.featured);
    featuredArticles = featured;
  } catch (err) {
    error = true;
    console.error("Error fetching articles:", err);
  }

  return (
    <section className="relative bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl md:text-6xl font-bold text-slate-900 mb-2">
            Artikel <span className="text-red-600">Komunikasi</span>
          </h2>
          <p className={`${publicSans.className} text-xl text-neutral-900 mt-5 mb-10`}>
            Mengupas teori, praktik, dan fenomena komunikasi dari berbagai
            sudut pandang.
          </p>
        </div>

        {/* Error State */}
        {error && (
          <p className={`${publicSans.className} text-center text-red-600 text-lg py-12`}>
            Gagal memuat artikel
          </p>
        )}

        {/* Content */}
        {!error && (
          <BlogComClient regularPosts={regularPosts} featuredArticles={featuredArticles} />
        )}
      </div>
    </section>
  );
}
