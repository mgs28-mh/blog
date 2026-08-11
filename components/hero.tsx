import PageHero from "@/components/ui/page-hero";

export default function Hero() {
  return (
    <PageHero
      size="xl"
      mark="K"
      eyebrow="Jurnal · Komunikasi · Teknologi"
      headline={
        <>
          Ide dan wawasan seputar{" "}
          <span className="text-brand">komunikasi</span>,{" "}
          <span className="text-brand">teknologi</span>, dan dunia digital.
        </>
      }
      subhead="Menulis tentang cara pesan bekerja, kenapa teknologi penting, dan hal-hal yang menarik di antaranya."
      cta={{ href: "/blog", label: "Baca Artikel Terbaru" }}
    />
  );
}
