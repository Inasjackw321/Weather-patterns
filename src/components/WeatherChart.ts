import {
  Chart,
  LineController,
  BarController,
  LineElement,
  BarElement,
  PointElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartConfiguration,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import type { ChartConfig } from '../types/weather';
import { getChartColor } from '../utils/formatters';

// Register Chart.js components
Chart.register(
  LineController,
  BarController,
  LineElement,
  BarElement,
  PointElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

export class WeatherChart {
  private chart: Chart | null = null;
  private canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  /**
   * Create or update chart with new data
   */
  public updateChart(
    timeData: string[],
    datasets: Array<{
      label: string;
      data: number[];
      unit: string;
    }>,
    config: ChartConfig
  ): void {
    // Destroy existing chart if it exists
    if (this.chart) {
      this.chart.destroy();
    }

    const chartDatasets = datasets.map((dataset, index) => ({
      label: `${dataset.label} (${dataset.unit})`,
      data: dataset.data,
      borderColor: getChartColor(index),
      backgroundColor: getChartColor(index) + '20', // Add transparency
      borderWidth: 2,
      tension: config.tension,
      fill: config.chartType === 'line',
      pointRadius: timeData.length > 100 ? 0 : 3,
      pointHoverRadius: 5,
    }));

    const chartConfig: ChartConfiguration = {
      type: config.chartType,
      data: {
        labels: timeData,
        datasets: chartDatasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            display: config.showLegend,
            position: 'top',
            labels: {
              color: '#e5e7eb',
              font: {
                size: 12,
              },
            },
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(17, 24, 39, 0.9)',
            titleColor: '#f3f4f6',
            bodyColor: '#e5e7eb',
            borderColor: '#374151',
            borderWidth: 1,
            padding: 12,
            displayColors: true,
            callbacks: {
              title: (context) => {
                const date = new Date(context[0].label);
                return date.toLocaleString();
              },
            },
          },
        },
        scales: {
          x: {
            type: 'time',
            time: {
              tooltipFormat: 'MMM dd, yyyy HH:mm',
              displayFormats: {
                hour: 'MMM dd HH:mm',
                day: 'MMM dd',
                week: 'MMM dd',
                month: 'MMM yyyy',
              },
            },
            grid: {
              display: config.showGrid,
              color: 'rgba(75, 85, 99, 0.3)',
            },
            ticks: {
              color: '#9ca3af',
              maxRotation: 45,
              minRotation: 0,
            },
          },
          y: {
            grid: {
              display: config.showGrid,
              color: 'rgba(75, 85, 99, 0.3)',
            },
            ticks: {
              color: '#9ca3af',
            },
          },
        },
      },
    };

    this.chart = new Chart(this.canvas, chartConfig);
  }

  /**
   * Destroy the chart
   */
  public destroy(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  /**
   * Update chart configuration without recreating
   */
  public updateConfig(config: Partial<ChartConfig>): void {
    if (!this.chart) return;

    if (config.showLegend !== undefined) {
      this.chart.options.plugins!.legend!.display = config.showLegend;
    }

    if (config.showGrid !== undefined) {
      this.chart.options.scales!.x!.grid!.display = config.showGrid;
      this.chart.options.scales!.y!.grid!.display = config.showGrid;
    }

    this.chart.update();
  }
}
