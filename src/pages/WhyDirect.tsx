import { Check } from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { Section } from "@/components/primitives/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/primitives/Reveal";
import { Button } from "@/components/primitives/Button";
import { GoldRule, Counter } from "@/components/primitives/bits";
import { OptimizedImage } from "@/components/primitives/OptimizedImage";
import { trades, site, EST_YEAR } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/seo";

const STANDARDS = [
  "CSCS-carded operatives on every site",
  "Trade-qualified across all eleven disciplines",
  "The same in-house teams, project after project",
  "One point of contact, from first survey to sign-off",
];

export function WhyDirect() {
  return (
    <>
      <Seo
        title="About Direct Interiors — Family-Run Fit-Out Specialists | Direct Interiors"
        description={`Direct Interiors is a family-run commercial fit-out specialist in Deeside — formerly Ceilings Direct, est. ${EST_YEAR}. Every trade in-house, serving Chester, North Wales and the North West.`}
        path="/why-direct"
        image="about-us-hero"
        jsonLd={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Why Direct", path: "/why-direct" },
        ])}
      />

      <PageHero
        eyebrow="Why Direct"
        title="We take the long view."
        lead="A family-run fit-out specialist that grew up installing ceilings — and learned every other trade a building needs along the way."
        image="about-us-hero"
        imageAlt="A commercial interior completed by Direct Interiors"
        crumbs={[{ name: "Home", path: "/" }, { name: "Why Direct" }]}
      />

      {/* ---------------- THE STORY ---------------- */}
      <Section tone="light" aria-labelledby="story-heading">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-4">Our story</p>
            <GoldRule className="mb-6" />
            <h2 id="story-heading" className="font-display text-display-md text-text-light">
              It started with a ceiling.
            </h2>
            <div className="mt-6 space-y-5 font-sans text-lg font-light text-graphite">
              <p>
                Direct Interiors did not begin as an interiors company. In {EST_YEAR} it began as
                Ceilings Direct — a suspended-ceiling contractor working across Chester, Deeside and
                North Wales.
              </p>
              <p>
                Two decades of installing ceilings teaches you something the tender documents never
                mention: a ceiling is only as good as the partitions that carry it, the electrics
                threaded above it, the flooring beneath it and the joinery that frames it. So we
                learned those trades too — and brought every one of them in-house.
              </p>
              <p>
                By 2021 the name no longer fitted the work. Ceilings Direct became Direct Interiors
                North West, a full commercial fit-out contractor. The letterhead changed. The people
                didn&rsquo;t.
              </p>
            </div>
            <p className="mt-8 border-l-2 border-brass pl-5 font-display text-2xl font-light text-text-light">
              Still family-run. Still answering our own phone. Still taking the long view.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <OptimizedImage
              src="about-us-side01"
              alt="A commercial fit-out completed by Direct Interiors"
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="rounded-sm border border-graphite/10"
            />
          </Reveal>
        </div>
      </Section>

      {/* ---------------- EVERY TRADE UNDER ONE ROOF ---------------- */}
      <Section tone="dark" plaster aria-labelledby="trades-heading">
        <SectionHeading
          eyebrow="Every trade in-house"
          title={<span id="trades-heading">Every trade under one roof.</span>}
          intro="A fit-out is usually a relay race between subcontractors — and when the baton drops, everyone points at someone else. We took the batons away."
        />
        <Reveal className="mt-6 max-w-2xl">
          <p className="font-sans text-lg font-light text-text-dark/75">
            Every one of these eleven trades is ours, managed by one team and answerable to a single
            point of contact. Single-source delivery leaves no gap between trades for a problem to
            hide in — and no one left to blame but us.
          </p>
        </Reveal>
        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trades.map((t, i) => (
            <RevealItem key={t.name} className="h-full">
              <div className="group h-full rounded-sm border border-white/10 bg-white/[0.02] p-6 transition-colors duration-200 hover:border-brass/40">
                <span className="font-mono text-xs tracking-[0.14em] text-brass">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-xl font-light text-text-dark">{t.name}</h3>
                <p className="mt-2 font-sans text-sm font-light text-text-dark/65">{t.blurb}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ---------------- PEOPLE & STANDARDS ---------------- */}
      <Section tone="light" aria-labelledby="standards-heading">
        <SectionHeading
          eyebrow="People & standards"
          title={<span id="standards-heading">Qualified, carded, and here for the long haul.</span>}
          intro="The people on your site are the reason clients who called us two decades ago still call us now."
        />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <ul className="space-y-4">
              {STANDARDS.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-brass" aria-hidden="true" />
                  <span className="font-sans text-lg font-light text-graphite">{s}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <OptimizedImage
              src="about-us-parallax"
              alt="A commercial interior installed by Direct Interiors"
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="rounded-sm border border-graphite/10"
            />
          </Reveal>
        </div>

        {/* TODO(client): add verified accreditation logos + team photos */}
        <Reveal className="mt-16">
          <div className="rounded-sm border border-dashed border-graphite/30 bg-white/50 p-8 md:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-graphite">Accreditations</p>
            <h3 className="mt-3 font-display text-2xl font-light text-text-light">
              Accreditations — coming soon.
            </h3>
            <p className="mt-4 max-w-2xl font-sans font-light text-graphite">
              We&rsquo;re finalising the verified accreditation badges for this page. When they land,
              they&rsquo;ll be the real thing — confirmed and current. Until then we&rsquo;d rather
              show nothing than show something we can&rsquo;t stand behind.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[0, 1, 2].map((n) => (
                <div
                  key={n}
                  className="flex h-20 items-center justify-center rounded-sm border border-dashed border-graphite/25 bg-white/40"
                >
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-mute">
                    Coming soon
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ---------------- BY THE NUMBERS ---------------- */}
      <Section tone="dark" plaster aria-labelledby="numbers-heading">
        <SectionHeading
          eyebrow="Two decades in"
          title={<span id="numbers-heading">The long view, in numbers.</span>}
        />
        <RevealGroup className="mt-14 grid gap-8 border-t border-white/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <RevealItem className="text-center">
            <span className="font-display text-6xl font-light text-brass">{EST_YEAR}</span>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-text-dark/60">
              Established
            </p>
          </RevealItem>
          {[
            { to: 11, label: "Trades in-house" },
            { to: 8, label: "Sectors served" },
            { to: 1, label: "Point of contact" },
          ].map((stat) => (
            <RevealItem key={stat.label} className="text-center">
              <Counter to={stat.to} className="font-display text-6xl font-light text-brass" />
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-text-dark/60">
                {stat.label}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ---------------- SISTER COMPANY ---------------- */}
      <Section tone="light" aria-labelledby="sister-heading">
        <Reveal>
          <div className="flex flex-col gap-8 rounded-sm border border-graphite/20 bg-white/60 p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-graphite">
                Trade materials
              </p>
              <h2 id="sister-heading" className="mt-3 font-display text-3xl font-light text-text-light">
                Need materials only?
              </h2>
              <p className="mt-3 max-w-xl font-sans font-light text-graphite">
                Our sister company {site.sister.name} supplies trade ceiling & partitioning
                materials.
              </p>
            </div>
            <Button href={site.sister.url} variant="primary" size="lg" newTab arrow>
              Visit {site.sister.name}
            </Button>
          </div>
        </Reveal>
      </Section>

      <CTASection />
    </>
  );
}
