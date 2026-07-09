// Browser-free static site generation. Imports the SSR bundle, renders each
// route to HTML with react-dom/server, injects it (plus Helmet's head tags and
// inlined CSS) into the client template, and writes dist/<route>/index.html.
// Runs in plain Node — no headless browser — so it works on Vercel/CI.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { pathToFileURL } from "node:url";
import { indexableRoutes, extraRoutes } from "./routes.mjs";

const DIST = "dist";
const ORIGIN = "https://www.directinteriorsnw.com";
const INLINE_CSS = process.env.INLINE_CSS !== "0";

const templatePath = join(DIST, "index.html");
if (!existsSync(templatePath)) {
  console.error("prerender-ssg: dist/index.html missing — run `vite build` first.");
  process.exit(1);
}
const serverEntry = join("dist-server", "entry-server.js");
if (!existsSync(serverEntry)) {
  console.error("prerender-ssg: dist-server/entry-server.js missing — run the SSR build first.");
  process.exit(1);
}

const { render } = await import(pathToFileURL(serverEntry).href);

let template = readFileSync(templatePath, "utf8");

// Optionally inline the stylesheet (remove the render-blocking <link>).
const cssLink = template.match(/<link[^>]+rel="stylesheet"[^>]+href="(\/assets\/[^"]+\.css)"[^>]*>/i);
if (INLINE_CSS && cssLink && existsSync(join(DIST, cssLink[1]))) {
  const css = readFileSync(join(DIST, cssLink[1]), "utf8");
  template = template.replace(cssLink[0], `<style>${css}</style><link rel="prefetch" href="${cssLink[1]}" as="style">`);
}

// Remove the placeholder <title> so Helmet's title is the only one.
template = template.replace(/<title>[\s\S]*?<\/title>\s*/i, "");

const routes = [...indexableRoutes, ...extraRoutes];
let count = 0;
for (const route of routes) {
  const { html, head, htmlAttrs } = render(route);
  let page = template
    .replace(/<html[^>]*>/i, `<html ${htmlAttrs}>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    .replace("</head>", `    ${head}\n  </head>`);

  const outPath =
    route === "/" ? join(DIST, "index.html")
    : route === "/404" ? join(DIST, "404.html")
    : join(DIST, route, "index.html");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, page);
  count++;
}
process.stdout.write(`prerender-ssg: wrote ${count} pages\n`);

// sitemap.xml (indexable routes only)
const today = new Date().toISOString().slice(0, 10);
const urls = indexableRoutes
  .map((r) => {
    const loc = `${ORIGIN}${r === "/" ? "/" : r}`;
    const priority = r === "/" ? "1.0" : r.split("/").length > 2 ? "0.7" : "0.8";
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
  })
  .join("\n");
writeFileSync(
  join(DIST, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
console.log(`prerender-ssg: sitemap.xml written (${indexableRoutes.length} urls)`);
