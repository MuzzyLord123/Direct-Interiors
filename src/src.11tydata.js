// Computed data for all page templates. Using JS functions (not front-matter
// template strings) so values resolve per pagination page and never get
// double-escaped by Nunjucks.
module.exports = {
  eleventyComputed: {
    title: (data) => data.solution?.title ?? data.project?.title ?? data.title,
    metaTitle: (data) => data.solution?.metaTitle ?? data.project?.metaTitle ?? data.metaTitle,
    metaDesc: (data) => data.solution?.metaDesc ?? data.project?.metaDesc ?? data.metaDesc,
    heroImage: (data) => data.solution?.hero ?? data.project?.hero ?? data.heroImage,
    heroAlt: (data) => data.solution?.heroAlt ?? data.project?.heroAlt ?? data.heroAlt,
    heroTitle: (data) => data.solution?.title ?? data.project?.title ?? data.heroTitle,
    strapline: (data) => data.solution?.strapline ?? data.strapline,
    ogImage: (data) => data.solution?.hero ?? data.project?.hero ?? data.ogImage,
    breadcrumbs: (data) => {
      if (data.solution) {
        return [
          { label: "Home", url: "/" },
          { label: "Solutions", url: "/solutions" },
          { label: data.solution.navLabel },
        ];
      }
      if (data.project) {
        return [
          { label: "Home", url: "/" },
          { label: "Our Work", url: "/our-work" },
          { label: data.project.title },
        ];
      }
      return data.breadcrumbs;
    },
  },
};
