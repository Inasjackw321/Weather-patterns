import './style.css';
import { ProfessionalUI } from './components/ProfessionalUI';
import { WeatherChart } from './components/WeatherChart';
import {
  fetchHistoricalData,
  fetchForecastData,
  fetchMultiModelForecast,
} from './api/openmeteo';
import type { UserPreferences, WeatherModel } from './types/weather';
import { getVariable } from './utils/weatherVariables';
import { calculateStats } from './utils/formatters';
import { format, subDays } from 'date-fns';

class WeatherApp {
  private preferences: UserPreferences;
  private ui: ProfessionalUI;
  private chart: WeatherChart | null = null;
  private currentTimeData: string[] = [];
  private currentDatasets: Array<{ label: string; data: number[]; unit: string }> = [];

  constructor() {
    // Initialize with default preferences
    this.preferences = {
      location: {
        latitude: 51.5074,
        longitude: -0.1278,
        name: 'London, United Kingdom',
      },
      timeRange: {
        start: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
        end: format(new Date(), 'yyyy-MM-dd'),
      },
      selectedVariables: ['temperature_2m', 'precipitation', 'wind_speed_10m'],
      model: 'best_match',
      chartConfig: {
        variables: [],
        chartType: 'line',
        showGrid: true,
        showLegend: true,
        tension: 0.2,
      },
      temperatureUnit: 'celsius',
      windSpeedUnit: 'kmh',
      precipitationUnit: 'mm',
    };

    const appElement = document.getElementById('app');
    if (!appElement) {
      throw new Error('App element not found');
    }

    this.ui = new ProfessionalUI(
      appElement,
      this.handlePreferencesChange.bind(this),
      this.fetchAndDisplayData.bind(this),
      this.handleExport.bind(this)
    );

    this.init();
  }

  private init(): void {
    this.ui.render(this.preferences);
  }

  private handlePreferencesChange(changes: Partial<UserPreferences>): void {
    this.preferences = { ...this.preferences, ...changes };

    // If chart config changed, update chart without refetching
    if (changes.chartConfig && this.chart) {
      this.chart.updateConfig(changes.chartConfig);
    }
  }

  private async fetchAndDisplayData(): Promise<void> {
    const dataType = this.ui.getDataType();

    if (this.preferences.selectedVariables.length === 0) {
      this.ui.showError('Please select at least one weather variable');
      return;
    }

    this.ui.hideError();
    this.ui.showLoading();

    try {
      if (dataType === 'forecast') {
        await this.fetchForecast();
      } else if (dataType === 'historical') {
        await this.fetchHistorical();
      } else if (dataType === 'model-comparison') {
        await this.fetchModelComparison();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      this.ui.showError(
        error instanceof Error ? error.message : 'Failed to fetch weather data. Please try again.'
      );
    } finally {
      this.ui.hideLoading();
    }
  }

  private async fetchForecast(): Promise<void> {
    const data = await fetchForecastData(
      this.preferences.location,
      this.preferences.selectedVariables,
      {
        model: this.preferences.model,
        temperatureUnit: this.preferences.temperatureUnit,
        windSpeedUnit: this.preferences.windSpeedUnit,
        precipitationUnit: this.preferences.precipitationUnit,
        forecastDays: 7,
      }
    );

    if (!data.hourly) {
      throw new Error('No forecast data available');
    }

    this.displayChartData(data.hourly.time, data.hourly);
  }

  private async fetchHistorical(): Promise<void> {
    const data = await fetchHistoricalData(
      this.preferences.location,
      this.preferences.timeRange,
      this.preferences.selectedVariables,
      {
        temperatureUnit: this.preferences.temperatureUnit,
        windSpeedUnit: this.preferences.windSpeedUnit,
        precipitationUnit: this.preferences.precipitationUnit,
      }
    );

    if (!data.hourly) {
      throw new Error('No historical data available');
    }

    this.displayChartData(data.hourly.time, data.hourly);
  }

  private async fetchModelComparison(): Promise<void> {
    if (this.preferences.selectedVariables.length === 0) {
      throw new Error('Please select at least one variable');
    }

    // Use top models for comparison
    const models: WeatherModel[] = [
      'ecmwf_ifs025',
      'gfs_global',
      'icon_global',
      'meteofrance_arpege_world',
      'gem_global',
    ];

    const multiModelData = await fetchMultiModelForecast(
      this.preferences.location,
      [this.preferences.selectedVariables[0]], // Use first variable for model comparison
      models,
      {
        temperatureUnit: this.preferences.temperatureUnit,
        windSpeedUnit: this.preferences.windSpeedUnit,
        precipitationUnit: this.preferences.precipitationUnit,
        forecastDays: 7,
      }
    );

    // Combine data from all models
    const firstModel = models[0];
    const firstData = multiModelData[firstModel];

    if (!firstData.hourly) {
      throw new Error('No model data available');
    }

    const timeData = firstData.hourly.time;
    const variable = this.preferences.selectedVariables[0];
    const varInfo = getVariable(variable);

    const datasets = models
      .filter((model) => multiModelData[model]?.hourly?.[variable])
      .map((model) => {
        const modelData = multiModelData[model];
        return {
          label: `${varInfo?.name || variable} - ${model.toUpperCase()}`,
          data: modelData.hourly![variable] as number[],
          unit: varInfo?.unit || '',
        };
      });

    this.displayChart(timeData, datasets);
  }

  private displayChartData(
    timeData: string[],
    hourlyData: { [key: string]: number[] | string[] }
  ): void {
    const datasets = this.preferences.selectedVariables
      .filter((variableId) => hourlyData[variableId])
      .map((variableId) => {
        const variable = getVariable(variableId);
        const data = hourlyData[variableId] as number[];

        return {
          label: variable?.name || variableId,
          data: data,
          unit: variable?.unit || '',
        };
      });

    if (datasets.length === 0) {
      throw new Error('No data available for selected variables');
    }

    this.displayChart(timeData, datasets);
  }

  private displayChart(
    timeData: string[],
    datasets: Array<{ label: string; data: number[]; unit: string }>
  ): void {
    const canvas = document.getElementById('weather-chart') as HTMLCanvasElement;

    if (!canvas) {
      throw new Error('Canvas element not found');
    }

    // Store data for export
    this.currentTimeData = timeData;
    this.currentDatasets = datasets;

    if (!this.chart) {
      this.chart = new WeatherChart(canvas);
    }

    this.chart.updateChart(timeData, datasets, this.preferences.chartConfig);

    // Calculate and display statistics
    const stats = datasets.map((dataset) => {
      const statsData = calculateStats(dataset.data);
      return {
        label: dataset.label,
        ...statsData,
      };
    });

    this.ui.showStats(stats);
  }

  private handleExport(type: 'png' | 'svg' | 'csv'): void {
    if (!this.chart) {
      alert('No chart data to export. Please visualize data first.');
      return;
    }

    const timestamp = format(new Date(), 'yyyy-MM-dd_HHmmss');
    const locationSlug = this.preferences.location.name?.replace(/[^a-zA-Z0-9]/g, '_') || 'location';
    const filename = `meteoscope_${locationSlug}_${timestamp}`;

    try {
      if (type === 'png') {
        this.chart.exportAsPNG(`${filename}.png`);
      } else if (type === 'svg') {
        this.chart.exportAsSVG(`${filename}.svg`);
      } else if (type === 'csv') {
        this.chart.exportAsCSV(this.currentTimeData, this.currentDatasets, `${filename}.csv`);
      }
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export data. Please try again.');
    }
  }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  new WeatherApp();
});
