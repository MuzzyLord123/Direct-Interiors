import { useEffect, useRef, useState } from "react";
import { imageManifest } from "@/data/imageManifest";
import { cn } from "@/lib/cn";

interface Props {
  /** manifest key = master filename without extension */
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  /** eager-load + high priority for above-the-fold hero images */
  priority?: boolean;
  /** apply the editorial photo grade (default true for photography) */
  treatment?: boolean;
  /** object-position tweak */
  position?: string;
}

const srcset = (key: string, fmt: "avif" | "webp" | "jpg", widths: number[]) =>
  widths.map((w) => `/img/${key}-${w}.${fmt} ${w}w`).join(", ");

/**
 * Zero-CLS responsive image. Renders AVIF/WebP/JPEG <picture>, reserves space
 * from intrinsic dimensions, and shows a warm blur-up placeholder until load.
 */
export function OptimizedImage({
  src,
  alt,
  sizes = "100vw",
  className,
  imgClassName,
  priority = false,
  treatment = true,
  position = "center",
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  // On hydration (or from cache) the image may already be complete, so onLoad
  // never fires — reveal it immediately in that case.
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);
  const entry = imageManifest[src];

  if (!entry) {
    // Fail loud in dev, degrade gracefully in prod.
    if (import.meta.env.DEV) console.warn(`OptimizedImage: unknown key "${src}"`);
    return <div className={cn("bg-ink-raised", className)} aria-hidden="true" />;
  }

  const { width, height, widths, blur } = entry;

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {/* warm blur placeholder */}
      <img
        src={blur}
        alt=""
        aria-hidden="true"
        className={cn(
          "absolute inset-0 h-full w-full scale-105 object-cover blur-xl transition-opacity duration-700",
          loaded ? "opacity-0" : "opacity-100",
        )}
        style={{ objectPosition: position }}
      />
      <picture>
        <source type="image/avif" srcSet={srcset(src, "avif", widths)} sizes={sizes} />
        <source type="image/webp" srcSet={srcset(src, "webp", widths)} sizes={sizes} />
        <img
          ref={imgRef}
          src={`/img/${src}-${widths[widths.length - 1]}.jpg`}
          srcSet={srcset(src, "jpg", widths)}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          // @ts-expect-error fetchpriority is valid HTML, not yet in React types
          fetchpriority={priority ? "high" : undefined}
          decoding={priority ? "sync" : "async"}
          onLoad={() => setLoaded(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            treatment && "photo-treatment",
            loaded ? "opacity-100" : "opacity-0",
            imgClassName,
          )}
          style={{ objectPosition: position }}
        />
      </picture>
    </div>
  );
}
