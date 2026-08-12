import { ArrowRight } from "lucide-react";
import { Article } from "@/lib/api";
import Link from "next/link";
import BlogFeature from "./feature";
import BlogPost from "./post";
import { publicSans } from "@/lib/fonts";
import { buttonClasses } from "@/components/ui/button";

interface BlogComClientProps {
  regularPosts: Article[];
  featuredArticles: Article[];
}

export default function BlogComClient({ regularPosts, featuredArticles }: BlogComClientProps) {
  return (
    <div>
      {/* Featured Posts */}
      <BlogFeature featuredPosts={featuredArticles} />

      {/* Regular Posts Header */}
      {regularPosts.length > 0 && (
        <div className="mb-8 mt-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Artikel Terbaru
              </h3>
              <p className={`${publicSans.className} text-lg text-neutral-700`}>
                Temukan artikel komunikasi terbaru dan terkini
              </p>
            </div>

            {/* View All Posts Button - Desktop Only */}
            <Link
              href={`/blog/komunikasi`}
              className="focus-ring hidden md:inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-slate-950 hover:text-brand transition-all duration-300 cursor-pointer mt-4 md:mt-0 group"
            >
              Lihat Semua
              <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">
                <ArrowRight className="w-5 h-5" />
              </span>
            </Link>
          </div>
        </div>
      )}

      {/* Regular Posts */}
      <BlogPost regularPosts={regularPosts} />

      {/* Tombol Lihat Semua - Mobile */}
      <div className="text-center mt-12 lg:mt-16 md:hidden">
        <Link
          href={`/blog/komunikasi`}
          className={`${buttonClasses({ variant: "outline", size: "md" })} group bg-white text-base sm:text-lg cursor-pointer`}
        >
          Lihat Semua
          <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">
            <ArrowRight className="w-5 h-5" />
          </span>
        </Link>
      </div>
    </div>
  );
}
