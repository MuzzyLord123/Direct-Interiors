# Direct Interiors North West — marketing site

A premium, static-rendered marketing site for Direct Interiors North West Ltd, a commercial
interior fit-out contractor. Built with **Vite + React + TypeScript + Tailwind + Framer Motion**.
Pure front-of-house: no backend, no auth, no database. All content lives in typed data files.

```bash
npm install
npm run dev        # local dev server (http://localhost:5173)
npm run build      # typecheck → vite build → prerender every route to static HTML + sitemap
npm run preview    # serve the built dist/
npm run check      # QA gates: placeholder grep + link/img/heading/meta checks (run after build)
npm run verify     # build + check
npm run images     # regenerate responsive image variants + manifest from image-masters/
```

## Where the content lives (edit these, not the components)

All copy and structured content is in **`src/data/`** — components are purely presentational:

| File | Contents |
|------|----------|
| `site.ts` | Company facts: name, phone, email, address, **`EST_YEAR`**, `formEndpoint`, sister brand, nav, the 11 trades. **Single source of truth.** |
| `solutions.ts` | The 7 solutions: scope breakdowns, benefit panels, related projects, FAQs, per-page SEO. |
| `projects.ts` | The 7 case studies: story, scope, gallery, meta, related solutions, SEO. |
| `testimonials.ts` | Real testimonials (one attribution each). |
| `sectors.ts`, `areas.ts` | Sector tiles and the 6 area pages. |
| `imageManifest.ts` | **Auto-generated** — do not hand-edit. Run `npm run images`. |

## Common edits

- **Swap the form endpoint:** set `formEndpoint` in `src/data/site.ts` to your Web3Forms/Formspree/
  serverless URL. Until it's set, the enquiry form validates fully then shows a "call us" fallback
  instead of posting to a dead URL. The form POSTs JSON `{name, company, email, phone, premises,
  needs, timescale, description, preferredContact, consent, source}`.
- **Change the accent colour:** edit the `brass` tokens in `tailwind.config.ts` (`brass.DEFAULT`,
  `brass.light`, `brass.text`) — the whole site re-skins from there. `--color-accent-on-dark`
  equivalents live in the same file.
- **Confirmed date:** everything derives from `EST_YEAR` in `site.ts` (currently 2002 — see TODO below).
- **Add a project / solution / area:** add an entry to the relevant data file, then also add its slug
  to `scripts/routes.mjs` (so it's prerendered + in the sitemap) and, for projects, to `_redirects` if
  an old URL should point at it.

## Images

Real project photography lives in `image-masters/` (sourced from the client's existing site).
`npm run images` generates AVIF/WebP/JPEG variants at 4 widths into `public/img/` plus a blur-up
manifest. Components use `<OptimizedImage src="<master-filename-without-ext>" alt="…" />` — never a
raw `<img>`. Zero-CLS (intrinsic dimensions reserved) with warm blur placeholders.

> **TODO(client):** confirm licensing/ownership of the sector-tile imagery
> (`*-sector.jpg`) and replace any generic shots with owned project photography where preferred.

## Rendering & SEO

`npm run build` runs `scripts/prerender.mjs`: it serves the built SPA, visits every route in
`scripts/routes.mjs` with headless Chromium, and writes fully-rendered static HTML (including the
`<head>` tags set by react-helmet-async) to `dist/<route>/index.html`. So every route serves real
HTML with a unique title, meta description, canonical, Open Graph image and JSON-LD (LocalBusiness
sitewide + BreadcrumbList/Service on detail pages). It also emits `dist/sitemap.xml`.

Redirects for every legacy Duda URL are in `public/_redirects` (Netlify format — translate for other
hosts). See `docs/BUILD-CONTRACT.md` for the component/design system and `docs/redirects-reference.md`
for the original URL map.

## TODO(client) — confirm before launch
`npm run check` prints the full list scraped from the code. Key items:
- **Est. year:** 2000 (old About page) vs 2002 (brand line) — set `EST_YEAR`.
- **Form endpoint**, opening hours, company registration & VAT numbers, social profiles.
- **Testimonial attribution:** the "natural light / glass partitions" quote is credited to both
  Mr B Jones and AURA on the old site — confirm the true author (we use Mr B Jones).
- **Accreditations & team photos** for the About page (only add verified badges).
- **Legal review** of the privacy/terms/cookies pages (standard templates, not bespoke advice).
