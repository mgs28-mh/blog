"use client";

import { motion, Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Article, getArticlesByCategory, getFeaturedArticlesByCategory } from "@/lib/api";
import Link from "next/link";
import BlogFeature from "./tech/feature";
import BlogPost from "./tech/post";

export default function BlogTechSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [articles, setArticles] = useState<Article[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        // Get teknologi category articles
        const regularData = await getArticlesByCategory("teknologi", 1, 5);
        const featuredData = await getFeaturedArticlesByCategory("teknologi", 2);
        
        setArticles(regularData.articles);
        setFeaturedArticles(featuredData);
      } catch (err) {
        setError('Failed to load articles');
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const regularPosts = articles.filter((post) => !post.featured);

  // Error state component
  const ErrorState = () => (
    <div className="text-center py-20">
      <p className="text-gray-600 text-lg mb-6">Unable to load articles at the moment</p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-200 font-medium"
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
    <section ref={ref} className="py-20 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header - Always visible */}
          <div className="mb-6 text-center">
            <h2 className="text-3xl md:text-6xl font-bold text-slate-900 mb-2">
              Artikel <span className="text-emerald-600">Teknologi</span>
            </h2>
            <p className="text-xl text-neutral-900 mt-5 mb-10">
              Mengupas tips dan fenomena teknologi dari berbagai
              sudut pandang.
            </p>
          </div>

          {/* Error State */}
          {error && <ErrorState />}

          {/* Loading State - Only for content, not header */}
          {loading && !error && (
            <>
              {/* Featured Post Skeleton */}
              <BlogFeature featuredPosts={[]} cardVariants={cardVariants} />
              {/* Regular Posts Skeleton */}
              <BlogPost regularPosts={[]} cardVariants={cardVariants} />
            </>
          )}

          {/* Actual Content */}
          {!loading && !error && (
            <>
              {/* Featured Post - Two Large Posts */}
              {featuredArticles.length > 0 && (
                <BlogFeature featuredPosts={featuredArticles.slice(0, 2)} cardVariants={cardVariants} />
              )}

              {/* Regular Posts Header */}
              {regularPosts.length > 0 && (
                <motion.div
                  variants={cardVariants}
                  className="mb-8 mt-12"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="text-left">
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                        Artikel Terbaru
                      </h3>
                      <p className="text-lg text-neutral-700">
                        Temukan artikel teknologi terbaru dan terkini
                      </p>
                    </div>

                    {/* View All Posts Button - Desktop Only */}
                    <Link href={`/blog/teknologi`} className="hidden md:block">
                      <motion.button
                        className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-slate-950 hover:text-green-500 transition-all duration-300 cursor-pointer mt-4 md:mt-0"
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
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* Regular Posts - Two Column Layout */}
              <BlogPost regularPosts={regularPosts} cardVariants={cardVariants} />

              {/* View All Posts Button - Mobile Only */}
              <Link href={`/blog/teknologi`}>
                <motion.div
                  variants={cardVariants}
                  className="text-center mt-12 lg:mt-16 md:hidden"
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