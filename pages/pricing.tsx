import Link from 'next/link';
import StripeCheckout from '@/components/StripeCheckout';

// ─────────────────────────────────────────────────────────────────
//  Price IDs are intentionally hardcoded in source (not env vars).
//  Created via Stripe API: $5/month (500¢) and $50/year (5000¢).
//  ─────────────────────────────────────────────────────────────────
const PRICE_MONTHLY = 'price_1U5cS8PRyQBaeqcXYrCG1xD6';
const PRICE_YEARLY = 'price_1U5cS8PRyQBaeqcXb0QhbcUW';

export default function Pricing() {
  return (
    <div className="magazine-grid mt-12 mb-16">
      <div className="full">
        <h1 className="text-4xl font-bold mb-6">Pricing</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="motion-card">
            <h2 className="text-xl font-semibold mb-4">Free Tier</h2>
            <p className="text-muted mb-4">
              Unlimited searches, up to 3 watched items, email alerts for significant changes.
            </p>
            <p className="text-2xl font-bold">Free</p>
          </div>

          <div className="motion-card border-l-4 border-accent">
            <h2 className="text-xl font-semibold mb-4">Pro Tier</h2>
            <p className="text-muted mb-4">
              Unlimited watched items, side-by-side comparisons (up to 4 airlines or routes), downloadable historical trend reports.
            </p>
            <div className="mb-4">
              <p className="text-2xl font-bold">$5/month</p>
              <p className="text-sm text-muted">or $50/year (save 17%)</p>
            </div>
            <div className="space-y-4">
              <StripeCheckout
                priceId={PRICE_MONTHLY}
                mode="subscription"
                planName="Pro Monthly"
              />
              <StripeCheckout
                priceId={PRICE_YEARLY}
                mode="subscription"
                planName="Pro Yearly"
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link href="/" passHref legacyBehavior>
            <a href="/" className="btn-glow"><span>← Back to Home</span></a>
          </Link>
        </div>
      </div>
    </div>
  );
}
