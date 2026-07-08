import { publicSans } from "@/lib/fonts";

export default function Hero() {
  return (
    <section className="relative bg-gray-900 overflow-hidden">
      {/* Grid pattern background */}
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

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="flex items-center justify-between gap-6">
          {/* Left — Editorial content */}
          <div className="flex flex-col gap-5 flex-1">
            {/* Label — small, understated */}
            <p className={`${publicSans.className} text-[11px] tracking-[0.3em] uppercase text-gray-400 font-medium`}>
              Profil &middot; Kreator &middot; Penulis
            </p>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight max-w-3xl">
              Tentang <span className="text-red-500">Saya</span>
            </h1>

            {/* Subhead — brief, human-toned */}
            <p className={`${publicSans.className} text-sm md:text-base text-gray-400 max-w-xl leading-relaxed`}>
              Mengenal lebih dekat perjalanan saya dalam memadukan ilmu komunikasi dengan pengembangan digital.
            </p>

            {/* Thin separator */}
            <div className="w-12 h-px bg-gray-700" />
          </div>

          {/* Right — Decorative typographic 'A' */}
          <div
            className="hidden lg:flex items-center justify-center select-none pointer-events-none shrink-0"
            aria-hidden="true"
          >
            <span className="text-[12rem] xl:text-[14rem] font-bold leading-none text-white/[0.03] -mr-8">
              A
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
