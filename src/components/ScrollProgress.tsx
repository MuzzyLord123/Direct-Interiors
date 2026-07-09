import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/** 2px gold scroll-progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  // client-only decorative bar — skip during SSR
  if (typeof window === "undefined") return null;
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const spring = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  // Skip the spring under reduced motion — bind directly to scroll position.
  const scaleX = reduce ? scrollYProgress : spring;
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[150] h-0.5 origin-left bg-gold-shine"
      style={{ scaleX }}
    />
  );
}
