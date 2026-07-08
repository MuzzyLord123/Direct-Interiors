import { useMemo, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { site } from "@/data/site";
import { solutions } from "@/data/solutions";
import { Button } from "@/components/primitives/Button";
import { cn } from "@/lib/cn";

const PREMISES = ["Office", "Retail", "Education", "Leisure / Hospitality", "Healthcare", "Industrial", "Other"] as const;
const TIMESCALES = ["ASAP", "1–3 months", "3–6 months", "Planning ahead"] as const;
const NEEDS = [...solutions.map((s) => s.name), "Not sure yet"];

const schema = z.object({
  premises: z.string().min(1, "Please choose your premises type"),
  postcode: z.string().max(12).optional().or(z.literal("")),
  needs: z.array(z.string()).min(1, "Please select at least one option"),
  timescale: z.string().min(1, "Please choose a timescale"),
  description: z.string().max(2000).optional().or(z.literal("")),
  name: z.string().min(2, "Please enter your name"),
  company: z.string().optional().or(z.literal("")),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional().or(z.literal("")),
  preferredContact: z.enum(["Phone", "Email"]),
  consent: z.literal(true, { errorMap: () => ({ message: "Please agree so we can reply to your enquiry" }) }),
});

type FormValues = z.infer<typeof schema>;

const STEP_FIELDS: (keyof FormValues)[][] = [
  ["premises", "postcode"],
  ["needs", "timescale", "description"],
  ["name", "company", "email", "phone", "preferredContact", "consent"],
  [],
];
const STEP_LABELS = ["Your premises", "What you need", "Your details", "Confirm"];

function reference() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `DI-${n}`;
}

const enquiryToNeed: Record<string, string> = {
  quote: NEEDS[0],
  consultation: "Not sure yet",
  tender: NEEDS[0],
};

const inputBase =
  "w-full rounded-sm border bg-white px-4 py-3 font-sans text-text-light placeholder:text-mute focus:outline-none focus:ring-2 focus:ring-brass/70 border-stone";
const errorText = "mt-1.5 font-sans text-sm text-[#9e4224]";

export function EnquiryForm() {
  const reduce = useReducedMotion();
  const [params] = useSearchParams();
  const enquiry = params.get("enquiry") ?? "";
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [ref, setRef] = useState("");

  const defaultNeeds = useMemo(() => (enquiryToNeed[enquiry] ? [enquiryToNeed[enquiry]] : []), [enquiry]);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      premises: "",
      postcode: "",
      needs: defaultNeeds,
      timescale: "",
      description: "",
      name: "",
      company: "",
      email: "",
      phone: "",
      preferredContact: "Phone",
      consent: false as unknown as true,
    },
  });

  const formRef = useRef<HTMLFormElement>(null);
  const focusFirstInvalid = () => {
    // after validation state settles, move focus to the first invalid control/group
    window.setTimeout(() => {
      const el = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
      el?.focus();
      el?.scrollIntoView({ block: "center", behavior: "smooth" });
    }, 0);
  };

  const next = async () => {
    const ok = await trigger(STEP_FIELDS[step]);
    if (ok) setStep((s) => Math.min(s + 1, 3));
    else focusFirstInvalid();
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (data: FormValues) => {
    setStatus("sending");
    // TODO(client): set site.formEndpoint. Until then we cannot deliver the
    // message, so we surface a clear call-us fallback rather than pretend.
    if (!site.formEndpoint) {
      setStatus("error");
      return;
    }
    try {
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, source: "directinteriorsnw.com" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setRef(reference());
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="tone-light rounded-md border border-stone bg-white p-8 md:p-10" role="status" aria-live="polite">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
          <motion.span
            initial={reduce ? undefined : { scale: 0 }}
            animate={reduce ? undefined : { scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <Check className="h-7 w-7 text-success" aria-hidden="true" />
          </motion.span>
        </div>
        <h2 className="mt-6 font-display text-3xl font-light text-text-light">Thank you — we've got it.</h2>
        <p className="mt-3 font-sans text-graphite">
          We'll review your enquiry and call to book your free survey. Your reference is{" "}
          <span className="font-mono text-text-light">{ref}</span>.
        </p>
        <div className="mt-7">
          <Button to="/projects" variant="primary" arrow>
            In the meantime, see our work
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="tone-light rounded-md border border-stone bg-white p-6 md:p-8">
      {/* progress */}
      <ol className="mb-8 flex items-center gap-2" aria-label="Form progress">
        {STEP_LABELS.map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-xs",
                i < step && "bg-success text-white",
                i === step && "bg-brass text-ink",
                i > step && "bg-sand text-graphite",
              )}
              aria-current={i === step ? "step" : undefined}
            >
              {i < step ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : i + 1}
            </span>
            <span className={cn("hidden text-xs font-medium sm:block", i === step ? "text-text-light" : "text-graphite")}>
              {label}
            </span>
          </li>
        ))}
      </ol>

      <form ref={formRef} onSubmit={handleSubmit(onSubmit, focusFirstInvalid)} noValidate>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: reduce ? 0 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduce ? 0 : -24 }}
            transition={{ duration: 0.3 }}
          >
            {step === 0 && (
              <fieldset>
                <legend className="mb-4 font-display text-2xl font-light text-text-light">
                  What kind of premises is it?
                </legend>
                <Controller
                  control={control}
                  name="premises"
                  render={({ field }) => (
                    <div
                      className="flex flex-wrap gap-2"
                      role="radiogroup"
                      aria-label="Premises type"
                      tabIndex={-1}
                      aria-invalid={!!errors.premises}
                      aria-describedby={errors.premises ? "premises-error" : undefined}
                    >
                      {PREMISES.map((p) => (
                        <button
                          type="button"
                          key={p}
                          role="radio"
                          aria-checked={field.value === p}
                          onClick={() => field.onChange(p)}
                          className={cn(
                            "min-h-[44px] rounded-sm border px-4 py-2.5 font-sans text-sm transition-colors",
                            field.value === p
                              ? "border-brass bg-brass/10 text-text-light"
                              : "border-stone text-graphite hover:border-brass/60",
                          )}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  )}
                />
                {errors.premises && <p id="premises-error" className={errorText}>{errors.premises.message}</p>}

                <div className="mt-6">
                  <label htmlFor="postcode" className="mb-1.5 block font-sans text-sm font-medium text-text-light">
                    Postcode <span className="text-graphite">(optional)</span>
                  </label>
                  <input id="postcode" autoComplete="postal-code" className={cn(inputBase, "max-w-xs")} {...register("postcode")} />
                </div>
              </fieldset>
            )}

            {step === 1 && (
              <fieldset>
                <legend className="mb-4 font-display text-2xl font-light text-text-light">What do you need?</legend>
                <Controller
                  control={control}
                  name="needs"
                  render={({ field }) => (
                    <div
                      className="flex flex-wrap gap-2"
                      role="group"
                      aria-label="Services needed"
                      tabIndex={-1}
                      aria-invalid={!!errors.needs}
                      aria-describedby={errors.needs ? "needs-error" : undefined}
                    >
                      {NEEDS.map((n) => {
                        const active = field.value.includes(n);
                        return (
                          <button
                            type="button"
                            key={n}
                            aria-pressed={active}
                            onClick={() => field.onChange(active ? field.value.filter((v) => v !== n) : [...field.value, n])}
                            className={cn(
                              "min-h-[44px] rounded-sm border px-4 py-2.5 font-sans text-sm transition-colors",
                              active ? "border-brass bg-brass/10 text-text-light" : "border-stone text-graphite hover:border-brass/60",
                            )}
                          >
                            {n}
                          </button>
                        );
                      })}
                    </div>
                  )}
                />
                {errors.needs && <p id="needs-error" className={errorText}>{errors.needs.message}</p>}

                <div className="mt-6">
                  <span className="mb-2 block font-sans text-sm font-medium text-text-light">Timescale</span>
                  <Controller
                    control={control}
                    name="timescale"
                    render={({ field }) => (
                      <div
                        className="flex flex-wrap gap-2"
                        role="radiogroup"
                        aria-label="Timescale"
                        tabIndex={-1}
                        aria-invalid={!!errors.timescale}
                        aria-describedby={errors.timescale ? "timescale-error" : undefined}
                      >
                        {TIMESCALES.map((t) => (
                          <button
                            type="button"
                            key={t}
                            role="radio"
                            aria-checked={field.value === t}
                            onClick={() => field.onChange(t)}
                            className={cn(
                              "min-h-[44px] rounded-sm border px-4 py-2.5 font-sans text-sm transition-colors",
                              field.value === t ? "border-brass bg-brass/10 text-text-light" : "border-stone text-graphite hover:border-brass/60",
                            )}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    )}
                  />
                  {errors.timescale && <p id="timescale-error" className={errorText}>{errors.timescale.message}</p>}
                </div>

                <div className="mt-6">
                  <label htmlFor="description" className="mb-1.5 block font-sans text-sm font-medium text-text-light">
                    Tell us a little more <span className="text-graphite">(optional — any drawings or dimensions help)</span>
                  </label>
                  <textarea id="description" rows={4} className={inputBase} {...register("description")} />
                </div>
              </fieldset>
            )}

            {step === 2 && (
              <fieldset className="grid gap-4 sm:grid-cols-2">
                <legend className="mb-4 font-display text-2xl font-light text-text-light sm:col-span-2">Your details</legend>
                <div>
                  <label htmlFor="name" className="mb-1.5 block font-sans text-sm font-medium text-text-light">Name</label>
                  <input id="name" autoComplete="name" className={inputBase} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} {...register("name")} />
                  {errors.name && <p id="name-error" className={errorText}>{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="company" className="mb-1.5 block font-sans text-sm font-medium text-text-light">
                    Company <span className="text-graphite">(optional)</span>
                  </label>
                  <input id="company" autoComplete="organization" className={inputBase} {...register("company")} />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block font-sans text-sm font-medium text-text-light">Email</label>
                  <input id="email" type="email" autoComplete="email" className={inputBase} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")} />
                  {errors.email && <p id="email-error" className={errorText}>{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block font-sans text-sm font-medium text-text-light">
                    Phone <span className="text-graphite">(optional)</span>
                  </label>
                  <input id="phone" type="tel" autoComplete="tel" className={inputBase} {...register("phone")} />
                </div>
                <div className="sm:col-span-2">
                  <span className="mb-2 block font-sans text-sm font-medium text-text-light">Preferred contact</span>
                  <Controller
                    control={control}
                    name="preferredContact"
                    render={({ field }) => (
                      <div className="flex gap-2" role="radiogroup" aria-label="Preferred contact method">
                        {(["Phone", "Email"] as const).map((m) => (
                          <button
                            type="button"
                            key={m}
                            role="radio"
                            aria-checked={field.value === m}
                            onClick={() => field.onChange(m)}
                            className={cn(
                              "min-h-[44px] rounded-sm border px-5 py-2.5 font-sans text-sm transition-colors",
                              field.value === m ? "border-brass bg-brass/10 text-text-light" : "border-stone text-graphite hover:border-brass/60",
                            )}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    )}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="consent" className="flex items-start gap-3 font-sans text-sm text-graphite">
                    <input
                      id="consent"
                      type="checkbox"
                      className="mt-0.5 h-5 w-5 shrink-0 rounded-sm border-stone text-brass focus:ring-brass"
                      aria-invalid={!!errors.consent}
                      aria-describedby={errors.consent ? "consent-error" : undefined}
                      {...register("consent")}
                    />
                    <span>
                      I'm happy for Direct Interiors to contact me about this enquiry. See our{" "}
                      <a href="/privacy" className="text-text-light underline hover:text-brass">privacy policy</a>.
                    </span>
                  </label>
                  {errors.consent && <p id="consent-error" className={errorText}>{errors.consent.message as string}</p>}
                </div>
              </fieldset>
            )}

            {step === 3 && (
              <div>
                <h3 className="mb-4 font-display text-2xl font-light text-text-light">Ready to send</h3>
                <dl className="grid grid-cols-1 gap-x-6 gap-y-3 border-y border-stone py-5 font-sans text-sm sm:grid-cols-2">
                  {[
                    ["Premises", watch("premises")],
                    ["Postcode", watch("postcode") || "—"],
                    ["Needs", watch("needs").join(", ")],
                    ["Timescale", watch("timescale")],
                    ["Name", watch("name")],
                    ["Company", watch("company") || "—"],
                    ["Email", watch("email")],
                    ["Phone", watch("phone") || "—"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-graphite">{k}</dt>
                      <dd className="mt-0.5 text-text-light">{v as string}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 rounded-sm bg-sand/60 p-5">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-graphite">What happens next</p>
                  <ul className="mt-3 space-y-2 font-sans text-sm text-text-light">
                    {["We review your enquiry", "We call to book your free survey", "You receive a fixed written quotation", "No obligation, ever"].map((s) => (
                      <li key={s} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-brass" aria-hidden="true" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* status region */}
        <p role="status" aria-live="polite" className="sr-only">
          {status === "sending" ? "Sending your enquiry" : ""}
        </p>
        {status === "error" && (
          <div className="mt-6 rounded-sm border border-danger/40 bg-danger/5 p-4" role="alert">
            <p className="font-sans text-sm text-text-light">
              {site.formEndpoint
                ? "Sorry, something went wrong sending your message."
                : "Our online form isn't connected just yet."}{" "}
              Please call us on{" "}
              <a href={site.phoneHref} className="font-medium text-[#9e4224] underline">{site.phoneDisplay}</a> or email{" "}
              <a href={`mailto:${site.email}`} className="font-medium text-[#9e4224] underline">{site.email}</a> and we'll get straight back to you.
            </p>
          </div>
        )}

        {/* controls */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="-ml-2 inline-flex min-h-[44px] items-center rounded-sm px-2 font-sans text-sm text-graphite transition-colors hover:text-text-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass disabled:invisible"
          >
            ← Back
          </button>
          {step < 3 ? (
            <Button type="button" onClick={next} variant="primary" arrow>
              Continue
            </Button>
          ) : (
            <Button type="submit" variant="primary" disabled={status === "sending"}>
              {status === "sending" ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
                </span>
              ) : (
                "Send Enquiry"
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
