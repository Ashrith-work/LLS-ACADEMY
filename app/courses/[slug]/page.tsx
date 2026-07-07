import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COURSES, getCourse, effectivePrice, FOUNDING_PRICING } from "@/lib/data/courses";
import { DELIVERABLES, TESTIMONIALS, STORY } from "@/lib/data/site";
import { inr, LANE_STYLES, cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { WaitlistForm } from "@/components/course/WaitlistForm";
import { CourseCta } from "./CourseCta";
import { Faq } from "@/components/home/Faq";

/**
 * Dedicated single-course landing page — the CONVERSION template.
 * Ad traffic lands here: one offer, minimal header, no nav, no other
 * prices anywhere. Structure is the trust arc — job-hook, story, proof,
 * deliverables, THEN price, then a single CTA.
 */

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const course = getCourse(params.slug);
  if (!course) return {};
  return {
    title: course.title,
    description: course.hook,
    openGraph: { title: `${course.title} — Live Life Shameless`, description: course.hook },
  };
}

export default function CoursePage({ params }: { params: { slug: string } }) {
  const course = getCourse(params.slug);
  if (!course) notFound();

  const styles = LANE_STYLES[course.lane];
  const comingSoon = course.status === "coming-soon";
  const price = effectivePrice(course);
  const founding = FOUNDING_PRICING && course.foundingPrice;

  return (
    <>
      {/* Minimal header — logo only. A conversion page has one exit: buy. */}
      <header className="bg-ink px-4 py-4">
        <Link href="/" className="font-display text-sm text-cream">
          LIVE LIFE <span className="text-ember">SHAMELESS</span>
        </Link>
      </header>

      <main className="bg-ink">
        {/* 1 · The job, not the topic. No price in sight. */}
        <section className="relative overflow-hidden px-4 pb-16 pt-12 sm:pb-24 sm:pt-20">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-72 opacity-40 blur-3xl"
            style={{ background: `radial-gradient(ellipse at top, ${course.thumb.to}, transparent 70%)` }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-3xl text-center">
            <p className={cn("mb-4 text-xs font-semibold uppercase tracking-wider", styles.text)}>
              {comingSoon ? "Coming soon · demand validate chestunnam" : "Recorded course · Tinglish · lifetime access"}
            </p>
            <h1 className="font-display text-4xl leading-[1.1] text-cream sm:text-5xl">{course.hook}</h1>
            <p className="mx-auto mt-5 max-w-xl text-base text-muted sm:text-lg">{course.description}</p>
            {!comingSoon && (
              <p className="mt-8 text-sm text-muted">
                ↓ Mundu chudandi em untundo — <span className="text-cream">taruvatha decide cheyyandi</span>
              </p>
            )}
          </div>
        </section>

        {comingSoon ? (
          /* Coming-soon: the entire pitch becomes "join the waitlist". */
          <section className="px-4 pb-24">
            <div className="mx-auto max-w-xl rounded-3xl border border-cream/15 bg-card p-8 text-center">
              <h2 className="font-display text-2xl text-cream">Ee course meeku kavala?</h2>
              <p className="mt-3 text-sm text-muted">
                Interest chupinchandi — waitlist strong ga unte ee course ni fast ga shoot chestam. Launch price kuda
                waitlist vaallake first.
              </p>
              <div className="mt-6">
                <WaitlistForm courseId={course.id} />
              </div>
            </div>
          </section>
        ) : (
          <>
            {/* 2 · Who's teaching — proof on the calm bone canvas. */}
            <section className="on-light bg-bone py-16 text-inkText sm:py-20">
              <div className="mx-auto max-w-3xl px-4">
                <Reveal>
                  <h2 className="font-display text-2xl sm:text-3xl">{STORY.headline}</h2>
                  <p className="mt-4 leading-relaxed text-inkText/75">
                    {STORY.beats[1].body} {STORY.beats[3].body}
                  </p>
                  <p className="mt-3 text-sm text-inkText/60">
                    Full story →{" "}
                    <Link href="/about" className="font-semibold underline">
                      About Shashank
                    </Link>
                  </p>
                </Reveal>

                {/* One relevant testimonial — not a wall. TODO: map per-course testimonials. */}
                <Reveal>
                  <figure className="mt-10 rounded-2xl border border-inkText/10 bg-white/60 p-6">
                    <blockquote className="text-[15px] leading-relaxed">
                      &ldquo;{TESTIMONIALS[0].quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-3 text-sm">
                      <span className="font-semibold">{TESTIMONIALS[0].name}</span>
                      <span className="text-inkText/60"> · {TESTIMONIALS[0].place}</span>
                    </figcaption>
                  </figure>
                </Reveal>
              </div>
            </section>

            {/* 3 · Concrete deliverables. */}
            <section className="py-16 sm:py-20">
              <div className="mx-auto max-w-3xl px-4">
                <Reveal>
                  <h2 className="font-display text-2xl text-cream sm:text-3xl">Ee course lo exact ga:</h2>
                </Reveal>
                <ul className="mt-8 space-y-3">
                  {course.whatYouGet.map((w, i) => (
                    <Reveal key={w} delay={i * 0.04}>
                      <li className="flex items-start gap-3 rounded-2xl border border-cream/10 bg-card px-5 py-4">
                        <span className={cn("mt-0.5 font-bold", styles.text)} aria-hidden>
                          ✓
                        </span>
                        <span className="text-cream/90">{w}</span>
                      </li>
                    </Reveal>
                  ))}
                </ul>
                <Reveal>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {DELIVERABLES.slice(0, 4).map((d) => (
                      <div key={d.title} className="rounded-2xl bg-surface px-5 py-4">
                        <p className="text-sm font-semibold text-cream">{d.title}</p>
                        <p className="mt-1 text-xs text-muted">{d.detail}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </section>

            {/* 4 · NOW the price — trust has been built above it. */}
            <section className="px-4 pb-8">
              <div className="mx-auto max-w-xl">
                <Reveal>
                  <div className={cn("rounded-3xl border-2 bg-card p-8 text-center", styles.border)}>
                    {founding && (
                      <p className="mb-1 text-xs font-bold uppercase tracking-wider text-gold">
                        Founding price — limited batch
                      </p>
                    )}
                    <div className="flex items-baseline justify-center gap-3">
                      {founding && <span className="text-lg text-muted line-through">{inr(course.price)}</span>}
                      {/* The big number — lime, reserved for this moment. */}
                      <p className="font-display text-5xl text-lime">{inr(price)}</p>
                    </div>
                    <p className="mt-2 text-sm text-muted">One-time · lifetime access · anni updates free</p>
                    <div className="mt-7">
                      <CourseCta courseId={course.id} />
                    </div>
                    <p className="mt-4 text-xs text-muted">
                      Secure payment via Razorpay · UPI / cards / netbanking · instant access
                    </p>
                  </div>
                </Reveal>
              </div>
            </section>

            {/* 5 · Objections, answered. */}
            <Faq />
          </>
        )}

        <footer className="border-t border-cream/10 px-4 py-8 text-center text-xs text-muted">
          © StartupWithShashank ·{" "}
          <Link href="/terms" className="underline hover:text-cream">
            Terms &amp; refund policy
          </Link>
        </footer>
      </main>
    </>
  );
}
