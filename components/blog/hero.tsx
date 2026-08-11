import PageHero from "@/components/ui/page-hero";

export default function Hero() {
  return (
    <PageHero
      size="lg"
      mark="B"
      eyebrow="Arsip · Artikel · Publikasi"
      headline={
        <>
          Blog & Artikel <span className="text-brand">Terbaru</span>
        </>
      }
      subhead="Telusuri kumpulan tulisan, opini, wawasan, dan tutorial seputar komunikasi massa dan teknologi informasi."
    />
  );
}
