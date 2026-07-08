import { useParams, Navigate, Link } from "react-router-dom";
import { Check, ArrowLeft, ArrowRight } from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Gallery } from "@/components/Gallery";
import { SolutionCard } from "@/components/cards";
import { TestimonialBlock } from "@/components/TestimonialBlock";
import { CTASection } from "@/components/CTASection";
import { Section } from "@/components/primitives/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/primitives/Reveal";
import { Button } from "@/components/primitives/Button";
import { projects, getProject } from "@/data/projects";
import { getSolution } from "@/data/solutions";
import { breadcrumbJsonLd } from "@/lib/seo";
import type { Solution } from "@/data/types";
import { cn } from "@/lib/cn";

export function ProjectDetail() {
  const { slug } = useParams();
  const p = slug ? getProject(slug) : undefined;
  if (!p) return <Navigate to="/projects" replace />;

  // Verified meta facts only — Duration is shown solely where the data provides it.
  const metaItems: { label: string; value: string }[] = [
    { label: "Location", value: p.town },
    { label: "Sector", value: p.sector },
    { label: "Services", value: p.service.join(" · ") },
    ...(p.duration ? [{ label: "Duration", value: p.duration }] : []),
  ];

  const relatedSolutions: Solution[] = p.relatedSolutions
    .map((s) => getSolution(s))
    .filter((s): s is Solution => Boolean(s));

  // Prev/next through the projects array, wrapping around at either end.
  const index = projects.findIndex((x) => x.slug === p.slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <Seo
        title={p.seo.title}
        description={p.seo.description}
        path={`/projects/${p.slug}`}
        image={p.hero}
        jsonLd={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Our Work", path: "/projects" },
          { name: p.title },
        ])}
      />

      <PageHero
        eyebrow={`${p.sector} · ${p.town}`}
        title={p.title}
        lead={p.cardBlurb}
        image={p.hero}
        imageAlt={`${p.title} in ${p.town} — a completed ${p.sector.toLowerCase()} interior project by Direct Interiors`}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Our Work", path: "/projects" },
          { name: p.title },
        ]}
      >
        <Button to="/contact" variant="gold" size="lg" arrow>
          Discuss a Similar Project
        </Button>
      </PageHero>

      {/* ---------------- META STRIP ---------------- */}
      <section className="relative border-y border-white/10 bg-ink-soft py-12 text-text-dark md:py-14">
        <div className="grain absolute inset-0" aria-hidden="true" />
        <div className="container-edge relative z-[1]">
          <Reveal>
            <dl
              className={cn(
                "grid gap-x-8 gap-y-8 sm:grid-cols-2",
                metaItems.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
              )}
            >
              {metaItems.map((it) => (
                <div
                  key={it.label}
                  className="lg:border-l lg:border-white/10 lg:pl-8 lg:first:border-0 lg:first:pl-0"
                >
                  <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-brass">{it.label}</dt>
                  <dd className="mt-2.5 font-display text-xl font-light text-text-dark">{it.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ---------------- STORY ---------------- */}
      <Section tone="light" aria-labelledby="story-heading">
        <SectionHeading eyebrow="The story" title={<span id="story-heading">Brief to handover</span>} />
        <RevealGroup className="mt-10 max-w-prose space-y-6">
          {p.story.map((para, i) => (
            <RevealItem key={i}>
              <p className="font-sans text-lg font-light leading-relaxed text-graphite">{para}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ---------------- SCOPE ---------------- */}
      <Section tone="raised" cut="top" plaster aria-labelledby="scope-heading">
        <SectionHeading eyebrow="Scope of works" title={<span id="scope-heading">{p.scopeTitle}</span>} />
        <RevealGroup className="mt-12 grid gap-x-10 gap-y-5 sm:grid-cols-2" as="ul">
          {p.scope.map((item) => (
            <RevealItem key={item} as="li" className="flex items-start gap-4">
              <span
                className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full border border-brass/40 text-brass"
                aria-hidden="true"
              >
                <Check className="h-3.5 w-3.5" />
              </span>
              <span className="font-sans font-light text-text-dark/85">{item}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ---------------- GALLERY ---------------- */}
      <Section tone="dark" plaster aria-labelledby="gallery-heading">
        <SectionHeading eyebrow="Gallery" title={<span id="gallery-heading">The project, in detail</span>} />
        <div className="mt-12">
          <Gallery
            images={p.gallery.map((src, i) => ({
              src,
              alt: `${p.title} — completed interior in ${p.town}, photograph ${i + 1} of ${p.gallery.length}`,
            }))}
          />
        </div>
      </Section>

      {/* ---------------- TESTIMONIAL ---------------- */}
      {p.testimonial && (
        <Section tone="light" aria-label="Client testimonial">
          <p className="eyebrow mb-8 text-center">In their words</p>
          <TestimonialBlock id={p.testimonial} />
        </Section>
      )}

      {/* ---------------- RELATED SOLUTIONS ---------------- */}
      {relatedSolutions.length > 0 && (
        <Section tone="raised" cut="top" plaster aria-labelledby="related-heading">
          <SectionHeading
            eyebrow="Related solutions"
            title={<span id="related-heading">Solutions used on this project</span>}
          />
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedSolutions.map((s) => (
              <RevealItem key={s.slug} className="h-full">
                <SolutionCard solution={s} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      )}

      {/* ---------------- PREV / NEXT ---------------- */}
      <Section tone="light" aria-labelledby="pager-heading">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-3">Keep exploring</p>
            <h2 id="pager-heading" className="font-display text-display-sm text-text-light">
              More of our work
            </h2>
          </div>
          <Button to="/projects" variant="link" arrow className="hidden sm:inline-flex">
            All projects
          </Button>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <Link
            to={`/projects/${prev.slug}`}
            className="group flex flex-col rounded-sm border border-ink/10 bg-white/60 p-7 transition-all duration-300 ease-editorial hover:-translate-y-1 hover:border-brass/60 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
          >
            <span className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-brass">
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true" />
              Previous project
            </span>
            <span className="mt-3 font-display text-2xl font-light text-text-light">{prev.title}</span>
            <span className="mt-1 font-sans text-sm text-graphite">
              {prev.sector} · {prev.town}
            </span>
          </Link>
          <Link
            to={`/projects/${next.slug}`}
            className="group flex flex-col rounded-sm border border-ink/10 bg-white/60 p-7 transition-all duration-300 ease-editorial hover:-translate-y-1 hover:border-brass/60 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass sm:items-end sm:text-right"
          >
            <span className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-brass">
              Next project
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </span>
            <span className="mt-3 font-display text-2xl font-light text-text-light">{next.title}</span>
            <span className="mt-1 font-sans text-sm text-graphite">
              {next.sector} · {next.town}
            </span>
          </Link>
        </div>
      </Section>

      {/* ---------------- CTA ---------------- */}
      <CTASection primaryLabel="Discuss a Similar Project" />
    </>
  );
}
