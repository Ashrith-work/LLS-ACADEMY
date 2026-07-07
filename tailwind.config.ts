import type { Config } from "tailwindcss";

/**
 * Design tokens — "Bold Ink & Ember".
 * Ink base = premium/serious. Ember = courage/action (CTAs).
 * Lime = RARE shock colour (one key action per screen, big numbers).
 * Gold = premium value (bundle only). Violet = aspiration ("Build your brand" lane).
 * Teal = trust/calm ("Grow in career & life" lane). Bone = warm light canvas for proof/story.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E0E14",
        surface: "#17161F",
        card: "#1E1C28",
        bone: "#F6F1E7",
        ember: { DEFAULT: "#FF4E2B", soft: "#FF6A4C" },
        gold: "#F5A623",
        lime: "#C4F82A",
        violet: "#7C5CFF",
        teal: "#12D6A6",
        cream: "#EDE9E0",
        muted: "#A7A29A",
        inkText: "#1A1720",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(255, 78, 43, 0.45)",
        limeGlow: "0 0 32px -6px rgba(196, 248, 42, 0.35)",
        cardLift: "0 16px 40px -16px rgba(0, 0, 0, 0.6)",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        drift: "drift 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
