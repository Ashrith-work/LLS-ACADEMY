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
              <h2 className="font-display text-xl">Refund policy — clear ga cheptunnam</h2>
              <p className="mt-3">
                <strong>Mem refunds ivvam.</strong> Digital courses kabatti access ichina ventane full content
                meeku open avtundi — vapas teesukovadam possible kaadu.
              </p>
              <p className="mt-3">Anduke konadaniki mundhe ivi chestunnam:</p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5">
                <li>Prathi course page lo exact deliverables list chestam — em vastundo mundhe telustundi.</li>
                <li>Prices honest ga untayi — fake discounts, fake timers undavu.</li>
                <li>Doubts unte konakandi — mundu Instagram lo free content chudandi, nachithe randi.</li>
              </ul>
              <p className="mt-3">
                Sure ga unnappude konandi. Mem pressure cheyyam — ee page meeda countdown timer ledu, gamaninchara?
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl">1. Access</h2>
              <p className="mt-2">
                Payment success ayyaka access details mee email ki instant ga vastayi. Access lifetime — mee account
                ki personal, share cheyyakudadhu. Bundle buyers ki kotha courses launch avvagane automatic ga add
                avtayi.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl">2. Content usage</h2>
              <p className="mt-2">
                Course content (videos, worksheets, templates) mee personal learning kosam. Re-record, re-sell,
                or public ga distribute cheyyadam copyright violation — account terminate avtundi, refund undadu
                (point pai chudandi — asalu refund ledu).
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl">3. Payments</h2>
              <p className="mt-2">
                Anni payments Razorpay dwara — UPI, cards, netbanking. Prices INR lo, one-time. Payment fail ayyi
                money debit ayithe, bank 5–7 working days lo auto-reverse chestundi.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl">4. Community conduct</h2>
              <p className="mt-2">
                WhatsApp community lo respect maintain cheyyandi. Spam, self-promotion without permission, harassment
                — removal ki grounds. Community access course access lo part, kaani privilege.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl">5. Results disclaimer</h2>
              <p className="mt-2">
                Courses tools istayi — results mee implementation meeda depend avtayi. &ldquo;Intha earn
                chestaru&rdquo; ani mem guarantee cheyyam; alaanti guarantees icchevaallani nammakandi.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl">6. Contact</h2>
              <p className="mt-2">
                Questions? {/* TODO: real support email/WhatsApp */} Support ki message cheyyandi — 24–48 hours lo
                reply istam.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
