import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { GoldRule } from "@/components/primitives/bits";
import { site } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/seo";

const PROSE =
  "max-w-prose font-sans text-[1.02rem] font-light leading-relaxed text-graphite marker:text-brass " +
  "[&>*+*]:mt-5 " +
  "[&>h2]:mt-12 [&>h2]:font-display [&>h2]:text-[1.6rem] [&>h2]:font-light [&>h2]:leading-snug [&>h2]:text-text-light " +
  "[&>ul]:list-disc [&>ul]:space-y-2 [&>ul]:pl-6 " +
  "[&_a]:font-normal [&_a]:text-brass [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-brass-light " +
  "[&_strong]:font-normal [&_strong]:text-text-light";

export function Terms() {
  return (
    <>
      <Seo
        title="Terms & Conditions — Direct Interiors North West"
        description="The terms of use that govern your use of the Direct Interiors North West website."
        path="/terms"
        image="about-us-parallax"
        jsonLd={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms & Conditions", path: "/terms" },
        ])}
      />

      <PageHero
        size="compact"
        eyebrow="Legal"
        title="Terms & Conditions"
        image="about-us-parallax"
        imageAlt="A completed Direct Interiors commercial interior fit-out"
        crumbs={[{ name: "Home", path: "/" }, { name: "Terms & Conditions" }]}
      />

      <Section tone="light">
        {/* TODO(client): full legal review — content is a standard template, not bespoke legal advice */}
        <Reveal>
          <div className={PROSE}>
            <p className="text-lg text-text-light">
              These terms govern your use of the {site.name} website, operated by {site.legalName}. By accessing or
              using this site, you agree to them. If you do not accept them, please do not use the site.
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-graphite/70">Last updated: July 2026</p>

            <h2>Acceptance of these terms</h2>
            <p>
              By browsing or otherwise using this website, you confirm that you accept these terms of use and agree
              to comply with them. Your continued use of the site constitutes acceptance of these terms as they
              stand from time to time.
            </p>

            <h2>Information on this site</h2>
            <p>
              The content on this website is provided for general information about {site.legalName} and the
              services we offer. We may update, change or remove content at any time without notice. While we take
              care to keep the information accurate and current, we make no warranties or guarantees as to its
              accuracy, completeness or ongoing availability, and it should not be relied upon as a substitute for a
              written quotation or professional advice.
            </p>

            <h2>Links to other websites</h2>
            <p>
              Where this site links to third-party websites, those links are provided for convenience only. We have
              no control over the content of those sites, and their inclusion does not imply any endorsement by us.
              We accept no responsibility for the content or practices of any linked website.
            </p>

            <h2>Intellectual property</h2>
            <p>
              All content on this website — including text, images, project photography, graphics and layout — is
              owned by or licensed to {site.legalName} and is protected by copyright and other intellectual property
              rights. You may view and print pages for your own reference, but you must not reproduce, distribute or
              reuse any content without our prior written permission.
            </p>

            <h2>Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, we shall not be liable for any loss or damage arising from
              your use of, or reliance on, this website or its content. Nothing in these terms excludes or limits
              our liability where it would be unlawful to do so.
            </p>

            <h2>Governing law</h2>
            <p>
              These terms are governed by the law of England and Wales, and any disputes relating to them will be
              subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>

            <h2>Changes to these terms</h2>
            <p>
              We may revise these terms at any time by updating this page. Please check it from time to time — your
              continued use of the site means you accept any changes made.
            </p>

            <h2>Contact us</h2>
            <p>
              If you have any questions about these terms, email us at{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
              <a href={site.phoneHref}>{site.phoneDisplay}</a>.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-14">
          <GoldRule className="mb-6" />
          <p className="font-sans font-light text-graphite">
            Questions about these terms?{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-brass underline underline-offset-4 hover:text-brass-light"
            >
              Contact us
            </a>
            .
          </p>
        </Reveal>
      </Section>
    </>
  );
}
