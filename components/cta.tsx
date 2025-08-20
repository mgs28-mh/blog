'use client';

import { motion, Variants } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { HiOutlineArrowRight } from 'react-icons/hi';

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
      y: 20 
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
    <section ref={ref} className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/cta-image.jpg" // Replace with your background image
          alt="Travel adventure background"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </div>

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16"
        >
          {/* Left Side - Headline */}
          <motion.div variants={itemVariants} className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              Dapatkan Artikel dan Informasi{' '}
              <span className="text-transparent bg-clip-text bg-emerald-500">
                Terbaru Lainya
              </span>
            </h2>
          </motion.div>

          {/* Right Side - CTA Button */}
          <motion.div variants={itemVariants} className="flex-shrink-0">
            <motion.button
              className="inline-flex items-center justify-center px-8 py-4 text-base sm:text-lg font-semibold text-black bg-emerald-400 hover:bg-emerald-300 rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 shadow-xl hover:shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Get Started
              <motion.div
                className="ml-2"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <HiOutlineArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          className="w-full h-12 text-white/10" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}