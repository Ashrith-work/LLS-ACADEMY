"use client";

import Link from "next/link";
import { LANES } from "@/lib/data/courses";
import type { Lane, LaneId } from "@/lib/types";
import { Reveal } from "@/components/ui/Reveal";
import { track } from "@/lib/tracking";

/**
 * GoalEntry — a launcher-style radial goal picker.
 *
 * A central hub ("Prove them wrong") ringed by circular icon nodes, one per
 * goal, spaced EVENLY around a faint ring: angle per node = 360 / count, so the
 * layout is driven by the LANES list (add a lane → it re-spaces automatically).
 * No spokes — just the hub, the faint ring, and the nodes.
 *
 * Each node is a Link to /start?goal=…. Radial layout is tablet/desktop only;
 * mobile falls back to a simple vertical stack so nothing overlaps.
 */

const BG = "#F1EAD9"; // warm earthy sand / tan
const SURFACE = "#FBFAF7"; // near-white raised surface (card/surface token)

/* Subtle earthy texture layered over the cream base:
   a faint fractal-noise film grain (inline SVG, no asset) blended in soft-light,
   plus two soft warm radial washes (ochre top-left, olive bottom-right). Kept low
   enough that the launcher hub + nodes stay fully legible. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.65'/%3E%3C/svg%3E\")";
const BG_IMAGE = `${GRAIN}, radial-gradient(1200px 600px at 15% 8%, rgba(192,144,47,0.10), transparent 60%), radial-gradient(1000px 700px at 85% 92%, rgba(95,122,30,0.09), transparent 60%)`;
const BG_BLEND = "soft-light, normal, normal";

/* Earthy launcher palette — clay/ochre/olive earth tones on cream limestone. */
const ACCENT: Record<LaneId, string> = {
  sell: "#C0902F", // golden ochre
  brand: "#8B5E3C", // warm brown
  grow: "#5F7A1E", // rich olive
};
const HUB = "#B0492B"; // terracotta rust hub accent (ring + "wrong" + hub halo)

/* Geometry — all derived from one stage size so the ring stays circular and fits. */
const STAGE = "min(72vw, 560px, 58vh)";
const R = `calc(${STAGE} * 0.46)`; // node orbit radius
const RING = `calc(${STAGE} * 0.92)`; // faint ring diameter (= 2R)
const HUB_SIZE = `calc(${STAGE} * 0.52)`; // hub diameter

/* Per-goal icon (stroke = currentColor, tinted by each node's accent). */
function GoalIcon({ id }: { id: LaneId }) {
  const common = {
    width: 38,
    height: 38,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (id === "sell") {
    // trending-up
    return (
      <svg {...common}>
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M17 7h4v4" />
      </svg>
    );
  }
  if (id === "brand") {
    // star
    return (
      <svg {...common}>
        <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L5.5 9.7l5.9-.9L12 3.5z" />
      </svg>
    );
  }
  // grow — sprout
  return (
    <svg {...common}>
      <path d="M12 20v-8" />
      <path d="M12 12c0-3 2.5-5 6-5 0 3-2.5 5-6 5z" />
      <path d="M12 13c0-2.5-2-4.5-5-4.5 0 2.5 2 4.5 5 4.5z" />
    </svg>
  );
}

export function GoalEntry() {
  const focus =
    "outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-[#F1EAD9]";

  return (
    <section
      className="flex min-h-[90vh] items-center py-16 sm:py-24"
      style={{ backgroundColor: BG, backgroundImage: BG_IMAGE, backgroundBlendMode: BG_BLEND }}
      aria-label="Choose your goal"
    >
      <div className="mx-auto w-full max-w-6xl px-4">
        {/* ── Mobile (<md): vertical stack ── */}
        <div className="grid gap-4 md:hidden">
          {LANES.map((lane, i) => (
            <Reveal key={lane.id} delay={i * 0.08}>
              <MobileGoal lane={lane} focus={focus} />
            </Reveal>
          ))}
        </div>

        {/* ── Tablet / desktop (md+): radial launcher ── */}
        <div className="hidden justify-center md:flex">
          <div className="relative" style={{ width: STAGE, height: STAGE }}>
            {/* Faint ring the nodes sit on. */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/15"
              style={{ width: RING, height: RING }}
            />

            {/* Center hub — earthy text on a soft cream disc that fades into the page,
                raised above the orbit so passing node labels tuck behind it cleanly. */}
            <div
              className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
              style={{
                width: HUB_SIZE,
                height: HUB_SIZE,
                background: "radial-gradient(circle, #F1EAD9 52%, rgba(241,234,217,0) 72%)",
              }}
            >
              <p className="px-3 text-center font-display text-5xl font-bold leading-[1.02] sm:text-6xl" style={{ color: "#4A3319" }}>
                Prove them{" "}
                <span className="italic" style={{ color: HUB }}>
                  wrong
                </span>
              </p>
            </div>

            {/* Node ring — orbits slowly around the hub; each node counter-rotates
                at the same rate so its icon + label stay upright. */}
            <div className="absolute inset-0 origin-center motion-safe:animate-orbit">
              {LANES.map((lane, i) => {
                const angle = (360 / LANES.length) * i; // 0 = top, clockwise
                return (
                  <div
                    key={lane.id}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      // centre on hub → rotate to angle → push out by R → un-rotate so the node stays upright
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(calc(${R} * -1)) rotate(${-angle}deg)`,
                    }}
                  >
                    <div className="origin-center motion-safe:animate-orbit-counter">
                      <RadialNode lane={lane} focus={focus} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A round icon button + label beneath — the whole thing is the link. */
function RadialNode({ lane, focus }: { lane: Lane; focus: string }) {
  const accent = ACCENT[lane.id];
  return (
    <Link
      href={`/start?goal=${lane.id}`}
      aria-label={lane.label}
      onClick={() => track("router_goal_chosen", { goal: lane.id, from: "home" })}
      className={`group flex w-[172px] flex-col items-center gap-2 rounded-2xl px-1 py-1 transition duration-200 ${focus}`}
    >
      <span
        className="relative flex h-[112px] w-[112px] items-center justify-center rounded-full border border-black/5 shadow-glow transition-all duration-200 group-hover:-translate-y-1 group-hover:brightness-110 motion-reduce:transform-none"
        style={{
          backgroundColor: accent, // earthy filled circle
          color: SURFACE, // cream icon (currentColor)
        }}
      >
        <GoalIcon id={lane.id} />
        {/* accent ring that fades in on hover (kept as a sibling so we don't fight inline styles) */}
        <span
          aria-hidden
          className="pointer-events-none absolute h-[112px] w-[112px] rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ boxShadow: `0 0 0 2px ${accent}, 0 0 22px ${accent}66` }}
        />
      </span>
      <span
        className="text-center font-display text-base font-semibold leading-tight text-inkSoft transition-colors duration-200 group-hover:text-ink"
      >
        {lane.label}
      </span>
    </Link>
  );
}

/** Mobile fallback — a simple stacked card with the same icon + accent. */
function MobileGoal({ lane, focus }: { lane: Lane; focus: string }) {
  const accent = ACCENT[lane.id];
  return (
    <Link
      href={`/start?goal=${lane.id}`}
      onClick={() => track("router_goal_chosen", { goal: lane.id, from: "home" })}
      className={`group flex items-center gap-4 rounded-2xl border border-ink/10 p-4 shadow-glow transition duration-200 motion-safe:hover:-translate-y-1 ${focus}`}
      style={{ backgroundColor: SURFACE }}
    >
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-black/5"
        style={{ backgroundColor: accent, color: SURFACE }}
      >
        <GoalIcon id={lane.id} />
      </span>
      <span className="min-w-0">
        <span className="block font-display text-lg font-semibold text-ink">{lane.label}</span>
        <span className="mt-0.5 block text-sm text-muted">{lane.hook}</span>
      </span>
    </Link>
  );
}
