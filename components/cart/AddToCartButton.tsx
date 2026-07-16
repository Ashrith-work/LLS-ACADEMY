"use client";

import { useCart } from "@/lib/cart/cart";
import { track } from "@/lib/tracking";
import { cn } from "@/lib/utils";

/**
 * Toggle a course in/out of the cart. Always stops click propagation +
 * default, so it's safe to place inside a card that is itself a link.
 * `compact` renders the small variant used inside course cards.
 */
export function AddToCartButton({
  courseId,
  compact = false,
  className,
}: {
  courseId: string;
  compact?: boolean;
  className?: string;
}) {
  const { has, toggle } = useCart();
  const added = has(courseId);

  return (
    <button
      type="button"
      aria-pressed={added}
      aria-label={added ? "Remove from cart" : "Add to cart"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!added) track("add_to_cart", { courseId });
        toggle(courseId);
      }}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-full border font-medium transition-all",
        compact ? "px-3 py-1 text-xs" : "px-6 py-3 text-sm",
        added
          ? "border-ember bg-ember text-accentFg hover:bg-ember-soft"
          : "border-ink/25 text-ink hover:border-ember hover:-translate-y-0.5",
        className,
      )}
    >
      {added ? "✓ Added" : compact ? "+ Add" : "+ Add to cart"}
    </button>
  );
}
