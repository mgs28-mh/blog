"use client";

import Link from "next/link";
import { FaFacebook, FaGithub, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { publicSans } from "@/lib/fonts";

interface SocialLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const socialLinks: SocialLink[] = [
  {
    href: "https://x.com/mgs28mh",
    label: "Twitter",
    icon: <FaXTwitter size={18} />,
  },
  {
    href: "https://facebook.com/mgs28mh",
    label: "Facebook",
    icon: <FaFacebook size={18} />,
  },
  {
    href: "https://instagram.com/mgs28mh",
    label: "Instagram",
    icon: <FaInstagram size={18} />,
  },
  {
    href: "https://github.com/mgs28-mh",
    label: "GitHub",
    icon: <FaGithub size={18} />,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Decorative background elements (Bg and Pattern kept unchanged as requested) */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px),
                             linear-gradient(to bottom, #fff 1px, transparent 1px)`,
            backgroundSize: '4rem 4rem'
          }} />
        </div>

        {/* Decorative lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-slate-700/50 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-slate-700/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-20">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 pb-12 border-b border-gray-800">
          {/* Brand Column */}
          <div className="col-span-12 md:col-span-6 flex flex-col gap-4">
            <Link href="/" className="text-xl md:text-2xl font-bold tracking-tight text-white leading-none">
              kata<span className="text-red-500">.</span>komunika
            </Link>
            <p className={`${publicSans.className} text-sm text-gray-400 max-w-sm leading-relaxed`}>
              Jurnal pribadi yang membahas ide, wawasan, opini, dan tren seputar ilmu komunikasi, teknologi informasi, serta perkembangan media digital.
            </p>
          </div>

          {/* Column — Kategori */}
          <div className="col-span-6 md:col-span-3 flex flex-col gap-4">
            <span className={`${publicSans.className} text-xs font-mono uppercase tracking-wider text-gray-500`}>
              Kategori
            </span>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/blog/komunikasi" className={`${publicSans.className} text-sm text-gray-300 hover:text-red-500 transition-colors`}>
                  Komunikasi
                </Link>
              </li>
              <li>
                <Link href="/blog/teknologi" className={`${publicSans.className} text-sm text-gray-300 hover:text-red-500 transition-colors`}>
                  Teknologi
                </Link>
              </li>
              <li>
                <Link href="/blog" className={`${publicSans.className} text-sm text-gray-300 hover:text-red-500 transition-colors`}>
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column — Navigasi */}
          <div className="col-span-6 md:col-span-3 flex flex-col gap-4">
            <span className={`${publicSans.className} text-xs font-mono uppercase tracking-wider text-gray-500`}>
              Navigasi
            </span>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/" className={`${publicSans.className} text-sm text-gray-300 hover:text-red-500 transition-colors`}>
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/about" className={`${publicSans.className} text-sm text-gray-300 hover:text-red-500 transition-colors`}>
                  Tentang Saya
                </Link>
              </li>
              <li>
                <a href="https://mgalangs.web.id" target="_blank" rel="noopener noreferrer" className={`${publicSans.className} text-sm text-gray-300 hover:text-red-500 transition-colors`}>
                  Portofolio
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8">
          <p className={`${publicSans.className} text-sm text-gray-400 text-center md:text-left`}>
            © {currentYear} Kata Komunika.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-800/30 transition-all rounded-lg"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
