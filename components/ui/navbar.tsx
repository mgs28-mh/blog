"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, ChevronDown, ChevronRight } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { href: "/", label: "Beranda" },
  { href: "/about", label: "Tentang" },
  {
    href: "/blog",
    label: "Blog",
    children: [
      { href: "/blog/komunikasi", label: "Komunikasi" },
      { href: "/blog/teknologi", label: "Teknologi" },
    ],
  },

];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdowns, setMobileDropdowns] = useState<string[]>([]);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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
    setMobileDropdowns([]);
  }, [pathname]);

  // Handle escape key to close menus
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setActiveDropdown(null);
        setMobileDropdowns([]);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const toggleMobileDropdown = (label: string) => {
    setMobileDropdowns((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const NavLink = ({
    item,
    mobile = false,
  }: {
    item: NavItem;
    mobile?: boolean;
  }) => {
    const active = isActiveLink(item.href);
    const hasChildren = item.children && item.children.length > 0;

    const baseClasses =
      "px-3 py-2 transition-all duration-200 hover:text-red-400";
    const activeClasses = active ? "text-red-400" : "";
    const mobileClasses = mobile ? "block w-full text-left" : "";

    if (hasChildren && !mobile) {
      return (
        <div 
          className="relative" 
          ref={dropdownRef}
        >
          <div 
            className={`flex items-center gap-0 transition-all duration-200`}
          >
            {/* Main Link - Clickable */}
            <Link
              href={item.href}
              className={`${baseClasses} ${activeClasses} text-white hover:text-red-400 pr-0`}
              onClick={(e) => e.stopPropagation()}
            >
              {item.label}
            </Link>
            
            {/* Dropdown Button - Separate from link */}
            <button
              className={`flex items-center px-1 py-2 transition-all duration-200 hover:text-red-400 ${activeClasses} ${activeDropdown === item.label ? 'text-red-400' : 'text-white'}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveDropdown(
                  activeDropdown === item.label ? null : item.label
                );
              }}
              aria-expanded={activeDropdown === item.label}
              aria-haspopup="true"
              aria-label={`Toggle ${item.label} submenu`}
            >
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${activeDropdown === item.label ? "rotate-180" : ""
                  }`}
              />
            </button>
          </div>

          {/* Desktop Dropdown Menu */}
          <div
            className={`absolute top-full left-0 mt-2 w-48 bg-gray-800 shadow-xl overflow-hidden transition-all duration-300 ease-out transform origin-top rounded-lg border border-gray-700 ${activeDropdown === item.label
              ? "opacity-100 scale-y-100 translate-y-0 visible"
              : "opacity-0 scale-y-95 -translate-y-2 invisible"
              }`}
          >
            <div className="py-2">
              {item.children?.map((child, index) => {
                const childActive = isActiveLink(child.href);
                const childClasses = `block px-4 py-2 text-sm transition-all duration-300 hover:text-red-400 hover:bg-gray-700/50 transform text-gray-300 ${childActive ? "text-red-400 bg-gray-700" : ""
                  } ${activeDropdown === item.label
                    ? "translate-x-0 opacity-100"
                    : "translate-x-2 opacity-0"
                  }`;

                return (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={childClasses}
                    style={{
                      transitionDelay:
                        activeDropdown === item.label
                          ? `${index * 50}ms`
                          : "0ms",
                    }}
                  >
                    {child.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    // Mobile view with children
    if (hasChildren && mobile) {
      const isExpanded = mobileDropdowns.includes(item.label);

      return (
        <div className="rounded-lg overflow-hidden">
          <div className="flex items-center">
            {/* Main Link - Clickable */}
            <Link
              href={item.href}
              className={`flex-1 px-4 py-3 text-left transition-colors hover:text-red-400 hover:bg-gray-800/50 rounded-l-lg ${activeClasses}`}
              onClick={() => setIsOpen(false)}
            >
              <span className="text-base font-medium text-gray-100">{item.label}</span>
            </Link>
            
            {/* Dropdown Toggle Button */}
            <button
              className="px-3 py-3 text-gray-400 transition-colors hover:text-red-400 hover:bg-gray-800/50 rounded-r-lg min-w-[50px] flex justify-center"
              onClick={() => toggleMobileDropdown(item.label)}
              aria-expanded={isExpanded}
              aria-label={`Toggle ${item.label} submenu`}
            >
              <ChevronRight
                size={18}
                className={`transition-transform duration-200 ${isExpanded ? "rotate-90" : ""
                  }`}
              />
            </button>
          </div>

          {/* Mobile Submenu */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
          >
            <div
              className={`bg-gray-800/50 ml-4 mr-2 rounded-lg mt-1 transform transition-all duration-200 border border-gray-700/50 ${isExpanded
                ? "translate-y-0 scale-100"
                : "-translate-y-2 scale-95"
                }`}
            >
              {item.children?.map((child, index) => {
                const childActive = isActiveLink(child.href);
                return (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={`block px-4 py-3 text-sm text-gray-300 transition-all duration-200 hover:text-red-400 hover:bg-gray-700/50 first:rounded-t-lg last:rounded-b-lg transform ${childActive ? "text-red-400 bg-gray-700/50" : ""
                      } ${isExpanded
                        ? "translate-x-0 opacity-100"
                        : "translate-x-4 opacity-0"
                      }`}
                    style={{
                      transitionDelay: isExpanded ? `${index * 100}ms` : "0ms",
                    }}
                  >
                    {child.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    const linkClasses = `${baseClasses} ${activeClasses} ${mobileClasses}`;
    const mobileLinkClasses = mobile
      ? "block px-4 py-3 text-base font-medium text-gray-100 transition-colors hover:text-red-400 hover:bg-gray-800/50 rounded-lg"
      : linkClasses;

    return (
      <Link
        href={item.href}
        className={
          mobile ? `${mobileLinkClasses} ${activeClasses}` : linkClasses
        }
      >
        {item.label}
      </Link>
    );
  };

  const navClasses = `sticky top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out ${isScrolled ? "bg-gray-900/95 backdrop-blur-sm shadow-lg" : "bg-gray-900"
    }`;

  const menuButtonClasses = `lg:hidden p-2 rounded-lg transition-all duration-200 text-white hover:bg-gray-800 ${isOpen ? "bg-gray-800" : ""
    }`;

  const logoClasses =
    "text-2xl font-bold transition-all duration-200 hover:text-red-400 rounded-lg px-2 py-1";

  const searchButtonClasses =
    "p-2 rounded-lg transition-all duration-200 hover:text-red-400 text-white hover:bg-gray-800";

  return (
    <>
      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
      <nav className={navClasses}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-18">
            {/* Left - Logo */}
            <div className="flex items-center">
              <Link href="/" className={`${logoClasses} flex items-center gap-3`}>
                <span className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight">
                  kata<br />komunika
                </span>
              </Link>
            </div>

            {/* Center - Navigation Links (Desktop) */}
            <div className="hidden lg:flex items-center space-x-1 absolute left-1/2 transform -translate-x-1/2 text-white text-md font-semibold uppercase">
              {navItems.map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
            </div>

            {/* Right - Mobile Menu Button and Search */}
            <div className="flex items-center space-x-2">
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
                    className={`absolute inset-0 transition-all duration-200 ${isOpen
                      ? "opacity-0 rotate-45 scale-75"
                      : "opacity-100 rotate-0 scale-100"
                      }`}
                  />
                  <X
                    size={24}
                    className={`absolute inset-0 transition-all duration-200 ${isOpen
                      ? "opacity-100 rotate-0 scale-100"
                      : "opacity-0 -rotate-45 scale-75"
                      }`}
                  />
                </div>
              </button>

              {/* Search Button */}
              <button className={searchButtonClasses} aria-label="Search">
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Slide Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-gray-900 z-50 lg:hidden transform transition-transform duration-300 ease-in-out shadow-2xl ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        style={{
          position: 'fixed',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          willChange: 'transform'
        }}
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <Link
            href="/"
            className="text-xl font-bold text-white hover:text-red-400 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            kata komunika
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Panel Navigation */}
        <div className="py-4 overflow-y-auto h-[calc(100%-72px)]">
          <nav className="space-y-1 px-2">
            {navItems.map((item) => (
              <NavLink key={item.href} item={item} mobile />
            ))}
          </nav>

          {/* Additional mobile menu items */}
          <div className="mt-8 mx-2 pt-4 border-t border-gray-800">
            <button className="flex items-center gap-3 w-full px-4 py-3 text-base text-gray-300 transition-colors hover:text-red-400 hover:bg-gray-800/50 rounded-lg">
              <Search size={20} />
              Cari Artikel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
