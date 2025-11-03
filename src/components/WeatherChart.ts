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

  /**
   * Export chart as PNG image
   */
  public exportAsPNG(filename: string = 'meteoscope-chart.png'): void {
    if (!this.chart) return;

    const url = this.canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    link.click();
  }

  /**
   * Export chart as SVG (via canvas rendering)
   */
  public exportAsSVG(filename: string = 'meteoscope-chart.svg'): void {
    if (!this.chart) return;

    // Create SVG from canvas
    const canvas = this.canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml">
            <img src="${canvas.toDataURL()}" />
          </div>
        </foreignObject>
      </svg>
    `;

    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Export chart data as CSV
   */
  public exportAsCSV(
    timeData: string[],
    datasets: Array<{ label: string; data: number[]; unit: string }>,
    filename: string = 'meteoscope-data.csv'
  ): void {
    // Create CSV header
    const headers = ['Time', ...datasets.map((d) => `${d.label} (${d.unit})`)];
    const csvRows = [headers.join(',')];

    // Add data rows
    for (let i = 0; i < timeData.length; i++) {
      const row = [
        timeData[i],
        ...datasets.map((d) => d.data[i]?.toString() || ''),
      ];
      csvRows.push(row.join(','));
    }

    // Create and download file
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Get the chart instance (for advanced operations)
   */
  public getChart(): Chart | null {
    return this.chart;
  }
}
