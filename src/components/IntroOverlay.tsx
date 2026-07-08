import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

const WORD = "DIRECT INTERIORS";

/**
 * Page-load wordmark: letters drop in, the mark slides up and fades, revealing
 * the page. Shown once per session. Skipped for reduced motion and for
 * automated browsers (so prerender captures the real page, not the overlay).
 */
export function IntroOverlay() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const isBot = typeof navigator !== "undefined" && (navigator as Navigator).webdriver;
    const seen = sessionStorage.getItem("di-intro");
    if (reduce || isBot || seen) return;
    setShow(true);
    sessionStorage.setItem("di-intro", "1");
    const t = setTimeout(() => setShow(false), 1900);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[300] flex items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.7, ease: EASE } }}
          aria-hidden="true"
        >
          <div className="overflow-hidden">
            <motion.p
              className="font-display text-[9vw] font-light tracking-wordmark text-text-dark md:text-6xl"
              initial="hidden"
              animate="show"
            >
              {WORD.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  variants={{
                    hidden: { y: "110%", opacity: 0 },
                    show: {
                      y: 0,
                      opacity: 1,
                      transition: { delay: 0.1 + i * 0.03, duration: 0.5, ease: EASE },
                    },
                  }}
                >
                  {ch === " " ? " " : ch}
                </motion.span>
              ))}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
