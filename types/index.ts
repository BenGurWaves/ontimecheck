export interface AirlineResults {
  airline: string;
  onTimePct: number;
  cancellationPct: number;
  avgDelayMinutes: number;
  delayCauseBreakdown: {
    carrier: number;
    weather: number;
    airTraffic: number;
    lateAircraft: number;
  };
  trendData: number[];
  month: string;
}

export interface RouteResults {
  route: string;
  airlines: Array<{
    code: string;
    onTimePct: number;
    avgDelay: number;
  }>;
  bestAirline: string;
  worstAirline: string;
  trendData: number[];
  month: string;
}

export type Results = AirlineResults | RouteResults;
