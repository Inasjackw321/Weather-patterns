import type { WeatherVariable } from '../types/weather';

/**
 * Available weather variables from Open-Meteo API
 */
export const WEATHER_VARIABLES: WeatherVariable[] = [
  // Temperature variables
  {
    id: 'temperature_2m',
    name: 'Temperature (2m)',
    unit: '°C',
    category: 'temperature',
  },
  {
    id: 'apparent_temperature',
    name: 'Apparent Temperature',
    unit: '°C',
    category: 'temperature',
  },
  {
    id: 'dew_point_2m',
    name: 'Dew Point (2m)',
    unit: '°C',
    category: 'temperature',
  },

  // Precipitation variables
  {
    id: 'precipitation',
    name: 'Precipitation',
    unit: 'mm',
    category: 'precipitation',
  },
  {
    id: 'rain',
    name: 'Rain',
    unit: 'mm',
    category: 'precipitation',
  },
  {
    id: 'snowfall',
    name: 'Snowfall',
    unit: 'cm',
    category: 'precipitation',
  },
  {
    id: 'precipitation_probability',
    name: 'Precipitation Probability',
    unit: '%',
    category: 'precipitation',
  },

  // Wind variables
  {
    id: 'wind_speed_10m',
    name: 'Wind Speed (10m)',
    unit: 'km/h',
    category: 'wind',
  },
  {
    id: 'wind_speed_100m',
    name: 'Wind Speed (100m)',
    unit: 'km/h',
    category: 'wind',
  },
  {
    id: 'wind_direction_10m',
    name: 'Wind Direction (10m)',
    unit: '°',
    category: 'wind',
  },
  {
    id: 'wind_gusts_10m',
    name: 'Wind Gusts (10m)',
    unit: 'km/h',
    category: 'wind',
  },

  // Pressure variables
  {
    id: 'surface_pressure',
    name: 'Surface Pressure',
    unit: 'hPa',
    category: 'pressure',
  },
  {
    id: 'pressure_msl',
    name: 'Mean Sea Level Pressure',
    unit: 'hPa',
    category: 'pressure',
  },

  // Humidity variables
  {
    id: 'relative_humidity_2m',
    name: 'Relative Humidity (2m)',
    unit: '%',
    category: 'humidity',
  },

  // Cloud cover variables
  {
    id: 'cloud_cover',
    name: 'Cloud Cover',
    unit: '%',
    category: 'cloud',
  },
  {
    id: 'cloud_cover_low',
    name: 'Low Cloud Cover',
    unit: '%',
    category: 'cloud',
  },
  {
    id: 'cloud_cover_mid',
    name: 'Mid Cloud Cover',
    unit: '%',
    category: 'cloud',
  },
  {
    id: 'cloud_cover_high',
    name: 'High Cloud Cover',
    unit: '%',
    category: 'cloud',
  },

  // Other variables
  {
    id: 'visibility',
    name: 'Visibility',
    unit: 'm',
    category: 'other',
  },
  {
    id: 'soil_temperature_0_to_7cm',
    name: 'Soil Temperature (0-7cm)',
    unit: '°C',
    category: 'other',
  },
  {
    id: 'soil_moisture_0_to_7cm',
    name: 'Soil Moisture (0-7cm)',
    unit: 'm³/m³',
    category: 'other',
  },
];

/**
 * Daily aggregated variables (for daily data requests)
 */
export const DAILY_VARIABLES: WeatherVariable[] = [
  {
    id: 'temperature_2m_max',
    name: 'Max Temperature',
    unit: '°C',
    category: 'temperature',
  },
  {
    id: 'temperature_2m_min',
    name: 'Min Temperature',
    unit: '°C',
    category: 'temperature',
  },
  {
    id: 'temperature_2m_mean',
    name: 'Mean Temperature',
    unit: '°C',
    category: 'temperature',
  },
  {
    id: 'precipitation_sum',
    name: 'Precipitation Sum',
    unit: 'mm',
    category: 'precipitation',
  },
  {
    id: 'precipitation_hours',
    name: 'Precipitation Hours',
    unit: 'h',
    category: 'precipitation',
  },
  {
    id: 'wind_speed_10m_max',
    name: 'Max Wind Speed',
    unit: 'km/h',
    category: 'wind',
  },
  {
    id: 'wind_gusts_10m_max',
    name: 'Max Wind Gusts',
    unit: 'km/h',
    category: 'wind',
  },
  {
    id: 'sunrise',
    name: 'Sunrise',
    unit: 'ISO8601',
    category: 'other',
  },
  {
    id: 'sunset',
    name: 'Sunset',
    unit: 'ISO8601',
    category: 'other',
  },
];

/**
 * Get variable by ID
 */
export function getVariable(id: string): WeatherVariable | undefined {
  return [...WEATHER_VARIABLES, ...DAILY_VARIABLES].find((v) => v.id === id);
}

/**
 * Get variables by category
 */
export function getVariablesByCategory(category: string): WeatherVariable[] {
  return WEATHER_VARIABLES.filter((v) => v.category === category);
}

/**
 * Get all available categories
 */
export function getCategories(): string[] {
  return Array.from(new Set(WEATHER_VARIABLES.map((v) => v.category)));
}
