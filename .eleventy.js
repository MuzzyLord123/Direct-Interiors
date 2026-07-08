const path = require("node:path");
const Image = require("@11ty/eleventy-img");

const IMG_SRC_DIR = "src/assets/img/src";

function imageFilename(id, src, width, format) {
  return `${path.parse(src).name}-${width}w.${format}`;
}

async function imageMetadata(src, widths, formats) {
  return Image(path.join(IMG_SRC_DIR, src), {
    widths,
    formats,
    outputDir: "_site/assets/img/",
    urlPath: "/assets/img/",
    filenameFormat: imageFilename,
    sharpJpegOptions: { quality: 78, mozjpeg: true },
    sharpWebpOptions: { quality: 72 },
    sharpAvifOptions: { quality: 55 },
  });
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets/css": "assets/css" });
  eleventyConfig.addPassthroughCopy({ "src/assets/js": "assets/js" });
  eleventyConfig.addPassthroughCopy({ "src/assets/fonts": "assets/fonts" });
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });

  // Responsive <picture>. opts: { widths, sizes, eager, fetchpriority, class }
  eleventyConfig.addAsyncShortcode("image", async function (src, alt, opts = {}) {
    if (alt === undefined || alt === null) {
      throw new Error(`Missing alt text for image: ${src} (use "" for decorative images)`);
    }
    const isPng = /\.png$/i.test(src);
    const metadata = await imageMetadata(
      src,
      opts.widths || [400, 800, 1200, 1920],
      isPng ? ["webp", "png"] : ["avif", "webp", "jpeg"]
    );
    const attrs = {
      alt,
      sizes: opts.sizes || "100vw",
      loading: opts.eager ? "eager" : "lazy",
      decoding: opts.eager ? "sync" : "async",
    };
    if (opts.fetchpriority) attrs.fetchpriority = opts.fetchpriority;
    if (opts.class) attrs.class = opts.class;
    return Image.generateHTML(metadata, attrs);
  });

  // Preload hint for the page hero image.
  eleventyConfig.addAsyncShortcode("heroPreload", async function (src) {
    const metadata = await imageMetadata(src, [800, 1200, 1920], ["avif", "webp", "jpeg"]);
    const fmt = metadata.avif || metadata.webp || metadata.jpeg;
    const srcset = fmt.map((e) => e.srcset).join(", ");
    return `<link rel="preload" as="image" imagesrcset="${srcset}" imagesizes="100vw" fetchpriority="high">`;
  });

  // Plain URL of a generated variant (used for og:image).
  eleventyConfig.addAsyncShortcode("imageUrl", async function (src, width = 1200) {
    const metadata = await imageMetadata(src, [width], ["jpeg"]);
    return metadata.jpeg[0].url;
  });

  eleventyConfig.addFilter("absUrl", function (url, base) {
    return new URL(url, base).href.replace(/\/$/, "");
  });

  // Canonical URLs match the live site: no trailing slash (except home).
  eleventyConfig.addFilter("canonical", function (pageUrl, base) {
    const clean = pageUrl.replace(/\/$/, "");
    return clean === "" ? base + "/" : base + clean;
  });

  eleventyConfig.addGlobalData("buildYear", () => new Date().getFullYear());

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
