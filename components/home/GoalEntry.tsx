/**
 * GoalEntry — hero section.
 *
 * Intentionally empty and background-less: the headline, 3D carousel, goal links,
 * and the cream + grain background were all removed per request. The section just
 * holds height so the page opens on empty space; add content/background back inside
 * when the hero is rebuilt.
 */

export function GoalEntry() {
  return (
    <section
      className="flex min-h-[90vh] items-center py-16 sm:py-24"
      aria-label="Hero"
    >
      <div className="mx-auto w-full max-w-5xl px-4" />
    </section>
  );
}
