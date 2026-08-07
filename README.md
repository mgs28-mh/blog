# Kata Komunika

Blog tentang komunikasi dan teknologi. Dibangun dengan **Next.js 15**, **Contentful** (headless CMS), **TypeScript**, **Tailwind CSS v4**, dan **Framer Motion**.

Domain: [katakomunika.web.id](https://katakomunika.web.id)
Penulis: **Galang Saputra**

## Fitur

- **Headless CMS** — Konten dikelola via Contentful, di-render dengan GraphQL API
- **Kategori** — Artikel terbagi dalam Komunikasi dan Teknologi
- **Rich Text** — Contentful rich text dengan kustom render (heading anchor, embedded images, code, blockquote)
- **Pagination** — Halaman kategori dengan navigasi halaman
- **Featured Articles** — Artikel unggulan di halaman depan
- **Search** — Pencarian artikel via GraphQL
- **Reading Time** — Estimasi waktu baca otomatis
- **Related Articles** — Artikel terkait berdasarkan kategori
- **Table of Contents** — Daftar isi sticky dari heading artikel
- **Social Share** — Bagikan artikel ke X, Facebook, LinkedIn, copy link
- **SEO** — Metadata dinamis, Open Graph, Twitter Card, JSON-LD Schema (Artikel, Breadcrumb, Organisasi, Person, Blog), sitemap.xml, robots.txt
- **llms.txt** — Halaman `/llms.txt` untuk AI crawler
- **On-Demand ISR** — Revalidasi cache via Contentful webhook
- **Custom 404** — Halaman tidak ditemukan dengan animasi
- **Animasi** — Framer Motion untuk scroll-triggered entry, staggered cards
- **Responsive** — Layout mobile-first dengan grid dan collapsible ToC

## Tech Stack

| Teknologi | Kegunaan |
|---|---|
| Next.js 15 (App Router) | Framework React |
| TypeScript | Type safety |
| Tailwind CSS v4 | Utility-first styling |
| Framer Motion | Animasi scroll & entry |
| Contentful | Headless CMS (GraphQL) |
| Lucide React / React Icons | Icon set |
| @contentful/rich-text-react-renderer | Render rich text |

## Struktur Projek

```
blog/
├── app/
│   ├── about/          # Halaman tentang
│   ├── api/
│   │   └── revalidate/ # On-demand ISR webhook
│   ├── blog/
│   │   ├── [slug]/     # Detail artikel
│   │   ├── komunikasi/ # Kategori komunikasi (dengan pagination)
│   │   └── teknologi/  # Kategori teknologi (dengan pagination)
│   │   └── page.tsx    # Indeks blog
│   ├── llms.txt/       # llms.txt route
│   ├── layout.tsx      # Root layout (Navbar + Footer)
│   ├── page.tsx        # Beranda (Hero + Blog Sections)
│   ├── not-found.tsx   # Custom 404
│   ├── sitemap.ts      # Dynamic sitemap
│   └── robots.ts       # robots.txt
├── components/
│   ├── about/          # Komponen halaman tentang
│   ├── blog/           # Blog list hero, blog-page, pagination-links
│   ├── com/            # BlogFeature + BlogPost (kategori komunikasi)
│   ├── tech/           # BlogFeature + BlogPost (kategori teknologi)
│   ├── ui/             # Navbar, Footer, RelatedArticles, SocialShare, TableOfContents
│   ├── about.tsx       # About section
│   ├── blog-com.tsx    # Homepage komunikasi section
│   ├── blog-tech.tsx   # Homepage teknologi section
│   ├── cta.tsx         # CTA banner
│   └── hero.tsx        # Homepage hero
├── lib/
│   ├── api.ts          # Contentful GraphQL client
│   ├── contentful-renderer.tsx  # Rich text render options
│   ├── fonts.ts        # Google Fonts (Bricolage Grotesque, Public Sans)
│   ├── schema.ts       # JSON-LD structured data generators
│   └── utils.ts        # Reading time, text extraction
├── public/             # Gambar statis
└── globals.css         # Tailwind v4 entry
```

## Environment Variables

Buat file `.env.local` di root projek:

```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_cda_token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_cpa_token     # optional, untuk draft mode
REVALIDATION_SECRET=your_webhook_secret             # untuk on-demand revalidation
```

## Memulai

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

Script lain:

| Script | Perintah |
|---|---|
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Production | `npm start` |
| Lint | `npm run lint` |

## Setup Contentful

1. Buat space di [contentful.com](https://contentful.com)
2. Buat content model `artikelPost` dengan field:
   - `title` (Short text)
   - `slug` (Short text, unique)
   - `excerpt` (Long text)
   - `details` (Rich text)
   - `date` (Date)
   - `image` (Media)
   - `featured` (Boolean)
   - `category` (Short text — value: `komunikasi`/`teknologi`)
3. Generate CDA token (Settings > API Keys)
4. Isi `.env.local`

## On-Demand Revalidation

Contentful webhook → `POST /api/revalidate`.

Setup di Contentful:
1. Settings > Webhooks > Add webhook
2. URL: `https://your-domain.com/api/revalidate`
3. Header: `x-revalidate-secret` = value dari `REVALIDATION_SECRET`
4. Trigger: Entry publish, unpublish, delete

## Halaman

| Route | Halaman |
|---|---|
| `/` | Beranda |
| `/about` | Tentang |
| `/blog` | Indeks blog (kategori cards) |
| `/blog/komunikasi` | Artikel komunikasi |
| `/blog/teknologi` | Artikel teknologi |
| `/blog/komunikasi/page/[page]` | Pagination komunikasi |
| `/blog/teknologi/page/[page]` | Pagination teknologi |
| `/blog/[slug]` | Detail artikel |
| `/api/revalidate` | Webhook revalidasi |
| `/llms.txt` | AI crawler index |
| `/sitemap.xml` | Sitemap |
| `/robots.txt` | Robots |

## Deploy

Deploy ke Vercel:

```bash
npm run build
```

Set environment variables di Vercel dashboard (sama dengan `.env.local`).
