import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { Button } from "@/components/primitives/Button";
import { ProjectCard } from "@/components/cards";
import { CTASection } from "@/components/CTASection";
import { projects, projectServiceTags, projectSectors } from "@/data/projects";
import { breadcrumbJsonLd } from "@/lib/seo";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/cn";

const ALL = "All";
const SERVICE_OPTIONS = [ALL, ...projectServiceTags];
const SECTOR_OPTIONS = [ALL, ...projectSectors];

// Verified only — sectorsServed = 8, eleven trades in-house, trading 20+ years.
const STATS = [
  { v: "8", label: "sectors" },
  { v: "11", label: "trades in-house" },
  { v: "20+", label: "years" },
];

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Our Work", path: "/projects" },
];

/** Brass-active filter pill. Native button — keyboard operable, 40px min target. */
function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "min-h-[44px] rounded-full border px-5 py-2 font-mono text-xs uppercase tracking-[0.12em] transition-colors duration-200 ease-editorial focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass",
        active
          ? "border-brass bg-brass text-ink"
          : "border-white/20 text-text-dark/70 hover:border-brass/60 hover:text-brass",
      )}
    >
      {label}
    </button>
  );
}

/** A labelled row of pills for one filter dimension. */
function FilterRow({
  label,
  options,
  active,
  onSelect,
}: {
  label: string;
  options: string[];
  active: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-brass sm:w-16 sm:shrink-0">
        {label}
      </span>
      <div role="group" aria-label={`Filter projects by ${label.toLowerCase()}`} className="flex flex-wrap gap-2.5">
        {options.map((option) => (
          <FilterPill key={option} label={option} active={active === option} onClick={() => onSelect(option)} />
        ))}
      </div>
    </div>
  );
}

export function Projects() {
  const reduce = useReducedMotion();
  const [service, setService] = useState<string>(ALL);
  const [sector, setSector] = useState<string>(ALL);

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) => (service === ALL || p.service.includes(service)) && (sector === ALL || p.sector === sector),
      ),
    [service, sector],
  );

  const hasFilters = service !== ALL || sector !== ALL;
  const reset = () => {
    setService(ALL);
    setSector(ALL);
  };

  return (
    <>
      <Seo
        title="Our Work — Fit-Out & Refurbishment Projects | Direct Interiors"
        description="Selected commercial fit-outs, refurbishments and bespoke installations across Chester, North Wales and the North West — including a Welsh Government office at Doc Fictoria and a full fit-out for Demon Tweeks in Wrexham."
        path="/projects"
        image="demon-tweeks-hero"
        jsonLd={breadcrumbJsonLd(CRUMBS)}
      />

      <PageHero
        size="full"
        eyebrow="Selected work"
        title="Every project tells a story."
        lead="Offices, washrooms, schools and shops — each one delivered by our own trades, on programme and to a fixed written price. Here is a representative selection of the spaces we've built across Chester, North Wales and the North West."
        image="demon-tweeks-hero"
        imageAlt="The completed interior fit-out for motorsport retailer Demon Tweeks in Wrexham"
        crumbs={CRUMBS}
      >
        <Button to="/contact" variant="gold" size="lg" arrow>
          Get Your Free Quote
        </Button>
        <Button to="/solutions" variant="ghost" size="lg">
          Explore Our Solutions
        </Button>
      </PageHero>

      {/* ---------------- INTRO ---------------- */}
      <Section tone="light" aria-labelledby="work-intro-heading">
        <div className="grid gap-y-10 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-x-14">
          <SectionHeading
            eyebrow="The proof"
            title={<span id="work-intro-heading">Work you can walk into.</span>}
            intro="No stock photography, no case studies borrowed from elsewhere. Every project below is our own — planned, programmed and finished by the trades we employ, from a Welsh Government office to a butcher's shop that never closed for a day of trading."
          />
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-x-10 gap-y-6 border-t border-graphite/20 pt-8 lg:justify-end lg:border-none lg:pt-0">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <span className="block font-display text-5xl font-light leading-none text-brass">{stat.v}</span>
                  <span className="mt-2 block font-mono text-[0.7rem] uppercase tracking-[0.16em] text-graphite">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------------- FILTER + GRID ---------------- */}
      <Section tone="dark" cut="top" plaster aria-labelledby="grid-heading">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
          <SectionHeading
            eyebrow="Browse the work"
            title={<span id="grid-heading">Filter by trade or sector.</span>}
          />
          <Reveal>
            <p
              className="font-mono text-xs uppercase tracking-[0.14em] text-text-dark/55"
              aria-live="polite"
              aria-atomic="true"
            >
              Showing {filtered.length} of {projects.length}
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-10 flex flex-col gap-5" delay={0.05}>
          <FilterRow label="Service" options={SERVICE_OPTIONS} active={service} onSelect={setService} />
          <FilterRow label="Sector" options={SECTOR_OPTIONS} active={sector} onSelect={setSector} />
          {hasFilters && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-[44px] items-center gap-1.5 self-start font-mono text-[0.7rem] uppercase tracking-[0.16em] text-text-dark/60 transition-colors hover:text-brass focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
            >
              <span aria-hidden="true">×</span> Clear filters
            </button>
          )}
        </Reveal>

        <motion.div
          layout={!reduce}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          transition={{ layout: { type: "spring", stiffness: 260, damping: 30 } }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                transition={{
                  duration: 0.35,
                  ease: EASE,
                  layout: { type: "spring", stiffness: 260, damping: 30 },
                }}
                className="h-full"
              >
                <ProjectCard project={p} className="h-full" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <Reveal className="mt-12 rounded-sm border border-white/10 bg-white/[0.03] p-12 text-center">
            <h3 className="font-display text-2xl font-light text-text-dark">No projects match that combination.</h3>
            <p className="mx-auto mt-3 max-w-md font-sans font-light text-text-dark/65">
              Try a different trade or sector — or clear the filters to see every project.
            </p>
            <div className="mt-7 flex justify-center">
              <Button variant="ghost" size="md" onClick={reset}>
                Clear filters
              </Button>
            </div>
          </Reveal>
        )}
      </Section>

      <CTASection />
    </>
  );
}
