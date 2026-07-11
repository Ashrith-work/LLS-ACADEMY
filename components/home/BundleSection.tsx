"use client";

import Link from "next/link";
import { BUNDLE, catalogueValue, valueStack, TOTAL_COUNT } from "@/lib/data/courses";
import { inr } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { Grain } from "@/components/ui/Grain";
import { track } from "@/lib/tracking";

/**
 * The money moment — a full-bleed dark "chapter" with grain. Value contrast is
 * carried typographically (total struck through small, the price huge in serif);
 * the catalogue is an elegant hairline-separated index, not chips. Champagne.
 */
export function BundleSection() {
  const stack = valueStack();
  const total = catalogueValue();
  const shown = stack.slice(0, 8);

  return (
    <section
      className="relative overflow-hidden bg-ink py-20 text-cream sm:py-28"
      aria-labelledby="bundle-heading"
    >
      <Grain opacity={0.05} />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-4 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        {/* Left — the money moment */}
        <Reveal>
          <p className="text-kicker uppercase text-champagne">The bundle</p>
          <h2
            id="bundle-heading"
            className="mt-4 font-display font-medium [font-size:clamp(2.25rem,5vw,4rem)] [letter-spacing:-0.02em] [line-height:1.02]"
          >
            All {TOTAL_COUNT} courses.
            <br />
            One decision.
          </h2>
          <p className="mt-5 max-w-md text-standfirst text-cream/70">
            {BUNDLE.hook} Lifetime access — your pace, your time. Every new course we add is yours too.
          </p>

          <div className="mt-10">
            <p className="text-sm text-cream/45 line-through">{inr(total)}+ total value</p>
            <p className="mt-1 font-display tabular-nums font-semibold text-champagne [font-size:clamp(3.5rem,9vw,6rem)] [line-height:1]">
              {inr(BUNDLE.price)}
            </p>
            <p className="mt-2 text-kicker uppercase text-cream/50">One-time · lifetime access</p>
          </div>

          <Link
            href="/all-access"
            onClick={() => track("bundle_cta_clicked", { from: "home-bundle-section" })}
            className="mt-10 inline-flex items-center gap-2 bg-champagne px-7 py-3.5 font-medium text-ink transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            See everything inside <span aria-hidden>→</span>
          </Link>
        </Reveal>

        {/* Right — elegant hairline index */}
        <Reveal delay={0.1}>
          <p className="text-kicker uppercase text-cream/50">Inside the bundle</p>
          <ul className="mt-6">
            {shown.map((c) => (
              <li
                key={c.id}
                className="flex items-baseline justify-between gap-4 border-t border-[color:var(--hairline-invert)] py-3.5 text-[15px]"
              >
                <span className="text-cream/85">
                  {c.title}
                  {c.anchor && <span className="ml-1.5 text-champagne">★</span>}
                </span>
                <span className="shrink-0 font-display tabular-nums text-cream/45">{inr(c.price)}</span>
              </li>
            ))}
            <li className="flex items-baseline justify-between gap-4 border-y border-[color:var(--hairline-invert)] py-3.5 text-[15px]">
              <span className="text-cream/50">+ {TOTAL_COUNT - shown.length} more courses</span>
              <span className="shrink-0 font-display tabular-nums text-champagne">{inr(total)}+</span>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
