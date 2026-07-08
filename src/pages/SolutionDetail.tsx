import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { TestimonialBlock } from "@/components/TestimonialBlock";
import { ProjectCard } from "@/components/cards";
import { Button } from "@/components/primitives/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/primitives/Reveal";
import { GoldRule } from "@/components/primitives/bits";
import { SolutionIcon } from "@/components/primitives/SolutionIcon";
import { solutions, getSolution } from "@/data/solutions";
import { getProject } from "@/data/projects";
import type { Project } from "@/data/types";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/cn";

/** Accessible, animated FAQ row. Native <button> toggles a labelled region. */
function FaqItem({ q, a, idBase }: { q: string; a: string; idBase: string }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const btnId = `${idBase}-button`;
  const panelId = `${idBase}-panel`;

  return (
    <div className="border-b border-white/10">
      <h3 className="m-0">
        <button
          id={btnId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
        >
          <span className="font-display text-xl font-light text-text-dark transition-colors group-hover:text-brass md:text-2xl">
            {q}
          </span>
          <ChevronDown
            className={cn(
              "h-5 w-5 shrink-0 text-brass transition-transform duration-300 ease-editorial",
              open && "rotate-180",
            )}
            aria-hidden="true"
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            id={panelId}
            role="region"
            aria-labelledby={btnId}
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 font-sans font-light leading-relaxed text-text-dark/70">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SolutionDetail({ slug }: { slug: string }) {
  const s = getSolution(slug);
  if (!s) return <Navigate to="/solutions" replace />;

  const related = s.relatedProjects
    .map((projectSlug) => getProject(projectSlug))
    .filter((p): p is Project => Boolean(p));
  const others = solutions.filter((o) => o.slug !== s.slug);
  const introRest = s.intro.slice(1);

  return (
    <>
      <Seo
        title={s.seo.title}
        description={s.seo.description}
        path={"/" + s.slug}
        image={s.heroImage}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Solutions", path: "/solutions" },
            { name: s.name },
          ]),
          serviceJsonLd(s.name, s.seo.description, "/" + s.slug),
        ]}
      />

      <PageHero
        eyebrow="Solutions"
        title={s.heroTitle}
        lead={s.intro[0]}
        image={s.heroImage}
        imageAlt={`${s.name} — a completed commercial interior by Direct Interiors`}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: s.name },
        ]}
      >
        <Button to="/contact" variant="gold" size="lg" arrow>
          Get Your Free Quote
        </Button>
        <Button to="/projects" variant="ghost" size="lg">
          See Our Work
        </Button>
      </PageHero>

      {/* ---------------- INTRO ---------------- */}
      <Section tone="light" aria-label={`About ${s.name}`}>
        <Reveal className="mx-auto max-w-prose">
          <SolutionIcon icon={s.icon} className="text-brass" size={40} />
          <p className="mt-6 mb-6 font-mono text-xs uppercase tracking-[0.16em] text-graphite">
            {s.navDescriptor}
          </p>
          <div className="space-y-5">
            {introRest.map((para, i) => (
              <p
                key={i}
                className={cn(
                  "font-sans font-light",
                  i === 0
                    ? "text-xl leading-relaxed text-text-light md:text-2xl"
                    : "text-lg leading-relaxed text-graphite",
                )}
              >
                {para}
              </p>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ---------------- SCOPE ---------------- */}
      <Section tone="dark" plaster aria-labelledby="scope-heading">
        <SectionHeading
          eyebrow="The scope"
          title={<span id="scope-heading">What&rsquo;s included</span>}
          intro="Every element below is delivered by our own in-house trades — sequenced under one programme, answerable to one point of contact."
        />
        <RevealGroup className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-2">
          {s.scope.map((item, i) => (
            <RevealItem key={item.title} className="border-t border-white/10 pt-6">
              <span className="font-mono text-xs tracking-[0.16em] text-brass" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-2xl font-light text-text-dark">{item.title}</h3>
              <p className="mt-3 max-w-md font-sans font-light text-text-dark/70">{item.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        {s.systems && (
          <Reveal className="mt-14 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t border-white/10 pt-8">
            <span className="eyebrow">Systems we install</span>
            <span className="font-display text-lg font-light text-text-dark/85">
              {s.systems.join("  ·  ")}
            </span>
          </Reveal>
        )}
      </Section>

      {/* ---------------- BENEFIT PULL-OUT ---------------- */}
      {s.benefit && (
        <Section tone="light" aria-label="Why it matters">
          <Reveal>
            <div className="on-dark relative overflow-hidden rounded-sm border border-brass/40 bg-ink p-10 text-text-dark shadow-lift md:p-16">
              <div className="grain absolute inset-0" aria-hidden="true" />
              <span className="absolute inset-y-0 left-0 w-1 bg-brass" aria-hidden="true" />
              <div className="relative z-[1] max-w-2xl">
                <p className="eyebrow mb-4">{s.benefit.eyebrow}</p>
                <GoldRule className="mb-6" />
                <h2 className="font-display text-display-sm text-text-dark">{s.benefit.title}</h2>
                <p className="mt-5 font-sans text-lg font-light leading-relaxed text-text-dark/80">
                  {s.benefit.body}
                </p>
              </div>
            </div>
          </Reveal>
        </Section>
      )}

      {/* ---------------- RELATED PROJECTS ---------------- */}
      {related.length > 0 && (
        <Section tone="dark" plaster aria-labelledby="related-heading">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Our work speaks"
              title={<span id="related-heading">See it in our work</span>}
            />
            <Reveal>
              <Button to="/projects" variant="ghost" arrow>
                See All Projects
              </Button>
            </Reveal>
          </div>
          <RevealGroup
            className={cn(
              "mt-12 grid gap-6",
              related.length <= 2
                ? "mx-auto max-w-4xl sm:grid-cols-2"
                : "sm:grid-cols-2 lg:grid-cols-3",
            )}
          >
            {related.map((p) => (
              <RevealItem key={p.slug} className="h-full">
                <ProjectCard project={p} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      )}

      {/* ---------------- TESTIMONIAL ---------------- */}
      {s.testimonial && (
        <Section tone="light" aria-label="Client testimonial">
          <TestimonialBlock id={s.testimonial} />
        </Section>
      )}

      {/* ---------------- FAQ ---------------- */}
      <Section tone="dark" aria-labelledby="faq-heading">
        <SectionHeading
          eyebrow="Good to know"
          title={<span id="faq-heading">Common questions</span>}
        />
        <div className="mx-auto mt-12 max-w-3xl border-t border-white/10">
          {s.faqs.map((f, i) => (
            <FaqItem key={i} q={f.q} a={f.a} idBase={`faq-${s.slug}-${i}`} />
          ))}
        </div>
      </Section>

      {/* ---------------- OTHER SOLUTIONS ---------------- */}
      <Section tone="light" aria-labelledby="other-heading">
        <SectionHeading
          eyebrow="Keep exploring"
          title={<span id="other-heading">The rest of what we do</span>}
          intro="One in-house team, every trade under one roof — whatever your space needs next."
        />
        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((o) => (
            <RevealItem key={o.slug} className="h-full">
              <Link
                to={`/${o.slug}`}
                className="group flex h-full items-start gap-4 rounded-sm border border-ink/10 bg-white/50 p-6 transition-all duration-300 ease-editorial hover:-translate-y-1 hover:border-brass/50 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
              >
                <SolutionIcon icon={o.icon} className="shrink-0 text-brass" size={32} />
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-light text-text-light">{o.name}</h3>
                  <p className="mt-1 font-sans text-sm text-graphite">{o.navDescriptor}</p>
                </div>
                <ArrowUpRight
                  className="ml-auto h-4 w-4 shrink-0 text-graphite/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brass"
                  aria-hidden="true"
                />
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CTASection />
    </>
  );
}
