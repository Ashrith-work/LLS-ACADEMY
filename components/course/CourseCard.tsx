"use client";

import Link from "next/link";
import type { Course } from "@/lib/types";
import { cn, inr, LANE_STYLES } from "@/lib/utils";
import { TiltCard } from "@/components/ui/TiltCard";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { track } from "@/lib/tracking";

/**
 * Course card for lane rows and ladders.
 * Price is deliberately subtle ("from ₹499" pattern) — trust before price.
 * Lane accent colours the tag/hover for wayfinding.
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
  const lane = LANE_STYLES[course.lane];
  const comingSoon = course.status === "coming-soon";

  return (
    <TiltCard>
      <Link
        href={`/courses/${course.id}`}
        onClick={() => track("course_cta_clicked", { courseId: course.id, from })}
        className={cn(
          "group flex h-full w-64 shrink-0 flex-col overflow-hidden rounded-2xl border border-ink/10 bg-card shadow-cardLift transition-all hover:-translate-y-1 sm:w-72",
        )}
      >
        {/* Thumbnail placeholder — soft colour block. TODO: real course art via next/image. */}
        <div
          className="relative h-32 w-full"
          style={{ background: `linear-gradient(135deg, ${course.thumb.from}, ${course.thumb.to})` }}
          aria-hidden
        >
          {showStartHere && course.anchor && (
            <span className="absolute left-3 top-3 rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold text-cream">
              Start here ★
            </span>
          )}
          {comingSoon && (
            <span className="absolute right-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-medium text-cream">
              Coming soon
            </span>
          )}
          {course.signature && !comingSoon && (
            <span className="absolute right-3 top-3 rounded-full bg-ember px-2.5 py-1 text-[11px] font-semibold text-cream">
              Signature
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <span className={cn("mb-2 w-fit text-[11px] font-semibold uppercase tracking-[0.18em]", lane.text)}>
            {course.lane === "sell" ? "Sell better" : course.lane === "brand" ? "Build your brand" : "Career & life"}
          </span>
          <h3 className="font-display text-lg font-semibold leading-snug text-inkText">{course.title}</h3>
          <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted">{course.hook}</p>
          <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-3">
            <span className="text-xs text-muted">
              {comingSoon ? "Join waitlist →" : <>from <span className="font-semibold text-inkText">{inr(course.price)}</span></>}
            </span>
            {comingSoon ? (
              <span className={cn("text-lg transition group-hover:translate-x-1", lane.text)} aria-hidden>
                →
              </span>
            ) : (
              <AddToCartButton courseId={course.id} compact />
            )}
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}
