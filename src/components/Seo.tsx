import { Helmet } from "react-helmet-async";
import { site } from "@/data/site";
import { imageManifest } from "@/data/imageManifest";

interface Props {
  title: string;
  description: string;
  path: string; // route path, e.g. "/glass-partitions"
  image?: string; // manifest key for OG image
  jsonLd?: object | object[];
  noindex?: boolean;
}

export function Seo({ title, description, path, image, jsonLd, noindex }: Props) {
  const canonical = `${site.url}${path === "/" ? "/" : path}`;
  const ogImage = image && imageManifest[image]
    ? `${site.url}/img/${image}-1200.jpg`
    : `${site.url}/img/slider01-1200.jpg`;
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

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
