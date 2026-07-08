import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/primitives/Section";
import { Button } from "@/components/primitives/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/primitives/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SolutionCard } from "@/components/cards";
import { SolutionIcon } from "@/components/primitives/SolutionIcon";
import { TestimonialBlock } from "@/components/TestimonialBlock";
import { CTASection } from "@/components/CTASection";
import { solutions } from "@/data/solutions";
import { breadcrumbJsonLd } from "@/lib/seo";

export function Solutions() {
  return (
    <>
      <Seo
        title="Commercial Interior Solutions, Chester & North Wales | Direct Interiors"
        description="Commercial interior fit-outs, suspended ceilings, partitions, glass, hygienic cladding, washrooms and bespoke joinery across Chester, Deeside and North Wales — every trade delivered in-house."
        path="/solutions"
        image="interior-fit-out-hero-new"
        jsonLd={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Solutions" }])}
      />

      <PageHero
        eyebrow="Every trade. One contractor."
        title="Our Solutions"
        lead="From a single suspended ceiling to a full turnkey fit-out, we deliver every trade under one roof — one programme, one point of contact, and one team accountable for the finish."
        image="interior-fit-out-hero-new"
        imageAlt="A completed commercial interior fit-out with new suspended ceilings, partitions and feature lighting"
        crumbs={[{ name: "Home", path: "/" }, { name: "Solutions" }]}
      >
        <Button to="/contact" variant="gold" size="lg" arrow>
          Get Your Free Quote
        </Button>
      </PageHero>

      {/* ---------------- SOLUTIONS GRID ---------------- */}
      <Section tone="dark" plaster aria-labelledby="solutions-heading">
        <SectionHeading
          eyebrow="What we do"
          title={<span id="solutions-heading">Seven core solutions.</span>}
          intro="Each is delivered by our own in-house team — so the trades that make up your project are sequenced by one contractor, never left waiting on each other."
        />
        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s) => (
            <RevealItem key={s.slug} className="h-full">
              <SolutionCard solution={s} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ---------------- ALL TRADES FEATURE ---------------- */}
      <Section tone="raised" aria-labelledby="trades-feature-heading">
        <SectionHeading
          eyebrow="No subcontractors"
          title={<span id="trades-feature-heading">Every trade under one roof.</span>}
          intro="The trades that build your project never work in silos, because they all work for us. That's how the programme holds and the finish lands."
        />
        <Reveal className="mt-12">
          <Link
            to="/all-trades"
            className="group flex flex-col items-start justify-between gap-6 rounded-sm border border-brass/30 bg-gradient-to-r from-white/[0.05] to-transparent p-8 transition-colors hover:border-brass/60 md:flex-row md:items-center"
          >
            <div className="flex items-center gap-6">
              <SolutionIcon icon="trades" className="text-brass" size={48} />
              <div>
                <h3 className="font-display text-2xl font-light text-text-dark">All Trades In-House</h3>
                <p className="mt-1 font-sans text-sm text-text-dark/65">
                  Eleven trades under one roof — from joinery and electrics to fire protection and flooring.
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] text-brass">
              Meet the trades
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </span>
          </Link>
        </Reveal>
      </Section>

      {/* ---------------- TESTIMONIAL ---------------- */}
      <Section tone="light" aria-labelledby="solutions-testimonial">
        <h2 id="solutions-testimonial" className="sr-only">
          What our clients say
        </h2>
        <TestimonialBlock id="jones" />
      </Section>

      <CTASection />
    </>
  );
}
