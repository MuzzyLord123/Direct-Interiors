// Keyboard + interaction walkthrough (brief §13): nav → solution page →
// project → contact form, plus mobile menu, lightbox, filters and the
// dropdown disclosure. Usage: node scripts/walkthrough.mjs [baseUrl]
import { chromium } from "playwright";

const base = (process.argv[2] || "http://localhost:8123").replace(/\/$/, "");
const browser = await chromium.launch();
let failures = 0;
const check = (name, cond) => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}`);
  if (!cond) failures++;
};

// --- Desktop keyboard journey ---
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(base + "/", { waitUntil: "networkidle" });

  // Skip link is first tab stop and becomes visible
  await page.keyboard.press("Tab");
  check("skip link receives focus first", await page.evaluate(() => document.activeElement.classList.contains("skip-link")));
  check("skip link visible when focused", await page.evaluate(() => document.activeElement.getBoundingClientRect().left >= 0));

  // Solutions dropdown: disclosure button opens/closes with keyboard
  await page.focus(".site-nav__disclosure");
  await page.keyboard.press("Enter");
  check("dropdown opens on Enter", await page.evaluate(() => document.querySelector(".site-nav__disclosure").getAttribute("aria-expanded") === "true"));
  const dropdownVisible = await page.isVisible(".site-nav__dropdown a");
  check("dropdown links visible", dropdownVisible);
  await page.keyboard.press("Escape");
  check("dropdown closes on Escape", await page.evaluate(() => document.querySelector(".site-nav__disclosure").getAttribute("aria-expanded") === "false"));

  // Navigate: solution page → related project → contact
  await page.goto(base + "/suspended-ceilings", { waitUntil: "networkidle" });
  check("solution page has one h1", (await page.locator("h1").count()) === 1);
  check("solution page shows related projects", await page.isVisible(".related .card__link"));
  await page.click(".related .card__link");
  await page.waitForLoadState("networkidle");
  check("related project link navigates to a case study", /butchers|demon/.test(page.url()));

  // Lightbox: open, arrow, escape — all keyboard operable
  await page.click(".gallery__link");
  check("lightbox opens", await page.isVisible(".lightbox[open]"));
  const firstSrc = await page.getAttribute(".lightbox__img", "src");
  await page.keyboard.press("ArrowRight");
  check("lightbox arrow-key advances image", (await page.getAttribute(".lightbox__img", "src")) !== firstSrc);
  await page.keyboard.press("Escape");
  check("lightbox closes on Escape", !(await page.isVisible(".lightbox[open]")));

  // Wrong-link regression: consultation action must NOT point at /our-work
  const consultHref = await page.getAttribute('a:has-text("Discuss a similar project")', "href");
  check("case-study consultation CTA points to contact page", consultHref === "/contact-us?enquiry=consultation");

  // Contact form: enquiry pre-selection + inline validation + status region.
  // (Trailing slash used here because the Eleventy dev server's directory
  // redirect drops query strings; production hosts serve /contact-us directly
  // and preserve the query.)
  await page.goto(base + "/contact-us/?enquiry=tender", { waitUntil: "networkidle" });
  check("?enquiry=tender pre-selects the tender option", (await page.inputValue("#ef-enquiry")) === "tender");
  await page.click('button[type="submit"]');
  check("invalid submit shows name error", await page.isVisible("#ef-name-error"));
  check("focus moves to first invalid field", await page.evaluate(() => document.activeElement.id === "ef-name"));
  await page.fill("#ef-name", "Test Person");
  await page.fill("#ef-email", "test@example.com");
  await page.fill("#ef-message", "Test message about a fit-out.");
  await page.check("#ef-consent");
  await page.click('button[type="submit"]');
  const statusText = await page.textContent(".enquiry-form__status");
  check("submit announces via status region", statusText.trim().length > 0);

  // Our Work filters
  await page.goto(base + "/our-work", { waitUntil: "networkidle" });
  check("filter chips revealed with JS", await page.isVisible("[data-work-filters]"));
  await page.click('[data-filter="Glass Partitions"]');
  const visibleCards = await page.evaluate(() => Array.from(document.querySelectorAll("[data-work-grid] .card")).filter((c) => !c.hidden).length);
  check("glass partitions filter narrows the grid", visibleCards > 0 && visibleCards < 7);
  await page.close();
}

// --- Mobile menu ---
{
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  check("mobile: menu toggle visible", await page.isVisible(".site-nav__toggle"));
  check("mobile: nav list hidden initially", !(await page.isVisible(".site-nav__list")));
  await page.click(".site-nav__toggle");
  check("mobile: menu opens (aria-expanded)", (await page.getAttribute(".site-nav__toggle", "aria-expanded")) === "true");
  check("mobile: nav links visible", await page.isVisible('.site-nav__list a[href="/about-us"]'));
  check("mobile: quote CTA inside menu", await page.isVisible('.site-nav__item--cta a'));
  await page.keyboard.press("Escape");
  check("mobile: Escape closes menu and returns focus", await page.evaluate(() => document.activeElement.classList.contains("site-nav__toggle")));
  const hasHScroll = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  check("mobile: no horizontal scroll at 375px", !hasHScroll);
  await page.close();
}

// --- 320px narrow check ---
{
  const page = await browser.newPage({ viewport: { width: 320, height: 700 } });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  const hasHScroll = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  check("320px: no horizontal scroll", !hasHScroll);
  await page.close();
}

await browser.close();
if (failures) {
  console.error(`\nwalkthrough: FAILED (${failures})`);
  process.exit(1);
}
console.log("\nwalkthrough: all interactions PASS");
