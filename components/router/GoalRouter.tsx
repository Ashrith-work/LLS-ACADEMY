"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LANES } from "@/lib/data/courses";
import type { LaneId, RouterAnswers } from "@/lib/types";
import { LANE_STYLES, cn } from "@/lib/utils";
import { track } from "@/lib/tracking";
import { useAuth } from "@/lib/auth/dev-auth";
import { SignupGate } from "@/components/router/SignupGate";

/**
 * The gated goal-router — the heart of the funnel and a research instrument.
 *
 * goal → 2 quick questions → signup gate → "your path" reveal.
 * Every answer is track()ed; choices are always among 2–4 options;
 * both questions are skippable to keep friction low.
 */

type Step = "goal" | "stage" | "blocker" | "gate";

const STAGES = [
  { id: "student", label: "Student or just starting out", hint: "In college or recently finished" },
  { id: "working", label: "Working a job", hint: "Corporate / private / govt" },
  { id: "running", label: "Running something of my own", hint: "Business / side-hustle / freelancing" },
] as const;

const BLOCKERS = [
  { id: "freeze", label: "I freeze up", hint: "Can't speak up in the moment" },
  { id: "how", label: "I don't know how", hint: "No direction or method" },
  { id: "time", label: "I have no time", hint: "Busy schedule, can't stay consistent" },
  { id: "confidence", label: "I lack confidence", hint: "I keep doubting whether I can do it" },
] as const;

export function GoalRouter() {
  const router = useRouter();
  const params = useSearchParams();
  const { user, ready } = useAuth();
  const reduced = useReducedMotion();

  const preselected = params.get("goal") as LaneId | null;
  const validPreselect = preselected && LANES.some((l) => l.id === preselected);

  const [step, setStep] = useState<Step>(validPreselect ? "stage" : "goal");
  const [goal, setGoal] = useState<LaneId | null>(validPreselect ? preselected : null);
  const [stage, setStage] = useState<RouterAnswers["stage"]>("skipped");
  const [blocker, setBlocker] = useState<RouterAnswers["blocker"]>("skipped");

  useEffect(() => {
    track("router_opened", { preselected: preselected ?? "none" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toPath = (g: LaneId, s: string, b: string) =>
    router.push(`/path?goal=${g}&stage=${s}&blocker=${b}`);

  const chooseGoal = (g: LaneId) => {
    setGoal(g);
    track("router_goal_chosen", { goal: g, from: "router" });
    setStep("stage");
  };

  const chooseStage = (s: RouterAnswers["stage"]) => {
    setStage(s);
    track("router_stage_answered", { goal, stage: s });
    setStep("blocker");
  };

  const chooseBlocker = (b: RouterAnswers["blocker"]) => {
    setBlocker(b);
    track("router_blocker_answered", { goal, stage, blocker: b });
    // Already signed in (returning visitor) → straight to the path.
    if (ready && user && goal) {
      toPath(goal, stage, b);
      return;
    }
    setStep("gate");
  };

  const skip = (which: "stage" | "blocker") => {
    track("router_question_skipped", { step: which });
    if (which === "stage") chooseStage("skipped");
    else chooseBlocker("skipped");
  };

  const stepIndex = { goal: 0, stage: 1, blocker: 2, gate: 3 }[step];

  const anim = reduced
    ? {}
    : {
        initial: { opacity: 0, x: 32 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -32 },
        transition: { duration: 0.25 },
      };

  return (
    <div className="flex min-h-dvh flex-col bg-bone/75">
      {/* Slim header: logo home-link + progress. No nav — no distraction. */}
      <header className="flex items-center justify-between px-4 py-4">
        <Link href="/" className="font-display text-sm text-ink">
          LIVE LIFE <span className="text-ember">SHAMELESS</span>
        </Link>
        <div className="flex gap-1.5" aria-label={`Step ${stepIndex + 1} of 4`}>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={cn("h-1.5 w-8 rounded-full", i <= stepIndex ? "bg-ember" : "bg-line")}
              aria-hidden
            />
          ))}
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <AnimatePresence mode="wait">
          {step === "goal" && (
            <motion.div key="goal" {...anim} className="w-full max-w-2xl">
              <h1 className="text-center font-display text-3xl font-semibold text-ink sm:text-4xl">What do you want?</h1>
              <p className="mt-3 text-center text-sm text-inkSoft">Choose honestly — we'll build your path from it.</p>
              <div className="mt-10 grid gap-4">
                {LANES.map((lane) => {
                  const s = LANE_STYLES[lane.id];
                  return (
                    <button
                      key={lane.id}
                      onClick={() => chooseGoal(lane.id)}
                      className={cn(
                        "group flex items-center justify-between rounded-2xl border border-ink/10 bg-card p-5 text-left shadow-cardLift transition hover:-translate-y-1",
                      )}
                    >
                      <span>
                        <span className="block font-display text-lg font-semibold text-inkText">{lane.label}</span>
                        <span className="mt-1 block text-sm text-muted">{lane.hook}</span>
                      </span>
                      <span className={cn("text-xl transition group-hover:translate-x-1", s.text)} aria-hidden>
                        →
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === "stage" && (
            <motion.div key="stage" {...anim} className="w-full max-w-xl">
              <QuestionHeader n={1} title="Where are you right now?" goal={goal} />
              <div className="mt-8 grid gap-3">
                {STAGES.map((s) => (
                  <OptionButton key={s.id} label={s.label} hint={s.hint} onClick={() => chooseStage(s.id)} />
                ))}
              </div>
              <SkipButton onClick={() => skip("stage")} />
            </motion.div>
          )}

          {step === "blocker" && (
            <motion.div key="blocker" {...anim} className="w-full max-w-xl">
              <QuestionHeader n={2} title="What's holding you back?" goal={goal} />
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {BLOCKERS.map((b) => (
                  <OptionButton key={b.id} label={b.label} hint={b.hint} onClick={() => chooseBlocker(b.id)} />
                ))}
              </div>
              <SkipButton onClick={() => skip("blocker")} />
            </motion.div>
          )}

          {step === "gate" && goal && (
            <motion.div key="gate" {...anim} className="w-full">
              <SignupGate
                answers={{ goal, stage, blocker }}
                onComplete={() => toPath(goal, stage, blocker)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function QuestionHeader({ n, title, goal }: { n: number; title: string; goal: LaneId | null }) {
  const lane = LANES.find((l) => l.id === goal);
  return (
    <div className="text-center">
      {lane && (
        <p className={cn("mb-2 text-xs font-semibold uppercase tracking-[0.18em]", LANE_STYLES[lane.id].text)}>
          Goal: {lane.label}
        </p>
      )}
      <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
        <span className="text-inkSoft">{n}/2 · </span>
        {title}
      </h1>
    </div>
  );
}

function OptionButton({ label, hint, onClick }: { label: string; hint: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl border border-ink/10 bg-card p-4 text-left shadow-cardLift transition hover:-translate-y-0.5"
    >
      <span className="block font-semibold text-inkText">{label}</span>
      <span className="mt-0.5 block text-xs text-muted">{hint}</span>
    </button>
  );
}

function SkipButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="mt-6 text-center">
      <button onClick={onClick} className="text-xs font-semibold uppercase tracking-[0.18em] text-inkSoft underline-offset-2 hover:text-ink hover:underline">
        Skip this question →
      </button>
    </div>
  );
}
