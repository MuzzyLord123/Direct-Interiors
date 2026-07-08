// Static prerender: serve the built SPA, visit every route with a headless
// browser, and write the fully-rendered HTML (including the head tags set by
// react-helmet-async) back to dist/<route>/index.html. Also emits sitemap.xml.
import { createServer } from "node:http";
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import sirv from "sirv";
import { chromium } from "playwright";
import { indexableRoutes, extraRoutes } from "./routes.mjs";

const DIST = "dist";
const PORT = 4179;
const ORIGIN = "https://www.directinteriorsnw.com";

if (!existsSync(join(DIST, "index.html"))) {
  console.error("prerender: dist/index.html missing — run `vite build` first.");
  process.exit(1);
}

// Capture the PRISTINE shell before we start writing rendered files, and serve
// it as the SPA fallback — so every route boots from a clean shell rather than
// a previously-rendered (mutated) index.html.
const shell = readFileSync(join(DIST, "index.html"), "utf8");
const assets = sirv(DIST, { single: false, dev: false, etag: true });
const server = createServer((req, res) =>
  assets(req, res, () => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(shell);
  }),
);
await new Promise((r) => server.listen(PORT, r));

// Read the built CSS so we can inline it (removes the render-blocking request → faster FCP/LCP).
const cssLinkMatch = shell.match(/<link[^>]+rel="stylesheet"[^>]+href="(\/assets\/[^"]+\.css)"[^>]*>/i);
let cssInline = "";
if (cssLinkMatch && existsSync(join(DIST, cssLinkMatch[1]))) {
  cssInline = readFileSync(join(DIST, cssLinkMatch[1]), "utf8");
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });

const allRoutes = [...indexableRoutes, ...extraRoutes];
let ok = 0;
for (const route of allRoutes) {
  const url = `http://localhost:${PORT}${route}`;
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  // ensure the client router has rendered the real page (lazy chunk resolved,
  // not just the Suspense fallback) before capture — wait for a real <h1>.
  await page.waitForFunction(() => !!document.querySelector("main h1, #main h1, h1"), { timeout: 20000 });
  // trigger in-view reveals + lazy images across the whole page
  await page.evaluate(async () => {
    await new Promise((res) => setTimeout(res, 100));
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += window.innerHeight) {
      window.scrollTo(0, y);
      await new Promise((res) => setTimeout(res, 90));
    }
    window.scrollTo(0, 0);
    await new Promise((res) => setTimeout(res, 120));
  });
  // rewrite absolute-origin URLs already handled by helmet; capture full doc
  let html = "<!doctype html>\n" + (await page.evaluate(() => document.documentElement.outerHTML));

  // Inline the CSS by default (removes the render-blocking request → faster
  // FCP). Set INLINE_CSS=0 to keep an external cacheable stylesheet instead.
  if (process.env.INLINE_CSS !== "0" && cssInline && cssLinkMatch) {
    html = html.replace(
      /<link[^>]+rel="stylesheet"[^>]+href="\/assets\/[^"]+\.css"[^>]*>/i,
      `<style>${cssInline}</style><link rel="prefetch" href="${cssLinkMatch[1]}" as="style">`,
    );
  }

  const outPath = route === "/"
    ? join(DIST, "index.html")
    : route === "/404"
      ? join(DIST, "404.html")
      : join(DIST, route, "index.html");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
  ok++;
  process.stdout.write(`\r  prerendered ${ok}/${allRoutes.length}`);
}
process.stdout.write("\n");

// sitemap.xml (indexable routes only)
const today = readFileSync(join(DIST, "index.html"), "utf8") ? new Date().toISOString().slice(0, 10) : "";
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
console.log(`  sitemap.xml written (${indexableRoutes.length} urls)`);

await browser.close();
server.close();
console.log("prerender: done.");
