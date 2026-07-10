"use client";

import Link from "next/link";
import type { Course } from "@/lib/types";
import { cn, inr } from "@/lib/utils";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { track } from "@/lib/tracking";

/**
 * Catalog entry (not a product box). The course one-liner is the hero, set in
 * the serif; category is a small-caps tag; price + Add are quiet at the foot.
 * Hairline border, no drop-shadow. "Start here ★" anchors get a champagne edge.
 * The whole card is a click target via a stretched link; Add sits above it.
 */
export function CourseCard({
  course,
  from,
  showStartHere = false,
}: {
  course: Course;
  from: string;
  showStartHere?: boolean;
}) {
  const comingSoon = course.status === "coming-soon";
  const category =
    course.lane === "sell" ? "Sell better" : course.lane === "brand" ? "Build your brand" : "Career & life";
  const startHere = showStartHere && !!course.anchor;

  return (
    <article
      className={cn(
        "group relative flex h-full w-64 shrink-0 flex-col bg-card transition-colors duration-200 sm:w-72",
        startHere ? "border border-champagne/70" : "border border-ink/10 hover:border-ink/30",
      )}
    >
      {/* Slim art band — placeholder gradient + status markers. */}
      <div
        className="relative h-20 w-full overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${course.thumb.from}, ${course.thumb.to})` }}
        aria-hidden
      >
        {startHere && (
          <span className="absolute left-3 top-3 bg-champagne px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink">
            Start here ★
          </span>
        )}
        {comingSoon && (
          <span className="absolute right-3 top-3 bg-ink/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-cream">
            Coming soon
          </span>
        )}
        {course.signature && !comingSoon && (
          <span className="absolute right-3 top-3 border border-champagne px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-champagne">
            Signature
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted">{category}</span>

        {/* One-liner — the hero of the card. Stretched link covers the whole card. */}
        <Link
          href={`/courses/${course.id}`}
          onClick={() => track("course_cta_clicked", { courseId: course.id, from })}
          className="mt-3 font-display text-[1.3rem] font-medium leading-[1.14] tracking-[-0.01em] text-ink after:absolute after:inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          <span className="[text-wrap:balance] group-hover:underline group-hover:decoration-magenta group-hover:decoration-1 group-hover:underline-offset-4">
            {course.hook}
          </span>
        </Link>

        <span className="mt-3 text-sm text-inkSoft">{course.title}</span>

        <div className="relative z-10 mt-auto flex items-center justify-between border-t border-ink/10 pt-4">
          <span className="text-[0.7rem] uppercase tracking-[0.14em] text-muted">
            {comingSoon ? (
              "Join waitlist"
            ) : (
              <>
                from{" "}
                <span className="font-medium normal-case tracking-normal text-inkText">{inr(course.price)}</span>
              </>
            )}
          </span>
          {comingSoon ? (
            <span className="text-lg text-inkText transition group-hover:translate-x-0.5" aria-hidden>
              →
            </span>
          ) : (
            <AddToCartButton courseId={course.id} compact />
          )}
        </div>
      </div>
    </article>
  );
}
