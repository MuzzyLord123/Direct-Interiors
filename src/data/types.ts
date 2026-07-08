// Shared content types. Pages are purely presentational and consume these.

export type IconKey =
  | "fitout"
  | "ceiling"
  | "partition"
  | "glass"
  | "cladding"
  | "washroom"
  | "bespoke"
  | "trades";

export interface Seo {
  title: string;
  description: string;
}

export interface ScopeItem {
  title: string;
  body: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface BenefitPanel {
  eyebrow: string;
  title: string;
  body: string;
}

export interface Solution {
  slug: string; // route path segment (original live-site slug, SEO-preserved)
  icon: IconKey;
  name: string; // nav / card name
  navDescriptor: string; // one-liner in the dropdown
  heroTitle: string; // editorial hero headline
  heroImage: string; // manifest key
  intro: string[]; // lead paragraphs
  scope: ScopeItem[]; // "what's included" editorial breakdown
  systems?: string[]; // e.g. British Gypsum / Siniat / Knauf
  benefit?: BenefitPanel; // one highlighted differentiator panel
  relatedProjects: string[]; // project slugs
  testimonial?: string; // testimonial id
  faqs: Faq[];
  seo: Seo;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  jobType: string;
}

export interface Sector {
  name: string;
  image: string; // manifest key
  blurb: string;
}

export interface Project {
  slug: string;
  title: string;
  town: string;
  sector: string;
  service: string[]; // filter tags: Fit-Outs, Ceilings, Partitions, Glass, Cladding, Washrooms, Bespoke
  hero: string; // manifest key
  thumb: string; // manifest key
  cardBlurb: string; // one line for grid overlay
  duration?: string;
  scopeTitle: string; // e.g. "We installed:"
  scope: string[];
  story: string[]; // challenge → solution narrative (verified facts only)
  testimonial?: string; // testimonial id
  gallery: string[]; // manifest keys
  relatedSolutions: string[]; // solution slugs
  featured?: boolean;
  seo: Seo;
}

export interface Area {
  slug: string;
  name: string;
  tier: "core" | "extended";
  intro: string[];
  relatedProjects: string[];
  seo: Seo;
}

export interface Trade {
  name: string;
  blurb: string;
}
