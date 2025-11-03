import './style.css';
import { UI } from './components/UI';
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
  private ui: UI;
  private chart: WeatherChart | null = null;

  constructor() {
    // Initialize with default preferences
    this.preferences = {
      location: {
        latitude: 40.7128,
        longitude: -74.006,
        name: 'New York, United States',
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

    this.ui = new UI(appElement, this.handlePreferencesChange.bind(this));
    this.init();
  }

  private init(): void {
    this.ui.render(this.preferences);
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    const fetchButton = document.getElementById('fetch-data-btn');
    fetchButton?.addEventListener('click', () => this.fetchAndDisplayData());

    const exportButton = document.getElementById('export-data-btn');
    exportButton?.addEventListener('click', () => this.exportData());
  }

  private handlePreferencesChange(changes: Partial<UserPreferences>): void {
    this.preferences = { ...this.preferences, ...changes };

    // If chart config changed, update chart without refetching
    if (changes.chartConfig && this.chart) {
      this.chart.updateConfig(changes.chartConfig);
    }
  }

  private async fetchAndDisplayData(): Promise<void> {
    const dataType = (document.getElementById('data-type') as HTMLSelectElement)?.value;

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
        error instanceof Error ? error.message : 'Failed to fetch weather data'
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

    this.displayChartData(data.hourly!.time, data.hourly!);
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

    this.displayChartData(data.hourly!.time, data.hourly!);
  }

  private async fetchModelComparison(): Promise<void> {
    const models: WeatherModel[] = [
      'gfs_global',
      'ecmwf_ifs',
      'icon_global',
      'meteofrance_arpege',
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
    const timeData = multiModelData[firstModel].hourly!.time;
    const variable = this.preferences.selectedVariables[0];

    const datasets = models.map((model) => {
      const modelData = multiModelData[model];
      const varInfo = getVariable(variable);

      return {
        label: `${varInfo?.name || variable} (${model})`,
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
    const datasets = this.preferences.selectedVariables.map((variableId) => {
      const variable = getVariable(variableId);
      const data = hourlyData[variableId] as number[];

      return {
        label: variable?.name || variableId,
        data: data,
        unit: variable?.unit || '',
      };
    });

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

  private exportData(): void {
    // Get the chart data and export as CSV
    const infoMsg = document.getElementById('info-message');
    if (infoMsg) {
      infoMsg.innerHTML = `
        <strong>Export Feature:</strong> Chart data can be exported as CSV.
        Right-click on the chart to download the image.
        <br>
        <small class="text-xs">CSV export functionality coming soon!</small>
      `;
      infoMsg.classList.remove('hidden');
    }
  }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  new WeatherApp();
});
