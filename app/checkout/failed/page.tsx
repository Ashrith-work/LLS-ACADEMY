import type { Metadata } from "next";
import Link from "next/link";
import { FailedTracker } from "./FailedTracker";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Payment failed", robots: { index: false } };

export default function FailedPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-bone px-4 py-16 text-center">
      <FailedTracker />
      <div className="max-w-md">
        <span className="inline-block rounded-full border border-line bg-ink/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-ink">Payment failed</span>
        <h1 className="mt-4 font-display font-semibold text-3xl text-ink sm:text-4xl">Your payment didn't go through.</h1>
        <p className="mt-4 text-inkSoft">
          If any money was debited, your bank reverses it automatically within 5–7 days — don't worry. This is
          usually just a network issue — please try again.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <ButtonLink href="/checkout?item=all-access" variant="primary" size="lg">
            Try again →
          </ButtonLink>
          {/* TODO: real support contact (WhatsApp/email) */}
          <a href="#" className="text-sm text-inkSoft underline hover:text-ink">
            Still not working? Message us and we&apos;ll fix it
          </a>
          <Link href="/" className="text-sm text-inkSoft hover:text-ink">
            ← Back to courses
          </Link>
        </div>
      </div>
    </main>
  );
}
