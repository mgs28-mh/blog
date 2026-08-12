import { ReactNode } from "react";
import Image from "next/image";
import { publicSans } from "@/lib/fonts";
import GridPatternBg from "@/components/ui/grid-pattern-bg";
import Button from "@/components/ui/button";

type HeroSize = "xl" | "lg" | "md";

interface SizeConfig {
  section: string;
  headline: string;
  subhead: string;
  mark: string;
}

const SIZE_CONFIG: Record<HeroSize, SizeConfig> = {
  xl: {
    section: "py-12 sm:py-14 md:py-16 lg:py-20",
    headline:
      "text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.2]",
    subhead: "text-sm md:text-base",
    mark: "text-[5rem] sm:text-[7rem] lg:text-[12rem] xl:text-[14rem]",
  },
  lg: {
    section: "py-12 md:py-16",
    headline: "text-3xl sm:text-4xl md:text-5xl leading-tight",
    subhead: "text-sm md:text-base",
    mark: "text-[6rem] sm:text-[8rem] lg:text-[12rem] xl:text-[14rem]",
  },
  md: {
    section: "py-8 sm:py-10 md:py-12",
    headline:
      "text-2xl sm:text-3xl md:text-4xl leading-tight sm:leading-snug",
    subhead: "text-sm md:text-base",
    mark: "text-[5rem] sm:text-[6rem] lg:text-[8rem]",
  },
};

/**
 * Shared dark grid-pattern shell used by every page hero and its loading
 * skeleton, so the two can't drift out of sync with each other.
 */
export function HeroGridShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative bg-gray-900 overflow-hidden ${className}`}>
      <div className="absolute inset-0">
        <GridPatternBg />
      </div>
      {children}
    </section>
  );
}

interface PageHeroProps {
  eyebrow?: string;
  headline: ReactNode;
  subhead?: string;
  size?: HeroSize;
  cta?: { href: string; label: string };
  breadcrumb?: ReactNode;
  meta?: ReactNode;
  align?: "left" | "center";
  mark?: string;
  image?: { url: string; alt: string };
}

export default function PageHero({
  eyebrow,
  headline,
  subhead,
  size = "lg",
  cta,
  breadcrumb,
  meta,
  align = "left",
  mark,
  image,
}: PageHeroProps) {
  const config = SIZE_CONFIG[size];
  const centered = align === "center";
  const hasImage = Boolean(image) && !centered;

  return (
    <HeroGridShell className={config.section}>
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div
          className={`flex gap-8 lg:gap-12 ${
            hasImage ? "flex-col lg:flex-row lg:items-stretch" : "items-center"
          } ${centered ? "justify-center text-center" : "justify-between"}`}
        >
          <div
            className={`flex flex-col gap-4 md:gap-5 flex-1 ${
              centered ? "items-center" : ""
            }`}
          >
            {breadcrumb}

            {eyebrow && (
              <p
                className={`${publicSans.className} text-[11px] md:text-xs tracking-[0.3em] uppercase text-gray-400 font-medium`}
              >
                {eyebrow}
              </p>
            )}

            <h1
              className={`${config.headline} font-bold text-white tracking-tight max-w-3xl`}
            >
              {headline}
            </h1>

            {meta}

            {subhead && (
              <p
                className={`${publicSans.className} ${config.subhead} text-gray-400 max-w-xl leading-relaxed`}
              >
                {subhead}
              </p>
            )}

            {(cta || !centered) && <div className="w-12 h-px bg-gray-700" />}

            {cta && (
              <Button href={cta.href} variant="primary" size="md" dark className="w-fit">
                {cta.label}
              </Button>
            )}
          </div>

          {hasImage && image && (
            <div className="w-full lg:w-80 xl:w-96 shrink-0 mt-2 lg:mt-0">
              <div className="aspect-[16/10] lg:aspect-[4/3] relative overflow-hidden rounded-2xl ring-1 ring-white/10">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 384px"
                  priority
                  quality={75}
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {mark && !centered && !hasImage && (
            <div
              className="hidden md:flex items-center justify-center select-none pointer-events-none shrink-0"
              aria-hidden="true"
            >
              <span
                className={`${config.mark} font-bold leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.12)] -mr-8`}
              >
                {mark}
              </span>
            </div>
          )}
        </div>
      </div>
    </HeroGridShell>
  );
}
