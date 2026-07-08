import type { Testimonial } from "./types";

/**
 * Real testimonials, ported from the live site with grammar corrections only.
 * Each attribution appears once — never duplicated across pages.
 *
 * TODO(client): the live site credits the "natural light / glass partitions"
 * quote to BOTH "Mr B Jones, Chester Business Park" and "AURA Leisure and
 * Libraries" on different pages. We use Mr B Jones (the majority usage).
 * Confirm the true author before launch.
 */
export const testimonials: Testimonial[] = [
  {
    id: "jones",
    quote:
      "Dividing offices up can be tough with less natural light. Your installation of glass partitions made such a difference to the office space. I can't fault them — so modernised and stylish.",
    author: "Mr B Jones",
    location: "Chester Business Park",
    jobType: "Glass Partitions",
  },
  {
    id: "golden-fish",
    quote:
      "I contacted Direct Interiors on a recommendation from a friend who had similar works completed. I was introduced to Danny and Richie, and we met on site the next day to go through all my requirements. They gave me a really competitive price and the works were completed the following week. As a result of the PVC cladding works, I have now achieved my 5-star hygiene food rating. Thanks to Danny, Richie and the team for the swift turnaround.",
    author: "Mr P Williams",
    location: "Golden Fish & Chips",
    jobType: "Hygienic Wall Cladding",
  },
  {
    id: "padeswood",
    quote:
      "Wow — I can't believe this is our washroom. It feels so much bigger! The clinical finish on the cladding is fantastic and it looks so clean. You've done a phenomenal job and the finish is of the highest quality. I can't wait to get in those showers. Now we just need the rest of the building doing!",
    author: "Club Member",
    location: "Padeswood & Buckley Golf Club",
    jobType: "Washroom Refurbishment",
  },
  {
    id: "matthew-arnold",
    quote:
      "It's trendy, modern and looks fantastic. It's done exactly what we wanted it to do. It lets so much natural light in whilst still providing that barrier of separation. Faultless job — thanks guys!",
    author: "Reception Team",
    location: "Matthew Arnold Primary School, Liverpool",
    jobType: "Glass Partitions",
  },
];

export const getTestimonial = (id?: string): Testimonial | undefined =>
  id ? testimonials.find((t) => t.id === id) : undefined;
