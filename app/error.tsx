"use client";

import { useEffect } from "react";
import { Home, RotateCw, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { publicSans } from "@/lib/fonts";
import GridPatternBg from "@/components/ui/grid-pattern-bg";
import { buttonClasses } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="fixed inset-0 z-[100] min-h-screen flex flex-col items-center justify-center bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <GridPatternBg opacityClassName="opacity-5" />
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-slate-700/50 to-transparent" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-slate-700/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto px-6 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-brand/10 border border-brand/20">
            <AlertTriangle className="w-12 h-12 text-brand-on-dark" />
          </div>
        </div>

        <div className="mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Terjadi Kesalahan
          </h1>
        </div>

        <div className="mb-10">
          <p className={`${publicSans.className} text-md md:text-lg text-gray-400 leading-relaxed`}>
            Maaf, ada yang tidak beres saat memuat halaman ini. Coba muat
            ulang, atau kembali ke beranda.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className={buttonClasses({ variant: "primary", size: "md", dark: true })}
          >
            <RotateCw className="w-5 h-5" />
            Coba Lagi
          </button>

          <Link
            href="/"
            className="focus-ring-dark group relative inline-flex justify-center items-center text-center gap-2
                       bg-transparent border border-gray-600 hover:border-gray-500
                       text-gray-300 hover:text-white font-semibold
                       px-6 py-3 rounded-lg transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </section>
  );
}
