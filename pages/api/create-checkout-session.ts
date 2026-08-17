// ─────────────────────────────────────────────────────────────
//  OnTimeCheck — API: Stripe Checkout session creation
//  POST /api/create-checkout-session
//  Body: { priceId: "price_...", mode: "subscription" | "payment" }
//
//  No webhook required — Stripe redirects to success/cancel pages.
//  Uses raw fetch to the Stripe REST API to be compatible with
//  the Cloudflare Pages Edge Runtime (the `stripe` npm package
//  requires Node.js APIs that are not available in the Edge).
//  ─────────────────────────────────────────────────────────────
import type { NextApiRequest, NextApiResponse } from 'next';

export const runtime = 'edge';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { priceId, mode } = req.body;

    if (!priceId || !mode) {
      return res.status(400).json({ error: 'priceId and mode are required' });
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ontimecheck.pages.dev';
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
      return res.status(500).json({ error: 'STRIPE_SECRET_KEY is not set' });
    }

    const params = new URLSearchParams();
    params.append('mode', mode as string);
    params.append('line_items[0][price]', priceId);
    params.append('line_items[0][quantity]', '1');
    params.append('success_url', `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`);
    params.append('cancel_url', `${baseUrl}/pricing`);

    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(500).json({ error: `Stripe API error: ${response.status} ${errorText}` });
    }

    const session = await response.json();
    return res.status(200).json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Checkout error:', err);
    return res.status(500).json({ error: message });
  }
}
