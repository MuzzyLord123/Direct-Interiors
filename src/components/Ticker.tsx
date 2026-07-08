import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/** Infinite marquee of trust items with gold diamond separators. */
export function Ticker({ items, tone = "light" }: { items: string[]; tone?: "light" | "dark" }) {
  const reduce = useReducedMotion();
  const row = (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-mono text-xs uppercase tracking-[0.16em]">{item}</span>
          <span className="text-brass" aria-hidden="true">⬡</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "relative flex overflow-x-auto border-y py-4 md:overflow-hidden",
        tone === "light" ? "border-stone/40 bg-bone text-text-light" : "border-white/10 bg-ink text-text-dark",
      )}
    >
      {/* Screen-reader summary */}
      <span className="sr-only">{items.join(". ")}.</span>
      {reduce ? (
        <div className="flex px-4">{row}</div>
      ) : (
        <div className="flex animate-ticker will-change-transform">
          {row}
          {row}
        </div>
      )}
    </div>
  );
}
