import type { Metadata } from "next";
import { TopBar } from "@/components/layout/TopBar";
import { Footer } from "@/components/layout/Footer";
import { SITE } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Terms & refund policy",
  description: "Live Life Shameless terms of service and refund policy — stated plainly.",
};

/**
 * Terms + refund page. The no-refund policy is stated clearly and
 * confidently — trust is built by being upfront, not by fine print.
 * TODO: have a lawyer review before launch; this is a well-structured draft.
 */
export default function TermsPage() {
  return (
    <>
      <TopBar />
      <main className="on-light bg-bone py-16 text-inkText">
        <div className="mx-auto max-w-2xl px-4">
          <h1 className="font-display text-3xl sm:text-4xl">Terms &amp; refund policy</h1>
          <p className="mt-2 text-sm text-inkText/60">Last updated: July 2026 · {SITE.company}</p>

          <section className="mt-10 space-y-8 leading-relaxed">
            <div className="rounded-2xl border-2 border-ember/40 bg-white/60 p-6">
              <h2 className="font-display text-xl">Refund policy — stated plainly</h2>
              <p className="mt-3">
                <strong>We don't give refunds.</strong> Because these are digital courses, the full content opens up
                to you the moment access is granted — so it can't be returned.
              </p>
              <p className="mt-3">That's why we do this before you buy:</p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5">
                <li>Every course page lists the exact deliverables — you know what you're getting before you pay.</li>
                <li>Prices are honest — no fake discounts, no fake timers.</li>
                <li>Not sure? Don't buy yet — watch the free content on Instagram first, and come back if you like it.</li>
              </ul>
              <p className="mt-3">
                Buy only when you're sure. We won't pressure you — notice there's no countdown timer on this page?
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl">1. Access</h2>
              <p className="mt-2">
                Once payment succeeds, access details arrive in your email instantly. Access is lifetime — personal to
                your account, not to be shared. For bundle buyers, new courses are added automatically as soon as they
                launch.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl">2. Content usage</h2>
              <p className="mt-2">
                Course content (videos, worksheets, templates) is for your personal learning. Re-recording, reselling,
                or distributing it publicly is a copyright violation — your account will be terminated, with no refund
                (see the point above — there are no refunds at all).
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl">3. Payments</h2>
              <p className="mt-2">
                All payments go through Razorpay — UPI, cards, netbanking. Prices are in INR, one-time. If a payment
                fails but money is debited, your bank auto-reverses it within 5–7 working days.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl">4. Community conduct</h2>
              <p className="mt-2">
                Be respectful in the WhatsApp community. Spam, self-promotion without permission, and harassment are
                grounds for removal. Community access is part of your course access, but it's a privilege.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl">5. Results disclaimer</h2>
              <p className="mt-2">
                The courses give you the tools — your results depend on how you apply them. We don't guarantee
                &ldquo;you'll earn this much&rdquo;; don't trust anyone who makes those guarantees.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl">6. Contact</h2>
              <p className="mt-2">
                Questions? {/* TODO: real support email/WhatsApp */} Message support — we'll reply within 24–48 hours.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
