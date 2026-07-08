import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { OptimizedImage } from "@/components/primitives/OptimizedImage";
import { imageManifest } from "@/data/imageManifest";
import { RevealGroup, RevealItem } from "@/components/primitives/Reveal";

export interface GalleryImage {
  src: string; // manifest key
  alt: string;
}

/**
 * Accessible project gallery: a grid of thumbnails that open a keyboard-
 * operable lightbox (arrow keys, Escape, focus trap, focus restore).
 */
export function Gallery({ images }: { images: GalleryImage[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const open = index !== null;

  const close = useCallback(() => {
    setIndex(null);
    openerRef.current?.focus();
  }, []);
  const prev = useCallback(() => setIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)), [images.length]);
  const next = useCallback(() => setIndex((i) => (i === null ? i : (i + 1) % images.length)), [images.length]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Tab") {
        // simple focus trap within the dialog
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    dialogRef.current?.querySelector<HTMLElement>("[data-lb-close]")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, prev, next]);

  const current = index !== null ? images[index] : null;
  const currentDims = current ? imageManifest[current.src] : null;

  return (
    <>
      <RevealGroup className="grid grid-cols-2 gap-3 md:grid-cols-4" stagger={0.05}>
        {images.map((img, i) => (
          <RevealItem key={img.src}>
            <button
              type="button"
              onClick={(e) => {
                openerRef.current = e.currentTarget;
                setIndex(i);
              }}
              className="group relative block w-full overflow-hidden rounded-sm border border-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
              aria-label={`View image ${i + 1} of ${images.length}: ${img.alt}`}
            >
              <OptimizedImage
                src={img.src}
                alt={img.alt}
                sizes="(min-width: 768px) 25vw, 50vw"
                className="aspect-[4/3] w-full"
                imgClassName="transition-transform duration-700 ease-editorial group-hover:scale-105"
              />
            </button>
          </RevealItem>
        ))}
      </RevealGroup>

      <AnimatePresence>
        {open && current && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Image ${(index ?? 0) + 1} of ${images.length}`}
            className="fixed inset-0 z-[210] flex flex-col items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <button
              type="button"
              data-lb-close
              onClick={close}
              className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-text-dark transition-colors hover:border-brass hover:text-brass focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
              aria-label="Close image viewer"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <figure className="flex max-h-full max-w-5xl flex-col items-center">
              {currentDims && (
                <div
                  className="max-h-[80vh] w-full overflow-hidden rounded-sm"
                  style={{ maxWidth: "min(90vw, 64rem)", aspectRatio: `${currentDims.width} / ${currentDims.height}` }}
                >
                  <OptimizedImage src={current.src} alt={current.alt} sizes="90vw" priority className="h-full w-full" />
                </div>
              )}
              <figcaption className="mt-4 text-center font-sans text-sm text-text-dark/75">{current.alt}</figcaption>
            </figure>

            <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-4">
              <button
                type="button"
                onClick={prev}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-text-dark transition-colors hover:border-brass hover:text-brass focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={next}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-text-dark transition-colors hover:border-brass hover:text-brass focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
