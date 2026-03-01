"use client";

import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { BLOCKS, INLINES, Block, Inline, Text } from "@contentful/rich-text-types";
import { Options, NodeRenderer } from "@contentful/rich-text-react-renderer";
import { publicSans } from "@/app/layout";

type RichTextNode = Block | Inline;

/**
 * Recursively extracts plain text from Contentful Rich Text content
 */
export function extractTextFromRichText(content: Block | Inline | Text): string {
  // If it's a text node, return the value
  if ("value" in content && typeof content.value === "string") {
    return content.value;
  }

  // If it has content array, recursively extract text from children
  if ("content" in content && Array.isArray(content.content)) {
    return content.content
      .map((child) => extractTextFromRichText(child as Block | Inline | Text))
      .join(" ");
  }

  return "";
}

/**
 * Calculate reading time based on actual text content only (not JSON keys)
 */
export function calculateReadingTime(content: { json: Block }): string {
  const text = extractTextFromRichText(content.json);
  const words = text.trim().split(/\s+/).filter((word) => word.length > 0);
  const wordCount = words.length;
  const wordsPerMinute = 200;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} menit baca`;
}

/**
 * Rich text render options for Contentful content
 */
export const richTextRenderOptions: Options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: ((_node: RichTextNode, children: ReactNode) => (
      <p className={`mb-4 text-base sm:text-lg font-normal leading-relaxed text-slate-700 ${publicSans.className}`}>
        {children}
      </p>
    )) as NodeRenderer,
    [BLOCKS.HEADING_1]: ((_node: RichTextNode, children: ReactNode) => (
      <h1 className="text-4xl font-bold mt-16 mb-8 text-gray-900 pb-4">
        {children}
      </h1>
    )) as NodeRenderer,
    [BLOCKS.HEADING_2]: ((node: RichTextNode, children: ReactNode) => {
      const text = node.content
        ?.map((child) => ("value" in child ? child.value : "") || "")
        .join("")
        .trim();
      const id = text
        ?.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim() || "";
      return (
        <h2 id={id} className="text-2xl sm:text-3xl font-bold mt-8 sm:mt-10 mb-3 sm:mb-4 text-gray-900 scroll-mt-24">
          {children}
        </h2>
      );
    }) as NodeRenderer,
    [BLOCKS.HEADING_3]: ((node: RichTextNode, children: ReactNode) => {
      const text = node.content
        ?.map((child) => ("value" in child ? child.value : "") || "")
        .join("")
        .trim();
      const id = text
        ?.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim() || "";
      return (
        <h3 id={id} className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-2 sm:mb-3 text-gray-900 scroll-mt-24">
          {children}
        </h3>
      );
    }) as NodeRenderer,
    [BLOCKS.HEADING_4]: ((_node: RichTextNode, children: ReactNode) => (
      <h4 className="text-xl font-semibold mt-6 mb-3 text-gray-900">{children}</h4>
    )) as NodeRenderer,
    [BLOCKS.UL_LIST]: ((_node: RichTextNode, children: ReactNode) => (
      <ul className="list-disc pl-6 mb-3 space-y-3 text-slate-900">
        {children}
      </ul>
    )) as NodeRenderer,
    [BLOCKS.OL_LIST]: ((_node: RichTextNode, children: ReactNode) => (
      <ol className="list-decimal pl-6 mb-3 space-y-3 text-slate-900">
        {children}
      </ol>
    )) as NodeRenderer,
    [BLOCKS.LIST_ITEM]: ((_node: RichTextNode, children: ReactNode) => (
      <li className="text-base sm:text-lg leading-normal">{children}</li>
    )) as NodeRenderer,
    [BLOCKS.QUOTE]: ((_node: RichTextNode, children: ReactNode) => (
      <blockquote className="border-l-4 rounded-l-md border-red-500 p-4 py-4 italic text-gray-700 bg-red-50">
        {children}
      </blockquote>
    )) as NodeRenderer,
    [BLOCKS.EMBEDDED_ASSET]: ((node: RichTextNode) => {
      const file = (node.data.target as { fields?: { file?: { url: string } } })?.fields?.file;
      const title = (node.data.target as { fields?: { title?: string } })?.fields?.title;
      const description = (node.data.target as { fields?: { description?: string } })?.fields?.description;

      if (!file) return null;

      return (
        <figure className="my-10 rounded-xl overflow-hidden shadow-lg">
          <div className="aspect-[16/10] w-full relative">
            <Image
              src={`https:${file.url}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              alt={description || title || "Embedded content"}
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          {(title || description) && (
            <figcaption className="p-4 bg-gray-50">
              {title && (
                <div className="font-medium text-lg text-gray-900">{title}</div>
              )}
              {description && (
                <div className="text-sm text-gray-600 mt-1">{description}</div>
              )}
            </figcaption>
          )}
        </figure>
      );
    }) as NodeRenderer,
    [INLINES.HYPERLINK]: ((node: RichTextNode, children: ReactNode) => (
      <Link
        href={node.data.uri}
        className="text-red-600 hover:text-red-800 underline decoration-2 underline-offset-2 transition-colors duration-200"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </Link>
    )) as NodeRenderer,
  },
  renderMark: {
    bold: (text: ReactNode) => (
      <strong className="font-bold text-gray-900">{text}</strong>
    ),
    italic: (text: ReactNode) => <em className="italic">{text}</em>,
    underline: (text: ReactNode) => <u className="underline">{text}</u>,
    code: (text: ReactNode) => (
      <code className="font-mono bg-gray-100 px-2 py-1 rounded-md text-sm text-gray-800 border">
        {text}
      </code>
    ),
  },
};
