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
        {/* Section Header - Always visible */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl md:text-6xl font-bold text-slate-900 mb-2">
            Artikel <span className="text-red-600">Teknologi</span>
          </h2>
          <p className={`${publicSans.className} text-xl text-neutral-900 mt-5 mb-10`}>
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
