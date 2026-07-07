"use client";

import Link from "next/link";
import { TOTAL_COUNT } from "@/lib/data/courses";
import { track } from "@/lib/tracking";

/**
 * Persistent top bar: express lane for ready buyers (skips the funnel)
 * + slim nav. Gold = premium value signal on the bundle line.
 */
export function TopBar() {
  return (
    <header className="sticky top-0 z-40">
      {/* Express checkout strip — for warm buyers who already trust Shashank. */}
      <Link
        href="/checkout?item=all-access"
        onClick={() => track("express_checkout_clicked")}
        className="block bg-gold px-4 py-2 text-center text-xs font-bold text-inkText sm:text-sm"
      >
        Get all {TOTAL_COUNT} courses · lifetime access → express checkout
      </Link>

      <nav className="border-b border-cream/10 bg-ink/90 backdrop-blur" aria-label="Main">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="font-display text-lg tracking-tight text-cream">
            LIVE LIFE <span className="text-ember">SHAMELESS</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-5">
            <Link href="/#courses" className="hidden text-sm text-muted hover:text-cream sm:block">
              Courses
            </Link>
            <Link href="/all-access" className="hidden text-sm text-muted hover:text-cream sm:block">
              All-access
            </Link>
            <Link href="/about" className="hidden text-sm text-muted hover:text-cream sm:block">
              Shashank
            </Link>
            <Link
              href="/start"
              className="rounded-full bg-ember px-4 py-2 text-sm font-semibold text-white transition hover:bg-ember-soft"
            >
              Find your course
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
