import { Suspense } from "react";
import type { Metadata } from "next";
import { GoalRouter } from "@/components/router/GoalRouter";

export const metadata: Metadata = {
  title: "Find your course — 30 seconds lo mee path",
  description: "Okka goal + 2 questions — mee situation ki correct Telugu course recommend chestam.",
};

export default function StartPage() {
  return (
    // Suspense boundary required for useSearchParams during static build.
    <Suspense fallback={<div className="min-h-dvh bg-ink" />}>
      <GoalRouter />
    </Suspense>
  );
}
