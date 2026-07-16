"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getLane, laneLadder, recommendCourse, BUNDLE, TOTAL_COUNT } from "@/lib/data/courses";
import type { LaneId } from "@/lib/types";
import { LANE_STYLES, cn, inr } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { CourseCard } from "@/components/course/CourseCard";
import { track } from "@/lib/tracking";

const VALID_LANES: LaneId[] = ["sell", "brand", "grow"];

/**
 * "Your path" reveal — ONE recommended course ("start here"), the lane's
 * ladder cheap→premium beneath it, then a single go-deeper bundle upsell.
 */
export function PathClient() {
  const params = useSearchParams();
  const goalParam = params.get("goal") as LaneId | null;
  const goal: LaneId = goalParam && VALID_LANES.includes(goalParam) ? goalParam : "grow";
  const stage = params.get("stage") ?? "skipped";
  const blocker = params.get("blocker") ?? "skipped";

  const lane = getLane(goal);
  const styles = LANE_STYLES[goal];
  const recommended = recommendCourse(goal, stage, blocker);
  const ladder = laneLadder(goal).filter((c) => c.id !== recommended.id);

  useEffect(() => {
    track("path_shown", { goal, stage, blocker, recommended: recommended.id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-dvh bg-bone/75 pb-20">
      <header className="flex items-center justify-between px-4 py-4">
        <Link href="/" className="font-display text-sm text-ink">
          LIVE LIFE <span className="text-ember">SHAMELESS</span>
        </Link>
        <Link href="/start" className="text-xs uppercase tracking-[0.18em] text-inkSoft hover:text-ink">
          ← Change goal
        </Link>
      </header>

      <div className="mx-auto max-w-3xl px-4 pt-8 text-center">
        <p className={cn("text-xs font-semibold uppercase tracking-[0.18em]", styles.text)}>
          Your goal: {lane.label}
        </p>
        <h1 className="mt-3 font-display font-semibold text-3xl text-ink sm:text-5xl">
          Your path is <span className="text-ember">ready</span>.
        </h1>
        <p className="mt-3 text-sm text-inkSoft sm:text-base">
          Based on your answers — start right here. Just one. No confusion.
        </p>
      </div>

      {/* THE recommendation — one card, full width, unmissable. */}
      <div className="mx-auto mt-10 max-w-3xl px-4">
        <div className={cn("overflow-hidden rounded-2xl border border-ink/10 bg-card shadow-cardLift")}>
          <div
            className="relative h-40 w-full border-b border-ink/10 sm:h-48"
            style={{
              background: `linear-gradient(135deg, ${recommended.thumb.from}, ${recommended.thumb.to})`,
            }}
          >
            <span className="absolute left-4 top-4 rounded-full border border-ink/10 bg-ember px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accentFg">
              Start here ★
            </span>
          </div>
          <div className="p-6 sm:p-8">
            <h2 className="font-display font-semibold text-2xl text-ink sm:text-3xl">{recommended.title}</h2>
            <p className="mt-2 text-base text-muted">{recommended.hook}</p>
            <ul className="mt-5 space-y-2">
              {recommended.whatYouGet.slice(0, 3).map((w) => (
                <li key={w} className="flex items-start gap-2 text-sm text-ink/80">
                  <span className={styles.text} aria-hidden>✓</span> {w}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink
                href={`/courses/${recommended.id}`}
                variant="primary"
                size="lg"
                onClick={() => track("course_cta_clicked", { courseId: recommended.id, from: "path-recommended" })}
              >
                See the full course →
              </ButtonLink>
              <span className="text-sm text-muted">
                from <span className="font-display font-semibold tabular-nums text-ink">{inr(recommended.price)}</span> · lifetime access
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* The lane ladder, cheap → premium. */}
      <div className="mx-auto mt-14 max-w-6xl">
        <div className="px-4">
          <h3 className="font-display font-semibold text-xl text-ink">The full ladder in your lane</h3>
          <p className="mt-1 text-sm text-inkSoft">
            Want to start small? Take the cheaper side. Serious? Go straight for the anchor.
          </p>
        </div>
        <div className="scrollbar-none mt-6 flex gap-4 overflow-x-auto px-4 pb-2">
          {ladder.map((c) => (
            <CourseCard key={c.id} course={c} from="path-ladder" />
          ))}
        </div>
      </div>

      {/* Go deeper — the single upsell. Gold = premium value. */}
      <div className="mx-auto mt-14 max-w-3xl px-4">
        <div className="rounded-2xl border border-ink/10 bg-surface p-6 text-center shadow-brutal sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Go deeper</p>
          <h3 className="mt-2 font-display font-semibold text-2xl text-ink">
            Not just one course — want it all?
          </h3>
          <p className="mt-2 text-sm text-muted">
            All-access: all {TOTAL_COUNT} courses, lifetime, one-time {inr(BUNDLE.price)}.
          </p>
          <div className="mt-5">
            <ButtonLink
              href="/all-access"
              variant="gold"
              onClick={() => track("bundle_cta_clicked", { from: "path-upsell" })}
            >
              See the all-access bundle →
            </ButtonLink>
          </div>
        </div>
      </div>
    </main>
  );
}
