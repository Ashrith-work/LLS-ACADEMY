"use client";

import { ButtonLink } from "@/components/ui/Button";
import { track } from "@/lib/tracking";

/** The single CTA on a course landing page — straight to checkout. */
export function CourseCta({ courseId }: { courseId: string }) {
  return (
    <ButtonLink
      href={`/checkout?item=${courseId}`}
      variant="primary"
      size="lg"
      className="w-full"
      onClick={() => track("course_cta_clicked", { courseId, from: "course-page-price" })}
    >
      Start this course →
    </ButtonLink>
  );
}
