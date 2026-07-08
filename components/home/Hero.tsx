import { HeroParticles } from "./HeroParticles";

/**
 * Hero — cinematic backdrop only. All foreground content (kicker, headline,
 * CTAs, tracks, orbiting labels, ring, scroll cue) has been removed.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-5 py-28 text-center sm:px-4">
      {/* Full-bleed cinematic backdrop — layered gradient + gold glow + film grain + vignette. */}
      <div className="absolute inset-0 -z-10 bg-ink" aria-hidden>
        {/* base cinematic gradient */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(120% 95% at 50% 0%, #2c241b 0%, #171310 55%, #0c0908 100%)" }}
        />
        {/* warm gold spotlight, upper-left */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(55% 55% at 22% 16%, rgba(231,178,75,0.22) 0%, rgba(231,178,75,0) 60%)" }}
        />
        {/* WebGL spiral-galaxy particle field (desktop only; gated in HeroParticles) */}
        <HeroParticles />
        {/* film grain */}
        <div
          className="absolute inset-0 opacity-[0.14] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "160px 160px",
          }}
        />
        {/* contrast vignette */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(100% 100% at 50% 38%, transparent 52%, rgba(0,0,0,0.6) 100%)" }}
        />
      </div>
    </section>
  );
}
