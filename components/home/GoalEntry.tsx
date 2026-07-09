"use client";

import Link from "next/link";
import { LANES } from "@/lib/data/courses";
import type { Lane, LaneId } from "@/lib/types";
import { Reveal } from "@/components/ui/Reveal";
import { track } from "@/lib/tracking";

/**
 * GoalEntry — hero with a 3D course carousel and goal shortcuts.
 *
 * The visual is a Spline "3D Carousel" (exported as a still). The source is a
 * white-framed render; we crop out the surrounding editor canvas via CSS and
 * drop the white into the page with `mix-blend-mode: multiply`, so the cream
 * shows through and the portraits pick up a warm, on-brand wash.
 *
 * Beneath it sit three small goal links (one per LANE) into /start?goal=… so the
 * hero keeps its click-through navigation even though the radial launcher is gone.
 */

const BG = "#F1EAD9"; // warm earthy sand / tan

/* Subtle earthy texture layered over the cream base:
   a faint fractal-noise film grain (inline SVG, no asset) blended in soft-light,
   plus two soft warm radial washes (ochre top-left, olive bottom-right). Kept low
   enough that the carousel + links stay fully legible. */
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
const HUB = "#B0492B"; // terracotta rust hub accent (the "wrong")

/* Carousel crop — the source render is 1000×476 with the scene framed in white.
   These show only that white frame (x 280–695, y 0–246), dropping the grey canvas. */
const CAROUSEL = {
  src: "/hero-carousel.jpg",
  aspect: "415 / 246", // crop width / height
  imgWidth: "240.96%", // 1000 / 415
  imgLeft: "-67.47%", // -280 / 415
};

/* Per-goal icon (stroke = currentColor, tinted by each link's accent). */
function GoalIcon({ id, size = 20 }: { id: LaneId; size?: number }) {
  const common = {
    width: size,
    height: size,
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
      <div className="mx-auto w-full max-w-5xl px-4">
        {/* Headline */}
        <Reveal>
          <h1
            className="text-center font-display text-5xl font-bold leading-[1.02] sm:text-6xl"
            style={{ color: "#4A3319" }}
          >
            Prove them{" "}
            <span className="italic" style={{ color: HUB }}>
              wrong
            </span>
          </h1>
        </Reveal>

        {/* 3D carousel — cropped to the scene frame, white multiplied into the cream. */}
        <Reveal delay={0.08}>
          <div
            className="relative mx-auto mt-8 w-full max-w-3xl overflow-hidden sm:mt-10"
            style={{ aspectRatio: CAROUSEL.aspect }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CAROUSEL.src}
              alt="A rotating 3D carousel of course cards"
              className="pointer-events-none absolute top-0 max-w-none select-none"
              style={{ width: CAROUSEL.imgWidth, left: CAROUSEL.imgLeft, mixBlendMode: "multiply" }}
            />
          </div>
        </Reveal>

        {/* Goal shortcuts — keep the click-through into /start?goal=… */}
        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:mt-12">
            {LANES.map((lane) => (
              <GoalLink key={lane.id} lane={lane} focus={focus} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** A small pill link — accent icon chip + label — into the goal's start flow. */
function GoalLink({ lane, focus }: { lane: Lane; focus: string }) {
  const accent = ACCENT[lane.id];
  return (
    <Link
      href={`/start?goal=${lane.id}`}
      onClick={() => track("router_goal_chosen", { goal: lane.id, from: "home" })}
      className={`group flex items-center gap-2.5 rounded-full border border-ink/10 bg-[#FBFAF7] px-4 py-2.5 shadow-glow transition duration-200 motion-safe:hover:-translate-y-0.5 hover:brightness-[1.03] ${focus}`}
    >
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/5"
        style={{ backgroundColor: accent, color: "#FBFAF7" }}
      >
        <GoalIcon id={lane.id} size={18} />
      </span>
      <span className="font-display text-sm font-semibold text-ink">{lane.label}</span>
    </Link>
  );
}
