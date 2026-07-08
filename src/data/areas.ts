import type { Area } from "./types";

/**
 * Service areas. Copy is localised but honest — no invented "X projects this
 * year" counters and no fake local teams. Project links only where a real
 * project exists in that area.
 */
const list: Area[] = [
  {
    slug: "chester",
    name: "Chester",
    tier: "core",
    intro: [
      "Chester is right on our doorstep, and it's where a good deal of our work happens — from business-park offices to city-centre premises.",
      "We've fitted out offices at Bell Meadow Business Park and worked across the commercial and retail sectors throughout the city. Our base in Garden City, Deeside is minutes away, so surveys and call-backs are genuinely local.",
    ],
    relatedProjects: ["bell-meadow-business-park-chester"],
    seo: {
      title: "Commercial Fit-Outs in Chester | Direct Interiors",
      description:
        "Local commercial fit-out, ceiling, partition and washroom specialists serving Chester. Based minutes away in Deeside. Free survey and written quotation.",
    },
  },
  {
    slug: "deeside",
    name: "Deeside",
    tier: "core",
    intro: [
      "Deeside is home — our offices are at 96 Welsh Road, Garden City. It doesn't get more local than this.",
      "From here we cover Flintshire and the Deeside Industrial Park, delivering fit-outs, ceilings, partitions and washrooms for commercial and industrial premises across the area.",
    ],
    relatedProjects: [],
    seo: {
      title: "Commercial Fit-Outs in Deeside & Flintshire | Direct Interiors",
      description:
        "Deeside-based commercial interior specialists covering Flintshire — fit-outs, ceilings, partitions, cladding and washrooms. Every trade in-house. Free quote.",
    },
  },
  {
    slug: "wrexham",
    name: "Wrexham",
    tier: "core",
    intro: [
      "Wrexham has seen some of our largest and most varied work — proof that we travel well across North East Wales.",
      "We fitted out the commercial premises for motorsport retailer Demon Tweeks and refurbished offices with glass partitioning at Westrock, both in Wrexham.",
    ],
    relatedProjects: ["demon-tweeks-wrexham", "westrock-wrexham"],
    seo: {
      title: "Commercial Fit-Outs in Wrexham | Direct Interiors",
      description:
        "Commercial fit-outs, refurbishments, glass partitions and ceilings across Wrexham. Trusted by Demon Tweeks and Westrock. Free survey and written quotation.",
    },
  },
  {
    slug: "north-wales",
    name: "North Wales",
    tier: "core",
    intro: [
      "From the coast to the countryside, we cover North Wales for commercial and public-sector interiors.",
      "Our work here includes an office fit-out for the Welsh Government at Doc Fictoria in Caernarfon, a hygiene refit for a butcher's in Dyserth, and a washroom refurbishment at Padeswood & Buckley Golf Club.",
    ],
    relatedProjects: ["doc-fictoria-welsh-government", "butchers-dyserth", "padeswood-buckley-golf-club"],
    seo: {
      title: "Commercial Fit-Outs across North Wales | Direct Interiors",
      description:
        "Commercial and public-sector interior fit-outs across North Wales — trusted by the Welsh Government. Ceilings, partitions, cladding and washrooms. Free quote.",
    },
  },
  {
    slug: "liverpool",
    name: "Liverpool",
    tier: "extended",
    intro: [
      "Liverpool sits within our extended coverage across the North West, and we've delivered there in the education sector.",
      "At Matthew Arnold Primary School we installed a frameless glass partition to separate reception from the school beyond, keeping the entrance bright and open.",
    ],
    relatedProjects: ["matthew-arnold-primary-school-liverpool"],
    seo: {
      title: "Commercial Fit-Outs in Liverpool | Direct Interiors",
      description:
        "Commercial and education interior fit-outs, glass partitions and ceilings across Liverpool and the North West. Free survey and written quotation.",
    },
  },
  {
    slug: "manchester",
    name: "Manchester",
    tier: "extended",
    intro: [
      "Manchester and the wider North West fall within our extended coverage for larger commercial projects.",
      "If you're planning a fit-out, refurbishment or ceiling and partition package in the Manchester area, get in touch — we're happy to travel for the right project and will tell you honestly if it's the right fit.",
    ],
    relatedProjects: [],
    seo: {
      title: "Commercial Fit-Outs in Manchester & the North West | Direct Interiors",
      description:
        "Commercial interior fit-outs, ceilings and partitions across Manchester and the North West. Every trade in-house. Free survey and written quotation.",
    },
  },
];

export const areas = list;
export const getArea = (slug: string): Area | undefined => list.find((a) => a.slug === slug);
export const coreAreas = list.filter((a) => a.tier === "core");
export const extendedAreas = list.filter((a) => a.tier === "extended");
