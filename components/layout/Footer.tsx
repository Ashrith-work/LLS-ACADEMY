import Link from "next/link";
import { SITE, FOOTER } from "@/lib/data/site";
import { Grain } from "@/components/ui/Grain";

/** Refined dark footer — small-caps labels, hairline dividers, grain. */
export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[color:var(--hairline-invert)] bg-paper text-cream">
      <Grain opacity={0.05} />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:grid-cols-3 sm:gap-16 sm:py-20">
        <div className="sm:max-w-xs">
          <p className="font-display text-2xl font-medium tracking-tight text-cream">
            Live Life <span className="italic">Shameless</span>
          </p>
          <p className="mt-4 text-sm leading-relaxed text-cream/60">{FOOTER.tagline}</p>
        </div>

        <nav aria-label="Explore" className="text-sm">
          <p className="text-kicker uppercase text-cream/40">Explore</p>
          <ul className="mt-5 space-y-3">
            {FOOTER.explore.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="text-cream/75 underline-offset-4 transition-colors hover:text-cream hover:underline hover:decoration-champagne"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal & help" className="text-sm">
          <p className="text-kicker uppercase text-cream/40">Legal &amp; help</p>
          <ul className="mt-5 space-y-3">
            {FOOTER.help.map((l) => (
              <li key={l.label}>
                {/* TODO: real Instagram / support URLs on the "#" links */}
                <Link
                  href={l.href}
                  className="text-cream/75 underline-offset-4 transition-colors hover:text-cream hover:underline hover:decoration-champagne"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="relative border-t border-[color:var(--hairline-invert)] px-4 py-6 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} {SITE.company}. All prices in INR. No refunds on digital courses —{" "}
        <Link href="/terms" className="underline decoration-champagne underline-offset-4 hover:text-cream">
          why we&apos;re upfront about this
        </Link>
        .
      </div>
    </footer>
  );
}
