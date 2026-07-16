import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "lime" | "gold" | "ghost" | "onLight";

/**
 * Luxury button system — pill shapes, pink accent, cobalt label, soft glow.
 *  primary (ember)  → the default action: pink (#FF3D7A) → #FF5C90 on hover.
 *  lime             → RARE. The single most important action (pink, glowing).
 *  gold             → bundle / premium value actions only (pink).
 *  ghost            → secondary actions (hairline outline on cobalt).
 *  onLight          → solid pink action (kept for API parity).
 */
const styles: Record<Variant, string> = {
  primary:
    "bg-ember text-accentFg shadow-btn hover:bg-ember-soft hover:shadow-cardHover",
  lime:
    "bg-ember text-accentFg shadow-btn hover:bg-ember-soft hover:shadow-cardHover",
  gold:
    "bg-ember text-accentFg shadow-btn hover:bg-ember-soft hover:shadow-cardHover",
  ghost:
    "bg-transparent text-ink border border-ink/20 hover:border-ink/40 hover:bg-ink/[0.05]",
  onLight:
    "bg-ember text-accentFg shadow-btn hover:bg-ember-soft hover:shadow-cardHover",
};

interface BaseProps {
  variant?: Variant;
  size?: "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none";
const sizes = { md: "px-7 py-3.5 text-sm", lg: "px-8 py-4 text-base" };

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, sizes[size], styles[variant], className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  onClick,
}: BaseProps & { href: string; onClick?: () => void }) {
  return (
    <Link href={href} onClick={onClick} className={cn(base, sizes[size], styles[variant], className)}>
      {children}
    </Link>
  );
}
