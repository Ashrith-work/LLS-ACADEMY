import Link from "next/link";
import { DELIVERABLES, STORY, TESTIMONIALS, SITE } from "@/lib/data/site";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Trust + proof — deliberately on the warm BONE canvas: calm, credible,
 * restrained. This is where scepticism gets answered, so the colour
 * temperature drops and the copy gets concrete.
 */
export function ProofSection() {
  return (
    <section className="on-light bg-[#F1EAD9] py-16 text-inkText sm:py-24" aria-labelledby="proof-heading">
      <div className="mx-auto max-w-6xl px-4">
        {/* Shashank's story */}
        <Reveal>
          <h2 id="proof-heading" className="max-w-2xl font-display font-semibold text-3xl leading-tight sm:text-4xl">
            {STORY.headline}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {STORY.beats.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.05}>
              <div className="border-l border-ember pl-4">
                <h3 className="font-semibold">{b.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-inkText/70">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-8 text-sm text-inkText/60">
            Full story →{" "}
            <Link href="/about" className="font-semibold underline">
              About Shashank
            </Link>
          </p>
        </Reveal>

        {/* Testimonials — real voices, real places. TODO: replace samples. */}
        <Reveal>
          <h2 className="mt-20 font-display font-semibold text-3xl sm:text-4xl">They did it. Why can&rsquo;t you?</h2>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.05}>
              <figure className="flex h-full flex-col rounded-2xl border border-ink/10 bg-card p-6 shadow-cardLift">
                <blockquote className="flex-1 text-[15px] leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 border-t border-ink/10 pt-3 text-sm">
                  <span className="font-semibold">{t.name}</span>
                  <span className="text-inkText/60"> · {t.place}</span>
                  <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.18em] text-ember">{t.result}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* What you get — concrete deliverables replace the missing refund promise. */}
        <Reveal>
          <h2 className="mt-20 font-display font-semibold text-3xl sm:text-4xl">With every course, guaranteed:</h2>
          <p className="mt-2 max-w-xl text-sm text-inkText/60">
            No refund policy — so here&rsquo;s exactly what you get. Not a promise, a list.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DELIVERABLES.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.04}>
              <div className="h-full rounded-2xl border border-ink/10 bg-card p-5 shadow-cardLift">
                <p className="font-semibold">{d.title}</p>
                <p className="mt-1 text-sm text-inkText/70">{d.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 text-center text-sm text-inkText/60">
            We&rsquo;ve already reached {SITE.instagramReach} people — now the courses take you deeper.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
