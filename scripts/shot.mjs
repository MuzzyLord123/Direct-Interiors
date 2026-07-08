// Quick visual capture. Usage: node scripts/shot.mjs <baseUrl> <prefix> <pathsCsv> <widthsCsv>
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = (process.argv[2] || "http://localhost:5173").replace(/\/$/, "");
const prefix = process.argv[3] || "shot";
const paths = (process.argv[4] || "/").split(",");
const widths = (process.argv[5] || "1440,390").split(",").map(Number);

mkdirSync("screenshots", { recursive: true });
const browser = await chromium.launch();
for (const width of widths) {
  const ctx = await browser.newContext({ viewport: { width, height: width < 600 ? 844 : 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  for (const p of paths) {
    const name = p === "/" ? "home" : p.replace(/^\//, "").replace(/\//g, "-");
    try {
      await page.goto(base + p, { waitUntil: "networkidle", timeout: 45000 });
      await page.evaluate(async () => {
        const step = window.innerHeight;
        for (let y = 0; y < document.body.scrollHeight; y += step) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 130)); }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(500);
      await page.screenshot({ path: `screenshots/${prefix}-${name}-${width}.png`, fullPage: true });
      console.log("saved", `screenshots/${prefix}-${name}-${width}.png`);
    } catch (e) {
      console.error("FAIL", p, width, String(e).split("\n")[0]);
    }
  }
  await ctx.close();
}
await browser.close();
