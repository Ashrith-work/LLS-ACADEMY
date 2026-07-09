"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Lane } from "@/lib/types";
import { coursesByLane } from "@/lib/data/courses";
import { LANE_STYLES, cn } from "@/lib/utils";
import { CourseCard } from "@/components/course/CourseCard";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Lane row as a 3D "coverflow" carousel.
 *
 * One FIXED center slot — cards animate THROUGH it. The active card sits center
 * (full size, upright); the previous card peeks left and the next peeks right
 * (smaller, tilted inward, dimmed). Everything is transform-only (no layout
 * shift): all cards are absolutely positioned in the same track, so the centre
 * never moves — only the transforms change.
 *
 * Same data + same CourseCard as before — only the layout/animation changed.
 * Center click opens the course (the card's own link); side click centres it.
 */
export function LaneRow({ lane }: { lane: Lane }) {
  const styles = LANE_STYLES[lane.id];
  const courses = [...coursesByLane(lane.id)].sort((a, b) =>
    a.status === b.status ? Number(!!b.anchor) - Number(!!a.anchor) : a.status === "live" ? -1 : 1,
  );

  const [active, setActive] = useState(0);
  const [compact, setCompact] = useState(false);
  const [reduced, setReduced] = useState(false);
  const dragX = useRef<number | null>(null);

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

  const last = courses.length - 1;
  const go = (i: number) => setActive((prev) => Math.min(last, Math.max(0, i)));
  const next = () => go(active + 1);
  const prev = () => go(active - 1);

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

  function slot(delta: number) {
    let x = 0, scale = 1, rot = 0, opacity = 1, z = 30, clickable = false, isCenter = false;
    if (delta === 0) { isCenter = true; z = 30; }
    else if (delta === -1) { x = -OFFSET; scale = NEIGHBOR_SCALE; rot = TILT; opacity = 0.55; z = 20; clickable = true; }
    else if (delta === 1) { x = OFFSET; scale = NEIGHBOR_SCALE; rot = -TILT; opacity = 0.55; z = 20; clickable = true; }
    else if (delta < 0) { x = -FAR; scale = 0.7; rot = TILT; opacity = 0; z = 10; }
    else { x = FAR; scale = 0.7; rot = -TILT; opacity = 0; z = 10; }
    return {
      isCenter,
      clickable,
      style: {
        transform: `translate(${cx(x)}, -50%) scale(${scale}) rotateY(${rot}deg)`,
        opacity,
        zIndex: z,
        transition: `transform ${DURATION}ms cubic-bezier(0.22,0.61,0.36,1), opacity ${DURATION}ms ease`,
        pointerEvents: (Math.abs(delta) <= 1 ? "auto" : "none") as "auto" | "none",
      } as React.CSSProperties,
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
            className="relative h-[400px] select-none rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-bone"
            style={{ perspective: "1200px", touchAction: "pan-y" }}
          >
            {courses.map((c, i) => {
              const delta = i - active;
              const { style, isCenter, clickable } = slot(delta);
              return (
                <div
                  key={c.id}
                  className="absolute left-1/2 top-1/2 w-64 sm:w-72"
                  style={style}
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
              disabled={active === 0}
              aria-label="Previous course"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink transition hover:border-ink/60 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              <ChevronLeft size={18} aria-hidden />
            </button>
            <span className="min-w-[3.5rem] text-center text-sm tabular-nums text-muted" aria-live="polite">
              {active + 1} / {courses.length}
            </span>
            <button
              type="button"
              onClick={next}
              disabled={active === last}
              aria-label="Next course"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink transition hover:border-ink/60 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              <ChevronRight size={18} aria-hidden />
            </button>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
