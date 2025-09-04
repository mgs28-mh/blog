"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { HiOutlineArrowRight, HiOutlineUser, HiOutlineTag } from "react-icons/hi";
import { Article } from "@/lib/api";
import Link from "next/link";

interface BlogFeatureProps {
  featuredPosts: Article[];
  cardVariants: Variants;
}

export default function BlogFeature({ featuredPosts, cardVariants }: BlogFeatureProps) {
  // Loading skeleton component for featured posts
  const SkeletonFeaturedCard = () => (
    <div className="animate-pulse relative h-90 sm:h-96 rounded-lg overflow-hidden">
      <div className="bg-gray-200 rounded-lg h-full w-full" />
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <div className="h-4 bg-gray-300 rounded mb-3 w-1/3" />
        <div className="h-6 bg-gray-300 rounded mb-3" />
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-3" />
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-300 rounded w-1/4" />
          <div className="h-4 bg-gray-300 rounded w-1/5" />
        </div>
      </div>
    </div>
  );

  if (featuredPosts.length === 0) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
        <SkeletonFeaturedCard />
        <SkeletonFeaturedCard />
      </div>
    );
  }

  return (
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
  );
}
