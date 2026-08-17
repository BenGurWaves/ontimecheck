export default function PricingTeaser() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3">Pro</h2>
      <p className="text-muted mb-4">Free: unlimited searches, 3 watched items. Pro: unlimited watches, 4-way compare, downloadable reports.</p>
      <div className="flex gap-3">
        <a href="/pricing" className="btn-glow"><span>Free tier</span></a>
        <a href="/pricing" className="btn-glow"><span>Pro $5.99/mo</span></a>
      </div>
    </div>
  );
}
