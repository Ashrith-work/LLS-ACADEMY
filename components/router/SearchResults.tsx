"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ArrowUp, ArrowLeft, Star } from "lucide-react";
import {
  searchCourses,
  CATEGORIES,
  COURSES,
  type Course,
  type CategoryKey,
} from "@/lib/courses";

/**
 * SearchResults — the /start destination. No questions, no gating: it just
 * shows courses directly.
 *   ?q=<text>   → intent search (starter + related)
 *   ?goal=sell  → that category's courses
 *   (neither)   → browse all courses by category
 * Every card links straight to /courses/<slug>. Dark theme + coral accent.
 */

const ACCENT = "#4b9fe1";
const ALL_CATS: CategoryKey[] = ["sell", "brand", "grow"];

function priceLabel(price: number | null): string {
  return price == null ? "Coming soon" : `₹${price.toLocaleString("en-IN")}`;
}

/** start-here first, then live courses, then coming-soon. */
function sortCat(a: Course, b: Course): number {
  return (a.start ? 0 : 1) - (b.start ? 0 : 1) || (a.soon ? 1 : 0) - (b.soon ? 1 : 0);
}

function ResultCard({ course, starter = false }: { course: Course; starter?: boolean }) {
  const cat = CATEGORIES[course.cat];
  const soon = course.soon;
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#16161f] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4b9fe1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E0E14]"
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: cat.color }} aria-hidden />
        <span className="text-xs font-medium uppercase tracking-wide text-white/50">{cat.label}</span>
        {starter ? (
          <span
            className="ml-auto inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold text-white"
            style={{ backgroundColor: ACCENT }}
          >
            <Star size={11} aria-hidden /> Start here
          </span>
        ) : soon ? (
          <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-medium text-white/70">
            Coming soon
          </span>
        ) : null}
      </div>

      <h3 className="font-display text-lg font-semibold leading-snug text-white">{course.title}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-white/60">{course.tag}</p>

      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
        <span className="text-sm text-white/70">
          {soon ? "Join waitlist" : <>from <span className="font-semibold text-white">{priceLabel(course.price)}</span></>}
        </span>
        <span className="text-white/40 transition group-hover:translate-x-0.5 group-hover:text-[#4b9fe1]" aria-hidden>
          →
        </span>
      </div>
    </Link>
  );
}

/** A titled grid of every course in one category. */
function CategorySection({ cat }: { cat: CategoryKey }) {
  const list = COURSES.filter((c) => c.cat === cat).sort(sortCat);
  return (
    <section className="mt-10">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: CATEGORIES[cat].color }} aria-hidden />
        <h2 className="font-display text-xl font-semibold text-white">{CATEGORIES[cat].label}</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {list.map((c) => (
          <ResultCard key={c.slug} course={c} starter={!!c.start && !c.soon} />
        ))}
      </div>
    </section>
  );
}

export function SearchResults() {
  const params = useSearchParams();
  const router = useRouter();

  const q = params.get("q") ?? "";
  const goalParam = params.get("goal");
  const goal: CategoryKey | null =
    goalParam && goalParam in CATEGORIES ? (goalParam as CategoryKey) : null;
  const hasQuery = q.trim().length > 0;

  const [value, setValue] = useState(q);

  function refine(e: React.FormEvent) {
    e.preventDefault();
    const v = value.trim();
    if (v) router.push(`/start?q=${encodeURIComponent(v)}`);
  }

  // Free-text search result (only used when there's a query).
  const search = hasQuery ? searchCourses(q) : null;

  return (
    <main className="min-h-dvh w-full" style={{ backgroundColor: "#0E0E14" }}>
      <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:py-14">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white">
            <ArrowLeft size={16} aria-hidden /> Home
          </Link>
          <span className="font-display text-sm text-white/70">
            Live Life <span className="italic">Shameless</span>
          </span>
        </div>

        {/* Search box */}
        <form onSubmit={refine} className="mb-9">
          <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-[#16161f] px-5 py-3 transition-all duration-200 focus-within:border-[#4b9fe1]/50 focus-within:ring-4 focus-within:ring-[#4b9fe1]/15">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              aria-label="Search courses"
              placeholder="Search courses — e.g. 'close more sales'…"
              enterKeyHint="search"
              className="min-w-0 flex-1 bg-transparent py-1.5 text-base text-white placeholder:text-white/35 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!value.trim()}
              aria-label="Search"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4b9fe1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#16161f] enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
              style={{ backgroundColor: value.trim() ? ACCENT : "#2A2A33" }}
            >
              <ArrowUp size={18} aria-hidden />
            </button>
          </div>
        </form>

        {/* --- Body --- */}
        {search ? (
          // Free-text search results
          <>
            <h1 className="font-display text-2xl font-semibold leading-snug text-white sm:text-3xl">
              {search.fallback ? (
                <>No exact match for “{search.phrase}”. Here’s where most people start.</>
              ) : (
                <>Your path for “{search.phrase}”.</>
              )}
            </h1>
            {search.starter && (
              <div className="mt-6">
                <ResultCard course={search.starter} starter />
              </div>
            )}
            {search.results.length > 0 && (
              <>
                <h2 className="mb-4 mt-10 text-sm font-medium uppercase tracking-wide text-white/40">
                  {search.fallback ? "Popular starting points" : "More that fit"}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {search.results.map((c) => (
                    <ResultCard key={c.slug} course={c} />
                  ))}
                </div>
              </>
            )}
          </>
        ) : goal ? (
          // One goal → that category's courses
          <>
            <h1 className="font-display text-2xl font-semibold leading-snug text-white sm:text-3xl">
              {CATEGORIES[goal].label}
            </h1>
            <CategorySection cat={goal} />
          </>
        ) : (
          // No params → browse everything
          <>
            <h1 className="font-display text-2xl font-semibold leading-snug text-white sm:text-3xl">
              All courses
            </h1>
            {ALL_CATS.map((c) => (
              <CategorySection key={c} cat={c} />
            ))}
          </>
        )}
      </div>
    </main>
  );
}
