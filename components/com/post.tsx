"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { HiOutlineArrowRight, HiOutlineUser } from "react-icons/hi";
import { Article } from "@/lib/api";
import Link from "next/link";

interface BlogPostProps {
  regularPosts: Article[];
  cardVariants: Variants;
}

export default function BlogPost({ regularPosts, cardVariants }: BlogPostProps) {
  // Loading skeleton component for regular posts
  const SkeletonRegularCard = () => (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-lg h-64 sm:h-56" />
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
    </div>
  );

  if (regularPosts.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonRegularCard key={i} />
        ))}
      </div>
    );
  }

  return (
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
                  Read More
                  <HiOutlineArrowRight className="ml-1 w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.article>
        </Link>
      ))}
    </div>
  );
}
