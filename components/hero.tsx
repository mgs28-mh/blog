"use client";
import { motion } from "framer-motion";
import { ArrowRight, Code, FileText } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative py-15 lg:py-20 flex flex-col items-center justify-center bg-gray-900 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px),
                             linear-gradient(to bottom, #fff 1px, transparent 1px)`,
            backgroundSize: '4rem 4rem'
          }} />
        </div>
        
        {/* Decorative lines */}
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-slate-700/50 to-transparent" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-slate-700/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Main Headline */}
        <div className="mb-6">
          <motion.h1
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-black mb-4 leading-snug text-white"
          >
            <span className="block">Mengeksplorasi Teknologi &</span>
            <span className="block text-red-500">Komunikasi</span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="max-w-3xl mx-auto mb-12"
        >
          <p className="text-md md:text-lg text-gray-300 leading-normal mb-4">
            Berbagi wawasan seputar teknologi, komunikasi digital, dan perkembangan industri terbaru.
          </p>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link
            href="/blog"
            className="group relative inline-flex justify-center items-center text-center gap-3 
               bg-red-600 hover:bg-red-500 text-white font-bold 
               px-10 py-5 min-h-[44px] min-w-[44px] 
               rounded-2xl shadow-2xl hover:shadow-red-500/25 
               transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
          >
            <FileText aria-hidden="true" className="relative z-10 w-5 h-5" />
            <span className="relative z-10">Eksplorasi Artikel</span>
            <ArrowRight
              aria-hidden="true"
              className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform"
            />
          </Link>

          <Link
            href="/about"
            className="group inline-flex justify-center items-center text-center gap-3 
               bg-gray-800 backdrop-blur-sm hover:bg-gray-700 text-white font-bold 
               px-10 py-5 min-h-[44px] min-w-[44px] 
               rounded-2xl border-2 border-gray-700 hover:border-gray-600 
               shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <Code aria-hidden="true" className="relative z-10 w-5 h-5" />
            <span>Profil Penulis</span>
            <ArrowRight
              aria-hidden="true"
              className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}