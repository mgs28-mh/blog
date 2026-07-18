import { getArticlesPreview } from "@/lib/api";

export const revalidate = 3600;

const baseUrl = "https://katakomunika.web.id";

export async function GET() {
  let articleSection = "";

  try {
    const articles = await getArticlesPreview(100);

    const komunikasi = articles.filter((a) => a.category === "komunikasi");
    const teknologi = articles.filter((a) => a.category === "teknologi");
    const lainnya = articles.filter(
      (a) => a.category !== "komunikasi" && a.category !== "teknologi"
    );

    const formatList = (items: typeof articles) =>
      items
        .map((a) => `- [${a.title}](${baseUrl}/blog/${a.slug})${a.excerpt ? ` - ${a.excerpt}` : ""}`)
        .join("\n");

    if (komunikasi.length > 0) {
      articleSection += `\n## Artikel Komunikasi\n${formatList(komunikasi)}\n`;
    }
    if (teknologi.length > 0) {
      articleSection += `\n## Artikel Teknologi\n${formatList(teknologi)}\n`;
    }
    if (lainnya.length > 0) {
      articleSection += `\n## Artikel Lainnya\n${formatList(lainnya)}\n`;
    }
  } catch {
    articleSection = `\n## Artikel\nDaftar lengkap artikel tersedia di ${baseUrl}/sitemap.xml\n`;
  }

  const body = `# Kata Komunika

Dapatkan artikel, wawasan, dan tips seputar komunikasi dan teknologi informasi terbaru.

## Key Pages
- [Beranda](${baseUrl}/) - Halaman utama.
- [Tentang](${baseUrl}/about) - Informasi tentang Kata Komunika dan penulisnya, Galang Saputra.
- [Blog](${baseUrl}/blog) - Indeks artikel.
- [Komunikasi](${baseUrl}/blog/komunikasi) - Kategori Komunikasi.
- [Teknologi](${baseUrl}/blog/teknologi) - Kategori Teknologi.
${articleSection}
## Sitemap
${baseUrl}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
