import Link from "next/link";

/** Floating "Add Course" label — fixed to the bottom-left, stays visible while scrolling.
   Links to the courses section, styled to the monochrome-limestone system. */
export function AddCourseBadge() {
  return (
    <Link
      href="/#courses"
      aria-label="Add a course — browse courses"
      className="fixed bottom-5 left-5 z-50 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream shadow-cardLift transition-all hover:-translate-y-0.5 hover:bg-ink/90 select-none"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      Add Course
    </Link>
  );
}
