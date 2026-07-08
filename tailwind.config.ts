import type { Config } from "tailwindcss";

/**
 * Direct Interiors design tokens. Every brand value lives here — a one-line
 * swap of `accent` re-skins the site (e.g. to the client's legacy red) without
 * touching components. Ships with architectural brass.
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          // near-black warm plaster
          DEFAULT: "#0C0C0B",
          soft: "#141412",
          raised: "#1A1A18",
        },
        bone: {
          // warm whites (limewash)
          DEFAULT: "#F9F8F6",
          deep: "#F1EEE8",
        },
        brass: {
          // aged brass — primary accent
          DEFAULT: "#C8A96E",
          light: "#E8D5A3",
          // AA-safe brass for small text on dark ink (>=4.5:1)
          text: "#D8BC85",
        },
        stone: "#D4C5A9", // borders / dividers
        sand: "#E8DDD0", // hover fills
        graphite: "#7C7870", // secondary text
        success: "#4A7C59",
        danger: "#B85C38",
        // semantic text tokens
        "text-dark": "#F5F3EF",
        "text-light": "#1A1A18",
        "text-muted": "#7C7870",
      },
      fontFamily: {
        display: ['"Cormorant"', "Georgia", "serif"],
        sans: ['"Outfit"', "system-ui", "sans-serif"],
        mono: ['"DM Mono"', "ui-monospace", "monospace"],
      },
      fontSize: {
        // fluid display scale
        "display-xl": ["clamp(3rem, 8vw, 6.75rem)", { lineHeight: "0.98", letterSpacing: "-0.01em" }],
        "display-lg": ["clamp(2.5rem, 6vw, 4.5rem)", { lineHeight: "1.02", letterSpacing: "-0.01em" }],
        "display-md": ["clamp(2rem, 4.5vw, 3.25rem)", { lineHeight: "1.05" }],
        "display-sm": ["clamp(1.6rem, 3vw, 2.25rem)", { lineHeight: "1.1" }],
      },
      letterSpacing: {
        eyebrow: "0.28em",
        wordmark: "0.3em",
      },
      maxWidth: {
        content: "1280px",
        prose: "68ch",
      },
      spacing: {
        section: "clamp(5.5rem, 10vw, 10rem)",
        "section-sm": "clamp(3.5rem, 7vw, 6rem)",
      },
      backgroundImage: {
        "gold-shine": "linear-gradient(135deg, #C8A96E 0%, #E8D5A3 50%, #C8A96E 100%)",
      },
      boxShadow: {
        lift: "0 24px 60px -24px rgba(0,0,0,0.55)",
        card: "0 12px 40px -16px rgba(0,0,0,0.35)",
        glow: "0 0 40px -8px rgba(200,169,110,0.45)",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "ticker": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "drift": {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "100% 100%" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        ticker: "ticker 40s linear infinite",
        drift: "drift 120s linear infinite alternate",
        shimmer: "shimmer 1.6s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
