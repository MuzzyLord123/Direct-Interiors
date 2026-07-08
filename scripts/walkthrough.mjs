// Interaction + keyboard walkthrough against the built site.
// Usage: node scripts/walkthrough.mjs [baseUrl]
import { chromium } from "playwright";

const base = (process.argv[2] || "http://localhost:4181").replace(/\/$/, "");
const browser = await chromium.launch();
let fails = 0;
const check = (name, cond) => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}`);
  if (!cond) fails++;
};

// ---------- Desktop journey ----------
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(base + "/", { waitUntil: "networkidle" });

  await page.keyboard.press("Tab");
  check("skip link focused first", await page.evaluate(() => document.activeElement?.textContent?.includes("Skip to content")));

  // Solutions dropdown on hover
  await page.hover('nav[aria-label="Primary"] a[href="/solutions"]');
  await page.waitForTimeout(250);
  check("solutions dropdown reveals links", await page.isVisible('a[href="/glass-partitions"]'));

  // Navigate to a solution page
  await page.goto(base + "/glass-partitions", { waitUntil: "networkidle" });
  check("solution page: one h1", (await page.locator("h1").count()) === 1);
  check("solution page: related projects present", await page.isVisible('a[href^="/projects/"]'));

  // FAQ accordion toggles
  const faqBtn = page.locator("button[aria-expanded]").filter({ hasText: "?" }).first();
  if (await faqBtn.count()) {
    const before = await faqBtn.getAttribute("aria-expanded");
    await faqBtn.click();
    const after = await faqBtn.getAttribute("aria-expanded");
    check("FAQ accordion toggles aria-expanded", before === "false" && after === "true");
  } else check("FAQ accordion present", false);

  // Related project -> project page
  await page.click('a[href^="/projects/"]');
  await page.waitForLoadState("networkidle");
  check("navigated to a project detail", /\/projects\/[a-z]/.test(page.url()));

  // Case-study consultation CTA does NOT go to /our-work (old bug), goes to /contact
  const cta = page.locator('a:has-text("Discuss a Similar Project")').first();
  check("case-study CTA targets /contact", (await cta.getAttribute("href"))?.startsWith("/contact"));

  // Gallery lightbox: open, arrow, escape
  const thumb = page.locator("button[aria-label^='View image']").first();
  await thumb.click();
  check("lightbox opens (dialog)", await page.isVisible('[role="dialog"][aria-modal="true"]'));
  const img1 = await page.getAttribute(".lightbox__img, [role='dialog'] img", "src").catch(() => null);
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(150);
  const img2 = await page.getAttribute("[role='dialog'] img", "src").catch(() => null);
  check("lightbox arrow changes image", !!img1 && !!img2 && img1 !== img2);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(600);
  check("lightbox closes on Escape", !(await page.isVisible('[role="dialog"][aria-modal="true"]')));

  // Contact multi-step form
  await page.goto(base + "/contact?enquiry=quote", { waitUntil: "networkidle" });
  check("contact: step 1 visible", await page.isVisible('button:has-text("Continue")'));
  await page.click('button:has-text("Continue")'); // no premises selected -> error
  await page.waitForTimeout(100);
  check("form blocks advance without required field", await page.isVisible("#premises-error"));
  await page.click('button[role="radio"]:has-text("Office")');
  await page.click('button:has-text("Continue")');
  await page.waitForTimeout(700);
  // step 2 pre-selected a need via ?enquiry=quote
  check("form advanced to step 2", (await page.locator("legend").allTextContents()).some((t) => t.includes("What do you need")));

  // Projects filters
  await page.goto(base + "/projects", { waitUntil: "networkidle" });
  await page.locator("button").filter({ hasText: /^Glass$/ }).first().click();
  await page.waitForTimeout(600);
  const visible = await page.evaluate(() =>
    Array.from(document.querySelectorAll('a[href^="/projects/"]')).filter((a) => a.offsetParent !== null).length,
  );
  check("glass filter narrows project grid", visible > 0 && visible < 7);

  await page.close();
}

// ---------- Mobile ----------
{
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  check("mobile: menu toggle visible", await page.isVisible('button[aria-controls="mobile-menu"]'));
  await page.click('button[aria-controls="mobile-menu"]');
  await page.waitForTimeout(200);
  check("mobile: menu open aria-expanded", (await page.getAttribute('button[aria-controls="mobile-menu"]', "aria-expanded")) === "true");
  check("mobile: menu links visible", await page.isVisible('#mobile-menu a[href="/about-us"], #mobile-menu a[href="/why-direct"]'));
  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);
  check("mobile: Escape closes + focus returns to toggle", await page.evaluate(() => document.activeElement?.getAttribute("aria-controls") === "mobile-menu"));
  const hs375 = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  check("mobile 375: no horizontal scroll", !hs375);
  await page.setViewportSize({ width: 320, height: 720 });
  await page.reload({ waitUntil: "networkidle" });
  const hs320 = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  check("mobile 320: no horizontal scroll", !hs320);
  await page.close();
}

await browser.close();
console.log(fails ? `\nwalkthrough: ${fails} FAILED` : "\nwalkthrough: all PASS");
process.exit(fails ? 1 : 0);
