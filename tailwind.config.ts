import type { Config } from "tailwindcss";

/**
 * Design tokens — "LLS · Monochrome Limestone (Editorial)".
 * Warm limestone/oat paper, near-white raised surfaces, warm near-black ink.
 * MONOCHROME: there is no colour accent — CTAs are solid ink. Emphasis comes
 * from type (Fraunces serif), weight, and generous whitespace, not colour.
 *
 * bone   = page background (warm limestone/oat).
 * surface/card = raised surfaces (cards, panels) — near-white.
 * ink    = primary text, buttons, the rare dark block (footer).
 * inkSoft= secondary text. muted = captions / eyebrows / meta.
 * line   = hairline borders & dividers.
 * cream  = text on filled (ink) surfaces.
 * The former accent tokens (ember/lime/gold/violet/teal) are all mapped to
 * ink so any legacy `text-ember` / `bg-lime` etc. renders monochrome.
 */
const ACCENT = "#0E0E14"; // strong ink — used for legacy accent tokens
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Warm editorial palette — cream paper, ink "chapter" surfaces,
        // magenta + champagne as the only accents (used sparingly).
        ink: "#0E0E14", // dark "chapter" surfaces + strong headlines
        inkText: "#2A2622", // body text on cream
        inkSoft: "#5C544C", // secondary text
        surface: "#FBF6EA", // warm off-white raised surface
        card: "#FBF6EA", // warm card (never pure white)
        bone: "#F4EEE2", // paper — page / section base
        paper: "#F4EEE2", // explicit alias for --paper
        mist: "#ECE3D2", // warm banding for alternating sections
        line: "#D8CEBC", // warm hairline on cream
        magenta: "#BE185D", // accent — hover underlines, "Start here", one hairline
        champagne: "#C9A96A", // premium accent — bundle + "Start here" moments
        ember: { DEFAULT: ACCENT, soft: "#22222B" },
        gold: ACCENT,
        lime: ACCENT,
        violet: ACCENT,
        teal: ACCENT,
        cream: "#F7F1E6", // warm light text on ink surfaces
        muted: "#8A8074", // kickers / captions / meta
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Editorial fluid scale.
        kicker: ["0.75rem", { letterSpacing: "0.2em", lineHeight: "1" }],
        display: ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        pullquote: ["clamp(1.75rem, 3.5vw, 2.75rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        standfirst: ["clamp(1.0625rem, 1.5vw, 1.25rem)", { lineHeight: "1.55" }],
      },
      borderWidth: {
        3: "3px",
      },
      boxShadow: {
        // Soft, elegant depth — no hard offsets.
        glow: "0 1px 3px rgba(31, 28, 23, 0.06)",
        limeGlow: "0 1px 3px rgba(31, 28, 23, 0.06)",
        cardLift: "0 24px 48px -30px rgba(31, 28, 23, 0.30)",
        brutal: "0 2px 10px -4px rgba(31, 28, 23, 0.14)",
        brutalLg: "0 30px 60px -32px rgba(31, 28, 23, 0.34)",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        // Seamless horizontal reel — track holds two copies, slides one copy width.
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        // Counter-rotation to keep orbiting children upright.
        "spin-reverse": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
        // Hero carousel: a full 360° 3D flip. The translate() keeps the still cropped
        // to its card band (see GoalEntry CAROUSEL); rotateY does the continuous spin.
        "carousel-spin": {
          from: { transform: "perspective(1200px) rotateY(0deg) translate(-28%, -2.1%)" },
          to: { transform: "perspective(1200px) rotateY(360deg) translate(-28%, -2.1%)" },
        },
      },
      animation: {
        drift: "drift 7s ease-in-out infinite",
        marquee: "marquee 45s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        "spin-medium": "spin 8s linear infinite",
        // Paired orbit animations (same duration → children stay upright).
        orbit: "spin 20s linear infinite",
        "orbit-counter": "spin-reverse 20s linear infinite",
        "carousel-spin": "carousel-spin 12s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
