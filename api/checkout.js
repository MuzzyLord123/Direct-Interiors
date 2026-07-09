// Vercel serverless function: create a Stripe Checkout Session from the basket.
// Prices are validated SERVER-SIDE from api/products.json — client-sent amounts
// are ignored. Stripe Checkout provides card, Apple Pay, Google Pay, Klarna and
// Link automatically (enable them in your Stripe dashboard's payment methods).
//
// Required env var (set in Vercel → Settings → Environment Variables):
//   STRIPE_SECRET_KEY   e.g. sk_live_... (or sk_test_... for testing)
import Stripe from "stripe";
import { createRequire } from "node:module";

// Static require so Vercel's function bundler ships products.json alongside it.
const require = createRequire(import.meta.url);
const catalog = require("./products.json");

// Delivery options (TODO(client): confirm real rates). Free collection + flat UK delivery.
const UK_DELIVERY_PENCE = 1500;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    // Not configured yet — the client shows a "call us to order" fallback.
    return res.status(503).json({ error: "Payments are not configured yet." });
  }

  const origin = req.headers.origin || (req.headers.host ? `https://${req.headers.host}` : "");

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const items = Array.isArray(body.items) ? body.items : [];
    if (!items.length) return res.status(400).json({ error: "Your basket is empty." });

    const lineItems = [];
    for (const it of items) {
      const p = catalog[String(it.id)];
      if (!p || p.inStock === false) continue;
      const qty = Math.max(1, Math.min(999, parseInt(it.qty, 10) || 1));
      lineItems.push({
        quantity: qty,
        price_data: {
          currency: "gbp",
          unit_amount: p.pricePence, // authoritative, server-side price
          product_data: {
            name: p.name,
            metadata: { sku: p.sku || "" },
            ...(p.image && origin ? { images: [`${origin}/img/${p.image}-800.jpg`] } : {}),
          },
        },
      });
    }
    if (!lineItems.length) return res.status(400).json({ error: "No purchasable items in basket." });

    const stripe = new Stripe(secret);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      // Stripe auto-selects enabled payment methods (card, Apple/Google Pay, Klarna, Link).
      billing_address_collection: "auto",
      phone_number_collection: { enabled: true },
      shipping_address_collection: { allowed_countries: ["GB"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "gbp" },
            display_name: "Free collection — Garden City, Deeside",
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: UK_DELIVERY_PENCE, currency: "gbp" },
            display_name: "UK delivery",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 2 },
              maximum: { unit: "business_day", value: 5 },
            },
          },
        },
      ],
      success_url: `${origin}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop/cancelled`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("checkout error:", err?.message || err);
    return res.status(500).json({ error: "Something went wrong creating your checkout." });
  }
}
