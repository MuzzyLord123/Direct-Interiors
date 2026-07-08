// Single source of truth for company details. Templates must consume these —
// never hard-code contact details, the Est. date or the address in a page.
module.exports = {
  name: "Direct Interiors North West Limited",
  shortName: "Direct Interiors",
  footerName: "Direct Interiors North West Ltd",
  url: "https://www.directinteriorsnw.com",

  // TODO(client) #1: About page said "established in 2000", Home hero said "Est 2002".
  // Confirm the correct year — change it here and it updates sitewide.
  estYear: 2002,

  phoneDisplay: "01244 810 222",
  phoneHref: "tel:+441244810222",
  email: "info@directinteriorsnw.com",

  // TODO(client) #3 (confirmed default): one postal form used sitewide.
  address: {
    street: "96 Welsh Road",
    locality: "Garden City",
    town: "Deeside",
    county: "Flintshire",
    postcode: "CH5 2HX",
  },
  addressFull: "96 Welsh Road, Garden City, Deeside, Flintshire CH5 2HX",
  areasCovered: "Chester, Deeside, North Wales and the North West",

  // TODO(client) #9: Duda's internal form handler cannot be reused outside Duda.
  // Point this at the replacement endpoint (e.g. Netlify Forms action, Formspree
  // URL or a small serverless function). Until set, the form posts to itself and
  // the page explains submission by phone/email.
  formEndpoint: "",

  // TODO(client): set a GA4 measurement ID to enable analytics. Analytics only
  // loads after cookie consent is accepted (see assets/js/main.js).
  gaId: "",

  // TODO(client) #6: company registration number for the footer.
  companyRegNumber: "",

  // TODO(client) #5: opening hours, e.g. "Mon–Fri 8:00–17:00".
  openingHours: "",

  ceilingsDirect: {
    name: "Ceilings Direct",
    url: "https://www.ceilings-direct.com",
    // TODO(client) #8: the Ceilings Direct store uses hash-routed category URLs;
    // replace with exact category links when the client provides them.
    store: "https://www.ceilings-direct.com/store",
  },
};
