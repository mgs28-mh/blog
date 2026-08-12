import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Article } from "@/lib/api";
import Link from "next/link";

import { publicSans } from "@/lib/fonts";

interface BlogPostProps {
  regularPosts: Article[];
}

export default function BlogPost({ regularPosts }: BlogPostProps) {
  if (regularPosts.length === 0) {
    return (
      <p className={`${publicSans.className} text-center text-neutral-500 py-12`}>
        Belum ada artikel di kategori ini.
      </p>
    );
  }

  const PostCard = ({ post }: { post: Article }) => (
    <Link href={`/blog/${post.slug}`}>
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
          {/* Category/Date */}
          <div>
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              {new Date(post.date).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl lg:text-3xl font-bold text-gray-900 line-clamp-3 lg:line-clamp-2 group-hover:text-accent group-hover:underline group-hover:underline-offset-4 transition-colors duration-200 leading-tight">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className={`${publicSans.className} text-md lg:text-lg text-gray-600 line-clamp-4 leading-relaxed`}>
            {post.excerpt}
          </p>

          {/* Read Article Button */}
          <div className="pt-4">
            <div className="inline-flex items-center text-gray-900 font-medium transition-all duration-200 group-hover:translate-x-1">
              <span className="text-lg">Baca Artikel</span>
              <ArrowRight className="ml-2 w-5 h-5" />
            </div>
          </div>
        </div>
      </article>
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
