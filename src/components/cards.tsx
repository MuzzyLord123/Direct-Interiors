import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Project, Solution } from "@/data/types";
import { OptimizedImage } from "@/components/primitives/OptimizedImage";
import { SolutionIcon } from "@/components/primitives/SolutionIcon";
import { cn } from "@/lib/cn";

/** Photographic project card with hover overlay. Whole card is a single link. */
export function ProjectCard({ project, className }: { project: Project; className?: string }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-sm border border-white/10 bg-ink-soft transition-all duration-300 ease-editorial hover:-translate-y-1.5 hover:border-brass/50 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass",
        className,
      )}
    >
      <OptimizedImage
        src={project.thumb}
        alt={`${project.title}, ${project.town} — ${project.sector.toLowerCase()} project`}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="aspect-[4/3] w-full"
        imgClassName="transition-transform duration-700 ease-editorial group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink via-ink/70 to-transparent p-6 pt-16 opacity-100 transition-all duration-300 group-hover:translate-y-0">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-brass">
          {project.service[0]} · {project.town}
        </p>
        <h3 className="mt-1 font-display text-2xl font-light text-text-dark">{project.title}</h3>
      </div>
      <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-brass/50 bg-ink/60 text-brass opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </Link>
  );
}

/** Solution card: gold line icon, name, descriptor, learn-more affordance. */
export function SolutionCard({ solution, className }: { solution: Solution; className?: string }) {
  return (
    <Link
      to={`/${solution.slug}`}
      className={cn(
        "group relative flex h-full flex-col rounded-sm border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 ease-editorial hover:-translate-y-1.5 hover:border-brass/50 hover:bg-white/[0.05] hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass",
        className,
      )}
    >
      <SolutionIcon icon={solution.icon} className="text-brass" size={44} />
      <h3 className="mt-6 font-display text-2xl font-light text-text-dark">{solution.name}</h3>
      <p className="mt-2 flex-1 font-sans text-sm text-text-dark/65">{solution.navDescriptor}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] text-brass">
        Learn more
        <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
