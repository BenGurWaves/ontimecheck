export default function HowToRead() {
  return (
    <section className="bg-gray-800 rounded-lg p-6 mb-8">
      <h2 className="text-lg font-medium mb-4">How to Read On-Time Performance Data</h2>
      <div className="space-y-4 text-sm text-gray-300">
        <p>
          On-time percentage reflects the proportion of flights that arrived or departed within 15 minutes of the scheduled time.
        </p>
        <p>
          Cancellation rate is the percentage of scheduled flights that were cancelled.
        </p>
        <p>
          Average delay is the mean delay in minutes for flights that were delayed (excluding cancellations).
        </p>
        <p>
          Delay causes are categorized by the Bureau of Transportation Statistics into carrier-controllable (maintenance, crew, etc.), weather, national air system (air traffic control), and late-arriving aircraft.
        </p>
      </div>
    </section>
  );
}
