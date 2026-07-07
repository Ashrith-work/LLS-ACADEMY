import Link from "next/link";
import { SITE } from "@/lib/data/site";

export function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg text-cream">
            LIVE LIFE <span className="text-ember">SHAMELESS</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted">
            {SITE.tagline} A {SITE.company} brand.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-semibold text-cream">Explore</p>
          <ul className="space-y-2 text-muted">
            <li><Link href="/#courses" className="hover:text-cream">All courses</Link></li>
            <li><Link href="/all-access" className="hover:text-cream">All-access bundle</Link></li>
            <li><Link href="/start" className="hover:text-cream">Find your course</Link></li>
            <li><Link href="/about" className="hover:text-cream">Shashank&apos;s story</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-semibold text-cream">Legal & help</p>
          <ul className="space-y-2 text-muted">
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
      <div className="border-t border-cream/10 px-4 py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} {SITE.company}. All prices in INR. No refunds on digital courses —{" "}
        <Link href="/terms" className="underline hover:text-cream">why we&apos;re upfront about this</Link>.
      </div>
    </footer>
  );
}
