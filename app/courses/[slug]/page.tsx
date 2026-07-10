import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COURSES, getCourse, effectivePrice, FOUNDING_PRICING } from "@/lib/data/courses";
import { GUARANTEES, TESTIMONIALS, STORY } from "@/lib/data/site";
import { GuaranteeIcon } from "@/components/ui/GuaranteeIcon";
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
      <header className="bg-bone px-4 py-4">
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
            <p className={cn("mb-4 text-xs font-semibold uppercase tracking-[0.18em]", styles.text)}>
              {comingSoon ? "Coming soon · gauging demand" : "Recorded course · lifetime access"}
            </p>
            <h1 className="font-display text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl">{course.hook}</h1>
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
            <section className="on-light bg-bone py-16 text-inkText sm:py-20">
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
                  <figure className="mt-10 rounded-2xl border border-ink/10 bg-card p-6 shadow-cardLift">
                    <blockquote className="text-[15px] leading-relaxed">
                      &ldquo;{TESTIMONIALS[0].quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-3 text-sm">
                      <span className="font-semibold">{TESTIMONIALS[0].name}</span>
                      <span className="text-inkText/60"> · {TESTIMONIALS[0].city}</span>
                    </figcaption>
                  </figure>
                </Reveal>
              </div>
            </section>

            {/* 3 · Concrete deliverables. */}
            <section className="py-16 sm:py-20">
              <div className="mx-auto max-w-3xl px-4">
                <Reveal>
                  <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Exactly what's in this course:</h2>
                </Reveal>
                <ul className="mt-8 space-y-3">
                  {course.whatYouGet.map((w, i) => (
                    <Reveal key={w} delay={i * 0.04}>
                      <li className="flex items-start gap-3 rounded-xl border border-ink/10 bg-card px-5 py-4">
                        <span className={cn("mt-0.5 font-bold", styles.text)} aria-hidden>
                          ✓
                        </span>
                        <span className="text-inkText">{w}</span>
                      </li>
                    </Reveal>
                  ))}
                </ul>
                <Reveal>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {GUARANTEES.slice(0, 4).map((d) => (
                      <div key={d.title} className="rounded-xl border border-ink/10 bg-surface px-5 py-4">
                        <GuaranteeIcon name={d.icon} className="mb-2 h-4 w-4 text-ember" />
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
                  <div className="rounded-2xl border border-ink/10 bg-card p-8 text-center shadow-cardLift">
                    {founding && (
                      <p className="mb-3 inline-block rounded-full border border-ink/10 bg-gold px-3 py-0.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink">
                        Founding price — limited batch
                      </p>
                    )}
                    <div className="flex items-baseline justify-center gap-3">
                      {founding && <span className="text-lg text-muted line-through">{inr(course.price)}</span>}
                      {/* The big number — lime, reserved for this moment. */}
                      <p className="font-display text-5xl font-semibold text-lime">{inr(price)}</p>
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
