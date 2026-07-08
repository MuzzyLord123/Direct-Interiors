import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Section } from "@/components/primitives/Section";
import { Button } from "@/components/primitives/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/primitives/Reveal";
import { GoldRule, Counter } from "@/components/primitives/bits";
import { SectionHeading } from "@/components/SectionHeading";
import { OptimizedImage } from "@/components/primitives/OptimizedImage";
import { SolutionCard, ProjectCard } from "@/components/cards";
import { SolutionIcon } from "@/components/primitives/SolutionIcon";
import { Ticker } from "@/components/Ticker";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { CTASection } from "@/components/CTASection";
import { solutions } from "@/data/solutions";
import { projects, getProject } from "@/data/projects";
import { sectors } from "@/data/sectors";
import { site, EST_YEAR } from "@/data/site";
import { localBusinessJsonLd } from "@/lib/seo";
import { EASE, lineClip } from "@/lib/motion";

const HERO_LINES = ["Spaces built", "around your", "business."];

const TICKER = [
  `Est. ${EST_YEAR}`,
  "Every Trade In-House",
  "Free No-Obligation Quotations",
  "CSCS-Carded Operatives",
  "Trusted by the Welsh Government",
  "Formerly Ceilings Direct",
  "Chester · Deeside · North Wales · North West",
];

const PILLARS = [
  {
    n: "01",
    title: "Every Trade In-House",
    body: "Joiners, electricians, plumbers, dryliners — one team, one point of contact, no subcontractor roulette.",
  },
  {
    n: "02",
    title: "Two Decades of Fit-Outs",
    body: `Trading since ${EST_YEAR}, formerly Ceilings Direct. The name changed in 2021; the people didn't.`,
  },
  {
    n: "03",
    title: "Work Around Your Business",
    body: "We programme around live premises. A butcher's shop we refurbished never closed for a single day of trading.",
  },
  {
    n: "04",
    title: "Fixed Written Quotations",
    body: "A free survey, a written price, and no surprises once the work begins.",
  },
];

export function Home() {
  const reduce = useReducedMotion();
  const featured = getProject("padeswood-buckley-golf-club")!;
  const yearsTrading = new Date().getFullYear() - EST_YEAR;

  return (
    <>
      <Seo
        title="Direct Interiors North West — Commercial Fit-Outs, Chester & North Wales"
        description={`Commercial interior fit-outs, refurbishments and bespoke installations across Chester, Deeside, North Wales and the North West. Every trade in-house, est. ${EST_YEAR}. Free survey & written quote.`}
        path="/"
        image="bell-meadow-hero-0a75fafa"
        jsonLd={localBusinessJsonLd()}
      />

      {/* ---------------- HERO ---------------- */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <motion.div
            className="h-full w-full"
            initial={reduce ? undefined : { scale: 1.08 }}
            animate={reduce ? undefined : { scale: 1 }}
            transition={{ duration: 1.6, ease: EASE }}
          >
            <OptimizedImage
              src="bell-meadow-hero-0a75fafa"
              alt="A completed commercial office interior with a dramatic black feature ceiling"
              priority
              sizes="100vw"
              className="h-full w-full"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/30" />
          <div className="absolute inset-0 bg-ink/40" />
        </div>
        <div className="grain absolute inset-0" aria-hidden="true" />

        <div className="container-edge relative z-[1] w-full pt-28">
          <div className="max-w-3xl">
            <motion.p
              className="eyebrow mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.7 }}
            >
              Commercial Interiors — Est. {EST_YEAR}
            </motion.p>
            <motion.span
              className="mb-7 block h-px w-20 origin-left bg-brass"
              initial={{ scaleX: reduce ? 1 : 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.9, ease: EASE }}
            />
            <h1 className="font-display text-display-xl font-light text-text-dark">
              {HERO_LINES.map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    variants={lineClip}
                    initial="hidden"
                    animate="show"
                    transition={{ delay: 0.3 + i * 0.12, duration: 0.8, ease: EASE }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              className="mt-7 max-w-xl font-sans text-lg font-light text-text-dark/80"
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.7, ease: EASE }}
            >
              From a single suspended ceiling to a full turnkey fit-out, Direct Interiors delivers every trade
              in-house, on programme, across Chester, North Wales and the North West.
            </motion.p>
            <motion.div
              className="mt-9 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7, ease: EASE }}
            >
              <Button to="/contact" variant="gold" size="lg" arrow>
                Get Your Free Quote
              </Button>
              <Button to="/projects" variant="ghost" size="lg">
                See Our Work
              </Button>
            </motion.div>
            <motion.ul
              className="mt-10 flex flex-wrap gap-x-7 gap-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.7 }}
            >
              {["Free no-obligation site survey", "Every trade in-house", "CSCS-carded teams"].map((t) => (
                <li key={t} className="flex items-center gap-2 font-sans text-sm text-text-dark/70">
                  <Check className="h-4 w-4 text-brass" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </motion.ul>
          </div>
        </div>

        {/* Floating consultation card (desktop) */}
        <motion.aside
          className="absolute bottom-12 right-10 z-[1] hidden w-72 rounded-sm border border-brass/30 bg-ink/70 p-7 backdrop-blur-md xl:block"
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7, ease: EASE }}
        >
          <p className="eyebrow mb-3">Planning a fit-out?</p>
          <a href={site.phoneHref} className="block font-display text-3xl font-light text-brass hover:text-brass-light">
            {site.phoneDisplay}
          </a>
          <p className="mt-3 font-sans text-sm text-text-dark/70">Free consultation — no obligation, ever.</p>
        </motion.aside>
      </section>

      {/* ---------------- TRUST TICKER ---------------- */}
      <Ticker items={TICKER} tone="light" />

      {/* ---------------- SOLUTIONS OVERVIEW ---------------- */}
      <Section tone="dark" plaster aria-labelledby="solutions-heading">
        <SectionHeading
          eyebrow="What we do"
          title={<span id="solutions-heading">Every space. Every trade.</span>}
          intro="Seven core solutions, delivered by one in-house team — so the trades that make up your project never work in silos."
        />
        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s) => (
            <RevealItem key={s.slug} className="h-full">
              <SolutionCard solution={s} />
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-5">
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
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </span>
          </Link>
        </Reveal>
      </Section>

      {/* ---------------- FEATURED PROJECT ---------------- */}
      <section className="relative grid overflow-hidden bg-ink-soft lg:grid-cols-[3fr_2fr]">
        <div className="relative min-h-[52vh] lg:min-h-[80vh]">
          <OptimizedImage
            src={featured.hero}
            alt={`${featured.title} — ${featured.cardBlurb}`}
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent lg:bg-gradient-to-r" />
        </div>
        <div className="grain relative flex flex-col justify-center px-8 py-16 md:px-14">
          <Reveal>
            <p className="eyebrow mb-4">Our work speaks</p>
            <span className="mb-6 inline-block rounded-full border border-brass/50 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-brass">
              Washroom Refurbishment
            </span>
            <h2 className="font-display text-display-md text-text-dark">{featured.title}</h2>
            <p className="mt-4 max-w-md font-sans font-light text-text-dark/75">
              A full washroom and changing-room refurbishment — strip-out, hygienic cladding, new sanitaryware and
              anti-slip flooring — delivered while the club stayed open.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-y-4 font-mono text-xs uppercase tracking-[0.1em] text-text-dark/60">
              {[
                ["Duration", featured.duration ?? "—"],
                ["Sector", featured.sector],
                ["Trades", "In-house"],
                ["Status", "Complete"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-brass">{k}</dt>
                  <dd className="mt-1 text-text-dark/80">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-9">
              <Button to={`/projects/${featured.slug}`} variant="primary" arrow>
                View Full Project
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- WHY DIRECT ---------------- */}
      <Section tone="light" aria-labelledby="why-heading">
        <SectionHeading
          eyebrow="The Direct difference"
          title={<span id="why-heading">We're not the cheapest tender on the pile.</span>}
          intro="We're the contractor you never have to chase."
        />
        <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2">
          {PILLARS.map((p) => (
            <Reveal key={p.n} className="relative">
              <span
                className="pointer-events-none absolute -top-8 left-0 font-display text-8xl font-light text-brass/15"
                aria-hidden="true"
              >
                {p.n}
              </span>
              <div className="relative pt-6">
                <h3 className="font-display text-2xl font-medium text-text-light">{p.title}</h3>
                <p className="mt-3 max-w-md font-sans font-light text-graphite">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------- RECENT PROJECTS ---------------- */}
      <Section tone="dark" plaster aria-labelledby="recent-heading">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Recent projects" title={<span id="recent-heading">Proof, not promises.</span>} />
          <Reveal>
            <Button to="/projects" variant="ghost" arrow>
              See All Projects
            </Button>
          </Reveal>
        </div>
        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <RevealItem key={p.slug} className="h-full">
              <ProjectCard project={p} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ---------------- TESTIMONIALS ---------------- */}
      <Section tone="light" aria-labelledby="testimonials-heading">
        <SectionHeading eyebrow="In their words" title={<span id="testimonials-heading">Taken at their word.</span>} />
        <div className="mt-12">
          <TestimonialCarousel />
        </div>
      </Section>

      {/* ---------------- SECTORS ---------------- */}
      <Section tone="dark" cut="top" plaster aria-labelledby="sectors-heading">
        <SectionHeading
          eyebrow="Sectors we work in"
          title={<span id="sectors-heading">From primary schools to golf clubs.</span>}
          intro="Government offices, high-street butchers, business parks and leisure clubs — we've delivered across all of them."
        />
        <RevealGroup className="mt-12 flex flex-wrap gap-3">
          {sectors.map((s) => (
            <RevealItem key={s.name}>
              <span className="inline-block rounded-full border border-stone/40 px-5 py-2.5 font-sans text-sm text-text-dark/80">
                {s.name}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-16">
          <div className="grid gap-8 border-t border-white/10 pt-12 sm:grid-cols-3">
            {[
              { v: yearsTrading, s: "+", label: "Years trading" },
              { v: 11, s: "", label: "Trades in-house" },
              { v: 8, s: "", label: "Sectors served" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <Counter to={stat.v} suffix={stat.s} className="font-display text-6xl font-light text-brass" />
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-text-dark/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ---------------- FINAL CTA ---------------- */}
      <CTASection />

      {/* subtle brand statement rule under CTA handled by footer */}
      <div className="sr-only">
        <GoldRule />
      </div>
    </>
  );
}
