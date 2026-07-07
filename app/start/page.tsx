import { Suspense } from "react";
import type { Metadata } from "next";
import { GoalRouter } from "@/components/router/GoalRouter";

export const metadata: Metadata = {
  title: "Find your course — your path in 30 seconds",
  description: "One goal + 2 questions — we'll recommend the right course for your situation.",
};

export default function StartPage() {
  return (
    // Suspense boundary required for useSearchParams during static build.
    <Suspense fallback={<div className="min-h-dvh bg-ink" />}>
      <GoalRouter />
    </Suspense>
  );
}
