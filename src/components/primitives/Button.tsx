import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const button = cva(
  "group relative inline-flex items-center justify-center gap-2 font-sans font-medium tracking-wide transition-colors duration-200 ease-editorial focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass disabled:opacity-60 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        // dark button, gold text + border — the primary CTA on light & photo
        primary: "bg-ink text-brass border border-brass/70 hover:bg-brass hover:text-ink",
        // solid gold — highest emphasis on dark
        gold: "bg-brass text-ink border border-brass hover:bg-brass-light hover:border-brass-light",
        // outline over dark/photo
        ghost: "bg-transparent text-text-dark border border-white/40 hover:border-brass hover:text-brass",
        // outline pill for nav
        pill: "bg-transparent text-current border border-brass/60 rounded-full hover:bg-brass hover:text-ink hover:border-brass",
        // quiet text link
        link: "px-0 text-brass hover:text-brass-light underline-offset-4",
      },
      size: {
        sm: "text-[0.8rem] px-5 py-2.5 min-h-[40px]",
        md: "text-sm px-7 py-3.5 min-h-[48px]",
        lg: "text-base px-9 py-4 min-h-[54px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

interface BaseProps extends VariantProps<typeof button> {
  children: ReactNode;
  className?: string;
  arrow?: boolean;
  to?: string; // internal route
  href?: string; // external / tel / mailto
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  newTab?: boolean;
  "aria-label"?: string;
}

const MotionLink = motion(Link);

export function Button({
  children,
  className,
  variant,
  size,
  arrow = false,
  to,
  href,
  onClick,
  type = "button",
  disabled,
  newTab,
  ...rest
}: BaseProps) {
  const classes = cn(button({ variant, size }), variant !== "pill" && variant !== "link" && "rounded-sm", className);
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 ease-editorial group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  );
  const tap = { scale: 0.97 };

  if (to) {
    return (
      <MotionLink to={to} className={classes} whileTap={tap} onClick={onClick} {...rest}>
        {inner}
      </MotionLink>
    );
  }
  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileTap={tap}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
        onClick={onClick}
        {...rest}
      >
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button type={type} className={classes} whileTap={tap} onClick={onClick} disabled={disabled} {...rest}>
      {inner}
    </motion.button>
  );
}
