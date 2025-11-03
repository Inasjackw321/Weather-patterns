import type {
  Location,
  TimeRange,
  HistoricalWeatherData,
  ForecastWeatherData,
  WeatherModel,
} from '../types/weather';

const HISTORICAL_API = 'https://archive-api.open-meteo.com/v1/archive';
const FORECAST_API = 'https://api.open-meteo.com/v1/forecast';
const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';

/**
 * Fetch historical weather data from Open-Meteo Archive API
 */
export async function fetchHistoricalData(
  location: Location,
  timeRange: TimeRange,
  variables: string[],
  options: {
    temperatureUnit?: 'celsius' | 'fahrenheit';
    windSpeedUnit?: 'kmh' | 'ms' | 'mph' | 'kn';
    precipitationUnit?: 'mm' | 'inch';
    timezone?: string;
  } = {}
): Promise<HistoricalWeatherData> {
  const params = new URLSearchParams({
    latitude: location.latitude.toString(),
    longitude: location.longitude.toString(),
    start_date: timeRange.start,
    end_date: timeRange.end,
    hourly: variables.join(','),
    timezone: options.timezone || 'auto',
  });

  if (options.temperatureUnit) {
    params.append('temperature_unit', options.temperatureUnit);
  }
  if (options.windSpeedUnit) {
    params.append('wind_speed_unit', options.windSpeedUnit);
  }
  if (options.precipitationUnit) {
    params.append('precipitation_unit', options.precipitationUnit);
  }

  const response = await fetch(`${HISTORICAL_API}?${params.toString()}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(errorData.reason || errorData.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

/**
 * Fetch weather forecast data from Open-Meteo Forecast API
 */
export async function fetchForecastData(
  location: Location,
  variables: string[],
  options: {
    model?: WeatherModel;
    temperatureUnit?: 'celsius' | 'fahrenheit';
    windSpeedUnit?: 'kmh' | 'ms' | 'mph' | 'kn';
    precipitationUnit?: 'mm' | 'inch';
    timezone?: string;
    forecastDays?: number;
  } = {}
): Promise<ForecastWeatherData> {
  const params = new URLSearchParams({
    latitude: location.latitude.toString(),
    longitude: location.longitude.toString(),
    hourly: variables.join(','),
    timezone: options.timezone || 'auto',
    forecast_days: (options.forecastDays || 7).toString(),
  });

  if (options.model && options.model !== 'best_match') {
    params.append('models', options.model);
  }
  if (options.temperatureUnit) {
    params.append('temperature_unit', options.temperatureUnit);
  }
  if (options.windSpeedUnit) {
    params.append('wind_speed_unit', options.windSpeedUnit);
  }
  if (options.precipitationUnit) {
    params.append('precipitation_unit', options.precipitationUnit);
  }

  const response = await fetch(`${FORECAST_API}?${params.toString()}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(errorData.reason || errorData.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

/**
 * Fetch daily weather data (aggregated)
 */
export async function fetchDailyData(
  location: Location,
  timeRange: TimeRange,
  variables: string[],
  options: {
    temperatureUnit?: 'celsius' | 'fahrenheit';
    windSpeedUnit?: 'kmh' | 'ms' | 'mph' | 'kn';
    precipitationUnit?: 'mm' | 'inch';
    timezone?: string;
  } = {}
): Promise<HistoricalWeatherData> {
  const params = new URLSearchParams({
    latitude: location.latitude.toString(),
    longitude: location.longitude.toString(),
    start_date: timeRange.start,
    end_date: timeRange.end,
    daily: variables.join(','),
    timezone: options.timezone || 'auto',
  });

  if (options.temperatureUnit) {
    params.append('temperature_unit', options.temperatureUnit);
  }
  if (options.windSpeedUnit) {
    params.append('wind_speed_unit', options.windSpeedUnit);
  }
  if (options.precipitationUnit) {
    params.append('precipitation_unit', options.precipitationUnit);
  }

  const response = await fetch(`${HISTORICAL_API}?${params.toString()}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(errorData.reason || errorData.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

/**
 * Fetch multiple model runs for comparison
 */
export async function fetchMultiModelForecast(
  location: Location,
  variables: string[],
  models: WeatherModel[],
  options: {
    temperatureUnit?: 'celsius' | 'fahrenheit';
    windSpeedUnit?: 'kmh' | 'ms' | 'mph' | 'kn';
    precipitationUnit?: 'mm' | 'inch';
    timezone?: string;
    forecastDays?: number;
  } = {}
): Promise<Record<WeatherModel, ForecastWeatherData>> {
  const promises = models.map(async (model) => {
    const data = await fetchForecastData(location, variables, { ...options, model });
    return { model, data };
  });

  const results = await Promise.all(promises);

  return results.reduce((acc, { model, data }) => {
    acc[model] = data;
    return acc;
  }, {} as Record<WeatherModel, ForecastWeatherData>);
}

/**
 * Search for locations by name using geocoding API
 */
export async function searchLocations(query: string, limit: number = 10) {
  const params = new URLSearchParams({
    name: query,
    count: limit.toString(),
    language: 'en',
    format: 'json',
  });

  const response = await fetch(`${GEOCODING_API}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.results || [];
}
