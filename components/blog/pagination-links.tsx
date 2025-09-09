"use client";

import { useEffect } from "react";

interface PaginationLinksProps {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  baseUrl: string;
  category?: string;
}

export default function PaginationLinks({
  currentPage,
  hasNextPage,
  hasPreviousPage,
  baseUrl,
  category,
}: PaginationLinksProps) {
  useEffect(() => {
    // Remove any existing pagination links
    const existingPrevLink = document.querySelector('link[rel="prev"]');
    const existingNextLink = document.querySelector('link[rel="next"]');
    if (existingPrevLink) existingPrevLink.remove();
    if (existingNextLink) existingNextLink.remove();

    const blogPath = category ? `/blog/${category}` : '/blog';

    // Add prev link if available
    if (hasPreviousPage) {
      const prevUrl = currentPage === 2 
        ? `${baseUrl}${blogPath}` 
        : `${baseUrl}${blogPath}/page/${currentPage - 1}`;
      const prevLink = document.createElement('link');
      prevLink.rel = 'prev';
      prevLink.href = prevUrl;
      document.head.appendChild(prevLink);
    }

    // Add next link if available
    if (hasNextPage) {
      const nextUrl = `${baseUrl}${blogPath}/page/${currentPage + 1}`;
      const nextLink = document.createElement('link');
      nextLink.rel = 'next';
      nextLink.href = nextUrl;
      document.head.appendChild(nextLink);
    }

    // Cleanup function
    return () => {
      const prevLink = document.querySelector('link[rel="prev"]');
      const nextLink = document.querySelector('link[rel="next"]');
      if (prevLink) prevLink.remove();
      if (nextLink) nextLink.remove();
    };
  }, [currentPage, hasNextPage, hasPreviousPage, baseUrl, category]);

  return null; // This component doesn't render anything visible
}