import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchResults } from "@/components/router/SearchResults";

export const metadata: Metadata = {
  title: "Find your course — browse the LLS catalog",
  description: "Search or pick a goal and jump straight into the courses.",
};

// Rendered per-request so the ?q= / ?goal= course list is present in the SSR HTML
// (useSearchParams reads the real query on the server), not just after hydration.
export const dynamic = "force-dynamic";

export default function StartPage() {
  // No questions, no gating — /start shows courses directly.
  // SearchResults handles ?q= (search), ?goal= (category), or browse-all.
  return (
    // Suspense boundary required for useSearchParams during static build.
    <Suspense fallback={<div className="min-h-dvh" style={{ backgroundColor: "#050505" }} />}>
      <SearchResults />
    </Suspense>
  );
}
