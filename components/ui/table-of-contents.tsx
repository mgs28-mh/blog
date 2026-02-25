"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: any; // Rich text JSON from Contentful
}

function extractHeadings(content: any): Heading[] {
  const headings: Heading[] = [];

  function traverse(node: any) {
    if (!node) return;

    // Check if node is a heading
    if (node.nodeType === "heading-2" || node.nodeType === "heading-3") {
      const level = node.nodeType === "heading-2" ? 2 : 3;
      const text = node.content
        ?.map((child: any) => child.value || "")
        .join("")
        .trim();

      if (text) {
        // Generate ID from text (slugify)
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .trim();

        headings.push({ id, text, level });
      }
    }

    // Traverse children
    if (node.content && Array.isArray(node.content)) {
      node.content.forEach(traverse);
    }
  }

  traverse(content);
  return headings;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const extracted = extractHeadings(content);
    setHeadings(extracted);
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      }
    );

    // Observe all heading elements
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="hidden xl:block">
      <div>
        <div className="flex items-center gap-2 mb-4 text-gray-900">
          <List className="w-4 h-4" />
          <span className="text-sm font-semibold uppercase tracking-wider">
            Daftar Isi
          </span>
        </div>
        <ul className="space-y-2 border-l-2 border-gray-200">
          {headings.map(({ id, text, level }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                className={`block py-1 text-sm transition-all duration-200 border-l-2 -ml-0.5 ${
                  level === 3 ? "pl-6" : "pl-4"
                } ${
                  activeId === id
                    ? "border-red-500 text-red-600 font-medium"
                    : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-400"
                }`}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
