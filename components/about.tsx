"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen, Coffee, Pen } from "lucide-react";

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const stats: Stat[] = [
  {
    icon: <BookOpen size={20} />,
    value: "150+",
    label: "Articles Written",
  },
  {
    icon: <Coffee size={20} />,
    value: "3",
    label: "Years Writing",
  },
  {
    icon: <Pen size={20} />,
    value: "50k+",
    label: "Words Published",
  },
];

export default function AboutSection() {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="relative">
            <div className="relative w-full h-96 overflow-hidden">
              {/* Replace with your actual image */}
              <Image
                src="/about-me.jpg"
                alt="mgs28-mh - Writer and Developer"
                fill
                className="w-full h-[600px] object-cover"
                priority
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                  Galang Saputra
                </span>
              </h2>
              <p className="text-xl text-neutral-600 leading-relaxed">
                A passionate writer and developer sharing insights about
                technology, creativity, and life.
              </p>
              <p className="text-xl text-neutral-600 leading-relaxed">
                With a degree in Communication Studies, my journey began in
                understanding how messages shape audiences. Over time, that
                curiosity evolved into a passion for building digital
                experiences that communicate clearly and function beautifully.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
