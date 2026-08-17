import Link from 'next/link';

export default function Pricing() {
  return (
    <main className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">
          Pricing
        </h1>
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-medium mb-4">Free Tier</h2>
          <p className="text-sm text-gray-300 mb-4">
            Unlimited searches, up to 3 watched items, email alerts for significant changes.
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-medium mb-4">Pro Tier</h2>
          <p className="text-sm text-gray-300 mb-4">
            $5.99/month or $49/year (save 30%). Unlimited watched items, side-by-side comparisons (up to 4 airlines or routes), downloadable historical trend reports.
          </p>
          <div className="mt-6">
            <a href="#" className="inline-block px-6 py-3 rounded-lg bg-accent-green text-background font-medium text-sm hover:bg-accent-green-light transition-colors">
              Upgrade to Pro
            </a>
          </div>
        </div>
        <div className="mt-8">
          <Link href="/" className="text-accent-green hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
