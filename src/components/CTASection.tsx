import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { Button } from "@/components/primitives/Button";
import { GoldRule } from "@/components/primitives/bits";
import { site } from "@/data/site";

interface Props {
  eyebrow?: string;
  title?: string;
  body?: string;
  primaryLabel?: string;
  primaryTo?: string;
}

/** The recurring high-impact closing CTA band. Dark, diagonal cut, centred. */
export function CTASection({
  eyebrow = "Free survey & quotation",
  title = "Your space. Sorted.",
  body = "No hard sell. No obligation. We visit, we measure, we listen — and you get a fixed written quotation.",
  primaryLabel = "Book Your Free Survey",
  primaryTo = "/contact",
}: Props) {
  return (
    <Section tone="dark" cut="top" plaster className="text-center">
      <Reveal className="mx-auto max-w-3xl">
        <p className="eyebrow mb-5">{eyebrow}</p>
        <GoldRule className="mx-auto mb-7" width="90px" />
        <h2 className="font-display text-display-lg">{title}</h2>
        <p className="mx-auto mt-6 max-w-xl font-sans text-lg font-light text-text-dark/75">{body}</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button to={primaryTo} variant="gold" size="lg" arrow>
            {primaryLabel}
          </Button>
          <a href={site.phoneHref} className="font-mono text-text-dark/80 transition-colors hover:text-brass">
            Or call {site.phoneDisplay}
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
