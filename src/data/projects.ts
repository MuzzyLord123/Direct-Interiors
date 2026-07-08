import type { Project } from "./types";

/**
 * The seven real projects. Stories are written from verified facts only
 * (ported and grammar-corrected from the live site). No invented metrics.
 * Slugs preserve the original live-site URLs for SEO continuity.
 */
const list: Project[] = [
  {
    slug: "demon-tweeks-wrexham",
    title: "Demon Tweeks",
    town: "Wrexham",
    sector: "Commercial",
    service: ["Fit-Outs", "Partitions", "Glass"],
    hero: "demon-tweeks-hero",
    thumb: "demon-tweeks-thumb",
    cardBlurb: "A full interior fit-out for the motorsport retailer.",
    scopeTitle: "We delivered:",
    scope: [
      "Metal stud partitioning & drylining",
      "Suspended and feature ceilings",
      "Glass partitioning to meeting rooms",
      "Full electrical & lighting",
      "Joinery, doors & frames",
      "Flooring throughout",
    ],
    story: [
      "Demon Tweeks, the well-known motorsport and performance retailer, appointed Direct Interiors to fit out their commercial premises in Wrexham.",
      "Working across offices and customer-facing space, our in-house teams delivered partitioning, ceilings, glazing, electrical and joinery as a single coordinated package — one programme, one point of contact.",
      "The result is a sharp, modern interior that reflects the brand and gives the team a workplace to be proud of.",
    ],
    gallery: ["demon-tweeks-gallery01", "demon-tweeks-gallery02", "demon-tweeks-gallery03", "demon-tweeks-gallery04"],
    relatedSolutions: ["interior-fit-outs-and-refurbishments", "glass-partitions"],
    featured: false,
    seo: {
      title: "Demon Tweeks, Wrexham — Commercial Fit-Out | Direct Interiors",
      description:
        "How Direct Interiors delivered a full interior fit-out for motorsport retailer Demon Tweeks in Wrexham — partitions, ceilings, glazing and joinery, all in-house.",
    },
  },
  {
    slug: "doc-fictoria-welsh-government",
    title: "Doc Fictoria",
    town: "Caernarfon",
    sector: "Public Sector",
    service: ["Fit-Outs", "Partitions", "Glass"],
    hero: "doc-fictoria-hero-4946c7c6",
    thumb: "doc-fictoria-thumb",
    cardBlurb: "An office fit-out for the Welsh Government.",
    scopeTitle: "We delivered:",
    scope: [
      "Office fit-out across multiple floors",
      "Metal stud partitions & drylining",
      "Glass partitioning to meeting spaces",
      "Suspended ceilings & lighting",
      "Decoration & finishing",
    ],
    story: [
      "Direct Interiors was appointed to fit out office space at Doc Fictoria, Caernarfon, for the Welsh Government.",
      "The brief called for a professional, functional working environment delivered to public-sector standards. Our teams handled partitioning, glazing, ceilings, lighting and finishing throughout.",
      "Delivering for a client of this standing is a point of real pride for the team.",
    ],
    gallery: ["doc-fictoria-gallery01", "doc-fictoria-gallery02", "doc-fictoria-gallery03", "doc-fictoria-gallery04"],
    relatedSolutions: ["interior-fit-outs-and-refurbishments", "partition-walls-drylining"],
    featured: false,
    seo: {
      title: "Doc Fictoria, Caernarfon — Welsh Government Fit-Out | Direct Interiors",
      description:
        "Direct Interiors fitted out office space for the Welsh Government at Doc Fictoria, Caernarfon — partitions, glazing, ceilings and lighting delivered in-house.",
    },
  },
  {
    slug: "padeswood-buckley-golf-club",
    title: "Padeswood & Buckley Golf Club",
    town: "Flintshire",
    sector: "Leisure",
    service: ["Washrooms", "Cladding"],
    hero: "padeswood-golf-club-hero-3d2efa71",
    thumb: "padeswood-buckley-golf-club-thumb",
    cardBlurb: "A full washroom & changing-room refurbishment in four weeks.",
    duration: "4 weeks",
    scopeTitle: "We delivered:",
    scope: [
      "Full washroom & changing-room strip-out",
      "PVC hygienic wall cladding",
      "New sanitaryware & cubicle systems",
      "Anti-slip vinyl flooring",
      "Plumbing & electrical",
      "Decoration & finishing",
    ],
    story: [
      "Padeswood & Buckley Golf Club needed its washrooms and changing rooms brought thoroughly up to date for members and visitors.",
      "Direct Interiors carried out a complete refurbishment — strip-out, hygienic cladding, new sanitaryware, cubicles and anti-slip flooring — with our own plumbers, electricians and joiners on site.",
      "The whole programme was completed in four weeks, and the members were delighted with the transformation.",
    ],
    testimonial: "padeswood",
    gallery: ["padeswood-golf-club-gallery01", "padeswood-golf-club-gallery02", "padeswood-golf-club-gallery03", "padeswood-golf-club-gallery04"],
    relatedSolutions: ["washroom-refurbishments", "hygienic-wall-cladding"],
    featured: true,
    seo: {
      title: "Padeswood & Buckley Golf Club — Washroom Refurbishment | Direct Interiors",
      description:
        "A full washroom and changing-room refurbishment at Padeswood & Buckley Golf Club, delivered in four weeks — hygienic cladding, new sanitaryware and anti-slip flooring.",
    },
  },
  {
    slug: "butchers-dyserth",
    title: "The Butchers",
    town: "Dyserth",
    sector: "Retail",
    service: ["Ceilings", "Cladding"],
    hero: "butchers-hero",
    thumb: "dyserth-butchers-thumb",
    cardBlurb: "A hygiene refit that kept the shop trading throughout.",
    scopeTitle: "We delivered:",
    scope: [
      "New suspended ceiling",
      "Food-safe hygienic wall cladding",
      "LED lighting",
      "Anti-slip flooring",
      "Works phased around trading hours",
    ],
    story: [
      "A busy butcher's shop in Dyserth needed a hygienic upgrade — but couldn't afford to close.",
      "Direct Interiors installed a new suspended ceiling, food-safe hygienic wall cladding, lighting and flooring, phasing the works so the shop stayed open for trade throughout.",
      "After the works, the premises was awarded a 5-out-of-5 food hygiene rating — proof that the right materials, properly installed, make a measurable difference.",
    ],
    gallery: ["butchers-gallery01", "butchers-gallery02", "butchers-gallery03", "butchers-gallery04"],
    relatedSolutions: ["hygienic-wall-cladding", "suspended-ceilings"],
    featured: true,
    seo: {
      title: "The Butchers, Dyserth — Hygienic Refit | Direct Interiors",
      description:
        "A butcher's shop in Dyserth got a new suspended ceiling and hygienic wall cladding without closing — and earned a 5-out-of-5 food hygiene rating afterwards.",
    },
  },
  {
    slug: "matthew-arnold-primary-school-liverpool",
    title: "Matthew Arnold Primary School",
    town: "Liverpool",
    sector: "Education",
    service: ["Glass"],
    hero: "matthew-primary-hero",
    thumb: "matthew-arnold-primary-thumb",
    cardBlurb: "A frameless glass partition that floods reception with light.",
    scopeTitle: "We delivered:",
    scope: [
      "Frameless glass partition to reception",
      "Glazed door set",
      "Manifestation to meet safety guidance",
      "Making good & finishing",
    ],
    story: [
      "Matthew Arnold Primary School in Liverpool needed to separate its reception from the school beyond — without turning a bright, welcoming entrance into a dark corridor.",
      "Direct Interiors installed a frameless glass partition and glazed door, keeping the sightlines open and letting natural light flow right through the space.",
      "The reception team told us it does exactly what they hoped — a clear separation that still feels open and full of light.",
    ],
    testimonial: "matthew-arnold",
    gallery: ["matthew-primary-gallery01", "matthew-primary-gallery02", "matthew-primary-gallery03", "matthew-primary-gallery04"],
    relatedSolutions: ["glass-partitions"],
    featured: true,
    seo: {
      title: "Matthew Arnold Primary School, Liverpool — Glass Partition | Direct Interiors",
      description:
        "A frameless glass partition separating reception from the school beyond at Matthew Arnold Primary, Liverpool — keeping the space open and full of natural light.",
    },
  },
  {
    slug: "bell-meadow-business-park-chester",
    title: "Bell Meadow Business Park",
    town: "Chester",
    sector: "Commercial",
    service: ["Fit-Outs", "Bespoke", "Ceilings"],
    hero: "bell-meadow-hero-0a75fafa",
    thumb: "bell-meadow-thumb",
    cardBlurb: "An office fit-out with a striking black feature ceiling.",
    scopeTitle: "We delivered:",
    scope: [
      "Office fit-out",
      "Black feature ceiling",
      "Suspended ceilings & lighting",
      "Partitioning & drylining",
      "Decoration & finishing",
    ],
    story: [
      "At Bell Meadow Business Park in Chester, the brief was for an office space with genuine character.",
      "Direct Interiors delivered a full fit-out anchored by a striking black feature ceiling — a bold, contemporary look balanced with practical lighting and partitioning.",
      "It's a great example of how a considered ceiling can define the whole feel of a workspace.",
    ],
    gallery: ["bell-meadow-gallery01", "bell-meadow-gallery02", "bell-meadow-gallery03", "bell-meadow-gallery04"],
    relatedSolutions: ["interior-fit-outs-and-refurbishments", "bespoke-designs"],
    featured: false,
    seo: {
      title: "Bell Meadow Business Park, Chester — Office Fit-Out | Direct Interiors",
      description:
        "An office fit-out at Bell Meadow Business Park, Chester, featuring a striking black feature ceiling, suspended ceilings, lighting and partitioning.",
    },
  },
  {
    slug: "westrock-wrexham",
    title: "Westrock",
    town: "Wrexham",
    sector: "Commercial",
    service: ["Fit-Outs", "Partitions", "Glass"],
    hero: "westrock-wrexham-hero",
    thumb: "westrock-thumb",
    cardBlurb: "An office refurbishment with glass partitioning.",
    scopeTitle: "We delivered:",
    scope: [
      "Office refurbishment",
      "Glass partitioning",
      "Metal stud partitions & drylining",
      "Ceilings & lighting",
      "Decoration & finishing",
    ],
    story: [
      "Westrock in Wrexham needed its offices refreshed and reconfigured to work harder for the team.",
      "Direct Interiors delivered a full refurbishment including glass partitioning, drylining, ceilings and decoration — bringing light and structure to the space.",
      "Another Wrexham workplace transformed by a single in-house team.",
    ],
    gallery: ["westrock-wrexham-gallery01", "westrock-wrexham-gallery02", "westrock-wrexham-gallery03", "westrock-wrexham-gallery04"],
    relatedSolutions: ["interior-fit-outs-and-refurbishments", "glass-partitions"],
    featured: false,
    seo: {
      title: "Westrock, Wrexham — Office Refurbishment | Direct Interiors",
      description:
        "An office refurbishment at Westrock, Wrexham — glass partitioning, drylining, ceilings and decoration delivered by Direct Interiors' in-house team.",
    },
  },
];

export const projects = list;
export const featuredProjects = list.filter((p) => p.featured);
export const getProject = (slug: string): Project | undefined => list.find((p) => p.slug === slug);
export const projectServiceTags = ["Fit-Outs", "Ceilings", "Partitions", "Glass", "Cladding", "Washrooms", "Bespoke"] as const;
export const projectSectors = ["Commercial", "Public Sector", "Education", "Leisure", "Retail"] as const;
