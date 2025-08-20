"use client";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Users, Lightbulb } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Cerita yang
          </span>
          <br/>
          <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
            Menginspirasi
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-gray-600 leading-relaxed"
        >
          Temukan wawasan mendalam tentang komunikasi digital, tren teknologi, dan pengembangan profesional melalui cerita menarik dan perspektif ahli.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Jelajahi Artikel
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-900 font-semibold px-8 py-4 rounded-full border-2 border-gray-200 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all duration-300"
          >
            Tentang Kami
          </Link>
        </motion.div>
      </div>
    </section>
  );
}