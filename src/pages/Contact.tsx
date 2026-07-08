import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { GoldRule } from "@/components/primitives/bits";
import { EnquiryForm } from "@/components/EnquiryForm";
import { site } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/seo";

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`;
const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`;

/**
 * Lazy map facade: renders a lightweight styled placeholder and only loads the
 * heavy Google Maps iframe when the visitor opts in. Keeps the third-party
 * request (and its cookies) off the initial page load — better LCP and privacy.
 */
function MapEmbed() {
  const [loaded, setLoaded] = useState(false);
  if (loaded) {
    return (
      <div className="mt-8 overflow-hidden rounded-sm border border-white/10">
        <iframe
          title={`Map showing Direct Interiors at ${site.addressOneLine}`}
          src={mapSrc}
          width="100%"
          height="280"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ border: 0, filter: "grayscale(0.4) contrast(1.05)" }}
        />
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="group mt-8 flex h-[200px] w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-sm border border-white/10 bg-ink-soft text-center transition-colors hover:border-brass/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
      aria-label="Load the interactive map"
    >
      <MapPin className="h-7 w-7 text-brass" aria-hidden="true" />
      <span className="font-mono text-xs uppercase tracking-[0.14em] text-brass">Load interactive map</span>
      <span className="max-w-xs px-4 font-sans text-sm text-text-dark/60">{site.addressOneLine}</span>
    </button>
  );
}

export function Contact() {
  return (
    <>
      <Seo
        title="Contact — Free Survey & Written Quote | Direct Interiors"
        description={`Get a free quote or book a no-obligation survey for your fit-out or refurbishment. Call ${site.phoneDisplay} — covering Chester, Deeside, North Wales and the North West.`}
        path="/contact"
        image="slider04"
        jsonLd={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact" }])}
      />

      <PageHero
        eyebrow="Free survey & quotation"
        title="Let's talk about your space."
        lead="Tell us what you're planning and we'll come back to book your free, no-obligation survey. Prefer to talk? We do too."
        image="slider04"
        imageAlt="A completed Direct Interiors commercial interior"
        crumbs={[{ name: "Home", path: "/" }, { name: "Contact" }]}
      >
        <a href={site.phoneHref} className="font-display text-3xl font-light text-brass hover:text-brass-light">
          {site.phoneDisplay}
        </a>
      </PageHero>

      <Section tone="raised" innerClassName="grid gap-12 lg:grid-cols-[1.35fr_1fr]">
        <Reveal>
          <EnquiryForm />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="lg:pt-4">
            <p className="eyebrow mb-4">Direct Interiors North West</p>
            <GoldRule className="mb-7" />

            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-brass" aria-hidden="true" />
                <div>
                  <span className="block font-mono text-[0.65rem] uppercase tracking-[0.12em] text-text-dark/50">Call the survey team</span>
                  <a href={site.phoneHref} className="font-display text-2xl font-light text-brass hover:text-brass-light">
                    {site.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-brass" aria-hidden="true" />
                <div>
                  <span className="block font-mono text-[0.65rem] uppercase tracking-[0.12em] text-text-dark/50">Email</span>
                  <a href={`mailto:${site.email}`} className="text-text-dark hover:text-brass link-underline">
                    {site.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-brass" aria-hidden="true" />
                <div>
                  <span className="block font-mono text-[0.65rem] uppercase tracking-[0.12em] text-text-dark/50">Visit</span>
                  <address className="not-italic text-text-dark/85">
                    {site.address.line1}, {site.address.line2}
                    <br />
                    {site.address.town}, {site.address.county} {site.address.postcode}
                  </address>
                </div>
              </li>
            </ul>

            {/* TODO(client): confirm opening hours to display here. */}
            <p className="mt-7 text-sm text-text-dark/60">
              Covering {site.serviceArea}. No hard sell — just honest advice and a fixed written quotation.
            </p>

            <MapEmbed />
            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block font-mono text-xs uppercase tracking-[0.12em] text-brass hover:text-brass-light"
            >
              Open in Google Maps →
            </a>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
