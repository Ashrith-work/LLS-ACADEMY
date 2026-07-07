import type { Metadata } from "next";
import Link from "next/link";
import { TopBar } from "@/components/layout/TopBar";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { BUNDLE, catalogueValue, valueStack, TOTAL_COUNT, LIVE_COUNT } from "@/lib/data/courses";
import { DELIVERABLES } from "@/lib/data/site";
import { inr } from "@/lib/utils";
import { Faq } from "@/components/home/Faq";

export const metadata: Metadata = {
  title: `All-Access — all ${TOTAL_COUNT} courses, lifetime`,
  description: `One payment for all ${TOTAL_COUNT} courses — sales, communication, business, career. Lifetime access, new courses free.`,
};

/**
 * All-access bundle page. Value-stack ordering: premium anchors FIRST so
 * the first number seen is high and the total feels huge. Gold = premium.
 * Lifetime framing throughout — it dissolves the completion-fear.
 */
export default function AllAccessPage() {
  const stack = valueStack();
  const total = catalogueValue();

  return (
    <>
      <TopBar />
      <main className="bg-ink">
        <section className="px-4 pb-16 pt-14 text-center sm:pt-20">
          <Reveal>
            <p className="mx-auto mb-4 w-fit rounded-full bg-gold/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gold">
              One-time payment · lifetime access
            </p>
            <h1 className="mx-auto max-w-3xl font-display text-4xl leading-[1.1] text-cream sm:text-5xl">
              One <span className="text-gold">decision</span> to learn it all.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-muted">
              All {TOTAL_COUNT} courses ({LIVE_COUNT} live, the rest land in your library automatically the moment they launch).
              No deadline to finish — lifetime means lifetime.
            </p>
          </Reveal>
        </section>

        {/* The full stack — premium first. */}
        <section className="px-4 pb-16">
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <div className="rounded-3xl border border-gold/30 bg-surface p-6 sm:p-8">
                <ul className="divide-y divide-cream/10">
                  {stack.map((c) => (
                    <li key={c.id} className="flex items-baseline justify-between gap-4 py-2.5 text-sm">
                      <span className="text-cream">
                        {c.title}
                        {c.anchor && <span className="ml-1.5 text-gold">★</span>}
                        {c.status === "coming-soon" && <span className="ml-1.5 text-xs text-muted">(coming soon)</span>}
                      </span>
                      <span className="shrink-0 text-muted">{inr(c.price)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-baseline justify-between border-t-2 border-gold/40 pt-5">
                  <span className="font-semibold text-cream">Total value</span>
                  <span className="font-display text-2xl text-gold">{inr(total)}+</span>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="font-semibold text-cream">All-access price</span>
                  {/* The shock number — lime. */}
                  <span className="font-display text-4xl text-lime">{inr(BUNDLE.price)}</span>
                </div>
                <div className="mt-7">
                  <ButtonLink href="/checkout?item=all-access" variant="gold" size="lg" className="w-full">
                    Get all-access →
                  </ButtonLink>
                </div>
                <p className="mt-4 text-center text-xs text-muted">
                  Secure payment via Razorpay · instant access to everything live
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* What comes with it. */}
        <section className="on-light bg-bone py-16 text-inkText">
          <div className="mx-auto max-w-4xl px-4">
            <Reveal>
              <h2 className="text-center font-display text-3xl">With every course, you also get:</h2>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {DELIVERABLES.map((d, i) => (
                <Reveal key={d.title} delay={i * 0.04}>
                  <div className="h-full rounded-2xl bg-white/60 p-5">
                    <p className="font-semibold">{d.title}</p>
                    <p className="mt-1 text-sm text-inkText/70">{d.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <p className="mt-8 text-center text-sm text-inkText/60">
                Some courses aren't shot yet — with the bundle, they're automatically yours the moment they launch.
              </p>
            </Reveal>
          </div>
        </section>

        <Faq />

        <section className="px-4 py-16 text-center">
          <Reveal>
            <h2 className="font-display text-2xl text-cream">Rather start with just one course?</h2>
            <p className="mt-2 text-sm text-muted">
              No problem —{" "}
              <Link href="/start" className="text-cream underline">
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
