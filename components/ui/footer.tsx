"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebook, FaGithub, FaInstagram, FaXTwitter } from "react-icons/fa6";

interface NavItem {
  href: string;
  label: string;
}

interface SocialLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { href: "/", label: "Beranda" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "Tentang" },
];

const socialLinks: SocialLink[] = [
  {
    href: "https://twitter.com/mgs28mh",
    label: "Twitter",
    icon: <FaXTwitter size={20} />,
  },
  {
    href: "https://facebook.com/mgs28mh",
    label: "Facebook",
    icon: <FaFacebook size={20} />,
  },
  {
    href: "https://instagram.com/mgs28mh",
    label: "Instagram",
    icon: <FaInstagram size={20} />,
  },
  {
    href: "https://github.com/mgs28-mh",
    label: "GitHub",
    icon: <FaGithub size={20} />,
  },
];

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Decorative background elements */}
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

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* ====== TOP SECTION ====== */}
        <div className="py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-16">
            {/* === Logo === */}
            <div className="mb-8 lg:mb-0">
              <Link
                href="/"
                className="flex items-center space-x-3 transition-opacity duration-200"
              >
                <span className="text-2xl font-bold text-white tracking-tight leading-tight">
                  kata<br />komunika
                </span>
              </Link>
            </div>

            {/* === Navigation Links === */}
            <nav className="flex flex-wrap items-center gap-8 lg:gap-12 mb-8 lg:mb-0">
              {navItems.map((item) => {
                const active = isActiveLink(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-gray-300 hover:text-red-400 transition-colors duration-200 text-md uppercase font-medium ${active ? "text-red-400" : ""
                      }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* === Social Icons === */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-300 hover:text-red-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg hover:bg-gray-800"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 mb-8" />

          {/* ====== BOTTOM SECTION ====== */}
          <div className="flex flex-col lg:flex-row items-center justify-between text-gray-400 text-md">
            {/* Spacer for alignment */}
            <div className="hidden lg:block lg:w-32"></div>
            {/* Copyright */}
            <p className="mb-4 lg:mb-0">© {currentYear} Kata Komunika.</p>
            {/* Spacer for alignment */}
            <div className="hidden lg:block lg:w-32"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
