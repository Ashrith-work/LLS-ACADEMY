"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";

/**
 * AboutDrawer — left slide-in "About Shashank" drawer.
 *
 * Reusable + presentational: the parent (TopBar) owns the shared scrim + open
 * state and the animated hamburger; this renders only the sliding panel when
 * `open`. Brand: cream #F4EFE6 panel, Fraunces heading, a magenta (#fa255e)
 * vertical timeline, champagne (#C9A15F) portrait ring.
 */

const MAGENTA = "#fa255e";

const STEPS: { title: string; note?: string }[] = [
  { title: "Engineering → confusion", note: "A degree, and no idea what came next." },
  { title: "Sales floor → director", note: "Rose to director at Luxury Escapes." },
  { title: "IIM Lucknow", note: "Went back to sharpen the craft." },
  { title: "Bootstrapped founder", note: "StartupWithShashank — 3.8M+ reached." },
  { title: "Now — your turn", note: "Passing the playbook to you." },
];

export function AboutDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [show, setShow] = useState(false);

  // Enter animation + focus the close button on open.
  useEffect(() => {
    if (open) {
      const raf = setTimeout(() => setShow(true), 10);
      const focus = setTimeout(() => closeRef.current?.focus(), 70);
      return () => {
        clearTimeout(raf);
        clearTimeout(focus);
      };
    }
    setShow(false);
  }, [open]);

  // Focus trap: keep Tab within the drawer while open.
  function onKeyDownTrap(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "Tab") return;
    const nodes = panelRef.current?.querySelectorAll<HTMLElement>(
      'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])',
    );
    if (!nodes || nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  if (!open) return null;

  return (
    <aside
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-title"
      onKeyDown={onKeyDownTrap}
      className={`fixed left-0 top-0 z-[100] flex h-full w-[380px] max-w-[88vw] flex-col bg-[#F4EFE6] shadow-[0_0_120px_-10px_rgba(14,14,20,0.6)] transition-transform duration-300 ease-out motion-reduce:transition-none ${
        show ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* pt clears the sticky header, which stays above this drawer so its
          hamburger can morph to an X. */}
      <div className="flex items-center justify-end px-4 pt-[72px]">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-9 w-9 items-center justify-center rounded-full text-xl leading-none text-[#0E0E14]/50 transition hover:bg-[#0E0E14]/5 hover:text-[#0E0E14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fa255e]"
        >
          ×
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-8">
        {/* Portrait circle — drop a real photo in as the <img>/background later. */}
        <div
          className="flex h-24 w-24 items-center justify-center rounded-full font-display text-3xl font-semibold text-[#0E0E14] ring-2 ring-[#C9A15F] ring-offset-2 ring-offset-[#F4EFE6]"
          style={{ backgroundImage: "linear-gradient(140deg, #E4C88A 0%, #C9A15F 100%)" }}
          aria-hidden
        >
          S
        </div>

        <h2 id="about-title" className="mt-5 font-display text-[1.6rem] font-semibold leading-[1.15] text-[#0E0E14]">
          Not a guru. Someone who struggled just like you.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#0E0E14]/65">
          Shashank has been the confused graduate, the nervous salesperson, and the founder starting
          from zero. Here&rsquo;s the short version of how the path unfolded.
        </p>

        {/* Magenta vertical timeline */}
        <ol className="relative mt-7 ml-2 border-l-2" style={{ borderColor: `${MAGENTA}55` }}>
          {STEPS.map((s) => (
            <li key={s.title} className="relative pb-6 pl-6 last:pb-0">
              <span
                className="absolute -left-[8px] top-1 h-3.5 w-3.5 rounded-full ring-4 ring-[#F4EFE6]"
                style={{ backgroundColor: MAGENTA }}
                aria-hidden
              />
              <p className="text-[15px] font-semibold text-[#0E0E14]">{s.title}</p>
              {s.note && <p className="mt-0.5 text-xs leading-snug text-[#0E0E14]/55">{s.note}</p>}
            </li>
          ))}
        </ol>
      </div>

      <div className="border-t border-[#0E0E14]/10 px-6 py-4">
        <Link
          href="/about"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 text-sm font-semibold transition hover:gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fa255e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4EFE6]"
          style={{ color: MAGENTA }}
        >
          Read the full story <span aria-hidden>→</span>
        </Link>
      </div>
    </aside>
  );
}
