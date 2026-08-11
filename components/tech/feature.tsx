import Image from "next/image";
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

  const FeaturedCard = ({ post, index }: { post: Article; index: number }) => (
    <Link href={`/blog/${post.slug}`} aria-label={`Read full article: ${post.title}`}>
      <article className="group relative h-[300px] lg:h-[400px] overflow-hidden cursor-pointer">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={post.image?.url || "/fallback.jpg"}
            alt="" // dekoratif karena judul sudah ada
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
            <span className="text-xs font-medium text-blue-300 uppercase tracking-wider">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>

            {/* Title (jadi teks link utama) */}
            <h2 className="text-xl lg:text-2xl font-bold text-white leading-tight line-clamp-2 group-hover:text-white/90 transition-colors duration-200">
              {post.title}
            </h2>

            {/* Read More (visually helpful, hidden for screen readers) */}
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
      {featuredPosts.slice(0, 2).map((post, index) => (
        <FeaturedCard key={post.sys.id} post={post} index={index} />
      ))}
    </div>
  );
}
