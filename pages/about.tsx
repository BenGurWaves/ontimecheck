import Link from 'next/link';

export default function About() {
  return (
    <main className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">
          About OnTimeCheck
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          OnTimeCheck is a lookup tool showing historical on-time performance, delay causes, and cancellation rates by airline and specific route, sourced from the Bureau of Transportation Statistics' official Airline On-Time Performance data.
        </p>
        <p className="text-sm text-gray-400 mb-6">
          Disclaimer: Historical performance does not guarantee future results for any individual flight. Data has an approximate 3-month reporting lag and covers major carriers only. Always check real-time flight status directly with your airline before travel.
        </p>
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">How We Work</h2>
          <p className="text-sm text-gray-300">
            We download and parse monthly BTS data files, aggregating statistics by airline and route. Our search queries these pre-aggregated tables for fast performance.
          </p>
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
