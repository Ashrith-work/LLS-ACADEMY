/**
 * GoalEntry — cinematic video hero.
 *
 * Full-bleed background <video> (autoplay / muted / loop / playsinline), covered
 * by a dark gradient overlay for legibility. A near-black fallback keeps the hero
 * looking intentional until the clip is added, and `poster` is the first paint /
 * reduced-motion still.
 *
 * TO GO LIVE, drop these into /public (referenced below):
 *   - hero.webm  (preferred, smaller)   → VIDEO.webm
 *   - hero.mp4   (fallback, broad support) → VIDEO.mp4
 *   - hero-poster.jpg (first-frame still) → VIDEO.poster
 * Keep the loop short (~4–8s) and the files small (~5–8 MB total) for a fast hero.
 * Prompt used to generate the clip:
 *   "Wide side cinematic reveal. One of giant mouths suddenly snaps shut just
 *    behind the craft. Debris, dust, violent shockwave. Camera close behind tail.
 *    Fast pacing, intense tension, realistic physics, dust, haze, cinematic motion
 *    blur, filmic lighting, monumental scale."
 */

const VIDEO = {
  webm: "/hero.webm",
  mp4: "/hero.mp4",
  poster: "/hero-poster.jpg",
};

export function GoalEntry() {
  return (
    <section
      className="relative flex min-h-[90vh] items-center overflow-hidden bg-[#0b0a09]"
      aria-label="Hero"
    >
      {/* Full-bleed background video. Falls back to the near-black section bg + poster
          until /public/hero.* exist, so nothing looks broken while it's empty. */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={VIDEO.poster}
        aria-hidden
      >
        <source src={VIDEO.webm} type="video/webm" />
        <source src={VIDEO.mp4} type="video/mp4" />
      </video>

      {/* Cinematic overlay — deepens edges + bottom so any future headline/CTA reads. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 38%, rgba(0,0,0,0.0) 60%), radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {/* Content slot — empty for now; drop the headline / CTA in here over the video. */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4" />
    </section>
  );
}
