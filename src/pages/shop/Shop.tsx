import { useMemo, useState } from "react";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { CTASection } from "@/components/CTASection";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { shopProducts, shopCategories } from "@/data/shop";
import { site } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import { cn } from "@/lib/cn";

const ALL = "All";

export function Shop() {
  const [cat, setCat] = useState<string>(ALL);
  const filtered = useMemo(() => (cat === ALL ? shopProducts : shopProducts.filter((p) => p.category === cat)), [cat]);
  const options = [ALL, ...shopCategories.map((c) => c.name)];

  return (
    <>
      <Seo
        title="Shop — Trade Ceilings & Building Materials | Direct Interiors"
        description="Buy ceiling tiles, grid, metal framing and stud & track online. Trade materials supplied through our sister company Ceilings Direct, delivered across the UK."
        path="/shop"
        image="ceiling-tiles-home01"
        jsonLd={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Shop" }])}
      />

      <PageHero
        eyebrow="Trade materials"
        title="The shop."
        lead="The same ceiling and partitioning materials we fit — available to buy online, supplied through our sister company Ceilings Direct."
        image="ceiling-tiles-home01"
        imageAlt="Stacked suspended ceiling tiles"
        crumbs={[{ name: "Home", path: "/" }, { name: "Shop" }]}
      />

      <Section tone="dark" plaster aria-labelledby="shop-heading">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <SectionHeading
            eyebrow="Buy online"
            title={<span id="shop-heading">Materials, delivered.</span>}
            intro="Genuine trade products at trade-store prices. Need bulk pricing or something you can't see here? Call us on the number below."
          />
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-text-dark/55" aria-live="polite">
              {filtered.length} product{filtered.length === 1 ? "" : "s"}
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-10">
          <div role="group" aria-label="Filter products by category" className="flex flex-wrap gap-2.5">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setCat(option)}
                aria-pressed={cat === option}
                className={cn(
                  "min-h-[44px] rounded-full border px-5 py-2 font-mono text-xs uppercase tracking-[0.12em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass",
                  cat === option ? "border-brass bg-brass text-ink" : "border-white/20 text-text-dark/70 hover:border-brass/60 hover:text-brass",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {filtered.map((p) => (
            <ShopProductCard key={p.id} product={p} />
          ))}
        </div>

        <Reveal className="mt-14 border-t border-white/10 pt-8">
          <p className="max-w-2xl font-sans font-light text-text-dark/70">
            Products and pricing are supplied by{" "}
            <a href={site.sister.url} target="_blank" rel="noopener noreferrer" className="text-brass hover:text-brass-light">
              Ceilings Direct
            </a>
            , our sister company. Prices are shown in pounds and include VAT. Delivery is calculated at checkout, or collect
            free from our Deeside trade counter.
          </p>
        </Reveal>
      </Section>

      <CTASection
        eyebrow="Trade enquiry"
        title="Buying in bulk?"
        body="For project quantities, bespoke orders or trade accounts, talk to us directly — we'll sort a price."
        primaryLabel="Talk to the Team"
        primaryTo="/contact"
      />
    </>
  );
}
