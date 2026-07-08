import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { Reveal, RevealGroup, RevealItem } from "@/components/primitives/Reveal";
import { GoldRule } from "@/components/primitives/bits";
import { Button } from "@/components/primitives/Button";
import { OptimizedImage } from "@/components/primitives/OptimizedImage";
import { breadcrumbJsonLd } from "@/lib/seo";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/cn";

const PHILOSOPHY = [
  {
    k: "01",
    label: "We survey free",
    body: "A surveyor visits, measures up and listens to how you work — at no charge and no obligation.",
  },
  {
    k: "02",
    label: "We quote in writing",
    body: "You receive a fixed written quotation setting out scope, specification and a single, clear price.",
  },
  {
    k: "03",
    label: "We hold the price",
    body: "The figure on your quotation is the figure you pay. Our scope doesn't drift, so your price doesn't either.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Free Survey",
    body: "We visit your premises, measure up and understand how the space needs to work for you.",
  },
  {
    n: "02",
    title: "Written Fixed Quotation",
    body: "You receive a clear, itemised quotation in writing — scope, specification and price, in black and white.",
  },
  {
    n: "03",
    title: "Programme Agreed",
    body: "We set out the sequence and the dates before anyone lifts a tool, so you know exactly what happens when.",
  },
  {
    n: "04",
    title: "In-House Teams On Site",
    body: "Our own directly-employed trades arrive — one team, one point of contact, no subcontractor roulette.",
  },
  {
    n: "05",
    title: "Trades Sequenced",
    body: "Each trade follows the last in the right order, with no subcontractor gaps and no waiting around.",
  },
  {
    n: "06",
    title: "Snag & Sign-Off",
    body: "We walk the finished work with you and close out every last detail before we call it done.",
  },
  {
    n: "07",
    title: "Aftercare & Maintenance",
    body: "We stay on call for the premises we've worked in, with reactive and planned upkeep long after handover.",
  },
];

const PRICE_FACTORS = [
  {
    title: "Floor area & ceiling heights",
    body: "The size of the space and how high the ceilings run set the quantities of every material and system — and how much access equipment the work needs.",
  },
  {
    title: "Specification",
    body: "Standard suspended ceiling or acoustic; framed or frameless glass; hard-wearing or premium finishes — the systems and materials you choose drive the cost more than anything else.",
  },
  {
    title: "Working hours",
    body: "Evening, weekend or phased working to keep you trading costs more than a clear, empty site — but it keeps your doors open, which is often the point.",
  },
  {
    title: "Access & site constraints",
    body: "Loading, parking, lift access, protected floors and tight corridors all shape how efficiently our teams can move materials and work.",
  },
  {
    title: "Programme length",
    body: "A compressed programme needs more people on site at once; a relaxed one can be sequenced more economically. The clock is part of the price.",
  },
  {
    title: "Compliance",
    body: "Fire-rated systems, DDA-compliant washrooms and food-safe hygienic finishes each carry their own materials, detailing and certification.",
  },
];

/** Accessible, keyboard-operable, reduced-motion-safe accordion for price factors. */
function PriceFactors() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <div className="mt-14 border-t border-brass/25">
      {PRICE_FACTORS.map((f, i) => {
        const isOpen = open === i;
        const btnId = `${uid}-btn-${i}`;
        const panelId = `${uid}-panel-${i}`;
        return (
          <div key={f.title} className="border-b border-brass/15">
            <h3 className="m-0">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
              >
                <span className="font-display text-xl font-light text-text-light transition-colors group-hover:text-brass md:text-2xl">
                  {f.title}
                </span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brass/40 text-brass transition-colors group-hover:border-brass">
                  <ChevronDown
                    className={cn("h-4 w-4 transition-transform duration-200 ease-editorial", isOpen && "rotate-180")}
                    aria-hidden="true"
                  />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 font-sans font-light text-graphite">{f.body}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function Process() {
  return (
    <>
      <Seo
        title="Our Process — Free Survey, Fixed Written Quote | Direct Interiors"
        description="How Direct Interiors works: a free site survey, a fixed written quotation, an agreed programme and in-house trades sequenced end to end — with a price we hold from first fix to sign-off."
        path="/process"
        image="interior-fit-out-side01"
        jsonLd={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Process", path: "/process" },
        ])}
      />

      <PageHero
        eyebrow="How we work"
        title="No mysteries. No surprises."
        lead="A free survey, a fixed written quotation, and a price we hold from first fix to sign-off."
        image="interior-fit-out-side01"
        imageAlt="A finished commercial interior fit-out with suspended ceilings, partitioning and considered lighting"
        crumbs={[{ name: "Home", path: "/" }, { name: "Process" }]}
      >
        <Button to="/contact" variant="gold" size="lg" arrow>
          Book Your Free Survey
        </Button>
        <Button to="/projects" variant="ghost" size="lg">
          See Our Work
        </Button>
      </PageHero>

      {/* ---------------- PHILOSOPHY ---------------- */}
      <Section tone="light" aria-labelledby="philosophy-heading">
        <SectionHeading
          eyebrow="Our philosophy"
          title={<span id="philosophy-heading">Clarity, from the first visit.</span>}
          intro="Most contractors quote late and vague. We survey free, quote in writing — and hold the price."
        />
        <RevealGroup className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-3">
          {PHILOSOPHY.map((p) => (
            <RevealItem key={p.k}>
              <span className="font-mono text-sm tracking-[0.2em] text-brass">{p.k}</span>
              <GoldRule className="my-4" width="40px" />
              <h3 className="font-display text-2xl font-medium text-text-light">{p.label}</h3>
              <p className="mt-3 max-w-sm font-sans font-light text-graphite">{p.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ---------------- PROCESS TIMELINE ---------------- */}
      <Section tone="dark" cut="top" plaster aria-labelledby="timeline-heading">
        <SectionHeading
          eyebrow="The process"
          title={<span id="timeline-heading">Seven steps, start to finish.</span>}
          intro="One in-house team carries your project from the first survey to aftercare — no gaps, no hand-offs, nobody to chase."
        />
        <RevealGroup className="mt-16 border-t border-brass/25" stagger={0.09}>
          {STEPS.map((s) => (
            <RevealItem
              key={s.n}
              className="grid gap-3 border-b border-brass/15 py-8 md:grid-cols-[6rem_1fr] md:gap-12 md:py-10"
            >
              <span className="font-mono text-5xl font-light leading-none text-brass/80 tabular-nums md:text-6xl">
                {s.n}
              </span>
              <div>
                <h3 className="font-display text-2xl font-light text-text-dark md:text-3xl">{s.title}</h3>
                <p className="mt-3 max-w-xl font-sans font-light text-text-dark/70">{s.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ---------------- WHAT SHAPES YOUR PRICE ---------------- */}
      <Section tone="light" aria-labelledby="price-heading">
        <SectionHeading
          eyebrow="Fixed, written, held"
          title={<span id="price-heading">What shapes your price?</span>}
          intro="We don't publish a rate card — every space is different. These are the things a surveyor weighs to reach your number."
        />
        <PriceFactors />

        {/* Price promise panel */}
        <Reveal className="mt-16">
          <div className="on-dark rounded-sm border border-brass/30 bg-ink p-10 text-center md:p-16">
            <p className="eyebrow mb-5">The price promise</p>
            <GoldRule className="mx-auto mb-7" width="90px" />
            <p className="mx-auto max-w-2xl font-display text-display-sm font-light text-text-dark md:text-display-md">
              &ldquo;Your written quotation is your price.&rdquo;
            </p>
            <p className="mx-auto mt-6 max-w-xl font-sans font-light text-text-dark/70">
              The figure we write down is the figure you pay. If the scope doesn&rsquo;t change, neither does your
              price — no surprises once the work begins.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* ---------------- WORKING IN LIVE PREMISES ---------------- */}
      <Section tone="raised" aria-labelledby="live-heading">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-4">The genuine differentiator</p>
            <GoldRule className="mb-6" />
            <h2 id="live-heading" className="font-display text-display-md text-text-dark">
              We work around your business.
            </h2>
            <p className="mt-5 max-w-xl font-sans text-lg font-light text-text-dark/75">
              Most of our work happens in premises that can&rsquo;t simply shut. We phase the programme around your
              trading hours, run out-of-hours shifts where they&rsquo;re needed, control dust and noise, and keep the
              works safely segregated from your staff and customers.
            </p>
            <p className="mt-4 max-w-xl font-sans font-light text-text-dark/70">
              A butcher&rsquo;s shop in Dyserth stayed open throughout its refit — and earned a 5-out-of-5 food hygiene
              rating afterwards.
            </p>
            <div className="mt-8">
              <Button to="/projects/butchers-dyserth" variant="ghost" arrow>
                See the Butchers project
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-sm border border-white/10">
              <OptimizedImage
                src="butchers-hero"
                alt="The Butchers in Dyserth — a hygienic shop refit with a new suspended ceiling and food-safe wall cladding, completed while the shop stayed open"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="w-full"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------------- FINAL CTA ---------------- */}
      <CTASection primaryLabel="Get Your Fixed Written Quote" />
    </>
  );
}
