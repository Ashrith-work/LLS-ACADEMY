import Image from "next/image";

/**
 * Hero — full-viewport background-image section with a dark overlay.
 *
 * Full 100vh height, background image via next/image (fill + object-cover),
 * a 60% black overlay, and a vertically-centered (empty) content area.
 * Swap HERO_IMAGE for your image in /public.
 */

const HERO_IMAGE = "/hero-banner.png";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Full-screen background image */}
      <Image
        src={HERO_IMAGE}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark overlay — black at 60% opacity */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Vertically + horizontally centered content area (intentionally empty) */}
      <div className="relative z-10 flex h-full w-full items-center justify-center px-4 sm:px-6 lg:px-8" />
    </section>
  );
}
