"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Hamburger (three lines) that sits in the top-left and opens a slide-in
 * drawer listing everything on the site: the course goals, the bundle,
 * and the standalone pages.
 */

type NavLink = { href: string; label: string; note?: string };

const GOALS: NavLink[] = [
  { href: "/#lane-sell", label: "Sell better", note: "Sales, marketing & business" },
  { href: "/#lane-brand", label: "Build your brand", note: "Personal brand & content" },
  { href: "/#lane-grow", label: "Grow in career & life", note: "Communication & confidence" },
];

const BROWSE: NavLink[] = [
  { href: "/#courses", label: "All courses" },
  { href: "/#reels", label: "Reels", note: "60-second course teasers" },
  { href: "/all-access", label: "All-Access", note: "Every course, one price" },
  { href: "/path", label: "Learning path" },
];

const MORE: NavLink[] = [
  { href: "/about", label: "About Shashank" },
  { href: "/start", label: "Login" },
  { href: "/terms", label: "Terms" },
];

export function NavDrawer() {
  const [open, setOpen] = useState(false);

  // Lock body scroll + close on Escape while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-lg text-inkText transition hover:bg-ink/5"
      >
        <span className="h-[2px] w-5 rounded-full bg-current" />
        <span className="h-[2px] w-5 rounded-full bg-current" />
        <span className="h-[2px] w-5 rounded-full bg-current" />
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`fixed left-0 top-0 z-50 flex h-full w-[300px] max-w-[85vw] flex-col bg-bone shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-display text-lg font-semibold tracking-tight text-inkText"
          >
            Live Life <span className="italic text-ember">Shameless</span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-xl leading-none text-muted transition hover:bg-ink/5 hover:text-ink"
          >
            ×
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="All pages">
          <Section title="Browse by goal" links={GOALS} onNavigate={() => setOpen(false)} />
          <Section title="Courses" links={BROWSE} onNavigate={() => setOpen(false)} />
          <Section title="More" links={MORE} onNavigate={() => setOpen(false)} />
        </nav>
      </aside>
    </>
  );
}

function Section({
  title,
  links,
  onNavigate,
}: {
  title: string;
  links: NavLink[];
  onNavigate: () => void;
}) {
  return (
    <div className="mb-5">
      <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
        {title}
      </p>
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          onClick={onNavigate}
          className="block rounded-lg px-2 py-2 transition hover:bg-ink/5"
        >
          <span className="block text-sm font-medium text-inkText">{l.label}</span>
          {l.note && <span className="block text-xs text-muted">{l.note}</span>}
        </Link>
      ))}
    </div>
  );
}
