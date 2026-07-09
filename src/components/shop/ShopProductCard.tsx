import { Link } from "react-router-dom";
import { Check, Plus } from "lucide-react";
import { useState } from "react";
import type { ShopProduct } from "@/data/shop";
import { OptimizedImage } from "@/components/primitives/OptimizedImage";
import { useCart, formatGBP } from "@/shop/CartContext";
import { cn } from "@/lib/cn";

export function ShopProductCard({ product }: { product: ShopProduct }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    add(product, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="on-dark group flex h-full flex-col overflow-hidden rounded-sm border border-white/10 bg-ink-soft transition-all duration-300 ease-editorial hover:-translate-y-1 hover:border-brass/40 hover:shadow-lift">
      <Link
        to={`/shop/${product.slug}`}
        className="relative block bg-bone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
        aria-label={product.name}
      >
        <OptimizedImage
          src={product.image}
          alt={product.name}
          treatment={false}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-square w-full"
          imgClassName="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {!product.inStock && (
          <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-text-dark/80">
            Out of stock
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-brass">{product.category}</p>
        <h3 className="mt-2 flex-1 font-sans text-sm font-medium leading-snug text-text-dark">
          <Link to={`/shop/${product.slug}`} className="transition-colors hover:text-brass">
            {product.name}
          </Link>
        </h3>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-display text-xl font-light text-brass">{formatGBP(product.pricePence)}</span>
          <button
            type="button"
            onClick={onAdd}
            disabled={!product.inStock}
            aria-label={`Add ${product.name} to basket`}
            className={cn(
              "inline-flex h-10 min-w-[44px] items-center justify-center gap-1.5 rounded-sm border px-3 font-sans text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass disabled:opacity-40",
              added
                ? "border-success bg-success/15 text-success"
                : "border-brass/50 text-brass hover:bg-brass hover:text-ink",
            )}
          >
            {added ? <Check className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
            {added ? "Added" : "Add"}
          </button>
        </div>
      </div>
    </article>
  );
}
