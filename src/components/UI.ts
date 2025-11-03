import type { WeatherModel, UserPreferences } from '../types/weather';
import { WEATHER_VARIABLES } from '../utils/weatherVariables';
import { searchLocations } from '../api/openmeteo';
import { formatModelName } from '../utils/formatters';

export class UI {
  private app: HTMLElement;
  private onPreferencesChange: (prefs: Partial<UserPreferences>) => void;

  constructor(
    appElement: HTMLElement,
    onPreferencesChange: (prefs: Partial<UserPreferences>) => void
  ) {
    this.app = appElement;
    this.onPreferencesChange = onPreferencesChange;
  }

  /**
   * Render the main UI
   */
  public render(preferences: UserPreferences): void {
    this.app.innerHTML = `
      <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <!-- Header -->
        <header class="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
          <div class="container mx-auto px-4 py-4">
            <h1 class="text-3xl font-bold text-white mb-2">
              🌦️ Weather Patterns
            </h1>
            <p class="text-gray-300 text-sm">
              Advanced Weather Visualization with Open-Meteo & Model Comparison
            </p>
          </div>
        </header>

        <!-- Main Content -->
        <main class="container mx-auto px-4 py-6">
          <!-- Controls Panel -->
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-6 border border-gray-700">
            <h2 class="text-xl font-semibold text-white mb-4">📊 Configuration</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Location Search -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  📍 Location
                </label>
                <input
                  type="text"
                  id="location-search"
                  placeholder="Search location..."
                  class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value="${preferences.location.name || ''}"
                />
                <div id="location-results" class="mt-2 bg-gray-700 rounded-lg hidden max-h-48 overflow-y-auto"></div>
              </div>

              <!-- Data Type -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  📅 Data Type
                </label>
                <select
                  id="data-type"
                  class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="forecast">Forecast (Next 7 Days)</option>
                  <option value="historical">Historical Data</option>
                  <option value="model-comparison">Model Comparison</option>
                </select>
              </div>

              <!-- Weather Model -->
              <div id="model-selector">
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  🌐 Weather Model
                </label>
                <select
                  id="weather-model"
                  class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  ${this.renderModelOptions(preferences.model)}
                </select>
              </div>

              <!-- Start Date -->
              <div id="start-date-container" class="hidden">
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  📅 Start Date
                </label>
                <input
                  type="date"
                  id="start-date"
                  value="${preferences.timeRange.start}"
                  class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <!-- End Date -->
              <div id="end-date-container" class="hidden">
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  📅 End Date
                </label>
                <input
                  type="date"
                  id="end-date"
                  value="${preferences.timeRange.end}"
                  class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <!-- Variable Selection -->
            <div class="mt-6">
              <label class="block text-sm font-medium text-gray-300 mb-2">
                📈 Weather Variables
              </label>
              <div id="variable-selector" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                ${this.renderVariableCheckboxes(preferences.selectedVariables)}
              </div>
            </div>

            <!-- Chart Configuration -->
            <div class="mt-6">
              <h3 class="text-sm font-medium text-gray-300 mb-3">🎨 Chart Settings</h3>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <label class="flex items-center space-x-2 text-gray-300">
                  <input
                    type="checkbox"
                    id="show-grid"
                    ${preferences.chartConfig.showGrid ? 'checked' : ''}
                    class="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <span>Show Grid</span>
                </label>
                <label class="flex items-center space-x-2 text-gray-300">
                  <input
                    type="checkbox"
                    id="show-legend"
                    ${preferences.chartConfig.showLegend ? 'checked' : ''}
                    class="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <span>Show Legend</span>
                </label>
                <div>
                  <label class="block text-sm text-gray-300 mb-1">Line Smoothing</label>
                  <input
                    type="range"
                    id="line-tension"
                    min="0"
                    max="0.4"
                    step="0.1"
                    value="${preferences.chartConfig.tension}"
                    class="w-full"
                  />
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="mt-6 flex flex-wrap gap-3">
              <button
                id="fetch-data-btn"
                class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                🔄 Fetch Data
              </button>
              <button
                id="export-data-btn"
                class="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                💾 Export Data
              </button>
            </div>
          </div>

          <!-- Chart Container -->
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <div id="loading-indicator" class="hidden flex items-center justify-center py-20">
              <div class="loader"></div>
            </div>
            <div id="error-message" class="hidden bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded mb-4"></div>
            <div id="info-message" class="bg-blue-900/50 border border-blue-700 text-blue-200 px-4 py-3 rounded mb-4">
              Select variables and click "Fetch Data" to visualize weather patterns
            </div>
            <div class="chart-container">
              <canvas id="weather-chart"></canvas>
            </div>
          </div>

          <!-- Statistics Panel -->
          <div id="stats-panel" class="hidden bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mt-6 border border-gray-700">
            <h2 class="text-xl font-semibold text-white mb-4">📊 Statistics</h2>
            <div id="stats-content" class="grid grid-cols-2 md:grid-cols-4 gap-4"></div>
          </div>
        </main>

        <!-- Footer -->
        <footer class="bg-gray-800/50 backdrop-blur-sm border-t border-gray-700 mt-12">
          <div class="container mx-auto px-4 py-6 text-center text-gray-400 text-sm">
            <p>
              Powered by
              <a href="https://open-meteo.com/" target="_blank" class="text-blue-400 hover:text-blue-300">
                Open-Meteo API
              </a>
              | Data visualization with Chart.js
            </p>
          </div>
        </footer>
      </div>
    `;

    this.attachEventListeners(preferences);
  }

  private renderModelOptions(currentModel: WeatherModel): string {
    const models: WeatherModel[] = [
      'best_match',
      'gfs_global',
      'ecmwf_ifs',
      'meteofrance_arpege',
      'jma_gsm',
      'icon_global',
      'gem_global',
    ];

    return models
      .map(
        (model) =>
          `<option value="${model}" ${model === currentModel ? 'selected' : ''}>
            ${formatModelName(model)}
          </option>`
      )
      .join('');
  }

  private renderVariableCheckboxes(selectedVariables: string[]): string {
    return WEATHER_VARIABLES.slice(0, 12) // Show first 12 variables
      .map(
        (variable) => `
        <label class="flex items-center space-x-2 text-sm text-gray-300 cursor-pointer hover:text-white transition-colors">
          <input
            type="checkbox"
            name="variable"
            value="${variable.id}"
            ${selectedVariables.includes(variable.id) ? 'checked' : ''}
            class="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
          />
          <span>${variable.name}</span>
        </label>
      `
      )
      .join('');
  }

  private attachEventListeners(preferences: UserPreferences): void {
    // Location search
    const locationSearch = document.getElementById('location-search') as HTMLInputElement;
    const locationResults = document.getElementById('location-results') as HTMLDivElement;

    let searchTimeout: number;
    locationSearch?.addEventListener('input', (e) => {
      const query = (e.target as HTMLInputElement).value;

      clearTimeout(searchTimeout);

      if (query.length < 2) {
        locationResults.classList.add('hidden');
        return;
      }

      searchTimeout = window.setTimeout(async () => {
        try {
          const results = await searchLocations(query, 5);

          if (results.length > 0) {
            locationResults.innerHTML = results
              .map(
                (result: any) => `
                <div class="px-4 py-2 hover:bg-gray-600 cursor-pointer location-result"
                     data-lat="${result.latitude}"
                     data-lon="${result.longitude}"
                     data-name="${result.name}, ${result.country}">
                  ${result.name}, ${result.admin1 ? result.admin1 + ', ' : ''}${result.country}
                </div>
              `
              )
              .join('');
            locationResults.classList.remove('hidden');

            // Attach click handlers to results
            locationResults.querySelectorAll('.location-result').forEach((el) => {
              el.addEventListener('click', () => {
                const lat = parseFloat(el.getAttribute('data-lat')!);
                const lon = parseFloat(el.getAttribute('data-lon')!);
                const name = el.getAttribute('data-name')!;

                locationSearch.value = name;
                locationResults.classList.add('hidden');

                this.onPreferencesChange({
                  location: { latitude: lat, longitude: lon, name },
                });
              });
            });
          } else {
            locationResults.innerHTML = '<div class="px-4 py-2 text-gray-400">No results found</div>';
            locationResults.classList.remove('hidden');
          }
        } catch (error) {
          console.error('Location search error:', error);
        }
      }, 300);
    });

    // Data type change
    const dataTypeSelect = document.getElementById('data-type') as HTMLSelectElement;
    const startDateContainer = document.getElementById('start-date-container');
    const endDateContainer = document.getElementById('end-date-container');
    const modelSelector = document.getElementById('model-selector');

    dataTypeSelect?.addEventListener('change', (e) => {
      const value = (e.target as HTMLSelectElement).value;

      if (value === 'historical') {
        startDateContainer?.classList.remove('hidden');
        endDateContainer?.classList.remove('hidden');
      } else {
        startDateContainer?.classList.add('hidden');
        endDateContainer?.classList.add('hidden');
      }

      if (value === 'model-comparison') {
        modelSelector?.classList.add('hidden');
      } else {
        modelSelector?.classList.remove('hidden');
      }
    });

    // Weather model change
    const modelSelect = document.getElementById('weather-model') as HTMLSelectElement;
    modelSelect?.addEventListener('change', (e) => {
      this.onPreferencesChange({
        model: (e.target as HTMLSelectElement).value as WeatherModel,
      });
    });

    // Variable checkboxes
    const variableCheckboxes = document.querySelectorAll('input[name="variable"]');
    variableCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        const selected = Array.from(variableCheckboxes)
          .filter((cb) => (cb as HTMLInputElement).checked)
          .map((cb) => (cb as HTMLInputElement).value);

        this.onPreferencesChange({ selectedVariables: selected });
      });
    });

    // Chart configuration
    const showGrid = document.getElementById('show-grid') as HTMLInputElement;
    const showLegend = document.getElementById('show-legend') as HTMLInputElement;
    const lineTension = document.getElementById('line-tension') as HTMLInputElement;

    showGrid?.addEventListener('change', (e) => {
      this.onPreferencesChange({
        chartConfig: {
          ...preferences.chartConfig,
          showGrid: (e.target as HTMLInputElement).checked,
        },
      });
    });

    showLegend?.addEventListener('change', (e) => {
      this.onPreferencesChange({
        chartConfig: {
          ...preferences.chartConfig,
          showLegend: (e.target as HTMLInputElement).checked,
        },
      });
    });

    lineTension?.addEventListener('input', (e) => {
      this.onPreferencesChange({
        chartConfig: {
          ...preferences.chartConfig,
          tension: parseFloat((e.target as HTMLInputElement).value),
        },
      });
    });

    // Date inputs
    const startDate = document.getElementById('start-date') as HTMLInputElement;
    const endDate = document.getElementById('end-date') as HTMLInputElement;

    startDate?.addEventListener('change', (e) => {
      this.onPreferencesChange({
        timeRange: {
          ...preferences.timeRange,
          start: (e.target as HTMLInputElement).value,
        },
      });
    });

    endDate?.addEventListener('change', (e) => {
      this.onPreferencesChange({
        timeRange: {
          ...preferences.timeRange,
          end: (e.target as HTMLInputElement).value,
        },
      });
    });
  }

  public showLoading(): void {
    const loading = document.getElementById('loading-indicator');
    const infoMsg = document.getElementById('info-message');
    loading?.classList.remove('hidden');
    infoMsg?.classList.add('hidden');
  }

  public hideLoading(): void {
    const loading = document.getElementById('loading-indicator');
    loading?.classList.add('hidden');
  }

  public showError(message: string): void {
    const errorMsg = document.getElementById('error-message');
    if (errorMsg) {
      errorMsg.textContent = message;
      errorMsg.classList.remove('hidden');
    }
    this.hideLoading();
  }

  public hideError(): void {
    const errorMsg = document.getElementById('error-message');
    errorMsg?.classList.add('hidden');
  }

  public showStats(stats: Array<{ label: string; min: number; max: number; mean: number }>): void {
    const statsPanel = document.getElementById('stats-panel');
    const statsContent = document.getElementById('stats-content');

    if (statsPanel && statsContent) {
      statsContent.innerHTML = stats
        .map(
          (stat) => `
        <div class="bg-gray-700/50 rounded p-3">
          <h4 class="text-xs text-gray-400 mb-2">${stat.label}</h4>
          <div class="text-sm text-gray-200 space-y-1">
            <div>Min: <span class="font-semibold">${stat.min.toFixed(1)}</span></div>
            <div>Max: <span class="font-semibold">${stat.max.toFixed(1)}</span></div>
            <div>Mean: <span class="font-semibold">${stat.mean.toFixed(1)}</span></div>
          </div>
        </div>
      `
        )
        .join('');

      statsPanel.classList.remove('hidden');
    }
  }
}
