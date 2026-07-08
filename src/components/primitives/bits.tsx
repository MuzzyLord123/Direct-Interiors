import { motion, useReducedMotion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";

/** DM Mono eyebrow label with optional gold rule. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}

/** 1px gold rule that draws in from the left on scroll. */
export function GoldRule({ className, width = "80px" }: { className?: string; width?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      className={cn("block h-px origin-left bg-brass", className)}
      style={{ width }}
      initial={{ scaleX: reduce ? 1 : 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: EASE }}
    />
  );
}

/** Count-up number, triggered in view. Respects reduced motion. */
export function Counter({
  to,
  suffix = "",
  prefix = "",
  className,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  // Start at the real value so prerendered / no-JS / reduced-motion output is
  // always correct; the count-up is a client-only enhancement.
  const isBot = typeof navigator !== "undefined" && navigator.webdriver;
  const [val, setVal] = useState(to);

  useEffect(() => {
    if (reduce || isBot) return;
    if (!inView) {
      setVal(0);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduce, isBot]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}
