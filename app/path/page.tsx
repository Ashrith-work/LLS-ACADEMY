import { Suspense } from "react";
import type { Metadata } from "next";
import { PathClient } from "./PathClient";

export const metadata: Metadata = {
  title: "Your path — the right course for your goal",
  robots: { index: false }, // personalised result page, not for search
};

export default function PathPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-ink" />}>
      <PathClient />
    </Suspense>
  );
}
