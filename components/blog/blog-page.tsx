import Image from "next/image";
import { HiOutlineArrowRight, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Article, PaginatedArticles } from "@/lib/api";
import Link from "next/link";
import { publicSans } from "@/lib/fonts";

interface BlogListProps {
  paginatedData: PaginatedArticles;
  category?: string;
}

export default function BlogList({ paginatedData, category }: BlogListProps) {
  const { articles, pagination } = paginatedData;

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div>
          {/* Section Header */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-6xl font-bold text-slate-900 mb-2">
              {category === 'komunikasi'
                ? 'Artikel Komunikasi'
                : category === 'teknologi'
                  ? 'Artikel Teknologi'
                  : 'Artikel & Informasi Terbaru'}
            </h2>
            <p className={`${publicSans.className} text-xl text-neutral-900 mt-5`}>
              {category === 'komunikasi'
                ? 'Mengupas teori, praktik, dan strategi komunikasi dari berbagai sudut pandang.'
                : category === 'teknologi'
                  ? 'Mengupas perkembangan teknologi komunikasi dan informasi terbaru.'
                  : 'Mengupas teori, praktik, dan fenomena komunikasi dari berbagai sudut pandang.'}
            </p>
          </div>

          {/* Articles List */}
          <div className="space-y-5">
            {articles.map((post: Article) => (
                <Link key={post.sys.id} href={`/blog/${post.slug}`}>
                  <article className="group grid grid-cols-1 lg:grid-cols-12 gap-8 py-5 transition-colors duration-200 cursor-pointer">
                    {/* Large Image - Left Side */}
                    <div className="w-full h-full overflow-hidden col-span-5">
                      <Image
                        src={post.image?.url || "/fallback.jpg"}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="object-cover w-full h-full"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        loading="lazy"
                      />
                    </div>

                    {/* Content - Right Side */}
                    <div className="flex flex-col col-span-7 justify-center space-y-4">
                      {/* Date */}
                      <div>
                        <span className={`${publicSans.className} text-sm font-medium text-gray-500 uppercase tracking-wider`}>
                          {new Date(post.date).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl lg:text-3xl font-bold text-gray-900 line-clamp-3 lg:line-clamp-2 group-hover:text-red-500 group-hover:underline group-hover:underline-offset-4 transition-colors duration-200 leading-tight">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className={`${publicSans.className} text-gray-600 text-sm sm:text-base leading-relaxed mb-4 line-clamp-3`}>
                        {post.excerpt}
                      </p>

                      {/* Read More Button */}
                      <div className="pt-4">
                        <div className="inline-flex items-center text-gray-900 font-medium transition-all duration-200 group-hover:translate-x-1">
                          <span className="text-lg">Baca Artikel</span>
                          <HiOutlineArrowRight className="ml-2 w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
          </div>

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between mt-12 lg:mt-16 gap-4">
              {/* Page Info */}
              <div className="text-sm text-gray-600">
                Halaman {pagination.currentPage} dari {pagination.totalPages}
                <span className="hidden sm:inline">
                  {" "}({pagination.totalItems} artikel)
                </span>
              </div>

              {/* Pagination Buttons */}
              <div className="flex items-center space-x-2">
                {/* Previous Button */}
                {pagination.hasPreviousPage && (
                  <Link
                    href={pagination.currentPage === 2
                      ? (category ? `/blog/${category}` : "/blog")
                      : (category ? `/blog/${category}/page/${pagination.currentPage - 1}` : `/blog/page/${pagination.currentPage - 1}`)
                    }
                    rel="prev"
                    aria-label="Halaman sebelumnya"
                    className="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-red-600 bg-white border border-red-600 hover:bg-red-600 hover:text-white"
                  >
                    <HiChevronLeft className="w-4 h-4 mr-1" />
                  </Link>
                )}

                {!pagination.hasPreviousPage && (
                  <button
                    disabled
                    aria-label="Halaman sebelumnya (tidak tersedia)"
                    className="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed"
                  >
                    <HiChevronLeft className="w-4 h-4 mr-1" />
                  </button>
                )}

                {/* Page Numbers */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    let pageNum;
                    if (pagination.totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (pagination.currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (pagination.currentPage >= pagination.totalPages - 2) {
                      pageNum = pagination.totalPages - 4 + i;
                    } else {
                      pageNum = pagination.currentPage - 2 + i;
                    }

                    return (
                      <Link
                        key={pageNum}
                        href={pageNum === 1
                          ? (category ? `/blog/${category}` : "/blog")
                          : (category ? `/blog/${category}/page/${pageNum}` : `/blog/page/${pageNum}`)
                        }
                        aria-label={`Ke halaman ${pageNum}`}
                        className={`w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg transition-all duration-200 ${pageNum === pagination.currentPage
                          ? "bg-red-600 text-white"
                          : "text-gray-600 bg-white border border-gray-200 hover:bg-red-50 hover:text-red-600"
                          }`}
                      >
                        {pageNum}
                      </Link>
                    );
                  })}
                </div>

                {/* Next Button */}
                {pagination.hasNextPage && (
                  <Link
                    href={category
                      ? `/blog/${category}/page/${pagination.currentPage + 1}`
                      : `/blog/page/${pagination.currentPage + 1}`
                    }
                    rel="next"
                    aria-label="Halaman berikutnya"
                    className="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-red-600 bg-white border border-red-600 hover:bg-red-600 hover:text-white"
                  >
                    <HiChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                )}

                {!pagination.hasNextPage && (
                  <button
                    disabled
                    aria-label="Halaman berikutnya (tidak tersedia)"
                    className="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed"
                  >
                    <HiChevronRight className="w-4 h-4 ml-1" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
