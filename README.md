# Direct Interiors North West — website

Premium refresh of [directinteriorsnw.com](https://www.directinteriorsnw.com), rebuilt as a
static [Eleventy](https://www.11ty.dev/) site that preserves the existing brand, palette,
photography and copy. See [PLAN.md](PLAN.md) for the full change plan, the client decision
list (`TODO(client)`), and acceptance results; see [redirects.md](redirects.md) for the 301 map.

## Commands

```bash
npm install
npm run dev      # local dev server with live reload
npm run build    # production build → _site/
npm run check    # QA gates: placeholder grep + link/img/h1 checker (run after build)
npm run verify   # build + check
```

## Structure

```
src/
  _data/            Single sources of truth — templates never hard-code these
    site.js           company details, Est. year, form endpoint, GA id
    testimonials.json all quotes + attribution (fixes the old conflicting-attribution bug)
    solutions.js      the 7 solution pages (copy, checklists, related projects)
    projects.js       the 7 case studies (copy, galleries, meta, prev/next)
    sectors.json      home sector tiles
    products.json     "Shop online" cards (link to Ceilings Direct)
    navigation.json   header nav
    redirects.json    301 map (generates _redirects + fallback stubs)
  _includes/
    layouts/base.njk  head (SEO/OG/JSON-LD), header, footer, consent banner
    components/       header, footer, hero, cta-band, testimonial, enquiry-form,
                      checklist, breadcrumbs, cards, contact-strip, related links
  assets/
    css/tokens.css    design tokens (sampled from the live site/logo — see PLAN.md)
    css/main.css      all component styles
    js/main.js        nav, lightbox, form validation, filters, consent (~9KB, no deps)
    img/src/          master photography (downloaded from the live site's CDN)
    fonts/            self-hosted Source Sans 3 (variable, 2 files)
  *.njk               one template per page; solution-pages.njk / project-pages.njk
                      generate the 7+7 interior pages from the data files
scripts/
  check-placeholders.sh  build fails if any Duda placeholder string reappears
  check-links.mjs        broken/dead links, img src/alt/dimensions, one-h1-per-page
```

## Conventions

- **Images**: use the `{% image %}` shortcode (never a raw `<img>`) — it generates
  AVIF/WebP/JPEG variants with `srcset`, explicit dimensions and lazy loading via
  `@11ty/eleventy-img`.
- **Company details** (phone, email, address, Est. year) come from `src/_data/site.js` only.
- **Testimonials** render through `components/testimonial.njk` from `testimonials.json` only.
- CSS is plain BEM-ish classes on top of `tokens.css` custom properties; no framework.
- All URLs from the old site are preserved or 301'd — do not rename slugs without
  updating `redirects.json` and `redirects.md`.

## Deployment notes

- `_redirects` (Netlify format) is generated into the build output. On other hosts,
  port `src/_data/redirects.json` to the platform's redirect config (see redirects.md).
- The enquiry form needs an endpoint: set `formEndpoint` in `src/_data/site.js`
  (`TODO(client)` — Duda's internal form handler could not be carried over).
- Analytics: set `gaId` in `site.js` to enable the consent-gated GA4 loader.
