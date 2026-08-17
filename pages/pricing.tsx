import Link from 'next/link';
import StripeCheckout from '@/components/StripeCheckout';

export default function Pricing() {
  return (
    <main className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">Pricing</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-medium mb-4">Free Tier</h2>
            <p className="text-sm text-gray-300 mb-4">
              Unlimited searches, up to 3 watched items, email alerts for significant changes.
            </p>
            <p className="text-2xl font-bold">Free</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border-l-4 border-accent-green">
            <h2 className="text-xl font-medium mb-4">Pro Tier</h2>
            <p className="text-sm text-gray-300 mb-4">
              Unlimited watched items, side-by-side comparisons (up to 4 airlines or routes), downloadable historical trend reports.
            </p>
            <div className="mb-4">
              <p className="text-2xl font-bold">$5.99/month</p>
              <p className="text-sm text-gray-400">or $49/year (save 30%)</p>
            </div>
            <div className="space-y-2">
              <StripeCheckout 
                priceId="price_monthly_pro" 
                mode="subscription" 
                planName="Pro Monthly"
              />
              <StripeCheckout 
                priceId="price_yearly_pro" 
                mode="subscription" 
                planName="Pro Yearly"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <Link href="/" className="text-accent-green hover:underline">← Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
