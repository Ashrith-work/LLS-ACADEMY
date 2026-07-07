/**
 * Analytics — every meaningful action funnels through track().
 *
 * The goal-router answer distribution IS the business's Telugu-audience
 * dataset: which goal, which stage, which blocker. Treat these events as
 * first-class product data, not vanity analytics.
 *
 * TODO: wire a real analytics backend. Options, in order of effort:
 *   1. PostHog (recommended — free tier, funnels + event properties out of the box)
 *   2. Google Analytics 4 via gtag("event", event, props)
 *   3. A simple POST to /api/track that appends to a sheet/Supabase table
 * Keep the event names below stable — dashboards will be built on them.
 */

export type TrackEvent =
  | "router_opened"
  | "router_goal_chosen" // props: { goal }
  | "router_stage_answered" // props: { goal, stage }
  | "router_blocker_answered" // props: { goal, stage, blocker }
  | "router_question_skipped" // props: { step }
  | "signup_gate_shown"
  | "signup_completed" // props: { method: "google" | "email" | "phone" | "dev-bypass" }
  | "path_shown" // props: { goal, stage, blocker, recommended }
  | "course_cta_clicked" // props: { courseId, from }
  | "bundle_cta_clicked" // props: { from }
  | "express_checkout_clicked"
  | "checkout_started" // props: { courseId | bundle, option }
  | "checkout_option_changed" // props: { option }
  | "payment_initiated" // props: { amount, items }
  | "payment_succeeded"
  | "payment_failed"
  | "waitlist_joined" // props: { courseId }
  | "add_to_cart" // props: { courseId }
  | "faq_opened"; // props: { question }

export function track(event: TrackEvent, props: Record<string, unknown> = {}) {
  // TODO: replace with the real analytics call (see header comment).
  if (typeof window !== "undefined") {
    // eslint-disable-next-line no-console
    console.debug(`[track] ${event}`, props);
  }
}
