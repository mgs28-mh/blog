"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative py-20 md:py-28 bg-gray-900 overflow-hidden">
      {/* Grid pattern background - subtle and transparent */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.07]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px),
                               linear-gradient(to bottom, #fff 1px, transparent 1px)`,
              backgroundSize: "4rem 4rem",
            }}
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-1">
        {/* Blog Label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <span className="bg-red-600 text-gray-100 font-bold text-sm md:text-lg tracking-[0.2em] uppercase px-4 py-1">
            KATA KOMUNIKA
          </span>
        </motion.div>

        {/* Main Headline - Center aligned with highlighted keywords */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold leading-[1.2] text-white text-center"
        >
          Ide dan wawasan seputar{" "}
          <span className="text-red-500">komunikasi, teknologi, digital,</span>{" "}
          platform, dan masih banyak lagi.
        </motion.h1>
      </div>
    </section>
  );
}