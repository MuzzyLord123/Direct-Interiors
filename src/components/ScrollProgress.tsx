import { motion, useScroll, useSpring } from "framer-motion";

/** 2px gold scroll-progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[150] h-0.5 origin-left bg-gold-shine"
      style={{ scaleX }}
    />
  );
}
