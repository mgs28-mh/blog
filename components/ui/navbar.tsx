"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, ChevronDown } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  {
    href: "/services",
    label: "Services",
    children: [
      { href: "/services/web-design", label: "Web Design" },
      { href: "/services/development", label: "Development" },
      { href: "/services/consulting", label: "Consulting" },
    ],
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Handle escape key to close menus
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setActiveDropdown(null);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const NavLink = ({ item, mobile = false }: { item: NavItem; mobile?: boolean }) => {
    const active = isActiveLink(item.href);
    const hasChildren = item.children && item.children.length > 0;

    const baseClasses = "px-3 py-2 rounded-lg transition-all duration-200 hover:text-emerald-400 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-emerald-400/50";
    const activeClasses = active ? "text-emerald-400 bg-white/5" : "";
    const mobileClasses = mobile ? "block w-full text-left" : "";

    if (hasChildren && !mobile) {
      const buttonClasses = `flex items-center gap-1 ${baseClasses} ${activeClasses}`;
      
      return (
        <div className="relative" ref={dropdownRef}>
          <button
            className={buttonClasses}
            onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
            aria-expanded={activeDropdown === item.label}
            aria-haspopup="true"
          >
            <span>{item.label}</span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${
                activeDropdown === item.label ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {activeDropdown === item.label && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl py-2 animate-in slide-in-from-top-2 duration-200">
              {item.children?.map((child) => {
                const childActive = isActiveLink(child.href);
                const childClasses = `block px-4 py-2 text-sm transition-colors hover:text-emerald-400 hover:bg-neutral-700/50 ${
                  childActive ? "text-emerald-400 bg-neutral-700/30" : ""
                }`;
                
                return (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={childClasses}
                  >
                    {child.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    const linkClasses = `${baseClasses} ${activeClasses} ${mobileClasses}`;

    return (
      <Link href={item.href} className={linkClasses}>
        {item.label}
      </Link>
    );
  };

  const navClasses = `sticky top-0 z-50 transition-all duration-300 border-b border-neutral-800/50 ${
    isScrolled ? "bg-neutral-900/95 backdrop-blur-md shadow-lg" : "bg-slate-900"
  }`;

  const menuButtonClasses = `lg:hidden p-2 rounded-lg transition-all duration-200 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 ${
    isOpen ? "bg-neutral-800" : ""
  }`;

  const logoClasses = "text-2xl font-bold transition-all duration-200 hover:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 rounded-lg px-2 py-1 bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent hover:from-emerald-400 hover:to-emerald-300";

  const searchButtonClasses = "p-2 rounded-lg transition-all duration-200 hover:bg-neutral-800 hover:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50";

  const mobileMenuClasses = `lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
  }`;

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left - Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={menuButtonClasses}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            <div className="relative w-6 h-6">
              <Menu
                size={24}
                className={`absolute inset-0 transition-all duration-200 ${
                  isOpen 
                    ? "opacity-0 rotate-45 scale-75" 
                    : "opacity-100 rotate-0 scale-100"
                }`}
              />
              <X
                size={24}
                className={`absolute inset-0 transition-all duration-200 ${
                  isOpen 
                    ? "opacity-100 rotate-0 scale-100" 
                    : "opacity-0 -rotate-45 scale-75"
                }`}
              />
            </div>
          </button>

          {/* Center - Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className={logoClasses}>
              BlogKita
            </Link>
          </div>

          {/* Right - Search and Actions */}
          <div className="flex items-center space-x-2">
            <button className={searchButtonClasses} aria-label="Search">
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={mobileMenuClasses}>
          <div className="py-4 space-y-2 border-t border-neutral-800">
            {navItems.map((item) => (
              <div key={item.href}>
                <NavLink item={item} mobile />
                {item.children && (
                  <div className="ml-4 mt-2 space-y-1">
                    {item.children.map((child) => {
                      const childActive = isActiveLink(child.href);
                      const childMobileClasses = `block px-3 py-2 text-sm rounded-lg transition-colors hover:text-emerald-400 hover:bg-neutral-800/50 ${
                        childActive ? "text-emerald-400 bg-neutral-800/30" : ""
                      }`;
                      
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={childMobileClasses}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}