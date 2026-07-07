"use client";

import Link from "next/link";
import type { Course } from "@/lib/types";
import { cn, inr, LANE_STYLES } from "@/lib/utils";
import { TiltCard } from "@/components/ui/TiltCard";
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
          "group flex h-full w-64 shrink-0 flex-col overflow-hidden rounded-2xl border border-cream/10 bg-card ring-1 ring-transparent transition sm:w-72",
          lane.ring,
        )}
      >
        {/* Thumbnail placeholder — gradient block. TODO: real course art via next/image. */}
        <div
          className="relative h-32 w-full"
          style={{ background: `linear-gradient(135deg, ${course.thumb.from}, ${course.thumb.to})` }}
          aria-hidden
        >
          {showStartHere && course.anchor && (
            <span className="absolute left-3 top-3 rounded-full bg-lime px-2.5 py-1 text-[11px] font-bold text-inkText">
              Start here ★
            </span>
          )}
          {comingSoon && (
            <span className="absolute right-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-semibold text-cream">
              Coming soon
            </span>
          )}
          {course.signature && !comingSoon && (
            <span className="absolute right-3 top-3 rounded-full bg-ember/90 px-2.5 py-1 text-[11px] font-bold text-white">
              Signature
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-4">
          <span className={cn("mb-2 w-fit rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide", lane.badgeBg, lane.text)}>
            {course.lane === "sell" ? "Sell better" : course.lane === "brand" ? "Build your brand" : "Career & life"}
          </span>
          <h3 className="font-display text-base leading-snug text-cream">{course.title}</h3>
          <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted">{course.hook}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-muted">
              {comingSoon ? "Join waitlist →" : <>from <span className="font-semibold text-cream">{inr(course.price)}</span></>}
            </span>
            <span className={cn("text-sm transition group-hover:translate-x-1", lane.text)} aria-hidden>
              →
            </span>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}
