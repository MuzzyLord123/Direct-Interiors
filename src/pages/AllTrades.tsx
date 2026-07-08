import { BadgeCheck, ShieldCheck, Users } from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/primitives/Section";
import { Button } from "@/components/primitives/Button";
import { RevealGroup, RevealItem } from "@/components/primitives/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { trades } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/seo";

const CREDENTIALS = [
  {
    icon: ShieldCheck,
    title: "CSCS-carded operatives",
    body: "Every member of the team on your site carries a valid CSCS card, so access and site compliance are never in question.",
  },
  {
    icon: BadgeCheck,
    title: "Trade-qualified",
    body: "Joiners, electricians, plumbers and fixers who are qualified in their trades — the right person doing the work they know.",
  },
  {
    icon: Users,
    title: "One point of contact",
    body: "One project manager owns your job from survey to sign-off — no chasing subcontractors, no blame game when something needs putting right.",
  },
];

export function AllTrades() {
  return (
    <>
      <Seo
        title="All Trades In-House — Chester & North Wales | Direct Interiors"
        description="Eleven trades under one roof and a single point of contact — CSCS-carded, trade-qualified teams delivering commercial interiors across Chester, Deeside and North Wales."
        path="/all-trades"
        image="sub-services-hero-64d135dd"
        jsonLd={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "All Trades In-House" }])}
      />

      <PageHero
        eyebrow="One team, one roof"
        title="Every trade. In-house."
        lead="When every trade belongs to a different company, the gaps between them are where programmes slip and no one takes responsibility. We hold all eleven ourselves — so there's no subcontractor blame game, just one team accountable for the finish."
        image="sub-services-hero-64d135dd"
        imageAlt="A commercial interior under construction with several trades at work on site"
        crumbs={[{ name: "Home", path: "/" }, { name: "All Trades" }]}
      >
        <Button to="/contact" variant="gold" size="lg" arrow>
          Get Your Free Quote
        </Button>
      </PageHero>

      {/* ---------------- THE ELEVEN TRADES ---------------- */}
      <Section tone="dark" plaster aria-labelledby="trades-heading">
        <SectionHeading
          eyebrow="The eleven trades"
          title={<span id="trades-heading">Everything a fit-out needs.</span>}
          intro="From first strip-out to final snag, these are the trades we self-deliver — sequenced by one contractor rather than co-ordinated across a chain of subbies."
        />
        <RevealGroup as="ul" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trades.map((t, i) => (
            <RevealItem as="li" key={t.name} className="h-full">
              <div className="group relative flex h-full flex-col rounded-sm border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 ease-editorial hover:-translate-y-1 hover:border-brass/40 hover:bg-white/[0.05] hover:shadow-lift">
                <span className="font-mono text-sm tracking-[0.1em] text-brass" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl font-light text-text-dark">{t.name}</h3>
                <p className="mt-2 font-sans text-sm font-light text-text-dark/65">{t.blurb}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ---------------- CREDIBILITY ---------------- */}
      <Section tone="light" aria-labelledby="team-heading">
        <SectionHeading
          eyebrow="The people on site"
          title={<span id="team-heading">Carded, qualified, and ours.</span>}
          intro="Because the whole team works for Direct Interiors, single-source delivery isn't a promise on a tender — it's simply how the job runs."
        />
        <RevealGroup className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-3">
          {CREDENTIALS.map((c) => {
            const Icon = c.icon;
            return (
              <RevealItem key={c.title}>
                <Icon className="h-8 w-8 text-brass" strokeWidth={1.25} aria-hidden="true" />
                <h3 className="mt-5 font-display text-2xl font-medium text-text-light">{c.title}</h3>
                <p className="mt-3 max-w-md font-sans font-light text-graphite">{c.body}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      <CTASection />
    </>
  );
}
