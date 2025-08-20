"use client";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-24 px-6 bg-slate-50 text-gray-900">
      {/* Icon animasi */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-6"
      >
        <BookOpen className="w-14 h-14 text-emerald-600" />
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold mb-4"
      >
        Cerita & Insight tentang Komunikasi Digital
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-lg md:text-xl max-w-2xl mb-8 text-gray-600"
      >
        Membahas tren, teori, dan praktik komunikasi klasik hingga digital dengan gaya santai tapi tetap informatif.
      </motion.p>

      {/* CTA Button */}
      <motion.a
        href="#artikel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-2xl shadow-lg hover:bg-emerald-700 transition"
      >
        Baca Artikel Terbaru
      </motion.a>
    </section>
  );
}