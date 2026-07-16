"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowUp,
  Sparkles,
  TrendingUp,
  Star,
  Sprout,
  MessageSquareText,
  Flame,
  Rocket,
  type LucideIcon,
} from "lucide-react";

/**
 * CourseFinderHero — a calm, single-focus "AI-style" course finder.
 *
 * Claude/ChatGPT home feel (one input + quick chips) but it's a COURSE FINDER,
 * not a chatbot: everything just routes into /start. Sits below the hero and
 * above the courses grid. White section, blue accent (#5B3DF5) to match
 * the site's primary button; headings use the site's display font.
 */

const ACCENT = "#FF3D7A";

/** First three chips map to goal routes; the rest become free-text searches. */
const CHIPS: { label: string; href: string; Icon: LucideIcon }[] = [
  { label: "Sell better", href: "/start?goal=sell", Icon: TrendingUp },
  { label: "Build your brand", href: "/start?goal=brand", Icon: Star },
  { label: "Grow in career & life", href: "/start?goal=grow", Icon: Sprout },
  { label: "Crack an interview", href: `/start?q=${encodeURIComponent("crack an interview")}`, Icon: MessageSquareText },
  { label: "Become confident", href: `/start?q=${encodeURIComponent("become confident")}`, Icon: Flame },
  { label: "Start a business", href: `/start?q=${encodeURIComponent("start a business")}`, Icon: Rocket },
];

function timeGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function CourseFinderHero() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [greeting, setGreeting] = useState("Good day");
  const [mounted, setMounted] = useState(false);

  // Time-aware greeting + mount animation, both client-only (avoids SSR
  // time mismatch — the block is invisible until `mounted` flips).
  useEffect(() => {
    setGreeting(timeGreeting());
    setMounted(true);
  }, []);

  const canSubmit = value.trim().length > 0;

  function submitText() {
    const q = value.trim();
    if (q) router.push(`/start?q=${encodeURIComponent(q)}`);
  }

  return (
    <section className="w-full bg-paper" aria-label="Find your course">
      <div
        className={`mx-auto flex max-w-[720px] flex-col items-center px-5 pt-2 pb-20 text-center transition-all duration-500 ease-out sm:pt-4 sm:pb-28 ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        {/* Badge */}
        <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-ember/25 bg-ember/[0.10] px-3 py-1 text-xs text-ember">
          <Sparkles size={13} style={{ color: ACCENT }} aria-hidden />
          Not sure where to start?
        </span>

        {/* Time-aware greeting (display font, short) */}
        <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
          {greeting}. What do you want to get better at?
        </h2>

        {/* Input card */}
        <form onSubmit={(e) => { e.preventDefault(); submitText(); }} className="mt-9 w-full">
          <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-card px-5 py-3 shadow-cardLift transition-all duration-200 focus-within:border-ember/50 focus-within:ring-4 focus-within:ring-ember/15">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Tell me what you want to get better at — e.g. 'close more sales' or 'crack an interview'…"
              aria-label="Describe what you want to get better at"
              enterKeyHint="search"
              className="min-w-0 flex-1 bg-transparent py-2 text-base text-white placeholder:text-inkSoft/70 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!canSubmit}
              aria-label="Find courses"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-accentFg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] enabled:hover:-translate-y-0.5 enabled:hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40"
              style={{ backgroundColor: canSubmit ? ACCENT : "#1E2C82" }}
            >
              <ArrowUp size={20} aria-hidden />
            </button>
          </div>
        </form>

        {/* Quick-action chips */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
          {CHIPS.map(({ label, href, Icon }) => (
            <Link
              key={label}
              href={href}
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-inkSoft transition-all duration-200 hover:-translate-y-0.5 hover:border-ember hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
            >
              <Icon size={15} className="text-inkSoft transition-colors group-hover:text-ember" aria-hidden />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
