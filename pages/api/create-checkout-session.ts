// ─────────────────────────────────────────────────────────────
//  OnTimeCheck — API: Stripe Checkout session creation
//  POST /api/create-checkout-session
//  Body: { priceId: "price_...", mode: "subscription" | "payment" }
//
//  No webhook required — Stripe redirects to success/cancel pages.
//  ─────────────────────────────────────────────────────────────
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

export const config = {
  api: {
    bodyParser: true,
  },
};

export const runtime = 'edge';

let stripeClient: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY is not set.');
    }
    stripeClient = new Stripe(key);
  }
  return stripeClient;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { priceId, mode } = req.body;

    if (!priceId || !mode) {
      return res.status(400).json({ error: 'priceId and mode are required' });
    }

    const stripe = getStripe();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ontimecheck.pages.dev';

    const session = await stripe.checkout.sessions.create({
      mode: mode as 'subscription' | 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/pricing`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Checkout error:', err);
    return res.status(500).json({ error: message });
  }
}
