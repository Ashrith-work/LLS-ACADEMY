"use client";

import { BUNDLE, catalogueValue, valueStack, TOTAL_COUNT } from "@/lib/data/courses";
import { inr } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { track } from "@/lib/tracking";

/**
 * All-access value stack. Gold = premium value.
 * Ordering rule: premium anchors FIRST so the first number seen is high
 * and the summed value feels huge. Never cheap-first.
 */
export function BundleSection() {
  const stack = valueStack();
  const total = catalogueValue();
  const shown = stack.slice(0, 6);

  return (
    <section className="bg-ink py-16 sm:py-24" aria-labelledby="bundle-heading">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-gold/30 bg-surface">
            <div className="grid gap-0 lg:grid-cols-2">
              {/* Left: the pitch */}
              <div className="p-8 sm:p-12">
                <p className="mb-3 w-fit rounded-full bg-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold">
                  All-access · one-time · lifetime
                </p>
                <h2 id="bundle-heading" className="font-display text-3xl leading-tight text-cream sm:text-4xl">
                  Anni {TOTAL_COUNT} courses.
                  <br />
                  Okka decision.
                </h2>
                <p className="mt-4 text-muted">
                  {BUNDLE.hook} Konni ippude complete cheyyalsina avasaram ledu — lifetime access ante nee pace lo,
                  nee time lo. Kotha courses add ayina kuda nee ke.
                </p>
                <div className="mt-8 flex items-end gap-4">
                  <div>
                    <p className="text-sm text-muted line-through">{inr(total)}+ total value</p>
                    {/* The big number — lime, the rare shock colour. */}
                    <p className="font-display text-5xl text-lime">{inr(BUNDLE.price)}</p>
                  </div>
                </div>
                <div className="mt-8">
                  <ButtonLink
                    href="/all-access"
                    variant="gold"
                    size="lg"
                    onClick={() => track("bundle_cta_clicked", { from: "home-bundle-section" })}
                  >
                    See everything inside →
                  </ButtonLink>
                </div>
              </div>

              {/* Right: the stack, premium-first */}
              <div className="border-t border-gold/20 bg-card/60 p-8 sm:p-12 lg:border-l lg:border-t-0">
                <p className="mb-4 text-sm font-semibold text-cream">Inside the bundle:</p>
                <ul className="space-y-3">
                  {shown.map((c) => (
                    <li key={c.id} className="flex items-baseline justify-between gap-4 text-sm">
                      <span className="text-cream">
                        {c.title}
                        {c.anchor && <span className="ml-1.5 text-gold">★</span>}
                      </span>
                      <span className="shrink-0 text-muted">{inr(c.price)}</span>
                    </li>
                  ))}
                  <li className="flex items-baseline justify-between gap-4 border-t border-cream/10 pt-3 text-sm">
                    <span className="text-muted">+ {TOTAL_COUNT - shown.length} more courses…</span>
                    <span className="font-semibold text-gold">{inr(total)}+ value</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
