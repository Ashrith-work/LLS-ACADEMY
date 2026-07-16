import type { Config } from "tailwindcss";

/**
 * Design tokens — "LLS · Premium Luxury Education (Dark)".
 *
 * A deep near-black canvas (#050505) with elevated graphite surfaces, a single
 * warm amber accent (#F59E0B → #FFD166 on hover), and crisp white headlines.
 * Emphasis comes from generous space, hairline white borders, soft depth
 * shadows, and the one amber accent — Stripe / Apple / Linear restraint.
 *
 * The site is built on SEMANTIC tokens, so the whole palette lives here:
 *   paper/bone  = page + section backgrounds (near-black / graphite).
 *   surface/card = raised surfaces (cards, panels) — #111.
 *   ink          = primary text (white) AND white-alpha borders/glass
 *                  (border-ink/10, bg-ink/5) — reads as hairlines on dark.
 *   inkText      = body / prominent copy (near-white). inkSoft/muted = secondary.
 *   line         = hairline borders (rgba(255,255,255,.08)).
 *   cream        = text on filled surfaces. ember = the amber accent.
 *   Legacy accent tokens (gold/lime/violet/teal) map to elevated graphite.
 */
const ACCENT = "#FF3D7A"; // legacy accent tokens (gold/lime/violet/teal) collapse onto the Volt pink accent
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Volt palette — cobalt field, hot-pink accent, mint support.
        ink: "#EEF1FF", // primary text + light-alpha borders / glass
        inkText: "#EEF1FF", // body / prominent copy
        inkSoft: "#99A4DE", // secondary text
        surface: "#16226B", // raised surface
        card: "#16226B", // card surface
        raised: "#1E2C82", // hover / dropdowns / sticky bar
        bone: "#16226B", // secondary / alternating section background
        paper: "#0D1854", // page / primary background
        mist: "#16226B", // elevated banding (video frame, alt bands)
        line: "#2C3A99", // hairline border / divider
        accentFg: "#0D1854", // text ON accent / support fills (do NOT use white)
        magenta: "#FF3D7A", // unified to the pink accent
        champagne: "#FF3D7A", // unified to the pink accent
        ember: { DEFAULT: "#FF3D7A", soft: "#FF5C90" }, // pink accent → hover
        amber: { DEFAULT: "#FF3D7A", soft: "#FF5C90" },
        support: { DEFAULT: "#5CE1C0", fg: "#0D1854" }, // mint support (badges, checks)
        success: "#22C55E",
        danger: "#EF4444",
        gold: ACCENT,
        lime: ACCENT,
        violet: ACCENT,
        teal: ACCENT,
        cream: "#EEF1FF", // light text on filled surfaces
        muted: "#99A4DE", // kickers / captions / meta
      },
      fontFamily: {
        display: ["var(--font-display)", "Inter", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Fluid luxury scale — large headings 72/56/40, tight tracking.
        kicker: ["0.75rem", { letterSpacing: "0.2em", lineHeight: "1" }],
        display: ["clamp(2.5rem, 6vw, 4.5rem)", { lineHeight: "1.03", letterSpacing: "-0.02em" }],
        pullquote: ["clamp(1.75rem, 3.5vw, 2.75rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        standfirst: ["clamp(1.0625rem, 1.5vw, 1.25rem)", { lineHeight: "1.6" }],
      },
      borderWidth: {
        3: "3px",
      },
      boxShadow: {
        // Deep, soft luxury depth on dark.
        glow: "0 0 0 1px rgba(255,255,255,0.04)",
        limeGlow: "0 0 0 1px rgba(255,255,255,0.04)",
        cardLift: "0 20px 60px rgba(0,0,0,0.35)",
        cardHover: "0 30px 80px rgba(255,61,122,0.18)",
        amberGlow: "0 30px 80px rgba(255,61,122,0.18)",
        brutal: "0 10px 30px rgba(0,0,0,0.30)",
        brutalLg: "0 30px 80px rgba(0,0,0,0.45)",
        btn: "0 8px 24px rgba(255,61,122,0.30)",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        // Slow floating gradient blur behind the hero.
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(24px, -28px) scale(1.08)" },
          "66%": { transform: "translate(-20px, 16px) scale(0.96)" },
        },
        // Fade-up section reveal (mirrors the .reveal CSS / Framer spec).
        "fade-up": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "spin-reverse": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
        "carousel-spin": {
          from: { transform: "perspective(1200px) rotateY(0deg) translate(-28%, -2.1%)" },
          to: { transform: "perspective(1200px) rotateY(360deg) translate(-28%, -2.1%)" },
        },
      },
      animation: {
        drift: "drift 7s ease-in-out infinite",
        blob: "blob 14s ease-in-out infinite",
        "fade-up": "fade-up 0.7s ease-out both",
        marquee: "marquee 45s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        "spin-medium": "spin 8s linear infinite",
        orbit: "spin 20s linear infinite",
        "orbit-counter": "spin-reverse 20s linear infinite",
        "carousel-spin": "carousel-spin 12s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
