import type { Metadata } from "next";
import Link from "next/link";
import { TopBar } from "@/components/layout/TopBar";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { Grain } from "@/components/ui/Grain";
import { BUNDLE, catalogueValue, valueStack, TOTAL_COUNT, LIVE_COUNT } from "@/lib/data/courses";
import { GUARANTEES } from "@/lib/data/site";
import { inr } from "@/lib/utils";
import { Faq } from "@/components/home/Faq";

export const metadata: Metadata = {
  title: `All-Access — all ${TOTAL_COUNT} courses, lifetime`,
  description: `One payment for all ${TOTAL_COUNT} courses — sales, communication, business, career. Lifetime access, new courses free.`,
};

/**
 * All-access bundle page. Editorial hero → dark "money" chapter (typographic
 * value contrast + hairline catalogue index) → included index → FAQ.
 */
export default function AllAccessPage() {
  const stack = valueStack();
  const total = catalogueValue();

  return (
    <>
      <TopBar />
      <main className="bg-paper">
        {/* Editorial hero */}
        <section className="px-4 pt-16 sm:pt-24" aria-labelledby="aa-heading">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <p className="text-kicker uppercase text-muted">All-access</p>
              <h1
                id="aa-heading"
                className="mt-4 max-w-3xl font-display font-medium text-ink [font-size:clamp(2.5rem,6vw,5rem)] [letter-spacing:-0.02em] [line-height:1.02]"
              >
                One decision to learn it all.
              </h1>
              <p className="mt-6 max-w-xl text-standfirst text-inkText/75">
                All {TOTAL_COUNT} courses ({LIVE_COUNT} live, the rest land in your library automatically the moment
                they launch). No deadline to finish — lifetime means lifetime.
              </p>
            </Reveal>
          </div>
        </section>

        {/* The money chapter — dark, grain, huge champagne price + hairline index */}
        <section
          className="relative mt-16 overflow-hidden bg-ink py-20 text-cream sm:mt-24 sm:py-28"
          aria-labelledby="price-heading"
        >
          <Grain opacity={0.05} />
          <div className="relative mx-auto grid max-w-6xl gap-14 px-4 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <Reveal>
              <p className="text-kicker uppercase text-champagne">The bundle</p>
              <h2
                id="price-heading"
                className="mt-4 font-display font-medium [font-size:clamp(2.25rem,5vw,4rem)] [letter-spacing:-0.02em] [line-height:1.02]"
              >
                Every skill.
                <br />
                One price.
              </h2>
              <div className="mt-10">
                <p className="text-sm text-cream/45 line-through">{inr(total)}+ total value</p>
                <p className="mt-1 font-display tabular-nums font-semibold text-champagne [font-size:clamp(3.5rem,9vw,6rem)] [line-height:1]">
                  {inr(BUNDLE.price)}
                </p>
                <p className="mt-2 text-kicker uppercase text-cream/50">One-time · lifetime access</p>
              </div>
              <Link
                href="/checkout?item=all-access"
                className="mt-10 inline-flex items-center gap-2 bg-champagne px-7 py-3.5 font-medium text-ink transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                Get all-access <span aria-hidden>→</span>
              </Link>
              <p className="mt-4 text-xs uppercase tracking-[0.14em] text-cream/40">
                Secure payment via Razorpay · instant access to everything live
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-kicker uppercase text-cream/50">Everything included</p>
              <ul className="mt-6">
                {stack.map((c) => (
                  <li
                    key={c.id}
                    className="flex items-baseline justify-between gap-4 border-t border-[color:var(--hairline-invert)] py-3 text-[15px]"
                  >
                    <span className="text-cream/85">
                      {c.title}
                      {c.anchor && <span className="ml-1.5 text-champagne">★</span>}
                      {c.status === "coming-soon" && (
                        <span className="ml-2 text-xs uppercase tracking-[0.14em] text-cream/40">soon</span>
                      )}
                    </span>
                    <span className="shrink-0 font-display tabular-nums text-cream/45">{inr(c.price)}</span>
                  </li>
                ))}
                <li className="flex items-baseline justify-between gap-4 border-y border-[color:var(--hairline-invert)] py-3 text-[15px]">
                  <span className="font-medium text-cream">Total value</span>
                  <span className="shrink-0 font-display tabular-nums text-champagne">{inr(total)}+</span>
                </li>
              </ul>
            </Reveal>
          </div>
        </section>

        {/* What comes with it — hairline numbered index */}
        <section className="px-4 py-20 sm:py-28" aria-labelledby="incl-heading">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <p className="text-kicker uppercase text-muted">What you get</p>
              <h2
                id="incl-heading"
                className="mt-4 max-w-2xl font-display font-medium text-ink [font-size:clamp(2rem,4.5vw,3.25rem)] [letter-spacing:-0.02em] [line-height:1.02]"
              >
                With every course, included
              </h2>
            </Reveal>
            <ul className="mt-12 border-b border-ink/10">
              {GUARANTEES.map((g, i) => (
                <li key={g.title}>
                  <Reveal delay={i * 0.04}>
                    <div className="grid grid-cols-[2.5rem_1fr] items-baseline gap-4 border-t border-ink/10 py-5 sm:grid-cols-[3rem_1fr_16rem] sm:gap-6">
                      <span aria-hidden className="font-display text-lg tabular-nums text-champagne">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-lg font-medium text-ink sm:text-xl">{g.title}</span>
                      <span className="col-start-2 mt-1 text-sm text-inkText/70 sm:col-start-3 sm:mt-0 sm:text-right">
                        {g.desc}
                      </span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
            <Reveal>
              <p className="mt-8 text-sm text-inkText/60">
                Some courses aren&rsquo;t shot yet — with the bundle, they&rsquo;re automatically yours the moment they
                launch.
              </p>
            </Reveal>
          </div>
        </section>

        <Faq />

        <section className="border-t border-ink/10 px-4 py-16 text-center">
          <Reveal>
            <h2 className="font-display font-medium text-2xl text-ink sm:text-3xl">Rather start with just one course?</h2>
            <p className="mt-3 text-sm text-inkText/70">
              No problem —{" "}
              <Link href="/start" className="text-ink underline decoration-magenta decoration-1 underline-offset-4">
                find your course in 2 questions
              </Link>
              .
            </p>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
