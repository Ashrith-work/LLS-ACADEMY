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
const INK = "#1F1C17";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: INK,
        inkSoft: "#5C574E",
        surface: "#FBFAF7",
        card: "#FBFAF7",
        bone: "#EFECE4",
        line: "#DCD7CC",
        ember: { DEFAULT: INK, soft: "#33302A" },
        gold: INK,
        lime: INK,
        violet: INK,
        teal: INK,
        cream: "#FBFAF7",
        muted: "#8A8377",
        inkText: INK,
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
      },
      animation: {
        drift: "drift 7s ease-in-out infinite",
        marquee: "marquee 45s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        "spin-medium": "spin 13s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
