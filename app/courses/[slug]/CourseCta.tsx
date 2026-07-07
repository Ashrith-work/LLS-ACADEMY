"use client";

import { ButtonLink } from "@/components/ui/Button";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { track } from "@/lib/tracking";

/** Course landing CTAs — buy now, or add to cart for later. */
export function CourseCta({ courseId }: { courseId: string }) {
  return (
    <div className="space-y-3">
      <ButtonLink
        href={`/checkout?item=${courseId}`}
        variant="primary"
        size="lg"
        className="w-full"
        onClick={() => track("course_cta_clicked", { courseId, from: "course-page-price" })}
      >
        Start this course →
      </ButtonLink>
      <AddToCartButton courseId={courseId} className="w-full" />
    </div>
  );
}
