"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CartButton } from "@/components/cart/CartButton";
import { LoginModal } from "@/components/layout/LoginModal";
import { AboutDrawer } from "@/components/layout/AboutDrawer";

/**
 * Top bar — menu + logo on the left, Courses + Cart + Log in on the right.
 *
 * Two header actions open in-page overlays instead of navigating away:
 *  • the hamburger (animates into an X) opens the AboutDrawer (left slide-in);
 *  • the "Log in" button opens the LoginModal (centered).
 * One shared scrim sits behind whichever overlay is open — clicking it or
 * pressing Esc closes it. Overlays render as siblings of <header> (not inside
 * the sticky bar) so they layer cleanly above the floating "Add Course" button.
 */

type Overlay = "login" | "about" | null;

export function TopBar() {
  const [overlay, setOverlay] = useState<Overlay>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const openOverlay =
    (kind: Exclude<Overlay, null>) => (e: React.MouseEvent<HTMLButtonElement>) => {
      triggerRef.current = e.currentTarget;
      setOverlay(kind);
    };

  const close = useCallback(() => {
    setOverlay(null);
    // Return focus to whatever opened the overlay.
    triggerRef.current?.focus();
  }, []);

  // Shared behaviour: lock scroll + close on Esc while any overlay is open.
  useEffect(() => {
    if (!overlay) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [overlay, close]);

  const isAbout = overlay === "about";
  const line = "h-[2px] w-5 rounded-full bg-current transition-all duration-300 motion-reduce:transition-none";

  return (
    <>
      {/* Header sits ABOVE the About drawer (so the hamburger visibly morphs to
          an X and toggles it); for the Login modal it stays at its normal level
          and the scrim/modal cover it. */}
      <header
        className={`sticky top-0 border-b border-line bg-bone/90 backdrop-blur ${
          isAbout ? "z-[110]" : "z-40"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-4" aria-label="Main">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={(e) => (isAbout ? close() : openOverlay("about")(e))}
              aria-label={isAbout ? "Close menu" : "About Shashank"}
              aria-haspopup="dialog"
              aria-expanded={isAbout}
              className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-lg text-inkText transition hover:bg-ink/5"
            >
              <span className={`${line} ${isAbout ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`${line} ${isAbout ? "opacity-0" : ""}`} />
              <span className={`${line} ${isAbout ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </button>
            <Link href="/" className="font-display text-xl font-semibold tracking-tight text-inkText">
              Live Life <span className="italic text-inkText">Shameless</span>
            </Link>
          </div>
          <div className="flex items-center gap-5 sm:gap-7">
            <Link href="/#courses" className="text-sm text-muted transition hover:text-ink">
              Courses
            </Link>
            <CartButton />
            <button
              type="button"
              onClick={openOverlay("login")}
              aria-haspopup="dialog"
              aria-expanded={overlay === "login"}
              className="rounded-full bg-ember px-5 py-2 text-sm font-medium text-cream transition-all hover:-translate-y-0.5 hover:bg-ember-soft"
            >
              Log in
            </button>
          </div>
        </nav>
      </header>

      {/* One shared scrim — click to close whichever overlay is open. */}
      <div
        onClick={close}
        aria-hidden
        className={`fixed inset-0 z-[90] bg-[#0E0E14]/60 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none ${
          overlay ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <LoginModal open={overlay === "login"} onClose={close} />
      <AboutDrawer open={isAbout} onClose={close} />
    </>
  );
}
