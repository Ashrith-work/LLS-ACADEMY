"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart/cart";
import { getCourse } from "@/lib/data/courses";
import { ButtonLink } from "@/components/ui/Button";
import { inr } from "@/lib/utils";

/** The cart contents — resolves ids to courses, allows removal, shows a subtotal. */
export function CartView() {
  const { items, remove, count, ready } = useCart();

  const courses = items.map((id) => getCourse(id)).filter((c): c is NonNullable<typeof c> => Boolean(c));
  const subtotal = courses.reduce((sum, c) => sum + c.price, 0);

  if (!ready) {
    return <p className="mt-10 text-center text-sm text-muted">Loading your cart…</p>;
  }

  if (count === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-line bg-card p-10 text-center shadow-brutal">
        <p className="font-display text-2xl font-semibold text-ink">Your cart is empty.</p>
        <p className="mt-2 text-sm text-muted">Add a course or two and they&apos;ll show up here.</p>
        <div className="mt-6">
          <ButtonLink href="/#courses" variant="primary" size="lg">
            Browse courses
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[1fr,20rem]">
      {/* Line items */}
      <ul className="divide-y divide-line rounded-2xl border border-line bg-card shadow-brutal">
        {courses.map((c) => (
          <li key={c.id} className="flex items-center gap-4 p-5">
            <div
              className="hidden h-14 w-20 shrink-0 rounded-lg sm:block"
              style={{ background: `linear-gradient(135deg, ${c.thumb.from}, ${c.thumb.to})` }}
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <Link href={`/courses/${c.id}`} className="font-display text-base font-semibold text-ink hover:text-ember">
                {c.title}
              </Link>
              <p className="mt-0.5 truncate text-xs text-muted">{c.hook}</p>
            </div>
            <span className="font-display text-base font-semibold text-ink tabular-nums">{inr(c.price)}</span>
            <button
              type="button"
              onClick={() => remove(c.id)}
              aria-label={`Remove ${c.title}`}
              className="rounded-full border border-line px-2.5 py-1 text-xs text-muted transition hover:border-ink hover:text-ink"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      {/* Summary */}
      <aside className="h-fit rounded-2xl border border-line bg-card p-6 shadow-brutal">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Summary</p>
        <div className="mt-4 flex items-center justify-between text-sm text-inkSoft">
          <span>{count} {count === 1 ? "course" : "courses"}</span>
          <span className="font-display text-lg font-semibold text-ink tabular-nums">{inr(subtotal)}</span>
        </div>
        <div className="mt-6 space-y-2">
          {count === 1 ? (
            <ButtonLink href={`/checkout?item=${courses[0].id}`} variant="primary" size="lg" className="w-full">
              Checkout →
            </ButtonLink>
          ) : (
            <ButtonLink href="/checkout?item=all-access" variant="primary" size="lg" className="w-full">
              Get all-access →
            </ButtonLink>
          )}
          <ButtonLink href="/#courses" variant="ghost" size="lg" className="w-full">
            Keep browsing
          </ButtonLink>
        </div>
        {count > 1 && (
          <p className="mt-4 text-xs leading-relaxed text-muted">
            Buying several? All-access gets you every course for one price. Or check out any single course from its
            page.
          </p>
        )}
      </aside>
    </div>
  );
}
