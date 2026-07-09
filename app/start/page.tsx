import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchResults } from "@/components/router/SearchResults";

export const metadata: Metadata = {
  title: "Find your course — browse the LLS catalog",
  description: "Search or pick a goal and jump straight into the courses.",
};

export default function StartPage() {
  // No questions, no gating — /start shows courses directly.
  // SearchResults handles ?q= (search), ?goal= (category), or browse-all.
  return (
    // Suspense boundary required for useSearchParams during static build.
    <Suspense fallback={<div className="min-h-dvh" style={{ backgroundColor: "#0E0E14" }} />}>
      <SearchResults />
    </Suspense>
  );
}
