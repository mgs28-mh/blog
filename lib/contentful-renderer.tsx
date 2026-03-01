import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { BLOCKS, INLINES, Block, Inline, Text } from "@contentful/rich-text-types";
import { Options } from "@contentful/rich-text-react-renderer";
import { publicSans } from "@/lib/fonts";

type ContentNode = Block | Inline;
type TextNode = Text & { value: string };

/**
 * Extract text content from heading node for ID generation
 */
function getHeadingText(node: ContentNode): string {
  return (node.content as TextNode[])
    ?.map((child) => child.value || "")
    .join("")
    .trim();
}

/**
 * Generate slug ID from text for anchor links
 */
function generateSlugId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/**
 * Rich text render options for Contentful content
 */
export const richTextRenderOptions: Options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node, children: ReactNode) => (
      <p className={`mb-4 text-base sm:text-lg font-normal leading-relaxed text-slate-700 ${publicSans.className}`}>
        {children}
      </p>
    ),
    [BLOCKS.HEADING_1]: (_node, children: ReactNode) => (
      <h1 className="text-4xl font-bold mt-16 mb-8 text-gray-900 pb-4">
        {children}
      </h1>
    ),
    [BLOCKS.HEADING_2]: (node, children: ReactNode) => {
      const text = getHeadingText(node);
      const id = generateSlugId(text);
      return (
        <h2 id={id} className="text-3xl font-bold mt-8 sm:mt-10 mb-3 sm:mb-4 text-gray-900 scroll-mt-24">
          {children}
        </h2>
      );
    },
    [BLOCKS.HEADING_3]: (node, children: ReactNode) => {
      const text = getHeadingText(node);
      const id = generateSlugId(text);
      return (
        <h3 id={id} className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-2 sm:mb-3 text-gray-900 scroll-mt-24">
          {children}
        </h3>
      );
    },
    [BLOCKS.HEADING_4]: (_node, children: ReactNode) => (
      <h4 className="text-xl font-semibold mt-6 mb-3 text-gray-900">{children}</h4>
    ),
    [BLOCKS.UL_LIST]: (_node, children: ReactNode) => (
      <ul className="list-disc pl-6 mb-3 space-y-3 text-slate-900">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (_node, children: ReactNode) => (
      <ol className="list-decimal pl-6 mb-3 space-y-3 text-slate-900">
        {children}
      </ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node, children: ReactNode) => (
      <li className="text-base sm:text-lg leading-normal">{children}</li>
    ),
    [BLOCKS.QUOTE]: (_node, children: ReactNode) => (
      <blockquote className="border-l-4 rounded-l-md border-red-500 p-4 py-4 italic text-gray-700 bg-red-50">
        {children}
      </blockquote>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const target = node.data.target as {
        fields?: {
          file?: { url: string };
          title?: string;
          description?: string;
        };
      };
      const file = target?.fields?.file;
      const title = target?.fields?.title;
      const description = target?.fields?.description;

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
    },
    [INLINES.HYPERLINK]: (node, children: ReactNode) => (
      <Link
        href={node.data.uri}
        className="text-red-600 hover:text-red-800 underline decoration-2 underline-offset-2 transition-colors duration-200"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </Link>
    ),
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
