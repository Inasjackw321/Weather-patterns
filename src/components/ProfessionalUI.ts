import type { WeatherModel, UserPreferences } from '../types/weather';
import { WEATHER_VARIABLES } from '../utils/weatherVariables';
import { WEATHER_MODELS, getProviders } from '../utils/models';
import { searchLocations } from '../api/openmeteo';

export class ProfessionalUI {
  private app: HTMLElement;
  private onPreferencesChange: (prefs: Partial<UserPreferences>) => void;
  private onFetchData: () => void;
  private onExport: (type: 'png' | 'svg' | 'csv') => void;

  constructor(
    appElement: HTMLElement,
    onPreferencesChange: (prefs: Partial<UserPreferences>) => void,
    onFetchData: () => void,
    onExport: (type: 'png' | 'svg' | 'csv') => void
  ) {
    this.app = appElement;
    this.onPreferencesChange = onPreferencesChange;
    this.onFetchData = onFetchData;
    this.onExport = onExport;
  }

  /**
   * Render the professional UI
   */
  public render(preferences: UserPreferences): void {
    this.app.innerHTML = `
      <div class="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
        <!-- Professional Header -->
        <header class="bg-slate-900/80 backdrop-blur-md border-b border-blue-500/20 sticky top-0 z-50 shadow-lg">
          <div class="container mx-auto px-6 py-5">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="text-4xl">🌍</div>
                <div>
                  <h1 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    MeteoScope
                  </h1>
                  <p class="text-xs text-slate-400 mt-0.5">Professional Weather Data Visualization Platform</p>
                </div>
              </div>
              <div class="hidden md:flex items-center space-x-6 text-sm">
                <div class="text-slate-400">
                  <span class="text-blue-400 font-semibold">40+</span> Weather Models
                </div>
                <div class="text-slate-400">
                  <span class="text-blue-400 font-semibold">Global</span> Coverage
                </div>
                <div class="text-slate-400">
                  <span class="text-blue-400 font-semibold">1940+</span> Historical
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Main Content -->
        <main class="container mx-auto px-6 py-8">
          <!-- Configuration Panel -->
          <div class="bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-700/50 shadow-2xl mb-8">
            <div class="p-6 border-b border-slate-700/50">
              <h2 class="text-xl font-semibold text-white flex items-center">
                <span class="mr-3 text-2xl">⚙️</span>
                Data Configuration
              </h2>
            </div>

            <div class="p-6">
              <!-- Main Controls Grid -->
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <!-- Location Selector -->
                <div class="lg:col-span-1">
                  <label class="block text-sm font-semibold text-blue-300 mb-2 flex items-center">
                    <span class="mr-2">📍</span> Location
                  </label>
                  <div class="relative">
                    <input
                      type="text"
                      id="location-search"
                      placeholder="Search any location worldwide..."
                      class="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value="${preferences.location.name || ''}"
                    />
                    <div class="absolute right-3 top-3 text-slate-500">
                      🔍
                    </div>
                  </div>
                  <div id="location-results" class="hidden mt-2 bg-slate-800 border border-slate-600 rounded-xl overflow-hidden shadow-xl max-h-64 overflow-y-auto"></div>
                </div>

                <!-- Data Type Selector -->
                <div>
                  <label class="block text-sm font-semibold text-blue-300 mb-2 flex items-center">
                    <span class="mr-2">📊</span> Data Type
                  </label>
                  <select
                    id="data-type"
                    class="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                  >
                    <option value="forecast">7-Day Forecast</option>
                    <option value="historical">Historical Archive</option>
                    <option value="model-comparison">Multi-Model Comparison</option>
                  </select>
                </div>

                <!-- Model Selector -->
                <div id="model-selector-container">
                  <label class="block text-sm font-semibold text-blue-300 mb-2 flex items-center">
                    <span class="mr-2">🌐</span> Weather Model
                  </label>
                  <select
                    id="weather-model"
                    class="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                  >
                    ${this.renderModelOptions(preferences.model)}
                  </select>
                </div>
              </div>

              <!-- Date Range (Hidden by default) -->
              <div id="date-range-container" class="hidden grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label class="block text-sm font-semibold text-blue-300 mb-2">
                    📅 Start Date
                  </label>
                  <input
                    type="date"
                    id="start-date"
                    value="${preferences.timeRange.start}"
                    max="${new Date().toISOString().split('T')[0]}"
                    class="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-blue-300 mb-2">
                    📅 End Date
                  </label>
                  <input
                    type="date"
                    id="end-date"
                    value="${preferences.timeRange.end}"
                    max="${new Date().toISOString().split('T')[0]}"
                    class="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              <!-- Variable Selection -->
              <div class="mb-6">
                <label class="block text-sm font-semibold text-blue-300 mb-3 flex items-center">
                  <span class="mr-2">📈</span> Weather Variables (Select Multiple)
                </label>
                <div id="variable-selector" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                  ${this.renderVariableCheckboxes(preferences.selectedVariables)}
                </div>
              </div>

              <!-- Chart Configuration -->
              <div class="mb-6 p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
                <h3 class="text-sm font-semibold text-slate-300 mb-3 flex items-center">
                  <span class="mr-2">🎨</span> Chart Appearance
                </h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <label class="flex items-center space-x-2 text-slate-300 cursor-pointer hover:text-white transition-colors">
                    <input
                      type="checkbox"
                      id="show-grid"
                      ${preferences.chartConfig.showGrid ? 'checked' : ''}
                      class="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 cursor-pointer"
                    />
                    <span class="text-sm">Grid Lines</span>
                  </label>
                  <label class="flex items-center space-x-2 text-slate-300 cursor-pointer hover:text-white transition-colors">
                    <input
                      type="checkbox"
                      id="show-legend"
                      ${preferences.chartConfig.showLegend ? 'checked' : ''}
                      class="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 cursor-pointer"
                    />
                    <span class="text-sm">Legend</span>
                  </label>
                  <div class="col-span-2">
                    <label class="block text-sm text-slate-300 mb-2">Line Smoothing: <span id="tension-value">${preferences.chartConfig.tension}</span></label>
                    <input
                      type="range"
                      id="line-tension"
                      min="0"
                      max="0.4"
                      step="0.1"
                      value="${preferences.chartConfig.tension}"
                      class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-wrap gap-3">
                <button
                  id="fetch-data-btn"
                  class="flex-1 min-w-[200px] px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  🔄 Visualize Data
                </button>
                <div class="relative group">
                  <button
                    id="export-btn"
                    class="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-green-500/50 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    💾 Export
                  </button>
                  <div id="export-menu" class="hidden absolute bottom-full mb-2 right-0 bg-slate-800 border border-slate-600 rounded-xl shadow-xl overflow-hidden min-w-[160px]">
                    <button data-export="png" class="w-full px-4 py-2 text-left text-white hover:bg-slate-700 transition-colors text-sm">📊 Export as PNG</button>
                    <button data-export="svg" class="w-full px-4 py-2 text-left text-white hover:bg-slate-700 transition-colors text-sm">🎨 Export as SVG</button>
                    <button data-export="csv" class="w-full px-4 py-2 text-left text-white hover:bg-slate-700 transition-colors text-sm">📄 Export as CSV</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Visualization Panel -->
          <div class="bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-700/50 shadow-2xl">
            <div class="p-6 border-b border-slate-700/50">
              <h2 class="text-xl font-semibold text-white flex items-center justify-between">
                <span class="flex items-center">
                  <span class="mr-3 text-2xl">📈</span>
                  Weather Data Visualization
                </span>
                <span id="location-display" class="text-sm text-slate-400">${preferences.location.name || 'No location selected'}</span>
              </h2>
            </div>

            <div class="p-6">
              <div id="loading-indicator" class="hidden flex flex-col items-center justify-center py-20">
                <div class="loader mb-4"></div>
                <p class="text-slate-400">Loading weather data...</p>
              </div>

              <div id="error-message" class="hidden bg-red-900/30 border border-red-700/50 text-red-200 px-6 py-4 rounded-xl mb-4 backdrop-blur-sm">
                <span class="font-semibold">Error:</span> <span id="error-text"></span>
              </div>

              <div id="info-message" class="bg-blue-900/30 border border-blue-700/50 text-blue-200 px-6 py-4 rounded-xl mb-4 backdrop-blur-sm">
                <span class="font-semibold">ℹ️ Getting Started:</span> Select weather variables and click "Visualize Data" to generate interactive charts
              </div>

              <div class="chart-container bg-slate-800/20 rounded-xl p-4">
                <canvas id="weather-chart"></canvas>
              </div>
            </div>
          </div>

          <!-- Statistics Panel -->
          <div id="stats-panel" class="hidden bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-700/50 shadow-2xl mt-8">
            <div class="p-6 border-b border-slate-700/50">
              <h2 class="text-xl font-semibold text-white flex items-center">
                <span class="mr-3 text-2xl">📊</span>
                Statistical Analysis
              </h2>
            </div>
            <div class="p-6">
              <div id="stats-content" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"></div>
            </div>
          </div>
        </main>

        <!-- Professional Footer -->
        <footer class="bg-slate-900/80 backdrop-blur-md border-t border-blue-500/20 mt-12">
          <div class="container mx-auto px-6 py-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
              <div>
                <h3 class="text-lg font-semibold text-white mb-3">MeteoScope</h3>
                <p class="text-slate-400 text-sm">Professional weather data visualization platform with global coverage and advanced analytics.</p>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-white mb-3">Data Sources</h3>
                <ul class="text-slate-400 text-sm space-y-1">
                  <li>• Open-Meteo API</li>
                  <li>• ECMWF, NOAA, DWD</li>
                  <li>• 40+ Weather Models</li>
                  <li>• Historical Archives (1940+)</li>
                </ul>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-white mb-3">Features</h3>
                <ul class="text-slate-400 text-sm space-y-1">
                  <li>• Multi-Model Comparison</li>
                  <li>• Export (PNG/SVG/CSV)</li>
                  <li>• Real-time Statistics</li>
                  <li>• Global Location Search</li>
                </ul>
              </div>
            </div>
            <div class="border-t border-slate-700/50 pt-6 text-center">
              <p class="text-slate-500 text-sm">
                Powered by <a href="https://open-meteo.com/" target="_blank" class="text-blue-400 hover:text-blue-300 transition-colors">Open-Meteo API</a> |
                Built with Chart.js & TypeScript |
                <span class="text-slate-600">©2024 MeteoScope</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    `;

    this.attachEventListeners(preferences);
  }

  private renderModelOptions(currentModel: WeatherModel): string {
    const providers = getProviders();
    let html = '';

    providers.forEach((provider) => {
      const models = WEATHER_MODELS.filter((m) => m.provider === provider);
      html += `<optgroup label="${provider}">`;
      models.forEach((model) => {
        html += `<option value="${model.id}" ${model.id === currentModel ? 'selected' : ''}>
          ${model.name} (${model.resolution}, ${model.region})
        </option>`;
      });
      html += `</optgroup>`;
    });

    return html;
  }

  private renderVariableCheckboxes(selectedVariables: string[]): string {
    return WEATHER_VARIABLES.slice(0, 18)
      .map(
        (variable) => `
        <label class="flex items-center space-x-2 text-sm text-slate-300 cursor-pointer hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-800/50">
          <input
            type="checkbox"
            name="variable"
            value="${variable.id}"
            ${selectedVariables.includes(variable.id) ? 'checked' : ''}
            class="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 cursor-pointer"
          />
          <span class="flex-1">${variable.name}</span>
        </label>
      `
      )
      .join('');
  }

  private attachEventListeners(preferences: UserPreferences): void {
    // Location search
    const locationSearch = document.getElementById('location-search') as HTMLInputElement;
    const locationResults = document.getElementById('location-results') as HTMLDivElement;
    const locationDisplay = document.getElementById('location-display');

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
          const results = await searchLocations(query, 8);

          if (results.length > 0) {
            locationResults.innerHTML = results
              .map(
                (result: any) => `
                <div class="px-4 py-3 hover:bg-slate-700 cursor-pointer location-result transition-colors border-b border-slate-700 last:border-0"
                     data-lat="${result.latitude}"
                     data-lon="${result.longitude}"
                     data-name="${result.name}${result.admin1 ? ', ' + result.admin1 : ''}, ${result.country}">
                  <div class="font-medium text-white">${result.name}</div>
                  <div class="text-xs text-slate-400">${result.admin1 ? result.admin1 + ', ' : ''}${result.country}</div>
                </div>
              `
              )
              .join('');
            locationResults.classList.remove('hidden');

            locationResults.querySelectorAll('.location-result').forEach((el) => {
              el.addEventListener('click', () => {
                const lat = parseFloat(el.getAttribute('data-lat')!);
                const lon = parseFloat(el.getAttribute('data-lon')!);
                const name = el.getAttribute('data-name')!;

                locationSearch.value = name;
                locationResults.classList.add('hidden');
                if (locationDisplay) {
                  locationDisplay.textContent = name;
                }

                this.onPreferencesChange({
                  location: { latitude: lat, longitude: lon, name },
                });
              });
            });
          } else {
            locationResults.innerHTML = '<div class="px-4 py-3 text-slate-500">No locations found</div>';
            locationResults.classList.remove('hidden');
          }
        } catch (error) {
          console.error('Location search error:', error);
        }
      }, 300);
    });

    // Close location results when clicking outside
    document.addEventListener('click', (e) => {
      if (!locationSearch?.contains(e.target as Node) && !locationResults?.contains(e.target as Node)) {
        locationResults?.classList.add('hidden');
      }
    });

    // Data type change
    const dataTypeSelect = document.getElementById('data-type') as HTMLSelectElement;
    const dateRangeContainer = document.getElementById('date-range-container');
    const modelSelectorContainer = document.getElementById('model-selector-container');

    dataTypeSelect?.addEventListener('change', (e) => {
      const value = (e.target as HTMLSelectElement).value;

      if (value === 'historical') {
        dateRangeContainer?.classList.remove('hidden');
      } else {
        dateRangeContainer?.classList.add('hidden');
      }

      if (value === 'model-comparison') {
        modelSelectorContainer?.classList.add('hidden');
      } else {
        modelSelectorContainer?.classList.remove('hidden');
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
    const tensionValue = document.getElementById('tension-value');

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
      const value = (e.target as HTMLInputElement).value;
      if (tensionValue) tensionValue.textContent = value;

      this.onPreferencesChange({
        chartConfig: {
          ...preferences.chartConfig,
          tension: parseFloat(value),
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

    // Fetch data button
    const fetchBtn = document.getElementById('fetch-data-btn');
    fetchBtn?.addEventListener('click', () => this.onFetchData());

    // Export menu
    const exportBtn = document.getElementById('export-btn');
    const exportMenu = document.getElementById('export-menu');

    exportBtn?.addEventListener('click', () => {
      exportMenu?.classList.toggle('hidden');
    });

    exportMenu?.querySelectorAll('[data-export]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-export') as 'png' | 'svg' | 'csv';
        this.onExport(type);
        exportMenu.classList.add('hidden');
      });
    });

    // Close export menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!exportBtn?.contains(e.target as Node) && !exportMenu?.contains(e.target as Node)) {
        exportMenu?.classList.add('hidden');
      }
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
    const errorText = document.getElementById('error-text');
    if (errorMsg && errorText) {
      errorText.textContent = message;
      errorMsg.classList.remove('hidden');
    }
    this.hideLoading();
  }

  public hideError(): void {
    const errorMsg = document.getElementById('error-message');
    errorMsg?.classList.add('hidden');
  }

  public showStats(stats: Array<{ label: string; min: number; max: number; mean: number; median: number }>): void {
    const statsPanel = document.getElementById('stats-panel');
    const statsContent = document.getElementById('stats-content');

    if (statsPanel && statsContent) {
      statsContent.innerHTML = stats
        .map(
          (stat) => `
        <div class="bg-gradient-to-br from-slate-800/50 to-slate-800/30 rounded-xl p-4 border border-slate-700/30 hover:border-blue-500/30 transition-all">
          <h4 class="text-xs font-semibold text-blue-300 mb-3 uppercase tracking-wider">${stat.label}</h4>
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-slate-400">Min</span>
              <span class="text-white font-semibold">${stat.min.toFixed(2)}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-slate-400">Max</span>
              <span class="text-white font-semibold">${stat.max.toFixed(2)}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-slate-400">Mean</span>
              <span class="text-white font-semibold">${stat.mean.toFixed(2)}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-slate-400">Median</span>
              <span class="text-white font-semibold">${stat.median.toFixed(2)}</span>
            </div>
          </div>
        </div>
      `
        )
        .join('');

      statsPanel.classList.remove('hidden');
    }
  }

  public getDataType(): string {
    return (document.getElementById('data-type') as HTMLSelectElement)?.value || 'forecast';
  }
}
