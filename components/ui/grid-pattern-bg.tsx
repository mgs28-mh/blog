/**
 * Decorative dark grid-pattern background, shared by hero and footer so
 * the two surfaces can't drift out of sync with each other.
 */
export default function GridPatternBg({
  opacityClassName = "opacity-[0.07]",
}: {
  opacityClassName?: string;
}) {
  return (
    <div className={`absolute inset-0 ${opacityClassName}`}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px),
                           linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: "4rem 4rem",
        }}
      />
    </div>
  );
}
