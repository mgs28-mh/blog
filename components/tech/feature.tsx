"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Article } from "@/lib/api";
import Link from "next/link";

interface BlogFeatureProps {
  featuredPosts: Article[];
  cardVariants: Variants;
}

export default function BlogFeature({ featuredPosts, cardVariants }: BlogFeatureProps) {
  // Loading skeleton component for featured posts
  const SkeletonFeaturedCard = () => (
    <div className="animate-pulse relative h-[400px] rounded overflow-hidden">
      <div className="bg-gray-200 h-full w-full" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="h-3 bg-gray-300 rounded mb-3 w-24" />
        <div className="h-6 bg-gray-300 rounded mb-3 w-3/4" />
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4" />
        <div className="h-3 bg-gray-300 rounded w-20" />
      </div>
    </div>
  );

  if (featuredPosts.length === 0) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
        {Array.from({ length: 2 }).map((_, i) => (
          <SkeletonFeaturedCard key={i} />
        ))}
      </div>
    );
  }

  const FeaturedCard = ({ post, index }: { post: Article; index: number }) => (
    <Link href={`/blog/${post.slug}`}>
      <motion.article
        variants={cardVariants}
        className="group relative h-[400px] lg:h-[450px] overflow-hidden cursor-pointer"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={post.image?.url || "/fallback.jpg"}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={index === 0}
          />
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
          <div className="space-y-3">
            {/* Meta Information */}
            <div>
              <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-xl lg:text-2xl font-bold text-white leading-tight line-clamp-2 group-hover:text-white/90 transition-colors duration-200">
              {post.title}
            </h2>

            {/* Author 
            <div className="text-xs text-white/70 font-medium">
              By {post.author}
            </div>*/}

            {/* Read More */}
            <motion.div
              className="inline-flex items-center text-white/90 font-medium hover:text-white transition-colors duration-200 pt-2"
              whileHover={{ x: 4 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              <span className="text-sm">Read Article</span>
              <HiOutlineArrowRight className="ml-2 w-4 h-4" />
            </motion.div>
          </div>
        </div>
      </motion.article>
    </Link>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
      {featuredPosts.slice(0, 2).map((post, index) => (
        <FeaturedCard key={post.sys.id} post={post} index={index} />
      ))}
    </div>
  );
}