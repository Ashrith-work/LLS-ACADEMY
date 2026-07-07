import { ButtonLink } from "@/components/ui/Button";
import { HeroVisual } from "@/components/home/HeroVisual";
import { TOTAL_COUNT } from "@/lib/data/courses";
import { SITE } from "@/lib/data/site";

/**
 * Hero — scale + boldness. Sells the transformation and the breadth.
 * Ink base, ember + lime accents, violet-lit visual.
 * The visual is absolutely-positioned decoration; text paints first, always.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <HeroVisual />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pb-24 pt-20 text-center sm:pb-32 sm:pt-28">
        <p className="mb-5 rounded-full border border-cream/15 bg-surface/70 px-4 py-1.5 text-xs text-muted sm:text-sm">
          {SITE.instagramReach} Telugu vaallaki reach ayina Shashank nunchi
        </p>

        <h1 className="max-w-3xl font-display text-4xl leading-[1.08] text-cream sm:text-6xl">
          Chinna town lo puttadam nee fault kaadu.{" "}
          <span className="text-ember">Akkade aagipovadam</span> nee choice.
        </h1>

        <p className="mt-6 max-w-xl text-base text-muted sm:text-lg">
          Sales, communication, business, career — <span className="text-cream">{TOTAL_COUNT} courses</span>, anni
          Tinglish lo. Nerchuko, apply cheyyi, edugu. Lifetime access.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          {/* THE action on this screen — lime is reserved for exactly this. */}
          <ButtonLink href="/start" variant="lime" size="lg">
            Find your course →
          </ButtonLink>
          <ButtonLink href="/all-access" variant="ghost" size="lg">
            Or get all {TOTAL_COUNT} · lifetime
          </ButtonLink>
        </div>

        <p className="mt-6 text-xs text-muted">
          2 chinna questions → mee goal ki correct course. 30 seconds.
        </p>
      </div>
    </section>
  );
}
