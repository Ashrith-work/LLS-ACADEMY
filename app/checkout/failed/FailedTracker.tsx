"use client";

import { useEffect } from "react";
import { track } from "@/lib/tracking";

/** Fire-and-forget failure analytics on mount. */
export function FailedTracker() {
  useEffect(() => {
    track("payment_failed");
  }, []);
  return null;
}
