import Image from "next/image";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi";

export default function CTASection() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/cta.jpg"
          alt="pensil warna"
          fill
          className="object-cover object-top-right"
          sizes="(max-width: 768px) 100vw,
           (max-width: 1200px) 50vw,
           33vw"
          loading="lazy"
        />
      </div>

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-slate-800/30" />

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Kiri - Headline */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight">
              Temukan Artikel dan Informasi{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">
                Terbaru Lainnya
              </span>
            </h2>
          </div>

          {/* Kanan - Tombol CTA */}
          <div className="flex-shrink-0">
            <Link
              href="/blog"
              className="focus-ring-dark inline-flex items-center justify-center px-8 py-4 text-base sm:text-lg font-semibold text-black bg-red-400 hover:bg-red-300 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Jelajahi Sekarang
              <HiOutlineArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
