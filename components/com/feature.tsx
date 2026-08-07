import { HiOutlineArrowRight } from "react-icons/hi";
import { Article } from "@/lib/api";
import Link from "next/link";

interface BlogFeatureProps {
  featuredPosts: Article[];
}

export default function BlogFeature({ featuredPosts }: BlogFeatureProps) {
  if (featuredPosts.length === 0) {
    return (
      <p className="text-center text-neutral-500 py-12">
        Belum ada artikel di kategori ini.
      </p>
    );
  }

  const FeaturedCard = ({ post }: { post: Article }) => (
    <Link href={`/blog/${post.slug}`} aria-label={`Read full article: ${post.title}`}>
      <article className="group relative h-[350px] lg:h-[400px] overflow-hidden cursor-pointer shadow-xl">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={
              post.image?.url
                ? `${post.image.url.startsWith("//") ? "https:" : ""}${post.image.url}?w=800&fm=webp&q=80`
                : "/fallback.jpg"
            }
            srcSet={
              post.image?.url
                ? `
                  ${post.image.url.startsWith("//") ? "https:" : ""}${post.image.url}?w=400&fm=webp&q=80 400w,
                  ${post.image.url.startsWith("//") ? "https:" : ""}${post.image.url}?w=800&fm=webp&q=80 800w
                `
                : undefined
            }
            sizes="(max-width: 640px) 400px, 800px"
            alt=""
            className="object-cover w-full h-full absolute inset-0 transition-transform duration-500 group-hover:scale-105"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
          <div className="space-y-3">
            {/* Title */}
            <h2 className="text-xl lg:text-2xl font-bold text-white leading-tight line-clamp-2 group-hover:text-white/90 transition-colors duration-200">
              {post.title}
            </h2>

            {/* Read More */}
            <div
              aria-hidden="true"
              className="inline-flex items-center text-white/90 font-medium hover:text-white transition-all duration-200 pt-2 group-hover:translate-x-1"
            >
              <span className="text-sm">Baca Artikel</span>
              <HiOutlineArrowRight className="ml-2 w-4 h-4" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      {featuredPosts.slice(0, 2).map((post) => (
        <FeaturedCard key={post.sys.id} post={post} />
      ))}
    </div>
  );
}
