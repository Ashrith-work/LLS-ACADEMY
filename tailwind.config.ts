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
const ACCENT = "#E23C46"; // crimson accent — matches the backdrop's red ribbon
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Dark theme — content reads as premium dark glass over the crimson backdrop.
        ink: "#ECE4E1", // primary text + hairline borders (light on dark)
        inkSoft: "#B4A9A5", // secondary text
        surface: "#1C1116", // raised dark panel
        card: "#1C1116", // dark card
        bone: "#160A0E", // section base — used translucent so the backdrop shows through
        line: "#3A2B30", // dark hairline
        ember: { DEFAULT: ACCENT, soft: "#C22F39" },
        gold: ACCENT,
        lime: ACCENT,
        violet: ACCENT,
        teal: ACCENT,
        cream: "#F7F2F0", // text on accent / dark surfaces (stays light)
        muted: "#9B8F8A", // captions
        inkText: "#ECE4E1", // primary text alias
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-body)", "system-ui", "sans-serif"],
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
