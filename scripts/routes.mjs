// Canonical, indexable routes (must match src/data + App.tsx). Redirect-only
// URLs are intentionally excluded. Keep in sync with the data files.
const solutionSlugs = [
  "interior-fit-outs-and-refurbishments",
  "suspended-ceilings",
  "partition-walls-drylining",
  "glass-partitions",
  "hygienic-wall-cladding",
  "washroom-refurbishments",
  "bespoke-designs",
];
const projectSlugs = [
  "demon-tweeks-wrexham",
  "doc-fictoria-welsh-government",
  "padeswood-buckley-golf-club",
  "butchers-dyserth",
  "matthew-arnold-primary-school-liverpool",
  "bell-meadow-business-park-chester",
  "westrock-wrexham",
];
const areaSlugs = ["chester", "deeside", "wrexham", "north-wales", "liverpool", "manchester"];

export const indexableRoutes = [
  "/",
  "/solutions",
  "/all-trades",
  ...solutionSlugs.map((s) => `/${s}`),
  "/projects",
  ...projectSlugs.map((s) => `/projects/${s}`),
  "/why-direct",
  "/process",
  "/areas",
  ...areaSlugs.map((s) => `/areas/${s}`),
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
];

// Rendered but not in the sitemap.
export const extraRoutes = ["/404"];
