import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COURSES, getCourse, effectivePrice, FOUNDING_PRICING } from "@/lib/data/courses";
import { GUARANTEES, TESTIMONIALS, STORY } from "@/lib/data/site";
import { GuaranteeIcon } from "@/components/ui/GuaranteeIcon";
import { inr } from "@/lib/utils";
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

  const comingSoon = course.status === "coming-soon";
  const price = effectivePrice(course);
  const founding = FOUNDING_PRICING && course.foundingPrice;

  return (
    <>
      {/* Minimal header — logo only. A conversion page has one exit: buy. */}
      <header className="bg-mist px-4 py-4">
        <Link href="/" className="font-display text-sm text-ink">
          LIVE LIFE <span className="text-ember">SHAMELESS</span>
        </Link>
      </header>

      <main className="bg-bone/75">
        {/* 1 · The job, not the topic. No price in sight. */}
        <section className="relative overflow-hidden px-4 pb-16 pt-12 sm:pb-24 sm:pt-20">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-2"
            style={{ background: course.thumb.to }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="text-kicker uppercase text-support">
              {comingSoon ? "Coming soon · gauging demand" : "Recorded course · lifetime access"}
            </p>
            <h1 className="mt-4 font-display font-medium text-ink [font-size:clamp(2.5rem,6vw,5rem)] [letter-spacing:-0.02em] [line-height:1.02]">
              {course.hook}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base text-inkSoft sm:text-lg">{course.description}</p>
            {!comingSoon && (
              <p className="mt-8 text-sm text-inkSoft">
                ↓ See what's inside first — <span className="text-ink">then decide</span>
              </p>
            )}
          </div>
        </section>

        {comingSoon ? (
          /* Coming-soon: the entire pitch becomes "join the waitlist". */
          <section className="px-4 pb-24">
            <div className="mx-auto max-w-xl rounded-2xl border border-ink/10 bg-card p-8 text-center shadow-cardLift">
              <h2 className="font-display text-2xl font-semibold text-inkText">Want this course?</h2>
              <p className="mt-3 text-sm text-muted">
                Show your interest — a strong waitlist means we shoot this course faster. Waitlist members also
                get the launch price first.
              </p>
              <div className="mt-6">
                <WaitlistForm courseId={course.id} />
              </div>
            </div>
          </section>
        ) : (
          <>
            {/* 2 · Who's teaching — proof on the calm bone canvas. */}
            <section className="on-light bg-mist py-16 text-inkText sm:py-20">
              <div className="mx-auto max-w-3xl px-4">
                <Reveal>
                  <h2 className="font-display text-2xl font-semibold sm:text-3xl">{STORY.headline}</h2>
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
                  <figure className="mt-12 border-t border-ink/10 pt-6">
                    <blockquote className="font-display text-pullquote font-medium text-ink [text-wrap:balance]">
                      &ldquo;{TESTIMONIALS[0].quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-5 text-kicker uppercase text-support">
                      <span className="text-ink">{TESTIMONIALS[0].name}</span>
                      <span className="mx-2 text-ink/30">·</span>
                      {TESTIMONIALS[0].city}
                      <span className="mx-2 text-ink/30">·</span>
                      <span className="text-support">{TESTIMONIALS[0].outcome}</span>
                    </figcaption>
                  </figure>
                </Reveal>
              </div>
            </section>

            {/* 3 · Concrete deliverables. */}
            <section className="py-16 sm:py-20">
              <div className="mx-auto max-w-3xl px-4">
                <Reveal>
                  <p className="text-kicker uppercase text-support">What&rsquo;s inside</p>
                  <h2 className="mt-4 font-display font-medium text-ink [font-size:clamp(1.75rem,4vw,2.75rem)] [letter-spacing:-0.02em] [line-height:1.04]">
                    Exactly what&rsquo;s in this course
                  </h2>
                </Reveal>
                <ul className="mt-8 border-b border-ink/10">
                  {course.whatYouGet.map((w, i) => (
                    <li key={w}>
                      <Reveal delay={i * 0.04}>
                        <div className="flex items-baseline gap-4 border-t border-ink/10 py-4">
                          <span className="font-display text-support" aria-hidden>
                            —
                          </span>
                          <span className="text-inkText">{w}</span>
                        </div>
                      </Reveal>
                    </li>
                  ))}
                </ul>
                <Reveal>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {GUARANTEES.slice(0, 4).map((d) => (
                      <div key={d.title} className="rounded-xl border border-ink/10 bg-surface px-5 py-4">
                        <GuaranteeIcon name={d.icon} className="mb-2 h-4 w-4 text-support" />
                        <p className="text-sm font-semibold text-inkText">{d.title}</p>
                        <p className="mt-1 text-xs text-muted">{d.desc}</p>
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
                  <div className="border border-ink/15 bg-surface p-8 text-center">
                    {founding && (
                      <p className="mb-4 inline-block border border-champagne px-3 py-1 text-kicker uppercase text-champagne">
                        Founding price — limited batch
                      </p>
                    )}
                    <div className="flex items-baseline justify-center gap-3">
                      {founding && <span className="text-lg text-muted line-through">{inr(course.price)}</span>}
                      {/* The big number — champagne, reserved for this moment. */}
                      <p className="font-display tabular-nums font-semibold text-champagne [font-size:clamp(3rem,7vw,4.5rem)] [line-height:1]">
                        {inr(price)}
                      </p>
                    </div>
                    <p className="mt-2 text-sm text-muted">One-time · lifetime access · all updates free</p>
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

        <footer className="border-t border-line px-4 py-8 text-center text-xs text-inkSoft">
          © StartupWithShashank ·{" "}
          <Link href="/terms" className="underline hover:text-ink">
            Terms &amp; refund policy
          </Link>
        </footer>
      </main>
    </>
  );
}
