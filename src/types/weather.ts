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

// Weather model types - All available models from Open-Meteo
export type WeatherModel =
  | 'best_match'
  | 'ecmwf_ifs025'
  | 'ecmwf_ifs'
  | 'ecmwf_aifs025'
  | 'gfs_seamless'
  | 'gfs_global'
  | 'gfs_hrrr'
  | 'gfs_graphcast025'
  | 'meteofrance_seamless'
  | 'meteofrance_arpege_world'
  | 'meteofrance_arpege_europe'
  | 'meteofrance_arome_france'
  | 'jma_seamless'
  | 'jma_msm'
  | 'jma_gsm'
  | 'gem_seamless'
  | 'gem_global'
  | 'gem_regional'
  | 'gem_hrdps_continental'
  | 'icon_seamless'
  | 'icon_global'
  | 'icon_eu'
  | 'icon_d2'
  | 'bom_access_global'
  | 'bom_access_global_ensemble'
  | 'metno_nordic'
  | 'knmi_seamless'
  | 'knmi_harmonie_arome_europe'
  | 'knmi_harmonie_arome_netherlands'
  | 'dmi_seamless'
  | 'dmi_harmonie_arome_europe'
  | 'ukmo_seamless'
  | 'ukmo_global_deterministic_10km'
  | 'ukmo_uk_deterministic_2km'
  | 'arpae_cosmo_seamless'
  | 'arpae_cosmo_2i'
  | 'arpae_cosmo_2i_ruc'
  | 'arpae_cosmo_5m';

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
