import { ButtonLink } from "@/components/ui/Button";

/**
 * Hero — clean, centered editorial statement on limestone.
 * One headline, one line of support, one action, and a scroll cue.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[86vh] flex-col items-center justify-center overflow-hidden bg-bone px-5 py-24 text-center sm:px-4">
      <div className="mx-auto flex max-w-4xl flex-col items-center">
        <h1 className="font-display text-5xl font-semibold leading-[1.04] text-ink sm:text-7xl lg:text-8xl">
          Learn Without Limits.
        </h1>

        <p className="mt-6 max-w-lg text-base text-inkSoft sm:text-lg">
          Practical courses that help you build real skills.
        </p>

        <div className="mt-10">
          <ButtonLink href="/#courses" variant="primary" size="lg">
            Explore Courses
          </ButtonLink>
        </div>
      </div>

      {/* Scroll cue — nudges the eye toward the course lanes below. */}
      <a
        href="#courses"
        aria-label="Scroll to courses"
        className="group absolute bottom-7 right-5 inline-flex flex-col items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted transition hover:text-ink sm:right-8 sm:text-xs"
      >
        Scroll
        <span className="motion-safe:animate-bounce" aria-hidden>
          ↓
        </span>
      </a>
    </section>
  );
}
