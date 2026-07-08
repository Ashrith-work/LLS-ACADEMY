import Link from "next/link";
import { LANES, TOTAL_COUNT } from "@/lib/data/courses";
import type { LaneId } from "@/lib/types";
import { HeroParticles } from "./HeroParticles";

/** Fresh, punchy track colours — persimmon / hot-pink / emerald pop on the dark hero. */
const TRACK_COLOR: Record<LaneId, string> = {
  sell: "#FF5A36", // persimmon
  brand: "#F0468B", // hot pink
  grow: "#1DC98C", // emerald
};

/**
 * Hero — a dark, full-bleed statement for the ones who got counted out.
 * Kicker → heavy wide-tracked headline → one-line promise → two CTAs → scroll cue.
 * The colour tracks sit on the left; stacked below the CTAs on small screens.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-5 py-28 text-center sm:px-4">
      {/* Full-bleed cinematic backdrop — layered gradient + gold glow + film grain + vignette.
          TODO: to use a real photo instead, add `style={{ backgroundImage: "url(/hero.jpg)" }}`
          with `bg-cover bg-center` to the base layer below (keep the glow/grain/vignette on top). */}
      <div className="absolute inset-0 -z-10 bg-ink" aria-hidden>
        {/* base cinematic gradient */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(120% 95% at 50% 0%, #2c241b 0%, #171310 55%, #0c0908 100%)" }}
        />
        {/* warm gold spotlight, upper-left */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(55% 55% at 22% 16%, rgba(231,178,75,0.22) 0%, rgba(231,178,75,0) 60%)" }}
        />
        {/* WebGL spiral-galaxy particle field (desktop only; gated in HeroParticles) */}
        <HeroParticles />
        {/* film grain */}
        <div
          className="absolute inset-0 opacity-[0.14] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "160px 160px",
          }}
        />
        {/* contrast vignette */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(100% 100% at 50% 38%, transparent 52%, rgba(0,0,0,0.6) 100%)" }}
        />
      </div>

      {/* Orbit ring encircling the headline — decorative, desktop only. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white/60 md:block"
        style={{ width: "min(78vh, 600px)", height: "min(78vh, 600px)", boxShadow: "0 0 40px rgba(255,255,255,0.15)" }}
      />

      {/* Direction labels orbiting the headline — North / West / East. Link to their track sections. Desktop only. */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {/* North → Self Better */}
        <Link
          href="/#lane-sell"
          className="pointer-events-auto absolute left-1/2 top-[19%] -translate-x-1/2 whitespace-nowrap rounded-full border px-5 py-2 font-display text-sm font-bold uppercase tracking-[0.1em] transition-all duration-200 hover:-translate-y-1 hover:brightness-110"
          style={{ color: "#FF5A36", borderColor: "rgba(255,90,54,0.45)" }}
        >
          Self Better
        </Link>
        {/* West → Build your Brand */}
        <Link
          href="/#lane-brand"
          className="pointer-events-auto absolute left-[6%] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-5 py-2 font-display text-sm font-bold uppercase tracking-[0.1em] transition-all duration-200 hover:-translate-y-1 hover:brightness-110"
          style={{ color: "#F0468B", borderColor: "rgba(240,70,139,0.45)" }}
        >
          Build your Brand
        </Link>
        {/* East → Grow in career & life */}
        <Link
          href="/#lane-grow"
          className="pointer-events-auto absolute right-[6%] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-5 py-2 font-display text-sm font-bold uppercase tracking-[0.1em] transition-all duration-200 hover:-translate-y-1 hover:brightness-110"
          style={{ color: "#1DC98C", borderColor: "rgba(29,201,140,0.45)" }}
        >
          Grow in career &amp; life
        </Link>
      </div>

      {/* Course tracks — colour pills pinned top-left on large screens. */}
      <nav
        aria-label="Course tracks"
        className="mb-12 flex flex-col items-center gap-3 xl:absolute xl:left-8 xl:top-28 xl:mb-0 xl:items-start 2xl:left-14"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">Tracks</span>
        {LANES.map((lane) => (
          <Link
            key={lane.id}
            href={`/#lane-${lane.id}`}
            style={{ backgroundColor: TRACK_COLOR[lane.id] }}
            className="rounded-full px-5 py-2.5 font-display text-sm font-bold uppercase tracking-[0.06em] text-white shadow-[0_8px_22px_-8px_rgba(0,0,0,0.65)] ring-1 ring-white/15 transition-all duration-200 hover:-translate-y-1 hover:scale-[1.06] hover:brightness-110"
          >
            {lane.label}
          </Link>
        ))}
      </nav>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/[.66] sm:text-xs">
          For the ones who got counted out
        </p>

        <h1 className="mt-6 font-display text-5xl font-black uppercase leading-[1.02] tracking-[0.04em] text-white sm:text-7xl sm:tracking-[0.06em] lg:text-8xl">
          Prove them wrong
        </h1>

        <p className="mt-7 max-w-xl text-base text-white/[.82] sm:text-lg">
          Real skills, plain English, and the push to actually use them.
        </p>

        <div className="mt-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
          <Link
            href="/start"
            style={{ backgroundColor: "#E7B24B" }}
            className="rounded-full px-8 py-4 text-base font-semibold text-ink transition-all hover:-translate-y-0.5 hover:brightness-95"
          >
            Start learning
          </Link>
          <Link
            href="/#courses"
            className="rounded-full border border-white/40 px-8 py-4 text-base font-medium text-white transition-all hover:-translate-y-0.5 hover:border-white"
          >
            Browse {TOTAL_COUNT} courses
          </Link>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#courses"
        aria-label="Scroll to courses"
        className="group absolute bottom-7 left-1/2 inline-flex -translate-x-1/2 flex-col items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 transition hover:text-white xl:left-auto xl:right-8 xl:translate-x-0"
      >
        Scroll
        <span className="motion-safe:animate-bounce" aria-hidden>
          ↓
        </span>
      </a>
    </section>
  );
}
