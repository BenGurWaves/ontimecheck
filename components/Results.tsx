'use client';

import { Chart } from '@/components/Chart';
import type { AirlineResults, RouteResults } from '@/types';

interface ResultsProps {
  results: AirlineResults | RouteResults;
  type: 'airline' | 'route';
}

export default function Results({ results, type }: ResultsProps) {
  if (type === 'airline' && 'airline' in results) {
    const airlineData = results as AirlineResults;
    return (
      <div className="space-y-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">
            Performance for {airlineData.airline}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-400 mb-2">
                On-Time Percentage
              </h3>
              <p className="text-3xl font-bold text-accent-green">
                {airlineData.onTimePct.toFixed(1)}%
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Last 12 months
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-400 mb-2">
                Cancellation Rate
              </h3>
              <p className="text-3xl font-bold text-accent-green">
                {airlineData.cancellationPct.toFixed(1)}%
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Last 12 months
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-400 mb-2">
                Average Delay
              </h3>
              <p className="text-3xl font-bold text-accent-green">
                {airlineData.avgDelayMinutes.toFixed(1)} min
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Last 12 months
              </p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">
              Delay Cause Breakdown
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="flex justify-between">
                  <span>Carrier:</span>
                  <span className="text-accent-green">
                    {airlineData.delayCauseBreakdown.carrier}%
                  </span>
                </p>
              </div>
              <div>
                <p className="flex justify-between">
                  <span>Weather:</span>
                  <span className="text-accent-green">
                    {airlineData.delayCauseBreakdown.weather}%
                  </span>
                </p>
              </div>
              <div>
                <p className="flex justify-between">
                  <span>Air Traffic:</span>
                  <span className="text-accent-green">
                    {airlineData.delayCauseBreakdown.airTraffic}%
                  </span>
                </p>
              </div>
              <div>
                <p className="flex justify-between">
                  <span>Late Aircraft:</span>
                  <span className="text-accent-green">
                    {airlineData.delayCauseBreakdown.lateAircraft}%
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">
              On-Time Trend (Last 12 Months)
            </h3>
            <Chart data={airlineData.trendData} label="On-Time %" />
            <p className="text-xs text-gray-500 mt-2">
              Most recent data reflects {airlineData.month} — BTS publishes with an
              approximate 3-month reporting lag
            </p>
          </div>
        </div>
      </div>
    );
  } else if (type === 'route' && 'route' in results) {
    const routeData = results as RouteResults;
    return (
      <div className="space-y-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">
            Performance for Route: {routeData.route}
          </h2>
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">
              Airline Performance on This Route
            </h3>
            <div className="space-y-4">
              {routeData.airlines.map((airline) => (
                <div
                  key={airline.code}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    airline.code === routeData.bestAirline
                      ? 'border-l-4 border-accent-green bg-gray-700'
                      : airline.code === routeData.worstAirline
                      ? 'border-l-4 border-red-500 bg-gray-700'
                      : 'border-l-4 border-gray-600 bg-gray-800'
                  }`}
                >
                  <div>
                    <p className="font-medium">{airline.code}</p>
                    <p className="text-sm text-gray-400">
                      On-Time: {airline.onTimePct.toFixed(1)}% | Avg Delay: {
                        airline.avgDelay.toFixed(1)
                      } min
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">
              Best Performing Airline: <span className="text-accent-green">{routeData.bestAirline}</span>
            </h3>
            <p className="text-sm text-gray-400">
              With {routeData.airlines.find(
                (a) => a.code === routeData.bestAirline
              )?.onTimePct.toFixed(1)}% on-time performance
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">
              On-Time Trend for Best Airline ({routeData.bestAirline})
            </h3>
            <Chart data={routeData.trendData} label="On-Time %" />
            <p className="text-xs text-gray-500 mt-2">
              Most recent data reflects {routeData.month} — BTS publishes with an
              approximate 3-month reporting lag
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return null;
}
