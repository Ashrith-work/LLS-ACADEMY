import type { Reel } from "@/lib/types";
import { getCourse } from "@/lib/data/courses";

/**
 * ─────────────────────────────────────────────────────────────────
 * Reels — short vertical teaser videos, each pointing at a course.
 *
 * SEED / source of truth while the catalog is static TS. Rows here are
 * treated as already published, in display order (top → bottom).
 *
 * The `reels` Postgres table (supabase/migrations/20260710000000_reels.sql)
 * has is_published + sort_order; the query does the filtering/ordering, so
 * the app-level Reel type omits them. Moving to Supabase is a drop-in:
 *   const { data } = await supabase.from('reels').select('*')
 *     .eq('is_published', true).order('sort_order');
 * map the snake_case rows to Reel and delete the REELS array below.
 *
 * videoUrl currently points at TEMPORARY public sample clips (generic,
 * landscape — the 9:16 player center-crops them) purely so playback is
 * visible. TODO: replace every videoUrl below with the real vertical footage;
 * set it back to null to fall back to the poster + CTA.
 * ─────────────────────────────────────────────────────────────────
 */
export const REELS: Reel[] = [
  {
    id: "reel-shameless",
    title: "Stop caring what they think",
    hook: "The fear of judgment is what keeps your life small. Here's the first crack in it.",
    courseSlug: "live-life-shameless",
    videoUrl: "https://download.samplelib.com/mp4/sample-30s.mp4", // TODO: temporary demo clip
    posterUrl: null,
    captionsUrl: null,
    durationSeconds: 30,
    ctaLabel: "Start the signature course",
  },
  {
    id: "reel-selling",
    title: "Selling isn't being pushy",
    hook: "It's a system — from the cold open to the close. 60 seconds on the first move.",
    courseSlug: "art-of-selling",
    videoUrl: "https://download.samplelib.com/mp4/sample-15s.mp4", // TODO: temporary demo clip
    posterUrl: null,
    captionsUrl: null,
    durationSeconds: 15,
    ctaLabel: "Start course",
  },
  {
    id: "reel-communication",
    title: "Stop being overlooked",
    hook: "Clarity beats fluency. The one shift that makes a room actually listen to you.",
    courseSlug: "art-of-communication",
    videoUrl: "https://download.samplelib.com/mp4/sample-10s.mp4", // TODO: temporary demo clip
    posterUrl: null,
    captionsUrl: null,
    durationSeconds: 10,
    ctaLabel: "Start course",
  },
  {
    id: "reel-personal-brand",
    title: "Your name should be an asset",
    hook: "Not fame — trust. How a small-town account grew to 3.8M reach, from zero.",
    courseSlug: "build-a-personal-brand",
    videoUrl: "https://download.samplelib.com/mp4/sample-20s.mp4", // TODO: temporary demo clip
    posterUrl: null,
    captionsUrl: null,
    durationSeconds: 20,
    ctaLabel: "Start course",
  },
  {
    id: "reel-business",
    title: "You don't need lakhs to start",
    hook: "Clarity matters more than capital. The first customer comes before the funding.",
    courseSlug: "start-business-minimum-money",
    videoUrl: "https://download.samplelib.com/mp4/sample-5s.mp4", // TODO: temporary demo clip
    posterUrl: null,
    captionsUrl: null,
    durationSeconds: 5,
    ctaLabel: "Start course",
  },
  {
    id: "reel-interview",
    title: "Rejection isn't about talent",
    hook: "It's about preparation. How to answer 'tell me about yourself' so it lands.",
    courseSlug: "crack-an-interview",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", // TODO: temporary demo clip
    posterUrl: null,
    captionsUrl: null,
    durationSeconds: 6,
    ctaLabel: "Start course",
  },
];

/* ── Derived helpers ─────────────────────────────────────────── */

/**
 * Published reels in display order. In the static seed that's just the array
 * order; against Supabase it's the filtered/ordered query result.
 */
export const getPublishedReels = (): Reel[] => REELS;

/** The course a reel links to (may be undefined if the slug is stale). */
export const reelCourse = (reel: Reel) => getCourse(reel.courseSlug);

/** mm:ss for a reel's duration, or "" when unknown. */
export const reelDuration = (reel: Reel): string => {
  const s = reel.durationSeconds;
  if (!s || s <= 0) return "";
  const m = Math.floor(s / 60);
  const sec = String(s % 60).padStart(2, "0");
  return `${m}:${sec}`;
};

/**
 * Poster background for a reel: its own posterUrl if set, otherwise the linked
 * course's gradient thumb (so cards always look intentional, never empty).
 */
export const reelPoster = (reel: Reel): { image?: string; gradient?: string } => {
  if (reel.posterUrl) return { image: reel.posterUrl };
  const course = reelCourse(reel);
  if (course) return { gradient: `linear-gradient(160deg, ${course.thumb.from}, ${course.thumb.to})` };
  return { gradient: "linear-gradient(160deg, #2A1410, #1E1C28)" };
};
