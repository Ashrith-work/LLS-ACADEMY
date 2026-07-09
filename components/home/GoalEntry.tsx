/**
 * GoalEntry — hero section.
 *
 * Intentionally empty: the headline, 3D carousel still, and goal links were
 * removed per request. The section keeps its height and the warm cream + grain
 * background so the page still opens on that space; drop content back inside
 * the inner container when the hero is ready to be rebuilt.
 */

const BG = "#F1EAD9"; // warm earthy sand / tan

/* Subtle earthy texture layered over the cream base:
   a faint fractal-noise film grain (inline SVG, no asset) blended in soft-light,
   plus two soft warm radial washes (ochre top-left, olive bottom-right). */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.65'/%3E%3C/svg%3E\")";
const BG_IMAGE = `${GRAIN}, radial-gradient(1200px 600px at 15% 8%, rgba(192,144,47,0.10), transparent 60%), radial-gradient(1000px 700px at 85% 92%, rgba(95,122,30,0.09), transparent 60%)`;
const BG_BLEND = "soft-light, normal, normal";

export function GoalEntry() {
  return (
    <section
      className="flex min-h-[90vh] items-center py-16 sm:py-24"
      style={{ backgroundColor: BG, backgroundImage: BG_IMAGE, backgroundBlendMode: BG_BLEND }}
      aria-label="Hero"
    >
      <div className="mx-auto w-full max-w-5xl px-4" />
    </section>
  );
}
