'use client';

import { useState } from 'react';

interface StripeCheckoutProps {
  priceId: string;
  mode: 'subscription' | 'payment';
  planName: string;
}

export default function StripeCheckout({ priceId, mode, planName }: StripeCheckoutProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, mode }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      style={{
        display: 'inline-block',
        padding: '0.75rem 1.5rem',
        borderRadius: '0.5rem',
        backgroundColor: '#C0FF00',
        color: '#0A0A0F',
        fontWeight: '500',
        fontSize: '0.875rem',
        border: 'none',
        cursor: 'pointer',
        opacity: loading ? 0.5 : 1
      }}
    >
      {loading ? 'Processing...' : `Upgrade to ${planName}`}
    </button>
  );
}
