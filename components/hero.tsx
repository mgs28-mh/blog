"use client";
import { motion } from "framer-motion";
import { ArrowRight, Code, FileText } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative py-15 lg:py-20 flex flex-col items-center justify-center bg-lime-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Main Headline */}
        <div className="mb-6">
          <motion.h1
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-black mb-4 leading-snug text-gray-900"
          >
            <span className="block">Mengeksplorasi Teknologi &</span>
            <span className="block text-green-700">Komunikasi</span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="max-w-3xl mx-auto mb-12"
        >
          <p className="text-md md:text-lg text-gray-700 leading-normal mb-4">
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
            className="group relative inline-flex justify-center items-center text-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold px-10 py-5 rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
          >
            <FileText className="relative z-10 w-5 h-5" />
            <span className="relative z-10">Eksplorasi Artikel</span>
            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
          <Link
            href="/about"
            className="group inline-flex justify-center items-center text-center gap-3 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 font-bold px-10 py-5 rounded-2xl border-2 border-green-200 hover:border-emerald-400 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <Code className="relative z-10 w-5 h-5" />
            <span>Profil Penulis</span>
            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}