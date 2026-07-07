import type { Metadata } from "next";
import { TopBar } from "@/components/layout/TopBar";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { STORY, SITE } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Shashank's story — not a guru, someone who struggled just like you",
  description:
    "Engineering → sales floor → Luxury Escapes regional director → IIM Lucknow → bootstrapped founder. Shashank's journey, told honestly.",
};

/**
 * About — authenticity over polish. The story reads like a timeline of
 * struggle, not a highlight reel. Bone canvas: calm, credible.
 */
export default function AboutPage() {
  return (
    <>
      <TopBar />
      <main>
        <section className="bg-ink px-4 py-16 text-center sm:py-24">
          <Reveal>
            {/* TODO: real photo of Shashank via next/image — candid, not studio-polished. */}
            <div
              className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full border-2 border-ember/50 bg-card font-display text-3xl text-ember"
              aria-hidden
            >
              S
            </div>
            <h1 className="mx-auto max-w-2xl font-display text-4xl leading-[1.1] text-cream sm:text-5xl">
              {STORY.headline}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-muted">
              {SITE.instagramReach} people reached — but the story started small, just like yours.
            </p>
          </Reveal>
        </section>

        <section className="on-light bg-bone py-16 text-inkText sm:py-24">
          <div className="mx-auto max-w-2xl px-4">
            <ol className="relative space-y-12 border-l-2 border-ember/40 pl-8">
              {STORY.beats.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.05}>
                  <li className="relative">
                    <span
                      className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-2 border-ember bg-bone"
                      aria-hidden
                    />
                    <h2 className="font-display text-xl">{b.title}</h2>
                    <p className="mt-2 leading-relaxed text-inkText/75">{b.body}</p>
                  </li>
                </Reveal>
              ))}
            </ol>

            <Reveal>
              <div className="mt-16 rounded-3xl bg-inkText p-8 text-center text-bone">
                <h2 className="font-display text-2xl">Now it's your turn.</h2>
                <p className="mt-3 text-sm text-bone/70">
                  2 questions — we'll show you the right course for your goal. 30 seconds.
                </p>
                <div className="mt-6">
                  <ButtonLink href="/start" variant="primary" size="lg">
                    Find your course →
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
