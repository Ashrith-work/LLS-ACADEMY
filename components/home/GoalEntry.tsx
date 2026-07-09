/**
 * GoalEntry — centered framed banner hero.
 *
 * A dark full-width band (#0b0b0d) with a centered ~1120px wrapper. The image
 * sits in a frame: rounded corners (16px), soft shadow, thin subtle border.
 * It fills the frame width (w-full, h-auto) with nothing cropped, colors untouched.
 *
 * TO GO LIVE, drop the image into /public as `hero-banner.png` (or update HERO_SRC):
 *   C:\Users\Sunil\SUNIL'S LLS CLONE\LLS-ACADEMY\public\hero-banner.png
 * Until then the frame shows an empty dark placeholder.
 */

const HERO_SRC = "/hero-banner.png";

export function GoalEntry() {
  return (
    <section className="bg-[#0b0b0d]" aria-label="Hero">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-10 sm:py-16">
        <div className="min-h-[200px] overflow-hidden rounded-2xl border border-white/10 bg-[#111214] shadow-[0_24px_70px_-24px_rgba(0,0,0,0.75),0_6px_18px_rgba(0,0,0,0.45)] sm:min-h-[320px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_SRC}
            alt="Hero banner"
            className="block h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
