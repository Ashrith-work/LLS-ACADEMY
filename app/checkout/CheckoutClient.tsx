"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BUNDLE, getCourse, effectivePrice, catalogueValue, TOTAL_COUNT } from "@/lib/data/courses";
import { initiatePayment } from "@/lib/payments";
import { track } from "@/lib/tracking";
import { cn, inr, DEV_BYPASS } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth/dev-auth";

/**
 * Checkout — Hick's Law enforced: at most TWO options ever visible.
 *   Course checkout → "this course" vs "this + all-access (upgrade)".
 *   Bundle checkout → just the bundle (one option).
 * Order summary → buyer details → option → trust badges → pay.
 */

const BuyerSchema = z.object({
  name: z.string().min(2, "Mee peru cheppandi"),
  email: z.string().email("Correct email ivvandi — access ikkadike vastundi"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "10-digit mobile number ivvandi — WhatsApp community invite ki"),
});
type BuyerForm = z.infer<typeof BuyerSchema>;

export function CheckoutClient() {
  const params = useSearchParams();
  const { user } = useAuth();

  const itemId = params.get("item") ?? "all-access";
  const isBundleOnly = itemId === "all-access";
  const course = isBundleOnly ? null : getCourse(itemId);

  // Two options max: the chosen course, or upgrade to all-access.
  const [option, setOption] = useState<"course" | "bundle">(isBundleOnly ? "bundle" : "course");
  const [paying, setPaying] = useState(false);

  const coursePrice = course ? effectivePrice(course) : 0;
  const amount = option === "bundle" ? BUNDLE.price : coursePrice;

  const { register, handleSubmit, formState } = useForm<BuyerForm>({
    resolver: zodResolver(BuyerSchema),
    defaultValues: { name: user?.name ?? "", email: user?.email ?? "", phone: user?.phone ?? "" },
  });

  useEffect(() => {
    track("checkout_started", { item: itemId, option });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isBundleOnly && !course) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center bg-ink px-4 text-center">
        <p className="text-muted">Course dorakaledu.</p>
        <Link href="/" className="mt-4 text-cream underline">← Home ki vellandi</Link>
      </main>
    );
  }

  const pay = async (buyer: BuyerForm) => {
    setPaying(true);
    await initiatePayment({
      kind: option,
      itemId: option === "bundle" ? "all-access" : itemId,
      amount,
      buyer,
    });
    setPaying(false);
  };

  return (
    <main className="min-h-dvh bg-ink pb-16">
      <header className="flex items-center justify-between px-4 py-4">
        <Link href="/" className="font-display text-sm text-cream">
          LIVE LIFE <span className="text-ember">SHAMELESS</span>
        </Link>
        <span className="text-xs text-muted">🔒 Secure checkout</span>
      </header>

      <div className="mx-auto mt-6 max-w-lg px-4">
        <h1 className="font-display text-2xl text-cream sm:text-3xl">Almost there.</h1>

        {/* ── The (max two) options ── */}
        <div className="mt-6 space-y-3" role="radiogroup" aria-label="Choose your plan">
          {course && (
            <OptionCard
              selected={option === "course"}
              onSelect={() => { setOption("course"); track("checkout_option_changed", { option: "course" }); }}
              title={course.title}
              subtitle="Ee okka course · lifetime access"
              price={coursePrice}
            />
          )}
          <OptionCard
            selected={option === "bundle"}
            onSelect={() => { setOption("bundle"); track("checkout_option_changed", { option: "bundle" }); }}
            title={course ? `Idi + all ${TOTAL_COUNT} courses` : `All-access — anni ${TOTAL_COUNT} courses`}
            subtitle={`${inr(catalogueValue())}+ value · lifetime · kotha courses free`}
            price={BUNDLE.price}
            gold
          />
        </div>

        {/* ── Order summary ── */}
        <div className="mt-6 rounded-2xl border border-cream/10 bg-card px-5 py-4">
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-muted">Total (one-time, no hidden charges)</span>
            <span className="font-display text-2xl text-cream">{inr(amount)}</span>
          </div>
        </div>

        {/* ── Buyer details ── */}
        <form onSubmit={handleSubmit(pay)} className="mt-6 space-y-4" noValidate>
          <Input label="Peru" error={formState.errors.name?.message}
            inputProps={{ ...register("name"), autoComplete: "name", placeholder: "Mee full name" }} />
          <Input label="Email (access ikkadike)" error={formState.errors.email?.message}
            inputProps={{ ...register("email"), type: "email", autoComplete: "email", inputMode: "email", placeholder: "you@example.com" }} />
          <Input label="WhatsApp number (community invite ki)" error={formState.errors.phone?.message}
            inputProps={{ ...register("phone"), type: "tel", autoComplete: "tel", inputMode: "numeric", placeholder: "98765 43210" }} />

          {/* THE action — lime, the one shock colour on this screen. */}
          <Button type="submit" variant="lime" size="lg" className="w-full" disabled={paying}>
            {paying ? "Processing…" : `Pay ${inr(amount)} securely →`}
          </Button>
        </form>

        {/* ── Trust badges ── */}
        <div className="mt-6 grid grid-cols-3 gap-2 text-center text-[11px] text-muted">
          <span className="rounded-xl bg-surface px-2 py-3">🔒 Razorpay secure<br />UPI · cards · netbanking</span>
          <span className="rounded-xl bg-surface px-2 py-3">⚡ Instant access<br />payment ayyaka ventane</span>
          <span className="rounded-xl bg-surface px-2 py-3">∞ Lifetime access<br />deadline ledu</span>
        </div>

        {DEV_BYPASS && (
          <p className="mt-6 rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-center text-xs text-gold">
            DEV MODE: payment is simulated — the button goes straight to the success page.
            {/* TODO: wire Razorpay in lib/payments.ts + app/api/create-order/route.ts */}
          </p>
        )}

        <p className="mt-4 text-center text-xs text-muted">
          Paying ante mee{" "}
          <Link href="/terms" className="underline hover:text-cream">terms & no-refund policy</Link>{" "}
          ki agree avtunnaru.
        </p>
      </div>
    </main>
  );
}

function OptionCard({
  selected, onSelect, title, subtitle, price, gold = false,
}: {
  selected: boolean; onSelect: () => void; title: string; subtitle: string; price: number; gold?: boolean;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "flex w-full items-center justify-between gap-4 rounded-2xl border-2 bg-card p-5 text-left transition",
        selected ? (gold ? "border-gold" : "border-ember") : "border-cream/10 hover:border-cream/30",
      )}
    >
      <span className="flex items-start gap-3">
        <span
          className={cn(
            "mt-1 h-4 w-4 shrink-0 rounded-full border-2",
            selected ? (gold ? "border-gold bg-gold" : "border-ember bg-ember") : "border-cream/40",
          )}
          aria-hidden
        />
        <span>
          <span className="block font-semibold text-cream">{title}</span>
          <span className="mt-0.5 block text-xs text-muted">{subtitle}</span>
        </span>
      </span>
      <span className={cn("shrink-0 font-display text-lg", gold ? "text-gold" : "text-cream")}>{inr(price)}</span>
    </button>
  );
}

function Input({
  label, error, inputProps,
}: {
  label: string; error?: string; inputProps: React.InputHTMLAttributes<HTMLInputElement>;
}) {
  const id = `co-${label.split(" ")[0].toLowerCase()}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-cream">{label}</label>
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
        <p id={`${id}-error`} className="mt-1 text-xs text-ember" role="alert">{error}</p>
      )}
    </div>
  );
}
