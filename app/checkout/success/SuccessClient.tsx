"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getCourse, BUNDLE } from "@/lib/data/courses";
import { SITE } from "@/lib/data/site";
import { track } from "@/lib/tracking";
import { ButtonLink } from "@/components/ui/Button";

export function SuccessClient() {
  const params = useSearchParams();
  const kind = params.get("kind") ?? "course";
  const itemId = params.get("item") ?? "";
  const title = kind === "bundle" ? BUNDLE.title : getCourse(itemId)?.title ?? "your course";

  useEffect(() => {
    track("payment_succeeded", { item: itemId, kind });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-ink px-4 py-16 text-center">
      <div className="max-w-md">
        <p className="font-display text-6xl" aria-hidden>🎉</p>
        <h1 className="mt-4 font-display text-3xl text-cream sm:text-4xl">
          Done. <span className="text-lime">Your journey has started.</span>
        </h1>
        <p className="mt-4 text-muted">
          <span className="text-cream">{title}</span> is now yours. Access details are on their way to your email
          (within 2 minutes — check your spam folder too).
        </p>

        <div className="mt-8 space-y-3 text-left">
          <NextStep n={1} title="Open your email" detail="Your course access link + login details are inside." />
          <NextStep
            n={2}
            title="Join the WhatsApp community"
            detail="People on the same journey — questions, wins, accountability."
          />
          <NextStep n={3} title="Watch the first lesson today" detail="All the momentum is in the first 24 hours. Start now." />
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {/* TODO: real WhatsApp community invite URL in lib/data/site.ts */}
          <ButtonLink href={SITE.whatsappInviteUrl} variant="lime" size="lg">
            Join the WhatsApp community →
          </ButtonLink>
          <Link href="/" className="text-sm text-muted hover:text-cream">
            ← Back to all courses
          </Link>
        </div>
      </div>
    </main>
  );
}

function NextStep({ n, title, detail }: { n: number; title: string; detail: string }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-cream/10 bg-card px-5 py-4">
      <span className="font-display text-lg text-ember">{n}</span>
      <div>
        <p className="font-semibold text-cream">{title}</p>
        <p className="mt-0.5 text-xs text-muted">{detail}</p>
      </div>
    </div>
  );
}
