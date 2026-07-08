import type { Solution } from "./types";

/**
 * The seven solutions. Intros are elevated from the genuine live-site copy.
 * FAQs are written from real industry knowledge (lead times, live-premises
 * working, compliance) — never invented company-specific guarantees.
 * Slugs preserve the original live-site URLs.
 */
const list: Solution[] = [
  {
    slug: "interior-fit-outs-and-refurbishments",
    icon: "fitout",
    name: "Interior Fit-Outs & Refurbishments",
    navDescriptor: "Turnkey commercial fit-outs",
    heroTitle: "The whole space. One contractor.",
    heroImage: "interior-fit-out-hero-new",
    intro: [
      "A commercial fit-out touches every trade — and the moment those trades belong to different companies, the programme starts to slip. We do it differently.",
      "Direct Interiors delivers full commercial fit-outs and refurbishments with our own in-house teams, from first strip-out to final snag. One programme, one point of contact, no subcontractor blame game.",
    ],
    scope: [
      { title: "Full commercial fit-outs", body: "Turnkey delivery of new and reconfigured workplaces — we take a shell or a tired space and hand back a finished interior." },
      { title: "Office refurbishments", body: "Refreshing live offices with minimal disruption, phased around your business so you keep trading." },
      { title: "Space planning", body: "Reworking layouts to get more from the floor plate — meeting rooms, breakout space, agile working." },
      { title: "Every trade in-house", body: "Joinery, electrical, plumbing, ceilings, partitions, flooring and decoration coordinated under one roof." },
      { title: "Single point of contact", body: "One person who knows your project inside out, from quotation through to handover and aftercare." },
    ],
    benefit: {
      eyebrow: "Turnkey delivery",
      title: "Handed over finished, not almost-finished",
      body: "Because we hold every trade in-house, we sequence them ourselves — no waiting on a subbie who's double-booked, no gaps between trades. You get one programme that actually holds, and one team accountable for the finish.",
    },
    relatedProjects: ["demon-tweeks-wrexham", "doc-fictoria-welsh-government", "bell-meadow-business-park-chester"],
    testimonial: "jones",
    faqs: [
      { q: "Can you work while we stay open?", a: "Yes. Most of our commercial work happens in live premises. We phase the programme — and where needed work out of hours — so you keep trading. We kept a butcher's shop open throughout a full hygiene refit." },
      { q: "Do you handle design as well as build?", a: "We work from your drawings or help develop the layout with you. We start by understanding how you use the space, then plan the fit-out around it." },
      { q: "How long does a fit-out take?", a: "It depends on size, specification and access, but because we self-deliver every trade we can compress programmes that would otherwise stall between contractors. We give you a realistic programme with the written quotation." },
      { q: "Who is my point of contact?", a: "One project manager, start to finish. They know your job, sequence the trades and are the single number you call." },
      { q: "Do you cover fire and building-regs compliance?", a: "Yes — fire protection and compartmentation are among the trades we deliver in-house, and our work is installed to meet current building regulations." },
      { q: "Which areas do you cover?", a: "We're based in Deeside and work across Chester, Wrexham, Flintshire, North Wales and the wider North West, with projects delivered as far as Liverpool and Caernarfon." },
    ],
    seo: {
      title: "Commercial Fit-Outs & Refurbishments in Chester & North Wales | Direct Interiors",
      description:
        "Turnkey commercial fit-outs and office refurbishments across Chester, Deeside and North Wales. Every trade in-house, one point of contact. Free survey & written quote.",
    },
  },
  {
    slug: "suspended-ceilings",
    icon: "ceiling",
    name: "Suspended Ceilings",
    navDescriptor: "Acoustic, metal & feature ceilings",
    heroTitle: "Look up. It matters more than you think.",
    heroImage: "suspended-ceilings-hero-new",
    intro: [
      "The ceiling sets the acoustics, the lighting and the entire feel of a room — and it's where Direct Interiors began, two decades ago, as Ceilings Direct.",
      "From clean, practical grid systems to statement feature ceilings, we design and install ceilings that do their job quietly and look considered doing it.",
    ],
    scope: [
      { title: "Acoustic ceilings", body: "Tile and baffle systems that tame reverberation in offices, classrooms and hospitality spaces." },
      { title: "Metal ceilings", body: "Durable metal tile and plank systems for a crisp, contemporary finish." },
      { title: "MF plasterboard ceilings", body: "Seamless suspended plasterboard (MF) ceilings for a flush, painted finish." },
      { title: "Feature rafts & islands", body: "Floating ceiling rafts that zone open-plan space and carry lighting and acoustics." },
      { title: "Arched & barrel ceilings", body: "Curved and barrel-vaulted ceilings for reception features and statement spaces." },
    ],
    benefit: {
      eyebrow: "Two decades of ceilings",
      title: "We literally started here",
      body: "Direct Interiors traded as Ceilings Direct for years before broadening into full fit-outs. Ceilings aren't a bolt-on service for us — they're our origin, and it shows in the detailing.",
    },
    relatedProjects: ["butchers-dyserth", "bell-meadow-business-park-chester", "demon-tweeks-wrexham"],
    testimonial: "jones",
    faqs: [
      { q: "What ceiling systems do you install?", a: "Acoustic tile and baffle systems, metal tile and plank, MF plasterboard, feature rafts, and curved or barrel ceilings — specified to suit the acoustics, lighting and look you need." },
      { q: "Can you improve the acoustics of a noisy office?", a: "Yes. Acoustic tiles, baffles and rafts all absorb sound. We'll specify a system with the right absorption for how the room is used." },
      { q: "Can you integrate our lighting?", a: "Absolutely — we install ceilings and lighting together as in-house trades, so LED panels, downlights and feature lighting are coordinated from the start." },
      { q: "Do you supply materials as well?", a: "Our sister company, Ceilings Direct, supplies trade ceiling and partitioning materials if you only need the products." },
      { q: "Can a ceiling be installed in an occupied space?", a: "Yes — we regularly replace ceilings in live premises, phasing and protecting the area so you can carry on around us." },
      { q: "Are your ceilings suitable for kitchens and clinical areas?", a: "Yes — we install hygienic and clean-room ceiling systems designed for food-preparation, healthcare and other wipe-clean environments." },
    ],
    seo: {
      title: "Suspended Ceilings in Chester & North Wales | Direct Interiors",
      description:
        "Acoustic, metal, MF plasterboard and feature suspended ceilings installed across Chester, Deeside and North Wales. Two decades of ceiling expertise. Free quote.",
    },
  },
  {
    slug: "partition-walls-drylining",
    icon: "partition",
    name: "Partition Walls & Drylining",
    navDescriptor: "Stud partitions & drylining",
    heroTitle: "New rooms, without new walls.",
    heroImage: "partitions-drylining-hero-new",
    intro: [
      "Business needs change. Partitioning lets your space change with them — dividing, zoning and reconfiguring without the cost and upheaval of structural work.",
      "Direct Interiors installs metal stud partitions and drylining to the standards of the leading system manufacturers, tuned for fire, acoustic and impact performance.",
    ],
    scope: [
      { title: "Metal stud partitions", body: "Non-loadbearing partitions that carve up space quickly and cleanly, ready for decoration." },
      { title: "Drylining", body: "Wall linings that level, insulate and finish existing structures for a flawless painted surface." },
      { title: "Fire-rated systems", body: "Partitions built to achieve the required fire ratings and compartmentation." },
      { title: "Acoustic partitions", body: "Insulated systems that hold sound between meeting rooms, offices and shared walls." },
      { title: "Impact-resistant walls", body: "Robust linings for high-traffic corridors, schools and public buildings." },
    ],
    systems: ["British Gypsum", "Siniat", "Knauf"],
    benefit: {
      eyebrow: "Specified properly",
      title: "Fire and acoustics aren't optional extras",
      body: "A partition is only as good as its specification. We build to the tested details of British Gypsum, Siniat and Knauf systems so the fire and acoustic performance you're promised is the performance you get.",
    },
    relatedProjects: ["westrock-wrexham", "doc-fictoria-welsh-government", "demon-tweeks-wrexham"],
    testimonial: "jones",
    faqs: [
      { q: "How quickly can partitions be installed?", a: "Metal stud partitioning is one of the fastest ways to reconfigure a space — far quicker and cheaper than structural work. We'll give you a programme with your quotation." },
      { q: "Can partitions be fire-rated?", a: "Yes. We build partitions to achieve the fire rating your building requires, using tested manufacturer systems and detailing." },
      { q: "Will a partition stop sound carrying between rooms?", a: "With the right insulation and specification, yes. We'll match the acoustic performance to how the rooms are used — meeting rooms and HR spaces need more than a storeroom." },
      { q: "Whose systems do you install?", a: "We install to the standards of British Gypsum, Siniat and Knauf — the leading UK partition and drylining manufacturers." },
      { q: "Can you match new partitions into existing finishes?", a: "Yes — our in-house tape-and-joint, plastering and decorating trades finish new walls seamlessly into the existing space." },
      { q: "Do you remove partitions too?", a: "We do — reconfiguration and dilapidations (reinstating a space at end of lease) are both part of what we offer." },
    ],
    seo: {
      title: "Partition Walls & Drylining in Chester & North Wales | Direct Interiors",
      description:
        "Metal stud partitions and drylining installed to British Gypsum, Siniat and Knauf standards across Chester and North Wales — fire-rated and acoustic options. Free quote.",
    },
  },
  {
    slug: "glass-partitions",
    icon: "glass",
    name: "Glass Partitions",
    navDescriptor: "Framed, frameless & acoustic glass",
    heroTitle: "Privacy, without losing the light.",
    heroImage: "glass-partitions-hero-69cd9864",
    intro: [
      "Solid walls divide a space but darken it. Glass partitions give you the separation you need while letting natural light flow right through the floor plate.",
      "From single-glazed screens to frameless acoustic systems with integral blinds, Direct Interiors designs and installs glazing that makes offices feel bigger, brighter and more considered.",
    ],
    scope: [
      { title: "Single & double glazed", body: "Single-glazed screens for light division; double-glazed systems where acoustic performance matters." },
      { title: "Frameless glass", body: "Minimal, seamless glazing for a clean, high-end look with maximum transparency." },
      { title: "Integral blinds", body: "Blinds sealed between the glass in double-glazed systems — privacy on demand, nothing to clean." },
      { title: "Manifestation graphics", body: "Frosting, branding and manifestation to meet safety guidance and carry your identity." },
      { title: "Acoustic glass", body: "Higher-specification systems for boardrooms and quiet rooms where sound privacy is essential." },
    ],
    benefit: {
      eyebrow: "Light + privacy",
      title: "Borrowed light, kept privacy",
      body: "Glass lets a meeting room sit in the middle of a floor plate without casting the desks around it into shadow. With integral blinds and acoustic glazing, you get privacy the moment you need it — and the light back the moment you don't.",
    },
    relatedProjects: ["matthew-arnold-primary-school-liverpool", "westrock-wrexham", "demon-tweeks-wrexham"],
    testimonial: "matthew-arnold",
    faqs: [
      { q: "What's the difference between framed and frameless glass?", a: "Framed systems use slim posts and heads and are versatile and cost-effective. Frameless systems minimise the framing for a seamless, high-end look. We'll advise which suits your space and budget." },
      { q: "Can glass partitions be private?", a: "Yes — through manifestation and frosting, integral blinds within double-glazed units, or acoustic glass for sound privacy. You choose how much you want to see and hear through." },
      { q: "Do glass partitions help with acoustics?", a: "Double-glazed and acoustic systems significantly reduce sound transfer, making them ideal for meeting rooms and quiet spaces." },
      { q: "Can you add our branding to the glass?", a: "Yes — manifestation graphics can carry your logo, colours or a frosted pattern, meeting safety guidance while reinforcing your identity." },
      { q: "Are glass partitions quick to install?", a: "They're one of the least disruptive ways to divide a space — no wet trades and minimal mess, so they suit occupied offices well." },
      { q: "Can glass doors be included?", a: "Yes — single and double glazed doors, sliding or hinged, integrate into the partition system." },
    ],
    seo: {
      title: "Glass Partitions in Chester & North Wales | Direct Interiors",
      description:
        "Framed, frameless and acoustic glass partitions with integral blinds and manifestation, installed across Chester and North Wales. Light-filled, private offices. Free quote.",
    },
  },
  {
    slug: "hygienic-wall-cladding",
    icon: "cladding",
    name: "Hygienic Wall Cladding",
    navDescriptor: "Food-safe washable cladding",
    heroTitle: "Surfaces that pass inspection.",
    heroImage: "hygienic-wall-cladding-hero",
    intro: [
      "In kitchens, food-prep areas and healthcare settings, walls have to be more than smart — they have to be wipe-clean, seamless and compliant.",
      "Direct Interiors supplies and installs food-safe PVC hygienic wall cladding that seals surfaces against moisture and bacteria, and helps premises meet the hygiene standards they're inspected against.",
    ],
    scope: [
      { title: "Commercial kitchens", body: "Seamless, washable cladding behind cooking and prep lines where hygiene is scrutinised." },
      { title: "Food preparation areas", body: "Impervious surfaces that wipe clean and resist the daily punishment of a working kitchen." },
      { title: "Healthcare & clinical spaces", body: "Cladding for treatment rooms and care environments where infection control matters." },
      { title: "Wet & washroom areas", body: "Moisture-proof cladding as a durable, low-maintenance alternative to tiling." },
      { title: "Coving & seamless joints", body: "Hygienic coving and welded joints that leave nowhere for dirt to gather." },
    ],
    benefit: {
      eyebrow: "Inspection-ready",
      title: "A 5-out-of-5 hygiene rating, earned",
      body: "When we re-clad a butcher's shop in Dyserth, the premises went on to achieve a 5-out-of-5 food hygiene rating. The right cladding, sealed and installed properly, is a genuine, measurable upgrade — not just a cosmetic one.",
    },
    relatedProjects: ["butchers-dyserth", "padeswood-buckley-golf-club"],
    testimonial: "golden-fish",
    faqs: [
      { q: "Where is hygienic cladding used?", a: "Commercial kitchens, food-prep areas, butchers and food retail, healthcare and clinical spaces, and wet areas — anywhere surfaces need to be sealed and wipe-clean." },
      { q: "Is it better than tiling?", a: "For hygiene it often is — cladding has no grout lines for bacteria to gather in, wipes clean in seconds, and installs faster with far less mess than tiling." },
      { q: "Will it help pass a hygiene inspection?", a: "Sealed, seamless surfaces are exactly what inspectors look for. A butcher's shop we re-clad went on to earn a 5-out-of-5 food hygiene rating." },
      { q: "Can you install it without closing us down?", a: "Yes — cladding installs quickly and cleanly, and we phase works around trading where needed." },
      { q: "What colours are available?", a: "A wide range, including bright whites for a clinical look and colours for branding or zoning. We'll show you the options at survey." },
      { q: "Do you supply and fit, or just supply?", a: "Both — we supply and install as a complete service, or our sister company Ceilings Direct can supply materials only." },
    ],
    seo: {
      title: "Hygienic Wall Cladding in Chester & North Wales | Direct Interiors",
      description:
        "Food-safe PVC hygienic wall cladding supplied and installed for kitchens, food-prep and healthcare across Chester and North Wales. Inspection-ready surfaces. Free quote.",
    },
  },
  {
    slug: "washroom-refurbishments",
    icon: "washroom",
    name: "Washroom Refurbishments",
    navDescriptor: "DDA-compliant washrooms",
    heroTitle: "Washrooms worth walking into.",
    heroImage: "washroom-refurb-hero",
    intro: [
      "Nothing shapes a first impression of a building quite like its washrooms — and nothing dates one faster.",
      "Direct Interiors designs and installs complete commercial washrooms, from cubicle systems and sanitaryware to accessible, DDA-compliant facilities, all delivered by our own trades.",
    ],
    scope: [
      { title: "Full design & install", body: "Complete washrooms from strip-out to finish — layout, cubicles, sanitaryware, cladding and flooring." },
      { title: "DDA-compliant facilities", body: "Accessible washrooms designed and installed to meet DDA requirements." },
      { title: "Cubicle systems", body: "Durable, moisture-resistant cubicle systems in finishes to suit the setting." },
      { title: "Plumbing & electrical", body: "Supply, waste and power delivered by our own plumbers and electricians." },
      { title: "Hygienic finishes", body: "Wipe-clean cladding and anti-slip flooring for low-maintenance, hygienic spaces." },
    ],
    benefit: {
      eyebrow: "Accessible by design",
      title: "Compliant, not just compliant-looking",
      body: "Accessible washrooms have to be right — grab-rail positions, turning circles, fittings and heights all matter. We design and install DDA-compliant facilities properly, so they work for the people who rely on them.",
    },
    relatedProjects: ["padeswood-buckley-golf-club", "butchers-dyserth"],
    testimonial: "padeswood",
    faqs: [
      { q: "Do you handle the whole washroom, or just the fit-out?", a: "The whole thing — strip-out, plumbing, electrical, cubicles, sanitaryware, cladding, flooring and decoration, all with our own trades." },
      { q: "Can you make our washrooms DDA-compliant?", a: "Yes. We design and install accessible, DDA-compliant washrooms with correct layouts, fittings and grab-rail positions." },
      { q: "How long does a washroom refurbishment take?", a: "It depends on size and specification. We refurbished the washrooms and changing rooms at a golf club in four weeks — we'll give you a firm programme with your quote." },
      { q: "Can you keep some facilities open during works?", a: "Where the layout allows, we phase works to keep facilities available. We'll plan this with you at survey." },
      { q: "What makes a washroom low-maintenance?", a: "Hygienic wall cladding instead of tiling, sealed surfaces, and anti-slip vinyl flooring all cut cleaning time and last longer in a busy environment." },
      { q: "Do you refurbish changing rooms and showers too?", a: "Yes — showers, changing areas and associated facilities are all part of what we do." },
    ],
    seo: {
      title: "Washroom Refurbishments in Chester & North Wales | Direct Interiors",
      description:
        "Complete commercial washroom refurbishments across Chester and North Wales — DDA-compliant design, cubicle systems, plumbing and hygienic finishes, all in-house. Free quote.",
    },
  },
  {
    slug: "bespoke-designs",
    icon: "bespoke",
    name: "Bespoke Designs",
    navDescriptor: "Feature installations & joinery",
    heroTitle: "The details people remember.",
    heroImage: "bespoke-designs-hero-new",
    intro: [
      "Sometimes a space needs a moment — a feature that gives it identity and makes it stick in the memory.",
      "Direct Interiors designs and builds bespoke installations: media walls, feature timber ceilings, reception features and one-off joinery, made to measure and installed by the same team that fits out the rest of your space.",
    ],
    scope: [
      { title: "Media walls", body: "Integrated feature walls that house screens, storage and services cleanly." },
      { title: "Feature timber ceilings", body: "Slatted and panelled timber ceilings that add warmth and craft overhead." },
      { title: "Reception features", body: "Statement desks, backdrops and entrance features that set the tone." },
      { title: "One-off joinery", body: "Made-to-measure joinery for the pieces you can't buy off the shelf." },
      { title: "Feature ceilings & finishes", body: "Bold ceilings and finishes — like the black feature ceiling we built at Bell Meadow." },
    ],
    benefit: {
      eyebrow: "Made, not bought",
      title: "One team, from concept to installed",
      body: "Because our joiners work alongside our electricians and ceiling fixers, a bespoke feature isn't a separate contract bolted on at the end — it's designed and built into the space from the start, and it fits.",
    },
    relatedProjects: ["bell-meadow-business-park-chester", "demon-tweeks-wrexham"],
    testimonial: "jones",
    faqs: [
      { q: "What counts as a bespoke design?", a: "Anything made to measure for your space — media walls, feature ceilings, reception desks, timber panelling and one-off joinery." },
      { q: "Do you design it, or do we need a designer?", a: "We can work from your designer's drawings or develop the idea with you. Either way, we build and install it with our own joiners." },
      { q: "Can a feature be built into a wider fit-out?", a: "That's where it works best — because we deliver the whole fit-out, a bespoke feature is coordinated with the services, lighting and finishes around it." },
      { q: "Can you match existing materials or branding?", a: "Yes — finishes, timbers and colours can be specified to match your brand or existing interior." },
      { q: "Do you build feature ceilings?", a: "We do — from slatted timber ceilings to bold painted features like the black feature ceiling at Bell Meadow Business Park." },
      { q: "Is bespoke work expensive?", a: "It's specified to your budget. A single well-placed feature often delivers more impact than spending across the whole space — we'll advise where it counts." },
    ],
    seo: {
      title: "Bespoke Interior Designs & Feature Joinery in Chester & North Wales | Direct Interiors",
      description:
        "Bespoke media walls, feature timber ceilings, reception features and one-off joinery designed and installed across Chester and North Wales. Free design consultation.",
    },
  },
];

export const solutions = list;
export const getSolution = (slug: string): Solution | undefined => list.find((s) => s.slug === slug);
