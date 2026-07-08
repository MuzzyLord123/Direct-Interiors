import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface Props {
  children: ReactNode;
  tone?: "dark" | "light" | "raised";
  cut?: "none" | "top" | "bottom" | "both";
  grain?: boolean;
  plaster?: boolean;
  className?: string;
  innerClassName?: string;
  id?: string;
  as?: "section" | "div";
  "aria-label"?: string;
  "aria-labelledby"?: string;
  full?: boolean; // no inner container (for full-bleed content)
}

const toneClass: Record<string, string> = {
  dark: "bg-ink text-text-dark",
  light: "bg-bone text-text-light",
  raised: "bg-ink-soft text-text-dark",
};

const cutClass: Record<string, string> = {
  none: "",
  top: "cut-top",
  bottom: "cut-bottom",
  both: "cut-both",
};

export const Section = forwardRef<HTMLElement, Props>(function Section(
  { children, tone = "dark", cut = "none", grain = true, plaster = false, className, innerClassName, id, as = "section", full = false, ...aria },
  ref,
) {
  const Tag = as as "section";
  return (
    <Tag
      ref={ref}
      id={id}
      className={cn(
        "relative py-section",
        toneClass[tone],
        cutClass[cut],
        grain && "grain",
        plaster && "plaster",
        className,
      )}
      {...aria}
    >
      {full ? children : <div className={cn("container-edge relative z-[1]", innerClassName)}>{children}</div>}
    </Tag>
  );
});
