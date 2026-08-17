export default function HowToRead() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3">How to read</h2>
      <div className="text-muted space-y-3">
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
