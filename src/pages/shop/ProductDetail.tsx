import { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { Check, Minus, Plus, Truck, ShieldCheck } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { Button } from "@/components/primitives/Button";
import { Breadcrumb } from "@/components/Breadcrumb";
import { OptimizedImage } from "@/components/primitives/OptimizedImage";
import { GoldRule } from "@/components/primitives/bits";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { CTASection } from "@/components/CTASection";
import { getProductBySlug, shopProducts } from "@/data/shop";
import { site } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import { useCart, formatGBP } from "@/shop/CartContext";

export function ProductDetail() {
  const { slug } = useParams();
  const product = slug ? getProductBySlug(slug) : undefined;
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return <Navigate to="/shop" replace />;

  const related = shopProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const onAdd = () => {
    add(product, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    category: product.category,
    image: `${site.url}/img/${product.image}-800.jpg`,
    description: product.description,
    brand: { "@type": "Brand", name: "Ceilings Direct" },
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: product.price.toFixed(2),
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${site.url}/shop/${product.slug}`,
    },
  };

  return (
    <>
      <Seo
        title={`${product.name} | Direct Interiors Shop`}
        description={`Buy ${product.name} online${product.sku ? ` (SKU ${product.sku})` : ""}. ${product.description.slice(0, 110)}`}
        path={`/shop/${product.slug}`}
        image={product.image}
        jsonLd={[breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Shop", path: "/shop" }, { name: product.name }]), productJsonLd]}
      />

      <Section tone="dark" plaster className="pt-28 md:pt-32">
        <div className="mb-8">
          <Breadcrumb crumbs={[{ name: "Home", path: "/" }, { name: "Shop", path: "/shop" }, { name: product.name }]} />
        </div>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* image */}
          <Reveal>
            <div className="overflow-hidden rounded-sm border border-white/10 bg-bone">
              <OptimizedImage src={product.image} alt={product.name} treatment={false} priority sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-square w-full" imgClassName="object-contain p-8" />
            </div>
          </Reveal>

          {/* details */}
          <Reveal delay={0.05}>
            <p className="eyebrow mb-3">{product.category}</p>
            <h1 className="font-display text-display-sm text-text-dark md:text-display-md">{product.name}</h1>
            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-display text-4xl font-light text-brass">{formatGBP(product.pricePence)}</span>
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-text-dark/50">inc. VAT</span>
            </div>
            {product.sku && <p className="mt-2 font-mono text-xs text-text-dark/50">SKU: {product.sku}</p>}

            <div className="mt-4 flex items-center gap-2 font-sans text-sm">
              <span className={product.inStock ? "text-success" : "text-danger"}>
                {product.inStock ? "● In stock" : "● Out of stock"}
              </span>
            </div>

            {/* quantity + add */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center rounded-sm border border-white/20">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-12 w-12 items-center justify-center text-text-dark/80 transition-colors hover:text-brass focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <span className="w-10 text-center font-mono text-sm text-text-dark" aria-live="polite" aria-label={`Quantity ${qty}`}>
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(999, q + 1))}
                  className="flex h-12 w-12 items-center justify-center text-text-dark/80 transition-colors hover:text-brass focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <Button onClick={onAdd} variant="gold" size="lg" disabled={!product.inStock}>
                {added ? (
                  <span className="flex items-center gap-2">
                    <Check className="h-4 w-4" aria-hidden="true" /> Added to basket
                  </span>
                ) : (
                  "Add to basket"
                )}
              </Button>
              <Link to="/cart" className="font-mono text-xs uppercase tracking-[0.12em] text-brass hover:text-brass-light">
                View basket →
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6 font-sans text-sm text-text-dark/70">
              <span className="flex items-center gap-2"><Truck className="h-4 w-4 text-brass" aria-hidden="true" /> UK delivery or free Deeside collection</span>
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-brass" aria-hidden="true" /> Secure Stripe checkout</span>
            </div>

            {/* specs */}
            {product.specs.length > 0 && (
              <div className="mt-8">
                <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-brass">Specification</h2>
                <GoldRule className="mb-4 mt-3" width="40px" />
                <dl className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                  {product.specs.map((s, i) => (
                    <div key={i} className="flex justify-between gap-4 border-b border-white/5 py-2">
                      <dt className="font-sans text-sm text-text-dark/60">{s.k}</dt>
                      <dd className="text-right font-sans text-sm text-text-dark">{s.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            {product.description && (
              <p className="mt-6 max-w-prose font-sans font-light leading-relaxed text-text-dark/75">{product.description}</p>
            )}
          </Reveal>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="light" aria-labelledby="related-shop-heading">
          <SectionHeading eyebrow="More from this range" title={<span id="related-shop-heading">You might also need</span>} />
          <div className="mt-10 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {related.map((p) => (
              <ShopProductCard key={p.id} product={p} />
            ))}
          </div>
        </Section>
      )}

      <CTASection eyebrow="Trade enquiry" title="Need a bigger order?" body="For project quantities or bulk pricing, talk to us — we'll sort a price." primaryLabel="Talk to the Team" primaryTo="/contact" />
    </>
  );
}
