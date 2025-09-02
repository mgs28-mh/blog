"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative py-25 sm:py-20 flex flex-col items-center justify-center bg-teal-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Main Headline with Staggered Animation */}
        <div className="mb-6">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-6xl font-black mb-4 leading-tight"
          >
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="block text-gray-900"
            >
              Memahami Komunikasi Digital
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="block text-teal-600"
            >
              di Era Teknologi Informasi
            </motion.span>
          </motion.h1>
        </div>

        {/* Enhanced Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-4">
            Kumpulan tulisan yang membahas dinamika komunikasi digital, perkembangan teknologi informasi, serta dampaknya terhadap masyarakat modern.
          </p>
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link
            href="/blog"
            className="group relative inline-flex justify-center items-center text-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-10 py-5 rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
          >
            <div className="absolute inset-0 bg-emerald-600 rounded-2xl transition-opacity"></div>
            <span className="relative z-10">Mulai Eksplorasi</span>
            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
          <Link
            href="/about"
            className="group inline-flex justify-center items-center text-center gap-3 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 font-bold px-10 py-5 rounded-2xl border-2 border-emerald-200 hover:border-emerald-400 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <span>Tentang Saya</span>
            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}