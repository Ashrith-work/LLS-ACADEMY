"use client";

import Link from "next/link";
import { LANES } from "@/lib/data/courses";
import type { Lane, LaneId } from "@/lib/types";
import { Reveal } from "@/components/ui/Reveal";
import { track } from "@/lib/tracking";

/**
 * GoalEntry — the goal router's front door, as a radial "orbital" layout.
 *
 * A central hub ("Prove them wrong") with the three goals arranged around it on
 * a ring — Sell better (north), Build your brand (east), Grow in career & life
 * (west). South stays empty. Each goal is a Link to /start?goal=… (unchanged).
 *
 * The radial layout is tablet/desktop only (md+). On mobile it falls back to the
 * original vertical stack so nothing overlaps or overflows.
 *
 * Colours mirror the hero's per-track palette (already used in Hero.tsx) plus the
 * global dark theme-colour (#0E0E14 from app/layout.tsx) — no new colours here.
 */

const BG = "#0E0E14"; // global dark theme colour (app/layout.tsx viewport.themeColor)

/** Per-lane accent — mirrors the hero track palette in Hero.tsx. */
const ACCENT: Record<LaneId, string> = {
  sell: "#FF5A36", // persimmon
  brand: "#F0468B", // magenta / hot pink accent
  grow: "#1DC98C", // emerald
};

/** Compass placement around the hub (south intentionally left empty). */
const COMPASS: Record<LaneId, "north" | "east" | "west"> = {
  sell: "north",
  brand: "east",
  grow: "west",
};

/** Ring anchor points as [left%, top%] on the square stage (radius = 36%). */
const POINT: Record<"north" | "east" | "west", { left: number; top: number }> = {
  north: { left: 50, top: 14 },
  east: { left: 86, top: 50 },
  west: { left: 14, top: 50 },
};

export function GoalEntry() {
  return (
    <section
      className="border-y border-white/10 py-16 sm:py-24"
      style={{ backgroundColor: BG }}
      aria-labelledby="goal-entry-heading"
    >
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <h2
            id="goal-entry-heading"
            className="text-center font-display text-3xl font-semibold text-white sm:text-5xl"
          >
            What do you want?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-center text-sm text-white/60 sm:text-base">
            Pick one goal — we ask 2 questions and show you the right course.
          </p>
        </Reveal>

        {/* ── Mobile (<md): original vertical stacked layout ── */}
        <div className="mt-10 grid gap-4 md:hidden">
          {LANES.map((lane, i) => (
            <Reveal key={lane.id} delay={i * 0.08}>
              <GoalCard lane={lane} />
            </Reveal>
          ))}
        </div>

        {/* ── Tablet / desktop (md+): radial orbital layout ── */}
        <div className="mt-10 hidden justify-center md:flex">
          <div
            className="relative"
            style={{ width: "min(78vw, 620px)", height: "min(78vw, 620px)" }}
          >
            {/* Ring + connector spokes (single crisp SVG, scales with the stage). */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 h-full w-full"
              aria-hidden
            >
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="none"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="0.4"
                strokeDasharray="2 3"
                strokeLinecap="round"
                className="motion-safe:animate-spin-medium"
                style={{ transformBox: "view-box", transformOrigin: "center" }}
              />
              {(["north", "east", "west"] as const).map((dir) => (
                <line
                  key={dir}
                  x1="50"
                  y1="50"
                  x2={POINT[dir].left}
                  y2={POINT[dir].top}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="0.3"
                />
              ))}
            </svg>

            {/* Center hub. */}
            <div
              className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15"
              style={{
                width: "40%",
                height: "40%",
                backgroundColor: "rgba(255,255,255,0.03)",
                boxShadow: `0 0 70px ${ACCENT.brand}26`, // faint magenta halo
              }}
            >
              <p className="px-5 text-center font-display text-xl font-semibold leading-tight text-white sm:text-2xl">
                Prove them{" "}
                <span className="italic" style={{ color: ACCENT.brand }}>
                  wrong
                </span>
              </p>
            </div>

            {/* Goals seated on the ring. */}
            {LANES.map((lane) => {
              const { left, top } = POINT[COMPASS[lane.id]];
              return (
                <div
                  key={lane.id}
                  className="absolute w-[220px] max-w-[42vw] -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${left}%`, top: `${top}%` }}
                >
                  <GoalCard lane={lane} radial />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/** A single goal — one component, two presentations (radial chip vs stacked card). */
function GoalCard({ lane, radial = false }: { lane: Lane; radial?: boolean }) {
  const accent = ACCENT[lane.id];
  const focus =
    "outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E0E14]";

  if (radial) {
    return (
      <Link
        href={`/start?goal=${lane.id}`}
        onClick={() => track("router_goal_chosen", { goal: lane.id, from: "home" })}
        className={`group flex flex-col items-center gap-1 rounded-2xl px-3 py-2 text-center transition duration-200 motion-safe:hover:-translate-y-1 ${focus}`}
      >
        <span
          aria-hidden
          className="mb-1 h-2.5 w-2.5 rounded-full transition-transform duration-200 group-hover:scale-125"
          style={{ backgroundColor: accent, boxShadow: `0 0 14px ${accent}` }}
        />
        <span
          className="font-display text-lg font-semibold text-white underline-offset-4 group-hover:underline"
          style={{ textDecorationColor: accent }}
        >
          {lane.label}
        </span>
        <span className="max-w-[220px] text-xs leading-snug text-white/55">{lane.hook}</span>
      </Link>
    );
  }

  // Mobile: original card structure (accent bar → title → hook → CTA), dark-themed.
  return (
    <Link
      href={`/start?goal=${lane.id}`}
      onClick={() => track("router_goal_chosen", { goal: lane.id, from: "home" })}
      className={`group flex h-full flex-col rounded-2xl border border-white/10 p-6 transition duration-200 motion-safe:hover:-translate-y-1 ${focus}`}
      style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
    >
      <span className="mb-4 h-3 w-12 rounded-full" style={{ backgroundColor: accent }} aria-hidden />
      <h3 className="font-display text-xl font-semibold text-white">{lane.label}</h3>
      <p className="mt-2 flex-1 text-sm text-white/60">{lane.hook}</p>
      <span
        className="mt-5 text-xs font-semibold uppercase tracking-[0.18em]"
        style={{ color: accent }}
      >
        Choose this goal <span className="inline-block transition group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}
