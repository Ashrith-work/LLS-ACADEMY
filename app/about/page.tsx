import type { Metadata } from "next";
import Link from "next/link";
import { TopBar } from "@/components/layout/TopBar";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { STORY, SITE } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Shashank's story — not a guru, someone who struggled just like you",
  description:
    "Engineering → sales floor → Luxury Escapes regional director → IIM Lucknow → bootstrapped founder. Shashank's journey, told honestly.",
};

/**
 * About — a magazine feature. Authenticity over polish: a chaptered timeline of
 * struggle with oversized champagne numerals, not a highlight reel.
 */
export default function AboutPage() {
  return (
    <>
      <TopBar />
      <main className="bg-paper">
        {/* Editorial hero — left-aligned. */}
        <section className="px-4 pt-16 sm:pt-24" aria-labelledby="about-heading">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <p className="text-kicker uppercase text-muted">The founder</p>
              <h1
                id="about-heading"
                className="mt-4 max-w-3xl font-display font-medium text-ink [font-size:clamp(2.5rem,6vw,5rem)] [letter-spacing:-0.02em] [line-height:1.02]"
              >
                {STORY.headline}
              </h1>
              <p className="mt-6 max-w-xl text-standfirst text-inkText/75">
                {SITE.instagramReach} people reached — but the story started small, just like yours.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Chaptered timeline. */}
        <section className="px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl">
            <ol className="border-b border-ink/10">
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
                        <h2 className="font-display text-xl font-medium text-ink sm:text-2xl">{b.title}</h2>
                        <p className="mt-2 leading-relaxed text-inkText/75">{b.body}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Close — dark chapter CTA. */}
        <section className="bg-bone px-4 py-20 text-cream sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <h2 className="font-display font-medium [font-size:clamp(2rem,4.5vw,3.25rem)] [letter-spacing:-0.02em] [line-height:1.04]">
                Now it&rsquo;s your turn.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-cream/70">
                Two questions — we&rsquo;ll show you the right course for your goal. Thirty seconds.
              </p>
              <Link
                href="/start"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-ember px-8 py-4 font-semibold text-accentFg shadow-btn transition-all duration-300 hover:-translate-y-0.5 hover:bg-ember-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-bone"
              >
                Find your course <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
