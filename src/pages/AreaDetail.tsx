import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/primitives/Reveal";
import { Button } from "@/components/primitives/Button";
import { GoldRule } from "@/components/primitives/bits";
import { ProjectCard } from "@/components/cards";
import { CTASection } from "@/components/CTASection";
import { areas, getArea } from "@/data/areas";
import { getProject } from "@/data/projects";
import { site, EST_YEAR } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import type { Project } from "@/data/types";
import { cn } from "@/lib/cn";

export function AreaDetail() {
  const { slug } = useParams();
  const a = slug ? getArea(slug) : undefined;
  if (!a) return <Navigate to="/areas" replace />;

  const related = a.relatedProjects
    .map((s) => getProject(s))
    .filter((p): p is Project => Boolean(p));
  const others = areas.filter((x) => x.slug !== a.slug);
  const heroImage = related[0]?.hero ?? "interior-fit-out-hero-new";

  const facts = [
    "Free no-obligation site survey",
    "Every trade in-house",
    `Established ${EST_YEAR}`,
    `Based in ${site.address.line2}, ${site.address.town}`,
  ];

  return (
    <>
      <Seo
        title={a.seo.title}
        description={a.seo.description}
        path={`/areas/${a.slug}`}
        image="glass-partitions-hero-69cd9864"
        jsonLd={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Areas", path: "/areas" },
          { name: a.name },
        ])}
      />

      <PageHero
        eyebrow="Areas we cover"
        title={`Commercial fit-outs in ${a.name}`}
        image={heroImage}
        imageAlt="A completed commercial interior fit-out delivered by Direct Interiors"
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Areas", path: "/areas" },
          { name: a.name },
        ]}
      />

      {/* Intro */}
      <Section tone="light" aria-labelledby="area-intro-heading">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-4">Local coverage</p>
            <GoldRule className="mb-6" />
            <h2 id="area-intro-heading" className="font-display text-display-sm text-text-light">
              Your fit-out team in {a.name}
            </h2>
          </Reveal>
          <Reveal className="space-y-5">
            {a.intro.map((p, i) => (
              <p key={i} className="font-sans text-lg font-light text-graphite">
                {p}
              </p>
            ))}
          </Reveal>
        </div>

        <Reveal className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-graphite/15 pt-8">
          {facts.map((f) => (
            <span key={f} className="flex items-center gap-2 font-sans text-sm text-graphite">
              <Check className="h-4 w-4 text-brass" aria-hidden="true" />
              {f}
            </span>
          ))}
        </Reveal>
      </Section>

      {/* Related work */}
      <Section tone="dark" plaster aria-labelledby="area-work-heading">
        {related.length > 0 ? (
          <>
            <SectionHeading
              eyebrow="Our work"
              title={<span id="area-work-heading">Recent work in {a.name}</span>}
              intro={`A closer look at what our in-house teams have delivered in and around ${a.name}.`}
            />
            <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <RevealItem key={p.slug} className="h-full">
                  <ProjectCard project={p} />
                </RevealItem>
              ))}
            </RevealGroup>
          </>
        ) : (
          <div className="max-w-2xl">
            <SectionHeading
              eyebrow="Our work"
              title={<span id="area-work-heading">Planning a project in {a.name}?</span>}
            />
            <Reveal>
              <p className="mt-6 font-sans text-lg font-light text-text-dark/75">
                We haven't published a case study in {a.name} yet — but it's well within our patch. Tell us what
                you're planning and we'll walk you through relevant work from nearby and arrange a free site survey.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Button to="/projects" variant="gold" arrow>
                  See Our Work
                </Button>
                <Button to="/contact" variant="ghost" arrow>
                  Talk to the Survey Team
                </Button>
              </div>
            </Reveal>
          </div>
        )}
      </Section>

      {/* Other areas */}
      <Section tone="light" aria-labelledby="other-areas-heading">
        <SectionHeading eyebrow="Elsewhere" title={<span id="other-areas-heading">Other areas we cover</span>} />
        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((o) => (
            <RevealItem key={o.slug} className="h-full">
              <Link
                to={`/areas/${o.slug}`}
                className={cn(
                  "group flex h-full items-center justify-between gap-4 rounded-sm border border-graphite/15 bg-white/50 px-6 py-5 transition-all duration-200 ease-editorial",
                  "hover:-translate-y-0.5 hover:border-brass/50 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass",
                )}
              >
                <span>
                  <span className="block font-display text-xl font-light text-text-light">{o.name}</span>
                  <span className="mt-1 block font-mono text-[0.62rem] uppercase tracking-[0.14em] text-graphite">
                    {o.tier === "core" ? "Core coverage" : "Extended coverage"}
                  </span>
                </span>
                <ArrowUpRight
                  className="h-5 w-5 shrink-0 text-brass transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-8">
          <Button to="/areas" variant="link" arrow>
            See all areas we cover
          </Button>
        </Reveal>
      </Section>

      <CTASection />
    </>
  );
}
