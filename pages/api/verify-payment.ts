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

  const { sessionId } = req.body;

  try {
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      // Update user's subscription in Supabase
      // This would update the user's record in your database
      // For now, just return success
      res.status(200).json({ success: true, session });
    } else {
      res.status(400).json({ success: false, error: 'Payment not completed' });
    }
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ success: false, error: 'Verification failed' });
  }
}
