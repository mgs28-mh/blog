import PageHero from "@/components/ui/page-hero";

export default function Hero() {
  return (
    <PageHero
      size="lg"
      mark="A"
      eyebrow="Profil · Kreator · Penulis"
      headline={
        <>
          Tentang <span className="text-brand">Saya</span>
        </>
      }
      subhead="Mengenal lebih dekat perjalanan saya dalam memadukan ilmu komunikasi dengan pengembangan digital."
    />
  );
}
