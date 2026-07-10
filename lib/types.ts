/** Shared domain types — the single vocabulary for the whole site. */

export type LaneId = "sell" | "brand" | "grow";

export type CourseStatus = "live" | "coming-soon";

export interface Lane {
  id: LaneId;
  /** Goal phrased as the buyer's job, not the topic. */
  label: string;
  /** Tinglish sub-line shown on lane rows + router cards. */
  hook: string;
  /** Tailwind-safe accent classes are derived in lib/utils.ts from this token. */
  accent: "ember" | "violet" | "teal";
}

export interface Course {
  id: string; // slug, used in routes: /courses/[id]
  title: string;
  lane: LaneId;
  /** Regular price in ₹ (whole rupees). */
  price: number;
  /** Optional founding-member price — shown when FOUNDING_PRICING is on. */
  foundingPrice?: number;
  /** ★ lane anchor → the "start here" course of its lane. */
  anchor?: boolean;
  /** The signature flagship (Live Life Shameless). */
  signature?: boolean;
  status: CourseStatus;
  /** One line that sells the JOB (money / status / escape) — never the topic. */
  hook: string;
  /** Short supporting description, natural Tinglish. */
  description: string;
  /** Concrete deliverables — trust is earned by specifics, not promises. */
  whatYouGet: string[];
  /** Placeholder thumbnail gradient seed (no real images yet). TODO: replace with real thumbnails. */
  thumb: { from: string; to: string };
}

/**
 * Short vertical teaser video for a course. A projection of the published
 * rows from the `reels` Postgres table (supabase/migrations/…_reels.sql):
 * the query filters is_published and orders by sort_order, so the app never
 * sees those columns. `courseSlug` matches a Course.id (the route slug).
 */
export type Reel = {
  id: string;
  title: string;
  hook: string;
  courseSlug: string;
  videoUrl: string | null;
  posterUrl: string | null;
  captionsUrl: string | null;
  durationSeconds: number | null;
  ctaLabel: string;
};

export interface Testimonial {
  /** Telugu/Tinglish quote. */
  quote: string;
  name: string;
  city: string;
  outcome: string;
}

/** One concrete thing every buyer gets — shown with a lucide icon. */
export interface Guarantee {
  title: string;
  desc: string;
  /** lucide-react icon name, e.g. "award" (see components/ui/GuaranteeIcon). */
  icon: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

/** Goal-router answer shape — this IS the research dataset. */
export interface RouterAnswers {
  goal: LaneId;
  stage: "student" | "working" | "running" | "skipped";
  blocker: "freeze" | "how" | "time" | "confidence" | "skipped";
}
