import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, X, Lock, ShoppingBag, Loader2 } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Section } from "@/components/primitives/Section";
import { Button } from "@/components/primitives/Button";
import { Breadcrumb } from "@/components/Breadcrumb";
import { OptimizedImage } from "@/components/primitives/OptimizedImage";
import { useCart, formatGBP } from "@/shop/CartContext";
import { site } from "@/data/site";

export function Cart() {
  const { lines, setQty, remove, subtotalPence, count } = useCart();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const checkout = async () => {
    setStatus("loading");
    try {
      const res = await fetch(site.shop.checkoutEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: lines.map((l) => ({ id: l.id, qty: l.qty })) }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      throw new Error(data.error || "Checkout failed");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Seo title="Your Basket | Direct Interiors Shop" description="Review your basket and check out securely." path="/cart" noindex />
      <Section tone="dark" plaster className="min-h-[70vh] pt-28 md:pt-32">
        <div className="mb-8">
          <Breadcrumb crumbs={[{ name: "Home", path: "/" }, { name: "Shop", path: "/shop" }, { name: "Basket" }]} />
        </div>
        <h1 className="font-display text-display-sm text-text-dark md:text-display-md">Your basket</h1>

        {count === 0 ? (
          <div className="mt-10 flex flex-col items-start gap-6">
            <div className="flex items-center gap-3 text-text-dark/60">
              <ShoppingBag className="h-6 w-6 text-brass" aria-hidden="true" />
              <p className="font-sans text-lg font-light">Your basket is empty.</p>
            </div>
            <Button to="/shop" variant="gold" arrow>
              Browse the shop
            </Button>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
            {/* line items */}
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {lines.map((l) => (
                <li key={l.id} className="flex gap-4 py-5">
                  <Link to={`/shop/${l.slug}`} className="h-20 w-20 shrink-0 overflow-hidden rounded-sm border border-white/10 bg-bone">
                    <OptimizedImage src={l.image} alt={l.name} treatment={false} sizes="80px" className="h-full w-full" imgClassName="object-contain p-1.5" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <Link to={`/shop/${l.slug}`} className="font-sans text-sm font-medium text-text-dark hover:text-brass">
                      {l.name}
                    </Link>
                    {l.sku && <span className="mt-0.5 font-mono text-[0.65rem] text-text-dark/45">SKU {l.sku}</span>}
                    <div className="mt-3 flex items-center gap-4">
                      <div className="inline-flex items-center rounded-sm border border-white/20">
                        <button type="button" onClick={() => setQty(l.id, l.qty - 1)} className="flex h-9 w-9 items-center justify-center text-text-dark/80 hover:text-brass focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass" aria-label={`Decrease quantity of ${l.name}`}>
                          <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                        <span className="w-8 text-center font-mono text-sm text-text-dark">{l.qty}</span>
                        <button type="button" onClick={() => setQty(l.id, l.qty + 1)} className="flex h-9 w-9 items-center justify-center text-text-dark/80 hover:text-brass focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass" aria-label={`Increase quantity of ${l.name}`}>
                          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                      <button type="button" onClick={() => remove(l.id)} className="inline-flex items-center gap-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-text-dark/50 hover:text-danger" aria-label={`Remove ${l.name}`}>
                        <X className="h-3 w-3" aria-hidden="true" /> Remove
                      </button>
                    </div>
                  </div>
                  <span className="font-display text-lg font-light text-brass">{formatGBP(l.pricePence * l.qty)}</span>
                </li>
              ))}
            </ul>

            {/* summary */}
            <div className="h-fit rounded-sm border border-white/10 bg-white/[0.03] p-7">
              <h2 className="font-display text-xl font-light text-text-dark">Order summary</h2>
              <dl className="mt-5 space-y-3 font-sans text-sm">
                <div className="flex justify-between">
                  <dt className="text-text-dark/70">Subtotal ({count} item{count === 1 ? "" : "s"})</dt>
                  <dd className="text-text-dark">{formatGBP(subtotalPence)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-text-dark/70">Delivery</dt>
                  <dd className="text-text-dark/60">Calculated at checkout</dd>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-3 font-medium">
                  <dt className="text-text-dark">Total (inc. VAT)</dt>
                  <dd className="font-display text-lg text-brass">{formatGBP(subtotalPence)}</dd>
                </div>
              </dl>
              <Button onClick={checkout} variant="gold" size="lg" disabled={status === "loading"} className="mt-6 w-full">
                {status === "loading" ? (
                  <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Redirecting…</span>
                ) : (
                  <span className="flex items-center gap-2"><Lock className="h-4 w-4" aria-hidden="true" /> Secure checkout</span>
                )}
              </Button>
              <p role="status" aria-live="polite" className="mt-3 min-h-[1rem] text-center font-sans text-sm">
                {status === "error" && (
                  <span className="text-danger">
                    Checkout isn't available right now — please call{" "}
                    <a href={site.phoneHref} className="underline">{site.phoneDisplay}</a> to order.
                  </span>
                )}
              </p>
              <p className="mt-2 text-center font-mono text-[0.6rem] uppercase tracking-[0.12em] text-text-dark/45">
                Card · Apple Pay · Google Pay · Klarna
              </p>
              <Link to="/shop" className="mt-5 block text-center font-mono text-xs uppercase tracking-[0.12em] text-brass hover:text-brass-light">
                ← Continue shopping
              </Link>
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
