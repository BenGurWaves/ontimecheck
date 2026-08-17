export default function PricingTeaser() {
  return (
    <section className="motion-card">
      <h2 className="text-lg font-medium mb-4">Get More Insights with OnTimeCheck Pro</h2>
      <p className="text-sm text-gray-300 mb-4">
        Free tier includes unlimited searches and up to 3 watched items. Upgrade for unlimited watched items,
        side-by-side comparisons, and downloadable reports.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          className="flex-1 px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium text-sm transition-colors"
        >
          Free Tier
        </button>
        <button
          className="flex-1 px-4 py-3 rounded-lg bg-accent-green text-background font-medium text-sm hover:bg-accent-green-light transition-colors"
        >
          Pro - $5.99/month
        </button>
      </div>
    </section>
  );
}
