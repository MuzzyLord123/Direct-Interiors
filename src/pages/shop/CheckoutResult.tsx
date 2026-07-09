import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Check, XCircle } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Section } from "@/components/primitives/Section";
import { Button } from "@/components/primitives/Button";
import { GoldRule } from "@/components/primitives/bits";
import { useCart } from "@/shop/CartContext";
import { site } from "@/data/site";

export function CheckoutSuccess() {
  const { clear } = useCart();
  const [params] = useSearchParams();
  const ref = params.get("session_id");

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <>
      <Seo title="Order Confirmed | Direct Interiors" description="Thank you for your order." path="/shop/success" noindex />
      <Section tone="dark" plaster className="flex min-h-[75vh] items-center pt-28 text-center">
        <div className="mx-auto max-w-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15">
            <Check className="h-8 w-8 text-success" aria-hidden="true" />
          </div>
          <GoldRule className="mx-auto my-7" width="90px" />
          <h1 className="font-display text-display-md text-text-dark">Thank you — order received.</h1>
          <p className="mx-auto mt-5 max-w-md font-sans font-light text-text-dark/75">
            Your payment was successful and we've emailed your confirmation. We'll be in touch about delivery or collection.
          </p>
          {ref && <p className="mt-4 font-mono text-xs text-text-dark/50">Reference: {ref.slice(-12)}</p>}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button to="/shop" variant="gold" arrow>
              Continue shopping
            </Button>
            <Button to="/" variant="ghost">
              Back to home
            </Button>
          </div>
          <p className="mt-8 font-mono text-sm text-text-dark/60">
            Questions? Call{" "}
            <a href={site.phoneHref} className="text-brass hover:text-brass-light">{site.phoneDisplay}</a>
          </p>
        </div>
      </Section>
    </>
  );
}

export function CheckoutCancelled() {
  return (
    <>
      <Seo title="Checkout Cancelled | Direct Interiors" description="Your checkout was cancelled." path="/shop/cancelled" noindex />
      <Section tone="dark" plaster className="flex min-h-[75vh] items-center pt-28 text-center">
        <div className="mx-auto max-w-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
            <XCircle className="h-8 w-8 text-text-dark/60" aria-hidden="true" />
          </div>
          <GoldRule className="mx-auto my-7" width="90px" />
          <h1 className="font-display text-display-md text-text-dark">Checkout cancelled.</h1>
          <p className="mx-auto mt-5 max-w-md font-sans font-light text-text-dark/75">
            No payment was taken — your basket is still saved. Pick up where you left off whenever you're ready.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button to="/cart" variant="gold" arrow>
              Back to basket
            </Button>
            <Button to="/shop" variant="ghost">
              Keep shopping
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
