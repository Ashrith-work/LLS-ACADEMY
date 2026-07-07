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
        <section className="bg-bone px-4 py-16 text-center sm:py-24">
          <Reveal>
            {/* TODO: real photo of Shashank via next/image — candid, not studio-polished. */}
            <div
              className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full border border-ink/10 bg-card font-display font-semibold text-3xl text-ember shadow-brutal"
              aria-hidden
            >
              S
            </div>
            <h1 className="mx-auto max-w-2xl font-display font-semibold text-4xl leading-[1.1] text-ink sm:text-5xl">
              {STORY.headline}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-inkSoft">
              {SITE.instagramReach} people reached — but the story started small, just like yours.
            </p>
          </Reveal>
        </section>

        <section className="on-light border-t border-ink/10 bg-bone py-16 text-inkText sm:py-24">
          <div className="mx-auto max-w-2xl px-4">
            <ol className="relative space-y-12 border-l border-ink/10 pl-8">
              {STORY.beats.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.05}>
                  <li className="relative">
                    <span
                      className="absolute -left-[42px] top-1 h-4 w-4 rounded-full border border-ink/10 bg-ember"
                      aria-hidden
                    />
                    <h2 className="font-display font-semibold text-xl">{b.title}</h2>
                    <p className="mt-2 leading-relaxed text-inkText/75">{b.body}</p>
                  </li>
                </Reveal>
              ))}
            </ol>

            <Reveal>
              <div className="mt-16 rounded-2xl border border-ink/10 bg-surface p-8 text-center text-ink shadow-brutal">
                <h2 className="font-display font-semibold text-2xl">Now it's your turn.</h2>
                <p className="mt-3 text-sm text-inkSoft">
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
