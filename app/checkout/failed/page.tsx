import type { Metadata } from "next";
import Link from "next/link";
import { FailedTracker } from "./FailedTracker";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Payment failed", robots: { index: false } };

export default function FailedPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-ink px-4 py-16 text-center">
      <FailedTracker />
      <div className="max-w-md">
        <h1 className="font-display text-3xl text-cream sm:text-4xl">Your payment didn't go through.</h1>
        <p className="mt-4 text-muted">
          If any money was debited, your bank reverses it automatically within 5–7 days — don't worry. This is
          usually just a network issue — please try again.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <ButtonLink href="/checkout?item=all-access" variant="primary" size="lg">
            Try again →
          </ButtonLink>
          {/* TODO: real support contact (WhatsApp/email) */}
          <a href="#" className="text-sm text-muted underline hover:text-cream">
            Still not working? Message us and we&apos;ll fix it
          </a>
          <Link href="/" className="text-sm text-muted hover:text-cream">
            ← Back to courses
          </Link>
        </div>
      </div>
    </main>
  );
}
