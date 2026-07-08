// Capture page screenshots for visual QA and the before/after acceptance
// deliverable (brief §13). Usage:
//   node scripts/screenshot.mjs <baseUrl> <outPrefix> [pathsCsv] [widthsCsv]
// e.g. node scripts/screenshot.mjs http://localhost:8123 after
//      node scripts/screenshot.mjs https://www.directinteriorsnw.com before
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const [base, prefix, pathsCsv, widthsCsv] = process.argv.slice(2);
if (!base || !prefix) {
  console.error("usage: node scripts/screenshot.mjs <baseUrl> <outPrefix> [pathsCsv] [widthsCsv]");
  process.exit(2);
}
const paths = (pathsCsv || "/,/suspended-ceilings,/demon-tweeks-wrexham,/contact-us").split(",");
const widths = (widthsCsv || "375,1440").split(",").map(Number);

mkdirSync("screenshots", { recursive: true });
const browser = await chromium.launch();
for (const width of widths) {
  const context = await browser.newContext({
    viewport: { width, height: width < 600 ? 812 : 900 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  for (const p of paths) {
    const name = p === "/" ? "home" : p.replace(/\//g, "");
    const url = base.replace(/\/$/, "") + p;
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
      // Scroll through the page so loading="lazy" images actually load,
      // then return to the top before capturing.
      await page.evaluate(async () => {
        const step = window.innerHeight;
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 120));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(400);
      const file = `screenshots/${prefix}-${name}-${width}.png`;
      await page.screenshot({ path: file, fullPage: true });
      console.log("saved", file);
    } catch (err) {
      console.error(`FAILED ${url} @${width}: ${err.message.split("\n")[0]}`);
    }
  }
  await context.close();
}
await browser.close();
