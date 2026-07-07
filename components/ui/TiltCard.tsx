"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * CSS 3D tilt — pointer-reactive depth without WebGL.
 * Desktop-pointer only (hover media query via JS check is skipped; touch
 * devices simply never fire pointermove with fine granularity that matters).
 * Respects prefers-reduced-motion by doing nothing.
 */
export function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${px * 7}deg) rotateX(${py * -7}deg) translateZ(4px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div className="tilt-wrap h-full">
      <div ref={ref} className={cn("tilt-card h-full", className)} onPointerMove={onMove} onPointerLeave={onLeave}>
        {children}
      </div>
    </div>
  );
}
