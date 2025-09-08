"use client";

import { motion, Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HiOutlineArrowRight, HiOutlineUser, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Article, getArticlesPaginated, PaginatedArticles } from "@/lib/api";
import Link from "next/link";

interface BlogListProps {
  currentPage: number;
}

export default function BlogList({ currentPage }: BlogListProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [paginatedData, setPaginatedData] = useState<PaginatedArticles>({
    articles: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      hasNextPage: false,
      hasPreviousPage: false,
      itemsPerPage: 6,
    },
  });
  const [loading, setLoading] = useState(false);

  const fetchArticles = async (page: number) => {
    setLoading(true);
    try {
      const data = await getArticlesPaginated(page, 6);
      setPaginatedData(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  const { articles, pagination } = paginatedData;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <div className="mb-6 text-center">
            <h2 className="text-3xl md:text-6xl font-bold text-slate-900 mb-2">
              Artikel & Informasi Terbaru
            </h2>
            <p className="text-xl text-neutral-900 mt-5">
              Mengupas teori, praktik, dan fenomena komunikasi dari berbagai
              sudut pandang.
            </p>
            <div className="flex items-center justify-between mt-4">
              <div className="border-b-2 border-neutral-700 flex-1"></div>
              <div className="px-4 text-sm text-gray-500">
                {pagination.totalItems} artikel tersedia
              </div>
              <div className="border-b-2 border-neutral-700 flex-1"></div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 h-48 sm:h-56 rounded-lg mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-6 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Articles Grid */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {articles.map((post: Article) => (
                <Link key={post.sys.id} href={`/blog/${post.slug}`}>
                  <motion.article
                    variants={cardVariants}
                    className="group bg-white overflow-hidden transition-all duration-300"
                  >
                    {/* Blog Image */}
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <div className="relative w-full h-full">
                        <Image
                          src={post.image?.url || "/placeholder-image.jpg"}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      {/* Meta Information */}
                      <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                        <div className="flex items-center space-x-1">
                          <p className="text-sm text-slate-500 mb-3">
                            {new Date(post.date).toLocaleDateString("id-ID", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>

                      {/* Title */}
                      <h3
                        className="text-lg sm:text-xl font-bold text-gray-900 mb-3 
               group-hover:text-emerald-600 group-hover:underline 
               group-hover:underline-offset-2 transition-colors duration-300 
               line-clamp-3"
                      >
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Author and Read More */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                          <HiOutlineUser className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {post.author}
                          </span>
                        </div>

                        <motion.button
                          className="inline-flex items-center text-emerald-600 font-medium text-sm hover:text-emerald-700 transition-colors duration-200"
                          whileHover={{ x: 4 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                        >
                          Baca Selengkapnya
                          <HiOutlineArrowRight className="ml-1 w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {!loading && pagination.totalPages > 1 && (
            <motion.div
              variants={cardVariants}
              className="flex flex-col sm:flex-row items-center justify-between mt-12 lg:mt-16 gap-4"
            >
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
                    href={pagination.currentPage === 2 ? "/blog" : `/blog/page/${pagination.currentPage - 1}`}
                    rel="prev"
                    className="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-emerald-600 bg-white border border-emerald-600 hover:bg-emerald-600 hover:text-white"
                  >
                    <HiChevronLeft className="w-4 h-4 mr-1" />
                  </Link>
                )}

                {!pagination.hasPreviousPage && (
                  <button
                    disabled
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
                        href={pageNum === 1 ? "/blog" : `/blog/page/${pageNum}`}
                        className={`w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg transition-all duration-200 ${
                          pageNum === pagination.currentPage
                            ? "bg-emerald-600 text-white"
                            : "text-gray-600 bg-white border border-gray-200 hover:bg-emerald-50 hover:text-emerald-600"
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
                    href={`/blog/page/${pagination.currentPage + 1}`}
                    rel="next"
                    className="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-emerald-600 bg-white border border-emerald-600 hover:bg-emerald-600 hover:text-white"
                  >
                    <HiChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                )}

                {!pagination.hasNextPage && (
                  <button
                    disabled
                    className="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed"
                  >
                    <HiChevronRight className="w-4 h-4 ml-1" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
