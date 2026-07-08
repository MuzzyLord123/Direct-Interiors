import { site, EST_YEAR, sectorsServed } from "@/data/site";

export const localBusinessJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": `${site.url}/#business`,
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  telephone: "+441244810222",
  email: site.email,
  foundingDate: String(EST_YEAR),
  slogan: site.tagline,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.line1}, ${site.address.line2}`,
    addressLocality: site.address.town,
    addressRegion: site.address.county,
    postalCode: site.address.postcode,
    addressCountry: "GB",
  },
  areaServed: ["Chester", "Deeside", "Wrexham", "Flintshire", "North Wales", "Liverpool", "North West England"],
  knowsAbout: [...sectorsServed],
});

export const breadcrumbJsonLd = (crumbs: { name: string; path?: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    ...(c.path ? { item: `${site.url}${c.path}` } : {}),
  })),
});

export const serviceJsonLd = (name: string, description: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: name,
  description,
  url: `${site.url}${path}`,
  provider: { "@id": `${site.url}/#business` },
  areaServed: ["Chester", "North Wales", "North West England"],
});
