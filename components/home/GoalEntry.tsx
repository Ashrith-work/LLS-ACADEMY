/**
 * GoalEntry — image hero.
 *
 * Full-bleed background image (object-cover), no background color — the section
 * is transparent until the image is added.
 *
 * TO GO LIVE, drop the image into /public as `hero.jpg` (or update HERO_SRC):
 *   C:\Users\Sunil\SUNIL'S LLS CLONE\LLS-ACADEMY\public\hero.jpg
 */

const HERO_SRC = "/hero.jpg";

export function GoalEntry() {
  return (
    <section
      className="relative flex min-h-[90vh] items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Full-bleed background image (kept). No background color behind it. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={HERO_SRC}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Content slot — empty for now; drop a headline / CTA in here over the image. */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4" />
    </section>
  );
}
