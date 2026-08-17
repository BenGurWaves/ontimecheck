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
      // Simulate API call - in real app, this would be a call to our backend
      // For now, we'll mock some data
      if (mode === 'airline' && selectedAirline) {
        const mockResults = {
          airline: selectedAirline,
          onTimePct: 78.5,
          cancellationPct: 1.2,
          avgDelayMinutes: 24.3,
          delayCauseBreakdown: {
            carrier: 35,
            weather: 25,
            airTraffic: 20,
            lateAircraft: 20,
          },
          trendData: [75, 76, 78, 80, 77, 79, 80, 82, 78, 76, 78, 78.5], // last 12 months
          month: '2024-06', // most recent data
        };
        onSearch(mockResults, 'airline');
      } else if (mode === 'route' && origin && destination) {
        const mockResults = {
          route: `${origin} to ${destination}`,
          airlines: [
            { code: 'AA', onTimePct: 82.1, avgDelay: 18.5 },
            { code: 'DL', onTimePct: 79.3, avgDelay: 22.1 },
            { code: 'UA', onTimePct: 76.8, avgDelay: 25.7 },
          ],
          bestAirline: 'AA',
          worstAirline: 'UA',
          trendData: [78, 80, 82, 81, 79, 80, 81, 83, 82, 80, 81, 82.1], // for best airline
          month: '2024-06',
        };
        onSearch(mockResults, 'route');
      }
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => setMode('airline')}
          className={`flex-1 px-4 py-3 font-medium text-sm transition-colors border ${mode === 'airline' ? 'bg-accent text-white' : 'border-line'}`}
        >
          By Airline
        </button>
        <button
          onClick={() => setMode('route')}
          className={`flex-1 px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
            mode === 'route'
              ? 'bg-accent-green text-background'
              : 'bg-gray-800 hover:bg-gray-700 text-white'
          }`}
        >
          By Route
        </button>
      </div>

      {mode === 'airline' && (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-300">
            Select Airline
          </label>
          <select
            value={selectedAirline}
            onChange={(e) => setSelectedAirline(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-accent-green"
          >
            <option value="">Select an airline</option>
            {airlines.map((airline) => (
              <option key={airline.code} value={airline.code}>
                {airline.name} ({airline.code})
              </option>
            ))}
          </select>
        </div>
      )}

      {mode === 'route' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Origin Airport
              </label>
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-accent-green"
              >
                <option value="">Select origin</option>
                {airports.map((airport) => (
                  <option key={airport.code} value={airport.code}>
                    {airport.name} ({airport.code})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Destination Airport
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-accent-green"
              >
                <option value="">Select destination</option>
                {airports.map((airport) => (
                  <option key={airport.code} value={airport.code}>
                    {airport.name} ({airport.code})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 rounded-lg bg-accent-green text-background font-medium text-sm hover:bg-accent-green-light transition-colors disabled:opacity-50"
      >
        {loading ? 'Searching...' : 'Check Performance'}
      </button>
    </form>
  );
}
