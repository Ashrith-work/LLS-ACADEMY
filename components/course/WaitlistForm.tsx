"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/tracking";
import { cn } from "@/lib/utils";

const Schema = z.object({ email: z.string().email("Enter a valid email") });
type Form = z.infer<typeof Schema>;

/**
 * "Notify me" waitlist for coming-soon courses.
 * Waitlist volume per course = the demand-validation signal.
 */
export function WaitlistForm({ courseId }: { courseId: string }) {
  const [done, setDone] = useState(false);
  const { register, handleSubmit, formState } = useForm<Form>({ resolver: zodResolver(Schema) });

  const submit = async ({ email }: Form) => {
    track("waitlist_joined", { courseId });
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, email }),
      });
    } catch {
      /* stub backend — treat as success either way for now */
    }
    setDone(true);
  };

  if (done) {
    return (
      <p className="rounded-xl border border-ink/10 bg-teal px-5 py-4 text-sm text-cream shadow-cardLift" role="status">
        ✓ You're on the list! We'll tell you first the moment the course launches.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-3 sm:flex-row" noValidate>
      <div className="flex-1">
        <label htmlFor={`wl-${courseId}`} className="sr-only">
          Email
        </label>
        <input
          id={`wl-${courseId}`}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Your email — we'll tell you at launch"
          className={cn(
            "w-full rounded-xl border bg-card px-5 py-3.5 text-inkText placeholder:text-muted/60",
            formState.errors.email ? "border-lime" : "border-ink/15",
          )}
          aria-invalid={!!formState.errors.email}
          {...register("email")}
        />
        {formState.errors.email && (
          <p className="mt-1 pl-4 text-xs text-lime" role="alert">
            {formState.errors.email.message}
          </p>
        )}
      </div>
      <Button type="submit" variant="primary" size="lg" disabled={formState.isSubmitting}>
        Notify me →
      </Button>
    </form>
  );
}
