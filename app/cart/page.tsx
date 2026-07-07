import type { Metadata } from "next";
import { TopBar } from "@/components/layout/TopBar";
import { Footer } from "@/components/layout/Footer";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Your cart",
  description: "The courses you've added — review, remove, and check out.",
};

export default function CartPage() {
  return (
    <>
      <TopBar />
      <main className="mx-auto min-h-[70vh] max-w-5xl px-5 py-16 sm:px-4">
        <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">Your cart</h1>
        <p className="mt-3 text-sm text-muted">The courses you&apos;ve added. Lifetime access on everything.</p>
        <CartView />
      </main>
      <Footer />
    </>
  );
}
