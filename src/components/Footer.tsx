import { Link } from "react-router-dom";
import { navSolutions, site } from "@/data/site";
import { Button } from "@/components/primitives/Button";
import { GoldRule } from "@/components/primitives/bits";

const company = [
  { label: "Why Direct", href: "/why-direct" },
  { label: "Projects", href: "/projects" },
  { label: "Shop Materials", href: "/shop" },
  { label: "Process & Pricing", href: "/process" },
  { label: "Areas We Cover", href: "/areas" },
  { label: "About Ceilings Direct", href: site.sister.url },
];

const help = [
  { label: "Contact", href: "/contact" },
  { label: "Get a Free Quote", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Cookies Policy", href: "/cookies" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="grain plaster relative bg-ink text-text-dark">
      <div className="container-edge relative z-[1] py-section-sm">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <p className="font-display text-2xl font-medium tracking-wordmark">DIRECT</p>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.34em] text-brass">Interiors North West</p>
            <p className="mt-5 font-display text-xl italic text-brass">{site.tagline}</p>
            <address className="mt-5 not-italic text-sm leading-relaxed text-text-dark/70">
              {site.address.line1}
              <br />
              {site.address.line2}, {site.address.town}
              <br />
              {site.address.county} {site.address.postcode}
            </address>
            <a href={site.phoneHref} className="mt-4 inline-block py-1 font-mono text-lg text-brass hover:text-brass-light">
              {site.phoneDisplay}
            </a>
            <a href={`mailto:${site.email}`} className="inline-block py-1.5 text-sm text-text-dark/70 hover:text-brass link-underline">
              {site.email}
            </a>
          </div>

          {/* Solutions */}
          <nav aria-label="Footer solutions">
            <h2 className="eyebrow mb-4">Solutions</h2>
            <GoldRule width="40px" className="mb-5" />
            <ul className="space-y-2.5 text-sm">
              {navSolutions.map((s) => (
                <li key={s.href}>
                  <Link to={s.href} className="inline-block py-1 text-text-dark/75 transition-colors hover:text-brass">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Footer company">
            <h2 className="eyebrow mb-4">Company</h2>
            <GoldRule width="40px" className="mb-5" />
            <ul className="space-y-2.5 text-sm">
              {company.map((c) => {
                const external = c.href.startsWith("http");
                return (
                  <li key={c.label}>
                    {external ? (
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block py-1 text-text-dark/75 transition-colors hover:text-brass"
                      >
                        {c.label}
                      </a>
                    ) : (
                      <Link to={c.href} className="inline-block py-1 text-text-dark/75 transition-colors hover:text-brass">
                        {c.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Help + CTA */}
          <div>
            <h2 className="eyebrow mb-4">Help</h2>
            <GoldRule width="40px" className="mb-5" />
            <ul className="mb-6 space-y-2.5 text-sm">
              {help.map((h) => (
                <li key={h.label}>
                  <Link to={h.href} className="inline-block py-1 text-text-dark/75 transition-colors hover:text-brass">
                    {h.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Button to="/contact" variant="gold" size="sm" arrow>
              Book a Free Survey
            </Button>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-text-dark/50 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {year} {site.legalName}. All rights reserved.
            {/* TODO(client): add company registration & VAT numbers here. */}
          </p>
          <p>
            {site.sister.blurb}{" "}
            <a href={site.sister.url} target="_blank" rel="noopener noreferrer" className="text-brass hover:text-brass-light">
              Visit Ceilings Direct →
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
