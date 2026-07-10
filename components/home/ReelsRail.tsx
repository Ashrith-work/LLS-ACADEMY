"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Reel } from "@/lib/types";
import { getPublishedReels, reelCourse, reelDuration, reelPoster } from "@/lib/data/reels";
import { track } from "@/lib/tracking";

/**
 * Reels: a horizontal rail of vertical (9:16) teaser cards. Tapping one opens a
 * full-screen player — real footage autoplays when a reel has a videoUrl; until
 * then it shows the poster with the course CTA. Keyboard: ← → to move, Esc to close.
 *
 * Data comes from lib/data/reels.ts (shaped like the `reels` table), so wiring
 * Supabase later needs no change here.
 */
export function ReelsRail() {
  const reels = getPublishedReels();
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const move = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i == null ? i : (i + dir + reels.length) % reels.length)),
    [reels.length],
  );

  // Body scroll lock + keyboard nav while the player is open.
  useEffect(() => {
    if (open == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") move(1);
      else if (e.key === "ArrowLeft") move(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, move]);

  if (reels.length === 0) return null;

  const openReel = (i: number) => {
    setOpen(i);
    track("reel_opened", { reelId: reels[i].id, courseId: reels[i].courseSlug });
  };

  return (
    <section id="reels" aria-labelledby="reels-heading" className="bg-mist py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 max-w-2xl sm:mb-10">
          <p className="text-kicker uppercase text-muted">In motion</p>
          <h2
            id="reels-heading"
            className="mt-4 font-display font-medium text-ink [font-size:clamp(2rem,4.5vw,3.25rem)] [letter-spacing:-0.02em] [line-height:1.02]"
          >
            A taste of the teaching
          </h2>
          <p className="mt-4 text-standfirst text-inkText/75">One idea, one minute. Tap any card to watch.</p>
        </div>

        <ul
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Course reels"
        >
          {reels.map((reel, i) => (
            <li key={reel.id} className="shrink-0 snap-start">
              <ReelCard reel={reel} onOpen={() => openReel(i)} />
            </li>
          ))}
        </ul>
      </div>

      {open != null && (
        <ReelPlayer reel={reels[open]} onClose={close} onPrev={() => move(-1)} onNext={() => move(1)} />
      )}
    </section>
  );
}

function ReelCard({ reel, onOpen }: { reel: Reel; onOpen: () => void }) {
  const poster = reelPoster(reel);
  const dur = reelDuration(reel);

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Play reel: ${reel.title}`}
      className="group relative block aspect-[9/16] w-[168px] overflow-hidden rounded-2xl border border-ink/10 shadow-cardLift transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-bone sm:w-[190px]"
      style={poster.image ? undefined : { background: poster.gradient }}
    >
      {poster.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      )}

      {/* Legibility scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/25" aria-hidden />

      {/* Play affordance */}
      <span
        className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-[#170b0f] shadow-glow transition-transform group-hover:scale-110"
        aria-hidden
      >
        <Play size={20} className="translate-x-[1px]" fill="currentColor" />
      </span>

      {dur && (
        <span className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-medium tabular-nums text-cream">
          {dur}
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 p-3 text-left">
        <h3 className="font-display text-sm font-semibold leading-snug text-cream">{reel.title}</h3>
      </div>
    </button>
  );
}

function ReelPlayer({
  reel,
  onClose,
  onPrev,
  onNext,
}: {
  reel: Reel;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const poster = reelPoster(reel);
  const course = reelCourse(reel);
  const dur = reelDuration(reel);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={reel.title}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close reel"
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 text-cream transition hover:bg-cream/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
      >
        <X size={20} aria-hidden />
      </button>

      {/* Prev / Next (desktop) */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous reel"
        className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream transition hover:bg-cream/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream sm:flex"
      >
        <ChevronLeft size={22} aria-hidden />
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next reel"
        className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream transition hover:bg-cream/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream sm:flex"
      >
        <ChevronRight size={22} aria-hidden />
      </button>

      {/* Vertical frame — stop propagation so clicks inside don't close */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative aspect-[9/16] h-[86vh] max-h-[86vh] max-w-[92vw] overflow-hidden rounded-2xl bg-[#0c0507] shadow-brutalLg"
        style={poster.image || reel.videoUrl ? undefined : { background: poster.gradient }}
      >
        {reel.videoUrl ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            key={reel.id}
            src={reel.videoUrl}
            poster={poster.image}
            className="h-full w-full object-cover"
            autoPlay
            muted
            playsInline
            controls
          >
            {reel.captionsUrl && <track kind="captions" src={reel.captionsUrl} default />}
          </video>
        ) : (
          <>
            {poster.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={poster.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
            )}
            {/* No footage yet — honest placeholder, CTA still routes to the course. */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream/90 text-[#170b0f] shadow-glow">
                <Play size={26} className="translate-x-[1px]" fill="currentColor" />
              </span>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-cream/70">
                Full preview coming soon
              </p>
            </div>
          </>
        )}

        {/* Caption + CTA overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-5">
          {dur && (
            <span className="mb-2 inline-block rounded-full bg-cream/15 px-2 py-0.5 text-[11px] font-medium tabular-nums text-cream">
              {dur}
            </span>
          )}
          <h3 className="font-display text-lg font-semibold leading-snug text-cream">{reel.title}</h3>
          <p className="mt-1 text-sm text-cream/80">{reel.hook}</p>
          {course && (
            <Link
              href={`/courses/${course.id}`}
              onClick={() => track("reel_cta_clicked", { reelId: reel.id, courseId: course.id })}
              className="pointer-events-auto mt-3 inline-flex items-center gap-1.5 rounded-full bg-cream px-4 py-2 text-sm font-medium text-[#170b0f] transition hover:-translate-y-0.5"
            >
              {reel.ctaLabel}
              <span aria-hidden>→</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
