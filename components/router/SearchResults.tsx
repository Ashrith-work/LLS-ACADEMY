"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ArrowUp, ArrowLeft, Star } from "lucide-react";
import { searchCourses, CATEGORIES, type Course } from "@/lib/courses";

/**
 * SearchResults — the /start?q=<text> destination for the CourseFinderHero.
 *
 * Reads the free-text query, runs the zero-dep intent search from lib/courses,
 * and shows a recommended "starter" course + related results (or popular
 * starters as a fallback). Dark theme + coral accent to match the finder.
 */

const ACCENT = "#E8622C";

function priceLabel(price: number | null): string {
  return price == null ? "Coming soon" : `₹${price.toLocaleString("en-IN")}`;
}

function ResultCard({ course, starter = false }: { course: Course; starter?: boolean }) {
  const cat = CATEGORIES[course.cat];
  const soon = course.soon;
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#16161f] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8622C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E0E14]"
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
        <span className="text-white/40 transition group-hover:translate-x-0.5 group-hover:text-[#E8622C]" aria-hidden>
          →
        </span>
      </div>
    </Link>
  );
}

export function SearchResults() {
  const params = useSearchParams();
  const router = useRouter();
  const q = params.get("q") ?? "";
  const { starter, results, phrase, fallback } = searchCourses(q);
  const [value, setValue] = useState(q);

  function refine(e: React.FormEvent) {
    e.preventDefault();
    const v = value.trim();
    if (v) router.push(`/start?q=${encodeURIComponent(v)}`);
  }

  const hasQuery = q.trim().length > 0;

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

        {/* Refine search */}
        <form onSubmit={refine} className="mb-9">
          <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-[#16161f] px-5 py-3 transition-all duration-200 focus-within:border-[#E8622C]/50 focus-within:ring-4 focus-within:ring-[#E8622C]/15">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              aria-label="Refine your search"
              placeholder="Search again — e.g. 'close more sales'…"
              enterKeyHint="search"
              className="min-w-0 flex-1 bg-transparent py-1.5 text-base text-white placeholder:text-white/35 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!value.trim()}
              aria-label="Search"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8622C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#16161f] enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
              style={{ backgroundColor: value.trim() ? ACCENT : "#2A2A33" }}
            >
              <ArrowUp size={18} aria-hidden />
            </button>
          </div>
        </form>

        {!hasQuery ? (
          <p className="text-white/60">Type what you want to get better at above and press enter.</p>
        ) : (
          <>
            <h1 className="font-display text-2xl font-semibold leading-snug text-white sm:text-3xl">
              {fallback ? (
                <>No exact match for “{phrase}”. Here’s where most people start.</>
              ) : (
                <>Your path for “{phrase}”.</>
              )}
            </h1>

            {starter && (
              <div className="mt-6">
                <ResultCard course={starter} starter />
              </div>
            )}

            {results.length > 0 && (
              <>
                <h2 className="mb-4 mt-10 text-sm font-medium uppercase tracking-wide text-white/40">
                  {fallback ? "Popular starting points" : "More that fit"}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {results.map((c) => (
                    <ResultCard key={c.slug} course={c} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}
