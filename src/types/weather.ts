// Weather variable types
export interface WeatherVariable {
  id: string;
  name: string;
  unit: string;
  category: 'temperature' | 'precipitation' | 'wind' | 'pressure' | 'humidity' | 'cloud' | 'other';
}

// Location data
export interface Location {
  latitude: number;
  longitude: number;
  name?: string;
  timezone?: string;
}

// Time range for queries
export interface TimeRange {
  start: string; // ISO 8601 date
  end: string;   // ISO 8601 date
}

// Weather data point
export interface WeatherDataPoint {
  time: string;
  [key: string]: number | string;
}

// Historical weather data response
export interface HistoricalWeatherData {
  latitude: number;
  longitude: number;
  timezone: string;
  elevation: number;
  hourly?: {
    time: string[];
    [key: string]: number[] | string[];
  };
  daily?: {
    time: string[];
    [key: string]: number[] | string[];
  };
}

// Forecast weather data response
export interface ForecastWeatherData {
  latitude: number;
  longitude: number;
  timezone: string;
  elevation: number;
  current?: {
    time: string;
    [key: string]: number | string;
  };
  hourly?: {
    time: string[];
    [key: string]: number[] | string[];
  };
  daily?: {
    time: string[];
    [key: string]: number[] | string[];
  };
}

// Weather model types
export type WeatherModel =
  | 'best_match'
  | 'gfs_global'
  | 'ecmwf_ifs'
  | 'meteofrance_arpege'
  | 'jma_gsm'
  | 'icon_global'
  | 'gem_global';

// Chart configuration
export interface ChartConfig {
  variables: string[];
  chartType: 'line' | 'bar';
  showGrid: boolean;
  showLegend: boolean;
  tension: number;
}

// User preferences
export interface UserPreferences {
  location: Location;
  timeRange: TimeRange;
  selectedVariables: string[];
  model: WeatherModel;
  chartConfig: ChartConfig;
  temperatureUnit: 'celsius' | 'fahrenheit';
  windSpeedUnit: 'kmh' | 'ms' | 'mph' | 'kn';
  precipitationUnit: 'mm' | 'inch';
}
