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

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-24 lg:py-28">
        <div className="flex items-center justify-between gap-8">
          {/* Left — Editorial content */}
          <div className="flex flex-col gap-8 flex-1">

            {/* Label — small, understated */}
            <p className={`${publicSans.className} text-[11px] md:text-xs tracking-[0.3em] uppercase text-gray-400 font-medium`}>
              Jurnal &middot; Komunikasi &middot; Teknologi
            </p>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold text-white leading-[1.15] tracking-tight max-w-3xl">
              Ide dan wawasan seputar{" "}
              <span className="text-red-500">komunikasi</span>,{" "}
              <span className="text-red-500">teknologi</span>, dan dunia digital.
            </h1>

            {/* Subhead — brief, human-toned */}
            <p className={`${publicSans.className} text-base md:text-lg text-gray-400 max-w-xl leading-relaxed`}>
              Menulis tentang cara pesan bekerja, kenapa teknologi penting, dan hal-hal yang menarik di antaranya.
            </p>

            {/* Thin separator */}
            <div className="w-12 h-px bg-gray-700" />
          </div>

          {/* Right — Decorative typographic 'K' */}
          <div
            className="hidden lg:flex items-center justify-center select-none pointer-events-none shrink-0"
            aria-hidden="true"
          >
            <span className="text-[18rem] xl:text-[22rem] font-bold leading-none text-white/[0.03] -mr-8">
              K
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}