import { testimonials } from "@/data/testimonials";
import { Reveal } from "@/components/primitives/Reveal";

/** Drag/scroll-snap carousel of testimonials. Keyboard-scrollable via overflow. */
export function TestimonialCarousel() {
  return (
    <div
      className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 [scrollbar-width:thin] md:mx-0 md:px-0"
      role="region"
      aria-label="Client testimonials"
      tabIndex={0}
    >
      {testimonials.map((t) => (
        <Reveal
          key={t.id}
          className="group w-[min(85vw,30rem)] shrink-0 snap-start rounded-sm border border-stone/50 bg-white p-8 transition-colors hover:border-brass"
        >
          <span className="font-display text-5xl leading-none text-brass/50" aria-hidden="true">&ldquo;</span>
          <blockquote className="-mt-3">
            <p className="font-display text-xl font-light italic leading-snug text-text-light">{t.quote}</p>
          </blockquote>
          <figcaption className="mt-6 border-t border-stone/50 pt-4">
            <span className="block font-sans text-sm font-medium text-text-light">{t.author}</span>
            <span className="block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-graphite">
              {t.location} · {t.jobType}
            </span>
          </figcaption>
        </Reveal>
      ))}
    </div>
  );
}
