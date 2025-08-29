"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full h-96 overflow-hidden">
              <Image
                src="/about-me.jpg"
                alt="Galang Saputra - Penulis dan Pengembang"
                fill
                className="w-full h-[600px] object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 leading-tight">
                Halo, saya{" "}
                <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                  Galang Saputra
                </span>
              </h2>
              <p className="text-xl text-neutral-600 leading-relaxed">
                Seorang penulis dan pengembang yang senang berbagi wawasan
                tentang teknologi, kreativitas, dan kehidupan sehari-hari.
                Berawal dari studi di bidang Ilmu Komunikasi, saya belajar
                bagaimana pesan dapat membentuk cara orang melihat dunia.
                Perjalanan itu berkembang menjadi ketertarikan untuk membangun
                pengalaman digital yang komunikatif, fungsional, dan indah.
              </p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row"
            >
              <Link
                href="https://mgalangs.web.id" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-4 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Hubungi Saya
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}