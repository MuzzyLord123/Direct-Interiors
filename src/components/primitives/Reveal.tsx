import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";

// "Settled" = render the final visible state immediately, with no entrance
// animation: true for reduced-motion users AND for automated browsers
// (prerender/headless) so the static HTML captured for SEO / no-JS is never
// stuck at opacity:0.
function useSettled() {
  const reduce = useReducedMotion();
  const isBot = typeof navigator !== "undefined" && navigator.webdriver;
  return reduce || isBot;
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "span" | "figure";
}

/** In-view fade-up. Renders settled (visible) for reduced motion / prerender. */
export function Reveal({ children, className, delay = 0, y = 24, as = "div" }: RevealProps) {
  const settled = useSettled();
  const MotionTag = motion[as];
  if (settled) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}

/** Staggered group. Renders settled (visible) for reduced motion / prerender. */
export function RevealGroup({
  children,
  className,
  stagger = 0.06,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul";
}) {
  const settled = useSettled();
  if (settled) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }
  const MotionTag = motion[as];
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: 0.04 } },
  };
  return (
    <MotionTag className={className} variants={variants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  y = 20,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: "div" | "li";
}) {
  const settled = useSettled();
  if (settled) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }
  const MotionTag = motion[as];
  const variants: Variants = {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };
  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}
