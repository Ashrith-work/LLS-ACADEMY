import { Suspense } from "react";
import type { Metadata } from "next";
import { SuccessClient } from "./SuccessClient";

export const metadata: Metadata = { title: "Payment successful", robots: { index: false } };

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-ink" />}>
      <SuccessClient />
    </Suspense>
  );
}
