import Link from "next/link";
import { GUARANTEES, STORY, TESTIMONIALS } from "@/lib/data/site";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Trust arc, three distinct rhythms:
 *  4 · Founder story — magazine feature, chaptered timeline with oversized numerals.
 *  5 · Testimonials — large serif pull-quotes, small-caps attribution (not cards).
 *  6 · Guarantees — an elegant hairline-separated index (not icon boxes).
 */
export function ProofSection() {
  return (
    <>
      {/* 4 — Founder story */}
      <section className="bg-white py-20 sm:py-28" aria-labelledby="story-heading">
        <div className="mx-auto max-w-4xl px-4">
          <Reveal>
            <p className="text-kicker uppercase text-muted">The founder</p>
            <h2
              id="story-heading"
              className="mt-4 max-w-2xl font-display font-medium text-ink [font-size:clamp(2rem,4.5vw,3.25rem)] [letter-spacing:-0.02em] [line-height:1.04]"
            >
              {STORY.headline}
            </h2>
          </Reveal>

          <ol className="mt-14 border-b border-ink/10">
            {STORY.beats.map((b, i) => (
              <li key={b.title}>
                <Reveal delay={i * 0.05}>
                  <div className="grid grid-cols-[auto_1fr] gap-6 border-t border-ink/10 py-8 sm:gap-10">
                    <span
                      aria-hidden
                      className="font-display text-champagne [font-size:clamp(2.25rem,5vw,3.75rem)] [line-height:0.9]"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="max-w-xl">
                      <h3 className="font-display text-xl font-medium text-ink sm:text-2xl">{b.title}</h3>
                      <p className="mt-2 text-inkText/75">{b.body}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal>
            <p className="mt-10 text-sm text-inkText/60">
              Full story →{" "}
              <Link
                href="/about"
                className="font-medium text-ink underline decoration-magenta decoration-1 underline-offset-4"
              >
                About Shashank
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* 5 — Testimonials */}
      <section className="bg-white py-20 sm:py-28" aria-labelledby="proof-heading">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <p className="text-kicker uppercase text-muted">Proof</p>
            <h2
              id="proof-heading"
              className="mt-4 max-w-2xl font-display font-medium text-ink [font-size:clamp(2rem,4.5vw,3.25rem)] [letter-spacing:-0.02em] [line-height:1.02]"
            >
              They did it. Why can&rsquo;t you?
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-x-12 gap-y-14 sm:grid-cols-2">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={(i % 2) * 0.08}>
                <figure className="border-t border-ink/10 pt-6">
                  <blockquote className="font-display text-pullquote font-medium text-ink [text-wrap:balance]">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 text-kicker uppercase text-muted">
                    <span className="text-ink">{t.name}</span>
                    <span className="mx-2 text-ink/30">·</span>
                    {t.city}
                    <span className="mx-2 text-ink/30">·</span>
                    <span className="text-champagne">{t.outcome}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Guarantees */}
      <section className="bg-white py-20 sm:py-28" aria-labelledby="guarantees-heading">
        <div className="mx-auto max-w-4xl px-4">
          <Reveal>
            <p className="text-kicker uppercase text-muted">What you get</p>
            <h2
              id="guarantees-heading"
              className="mt-4 max-w-2xl font-display font-medium text-ink [font-size:clamp(2rem,4.5vw,3.25rem)] [letter-spacing:-0.02em] [line-height:1.02]"
            >
              With every course, guaranteed
            </h2>
            <p className="mt-4 max-w-xl text-standfirst text-inkText/70">
              No refund policy — so here&rsquo;s exactly what you get. Not a promise, a list.
            </p>
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
        </div>
      </section>
    </>
  );
}
