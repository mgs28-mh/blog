"use client";

import { motion, Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HiOutlineArrowRight, HiOutlineUser } from "react-icons/hi";
import { Article, getArticlesPreview } from "@/lib/api";
import Link from "next/link";

export default function BlogSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getArticlesPreview(5);
        setArticles(data);
      } catch (err) {
        setError('Failed to load articles');
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const featuredPosts = articles.filter((post) => post.featured);
  const regularPosts = articles.filter((post) => !post.featured);

  // Loading skeleton component
  const SkeletonCard = ({ featured = false }: { featured?: boolean }) => (
    <div className={`animate-pulse ${featured ? 'h-90 sm:h-96' : ''}`}>
      <div className={`bg-gray-200 rounded-lg ${featured ? 'h-full' : 'h-64 sm:h-56'}`} />
      {!featured && (
        <div className="p-6">
          <div className="h-4 bg-gray-200 rounded mb-3" />
          <div className="h-6 bg-gray-200 rounded mb-3" />
          <div className="h-4 bg-gray-200 rounded mb-2" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="flex justify-between items-center pt-4">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
          </div>
        </div>
      )}
      {featured && (
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="h-4 bg-gray-300 rounded mb-3 w-1/3" />
          <div className="h-6 bg-gray-300 rounded mb-3" />
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-3" />
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-300 rounded w-1/4" />
            <div className="h-4 bg-gray-300 rounded w-1/5" />
          </div>
        </div>
      )}
    </div>
  );

  // Error state component
  const ErrorState = () => (
    <div className="text-center py-12">
      <p className="text-red-600 text-lg mb-4">Failed to load articles</p>
      <button 
        onClick={() => window.location.reload()} 
        className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );

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
            <p className="text-xl text-neutral-900 mt-5 mb-10">
              Mengupas teori, praktik, dan fenomena komunikasi dari berbagai
              sudut pandang.
            </p>
          </div>

          {/* Error State */}
          {error && <ErrorState />}

          {/* Loading State */}
          {loading && !error && (
            <>
              {/* Featured Posts Skeleton */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
                <SkeletonCard featured />
                <SkeletonCard featured />
              </div>
              {/* Regular Posts Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {Array.from({ length: 3 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </>
          )}

          {/* Actual Content */}
          {!loading && !error && (
            <>
              {/* Featured Posts - First Row with Background Overlay */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
                {featuredPosts.map((post) => (
                  <Link key={post.sys.id} href={`/blog/${post.slug}`}>
                    <motion.article
                      variants={cardVariants}
                      className="group relative h-90 sm:h-96 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                    >
                      {/* Background Image */}
                      <div className="absolute inset-0">
                        <Image
                          src={post.image?.url || "/fallback.jpg"}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={true}
                        />
                      </div>

                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        {/* Meta Information */}
                        <div className="flex items-center text-sm text-white mb-3 space-x-4">
                          <div className="flex items-center space-x-1">
                            <p className="text-sm text-white mb-3">
                              {new Date(post.date).toLocaleDateString("id-ID", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 line-clamp-2">
                          {post.title}
                        </h3>

                        {/* Author and Read More */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <HiOutlineUser className="w-4 h-4 text-white/70" />
                            <span className="text-sm text-white/80">
                              {post.author}
                            </span>
                          </div>

                          <motion.button
                            className="inline-flex items-center text-white font-medium text-sm hover:text-yellow-300 transition-colors duration-200"
                            whileHover={{ x: 4 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                            }}
                          >
                            Read More
                            <HiOutlineArrowRight className="ml-1 w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                ))}
              </div>

              {/* Regular Posts Grid - Same Style as Original */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {regularPosts.map((post) => (
                  <Link key={post.sys.id} href={`/blog/${post.slug}`}>
                    <motion.article
                      variants={cardVariants}
                      className="group bg-white overflow-hidden transition-all duration-300"
                    >
                      {/* Blog Image */}
                      <div className="relative h-64 sm:h-56 overflow-hidden">
                        <div className="relative w-full h-full">
                          <Image
                            src={post.image?.url || "/fallback.jpg"}
                            alt={post.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            loading="lazy"
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
                 line-clamp-2"
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
                            Read More
                            <HiOutlineArrowRight className="ml-1 w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                ))}
              </div>

              {/* View All Posts Button */}
              <Link href={`/blog`}>
                <motion.div
                  variants={cardVariants}
                  className="text-center mt-12 lg:mt-16"
                >
                  <motion.button
                    className="inline-flex items-center justify-center px-6 py-3 text-base sm:text-lg font-semibold text-emerald-600 bg-white border-2 border-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    View All Posts
                    <motion.div
                      className="ml-2"
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <HiOutlineArrowRight className="w-5 h-5" />
                    </motion.div>
                  </motion.button>
                </motion.div>
              </Link>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
