"use client";

import Link from "next/link";
import Image from "next/image";
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
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
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
    <footer className="bg-slate-800/50 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ====== TOP SECTION ====== */}
        <div className="py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-16">
            {/* === Logo === */}
            <div className="mb-8 lg:mb-0">
              <Link
                href="/"
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
              >
                <Image
                  src="/logo-kk.webp"
                  alt="Archipelago Logo"
                  width={200}
                  height={200}
                  className="rounded-none"
                />
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
                    className={`text-gray-300 hover:text-white transition-colors duration-200 text-md uppercase font-medium ${active ? "text-white" : ""
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
                  className="p-2 text-white/90 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-lg"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-700 mb-8" />

          {/* ====== BOTTOM SECTION ====== */}
          <div className="flex items-center justify-center text-gray-400 text-md">
            {/* Copyright */}
            <p>© {currentYear} Kata Komunikasi.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
