import { Reveal } from "@/components/primitives/Reveal";
import { getTestimonial } from "@/data/testimonials";

/** Single testimonial rendered as an editorial pull-quote. */
export function TestimonialBlock({ id }: { id?: string }) {
  const t = getTestimonial(id);
  if (!t) return null;
  return (
    <Reveal className="mx-auto max-w-3xl text-center">
      <span className="font-display text-6xl leading-none text-brass/40" aria-hidden="true">
        &ldquo;
      </span>
      <blockquote className="-mt-4">
        <p className="font-display text-2xl font-light italic leading-snug text-current md:text-[1.75rem]">
          {t.quote}
        </p>
      </blockquote>
      <figcaption className="mt-6 font-mono text-xs uppercase tracking-[0.16em] text-current/60">
        <span className="text-brass">{t.author}</span> — {t.location}
      </figcaption>
    </Reveal>
  );
}
