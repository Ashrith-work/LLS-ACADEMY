import Link from "next/link";
import { CartButton } from "@/components/cart/CartButton";

/**
 * Minimal top bar: logo on the left, Courses + Cart + Login on the right.
 */
export function TopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bone/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-4" aria-label="Main">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight text-inkText">
          Live Life <span className="italic text-ember">Shameless</span>
        </Link>
        <div className="flex items-center gap-5 sm:gap-7">
          <Link href="/#courses" className="text-sm text-muted transition hover:text-ink">
            Courses
          </Link>
          <CartButton />
          <Link
            href="/start"
            className="rounded-full bg-ink px-5 py-2 text-sm font-medium text-cream transition-all hover:-translate-y-0.5 hover:bg-ink/90"
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}
