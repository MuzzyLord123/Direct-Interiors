import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { OptimizedImage } from "@/components/primitives/OptimizedImage";
import { Breadcrumb, type Crumb } from "@/components/Breadcrumb";
import { GoldRule } from "@/components/primitives/bits";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/cn";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  image: string; // manifest key
  imageAlt: string;
  crumbs?: Crumb[];
  children?: ReactNode; // CTAs etc.
  size?: "full" | "compact";
  imagePosition?: string;
}

/** Standard interior-page hero: dark photo, scrim, breadcrumb, headline. */
export function PageHero({ eyebrow, title, lead, image, imageAlt, crumbs, children, size = "compact", imagePosition }: Props) {
  const reduce = useReducedMotion();
  const doMotion = !reduce && typeof window !== "undefined";
  return (
    <section
      className={cn(
        "relative flex items-end overflow-hidden bg-ink",
        size === "full" ? "min-h-[92vh]" : "min-h-[62vh] pt-28",
      )}
      aria-label="Page introduction"
    >
      <div className="absolute inset-0">
        <OptimizedImage
          src={image}
          alt={imageAlt}
          priority
          sizes="100vw"
          className="h-full w-full"
          position={imagePosition}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        <div className="absolute inset-0 bg-ink/25" />
      </div>
      <div className="grain absolute inset-0" aria-hidden="true" />

      <div className="container-edge relative z-[1] pb-14 pt-10 md:pb-20">
        {crumbs && (
          <div className="mb-6">
            <Breadcrumb crumbs={crumbs} />
          </div>
        )}
        {eyebrow && (
          <motion.p
            className="eyebrow mb-5"
            initial={doMotion ? { opacity: 0, y: 12 } : false}
            animate={doMotion ? { opacity: 1, y: 0 } : false}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {eyebrow}
          </motion.p>
        )}
        <GoldRule className="mb-6" />
        <motion.h1
          className="max-w-4xl font-display text-display-lg text-text-dark"
          initial={doMotion ? { opacity: 0, y: 20 } : false}
          animate={doMotion ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
        >
          {title}
        </motion.h1>
        {lead && (
          <motion.p
            className="mt-6 max-w-2xl font-sans text-lg font-light text-text-dark/80"
            initial={doMotion ? { opacity: 0, y: 16 } : false}
            animate={doMotion ? { opacity: 1, y: 0 } : false}
            transition={{ duration: 0.5, ease: EASE, delay: 0.16 }}
          >
            {lead}
          </motion.p>
        )}
        {children && <div className="mt-9 flex flex-wrap items-center gap-4">{children}</div>}
      </div>
    </section>
  );
}
