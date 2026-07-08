import Link from "next/link";

/** Floating "Add Course" label — fixed to the bottom-left, stays visible while scrolling.
   Links to the courses section, styled to the monochrome-limestone system. */
export function AddCourseBadge() {
  return (
    <Link
      href="/#courses"
      aria-label="Add a course — browse courses"
      className="fixed bottom-6 left-6 z-50 inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-lg font-semibold text-white shadow-cardLift transition-all hover:-translate-y-0.5 hover:bg-ink/90 select-none"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      Add Course
    </Link>
  );
}
