import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/primitives/Section";
import { CTASection } from "@/components/CTASection";

/** Temporary stub used until the real page is built. */
export function Stub({ title, path, image }: { title: string; path: string; image: string }) {
  return (
    <>
      <Seo title={`${title} | Direct Interiors`} description={`${title} — Direct Interiors North West.`} path={path} image={image} />
      <PageHero title={title} image={image} imageAlt={title} crumbs={[{ name: "Home", path: "/" }, { name: title }]} />
      <Section tone="dark">
        <p className="font-sans text-text-dark/70">This page is being prepared.</p>
      </Section>
      <CTASection />
    </>
  );
}
