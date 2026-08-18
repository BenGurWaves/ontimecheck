// ─────────────────────────────────────────────────────────────
//  OnTimeCheck — API: Stripe Checkout session creation
//  POST /api/create-checkout-session
//  Body: { priceId: "price_...", mode: "subscription" | "payment" }
//
//  No webhook required — Stripe redirects to success/cancel pages.
//  Uses raw fetch to the Stripe REST API for Edge Runtime compat.
//  ─────────────────────────────────────────────────────────────
export const runtime = 'edge';

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await req.json();
    const { priceId, mode } = body;

    if (!priceId || !mode) {
      return new Response(JSON.stringify({ error: 'priceId and mode are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // PUBLIC key in client bundle — read from env at runtime
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ontimecheck.pages.dev';

    // PRIVATE key — server-side only via raw fetch
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
      return new Response(JSON.stringify({ error: 'STRIPE_SECRET_KEY is not set' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const params = new URLSearchParams();
    params.append('mode', mode);
    params.append('line_items[0][price]', priceId);
    params.append('line_items[0][quantity]', '1');
    params.append('success_url', `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`);
    params.append('cancel_url', `${baseUrl}/pricing`);

    const stripeResp = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    if (!stripeResp.ok) {
      const errorText = await stripeResp.text();
      return new Response(JSON.stringify({ error: `Stripe API error: ${stripeResp.status} ${errorText}` }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const session = await stripeResp.json();
    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Checkout error:', err);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
