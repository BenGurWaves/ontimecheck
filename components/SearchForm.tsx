'use client';
import { useState } from 'react';

const airlines = [
  { code: 'AA', name: 'American Airlines' },
  { code: 'DL', name: 'Delta Air Lines' },
  { code: 'UA', name: 'United Airlines' },
  { code: 'WN', name: 'Southwest Airlines' },
  { code: 'B6', name: 'JetBlue Airways' },
  { code: 'AS', name: 'Alaska Airlines' },
  { code: 'NK', name: 'Spirit Airlines' },
  { code: 'F9', name: 'Frontier Airlines' },
  { code: 'G4', name: 'Allegiant Air' },
  { code: 'HA', name: 'Hawaiian Airlines' },
];

const airports = [
  { code: 'ATL', name: 'Atlanta' },
  { code: 'ORD', name: 'Chicago' },
  { code: 'DFW', name: 'Dallas/Fort Worth' },
  { code: 'DEN', name: 'Denver' },
  { code: 'LAX', name: 'Los Angeles' },
  { code: 'JFK', name: 'New York JFK' },
  { code: 'SFO', name: 'San Francisco' },
  { code: 'SEA', name: 'Seattle' },
  { code: 'LAS', name: 'Las Vegas' },
  { code: 'MCO', name: 'Orlando' },
];

export default function SearchForm({ onSearch }: { onSearch: (results: any, type: 'airline' | 'route') => void }) {
  const [mode, setMode] = useState<'airline' | 'route'>('airline');
  const [selectedAirline, setSelectedAirline] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'airline' && selectedAirline) {
        onSearch({
          airline: selectedAirline,
          onTimePct: 78.5,
          cancellationPct: 1.2,
          avgDelayMinutes: 24.3,
          delayCauseBreakdown: { carrier:35, weather:25, airTraffic:20, lateAircraft:20 },
          trendData: [75,76,78,80,77,79,80,82,78,76,78,78.5],
          month: '2024-06',
        }, 'airline');
      } else if (mode === 'route' && origin && destination) {
        onSearch({
          route: `${origin} to ${destination}`,
          airlines: [
            { code:'AA', onTimePct:82.1, avgDelay:18.5 },
            { code:'DL', onTimePct:79.3, avgDelay:22.1 },
            { code:'UA', onTimePct:76.8, avgDelay:25.7 },
          ],
          bestAirline:'AA',
          worstAirline:'UA',
          trendData:[78,80,82,81,79,80,81,83,82,80,81,82.1],
          month:'2024-06',
        }, 'route');
      }
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex gap-2">
        <button type="button" onClick={()=>setMode('airline')} className={`flex-1 py-3 border text-sm ${mode==='airline'?'bg-accent text-white border-accent':'border-line'}`}>By Airline</button>
        <button type="button" onClick={()=>setMode('route')} className={`flex-1 py-3 border text-sm ${mode==='route'?'bg-accent text-white border-accent':'border-line'}`}>By Route</button>
      </div>
      {mode==='airline' && (
        <div>
          <label className="block text-xs uppercase tracking-widest text-muted mb-2">Select Airline</label>
          <select value={selectedAirline} onChange={e=>setSelectedAirline(e.target.value)} className="w-full py-3 px-3 bg-transparent border border-line text-fg">
            <option value="">Select an airline</option>
            {airlines.map(a=> <option key={a.code} value={a.code}>{a.name} ({a.code})</option>)}
          </select>
        </div>
      )}
      {mode==='route' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted mb-2">Origin</label>
            <select value={origin} onChange={e=>setOrigin(e.target.value)} className="w-full py-3 px-3 bg-transparent border border-line text-fg">
              <option value="">Select origin</option>
              {airports.map(a=> <option key={a.code} value={a.code}>{a.name} ({a.code})</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted mb-2">Destination</label>
            <select value={destination} onChange={e=>setDestination(e.target.value)} className="w-full py-3 px-3 bg-transparent border border-line text-fg">
              <option value="">Select destination</option>
              {airports.map(a=> <option key={a.code} value={a.code}>{a.name} ({a.code})</option>)}
            </select>
          </div>
        </div>
      )}
      <button type="submit" disabled={loading} className="btn-glow w-full"><span>{loading?'Searching...':'Check Performance'}</span></button>
    </form>
  );
}
