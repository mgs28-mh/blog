import { Block, Inline, Text } from "@contentful/rich-text-types";

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
