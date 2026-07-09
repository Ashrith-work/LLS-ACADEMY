import { Suspense } from "react";
import type { Metadata } from "next";
import { GoalRouter } from "@/components/router/GoalRouter";
import { SearchResults } from "@/components/router/SearchResults";

export const metadata: Metadata = {
  title: "Find your course — your path in 30 seconds",
  description: "One goal + 2 questions — we'll recommend the right course for your situation.",
};

export default function StartPage({
  searchParams,
}: {
  searchParams: { q?: string; goal?: string };
}) {
  // Free-text search (from the CourseFinderHero) -> results view.
  // Otherwise the gated goal router.
  const hasQuery = typeof searchParams?.q === "string" && searchParams.q.trim().length > 0;

  return (
    // Suspense boundary required for useSearchParams during static build.
    <Suspense fallback={<div className="min-h-dvh bg-bone" />}>
      {hasQuery ? <SearchResults /> : <GoalRouter />}
    </Suspense>
  );
}
