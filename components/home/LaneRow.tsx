"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Lane } from "@/lib/types";
import { coursesByLane } from "@/lib/data/courses";
import { LANE_STYLES, cn } from "@/lib/utils";
import { CourseCard } from "@/components/course/CourseCard";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Lane row as a 3D "coverflow" carousel that auto-rotates one card at a time.
 *
 * One FIXED center slot — cards animate THROUGH it. Active card sits center
 * (full size, upright); previous peeks left, next peeks right (smaller, tilted,
 * dimmed). Transform-only (all cards absolutely positioned in one track, so the
 * centre never moves). Layout is a RING (circular delta) so autoplay loops
 * seamlessly — the wrap happens in the hidden zone and its transform transition
 * is skipped so nothing sweeps across the stage.
 *
 * Same data + same CourseCard as before — only layout/animation changed.
 * Centre click opens the course (the card's own link); side click centres it.
 * Autoplay pauses on hover/focus and is disabled under prefers-reduced-motion.
 */
export function LaneRow({ lane }: { lane: Lane }) {
  const styles = LANE_STYLES[lane.id];
  const courses = [...coursesByLane(lane.id)].sort((a, b) =>
    a.status === b.status ? Number(!!b.anchor) - Number(!!a.anchor) : a.status === "live" ? -1 : 1,
  );
  const n = courses.length;

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [compact, setCompact] = useState(false);
  const [reduced, setReduced] = useState(false);
  const dragX = useRef<number | null>(null);
  const prevDeltas = useRef<number[]>([]);

  // Environment-aware tuning (mobile offsets + reduced motion).
  useEffect(() => {
    const mqCompact = window.matchMedia("(max-width: 640px)");
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setCompact(mqCompact.matches);
      setReduced(mqReduced.matches);
    };
    sync();
    mqCompact.addEventListener("change", sync);
    mqReduced.addEventListener("change", sync);
    return () => {
      mqCompact.removeEventListener("change", sync);
      mqReduced.removeEventListener("change", sync);
    };
  }, []);

  // Autoplay — advance one card at a time; resets on every change so manual
  // nav also gets a full interval. Paused on hover/focus and under reduced motion.
  useEffect(() => {
    if (paused || reduced || n <= 1) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % n), 3200);
    return () => clearTimeout(id);
  }, [active, paused, reduced, n]);

  const go = (i: number) => setActive(((i % n) + n) % n);
  const next = () => setActive((a) => (a + 1) % n);
  const prev = () => setActive((a) => (a - 1 + n) % n);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
  }

  // Horizontal swipe / drag on touch + pointer.
  function onPointerDown(e: React.PointerEvent) { dragX.current = e.clientX; }
  function onPointerUp(e: React.PointerEvent) {
    if (dragX.current == null) return;
    const dx = e.clientX - dragX.current;
    dragX.current = null;
    if (dx <= -40) next();
    else if (dx >= 40) prev();
  }

  // Coverflow targets. translateX values are % of the card's own width.
  const OFFSET = compact ? 44 : 58; // neighbour peek
  const FAR = compact ? 82 : 95;
  const NEIGHBOR_SCALE = 0.82;
  const TILT = reduced ? 0 : 18;
  const DURATION = reduced ? 200 : 420;

  const cx = (x: number) => (x === 0 ? "-50%" : x < 0 ? `calc(-50% - ${-x}%)` : `calc(-50% + ${x}%)`);

  // Circular (ring) delta: nearest signed distance to the active index.
  const deltas = courses.map((_, i) => {
    let d = ((i - active) % n + n) % n; // 0..n-1
    if (d > n / 2) d -= n; // shift far cards to the negative side
    return d;
  });
  // A card whose delta jumped by more than 1 wrapped around the ring — skip its
  // transform transition so it repositions instantly instead of sweeping across.
  const wrapped = deltas.map((d, i) => {
    const p = prevDeltas.current[i];
    return p != null && Math.abs(d - p) > 1;
  });
  useEffect(() => {
    prevDeltas.current = deltas;
  });

  function slotStyle(delta: number, skip: boolean): React.CSSProperties {
    let x = 0, scale = 1, rot = 0, opacity = 1, z = 30;
    if (delta === 0) { z = 30; }
    else if (delta === -1) { x = -OFFSET; scale = NEIGHBOR_SCALE; rot = TILT; opacity = 0.55; z = 20; }
    else if (delta === 1) { x = OFFSET; scale = NEIGHBOR_SCALE; rot = -TILT; opacity = 0.55; z = 20; }
    else if (delta < 0) { x = -FAR; scale = 0.7; rot = TILT; opacity = 0; z = 10; }
    else { x = FAR; scale = 0.7; rot = -TILT; opacity = 0; z = 10; }
    return {
      transform: `translate(${cx(x)}, -50%) scale(${scale}) rotateY(${rot}deg)`,
      opacity,
      zIndex: z,
      transition: skip
        ? `opacity ${DURATION}ms ease`
        : `transform ${DURATION}ms cubic-bezier(0.22,0.61,0.36,1), opacity ${DURATION}ms ease`,
      pointerEvents: (Math.abs(delta) <= 1 ? "auto" : "none") as "auto" | "none",
    };
  }

  return (
    <Reveal>
      <section aria-labelledby={`lane-${lane.id}`} className="py-6">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-4 flex items-baseline gap-3">
            <span className={cn("h-3 w-3 rounded-full", styles.bg)} aria-hidden />
            <h2 id={`lane-${lane.id}`} className="font-display text-xl font-semibold text-ink sm:text-2xl">
              {lane.label}
            </h2>
          </div>
          <p className="mb-5 text-sm text-muted">{lane.hook}</p>

          {/* Coverflow stage — fixed centre, cards animate through it. */}
          <div
            role="group"
            aria-roledescription="carousel"
            aria-label={`${lane.label} courses`}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            className="relative h-[400px] select-none rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-bone"
            style={{ perspective: "1200px", touchAction: "pan-y" }}
          >
            {courses.map((c, i) => {
              const delta = deltas[i];
              const isCenter = delta === 0;
              const clickable = Math.abs(delta) === 1;
              return (
                <div
                  key={c.id}
                  className="absolute left-1/2 top-1/2 w-64 sm:w-72"
                  style={slotStyle(delta, wrapped[i])}
                  aria-hidden={!isCenter}
                >
                  {/* Card unchanged. Non-centre cards are inert (centre stays interactive).
                      `inert` isn't in React 18's DOM types yet, so cast it on. */}
                  <div {...((isCenter ? {} : { inert: "" }) as Record<string, unknown>)} className={isCenter ? "" : "pointer-events-none"}>
                    <CourseCard course={c} from={`home-lane-${lane.id}`} showStartHere />
                  </div>

                  {/* Side cards: transparent control to bring this card to centre. */}
                  {clickable && (
                    <button
                      type="button"
                      onClick={() => go(i)}
                      aria-label={`Show ${c.title}`}
                      className="absolute inset-0 z-10 cursor-pointer rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Controls — prev / counter / next */}
          <div className="mt-5 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous course"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink transition hover:-translate-y-0.5 hover:border-ink/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              <ChevronLeft size={18} aria-hidden />
            </button>
            <span className="min-w-[3.5rem] text-center text-sm tabular-nums text-muted" aria-live="polite">
              {active + 1} / {n}
            </span>
            <button
              type="button"
              onClick={next}
              aria-label="Next course"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink transition hover:-translate-y-0.5 hover:border-ink/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              <ChevronRight size={18} aria-hidden />
            </button>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
