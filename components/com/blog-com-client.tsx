import { HiOutlineArrowRight } from "react-icons/hi";
import { Article } from "@/lib/api";
import Link from "next/link";
import BlogFeature from "./feature";
import BlogPost from "./post";
import { publicSans } from "@/lib/fonts";

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
              className="hidden md:inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-slate-950 hover:text-red-500 transition-all duration-300 cursor-pointer mt-4 md:mt-0 group"
            >
              Lihat Semua
              <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">
                <HiOutlineArrowRight className="w-5 h-5" />
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
          className="group inline-flex items-center justify-center px-6 py-3 text-base sm:text-lg font-semibold text-red-600 bg-white border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-500/50 cursor-pointer"
        >
          Lihat Semua
          <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">
            <HiOutlineArrowRight className="w-5 h-5" />
          </span>
        </Link>
      </div>
    </div>
  );
}
