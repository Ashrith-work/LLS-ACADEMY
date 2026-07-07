import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "lime" | "gold" | "ghost" | "onLight";

/**
 * Editorial button system — refined pills, solid ink/accent fills, quiet
 * hover (colour shift + faint lift). No hard borders or offset shadows.
 *  primary (ember)  → the default action: tomato accent.
 *  lime             → RARE. The single most important action (deep red).
 *  gold             → bundle / premium value actions only (ochre).
 *  ghost            → secondary actions (hairline outline on paper).
 *  onLight          → solid ink action for light sections.
 */
const styles: Record<Variant, string> = {
  primary:
    "bg-ember text-cream hover:bg-ember-soft",
  lime:
    "bg-lime text-cream hover:brightness-110",
  gold:
    "bg-gold text-cream hover:brightness-110",
  ghost:
    "bg-transparent text-ink border border-ink/30 hover:border-ink/70 hover:bg-ink/[0.04]",
  onLight:
    "bg-ink text-cream hover:bg-ink/90",
};

interface BaseProps {
  variant?: Variant;
  size?: "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight shadow-brutal transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none";
const sizes = { md: "px-6 py-3 text-sm", lg: "px-8 py-4 text-base" };

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
