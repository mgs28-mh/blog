"use client";

import { motion, Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HiOutlineArrowRight, HiOutlineUser } from "react-icons/hi";
import { Article, getAllArticles } from "@/lib/api";
import Link from "next/link";

export default function BlogSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getAllArticles(10);
      setArticles(data);
    };
    fetchArticles();
  }, []);

  const featuredPosts = articles.filter((post) => post.featured);
  const regularPosts = articles.filter((post) => !post.featured);

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
            <p className="text-neutral-900 mt-1">
              Mengupas teori, praktik, dan fenomena komunikasi dari berbagai
              sudut pandang.
            </p>
            <div className="border-b border-neutral-700 mt-4"></div>
          </div>

          {/* Featured Posts - First Row with Background Overlay */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
            {featuredPosts.map((post) => (
              <Link key={post.sys.id} href={`/${post.slug}`}>
                <motion.article
                  variants={cardVariants}
                  className="group relative h-80 sm:h-96 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={post.image?.url || "fallback,jpg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
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

                    {/* Excerpt */}
                    <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

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
              <Link key={post.sys.id} href={`/${post.slug}`}>
                <motion.article
                  variants={cardVariants}
                  className="group bg-white overflow-hidden transition-all duration-300"
                >
                  {/* Blog Image */}
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <div className="relative w-full h-full">
                      <Image
                        src={post.image?.url || "fallback,jpg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
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
          <motion.div
            variants={cardVariants}
            className="text-center mt-12 lg:mt-16"
          >
            <motion.button
              className="inline-flex items-center justify-center px-6 py-3 text-base sm:text-lg font-semibold text-emerald-600 bg-white border-2 border-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/50"
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
        </motion.div>
      </div>
    </section>
  );
}
