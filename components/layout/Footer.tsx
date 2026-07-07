import Link from "next/link";
import { SITE } from "@/lib/data/site";

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:grid-cols-3">
        <div>
          <p className="font-display text-xl font-semibold tracking-tight text-cream">
            Live Life <span className="italic text-cream">Shameless</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/60">
            {SITE.tagline} A {SITE.company} brand.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-cream/45">Explore</p>
          <ul className="space-y-2.5 text-cream/70">
            <li><Link href="/#courses" className="hover:text-cream">All courses</Link></li>
            <li><Link href="/all-access" className="hover:text-cream">All-access bundle</Link></li>
            <li><Link href="/start" className="hover:text-cream">Find your course</Link></li>
            <li><Link href="/about" className="hover:text-cream">Shashank&apos;s story</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-cream/45">Legal & help</p>
          <ul className="space-y-2.5 text-cream/70">
            <li><Link href="/terms" className="hover:text-cream">Terms &amp; refund policy</Link></li>
            <li>
              {/* TODO: real Instagram profile URL */}
              <a href="#" className="hover:text-cream">Instagram — {SITE.instagramReach} reached</a>
            </li>
            <li>
              {/* TODO: real support email/WhatsApp */}
              <a href="#" className="hover:text-cream">Support</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 px-4 py-6 text-center text-xs text-cream/55">
        © {new Date().getFullYear()} {SITE.company}. All prices in INR. No refunds on digital courses —{" "}
        <Link href="/terms" className="underline hover:text-cream">why we&apos;re upfront about this</Link>.
      </div>
    </footer>
  );
}
