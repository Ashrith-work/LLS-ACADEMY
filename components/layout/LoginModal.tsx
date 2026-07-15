"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import Link from "next/link";

/**
 * LoginModal — centered "Log in or join" modal card.
 *
 * Reusable + presentational: the parent (TopBar) owns the shared scrim and the
 * open/close state; this renders only the card (fixed, centered) when `open`.
 * Brand: cream card #F7F2EA on the shared dark scrim, Fraunces display heading,
 * champagne (#C9A15F) gradient CTA, magenta (#5B3DF5) focus accents.
 *
 * Fields (in order): Email → Phone → Date of birth. Validates on submit; shows
 * inline red hints and a success state. Submit is wired to a placeholder handler
 * (`onSubmit`) you can connect to real auth/API later.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAGENTA = "#F59E0B";
const RED = "#C0362C";

export interface LoginValues {
  email: string;
  phone: string;
  dob: string;
}

/** Placeholder submit — replace with your auth/API call. */
async function defaultSubmit(values: LoginValues) {
  // TODO: connect to auth/API. Runs only after client-side validation passes.
  // eslint-disable-next-line no-console
  console.log("[LoginModal] submit", values);
}

export function LoginModal({
  open,
  onClose,
  onSubmit = defaultSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit?: (values: LoginValues) => void | Promise<void>;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const [show, setShow] = useState(false);
  const [values, setValues] = useState<LoginValues>({ email: "", phone: "", dob: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginValues, string>>>({});
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Enter animation + focus first field on open; reset transient state on close.
  useEffect(() => {
    if (open) {
      const raf = setTimeout(() => setShow(true), 10);
      const focus = setTimeout(() => emailRef.current?.focus(), 70);
      return () => {
        clearTimeout(raf);
        clearTimeout(focus);
      };
    }
    setShow(false);
    setErrors({});
    setDone(false);
    setSubmitting(false);
  }, [open]);

  function set<K extends keyof LoginValues>(key: K, val: string) {
    setValues((v) => ({ ...v, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(v: LoginValues) {
    const e: Partial<Record<keyof LoginValues, string>> = {};
    if (!EMAIL_RE.test(v.email.trim())) e.email = "Enter a valid email address.";
    if (v.phone.replace(/\D/g, "").length < 8) e.phone = "Enter a phone number with at least 8 digits.";
    if (!v.dob) e.dob = "Please select your date of birth.";
    return e;
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate(values);
    setErrors(e);
    const firstInvalid = (["email", "phone", "dob"] as const).find((k) => e[k]);
    if (firstInvalid) {
      document.getElementById(`login-${firstInvalid}`)?.focus();
      return;
    }
    try {
      setSubmitting(true);
      await onSubmit(values);
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  }

  // Focus trap: keep Tab within the dialog while open.
  function onKeyDownTrap(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "Tab") return;
    const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(
      'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])',
    );
    if (!nodes || nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
        onKeyDown={onKeyDownTrap}
        className={`relative w-full max-w-md rounded-2xl bg-card p-6 shadow-[0_40px_120px_-30px_rgba(14,14,20,0.7)] transition-all duration-200 ease-out motion-reduce:transition-none sm:p-8 ${
          show ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-[0.97] opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-xl leading-none text-white/50 transition hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
        >
          ×
        </button>

        {done ? (
          <div className="py-6 text-center">
            <div
              className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full text-black"
              style={{ backgroundColor: MAGENTA }}
              aria-hidden
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M5 12.5l4 4 10-10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 id="login-title" className="font-display text-2xl font-semibold text-white">
              You&rsquo;re all set
            </h2>
            <p className="mx-auto mt-2 max-w-xs text-sm text-inkSoft">
              Thanks — we&rsquo;ll be in touch at {values.email}.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-ember px-6 py-2.5 text-sm font-semibold text-black transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h2 id="login-title" className="font-display text-2xl font-semibold leading-tight text-white sm:text-[1.75rem]">
              Log in or join
            </h2>
            <p className="mt-1.5 text-sm text-inkSoft">
              Enter your details to continue — new here or returning, same door.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
              <Field
                id="login-email"
                label="Email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={values.email}
                onChange={(v) => set("email", v)}
                error={errors.email}
                inputRef={emailRef}
              />
              <Field
                id="login-phone"
                label="Phone number"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+91 98765 43210"
                value={values.phone}
                onChange={(v) => set("phone", v)}
                error={errors.phone}
              />
              <Field
                id="login-dob"
                label="Date of birth"
                type="date"
                autoComplete="bday"
                value={values.dob}
                onChange={(v) => set("dob", v)}
                error={errors.dob}
              />

              <button
                type="submit"
                disabled={submitting}
                className="mt-1 w-full rounded-full bg-ember px-6 py-3 text-sm font-semibold text-black shadow-[0_10px_30px_-12px_rgba(250,37,94,0.9)] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? "One moment…" : "Continue"}
              </button>

              <p className="text-center text-xs text-inkSoft">
                By continuing you agree to our{" "}
                <Link
                  href="/terms"
                  className="font-medium underline decoration-ember/50 underline-offset-2 transition hover:text-ember"
                  style={{ color: MAGENTA }}
                >
                  Terms
                </Link>
                .
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  type,
  value,
  onChange,
  error,
  placeholder,
  inputMode,
  autoComplete,
  inputRef,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  inputMode?: "email" | "tel" | "text";
  autoComplete?: string;
  inputRef?: React.Ref<HTMLInputElement>;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-xs font-semibold uppercase tracking-wider text-inkSoft">
        {label}
      </label>
      <input
        id={id}
        ref={inputRef}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-xl border bg-white/[0.04] px-4 py-2.5 text-[15px] text-white outline-none transition placeholder:text-white/35 focus:ring-2 ${
          error
            ? "border-[#C0362C] focus:border-[#C0362C] focus:ring-[#C0362C]/20"
            : "border-white/10 focus:border-ember focus:ring-ember/20"
        }`}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs font-medium" style={{ color: RED }}>
          {error}
        </p>
      )}
    </div>
  );
}
