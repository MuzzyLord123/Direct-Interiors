import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/primitives/Reveal";
import { CTASection } from "@/components/CTASection";
import { coreAreas, extendedAreas } from "@/data/areas";
import { site } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import type { Area } from "@/data/types";
import { cn } from "@/lib/cn";

/** A single town pill, styled by tier: brass for core, stone for extended. */
function AreaPill({ area }: { area: Area }) {
  const core = area.tier === "core";
  return (
    <Link
      to={`/areas/${area.slug}`}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-full border px-6 py-3 font-sans text-base transition-all duration-200 ease-editorial hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass",
        core
          ? "border-brass bg-brass/10 text-text-light hover:bg-brass/20"
          : "border-stone bg-transparent text-graphite hover:bg-sand hover:text-text-light",
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", core ? "bg-brass" : "bg-stone")} aria-hidden="true" />
      {area.name}
      <ArrowUpRight
        className="h-4 w-4 -translate-x-1 text-brass opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
        aria-hidden="true"
      />
    </Link>
  );
}

export function Areas() {
  return (
    <>
      <Seo
        title="Areas We Cover — Chester, Deeside, Wrexham & North Wales | Direct Interiors"
        description="Direct Interiors covers Chester, Deeside, Wrexham, Flintshire and North Wales, with extended coverage across the North West including Liverpool and Manchester. Based in Garden City, Deeside. Free survey and written quotation."
        path="/areas"
        image="glass-partitions-hero-69cd9864"
        jsonLd={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Areas" }])}
      />

      <PageHero
        eyebrow="Where we work"
        title="Your local fit-out specialists."
        lead="Based in Garden City, Deeside, we cover Chester, Wrexham, Flintshire and North Wales as our core patch — and travel across the North West, including Liverpool and Manchester, for the right project."
        image="glass-partitions-hero-69cd9864"
        imageAlt="A light-filled commercial office interior divided by a frameless glass partition"
        crumbs={[{ name: "Home", path: "/" }, { name: "Areas" }]}
      />

      <Section tone="light" aria-labelledby="coverage-heading">
        <SectionHeading
          eyebrow="Coverage"
          title={<span id="coverage-heading">Rooted in Deeside. Working across the North West.</span>}
          intro="Here's exactly where we work — and we're straight with you about how far we travel. Choose a town to see local work and get a free survey."
        />

        {/* Legend */}
        <Reveal className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-[0.14em] text-graphite">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brass" aria-hidden="true" />
            Gold — core coverage
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-stone" aria-hidden="true" />
            Stone — extended coverage
          </span>
        </Reveal>

        {/* Core areas */}
        <div className="mt-12">
          <Reveal>
            <h3 className="font-display text-2xl font-light text-text-light">On the doorstep</h3>
            <p className="mt-1 font-sans text-graphite">Our core patch — genuinely local, minutes from base.</p>
          </Reveal>
          <RevealGroup className="mt-6 flex flex-wrap gap-3">
            {coreAreas.map((a) => (
              <RevealItem key={a.slug}>
                <AreaPill area={a} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Extended areas */}
        <div className="mt-14">
          <Reveal>
            <h3 className="font-display text-2xl font-light text-text-light">Across the North West</h3>
            <p className="mt-1 font-sans text-graphite">Extended coverage for larger commercial projects worth travelling for.</p>
          </Reveal>
          <RevealGroup className="mt-6 flex flex-wrap gap-3">
            {extendedAreas.map((a) => (
              <RevealItem key={a.slug}>
                <AreaPill area={a} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Honest coverage note */}
        <Reveal className="mt-16 max-w-3xl border-l-2 border-brass/40 pl-6">
          <p className="font-sans text-lg font-light text-graphite">
            We don't pretend to have a depot in every town. What you get instead is a genuinely local team from{" "}
            {site.address.line2}, a free site survey anywhere in our core patch, and an honest answer on anything
            further afield — if a North West project is the right fit, we'll happily travel; if it isn't, we'll tell
            you straight.
          </p>
        </Reveal>
      </Section>

      <CTASection />
    </>
  );
}
