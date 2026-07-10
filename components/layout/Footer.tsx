import Link from "next/link";
import { SITE, FOOTER } from "@/lib/data/site";

export function Footer() {
  return (
    <footer className="bg-[#0c0507] text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:grid-cols-3">
        <div>
          <p className="font-display text-xl font-semibold tracking-tight text-cream">
            Live Life <span className="italic text-cream">Shameless</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/60">
            {FOOTER.tagline}
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-cream/45">Explore</p>
          <ul className="space-y-2.5 text-cream/70">
            {FOOTER.explore.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="hover:text-cream">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-cream/45">Legal &amp; help</p>
          <ul className="space-y-2.5 text-cream/70">
            {FOOTER.help.map((l) => (
              <li key={l.label}>
                {/* TODO: real Instagram / support URLs on the "#" links */}
                <Link href={l.href} className="hover:text-cream">{l.label}</Link>
              </li>
            ))}
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
