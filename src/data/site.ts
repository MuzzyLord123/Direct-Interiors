import type { Trade } from "./types";

/**
 * SINGLE SOURCE OF TRUTH for company facts. Only verified facts live here.
 * Never invent review counts, ratings, project totals, insurance figures or
 * accreditation badges. Where the design wants a stat we don't have, use a
 * verified alternative or a clearly-marked TODO(client) placeholder.
 */

// TODO(client): the About page historically said "established in 2000" while
// the brand line says "Est. 2002". Confirm the true year — everything derives
// from this one constant.
export const EST_YEAR = 2002;

export const site = {
  name: "Direct Interiors",
  legalName: "Direct Interiors North West Ltd",
  tagline: "Replace. Renovate. Create.",
  subTagline:
    "Commercial interior fit-outs, refurbishments & bespoke installations. Every trade in-house.",
  estYear: EST_YEAR,
  url: "https://www.directinteriorsnw.com",

  phoneDisplay: "01244 810 222",
  phoneHref: "tel:+441244810222",
  email: "info@directinteriorsnw.com",

  address: {
    line1: "96 Welsh Road",
    line2: "Garden City",
    town: "Deeside",
    county: "Flintshire",
    postcode: "CH5 2HX",
  },
  addressOneLine: "96 Welsh Road, Garden City, Deeside, Flintshire CH5 2HX",
  // approx coords for the Garden City / Deeside address (used for the map embed only)
  mapQuery: "96 Welsh Road, Garden City, Deeside, Flintshire CH5 2HX",

  serviceArea: "Chester, Deeside, Wrexham, North Wales & the North West",

  // TODO(client): confirm opening hours before launch.
  openingHours: "",
  // TODO(client): add company registration & VAT numbers.
  companyReg: "",
  vat: "",
  // TODO(client): add social profile URLs when available.
  socials: [] as { label: string; href: string }[],

  sister: {
    name: "Ceilings Direct",
    url: "https://www.ceilings-direct.com",
    blurb: "Our sister company supplies trade ceiling & partitioning materials.",
  },

  // On-site shop (products sourced from the Ceilings Direct catalogue).
  shop: {
    currency: "gbp",
    // TODO(client): confirm VAT treatment. Prices are stored exactly as shown on
    // ceilings-direct.com. If those are VAT-INCLUSIVE (default), Stripe charges
    // them as-is and reports the 20% VAT component. If they are EX-VAT, set this
    // to false and the checkout function adds 20% VAT on top.
    pricesIncludeVat: true,
    vatRate: 0.2,
    // TODO(client): confirm real delivery pricing. Collection is free; UK
    // delivery is a flat placeholder until confirmed.
    delivery: {
      collection: true,
      ukDeliveryPence: 1500,
      freeDeliveryThresholdPence: 25000,
    },
    checkoutEndpoint: "/api/checkout",
  },

  // TODO(client): replace with the live form handler (Web3Forms / Formspree /
  // serverless endpoint). Until set, the form validates and shows a graceful
  // "call us" fallback rather than posting to a dead URL.
  formEndpoint: "",
} as const;

export const sectorsServed = [
  "Commercial",
  "Public Sector",
  "Education",
  "Leisure",
  "Hospitality",
  "Healthcare",
  "Retail",
  "Residential",
] as const;

// Every trade delivered in-house — verified from the current site.
export const trades: Trade[] = [
  { name: "Joinery", blurb: "First and second fix, doors, frames, architraves and bespoke joinery." },
  { name: "Electrical", blurb: "Lighting, power, containment and testing to current regulations." },
  { name: "Plumbing", blurb: "Sanitaryware, supply and waste for washrooms and kitchens." },
  { name: "Lighting", blurb: "LED panels, feature and suspended lighting designed for the space." },
  { name: "Tape & Jointing", blurb: "Plastering and tape-and-joint finishes ready for decoration." },
  { name: "Insulation", blurb: "Thermal and acoustic insulation within walls, ceilings and voids." },
  { name: "Fire Protection", blurb: "Fire-rated systems and compartmentation to meet building regs." },
  { name: "Commercial Kitchens", blurb: "Fit-out of back-of-house and food-preparation environments." },
  { name: "Flooring", blurb: "Anti-slip vinyl, self-levelling and commercial floor finishes." },
  { name: "Maintenance", blurb: "Reactive and planned upkeep for premises we've worked in." },
  { name: "Dilapidations", blurb: "Reinstatement works to satisfy lease and end-of-tenancy terms." },
];

export interface NavItem {
  label: string;
  href: string;
  descriptor?: string;
}

export const navSolutions: NavItem[] = [
  { label: "Interior Fit-Outs", href: "/interior-fit-outs-and-refurbishments", descriptor: "Turnkey commercial fit-outs" },
  { label: "Suspended Ceilings", href: "/suspended-ceilings", descriptor: "Acoustic, metal & feature ceilings" },
  { label: "Partition Walls & Drylining", href: "/partition-walls-drylining", descriptor: "Stud partitions & drylining" },
  { label: "Glass Partitions", href: "/glass-partitions", descriptor: "Framed, frameless & acoustic glass" },
  { label: "Hygienic Wall Cladding", href: "/hygienic-wall-cladding", descriptor: "Food-safe washable cladding" },
  { label: "Washroom Refurbishments", href: "/washroom-refurbishments", descriptor: "DDA-compliant washrooms" },
  { label: "Bespoke Designs", href: "/bespoke-designs", descriptor: "Feature installations & joinery" },
  { label: "All Trades In-House", href: "/all-trades", descriptor: "The eleven trades under one roof" },
];

export const navPrimary: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions" },
  { label: "Projects", href: "/projects" },
  { label: "Why Direct", href: "/why-direct" },
  { label: "Process", href: "/process" },
  { label: "Areas", href: "/areas" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
];
