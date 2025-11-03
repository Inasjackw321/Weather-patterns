import type { WeatherModel } from '../types/weather';

export interface ModelInfo {
  id: WeatherModel;
  name: string;
  provider: string;
  region: string;
  resolution: string;
  updateFrequency: string;
}

/**
 * All available weather models with metadata
 */
export const WEATHER_MODELS: ModelInfo[] = [
  // Best Match
  {
    id: 'best_match',
    name: 'Best Match (Auto)',
    provider: 'Open-Meteo',
    region: 'Global',
    resolution: 'Variable',
    updateFrequency: 'Variable',
  },

  // ECMWF Models
  {
    id: 'ecmwf_ifs025',
    name: 'ECMWF IFS 0.25°',
    provider: 'ECMWF',
    region: 'Global',
    resolution: '25 km',
    updateFrequency: '6h',
  },
  {
    id: 'ecmwf_ifs',
    name: 'ECMWF IFS 0.4°',
    provider: 'ECMWF',
    region: 'Global',
    resolution: '44 km',
    updateFrequency: '6h',
  },
  {
    id: 'ecmwf_aifs025',
    name: 'ECMWF AIFS 0.25°',
    provider: 'ECMWF',
    region: 'Global',
    resolution: '25 km',
    updateFrequency: '6h',
  },

  // GFS Models
  {
    id: 'gfs_seamless',
    name: 'GFS Seamless',
    provider: 'NOAA',
    region: 'Global',
    resolution: 'Multi',
    updateFrequency: '6h',
  },
  {
    id: 'gfs_global',
    name: 'GFS Global',
    provider: 'NOAA',
    region: 'Global',
    resolution: '25 km',
    updateFrequency: '6h',
  },
  {
    id: 'gfs_hrrr',
    name: 'GFS HRRR',
    provider: 'NOAA',
    region: 'North America',
    resolution: '3 km',
    updateFrequency: '1h',
  },
  {
    id: 'gfs_graphcast025',
    name: 'GFS GraphCast 0.25°',
    provider: 'NOAA/Google',
    region: 'Global',
    resolution: '25 km',
    updateFrequency: '6h',
  },

  // MeteoFrance Models
  {
    id: 'meteofrance_seamless',
    name: 'MeteoFrance Seamless',
    provider: 'Météo-France',
    region: 'Global',
    resolution: 'Multi',
    updateFrequency: '6h',
  },
  {
    id: 'meteofrance_arpege_world',
    name: 'ARPEGE World',
    provider: 'Météo-France',
    region: 'Global',
    resolution: '25 km',
    updateFrequency: '6h',
  },
  {
    id: 'meteofrance_arpege_europe',
    name: 'ARPEGE Europe',
    provider: 'Météo-France',
    region: 'Europe',
    resolution: '10 km',
    updateFrequency: '6h',
  },
  {
    id: 'meteofrance_arome_france',
    name: 'AROME France',
    provider: 'Météo-France',
    region: 'France',
    resolution: '1.5 km',
    updateFrequency: '3h',
  },

  // JMA Models
  {
    id: 'jma_seamless',
    name: 'JMA Seamless',
    provider: 'JMA',
    region: 'Global',
    resolution: 'Multi',
    updateFrequency: '6h',
  },
  {
    id: 'jma_msm',
    name: 'JMA MSM',
    provider: 'JMA',
    region: 'Japan',
    resolution: '5 km',
    updateFrequency: '3h',
  },
  {
    id: 'jma_gsm',
    name: 'JMA GSM',
    provider: 'JMA',
    region: 'Global',
    resolution: '55 km',
    updateFrequency: '6h',
  },

  // GEM Models
  {
    id: 'gem_seamless',
    name: 'GEM Seamless',
    provider: 'ECCC',
    region: 'Global',
    resolution: 'Multi',
    updateFrequency: '6h',
  },
  {
    id: 'gem_global',
    name: 'GEM Global',
    provider: 'ECCC',
    region: 'Global',
    resolution: '25 km',
    updateFrequency: '12h',
  },
  {
    id: 'gem_regional',
    name: 'GEM Regional',
    provider: 'ECCC',
    region: 'North America',
    resolution: '10 km',
    updateFrequency: '6h',
  },
  {
    id: 'gem_hrdps_continental',
    name: 'GEM HRDPS',
    provider: 'ECCC',
    region: 'Canada',
    resolution: '2.5 km',
    updateFrequency: '6h',
  },

  // ICON Models
  {
    id: 'icon_seamless',
    name: 'ICON Seamless',
    provider: 'DWD',
    region: 'Global',
    resolution: 'Multi',
    updateFrequency: '6h',
  },
  {
    id: 'icon_global',
    name: 'ICON Global',
    provider: 'DWD',
    region: 'Global',
    resolution: '11 km',
    updateFrequency: '6h',
  },
  {
    id: 'icon_eu',
    name: 'ICON EU',
    provider: 'DWD',
    region: 'Europe',
    resolution: '7 km',
    updateFrequency: '3h',
  },
  {
    id: 'icon_d2',
    name: 'ICON D2',
    provider: 'DWD',
    region: 'Central Europe',
    resolution: '2 km',
    updateFrequency: '3h',
  },

  // BOM Models
  {
    id: 'bom_access_global',
    name: 'ACCESS Global',
    provider: 'BOM',
    region: 'Global',
    resolution: '15 km',
    updateFrequency: '6h',
  },
  {
    id: 'bom_access_global_ensemble',
    name: 'ACCESS Ensemble',
    provider: 'BOM',
    region: 'Global',
    resolution: '40 km',
    updateFrequency: '6h',
  },

  // MetNo Models
  {
    id: 'metno_nordic',
    name: 'MetNo Nordic',
    provider: 'Met.no',
    region: 'Nordic',
    resolution: '1 km',
    updateFrequency: '1h',
  },

  // KNMI Models
  {
    id: 'knmi_seamless',
    name: 'KNMI Seamless',
    provider: 'KNMI',
    region: 'Europe',
    resolution: 'Multi',
    updateFrequency: '6h',
  },
  {
    id: 'knmi_harmonie_arome_europe',
    name: 'HARMONIE Europe',
    provider: 'KNMI',
    region: 'Europe',
    resolution: '5.5 km',
    updateFrequency: '6h',
  },
  {
    id: 'knmi_harmonie_arome_netherlands',
    name: 'HARMONIE Netherlands',
    provider: 'KNMI',
    region: 'Netherlands',
    resolution: '2 km',
    updateFrequency: '1h',
  },

  // DMI Models
  {
    id: 'dmi_seamless',
    name: 'DMI Seamless',
    provider: 'DMI',
    region: 'Europe',
    resolution: 'Multi',
    updateFrequency: '3h',
  },
  {
    id: 'dmi_harmonie_arome_europe',
    name: 'DMI HARMONIE Europe',
    provider: 'DMI',
    region: 'Europe',
    resolution: '2 km',
    updateFrequency: '3h',
  },

  // UKMO Models
  {
    id: 'ukmo_seamless',
    name: 'UK Met Office Seamless',
    provider: 'UKMO',
    region: 'Global',
    resolution: 'Multi',
    updateFrequency: '6h',
  },
  {
    id: 'ukmo_global_deterministic_10km',
    name: 'UKMO Global 10km',
    provider: 'UKMO',
    region: 'Global',
    resolution: '10 km',
    updateFrequency: '6h',
  },
  {
    id: 'ukmo_uk_deterministic_2km',
    name: 'UKMO UK 2km',
    provider: 'UKMO',
    region: 'United Kingdom',
    resolution: '2 km',
    updateFrequency: '1h',
  },

  // ARPAE Models
  {
    id: 'arpae_cosmo_seamless',
    name: 'COSMO Seamless',
    provider: 'ARPAE',
    region: 'Italy',
    resolution: 'Multi',
    updateFrequency: '6h',
  },
  {
    id: 'arpae_cosmo_2i',
    name: 'COSMO 2I',
    provider: 'ARPAE',
    region: 'Italy',
    resolution: '2.2 km',
    updateFrequency: '12h',
  },
  {
    id: 'arpae_cosmo_2i_ruc',
    name: 'COSMO 2I RUC',
    provider: 'ARPAE',
    region: 'Italy',
    resolution: '2.2 km',
    updateFrequency: '1h',
  },
  {
    id: 'arpae_cosmo_5m',
    name: 'COSMO 5M',
    provider: 'ARPAE',
    region: 'Mediterranean',
    resolution: '5 km',
    updateFrequency: '12h',
  },
];

/**
 * Get model info by ID
 */
export function getModelInfo(id: WeatherModel): ModelInfo | undefined {
  return WEATHER_MODELS.find((m) => m.id === id);
}

/**
 * Get models by provider
 */
export function getModelsByProvider(provider: string): ModelInfo[] {
  return WEATHER_MODELS.filter((m) => m.provider === provider);
}

/**
 * Get all providers
 */
export function getProviders(): string[] {
  return Array.from(new Set(WEATHER_MODELS.map((m) => m.provider))).sort();
}

/**
 * Get models by region
 */
export function getModelsByRegion(region: string): ModelInfo[] {
  return WEATHER_MODELS.filter((m) => m.region === region);
}
