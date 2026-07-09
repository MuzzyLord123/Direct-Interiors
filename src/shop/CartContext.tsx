import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { ShopProduct } from "@/data/shop";

export interface CartLine {
  id: string;
  slug: string;
  name: string;
  sku: string;
  pricePence: number;
  image: string;
  qty: number;
}

interface CartState {
  lines: CartLine[];
  count: number;
  subtotalPence: number;
  add: (product: ShopProduct, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartState | null>(null);
const KEY = "di-cart-v1";

function load(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  // hydrate from localStorage after mount (SSR-safe: server renders empty cart)
  useEffect(() => {
    setLines(load());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable */
    }
  }, [lines]);

  const value = useMemo<CartState>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotalPence = lines.reduce((n, l) => n + l.pricePence * l.qty, 0);
    return {
      lines,
      count,
      subtotalPence,
      add: (p, qty = 1) =>
        setLines((prev) => {
          const found = prev.find((l) => l.id === p.id);
          if (found) return prev.map((l) => (l.id === p.id ? { ...l, qty: Math.min(l.qty + qty, 999) } : l));
          return [...prev, { id: p.id, slug: p.slug, name: p.name, sku: p.sku, pricePence: p.pricePence, image: p.image, qty }];
        }),
      setQty: (id, qty) =>
        setLines((prev) => (qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty: Math.min(qty, 999) } : l)))),
      remove: (id) => setLines((prev) => prev.filter((l) => l.id !== id)),
      clear: () => setLines([]),
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartState {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export const formatGBP = (pence: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(pence / 100);
