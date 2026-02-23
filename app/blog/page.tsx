import Hero from "@/components/blog/hero";
import { Metadata } from "next";
import Link from "next/link";
import { getArticlesByCategory } from "@/lib/api";
import { HiOutlineArrowRight, HiOutlineChatBubbleLeftRight, HiOutlineComputerDesktop } from "react-icons/hi2";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const metadata: Metadata = {
      title: "Blog - Kata Komunikasi",
      description:
        "Pilih kategori blog yang ingin Anda baca: Komunikasi atau Teknologi. Dapatkan artikel, wawasan, dan tips terbaru.",
      keywords: [
        "blog komunikasi",
        "blog teknologi",
        "kategori artikel",
        "komunikasi digital",
        "teknologi komunikasi",
        "artikel terbaru",
      ],
      alternates: {
        canonical: "https://archipelago.web.id/blog",
      },
      openGraph: {
        title: "Blog - Kata Komunikasi",
        description:
          "Pilih kategori blog yang ingin Anda baca: Komunikasi atau Teknologi. Dapatkan artikel, wawasan, dan tips terbaru di Kata Komunikasi.",
        url: "https://archipelago.web.id/blog",
        siteName: "Kata Komunikasi",
        images: [
          {
            url: "https://archipelago.web.id/logo.webp",
            width: 1200,
            height: 630,
            alt: "Kata Komunikasi - Blog Categories",
          },
        ],
        locale: "id_ID",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        site: "https://archipelago.web.id/blog",
        title: "Blog - Kata Komunikasi",
        description:
          "Pilih kategori blog yang ingin Anda baca: Komunikasi atau Teknologi. Dapatkan artikel, wawasan, dan tips terbaru.",
        images: ["https://archipelago.web.id/logo.webp"],
      },
    };

    return metadata;
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog - Kata Komunikasi",
      description: "Pilih kategori blog yang ingin Anda baca: Komunikasi atau Teknologi.",
    };
  }
}

export default async function Blog() {
  // Get article counts for each category
  const komunikasiData = await getArticlesByCategory("komunikasi", 1, 1);
  const teknologiData = await getArticlesByCategory("teknologi", 1, 1);
  
  const categories = [
    {
      title: "Komunikasi",
      description: "Mengupas teori, praktik, dan strategi komunikasi dari berbagai sudut pandang.",
      href: "/blog/komunikasi",
      icon: HiOutlineChatBubbleLeftRight,
      count: komunikasiData.pagination.totalItems,
      gradient: "from-blue-600 to-indigo-600",
      hoverGradient: "from-blue-700 to-indigo-700",
    },
    {
      title: "Teknologi",
      description: "Mengupas perkembangan teknologi komunikasi dan informasi terbaru.",
      href: "/blog/teknologi",
      icon: HiOutlineComputerDesktop,
      count: teknologiData.pagination.totalItems,
      gradient: "from-red-600 to-rose-600",
      hoverGradient: "from-red-700 to-rose-700",
    },
  ];
  
  return (
    <main>
      <Hero />
      
      {/* Category Selection Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Pilih Kategori Artikel
            </h2>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
              Temukan artikel yang sesuai dengan minat Anda. Pilih kategori untuk melihat koleksi artikel terbaru kami.
            </p>
          </div>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={category.title}
                  href={category.href}
                  className="group block"
                >
                  <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${category.gradient} p-8 lg:p-10 shadow-xl transition-all duration-300 hover:shadow-2xl`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-black/5"></div>
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                    <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full"></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-right">
                          <div className="text-white/80 text-sm font-medium">Total Artikel</div>
                          <div className="text-white text-2xl font-bold">{category.count}</div>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                        {category.title}
                      </h3>

                      {/* Description */}
                      <p className="text-white/90 mb-6 leading-relaxed">
                        {category.description}
                      </p>

                      {/* CTA Button */}
                      <div className="flex items-center justify-between">
                        <span className="text-white font-semibold text-lg">
                          Baca Artikel
                        </span>
                        <div className="flex items-center space-x-2 text-white group-hover:translate-x-1 transition-transform duration-200">
                          <span className="text-sm">Lihat Semua</span>
                          <HiOutlineArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Additional Info */}
          <div className="text-center mt-12 lg:mt-16">
            <div className="inline-flex items-center px-6 py-3 bg-slate-100 rounded-full">
              <div className="flex items-center space-x-4 text-sm text-slate-600">
                <span>Total: {komunikasiData.pagination.totalItems + teknologiData.pagination.totalItems} artikel</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}