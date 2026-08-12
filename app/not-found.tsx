"use client";

import { Home, Search, ArrowLeft, FileQuestion } from "lucide-react";
import Link from "next/link";
import { publicSans } from "@/lib/fonts";
import GridPatternBg from "@/components/ui/grid-pattern-bg";
import { buttonClasses } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="fixed inset-0 z-[100] min-h-screen flex flex-col items-center justify-center bg-gray-900 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <GridPatternBg opacityClassName="opacity-5" />

        {/* Decorative lines */}
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-slate-700/50 to-transparent" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-slate-700/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-brand/10 border border-brand/20">
            <FileQuestion className="w-12 h-12 text-brand-on-dark" />
          </div>
        </div>

        {/* 404 Text */}
        <div className="mb-6">
          <h1 className="text-7xl md:text-9xl font-black text-white mb-2">
            4<span className="text-brand-on-dark">0</span>4
          </h1>
        </div>

        {/* Main Headline */}
        <div className="mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Halaman Tidak Ditemukan
          </h2>
        </div>

        {/* Subtitle */}
        <div className="mb-10">
          <p className={`${publicSans.className} text-md md:text-lg text-gray-400 leading-relaxed max-w-xl mx-auto`}>
            Maaf, halaman atau artikel yang Anda cari tidak tersedia. Mungkin
            sudah dihapus, dipindahkan, atau URL yang dimasukkan salah.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className={`${buttonClasses({ variant: "primary", size: "md", dark: true })} shadow-lg shadow-brand/25 hover:shadow-brand/40`}
          >
            <Home className="w-5 h-5" />
            Kembali ke Beranda
          </Link>

          <Link
            href="/blog"
            className="focus-ring-dark group relative inline-flex justify-center items-center text-center gap-2
                       bg-transparent border border-gray-600 hover:border-gray-500
                       text-gray-300 hover:text-white font-semibold
                       px-6 py-3 rounded-lg transition-all duration-300"
          >
            <Search className="w-5 h-5" />
            Jelajahi Artikel
          </Link>
        </div>

        {/* Back link */}
        <div className="mt-10">
          <button
            onClick={() => window.history.back()}
            className="focus-ring-dark inline-flex items-center gap-2 text-gray-500 hover:text-gray-300
                       text-sm transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke halaman sebelumnya
          </button>
        </div>
      </div>
    </section>
  );
}
