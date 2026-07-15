"use client";

import { FAQS } from "@/lib/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { track } from "@/lib/tracking";

/**
 * FAQ — elegant accordion. Serif questions, generous spacing, hairline rules;
 * the open row gets a magenta top hairline. Native <details> keeps it
 * zero-JS-cost, keyboard-accessible and screen-reader friendly.
 */
export function Faq({ bgClass = "bg-paper" }: { bgClass?: string }) {
  return (
    <section className={`${bgClass} py-24 sm:py-32`} aria-labelledby="faq-heading">
      <div className="mx-auto max-w-3xl px-4">
        <Reveal>
          <p className="text-kicker uppercase text-muted">Questions</p>
          <h2
            id="faq-heading"
            className="mt-4 font-display font-medium text-ink [font-size:clamp(2rem,4.5vw,3.25rem)] [letter-spacing:-0.02em] [line-height:1.02]"
          >
            Got doubts? Ask away
          </h2>
        </Reveal>

        <div className="mt-12 border-b border-ink/10">
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="group border-t border-ink/10 open:border-magenta"
              onToggle={(e) => {
                if ((e.target as HTMLDetailsElement).open) track("faq_opened", { question: f.q });
              }}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-lg font-medium text-ink marker:content-none sm:text-xl">
                {f.q}
                <span
                  className="shrink-0 text-2xl font-light text-muted transition-transform duration-200 group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-7 text-inkText/75">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
