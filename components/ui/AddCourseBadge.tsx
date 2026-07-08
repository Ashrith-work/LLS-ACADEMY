/** Floating "Add Course" label — fixed to the bottom-right, stays visible while scrolling.
   Purely a visual badge (no action), styled to the monochrome-limestone system. */
export function AddCourseBadge() {
  return (
    <div
      aria-hidden
      className="fixed bottom-5 left-5 z-50 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream shadow-cardLift select-none"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      Add Course
    </div>
  );
}
