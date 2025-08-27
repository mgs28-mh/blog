"use client";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, Globe, Star } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-emerald-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 right-20 w-64 h-64 bg-emerald-200 rounded-full opacity-30 blur-xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-emerald-300 rounded-full opacity-25 blur-2xl"
        />

        {/* Floating Icons */}
        <motion.div
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 5, 0, -5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-32 left-1/4 text-emerald-300"
        >
          <Sparkles size={24} />
        </motion.div>
        <motion.div
          animate={{
            y: [10, -10, 10],
            rotate: [0, -5, 0, 5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-40 right-1/4 text-emerald-400"
        >
          <Star size={20} />
        </motion.div>
        <motion.div
          animate={{
            y: [-5, 15, -5],
            x: [-5, 5, -5]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 right-20 text-emerald-300"
        >
          <Globe size={28} />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Main Headline with Staggered Animation */}
        <div className="mb-6">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black mb-4 leading-tight"
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
              className="block text-emerald-600"
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
          <p className="text-lg text-gray-600">
            Disajikan dengan analisis yang terarah, ringkas, dan mudah dipahami.
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
            className="group relative inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-10 py-5 rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
          >
            <div className="absolute inset-0 bg-emerald-400 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <span className="relative z-10">Mulai Eksplorasi</span>
            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
          <Link
            href="/about"
            className="group inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 font-bold px-10 py-5 rounded-2xl border-2 border-emerald-200 hover:border-emerald-400 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <Sparkles className="w-5 h-5 text-emerald-600 group-hover:rotate-12 transition-transform" />
            <span>Tentang Saya</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}