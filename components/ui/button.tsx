import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md";

interface ButtonClassesOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  dark?: boolean;
  className?: string;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white hover:bg-brand-hover",
  outline: "border-2 border-brand text-brand hover:bg-brand hover:text-white",
  ghost: "text-brand hover:text-brand-hover",
};

const SIZE_CLASSES: Record<ButtonVariant, Record<ButtonSize, string>> = {
  primary: { sm: "px-4 py-2 text-sm", md: "px-6 py-3 text-sm" },
  outline: { sm: "px-4 py-2 text-sm", md: "px-6 py-3 text-base" },
  ghost: { sm: "px-0 py-0 text-sm", md: "px-0 py-0 text-base" },
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  dark = false,
  className = "",
}: ButtonClassesOptions = {}): string {
  const focusRing = dark ? "focus-ring-dark" : "focus-ring";
  const shape = variant === "ghost" ? "" : "rounded-lg";

  return [
    "inline-flex items-center justify-center gap-2 font-semibold transition-colors duration-200",
    shape,
    focusRing,
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[variant][size],
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

type ButtonProps = ButtonClassesOptions & {
  children: ReactNode;
  href?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className"> &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export default function Button({
  children,
  href,
  variant,
  size,
  dark,
  className,
  ...rest
}: ButtonProps) {
  const classes = buttonClasses({ variant, size, dark, className });

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
