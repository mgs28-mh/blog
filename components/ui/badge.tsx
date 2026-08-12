export type BadgeVariant = "chip" | "text";

interface CategoryBadgeProps {
  category: string;
  variant?: BadgeVariant;
  className?: string;
}

/**
 * Single source of truth for category -> color mapping:
 * teknologi = accent (blue), everything else = brand (red).
 */
export default function CategoryBadge({
  category,
  variant = "chip",
  className = "",
}: CategoryBadgeProps) {
  const isTeknologi = category === "teknologi";

  if (variant === "text") {
    const textColor = isTeknologi ? "text-accent" : "text-brand";
    return (
      <span
        className={`text-[10px] font-semibold uppercase tracking-wider ${textColor} ${className}`}
      >
        {category}
      </span>
    );
  }

  const chipClasses = isTeknologi
    ? "text-accent-subtle-text bg-accent-subtle"
    : "text-brand-subtle-text bg-brand-subtle";

  return (
    <span
      className={`inline-block px-2 py-0.5 text-xs font-medium uppercase tracking-wider rounded ${chipClasses} ${className}`}
    >
      {category}
    </span>
  );
}
