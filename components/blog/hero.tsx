"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-[50vh] md:h-[70vh] py-12 flex items-center justify-center overflow-hidden bg-gray-900">
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

      {/* Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-5xl mx-auto"
        >
          <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Blog & Artikel{" "}
            <span className="text-red-500">Terbaru</span>
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
