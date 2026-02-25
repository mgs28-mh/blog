"use client";

import { motion, Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/cta.jpg"
          alt="pensil warna"
          fill
          className="object-cover object-top-right"
          sizes="(max-width: 768px) 100vw, 
           (max-width: 1200px) 50vw, 
           33vw"
          loading="lazy"
        />
      </div>

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-slate-800/30" />

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16"
        >
          {/* Kiri - Headline */}
          <motion.div
            variants={itemVariants}
            className="flex-1 text-center lg:text-left"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight">
              Temukan Artikel dan Informasi{" "}
              <span className="text-transparent bg-clip-text bg-red-500">
                Terbaru Lainnya
              </span>
            </h2>
          </motion.div>

          {/* Kanan - Tombol CTA */}
          <motion.div variants={itemVariants} className="flex-shrink-0">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center px-8 py-4 text-base sm:text-lg font-semibold text-black bg-red-400 hover:bg-red-300 rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 shadow-xl hover:shadow-2xl"
            >
              Jelajahi Sekarang
              <HiOutlineArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
