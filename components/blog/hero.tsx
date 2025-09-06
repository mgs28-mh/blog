"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[50vh] md:h-[70vh] py-12 flex items-center justify-center overflow-hidde bg-lime-100">
      {/* Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-5xl mx-auto"
        >
          <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-950 leading-tight">
            Blog & Artikel{" "}
            <span className="text-green-600">Terbaru</span>
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
