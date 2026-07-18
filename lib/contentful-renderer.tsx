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
      <p className={`mb-5 text-[1.0625rem] sm:text-lg leading-[1.8] text-slate-600 ${publicSans.className}`}>
        {children}
      </p>
    ),
    [BLOCKS.HEADING_1]: (_node, children: ReactNode) => (
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mt-12 sm:mt-16 mb-6 text-gray-900">
        {children}
      </h1>
    ),
    [BLOCKS.HEADING_2]: (node, children: ReactNode) => {
      const text = getHeadingText(node);
      const id = generateSlugId(text);
      return (
        <h2 id={id} className="text-2xl sm:text-3xl font-bold tracking-tight mt-10 sm:mt-14 mb-4 text-gray-900 scroll-mt-24">
          {children}
        </h2>
      );
    },
    [BLOCKS.HEADING_3]: (node, children: ReactNode) => {
      const text = getHeadingText(node);
      const id = generateSlugId(text);
      return (
        <h3 id={id} className="text-xl sm:text-2xl font-bold tracking-tight mt-8 sm:mt-10 mb-3 text-gray-900 scroll-mt-24">
          {children}
        </h3>
      );
    },
    [BLOCKS.HEADING_4]: (_node, children: ReactNode) => (
      <h4 className="text-lg sm:text-xl font-semibold tracking-tight mt-6 sm:mt-8 mb-3 text-gray-900">{children}</h4>
    ),
    [BLOCKS.UL_LIST]: (_node, children: ReactNode) => (
      <ul className="list-disc pl-5 mb-6 space-y-2.5 marker:text-red-500">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (_node, children: ReactNode) => (
      <ol className="list-decimal pl-5 mb-6 space-y-2.5 marker:text-red-500 marker:font-semibold">
        {children}
      </ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node, children: ReactNode) => (
      <li className={`text-[1.0625rem] sm:text-lg leading-[1.75] text-slate-800 pl-1 [&>p]:mb-2 ${publicSans.className}`}>{children}</li>
    ),
    [BLOCKS.QUOTE]: (_node, children: ReactNode) => (
      <blockquote className="border-l-4 border-red-500 bg-red-50/70 rounded-r-lg px-5 py-4 my-8 italic text-slate-800 [&>p]:mb-0 [&>p:not(:last-child)]:mb-3">
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
        <figure className="my-8 sm:my-10 rounded-xl overflow-hidden">
          <div className="aspect-[16/10] w-full relative">
            <Image
              src={`https:${file.url}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              alt={description || title || "Embedded content"}
              className="object-cover"
            />
          </div>
          {(title || description) && (
            <figcaption className="px-4 py-3 bg-gray-50 border-t border-gray-100">
              {title && (
                <div className="font-medium text-sm text-gray-900">{title}</div>
              )}
              {description && (
                <div className="text-sm text-gray-600 mt-0.5">{description}</div>
              )}
            </figcaption>
          )}
        </figure>
      );
    },
    [INLINES.HYPERLINK]: (node, children: ReactNode) => (
      <Link
        href={node.data.uri}
        className="text-red-700 underline decoration-red-300 decoration-[1.5px] underline-offset-[3px] hover:decoration-red-600 transition-colors duration-200"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </Link>
    ),
  },
  renderMark: {
    bold: (text: ReactNode) => (
      <strong className="font-semibold text-gray-900">{text}</strong>
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
