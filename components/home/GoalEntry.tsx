"use client";

import Link from "next/link";
import { LANES } from "@/lib/data/courses";
import { LANE_STYLES, cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { track } from "@/lib/tracking";

/**
 * Goal-router entry — the primary path for browsers.
 * Three doors, colour-coded by lane. Clicking one pre-selects the goal
 * inside the router (/start?goal=...).
 */
export function GoalEntry() {
  return (
    <section className="bg-surface py-16 sm:py-20" aria-labelledby="goal-entry-heading">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <h2 id="goal-entry-heading" className="text-center font-display text-2xl text-cream sm:text-4xl">
            What do you want?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-center text-sm text-muted sm:text-base">
            Pick one goal — we ask 2 questions and show you the right course.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {LANES.map((lane, i) => {
            const s = LANE_STYLES[lane.id];
            return (
              <Reveal key={lane.id} delay={i * 0.08}>
                <Link
                  href={`/start?goal=${lane.id}`}
                  onClick={() => track("router_goal_chosen", { goal: lane.id, from: "home" })}
                  className={cn(
                    "group flex h-full flex-col rounded-2xl border bg-card p-6 transition hover:-translate-y-1",
                    s.border,
                  )}
                >
                  <span className={cn("mb-4 h-2 w-10 rounded-full", s.bg)} aria-hidden />
                  <h3 className="font-display text-xl text-cream">{lane.label}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted">{lane.hook}</p>
                  <span className={cn("mt-5 text-sm font-semibold", s.text)}>
                    Choose this goal <span className="inline-block transition group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
