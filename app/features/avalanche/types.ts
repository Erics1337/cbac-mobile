export type DangerLevel = 1 | 2 | 3 | 4 | 5;

export interface AvalancheProblem {
  name: string;
  likelihood: string;
  rank: number;
  size: [number, number];
}

export interface DangerRating {
  valid_day: 'current' | 'tomorrow';
  lower: DangerLevel;
  middle: DangerLevel;
  upper: DangerLevel;
}

export interface AvalancheForecast {
  forecast_zone: Array<{
    name: string;
    id: number;
  }>;
  published_time: string;
  expires_time: string;
  author: string;
  danger: DangerRating[];
  forecast_avalanche_problems: AvalancheProblem[];
  bottom_line: string;
}

export interface Zone {
  id: number;
  name: string;
  center_id: string;
}

export const CBAC_ZONES: Zone[] = [
  { id: 2118, name: 'Aspen', center_id: 'CBAC' },
  { id: 2119, name: 'Gunnison', center_id: 'CBAC' },
];
