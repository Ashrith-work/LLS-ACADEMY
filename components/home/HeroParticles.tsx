"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/**
 * Performance gatekeeper for the WebGL galaxy background.
 * The scene loads only after paint, and only on capable, motion-friendly
 * desktops. Everyone else keeps the plain gradient hero (this renders null).
 */
const GalaxyField = dynamic(() => import("./GalaxyField"), { ssr: false });

function deviceCanAfford(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (window.innerWidth < 768) return false;
  const nav = navigator as Navigator & {
    hardwareConcurrency?: number;
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  if ((nav.hardwareConcurrency ?? 0) < 4) return false;
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return false;
  if (nav.connection?.saveData) return false;
  return true;
}

export function HeroParticles() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const idle = (cb: () => void) =>
      "requestIdleCallback" in window ? (window as any).requestIdleCallback(cb) : setTimeout(cb, 500);
    idle(() => {
      if (deviceCanAfford()) setOn(true);
    });
  }, []);

  if (!on) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <GalaxyField />
    </div>
  );
}
