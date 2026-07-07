import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "lime" | "gold" | "ghost" | "onLight";

/**
 * Button system, mapped to the colour psychology:
 *  primary (ember)  → the default action colour: courage, energy.
 *  lime             → RARE. The single most important action on a screen.
 *  gold             → bundle / premium value actions only.
 *  ghost            → secondary actions on dark.
 *  onLight          → actions on the bone (light) sections.
 */
const styles: Record<Variant, string> = {
  primary:
    "bg-ember text-white hover:bg-ember-soft shadow-glow",
  lime:
    "bg-lime text-inkText hover:brightness-105 shadow-limeGlow",
  gold:
    "bg-gold text-inkText hover:brightness-105",
  ghost:
    "bg-transparent text-cream border border-cream/25 hover:border-cream/60",
  onLight:
    "bg-inkText text-bone hover:bg-black",
};

interface BaseProps {
  variant?: Variant;
  size?: "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";
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
