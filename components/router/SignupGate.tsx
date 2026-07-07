"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/lib/auth/dev-auth";
import { track } from "@/lib/tracking";
import { DEV_BYPASS, cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import type { RouterAnswers } from "@/lib/types";

/**
 * The signup gate — the lead-capture moment inside the goal router.
 * Google is primary (one tap); email and phone are the alternatives.
 * Router answers are attached to the lead: that's the research dataset.
 */

const EmailSchema = z.object({
  name: z.string().min(2, "Mee peru cheppandi"),
  email: z.string().email("Correct email ivvandi"),
});
const PhoneSchema = z.object({
  name: z.string().min(2, "Mee peru cheppandi"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "10-digit mobile number ivvandi"),
});

type EmailForm = z.infer<typeof EmailSchema>;
type PhoneForm = z.infer<typeof PhoneSchema>;

async function postLead(payload: Record<string, unknown>) {
  try {
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    /* lead capture must never block the funnel */
  }
}

export function SignupGate({
  answers,
  onComplete,
}: {
  answers: RouterAnswers;
  onComplete: () => void;
}) {
  const { signIn } = useAuth();
  const [mode, setMode] = useState<"choice" | "email" | "phone">("choice");

  useEffect(() => {
    track("signup_gate_shown");
  }, []);

  const emailForm = useForm<EmailForm>({ resolver: zodResolver(EmailSchema) });
  const phoneForm = useForm<PhoneForm>({ resolver: zodResolver(PhoneSchema) });

  const finish = async (user: Parameters<typeof signIn>[0]) => {
    signIn(user);
    track("signup_completed", { method: user.method });
    await postLead({ ...user, ...answers });
    onComplete();
  };

  const googleSignIn = () => {
    if (DEV_BYPASS) {
      // Dev bypass: pretend Google succeeded so the funnel is clickable.
      finish({ name: "Test User", email: "test@example.com", method: "dev-bypass" });
      return;
    }
    // TODO: with real credentials this becomes:
    //   import { signIn as nextAuthSignIn } from "next-auth/react";
    //   nextAuthSignIn("google", { callbackUrl: window.location.href });
    alert("Google OAuth not configured — set GOOGLE_CLIENT_ID/SECRET (see README) or enable NEXT_PUBLIC_DEV_BYPASS.");
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <h2 className="text-center font-display text-2xl text-cream sm:text-3xl">
        Mee path ready. <span className="text-lime">Free ga</span> unlock cheyyandi.
      </h2>
      <p className="mt-3 text-center text-sm text-muted">
        Mee goal ki match ayye course + full roadmap chupistam. Spam undadu — promise.
      </p>

      <div className="mt-8 space-y-3">
        {mode === "choice" && (
          <>
            {/* Google — primary, one tap. */}
            <button
              onClick={googleSignIn}
              className="flex w-full items-center justify-center gap-3 rounded-full bg-cream px-6 py-3.5 font-semibold text-inkText transition hover:bg-white"
            >
              {/* Inline Google "G" — no icon library needed. */}
              <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
                <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.2 17.7 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.4 5.8c4.4-4.1 7.2-10.1 7.2-17.5z" />
                <path fill="#FBBC05" d="M10.4 28.7c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.8-6.1C.9 16.5 0 20.1 0 24s.9 7.5 2.6 10.8l7.8-6.1z" />
                <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.4-5.8c-2 1.4-4.7 2.2-7.8 2.2-6.3 0-11.7-3.7-13.6-9l-7.8 6.1C6.5 42.6 14.6 48 24 48z" />
              </svg>
              Continue with Google
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setMode("email")}
                className="rounded-full border border-cream/25 px-4 py-3 text-sm text-cream transition hover:border-cream/60"
              >
                Email tho
              </button>
              <button
                onClick={() => setMode("phone")}
                className="rounded-full border border-cream/25 px-4 py-3 text-sm text-cream transition hover:border-cream/60"
              >
                Phone tho
              </button>
            </div>
          </>
        )}

        {mode === "email" && (
          <form
            onSubmit={emailForm.handleSubmit((d) => finish({ ...d, method: "email" }))}
            className="space-y-3"
            noValidate
          >
            <Field
              label="Peru"
              error={emailForm.formState.errors.name?.message}
              inputProps={{ ...emailForm.register("name"), placeholder: "Mee peru", autoComplete: "name" }}
            />
            <Field
              label="Email"
              error={emailForm.formState.errors.email?.message}
              inputProps={{
                ...emailForm.register("email"),
                type: "email",
                placeholder: "you@example.com",
                autoComplete: "email",
                inputMode: "email",
              }}
            />
            <Button type="submit" variant="primary" className="w-full" size="lg">
              Unlock my path →
            </Button>
            <BackLink onClick={() => setMode("choice")} />
          </form>
        )}

        {mode === "phone" && (
          <form
            onSubmit={phoneForm.handleSubmit((d) => finish({ ...d, method: "phone" }))}
            className="space-y-3"
            noValidate
          >
            <Field
              label="Peru"
              error={phoneForm.formState.errors.name?.message}
              inputProps={{ ...phoneForm.register("name"), placeholder: "Mee peru", autoComplete: "name" }}
            />
            <Field
              label="Mobile number"
              error={phoneForm.formState.errors.phone?.message}
              inputProps={{
                ...phoneForm.register("phone"),
                type: "tel",
                placeholder: "98765 43210",
                autoComplete: "tel",
                inputMode: "numeric",
              }}
            />
            <Button type="submit" variant="primary" className="w-full" size="lg">
              Unlock my path →
            </Button>
            <BackLink onClick={() => setMode("choice")} />
          </form>
        )}
      </div>

      <p className="mt-6 text-center text-xs text-muted">
        Sign up ante mee details safe ga untayi. Courses ki matrame use chestam.
      </p>
    </div>
  );
}

function Field({
  label,
  error,
  inputProps,
}: {
  label: string;
  error?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
}) {
  const id = `gate-${label.toLowerCase().replace(/\s/g, "-")}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-cream">
        {label}
      </label>
      <input
        id={id}
        className={cn(
          "w-full rounded-xl border bg-surface px-4 py-3 text-cream placeholder:text-muted/60",
          error ? "border-ember" : "border-cream/20 focus:border-cream/50",
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...inputProps}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-ember" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function BackLink({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="w-full text-center text-xs text-muted hover:text-cream">
      ← Vere option choose chestanu
    </button>
  );
}
