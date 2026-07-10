/**
 * Film-grain overlay — inline SVG feTurbulence noise. Layer it inside dark
 * ("chapter") sections so flat fills read as crafted, not generated.
 * Absolutely positioned; the parent must be `relative` and clip overflow.
 */
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export function Grain({ opacity = 0.04, className = "" }: { opacity?: number; className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ opacity, backgroundImage: `url("${NOISE}")`, mixBlendMode: "overlay" }}
    />
  );
}
