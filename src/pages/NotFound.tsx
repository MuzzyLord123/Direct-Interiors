import { Seo } from "@/components/Seo";
import { Section } from "@/components/primitives/Section";
import { Button } from "@/components/primitives/Button";
import { GoldRule } from "@/components/primitives/bits";
import { site } from "@/data/site";

export function NotFound() {
  return (
    <>
      <Seo title="Page Not Found | Direct Interiors" description="Sorry, we can't find that page." path="/404" noindex />
      <Section tone="dark" plaster className="flex min-h-[80vh] items-center pt-28 text-center">
        <div className="mx-auto max-w-xl">
          <p className="font-display text-8xl font-light text-brass/30">404</p>
          <GoldRule className="mx-auto my-6" width="90px" />
          <h1 className="font-display text-display-md">This page has moved on.</h1>
          <p className="mx-auto mt-5 max-w-md font-sans font-light text-text-dark/75">
            The page you're after isn't here. Let's get you back to something useful.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button to="/" variant="gold" arrow>
              Back to Home
            </Button>
            <Button to="/projects" variant="ghost">
              See Our Work
            </Button>
          </div>
          <p className="mt-8 font-mono text-sm text-text-dark/60">
            Or call us on{" "}
            <a href={site.phoneHref} className="text-brass hover:text-brass-light">
              {site.phoneDisplay}
            </a>
          </p>
        </div>
      </Section>
    </>
  );
}
