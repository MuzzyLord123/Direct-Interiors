import { Helmet } from "react-helmet-async";
import { site } from "@/data/site";
import { imageManifest } from "@/data/imageManifest";
import { localBusinessJsonLd } from "@/lib/seo";

interface Props {
  title: string;
  description: string;
  path: string; // route path, e.g. "/glass-partitions"
  image?: string; // manifest key for OG image
  jsonLd?: object | object[];
  noindex?: boolean;
}

// Largest generated width up to 1200 (falls back to the biggest available), so
// og:image always points at a file that actually exists.
function ogUrl(key?: string): string {
  const entry = key ? imageManifest[key] : undefined;
  if (!entry) {
    const fb = imageManifest["slider01"];
    const w = fb ? (fb.widths.filter((x) => x <= 1200).pop() ?? fb.widths[fb.widths.length - 1]) : 1200;
    return `${site.url}/img/slider01-${w}.jpg`;
  }
  const w = entry.widths.filter((x) => x <= 1200).pop() ?? entry.widths[entry.widths.length - 1];
  return `${site.url}/img/${key}-${w}.jpg`;
}

export function Seo({ title, description, path, image, jsonLd, noindex }: Props) {
  const canonical = `${site.url}${path === "/" ? "/" : path}`;
  const ogImage = ogUrl(image);
  // LocalBusiness is emitted on every page so Service.provider @id always
  // resolves; page-specific blocks (breadcrumb, service) are appended.
  const pageBlocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  const blocks = [localBusinessJsonLd(), ...pageBlocks];

  return (
    <Helmet>
      <html lang="en-GB" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex,follow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.legalName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_GB" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
}
