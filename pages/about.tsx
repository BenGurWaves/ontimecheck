import Link from 'next/link';

export default function About() {
  return (
    <div className="magazine-grid mt-12 mb-16">
      <div className="full">
        <h1 className="text-4xl font-bold mb-6">About OnTimeCheck</h1>
        <p className="text-lg text-muted mb-8">
          OnTimeCheck is a lookup tool showing historical on-time performance, delay causes, and cancellation rates by airline and specific route, sourced from the Bureau of Transportation Statistics' official Airline On-Time Performance data.
        </p>
        <p className="text-sm text-muted mb-6">
          Disclaimer: Historical performance does not guarantee future results for any individual flight. Data has an approximate 3-month reporting lag and covers major carriers only. Always check real-time flight status directly with your airline before travel.
        </p>
        <div className="motion-card mt-8">
          <h2 className="text-xl font-semibold mb-4">How We Work</h2>
          <p className="text-muted">
            We download and parse monthly BTS data files, aggregating statistics by airline and route. Our search queries these pre-aggregated tables for fast performance.
          </p>
        </div>
        <div className="mt-8">
          <a href="/" className="btn-glow"><span>← Back to Home</span></a>
        </div>
      </div>
    </div>
  );
}
