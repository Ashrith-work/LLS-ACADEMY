"use client";

import { FAQS } from "@/lib/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { track } from "@/lib/tracking";

/**
 * FAQ — answers the REAL objections. Native <details> keeps it
 * zero-JS-cost, keyboard-accessible and screen-reader friendly.
 */
export function Faq() {
  return (
    <section className="bg-surface py-16 sm:py-24" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-3xl px-4">
        <Reveal>
          <h2 id="faq-heading" className="text-center font-display text-3xl text-cream sm:text-4xl">
            Doubts unte, adagandi
          </h2>
          <p className="mt-3 text-center text-sm text-muted">
            Ivi maaku real ga vachina questions — dodge cheyyakunda answer chestunnam.
          </p>
        </Reveal>
        <div className="mt-10 space-y-3">
          {FAQS.map((f) => (
            <Reveal key={f.q}>
              <details
                className="group rounded-2xl border border-cream/10 bg-card px-5 py-4"
                onToggle={(e) => {
                  if ((e.target as HTMLDetailsElement).open) track("faq_opened", { question: f.q });
                }}
              >
                <summary className="cursor-pointer list-none font-semibold text-cream marker:content-none">
                  <span className="flex items-center justify-between gap-4">
                    {f.q}
                    <span className="text-muted transition group-open:rotate-45" aria-hidden>
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
