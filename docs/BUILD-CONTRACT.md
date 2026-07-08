# Build Contract — read before writing any page

You are building ONE page (or a small set) of the Direct Interiors premium marketing site.
The foundation is already built and committed. **Match `src/pages/Home.tsx` exactly for quality,
motion and visual language — read it first, it is the gold standard.** Then build your page to the
same bar.

## Absolute rules
1. **Only edit the file(s) you are assigned.** Do NOT create new shared components in
   `src/components/**` unless your task explicitly says so. Small helpers may live inside your page file.
2. **Do NOT run `npm run build`, `npm run dev`, `vite`, or start servers.** Integration build is done centrally.
   You may read files. Do not `npm install`.
3. **TypeScript strict** — no `any`, no unused vars/params (config has `noUnusedLocals`/`noUnusedParameters`).
   Every import must be used. Every image `alt` is required.
4. **Content-truth (CRITICAL):** use ONLY facts already in `src/data/**`. Never invent review counts,
   star ratings, project totals, insurance figures, accreditations, awards, staff numbers or dates.
   Verified stats you may show: `Est. {EST_YEAR}` (from site.ts), "11 trades in-house", "8 sectors served",
   "20+ / two decades", "4 weeks" (Padeswood only), "5-out-of-5 food hygiene rating" (Butchers only),
   named clients (Welsh Government, Demon Tweeks). If the design wants a stat you don't have, use a
   verified one or omit it — never fabricate.
5. **British English.** Warm, confident, plain-spoken, technically precise. CTA wording: "Get Your Free
   Quote", "Book Your Free Survey", "See Our Work", "Talk to the Survey Team" — never "Click here"/"Submit".
6. Every page must render exactly ONE `<h1>` (usually inside `<PageHero>`), then logical `<h2>`/`<h3>`.
7. Respect reduced motion — use the provided `Reveal`/`RevealGroup` (already handle it) rather than raw
   framer-motion where possible.

## Imports you will use (copy paths exactly, `@/` = `src/`)

### Data
```ts
import { site, EST_YEAR, sectorsServed, trades, navSolutions } from "@/data/site";
import { solutions, getSolution } from "@/data/solutions";
import { projects, featuredProjects, getProject, projectServiceTags, projectSectors } from "@/data/projects";
import { testimonials, getTestimonial } from "@/data/testimonials";
import { sectors } from "@/data/sectors";
import { areas, getArea, coreAreas, extendedAreas } from "@/data/areas";
import type { Solution, Project, Area, Trade, Testimonial } from "@/data/types";
```
Shapes: see `src/data/types.ts`. Key fields — Solution: `{slug, icon, name, navDescriptor, heroTitle,
heroImage, intro[], scope[{title,body}], systems?[], benefit?{eyebrow,title,body}, relatedProjects[],
testimonial?, faqs[{q,a}], seo{title,description}}`. Project: `{slug,title,town,sector,service[],hero,
thumb,cardBlurb,duration?,scopeTitle,scope[],story[],testimonial?,gallery[],relatedSolutions[],featured?,seo}`.
Area: `{slug,name,tier,intro[],relatedProjects[],seo}`.

### Components (props are exact)
```tsx
import { Seo } from "@/components/Seo";
// <Seo title description path image? jsonLd? noindex? />  image/jsonLd optional
import { PageHero } from "@/components/PageHero";
// <PageHero eyebrow? title lead? image imageAlt crumbs? size="compact"|"full" imagePosition?>{CTAs}</PageHero>
import { Breadcrumb } from "@/components/Breadcrumb";           // <Breadcrumb crumbs={[{name,path?}]} />
import { SectionHeading } from "@/components/SectionHeading";   // <SectionHeading eyebrow? title intro? align? as? />
import { CTASection } from "@/components/CTASection";           // <CTASection eyebrow? title? body? primaryLabel? primaryTo? />
import { TestimonialBlock } from "@/components/TestimonialBlock"; // <TestimonialBlock id="jones" />
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { Ticker } from "@/components/Ticker";                   // <Ticker items={string[]} tone="light"|"dark" />
import { ProjectCard, SolutionCard } from "@/components/cards"; // <ProjectCard project /> <SolutionCard solution />
import { Section } from "@/components/primitives/Section";
// <Section tone="dark"|"light"|"raised" cut="none"|"top"|"bottom"|"both" grain plaster full innerClassName aria-labelledby>...</Section>
import { Reveal, RevealGroup, RevealItem } from "@/components/primitives/Reveal";
import { Button } from "@/components/primitives/Button";
// <Button to="/x" | href="tel:..." variant="primary"|"gold"|"ghost"|"pill"|"link" size="sm"|"md"|"lg" arrow newTab>Label</Button>
import { GoldRule, Eyebrow, Counter } from "@/components/primitives/bits";
import { OptimizedImage } from "@/components/primitives/OptimizedImage";
// <OptimizedImage src="<manifestKey>" alt sizes? priority? treatment? position? className imgClassName />
import { SolutionIcon } from "@/components/primitives/SolutionIcon"; // <SolutionIcon icon={s.icon} size className="text-brass" />
import { cn } from "@/lib/cn";
```

**Images:** `src` is a manifest key = the master filename without extension (e.g. `"demon-tweeks-hero"`,
`"washroom-refurb-hero"`, `s.heroImage`, `p.gallery[i]`, `p.thumb`). All keys already exist. Never use a
raw `<img>`; always `<OptimizedImage>`. Always give real `alt`.

## Design language (Tailwind classes — do not invent colours)
- Tone backgrounds via `<Section tone>`. Dark = `bg-ink text-text-dark`; light = `bg-bone text-text-light`.
- Colours: `text-brass` / `bg-brass` (aged brass accent), `text-brass` on dark for small text is fine;
  on the LIGHT (`bone`) background, brass passes for large text only — for small brass text on light use
  sparingly. `text-graphite` = muted on light. `text-text-dark/70` = muted on dark. Gold shine bg = `bg-gold-shine`.
- Type: headings auto-use Cormorant (`font-display`, weight 300). Body `font-sans` (Outfit). Labels/stats
  `font-mono` (DM Mono). Display sizes: `text-display-xl/lg/md/sm`. Eyebrows: class `eyebrow` (mono, brass, tracked).
- Spacing: sections use `py-section`. Container: wrap inner content in `<Section>` (adds `.container-edge`)
  OR use `container-edge` class directly. Generous whitespace is the aesthetic — do not crowd.
- Signature details: gold rules (`<GoldRule/>`), 3° diagonal cuts (`<Section cut="top">`), grain is on by
  default, photo grade is automatic on `OptimizedImage`. Cards lift on hover with a gold border.
- Motion: wrap section content in `<Reveal>`; groups in `<RevealGroup>` with `<RevealItem>` children.
  Transitions 150–250ms. Everything must degrade under reduced motion (the primitives handle it).
- Buttons: primary CTA on light/photo = `variant="primary"`; strongest on dark = `variant="gold"`;
  outline on dark = `variant="ghost"`; nav pill = `variant="pill"`; text = `variant="link"`. Add `arrow`.

## SEO per page (required)
Every page returns `<Seo title description path image? jsonLd? />` as the first element. Use the page's
`seo.title`/`seo.description` from data where available; `path` is the route; `image` a manifest key
(usually the hero). For solution/project/area detail pages also pass breadcrumb JSON-LD:
```ts
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
```
Solution pages: `jsonLd={[breadcrumbJsonLd([...]), serviceJsonLd(s.name, s.seo.description, "/"+s.slug)]}`.

## Page skeleton to follow
```tsx
export function X() {
  return (
    <>
      <Seo .../>
      <PageHero .../>            {/* the single <h1> */}
      <Section tone="light">...</Section>
      <Section tone="dark">...</Section>
      {/* testimonial where one exists */}
      <CTASection />            {/* almost every page ends with this */}
    </>
  );
}
```
Keep the existing `export function <Name>(...)` signature of the stub you are replacing.
