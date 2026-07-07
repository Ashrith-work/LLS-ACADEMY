import { Suspense } from "react";
import type { Metadata } from "next";
import { CheckoutClient } from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-ink" />}>
      <CheckoutClient />
    </Suspense>
  );
}
