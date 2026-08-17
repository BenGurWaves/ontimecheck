// ─────────────────────────────────────────────────────────────
//  OnTimeCheck — API: Verify Stripe payment status
//  POST /api/verify-payment
//  Body: { sessionId: "cs_..." }
//
//  Uses raw fetch to the Stripe REST API for Edge Runtime
//  compatibility (the `stripe` npm package is Node-only).
//  ─────────────────────────────────────────────────────────────
import type { NextApiRequest, NextApiResponse } from 'next';

export const runtime = 'edge';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({ success: false, error: 'sessionId is required' });
  }

  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
      return res.status(500).json({ success: false, error: 'STRIPE_SECRET_KEY is not set' });
    }

    const response = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${stripeKey}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(500).json({ success: false, error: `Stripe API error: ${response.status} ${errorText}` });
    }

    const session = await response.json();

    if (session.payment_status === 'paid') {
      // Success — client can now unlock paid features
      res.status(200).json({ success: true, session });
    } else {
      res.status(400).json({ success: false, error: 'Payment not completed' });
    }
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ success: false, error: 'Verification failed' });
  }
}
