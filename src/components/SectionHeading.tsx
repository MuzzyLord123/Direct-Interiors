import type { ReactNode } from "react";
import { Reveal } from "@/components/primitives/Reveal";
import { GoldRule } from "@/components/primitives/bits";
import { cn } from "@/lib/cn";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  as?: "h2" | "h3";
  className?: string;
}

/** Eyebrow + gold rule + display heading + optional intro paragraph. */
export function SectionHeading({ eyebrow, title, intro, align = "left", as = "h2", className }: Props) {
  const Tag = as;
  return (
    <Reveal className={cn(align === "center" && "mx-auto text-center", "max-w-3xl", className)}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <GoldRule className={cn("mb-6", align === "center" && "mx-auto")} />
      <Tag className="font-display text-display-md">{title}</Tag>
      {intro && <p className="mt-5 font-sans text-lg font-light text-current/75">{intro}</p>}
    </Reveal>
  );
}
