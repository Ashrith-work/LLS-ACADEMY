import type { LaneId } from "@/lib/types";

/**
 * Dev bypass — lets the whole funnel (signup gate + payment) be clicked
 * through without Google OAuth or Razorpay keys.
 * ON when NEXT_PUBLIC_DEV_BYPASS=true OR when running `next dev`.
 * For production: set NEXT_PUBLIC_DEV_BYPASS=false (see README).
 */
export const DEV_BYPASS =
  process.env.NEXT_PUBLIC_DEV_BYPASS === "true" ||
  (process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_DEV_BYPASS !== "false");

/** Minimal className joiner. */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** ₹1,499 style formatting (Indian grouping). */
export function inr(amount: number) {
  return "₹" + amount.toLocaleString("en-IN");
}

/**
 * Lane accent classes, statically listed so Tailwind's scanner keeps them.
 * Sell = ember (courage/action), Brand = violet (aspiration), Grow = teal (trust/calm).
 */
export const LANE_STYLES: Record<
  LaneId,
  { text: string; bg: string; border: string; ring: string; badgeBg: string }
> = {
  sell: {
    text: "text-ember",
    bg: "bg-ember",
    border: "border-ember/40",
    ring: "hover:ring-ember/50",
    badgeBg: "bg-ember/15",
  },
  brand: {
    text: "text-violet",
    bg: "bg-violet",
    border: "border-violet/40",
    ring: "hover:ring-violet/50",
    badgeBg: "bg-violet/15",
  },
  grow: {
    text: "text-teal",
    bg: "bg-teal",
    border: "border-teal/40",
    ring: "hover:ring-teal/50",
    badgeBg: "bg-teal/15",
  },
};
