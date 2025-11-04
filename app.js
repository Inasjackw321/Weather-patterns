// MetScope DataHub - Comprehensive Weather Intelligence Platform
// Advanced meteorological data analysis with multiple data sources

console.log('🌐 MetScope DataHub - Initializing...');

// ============================================================================
// CONFIGURATION & CONSTANTS
// ============================================================================

// Comprehensive weather variables
const WEATHER_VARIABLES = [
    // Temperature
    { id: 'temperature_2m', name: 'Temperature (2m)', unit: '°C', cat: 'temp', color: '#ef4444' },
    { id: 'temperature_80m', name: 'Temperature (80m)', unit: '°C', cat: 'temp', color: '#f97316' },
    { id: 'temperature_120m', name: 'Temperature (120m)', unit: '°C', cat: 'temp', color: '#f59e0b' },
    { id: 'temperature_180m', name: 'Temperature (180m)', unit: '°C', cat: 'temp', color: '#eab308' },

    // Humidity & Dewpoint
    { id: 'relative_humidity_2m', name: 'Rel. Humidity (2m)', unit: '%', cat: 'humid', color: '#06b6d4' },
    { id: 'dew_point_2m', name: 'Dew Point (2m)', unit: '°C', cat: 'temp', color: '#0ea5e9' },
    { id: 'apparent_temperature', name: 'Feels Like', unit: '°C', cat: 'temp', color: '#ec4899' },

    // Precipitation
    { id: 'precipitation', name: 'Precipitation', unit: 'mm', cat: 'precip', color: '#3b82f6' },
    { id: 'precipitation_probability', name: 'Precip Probability', unit: '%', cat: 'precip', color: '#6366f1' },
    { id: 'rain', name: 'Rain', unit: 'mm', cat: 'precip', color: '#2563eb' },
    { id: 'showers', name: 'Showers', unit: 'mm', cat: 'precip', color: '#1d4ed8' },
    { id: 'snowfall', name: 'Snowfall', unit: 'cm', cat: 'precip', color: '#60a5fa' },
    { id: 'snow_depth', name: 'Snow Depth', unit: 'm', cat: 'precip', color: '#93c5fd' },

    // Clouds
    { id: 'cloud_cover', name: 'Total Cloud Cover', unit: '%', cat: 'cloud', color: '#94a3b8' },
    { id: 'cloud_cover_low', name: 'Low Clouds', unit: '%', cat: 'cloud', color: '#64748b' },
    { id: 'cloud_cover_mid', name: 'Mid Clouds', unit: '%', cat: 'cloud', color: '#475569' },
    { id: 'cloud_cover_high', name: 'High Clouds', unit: '%', cat: 'cloud', color: '#334155' },

    // Wind
    { id: 'wind_speed_10m', name: 'Wind Speed (10m)', unit: 'km/h', cat: 'wind', color: '#10b981' },
    { id: 'wind_speed_80m', name: 'Wind Speed (80m)', unit: 'km/h', cat: 'wind', color: '#059669' },
    { id: 'wind_speed_120m', name: 'Wind Speed (120m)', unit: 'km/h', cat: 'wind', color: '#047857' },
    { id: 'wind_speed_180m', name: 'Wind Speed (180m)', unit: 'km/h', cat: 'wind', color: '#065f46' },
    { id: 'wind_direction_10m', name: 'Wind Direction (10m)', unit: '°', cat: 'wind', color: '#34d399' },
    { id: 'wind_direction_80m', name: 'Wind Direction (80m)', unit: '°', cat: 'wind', color: '#6ee7b7' },
    { id: 'wind_gusts_10m', name: 'Wind Gusts (10m)', unit: 'km/h', cat: 'wind', color: '#14b8a6' },

    // Pressure
    { id: 'surface_pressure', name: 'Surface Pressure', unit: 'hPa', cat: 'pressure', color: '#8b5cf6' },
    { id: 'pressure_msl', name: 'Sea Level Pressure', unit: 'hPa', cat: 'pressure', color: '#7c3aed' },

    // Solar Radiation
    { id: 'shortwave_radiation', name: 'Solar Radiation', unit: 'W/m²', cat: 'radiation', color: '#f59e0b' },
    { id: 'direct_radiation', name: 'Direct Radiation', unit: 'W/m²', cat: 'radiation', color: '#fbbf24' },
    { id: 'diffuse_radiation', name: 'Diffuse Radiation', unit: 'W/m²', cat: 'radiation', color: '#fcd34d' },

    // Severe Weather
    { id: 'cape', name: 'CAPE', unit: 'J/kg', cat: 'severe', color: '#dc2626' },
    { id: 'lifted_index', name: 'Lifted Index', unit: '°C', cat: 'severe', color: '#b91c1c' },

    // Other
    { id: 'visibility', name: 'Visibility', unit: 'm', cat: 'other', color: '#64748b' },
    { id: 'weather_code', name: 'Weather Code', unit: 'WMO', cat: 'other', color: '#475569' },
    { id: 'et0_fao_evapotranspiration', name: 'Evapotranspiration', unit: 'mm', cat: 'other', color: '#84cc16' },
];

// Air Quality variables
const AIR_QUALITY_VARIABLES = [
    { id: 'pm10', name: 'PM10', unit: 'µg/m³', color: '#ef4444' },
    { id: 'pm2_5', name: 'PM2.5', unit: 'µg/m³', color: '#f97316' },
    { id: 'carbon_monoxide', name: 'Carbon Monoxide', unit: 'µg/m³', color: '#f59e0b' },
    { id: 'nitrogen_dioxide', name: 'Nitrogen Dioxide', unit: 'µg/m³', color: '#eab308' },
    { id: 'sulphur_dioxide', name: 'Sulphur Dioxide', unit: 'µg/m³', color: '#84cc16' },
    { id: 'ozone', name: 'Ozone', unit: 'µg/m³', color: '#22c55e' },
    { id: 'aerosol_optical_depth', name: 'Aerosol Optical Depth', unit: '', color: '#10b981' },
    { id: 'dust', name: 'Dust', unit: 'µg/m³', color: '#d97706' },
    { id: 'uv_index', name: 'UV Index', unit: '', color: '#a855f7' },
    { id: 'uv_index_clear_sky', name: 'UV Index (Clear Sky)', unit: '', color: '#9333ea' },
];

// Marine variables
const MARINE_VARIABLES = [
    { id: 'wave_height', name: 'Wave Height', unit: 'm', color: '#0ea5e9' },
    { id: 'wave_direction', name: 'Wave Direction', unit: '°', color: '#06b6d4' },
    { id: 'wave_period', name: 'Wave Period', unit: 's', color: '#0284c7' },
    { id: 'ocean_current_velocity', name: 'Ocean Current Velocity', unit: 'm/s', color: '#0369a1' },
    { id: 'ocean_current_direction', name: 'Ocean Current Direction', unit: '°', color: '#075985' },
];

// Application state
const state = {
    location: {
        latitude: 51.5074,
        longitude: -0.1278,
        name: 'London, United Kingdom'
    },
    currentSection: 'forecast',
    charts: [],
    currentData: null,
    airQualityData: null,
    marineData: null,
    alerts: [],
    savedQueries: [],
    updateInterval: null,
    theme: 'dark',
};

// IndexedDB configuration
let db = null;
const DB_NAME = 'MetScopeDataHub';
const DB_VERSION = 1;

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('✓ DOM Loaded');
    initializeApp();
});

async function initializeApp() {
    await initializeDatabase();
    initializeVariables();
    setupEventListeners();
    setDefaultDates();
    loadTheme();
    loadSavedQueries();
    updateCoordinatesDisplay();
    showMessage('MetScope DataHub ready! Select variables and visualize data.', 'info');
    console.log('✓ MetScope DataHub Ready!');
}

// ============================================================================
// DATABASE MANAGEMENT (IndexedDB)
// ============================================================================

async function initializeDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => {
            console.error('Database error:', request.error);
            reject(request.error);
        };

        request.onsuccess = () => {
            db = request.result;
            console.log('✓ Database initialized');
            resolve(db);
        };

        request.onupgradeneeded = (event) => {
            db = event.target.result;

            // Create object stores
            if (!db.objectStoreNames.contains('queries')) {
                const queryStore = db.createObjectStore('queries', { keyPath: 'id', autoIncrement: true });
                queryStore.createIndex('timestamp', 'timestamp', { unique: false });
                queryStore.createIndex('location', 'location', { unique: false });
            }

            if (!db.objectStoreNames.contains('alerts')) {
                const alertStore = db.createObjectStore('alerts', { keyPath: 'id', autoIncrement: true });
                alertStore.createIndex('timestamp', 'timestamp', { unique: false });
            }

            console.log('✓ Database schema created');
        };
    });
}

async function saveQuery(queryData) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['queries'], 'readwrite');
        const store = transaction.objectStore('queries');

        const query = {
            ...queryData,
            timestamp: new Date().toISOString(),
        };

        const request = store.add(query);

        request.onsuccess = () => {
            state.savedQueries.push({ id: request.result, ...query });
            updateStorageInfo();
            resolve(request.result);
        };

        request.onerror = () => reject(request.error);
    });
}

async function loadSavedQueries() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['queries'], 'readonly');
        const store = transaction.objectStore('queries');
        const request = store.getAll();

        request.onsuccess = () => {
            state.savedQueries = request.result;
            updateStorageInfo();
            displaySavedQueries();
            resolve(request.result);
        };

        request.onerror = () => reject(request.error);
    });
}

async function clearAllQueries() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['queries'], 'readwrite');
        const store = transaction.objectStore('queries');
        const request = store.clear();

        request.onsuccess = () => {
            state.savedQueries = [];
            updateStorageInfo();
            displaySavedQueries();
            showMessage('All saved queries cleared', 'success');
            resolve();
        };

        request.onerror = () => reject(request.error);
    });
}

function updateStorageInfo() {
    const info = document.getElementById('storage-info');
    info.textContent = `Storage: ${state.savedQueries.length} saved queries`;
}

function displaySavedQueries() {
    const container = document.getElementById('saved-queries-list');

    if (state.savedQueries.length === 0) {
        container.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--text-secondary);">No saved queries</div>';
        return;
    }

    container.innerHTML = state.savedQueries.map(query => `
        <div style="padding: 12px; background: rgba(59, 130, 246, 0.1); border-radius: 8px; margin-bottom: 8px; border-left: 3px solid var(--primary);">
            <div style="font-weight: 600; margin-bottom: 4px;">${query.location}</div>
            <div style="font-size: 11px; color: var(--text-secondary);">
                ${new Date(query.timestamp).toLocaleString()} |
                Variables: ${query.variables.length} |
                Section: ${query.section}
            </div>
        </div>
    `).join('');
}

// ============================================================================
// UI INITIALIZATION
// ============================================================================

function initializeVariables() {
    const container = document.getElementById('variables');
    WEATHER_VARIABLES.forEach((variable, index) => {
        const label = document.createElement('label');
        label.className = 'checkbox-label';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = variable.id;
        checkbox.id = `var-${variable.id}`;
        if (index < 5) checkbox.checked = true; // Default first 5

        const span = document.createElement('span');
        span.textContent = variable.name;
        span.style.color = variable.color;

        label.appendChild(checkbox);
        label.appendChild(span);
        container.appendChild(label);
    });
}

function setupEventListeners() {
    // Main tabs
    document.querySelectorAll('.main-tab').forEach(tab => {
        tab.addEventListener('click', () => switchSection(tab.dataset.section));
    });

    // Location search
    setupLocationSearch();

    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

    // Primary buttons
    document.getElementById('visualize-btn').addEventListener('click', visualizeData);
    document.getElementById('save-data-btn').addEventListener('click', saveCurrentData);
    document.getElementById('export-btn').addEventListener('click', showExportOptions);

    // Historical
    document.getElementById('fetch-historical-btn').addEventListener('click', fetchHistoricalData);

    // Soundings
    document.getElementById('refresh-sounding-btn').addEventListener('click', refreshSounding);
    document.getElementById('export-sounding-btn').addEventListener('click', exportSounding);

    // Storage
    document.getElementById('clear-storage-btn').addEventListener('click', () => {
        if (confirm('Clear all saved queries?')) {
            clearAllQueries();
        }
    });

    // Auto-update interval
    document.getElementById('update-interval').addEventListener('change', (e) => {
        const minutes = parseInt(e.target.value);
        setupAutoUpdate(minutes);
    });

    // Close location results on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#location-search') && !e.target.closest('#location-results')) {
            hideLocationResults();
        }
    });
}

// ============================================================================
// SECTION NAVIGATION
// ============================================================================

function switchSection(sectionName) {
    // Update tabs
    document.querySelectorAll('.main-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.main-tab[data-section="${sectionName}"]`).classList.add('active');

    // Update content
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById(`section-${sectionName}`).classList.add('active');

    state.currentSection = sectionName;
    console.log(`Switched to section: ${sectionName}`);
}

// ============================================================================
// THEME MANAGEMENT
// ============================================================================

function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', state.theme);
    document.getElementById('theme-toggle').textContent = state.theme === 'dark' ? '🌙' : '☀️';
    localStorage.setItem('theme', state.theme);
    showMessage(`Switched to ${state.theme} mode`, 'info');
}

function loadTheme() {
    const saved = localStorage.getItem('theme') || 'dark';
    state.theme = saved;
    document.body.setAttribute('data-theme', saved);
    document.getElementById('theme-toggle').textContent = saved === 'dark' ? '🌙' : '☀️';
}

// ============================================================================
// LOCATION MANAGEMENT
// ============================================================================

function setupLocationSearch() {
    const locationSearch = document.getElementById('location-search');
    let searchTimeout;

    locationSearch.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value;

        if (query.length < 2) {
            hideLocationResults();
            return;
        }

        searchTimeout = setTimeout(() => searchLocation(query), 500);
    });
}

async function searchLocation(query) {
    try {
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=en&format=json`
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            showLocationResults(data.results);
        } else {
            hideLocationResults();
        }
    } catch (error) {
        console.error('Location search error:', error);
    }
}

function showLocationResults(results) {
    const container = document.getElementById('location-results');
    container.innerHTML = '';

    results.forEach(result => {
        const div = document.createElement('div');
        div.className = 'location-result';
        div.innerHTML = `
            <div style="font-weight: 600;">${result.name}</div>
            <div style="font-size: 11px; color: var(--text-secondary);">
                ${result.admin1 ? result.admin1 + ', ' : ''}${result.country}
                (${result.latitude.toFixed(2)}°, ${result.longitude.toFixed(2)}°)
            </div>
        `;

        div.addEventListener('click', () => {
            state.location = {
                latitude: result.latitude,
                longitude: result.longitude,
                name: `${result.name}, ${result.country}`
            };
            document.getElementById('location-search').value = state.location.name;
            updateCoordinatesDisplay();
            hideLocationResults();
            showMessage(`Location set to ${state.location.name}`, 'success');
        });

        container.appendChild(div);
    });

    container.classList.remove('hidden');
}

function hideLocationResults() {
    document.getElementById('location-results').classList.add('hidden');
}

function updateCoordinatesDisplay() {
    const lat = state.location.latitude;
    const lon = state.location.longitude;
    const latDir = lat >= 0 ? 'N' : 'S';
    const lonDir = lon >= 0 ? 'E' : 'W';
    document.getElementById('current-coords').textContent =
        `${Math.abs(lat).toFixed(2)}°${latDir}, ${Math.abs(lon).toFixed(2)}°${lonDir}`;
}

// ============================================================================
// DATA FETCHING
// ============================================================================

function getSelectedVariables() {
    const checkboxes = document.querySelectorAll('#variables input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

async function visualizeData() {
    const selectedVars = getSelectedVariables();

    if (selectedVars.length === 0) {
        showMessage('Please select at least one weather variable', 'error');
        return;
    }

    showLoading();
    showProgress(0);

    try {
        switch (state.currentSection) {
            case 'forecast':
                await fetchAndDisplayForecast(selectedVars);
                break;
            case 'soundings':
                await fetchAndDisplaySoundings();
                break;
            case 'severe':
                await fetchAndDisplaySevere(selectedVars);
                break;
            case 'airquality':
                await fetchAndDisplayAirQuality();
                break;
            case 'marine':
                await fetchAndDisplayMarine();
                break;
            case 'stats':
                await generateStatistics(selectedVars);
                break;
            default:
                await fetchAndDisplayForecast(selectedVars);
        }

        showProgress(100);
        showMessage('✓ Data loaded successfully!', 'success');

    } catch (error) {
        console.error('Fetch error:', error);
        showMessage('Failed to fetch data: ' + error.message, 'error');
    } finally {
        hideLoading();
        setTimeout(() => hideProgress(), 500);
    }
}

async function fetchAndDisplayForecast(variables) {
    const model = document.getElementById('weather-model').value;
    const days = document.getElementById('forecast-days').value;

    const params = new URLSearchParams({
        latitude: state.location.latitude,
        longitude: state.location.longitude,
        hourly: variables.join(','),
        timezone: 'auto',
        forecast_days: days
    });

    if (model !== 'best_match') {
        params.append('models', model);
    }

    showProgress(25);
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    showProgress(50);
    const data = await response.json();
    state.currentData = data;

    showProgress(75);
    displayForecastPanels(data, variables);
}

function displayForecastPanels(data, selectedVars) {
    const container = document.getElementById('forecast-panels');

    // Clear existing
    state.charts.forEach(chart => chart.destroy());
    state.charts = [];
    container.innerHTML = '';

    selectedVars.forEach((varId, index) => {
        const variable = WEATHER_VARIABLES.find(v => v.id === varId);
        if (!variable || !data.hourly || !data.hourly[varId]) return;

        const panel = document.createElement('div');
        panel.className = 'panel';
        panel.style.animationDelay = `${index * 0.1}s`;
        panel.innerHTML = `
            <div class="panel-header">
                <h3 class="panel-title">${variable.name} (${variable.unit})</h3>
                <div class="panel-controls">
                    <button class="panel-btn" onclick="exportChartData('${varId}')">💾 Export</button>
                </div>
            </div>
            <div class="chart-container">
                <canvas id="chart-${varId}"></canvas>
            </div>
        `;
        container.appendChild(panel);

        setTimeout(() => {
            const ctx = document.getElementById(`chart-${varId}`);
            const chart = createChart(ctx, data.hourly.time, data.hourly[varId], variable);
            state.charts.push(chart);
        }, index * 100);
    });
}

function createChart(ctx, timeData, values, variable) {
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeData,
            datasets: [{
                label: `${variable.name} (${variable.unit})`,
                data: values,
                borderColor: variable.color,
                backgroundColor: variable.color + '20',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: variable.color,
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            },
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(17, 24, 39, 0.95)',
                    titleColor: '#f3f4f6',
                    bodyColor: '#e5e7eb',
                    borderColor: variable.color,
                    borderWidth: 2,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        title: (context) => {
                            const date = new Date(context[0].label);
                            return date.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        tooltipFormat: 'MMM dd, HH:mm',
                        displayFormats: {
                            hour: 'MMM dd HH:mm',
                            day: 'MMM dd'
                        }
                    },
                    grid: {
                        color: 'rgba(75, 85, 99, 0.2)'
                    },
                    ticks: {
                        color: '#9ca3af',
                        maxRotation: 45
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(75, 85, 99, 0.2)'
                    },
                    ticks: {
                        color: '#9ca3af'
                    }
                }
            }
        }
    });
}

// ============================================================================
// SEVERE WEATHER CALCULATIONS
// ============================================================================

async function fetchAndDisplaySevere(variables) {
    const severVars = ['cape', 'lifted_index', 'precipitation', 'wind_speed_10m', 'wind_speed_80m',
                       'wind_direction_10m', 'wind_direction_80m', 'temperature_2m'];

    const params = new URLSearchParams({
        latitude: state.location.latitude,
        longitude: state.location.longitude,
        hourly: severVars.join(','),
        timezone: 'auto',
        forecast_days: 7
    });

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();

    // Calculate severe weather parameters
    const severeParams = calculateSevereWeatherParameters(data.hourly);

    // Display stats
    displaySevereStats(severeParams);

    // Display charts
    displaySeverePanels(data, severeParams);
}

function calculateSevereWeatherParameters(hourly) {
    const params = {
        maxCAPE: 0,
        maxLiftedIndex: 0,
        maxWindShear: 0,
        significantTornadoParameter: [],
        supercellComposite: [],
        helicity: [],
    };

    if (!hourly.cape || !hourly.wind_speed_10m) return params;

    // Find maximum values
    params.maxCAPE = Math.max(...hourly.cape.filter(v => v !== null));
    params.maxLiftedIndex = Math.min(...hourly.lifted_index.filter(v => v !== null));

    // Calculate wind shear (80m - 10m)
    hourly.wind_speed_10m.forEach((ws10, i) => {
        const ws80 = hourly.wind_speed_80m[i];
        if (ws10 !== null && ws80 !== null) {
            const shear = ws80 - ws10;
            params.maxWindShear = Math.max(params.maxWindShear, shear);
        }
    });

    // Simplified STP calculation (Significant Tornado Parameter)
    hourly.cape.forEach((cape, i) => {
        if (cape === null) {
            params.significantTornadoParameter.push(null);
            return;
        }

        const li = hourly.lifted_index[i] || 0;
        const shear = (hourly.wind_speed_80m[i] || 0) - (hourly.wind_speed_10m[i] || 0);

        // Simplified STP formula
        const stp = (cape / 1500) * Math.abs(li / 6) * (shear / 20);
        params.significantTornadoParameter.push(Math.max(0, stp));
    });

    // Simplified Supercell Composite
    hourly.cape.forEach((cape, i) => {
        if (cape === null) {
            params.supercellComposite.push(null);
            return;
        }

        const shear = (hourly.wind_speed_80m[i] || 0) - (hourly.wind_speed_10m[i] || 0);
        const composite = (cape / 2000) * (shear / 25);
        params.supercellComposite.push(Math.max(0, Math.min(composite, 10)));
    });

    // Simplified Helicity calculation
    hourly.wind_speed_10m.forEach((ws10, i) => {
        const ws80 = hourly.wind_speed_80m[i];
        const wd10 = hourly.wind_direction_10m[i];
        const wd80 = hourly.wind_direction_80m[i];

        if (ws10 !== null && ws80 !== null && wd10 !== null && wd80 !== null) {
            // Simplified helicity based on directional shear
            const dirShear = Math.abs(wd80 - wd10);
            const helicity = (ws10 + ws80) / 2 * dirShear / 180 * 100;
            params.helicity.push(helicity);
        } else {
            params.helicity.push(null);
        }
    });

    return params;
}

function displaySevereStats(params) {
    const container = document.getElementById('severe-stats');
    container.innerHTML = `
        <div class="stat-card">
            <div class="stat-value">${params.maxCAPE.toFixed(0)}</div>
            <div class="stat-label">Max CAPE (J/kg)</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${params.maxLiftedIndex.toFixed(1)}</div>
            <div class="stat-label">Min Lifted Index (°C)</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${params.maxWindShear.toFixed(1)}</div>
            <div class="stat-label">Max Wind Shear (km/h)</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${Math.max(...params.significantTornadoParameter.filter(v => v !== null)).toFixed(2)}</div>
            <div class="stat-label">Max STP</div>
        </div>
    `;
}

function displaySeverePanels(data, severeParams) {
    const container = document.getElementById('severe-panels');
    container.innerHTML = '';

    // STP Chart
    const stpPanel = document.createElement('div');
    stpPanel.className = 'panel';
    stpPanel.innerHTML = `
        <div class="panel-header">
            <h3 class="panel-title">Significant Tornado Parameter (STP)</h3>
        </div>
        <div class="chart-container">
            <canvas id="chart-stp"></canvas>
        </div>
    `;
    container.appendChild(stpPanel);

    setTimeout(() => {
        const ctx = document.getElementById('chart-stp');
        const chart = createChart(ctx, data.hourly.time, severeParams.significantTornadoParameter,
            { name: 'STP', unit: '', color: '#dc2626' });
        state.charts.push(chart);
    }, 100);

    // Supercell Composite Chart
    const scPanel = document.createElement('div');
    scPanel.className = 'panel';
    scPanel.innerHTML = `
        <div class="panel-header">
            <h3 class="panel-title">Supercell Composite</h3>
        </div>
        <div class="chart-container">
            <canvas id="chart-supercell"></canvas>
        </div>
    `;
    container.appendChild(scPanel);

    setTimeout(() => {
        const ctx = document.getElementById('chart-supercell');
        const chart = createChart(ctx, data.hourly.time, severeParams.supercellComposite,
            { name: 'Supercell Composite', unit: '', color: '#f59e0b' });
        state.charts.push(chart);
    }, 200);
}

// ============================================================================
// AIR QUALITY
// ============================================================================

async function fetchAndDisplayAirQuality() {
    const params = new URLSearchParams({
        latitude: state.location.latitude,
        longitude: state.location.longitude,
        hourly: 'pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,dust,uv_index',
        timezone: 'auto'
    });

    showProgress(30);
    const response = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?${params}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    showProgress(60);
    const data = await response.json();
    state.airQualityData = data;

    showProgress(80);
    displayAirQualityData(data);
}

function displayAirQualityData(data) {
    const statsContainer = document.getElementById('airquality-stats');
    const panelsContainer = document.getElementById('airquality-panels');

    // Clear existing
    statsContainer.innerHTML = '';
    panelsContainer.innerHTML = '';

    // Display current values as stats
    const currentIndex = 0; // Most recent
    AIR_QUALITY_VARIABLES.forEach(variable => {
        if (!data.hourly[variable.id]) return;

        const value = data.hourly[variable.id][currentIndex];
        if (value === null) return;

        const statCard = document.createElement('div');
        statCard.className = 'stat-card';
        statCard.innerHTML = `
            <div class="stat-value">${value.toFixed(1)}</div>
            <div class="stat-label">${variable.name} (${variable.unit})</div>
        `;
        statsContainer.appendChild(statCard);
    });

    // Display charts
    AIR_QUALITY_VARIABLES.forEach((variable, index) => {
        if (!data.hourly[variable.id]) return;

        const panel = document.createElement('div');
        panel.className = 'panel';
        panel.style.animationDelay = `${index * 0.1}s`;
        panel.innerHTML = `
            <div class="panel-header">
                <h3 class="panel-title">${variable.name} (${variable.unit})</h3>
            </div>
            <div class="chart-container">
                <canvas id="chart-aq-${variable.id}"></canvas>
            </div>
        `;
        panelsContainer.appendChild(panel);

        setTimeout(() => {
            const ctx = document.getElementById(`chart-aq-${variable.id}`);
            const chart = createChart(ctx, data.hourly.time, data.hourly[variable.id], variable);
            state.charts.push(chart);
        }, index * 100);
    });
}

// ============================================================================
// MARINE DATA
// ============================================================================

async function fetchAndDisplayMarine() {
    const params = new URLSearchParams({
        latitude: state.location.latitude,
        longitude: state.location.longitude,
        hourly: 'wave_height,wave_direction,wave_period',
        timezone: 'auto'
    });

    showProgress(30);
    const response = await fetch(`https://marine-api.open-meteo.com/v1/marine?${params}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    showProgress(60);
    const data = await response.json();
    state.marineData = data;

    showProgress(80);
    displayMarineData(data);
}

function displayMarineData(data) {
    const statsContainer = document.getElementById('marine-stats');
    const panelsContainer = document.getElementById('marine-panels');

    statsContainer.innerHTML = '';
    panelsContainer.innerHTML = '';

    // Stats
    if (data.hourly.wave_height) {
        const maxWave = Math.max(...data.hourly.wave_height.filter(v => v !== null));
        const avgWave = data.hourly.wave_height.filter(v => v !== null).reduce((a, b) => a + b, 0) /
                       data.hourly.wave_height.filter(v => v !== null).length;

        statsContainer.innerHTML = `
            <div class="stat-card">
                <div class="stat-value">${maxWave.toFixed(2)}</div>
                <div class="stat-label">Max Wave Height (m)</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${avgWave.toFixed(2)}</div>
                <div class="stat-label">Avg Wave Height (m)</div>
            </div>
        `;
    }

    // Charts
    MARINE_VARIABLES.forEach((variable, index) => {
        if (!data.hourly[variable.id]) return;

        const panel = document.createElement('div');
        panel.className = 'panel';
        panel.innerHTML = `
            <div class="panel-header">
                <h3 class="panel-title">${variable.name} (${variable.unit})</h3>
            </div>
            <div class="chart-container">
                <canvas id="chart-marine-${variable.id}"></canvas>
            </div>
        `;
        panelsContainer.appendChild(panel);

        setTimeout(() => {
            const ctx = document.getElementById(`chart-marine-${variable.id}`);
            const chart = createChart(ctx, data.hourly.time, data.hourly[variable.id], variable);
            state.charts.push(chart);
        }, index * 100);
    });
}

// ============================================================================
// SOUNDINGS (SKEW-T & HODOGRAPH)
// ============================================================================

async function refreshSounding() {
    showLoading();

    try {
        const pressureLevels = [1000, 925, 850, 700, 500, 300, 250, 200];
        const params = new URLSearchParams({
            latitude: state.location.latitude,
            longitude: state.location.longitude,
            hourly: 'temperature_2m,temperature_80m,temperature_120m,dew_point_2m,wind_speed_10m,wind_speed_80m,wind_speed_120m,wind_direction_10m,wind_direction_80m,wind_direction_120m',
            timezone: 'auto',
            forecast_days: 1
        });

        const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
        const data = await response.json();

        drawSkewT(data);
        drawHodograph(data);
        updateProfileTable(data);

        showMessage('Sounding updated', 'success');
    } catch (error) {
        showMessage('Failed to fetch sounding: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

function drawSkewT(data) {
    const canvas = document.getElementById('skewt-canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = canvas.parentElement.clientWidth - 32;
    canvas.height = 568;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background grid
    ctx.strokeStyle = 'rgba(75, 85, 99, 0.3)';
    ctx.lineWidth = 1;

    // Pressure lines (horizontal)
    const pressures = [1000, 850, 700, 500, 300, 200];
    pressures.forEach((p, i) => {
        const y = 50 + (i / (pressures.length - 1)) * 500;
        ctx.beginPath();
        ctx.moveTo(50, y);
        ctx.lineTo(canvas.width - 50, y);
        ctx.stroke();

        // Label
        ctx.fillStyle = '#9ca3af';
        ctx.font = '12px sans-serif';
        ctx.fillText(`${p} hPa`, 10, y + 4);
    });

    // Temperature lines (skewed)
    for (let temp = -60; temp <= 40; temp += 10) {
        ctx.beginPath();
        ctx.moveTo(50 + (temp + 60) * 5, 50);
        ctx.lineTo(50 + (temp + 60) * 5 + 100, 550);
        ctx.stroke();

        ctx.fillStyle = '#9ca3af';
        ctx.fillText(`${temp}°C`, 50 + (temp + 60) * 5, 40);
    }

    // Plot temperature profile (simplified - using multi-level data)
    if (data.hourly && data.hourly.temperature_2m) {
        const temps = [
            data.hourly.temperature_2m[0],
            data.hourly.temperature_80m[0],
            data.hourly.temperature_120m[0]
        ];

        const heights = [0, 80, 120]; // meters
        const pressureEstimates = [1013, 990, 970]; // estimated

        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3;
        ctx.beginPath();

        temps.forEach((temp, i) => {
            if (temp !== null) {
                const x = 50 + (temp + 60) * 5 + (i * 30);
                const y = 50 + (i / (temps.length - 1)) * 150;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }

                // Draw point
                ctx.fillStyle = '#ef4444';
                ctx.fillRect(x - 3, y - 3, 6, 6);
            }
        });

        ctx.stroke();
    }

    // Title
    ctx.fillStyle = '#22d3ee';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('Atmospheric Sounding (Skew-T Log-P)', canvas.width / 2 - 120, 25);

    // Note
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px sans-serif';
    ctx.fillText('Simplified visualization - Full sounding requires pressure level data', 50, canvas.height - 10);
}

function drawHodograph(data) {
    const canvas = document.getElementById('hodograph-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.parentElement.clientWidth - 32;
    canvas.height = 468;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(centerX, centerY) - 40;

    // Draw concentric circles (wind speed rings)
    ctx.strokeStyle = 'rgba(75, 85, 99, 0.3)';
    ctx.lineWidth = 1;

    [0.25, 0.5, 0.75, 1].forEach(fraction => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, maxRadius * fraction, 0, 2 * Math.PI);
        ctx.stroke();
    });

    // Draw cardinal directions
    ctx.strokeStyle = 'rgba(75, 85, 99, 0.5)';
    ctx.lineWidth = 1;

    // N-S line
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - maxRadius);
    ctx.lineTo(centerX, centerY + maxRadius);
    ctx.stroke();

    // E-W line
    ctx.beginPath();
    ctx.moveTo(centerX - maxRadius, centerY);
    ctx.lineTo(centerX + maxRadius, centerY);
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#9ca3af';
    ctx.font = '14px sans-serif';
    ctx.fillText('N', centerX - 8, centerY - maxRadius - 10);
    ctx.fillText('S', centerX - 8, centerY + maxRadius + 20);
    ctx.fillText('E', centerX + maxRadius + 10, centerY + 4);
    ctx.fillText('W', centerX - maxRadius - 20, centerY + 4);

    // Plot wind profile
    if (data.hourly && data.hourly.wind_speed_10m) {
        const winds = [
            { speed: data.hourly.wind_speed_10m[0], dir: data.hourly.wind_direction_10m[0], height: '10m' },
            { speed: data.hourly.wind_speed_80m[0], dir: data.hourly.wind_direction_80m[0], height: '80m' },
            { speed: data.hourly.wind_speed_120m[0], dir: data.hourly.wind_direction_120m[0], height: '120m' }
        ];

        const maxWindSpeed = Math.max(...winds.map(w => w.speed || 0));
        const scale = maxWindSpeed > 0 ? maxRadius / maxWindSpeed : 1;

        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.beginPath();

        winds.forEach((wind, i) => {
            if (wind.speed !== null && wind.dir !== null) {
                // Convert to radians (0° = North, clockwise)
                const angle = (wind.dir - 90) * Math.PI / 180;
                const radius = wind.speed * scale;

                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }

                // Draw point with label
                ctx.fillStyle = '#10b981';
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, 2 * Math.PI);
                ctx.fill();

                ctx.fillStyle = '#22d3ee';
                ctx.font = '11px sans-serif';
                ctx.fillText(wind.height, x + 8, y - 8);
            }
        });

        ctx.stroke();
    }

    // Title
    ctx.fillStyle = '#22d3ee';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('Hodograph (Wind Profile)', 20, 25);
}

function updateProfileTable(data) {
    const tbody = document.getElementById('profile-tbody');
    tbody.innerHTML = '';

    if (!data.hourly) return;

    const levels = [
        { pressure: 1000, height: 10, temp: data.hourly.temperature_2m[0], dewpoint: data.hourly.dew_point_2m[0],
          wind: data.hourly.wind_speed_10m[0], dir: data.hourly.wind_direction_10m[0] },
        { pressure: 925, height: 80, temp: data.hourly.temperature_80m[0], dewpoint: null,
          wind: data.hourly.wind_speed_80m[0], dir: data.hourly.wind_direction_80m[0] },
        { pressure: 850, height: 120, temp: data.hourly.temperature_120m[0], dewpoint: null,
          wind: data.hourly.wind_speed_120m[0], dir: data.hourly.wind_direction_120m[0] },
    ];

    levels.forEach(level => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${level.pressure}</td>
            <td>${level.height}</td>
            <td>${level.temp !== null ? level.temp.toFixed(1) : 'N/A'}</td>
            <td>${level.dewpoint !== null ? level.dewpoint.toFixed(1) : 'N/A'}</td>
            <td>${level.wind !== null ? level.wind.toFixed(1) : 'N/A'}</td>
            <td>${level.dir !== null ? level.dir.toFixed(0) : 'N/A'}</td>
        `;
    });
}

function exportSounding() {
    showMessage('Sounding export functionality - export canvas as PNG', 'info');
    // Could implement canvas.toBlob() export here
}

// ============================================================================
// HISTORICAL DATA
// ============================================================================

async function fetchHistoricalData() {
    const startDate = document.getElementById('hist-start-date').value;
    const endDate = document.getElementById('hist-end-date').value;
    const selectedVars = getSelectedVariables();

    if (!startDate || !endDate) {
        showMessage('Please select start and end dates', 'error');
        return;
    }

    if (selectedVars.length === 0) {
        showMessage('Please select variables', 'error');
        return;
    }

    showLoading();

    try {
        const params = new URLSearchParams({
            latitude: state.location.latitude,
            longitude: state.location.longitude,
            start_date: startDate,
            end_date: endDate,
            hourly: selectedVars.join(','),
            timezone: 'auto'
        });

        const response = await fetch(`https://archive-api.open-meteo.com/v1/archive?${params}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        displayHistoricalPanels(data, selectedVars);
        showMessage('Historical data loaded', 'success');
    } catch (error) {
        showMessage('Failed to fetch historical data: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

function displayHistoricalPanels(data, selectedVars) {
    const container = document.getElementById('historical-panels');
    container.innerHTML = '';

    selectedVars.forEach((varId, index) => {
        const variable = WEATHER_VARIABLES.find(v => v.id === varId);
        if (!variable || !data.hourly || !data.hourly[varId]) return;

        const panel = document.createElement('div');
        panel.className = 'panel';
        panel.innerHTML = `
            <div class="panel-header">
                <h3 class="panel-title">${variable.name} - Historical (${variable.unit})</h3>
            </div>
            <div class="chart-container">
                <canvas id="chart-hist-${varId}"></canvas>
            </div>
        `;
        container.appendChild(panel);

        setTimeout(() => {
            const ctx = document.getElementById(`chart-hist-${varId}`);
            const chart = createChart(ctx, data.hourly.time, data.hourly[varId], variable);
            state.charts.push(chart);
        }, index * 100);
    });
}

function setDefaultDates() {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    document.getElementById('hist-start-date').valueAsDate = thirtyDaysAgo;
    document.getElementById('hist-end-date').valueAsDate = today;
}

// ============================================================================
// STATISTICS
// ============================================================================

async function generateStatistics(variables) {
    if (!state.currentData || !state.currentData.hourly) {
        showMessage('Please fetch forecast data first', 'error');
        return;
    }

    const container = document.getElementById('stats-panels');
    container.innerHTML = '';

    variables.forEach((varId, index) => {
        const variable = WEATHER_VARIABLES.find(v => v.id === varId);
        const values = state.currentData.hourly[varId]?.filter(v => v !== null && v !== undefined);

        if (!values || values.length === 0) return;

        const stats = calculateDetailedStats(values);

        const panel = document.createElement('div');
        panel.className = 'panel';
        panel.style.animationDelay = `${index * 0.1}s`;
        panel.innerHTML = `
            <div class="panel-header">
                <h3 class="panel-title">${variable.name} - Statistical Analysis</h3>
            </div>
            <div style="padding: 20px;">
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
                    <div>
                        <div style="font-size: 24px; font-weight: 700; color: var(--primary);">${stats.mean.toFixed(2)}</div>
                        <div style="color: var(--text-secondary); font-size: 12px;">Mean ${variable.unit}</div>
                    </div>
                    <div>
                        <div style="font-size: 24px; font-weight: 700; color: var(--secondary);">${stats.median.toFixed(2)}</div>
                        <div style="color: var(--text-secondary); font-size: 12px;">Median ${variable.unit}</div>
                    </div>
                    <div>
                        <div style="font-size: 24px; font-weight: 700; color: var(--danger);">${stats.max.toFixed(2)}</div>
                        <div style="color: var(--text-secondary); font-size: 12px;">Maximum ${variable.unit}</div>
                    </div>
                    <div>
                        <div style="font-size: 24px; font-weight: 700; color: var(--success);">${stats.min.toFixed(2)}</div>
                        <div style="color: var(--text-secondary); font-size: 12px;">Minimum ${variable.unit}</div>
                    </div>
                    <div>
                        <div style="font-size: 24px; font-weight: 700; color: var(--warning);">${stats.stdDev.toFixed(2)}</div>
                        <div style="color: var(--text-secondary); font-size: 12px;">Std Deviation</div>
                    </div>
                    <div>
                        <div style="font-size: 24px; font-weight: 700; color: var(--purple);">${stats.range.toFixed(2)}</div>
                        <div style="color: var(--text-secondary); font-size: 12px;">Range ${variable.unit}</div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(panel);
    });
}

function calculateDetailedStats(data) {
    const sorted = [...data].sort((a, b) => a - b);
    const mean = data.reduce((sum, val) => sum + val, 0) / data.length;

    // Standard deviation
    const variance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length;
    const stdDev = Math.sqrt(variance);

    return {
        min: sorted[0],
        max: sorted[sorted.length - 1],
        mean: mean,
        median: sorted.length % 2 === 0
            ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
            : sorted[Math.floor(sorted.length / 2)],
        stdDev: stdDev,
        range: sorted[sorted.length - 1] - sorted[0],
        count: data.length
    };
}

// ============================================================================
// DATA EXPORT
// ============================================================================

function showExportOptions() {
    const options = ['CSV', 'JSON', 'PNG (Charts)'];
    const choice = prompt(`Export format:\n1. CSV\n2. JSON\n3. PNG (Charts)\n\nEnter number (1-3):`);

    switch(choice) {
        case '1':
            exportCSV();
            break;
        case '2':
            exportJSON();
            break;
        case '3':
            exportAllChartsPNG();
            break;
        default:
            showMessage('Invalid choice', 'error');
    }
}

function exportCSV() {
    if (!state.currentData || !state.currentData.hourly) {
        alert('No data to export');
        return;
    }

    const selectedVars = getSelectedVariables();
    const times = state.currentData.hourly.time;

    let csv = 'Time,' + selectedVars.map(varId => {
        const variable = WEATHER_VARIABLES.find(v => v.id === varId);
        return `${variable.name} (${variable.unit})`;
    }).join(',') + '\n';

    times.forEach((time, index) => {
        const row = [time];
        selectedVars.forEach(varId => {
            row.push(state.currentData.hourly[varId][index]);
        });
        csv += row.join(',') + '\n';
    });

    downloadFile(csv, `metscope-data-${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
    showMessage('✓ CSV exported successfully!', 'success');
}

function exportJSON() {
    if (!state.currentData) {
        alert('No data to export');
        return;
    }

    const json = JSON.stringify({
        location: state.location,
        timestamp: new Date().toISOString(),
        data: state.currentData,
        airQuality: state.airQualityData,
        marine: state.marineData
    }, null, 2);

    downloadFile(json, `metscope-data-${new Date().toISOString().split('T')[0]}.json`, 'application/json');
    showMessage('✓ JSON exported successfully!', 'success');
}

function exportAllChartsPNG() {
    if (state.charts.length === 0) {
        alert('No charts to export');
        return;
    }

    // Export first chart as example
    const canvas = state.charts[0].canvas;
    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `metscope-chart-${new Date().toISOString().split('T')[0]}.png`;
        a.click();
        URL.revokeObjectURL(url);
        showMessage('✓ PNG exported successfully!', 'success');
    });
}

function exportChartData(varId) {
    if (!state.currentData || !state.currentData.hourly) return;

    const variable = WEATHER_VARIABLES.find(v => v.id === varId);
    const times = state.currentData.hourly.time;
    const values = state.currentData.hourly[varId];

    let csv = `Time,${variable.name} (${variable.unit})\n`;
    times.forEach((time, i) => {
        csv += `${time},${values[i]}\n`;
    });

    downloadFile(csv, `${varId}-${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
    showMessage(`Exported ${variable.name} data`, 'success');
}

function downloadFile(content, filename, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ============================================================================
// DATA PERSISTENCE
// ============================================================================

async function saveCurrentData() {
    if (!state.currentData) {
        showMessage('No data to save', 'error');
        return;
    }

    const selectedVars = getSelectedVariables();

    try {
        await saveQuery({
            location: state.location.name,
            section: state.currentSection,
            variables: selectedVars,
            data: state.currentData
        });

        showMessage('✓ Data saved to local storage', 'success');
        displaySavedQueries();
    } catch (error) {
        showMessage('Failed to save: ' + error.message, 'error');
    }
}

// ============================================================================
// AUTO-UPDATE
// ============================================================================

function setupAutoUpdate(minutes) {
    // Clear existing interval
    if (state.updateInterval) {
        clearInterval(state.updateInterval);
        state.updateInterval = null;
    }

    if (minutes > 0) {
        state.updateInterval = setInterval(() => {
            console.log('Auto-updating data...');
            visualizeData();
        }, minutes * 60 * 1000);

        showMessage(`Auto-update enabled: every ${minutes} minute(s)`, 'success');
    } else {
        showMessage('Auto-update disabled', 'info');
    }
}

// ============================================================================
// UI HELPERS
// ============================================================================

function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}

function showProgress(percent) {
    const bar = document.getElementById('progress-bar');
    const fill = document.getElementById('progress-fill');
    bar.classList.remove('hidden');
    fill.style.width = percent + '%';
}

function hideProgress() {
    document.getElementById('progress-bar').classList.add('hidden');
}

function showMessage(text, type = 'info') {
    const messageEl = document.getElementById('message');
    messageEl.textContent = text;
    messageEl.className = `message message-${type}`;
    messageEl.classList.remove('hidden');

    // Auto-hide after 5 seconds
    setTimeout(() => {
        messageEl.classList.add('hidden');
    }, 5000);
}

function hideMessage() {
    document.getElementById('message').classList.add('hidden');
}

// ============================================================================
// INITIALIZATION COMPLETE
// ============================================================================

console.log('✓ MetScope DataHub - All modules loaded!');
console.log('Features: Weather Forecast, Soundings, Severe Weather, Air Quality, Marine Data, Statistics, Storage');
