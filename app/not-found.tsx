"use client";

import { motion } from "framer-motion";
import { Home, Search, ArrowLeft, FileQuestion } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center bg-gray-900 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px),
                               linear-gradient(to bottom, #fff 1px, transparent 1px)`,
              backgroundSize: "4rem 4rem",
            }}
          />
        </div>

        {/* Decorative lines */}
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-slate-700/50 to-transparent" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-slate-700/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-500/10 border border-red-500/20">
            <FileQuestion className="w-12 h-12 text-red-500" />
          </div>
        </motion.div>

        {/* 404 Text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mb-6"
        >
          <h1 className="text-7xl md:text-9xl font-black text-white mb-2">
            4<span className="text-red-500">0</span>4
          </h1>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mb-4"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Halaman Tidak Ditemukan
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mb-10"
        >
          <p className="text-md md:text-lg text-gray-400 leading-relaxed max-w-xl mx-auto">
            Maaf, halaman atau artikel yang Anda cari tidak tersedia. Mungkin
            sudah dihapus, dipindahkan, atau URL yang dimasukkan salah.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/"
            className="group relative inline-flex justify-center items-center text-center gap-2 
                       bg-red-500 hover:bg-red-600 text-white font-semibold 
                       px-6 py-3 rounded-lg transition-all duration-300 
                       shadow-lg shadow-red-500/25 hover:shadow-red-500/40"
          >
            <Home className="w-5 h-5" />
            Kembali ke Beranda
          </Link>

          <Link
            href="/blog"
            className="group relative inline-flex justify-center items-center text-center gap-2 
                       bg-transparent border border-gray-600 hover:border-gray-500 
                       text-gray-300 hover:text-white font-semibold 
                       px-6 py-3 rounded-lg transition-all duration-300"
          >
            <Search className="w-5 h-5" />
            Jelajahi Artikel
          </Link>
        </motion.div>

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="mt-10"
        >
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-300 
                       text-sm transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke halaman sebelumnya
          </button>
        </motion.div>
      </div>
    </section>
  );
}
