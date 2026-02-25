"use client";

import { useState } from "react";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaLink, FaCheck } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface SocialShareButtonsProps {
  url: string;
  title: string;
  variant?: "hero" | "inline" | "sidebar";
}

export default function SocialShareButtons({
  url,
  title,
  variant = "inline",
}: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareLinks = {
    x: `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const CopyIcon = copied ? FaCheck : FaLink;
  const copyTitle = copied ? "Tersalin!" : "Salin tautan";

  const iconClass = "w-4 h-4";

  const IconWrapper = ({ Icon }: { Icon: React.ElementType }) => (
    <Icon className={iconClass} />
  );

  if (variant === "hero") {
    return (
      <div className="flex items-center gap-3">
        <Link
          href={shareLinks.x}
          target="_blank"
          rel="noopener noreferrer"
          title="Bagikan di Twitter"
          className="w-10 h-10 rounded-full bg-gray-800 backdrop-blur-sm text-gray-300 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all duration-200 transform hover:scale-105"
        >
          <IconWrapper Icon={FaXTwitter} />
        </Link>
        <Link
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          title="Bagikan di Facebook"
          className="w-10 h-10 rounded-full bg-gray-800 backdrop-blur-sm text-gray-300 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all duration-200 transform hover:scale-105"
        >
          <IconWrapper Icon={FaFacebookF} />
        </Link>
        <Link
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          title="Bagikan di LinkedIn"
          className="w-10 h-10 rounded-full bg-gray-800 backdrop-blur-sm text-gray-300 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all duration-200 transform hover:scale-105"
        >
          <IconWrapper Icon={FaLinkedinIn} />
        </Link>
        <button
          onClick={copyToClipboard}
          title={copyTitle}
          className="w-10 h-10 rounded-full bg-gray-800 backdrop-blur-sm text-gray-300 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all duration-200 transform hover:scale-105 cursor-pointer"
        >
          <CopyIcon className={iconClass} />
        </button>
      </div>
    );
  }

  if (variant === "sidebar") {
    return (
      <div className="flex items-center gap-4">
        <Link
          href={shareLinks.x}
          target="_blank"
          rel="noopener noreferrer"
          title="Bagikan di Twitter"
          className="w-8 h-8 rounded-full bg-black text-white hover:bg-red-500 flex items-center justify-center transition-all duration-200 transform hover:scale-105"
        >
          <IconWrapper Icon={FaXTwitter} />
        </Link>
        <Link
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          title="Bagikan di Facebook"
          className="w-8 h-8 rounded-full bg-black text-white hover:bg-red-500 flex items-center justify-center transition-all duration-200 transform hover:scale-105"
        >
          <IconWrapper Icon={FaFacebookF} />
        </Link>
        <Link
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          title="Bagikan di LinkedIn"
          className="w-8 h-8 rounded-full bg-black text-white hover:bg-red-500 flex items-center justify-center transition-all duration-200 transform hover:scale-105"
        >
          <IconWrapper Icon={FaLinkedinIn} />
        </Link>
        <button
          onClick={copyToClipboard}
          title={copyTitle}
          className="w-8 h-8 rounded-full bg-black text-white hover:bg-red-500 flex items-center justify-center transition-all duration-200 transform hover:scale-105 cursor-pointer"
        >
          <CopyIcon className={iconClass} />
        </button>
      </div>
    );
  }

  // inline variant
  return (
    <div className="flex items-center gap-3">
      <Link
        href={shareLinks.x}
        target="_blank"
        rel="noopener noreferrer"
        title="Bagikan di Twitter"
        className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-all duration-200 transform hover:scale-105"
      >
        <IconWrapper Icon={FaXTwitter} />
      </Link>
      <Link
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        title="Bagikan di Facebook"
        className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all duration-200 transform hover:scale-105"
      >
        <IconWrapper Icon={FaFacebookF} />
      </Link>
      <Link
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        title="Bagikan di LinkedIn"
        className="w-8 h-8 rounded-full bg-blue-700 hover:bg-blue-800 text-white flex items-center justify-center transition-all duration-200 transform hover:scale-105"
      >
        <IconWrapper Icon={FaLinkedinIn} />
      </Link>
      <button
        onClick={copyToClipboard}
        title={copyTitle}
        className="w-8 h-8 rounded-full bg-black text-white hover:bg-red-500 flex items-center justify-center transition-all duration-200 transform hover:scale-105 cursor-pointer"
      >
        <CopyIcon className={iconClass} />
      </button>
    </div>
  );
}
