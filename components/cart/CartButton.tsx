"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart/cart";

/** Nav cart link with a live count badge. */
export function CartButton() {
  const { count, ready } = useCart();

  return (
    <Link
      href="/cart"
      aria-label={`Cart, ${count} ${count === 1 ? "course" : "courses"}`}
      className="relative inline-flex items-center text-sm text-muted transition hover:text-ink"
    >
      {/* Bag icon */}
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M6 8h12l-1 12H7L6 8Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      {ready && count > 0 && (
        <span
          className="absolute -right-2.5 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[11px] font-bold leading-none text-accentFg"
          style={{ backgroundColor: "#FF3D7A" }}
        >
          {count}
        </span>
      )}
    </Link>
  );
}
