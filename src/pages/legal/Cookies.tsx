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

export function Cookies() {
  return (
    <>
      <Seo
        title="Cookies Policy — Direct Interiors North West"
        description="How the Direct Interiors North West website uses cookies. We keep our use of cookies to a minimum."
        path="/cookies"
        image="about-us-parallax"
        jsonLd={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Cookies Policy", path: "/cookies" },
        ])}
      />

      <PageHero
        size="compact"
        eyebrow="Legal"
        title="Cookies Policy"
        image="about-us-parallax"
        imageAlt="A completed Direct Interiors commercial interior fit-out"
        crumbs={[{ name: "Home", path: "/" }, { name: "Cookies Policy" }]}
      />

      <Section tone="light">
        <Reveal>
          <div className={PROSE}>
            <p className="text-lg text-text-light">
              This policy explains how the {site.name} website uses cookies. We keep our use of cookies to a
              minimum.
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-graphite/70">Last updated: July 2026</p>

            <h2>What cookies are</h2>
            <p>
              Cookies are small text files that a website may store on your device to help it work correctly, or to
              remember information about your visit.
            </p>

            <h2>How we use cookies</h2>
            <p>
              This is a straightforward marketing website. We use only the strictly necessary cookies required for
              the site to load correctly and securely — no more than we need. We do not use cookies to track your
              activity across other websites, or to serve advertising.
            </p>

            <h2>Analytics and third-party cookies</h2>
            <p>
              We do not currently use analytics, advertising or third-party tracking cookies. If we introduce
              analytics or similar tools in future, we will update this page and ask for your consent before any
              non-essential cookies are set.
            </p>

            <h2>Managing cookies</h2>
            <p>
              You can control or delete cookies through your browser settings, and set your browser to refuse them.
              Because we rely only on essential cookies, blocking them may affect how parts of the site behave, but
              you are free to do so at any time.
            </p>

            <h2>Questions</h2>
            <p>
              If you have any questions about our use of cookies, email us at{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-14">
          <GoldRule className="mb-6" />
          <p className="font-sans font-light text-graphite">
            Questions about cookies?{" "}
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
