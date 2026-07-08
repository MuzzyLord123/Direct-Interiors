import type { Variants } from "framer-motion";

// Shared Framer Motion variants. Editorial easing, restrained distances.
export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

// clip-in for hero headline lines
export const lineClip: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)", y: "0.4em" },
  show: { clipPath: "inset(0% 0 0 0)", y: 0, transition: { duration: 0.8, ease: EASE } },
};
