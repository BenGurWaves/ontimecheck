import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Success() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    if (sessionId) {
      // Verify payment completed
      verifyPayment(sessionId);
    }
  }, [sessionId]);

  const verifyPayment = async (sessionId: string) => {
    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4 text-center">
        {status === 'loading' && (
          <div>
            <h1 className="text-4xl font-bold mb-6">Verifying payment...</h1>
            <p>Please wait while we confirm your payment.</p>
          </div>
        )}

        {status === 'success' && (
          <div>
            <h1 className="text-4xl font-bold mb-6 text-accent-green">Payment Successful!</h1>
            <p className="mb-6">Your subscription has been activated.</p>
            <a href="/" className="inline-block px-6 py-3 rounded-lg bg-accent-green text-background font-medium">
              Return to Home
            </a>
          </div>
        )}

        {status === 'error' && (
          <div>
            <h1 className="text-4xl font-bold mb-6">Payment Verification Failed</h1>
            <p className="mb-6">There was an issue verifying your payment. Please contact support.</p>
            <a href="/pricing" className="inline-block px-6 py-3 rounded-lg bg-accent-green text-background font-medium">
              Return to Pricing
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
