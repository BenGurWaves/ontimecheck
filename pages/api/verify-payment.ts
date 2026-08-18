// ─────────────────────────────────────────────────────────────
//  OnTimeCheck — API: Verify Stripe payment status
//  POST /api/verify-payment
//  Body: { sessionId: "cs_..." }
//
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
    const { sessionId } = body;

    if (!sessionId) {
      return new Response(JSON.stringify({ success: false, error: 'sessionId is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // PRIVATE key — server-side only
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
      return new Response(JSON.stringify({ success: false, error: 'STRIPE_SECRET_KEY is not set' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const stripeResp = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${stripeKey}`,
      },
    });

    if (!stripeResp.ok) {
      const errorText = await stripeResp.text();
      return new Response(JSON.stringify({ success: false, error: `Stripe API error: ${stripeResp.status} ${errorText}` }), {
        status: stripeResp.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const session = await stripeResp.json();

    if (session.payment_status === 'paid') {
      return new Response(JSON.stringify({ success: true, session }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ success: false, error: 'Payment not completed' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Verification error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Verification failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
