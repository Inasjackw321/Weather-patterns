import { format, parseISO } from 'date-fns';

/**
 * Format date for display
 */
export function formatDate(date: string | Date, formatString: string = 'MMM dd, yyyy'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatString);
}

/**
 * Format date and time for display
 */
export function formatDateTime(date: string | Date, formatString: string = 'MMM dd, yyyy HH:mm'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatString);
}

/**
 * Format number with specified decimal places
 */
export function formatNumber(value: number, decimals: number = 1): string {
  return value.toFixed(decimals);
}

/**
 * Get color for a variable category
 */
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    temperature: '#ef4444', // red
    precipitation: '#3b82f6', // blue
    wind: '#10b981', // green
    pressure: '#f59e0b', // amber
    humidity: '#06b6d4', // cyan
    cloud: '#6366f1', // indigo
    other: '#8b5cf6', // purple
  };

  return colors[category] || '#6b7280'; // gray as default
}

/**
 * Get chart color by index
 */
export function getChartColor(index: number): string {
  const colors = [
    '#ef4444', // red
    '#3b82f6', // blue
    '#10b981', // green
    '#f59e0b', // amber
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#06b6d4', // cyan
    '#f97316', // orange
  ];

  return colors[index % colors.length];
}

/**
 * Format weather model name for display
 */
export function formatModelName(model: string): string {
  const modelNames: Record<string, string> = {
    best_match: 'Best Match',
    gfs_global: 'GFS Global',
    ecmwf_ifs: 'ECMWF IFS',
    meteofrance_arpege: 'MeteoFrance ARPEGE',
    jma_gsm: 'JMA GSM',
    icon_global: 'ICON Global',
    gem_global: 'GEM Global',
  };

  return modelNames[model] || model;
}

/**
 * Calculate statistics for a data series
 */
export function calculateStats(data: number[]): {
  min: number;
  max: number;
  mean: number;
  median: number;
} {
  const sorted = [...data].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
  const median = sorted.length % 2 === 0
    ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
    : sorted[Math.floor(sorted.length / 2)];

  return { min, max, mean, median };
}
