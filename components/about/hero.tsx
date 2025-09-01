"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[60vh] md:h-[70vh] py-12 flex items-center justify-center overflow-hidde">
      {/* Background Image */}
      <Image
        src="/about-me.jpg"
        alt="Market Research Team Working"
        fill
        className="object-cover"
        priority
        quality={100}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-800/60 to-slate-700/50 z-10" />
      
      {/* Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-5xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Tentang{" "}
            <span className="text-emerald-400">Saya</span>
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
