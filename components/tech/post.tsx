"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Article } from "@/lib/api";
import Link from "next/link";

interface BlogPostProps {
  regularPosts: Article[];
  cardVariants: Variants;
}

export default function BlogPost({ regularPosts, cardVariants }: BlogPostProps) {
  // Loading skeleton component for regular posts
  const SkeletonRegularCard = () => (
    <div className="animate-pulse grid grid-cols-1 lg:grid-cols-3 gap-8 py-5">
      <div className="w-full h-64 lg:h-72 bg-gray-200 rounded" />
      <div className="flex flex-col col-span-2 justify-center space-y-4">
        <div className="h-4 bg-gray-200 rounded mb-3 w-24" />
        <div className="h-6 bg-gray-200 rounded mb-4 w-3/4" />
        <div className="h-5 bg-gray-200 rounded w-full mb-2" />
        <div className="h-5 bg-gray-200 rounded w-2/3 mb-4" />
        <div className="pt-4">
          <div className="h-6 bg-gray-200 rounded w-32" />
        </div>
      </div>
    </div>
  );

  if (regularPosts.length === 0) {
    return (
      <div className="space-y-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonRegularCard key={i} />
        ))}
      </div>
    );
  }

  const PostCard = ({ post }: { post: Article }) => (
    <Link href={`/blog/${post.slug}`}>
      <motion.article
        variants={cardVariants}
        className="group grid grid-cols-1 lg:grid-cols-12 gap-8 py-5 transition-colors duration-200 cursor-pointer"
      >
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
          {/* Category/Date */}
          <div>
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl lg:text-3xl font-bold text-gray-900 line-clamp-3 lg:line-clamp-2 group-hover:text-red-500 group-hover:underline group-hover:underline-offset-4 transition-colors duration-200 leading-tight">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-md lg:text-lg text-gray-600 line-clamp-4 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author 
          <div className="text-base text-gray-500 font-medium">
            By {post.author}
          </div>*/}

          {/* Read Article Button */}
          <div className="pt-4">
            <motion.button
              className="inline-flex items-center text-gray-900 font-medium hover:text-gray-700 transition-colors duration-200 cursor-pointer"
              whileHover={{ x: 4 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              <span className="text-lg">Read Article</span>
              <HiOutlineArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.article>
    </Link>
  );

  return (
    <div className="space-y-5">
      {regularPosts.map((post) => (
        <PostCard key={post.sys.id} post={post} />
      ))}
    </div>
  );
}