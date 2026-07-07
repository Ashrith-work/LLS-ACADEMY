"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/**
 * Progressive 3D loader — the performance-budget gatekeeper.
 *
 * The CSS fallback renders IMMEDIATELY (it is the default). The WebGL scene
 * is dynamically imported only after mount, and only when the device clears
 * every bar below. On a mid-range Android on slow data the user simply gets
 * the (still handsome) 2D composition and never downloads three.js at all.
 */
const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

function deviceCanAfford3D(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (window.innerWidth < 768) return false; // phones get the 2D fallback, always
  const nav = navigator as Navigator & {
    hardwareConcurrency?: number;
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  if ((nav.hardwareConcurrency ?? 0) < 4) return false;
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return false;
  const conn = nav.connection;
  if (conn?.saveData) return false;
  if (conn?.effectiveType && ["slow-2g", "2g", "3g"].includes(conn.effectiveType)) return false;
  return true;
}

/** 2D fallback: layered "course tiles" with pure-CSS depth. Zero JS cost. */
function Hero2D() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="hero-tile absolute left-[8%] top-[12%] h-24 w-40 rotate-[-2deg] animate-drift" />
      <div
        className="hero-tile absolute right-[10%] top-[6%] h-28 w-44 rotate-[2deg] animate-drift"
        style={{ animationDelay: "-2s", borderColor: "#6A5A96" }}
      />
      <div
        className="hero-tile absolute bottom-[18%] left-[16%] h-28 w-44 rotate-[1.5deg] animate-drift"
        style={{ animationDelay: "-4s", borderColor: "#2F6E57" }}
      />
      <div
        className="hero-tile absolute bottom-[8%] right-[14%] h-24 w-40 rotate-[-1.5deg] animate-drift"
        style={{ animationDelay: "-1s", borderColor: "#C0402A" }}
      />
      {/* Central accent glow — the "breaking out" moment, a soft plum halo. */}
      <div
        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-2xl"
        style={{ background: "#6A5A96" }}
      />
    </div>
  );
}

export function HeroVisual() {
  const [use3D, setUse3D] = useState(false);

  useEffect(() => {
    // Decide after paint so 3D can never block first render.
    const idle = (cb: () => void) =>
      "requestIdleCallback" in window ? (window as any).requestIdleCallback(cb) : setTimeout(cb, 600);
    idle(() => {
      if (deviceCanAfford3D()) setUse3D(true);
    });
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0">
      {use3D ? <Hero3D /> : <Hero2D />}
    </div>
  );
}
