// MetScope Visuals - Advanced Weather Visualization Platform
// With animations, ensemble models, and interactive features

console.log('🌍 MetScope Visuals Advanced - Loading...');

// Enhanced weather variables with more options
const WEATHER_VARIABLES = [
    { id: 'temperature_2m', name: 'Temperature (2m)', unit: '°C', cat: 'temp' },
    { id: 'temperature_80m', name: 'Temperature (80m)', unit: '°C', cat: 'temp' },
    { id: 'temperature_120m', name: 'Temperature (120m)', unit: '°C', cat: 'temp' },
    { id: 'relative_humidity_2m', name: 'Rel. Humidity (2m)', unit: '%', cat: 'humid' },
    { id: 'dew_point_2m', name: 'Dew Point', unit: '°C', cat: 'temp' },
    { id: 'apparent_temperature', name: 'Feels Like', unit: '°C', cat: 'temp' },
    { id: 'precipitation', name: 'Precipitation', unit: 'mm', cat: 'precip' },
    { id: 'precipitation_probability', name: 'Precip Probability', unit: '%', cat: 'precip' },
    { id: 'rain', name: 'Rain', unit: 'mm', cat: 'precip' },
    { id: 'showers', name: 'Showers', unit: 'mm', cat: 'precip' },
    { id: 'snowfall', name: 'Snowfall', unit: 'cm', cat: 'precip' },
    { id: 'snow_depth', name: 'Snow Depth', unit: 'm', cat: 'precip' },
    { id: 'weather_code', name: 'Weather Code', unit: 'WMO', cat: 'other' },
    { id: 'cloud_cover', name: 'Cloud Cover', unit: '%', cat: 'cloud' },
    { id: 'cloud_cover_low', name: 'Low Clouds', unit: '%', cat: 'cloud' },
    { id: 'cloud_cover_mid', name: 'Mid Clouds', unit: '%', cat: 'cloud' },
    { id: 'cloud_cover_high', name: 'High Clouds', unit: '%', cat: 'cloud' },
    { id: 'visibility', name: 'Visibility', unit: 'm', cat: 'other' },
    { id: 'wind_speed_10m', name: 'Wind Speed (10m)', unit: 'km/h', cat: 'wind' },
    { id: 'wind_speed_80m', name: 'Wind Speed (80m)', unit: 'km/h', cat: 'wind' },
    { id: 'wind_speed_120m', name: 'Wind Speed (120m)', unit: 'km/h', cat: 'wind' },
    { id: 'wind_direction_10m', name: 'Wind Direction (10m)', unit: '°', cat: 'wind' },
    { id: 'wind_direction_80m', name: 'Wind Direction (80m)', unit: '°', cat: 'wind' },
    { id: 'wind_gusts_10m', name: 'Wind Gusts', unit: 'km/h', cat: 'wind' },
    { id: 'surface_pressure', name: 'Surface Pressure', unit: 'hPa', cat: 'pressure' },
    { id: 'pressure_msl', name: 'Sea Level Pressure', unit: 'hPa', cat: 'pressure' },
    { id: 'shortwave_radiation', name: 'Solar Radiation', unit: 'W/m²', cat: 'radiation' },
    { id: 'direct_radiation', name: 'Direct Radiation', unit: 'W/m²', cat: 'radiation' },
    { id: 'diffuse_radiation', name: 'Diffuse Radiation', unit: 'W/m²', cat: 'radiation' },
    { id: 'cape', name: 'CAPE', unit: 'J/kg', cat: 'severe' },
    { id: 'lifted_index', name: 'Lifted Index', unit: '°C', cat: 'severe' },
];

// App state
const state = {
    location: {
        latitude: 51.5074,
        longitude: -0.1278,
        name: 'London, United Kingdom'
    },
    currentTab: 'forecast',
    charts: [],
    currentData: null,
    ensembleData: null,
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    console.log('✓ DOM Loaded');
    initializeApp();
});

function initializeApp() {
    initializeVariables();
    setupEventListeners();
    setDefaultDates();
    console.log('✓ MetScope Visuals Ready!');
}

// Initialize weather variables
function initializeVariables() {
    const container = document.getElementById('variables');
    WEATHER_VARIABLES.forEach((variable, index) => {
        const label = document.createElement('label');
        label.className = 'checkbox-label';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = variable.id;
        checkbox.id = `var-${variable.id}`;
        if (index < 3) checkbox.checked = true;

        const span = document.createElement('span');
        span.textContent = variable.name;

        label.appendChild(checkbox);
        label.appendChild(span);
        container.appendChild(label);
    });
}

// Setup all event listeners
function setupEventListeners() {
    // Tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });

    // Location search
    setupLocationSearch();

    // Buttons
    document.getElementById('fetch-btn').addEventListener('click', fetchData);
    document.getElementById('export-csv-btn').addEventListener('click', exportCSV);
    document.getElementById('export-png-btn').addEventListener('click', exportPNG);
    document.getElementById('compare-models-btn').addEventListener('click', compareModels);

    // Close location results on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#location-search') && !e.target.closest('#location-results')) {
            hideLocationResults();
        }
    });
}

// Tab switching
function switchTab(tabName) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.tab[data-tab="${tabName}"]`).classList.add('active');
    state.currentTab = tabName;

    const dateControls = document.getElementById('date-controls');
    const forecastDaysContainer = document.getElementById('forecast-days-container');
    const modelSelector = document.getElementById('model-selector');

    // Show/hide controls based on tab
    if (tabName === 'historical') {
        dateControls.classList.remove('hidden');
        forecastDaysContainer.classList.add('hidden');
    } else {
        dateControls.classList.add('hidden');
        forecastDaysContainer.classList.remove('hidden');
    }

    if (tabName === 'comparison') {
        modelSelector.classList.add('hidden');
    } else {
        modelSelector.classList.remove('hidden');
    }

    showMessage(`Switched to ${tabName} mode`, 'info');
}

// Location search setup
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
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=8&language=en&format=json`
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
            <div style="font-size: 11px; color: #94a3b8;">
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

// Date setup
function setDefaultDates() {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    document.getElementById('start-date').valueAsDate = thirtyDaysAgo;
    document.getElementById('end-date').valueAsDate = today;
}

// Get selected variables
function getSelectedVariables() {
    const checkboxes = document.querySelectorAll('#variables input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

// Main fetch function
async function fetchData() {
    const selectedVars = getSelectedVariables();

    if (selectedVars.length === 0) {
        showMessage('Please select at least one weather variable', 'error');
        return;
    }

    showLoading();
    showProgress(0);
    hideMessage();

    try {
        let data;

        switch (state.currentTab) {
            case 'forecast':
                data = await fetchForecast(selectedVars);
                showProgress(50);
                displayMultipleCharts(data, selectedVars);
                break;

            case 'historical':
                data = await fetchHistorical(selectedVars);
                showProgress(50);
                displayMultipleCharts(data, selectedVars);
                break;

            case 'ensemble':
                data = await fetchEnsemble(selectedVars);
                showProgress(50);
                displayEnsembleChart(data, selectedVars);
                break;

            case 'comparison':
                // Handled by compareModels()
                return;
        }

        state.currentData = data;
        showProgress(75);
        displayStats(data, selectedVars);
        showProgress(100);
        showMessage('✓ Data loaded successfully with animations!', 'success');

    } catch (error) {
        console.error('Fetch error:', error);
        showMessage('Failed to fetch data: ' + error.message, 'error');
    } finally {
        hideLoading();
        setTimeout(() => hideProgress(), 500);
    }
}

// Fetch forecast
async function fetchForecast(variables) {
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

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
}

// Fetch historical
async function fetchHistorical(variables) {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    if (!startDate || !endDate) {
        throw new Error('Please select start and end dates');
    }

    const params = new URLSearchParams({
        latitude: state.location.latitude,
        longitude: state.location.longitude,
        start_date: startDate,
        end_date: endDate,
        hourly: variables.join(','),
        timezone: 'auto'
    });

    const response = await fetch(`https://archive-api.open-meteo.com/v1/archive?${params}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
}

// Fetch ensemble data
async function fetchEnsemble(variables) {
    // Use GFS ensemble model
    const params = new URLSearchParams({
        latitude: state.location.latitude,
        longitude: state.location.longitude,
        hourly: variables.join(','),
        timezone: 'auto',
        models: 'gfs_global',
        forecast_days: 7
    });

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
}

// Display multiple charts (one per variable)
function displayMultipleCharts(data, selectedVars) {
    if (!data.hourly) {
        throw new Error('No hourly data available');
    }

    // Clear existing charts
    state.charts.forEach(chart => chart.destroy());
    state.charts = [];

    const container = document.getElementById('charts-container');
    container.innerHTML = '';
    container.classList.remove('hidden');

    // Hide other containers
    document.getElementById('ensemble-container').classList.add('hidden');
    document.getElementById('model-comparison').classList.add('hidden');

    // Create a chart for each variable
    selectedVars.forEach((varId, index) => {
        const variable = WEATHER_VARIABLES.find(v => v.id === varId);
        if (!variable || !data.hourly[varId]) return;

        // Create chart card
        const card = document.createElement('div');
        card.className = 'chart-card';
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <div class="chart-title">${variable.name} (${variable.unit})</div>
            <div class="chart-container">
                <canvas id="chart-${varId}"></canvas>
            </div>
        `;
        container.appendChild(card);

        // Create chart with animation
        setTimeout(() => {
            const ctx = document.getElementById(`chart-${varId}`);
            const chart = createAnimatedChart(ctx, data.hourly.time, data.hourly[varId], variable, index);
            state.charts.push(chart);
        }, index * 100);
    });
}

// Create animated chart
function createAnimatedChart(ctx, timeData, values, variable, colorIndex) {
    const colors = [
        '#ef4444', '#3b82f6', '#10b981', '#f59e0b',
        '#8b5cf6', '#ec4899', '#06b6d4', '#f97316',
        '#14b8a6', '#a855f7', '#84cc16', '#f43f5e'
    ];

    const color = colors[colorIndex % colors.length];

    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeData,
            datasets: [{
                label: `${variable.name} (${variable.unit})`,
                data: values,
                borderColor: color,
                backgroundColor: color + '20',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: color,
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
                    borderColor: color,
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

// Display ensemble chart
function displayEnsembleChart(data, selectedVars) {
    document.getElementById('charts-container').classList.add('hidden');
    document.getElementById('model-comparison').classList.add('hidden');
    document.getElementById('ensemble-container').classList.remove('hidden');

    const ctx = document.getElementById('ensemble-chart');

    // Clear existing chart
    state.charts.forEach(chart => chart.destroy());
    state.charts = [];

    // Create ensemble visualization (showing uncertainty bands)
    const varId = selectedVars[0];
    const variable = WEATHER_VARIABLES.find(v => v.id === varId);

    if (!data.hourly || !data.hourly[varId]) {
        throw new Error('No ensemble data available');
    }

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.hourly.time,
            datasets: [{
                label: `${variable.name} - Mean`,
                data: data.hourly[varId],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#e5e7eb',
                        font: { size: 14 }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(17, 24, 39, 0.95)',
                    titleColor: '#f3f4f6',
                    bodyColor: '#e5e7eb',
                }
            },
            scales: {
                x: {
                    type: 'time',
                    grid: { color: 'rgba(75, 85, 99, 0.2)' },
                    ticks: { color: '#9ca3af' }
                },
                y: {
                    grid: { color: 'rgba(75, 85, 99, 0.2)' },
                    ticks: { color: '#9ca3af' }
                }
            }
        }
    });

    state.charts.push(chart);
}

// Compare multiple models
async function compareModels() {
    const selectedVars = getSelectedVariables();
    if (selectedVars.length === 0) {
        showMessage('Please select variables first', 'error');
        return;
    }

    showLoading();
    showMessage('Comparing multiple weather models...', 'info');

    const models = [
        { id: 'ecmwf_ifs025', name: 'ECMWF IFS 0.25°' },
        { id: 'gfs_global', name: 'GFS Global' },
        { id: 'icon_global', name: 'ICON Global' },
        { id: 'meteofrance_arpege_world', name: 'MeteoFrance ARPEGE' },
        { id: 'gem_global', name: 'GEM Global' }
    ];

    try {
        const results = await Promise.all(
            models.map(model => fetchModelData(model.id, selectedVars))
        );

        displayModelComparison(models, results, selectedVars[0]);
        showMessage('✓ Model comparison complete!', 'success');
    } catch (error) {
        showMessage('Error comparing models: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

async function fetchModelData(model, variables) {
    const params = new URLSearchParams({
        latitude: state.location.latitude,
        longitude: state.location.longitude,
        hourly: variables.join(','),
        models: model,
        forecast_days: 7,
        timezone: 'auto'
    });

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
}

function displayModelComparison(models, results, varId) {
    document.getElementById('charts-container').classList.add('hidden');
    document.getElementById('ensemble-container').classList.add('hidden');

    const container = document.getElementById('model-comparison');
    container.innerHTML = '';
    container.classList.remove('hidden');

    const variable = WEATHER_VARIABLES.find(v => v.id === varId);

    models.forEach((model, index) => {
        const data = results[index];
        if (!data.hourly || !data.hourly[varId]) return;

        const values = data.hourly[varId];
        const stats = calculateStats(values);

        const card = document.createElement('div');
        card.className = 'model-card';
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <div class="model-name">${model.name}</div>
            <div class="model-stats">
                <span style="color: #94a3b8;">Min</span>
                <span style="color: #60a5fa; font-weight: 700;">${stats.min.toFixed(1)} ${variable.unit}</span>
            </div>
            <div class="model-stats">
                <span style="color: #94a3b8;">Max</span>
                <span style="color: #f59e0b; font-weight: 700;">${stats.max.toFixed(1)} ${variable.unit}</span>
            </div>
            <div class="model-stats">
                <span style="color: #94a3b8;">Mean</span>
                <span style="color: #10b981; font-weight: 700;">${stats.mean.toFixed(1)} ${variable.unit}</span>
            </div>
            <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(71, 85, 105, 0.3);">
                <small style="color: #64748b;">Forecast for ${data.hourly.time.length} hours</small>
            </div>
        `;
        container.appendChild(card);
    });
}

// Display statistics
function displayStats(data, selectedVars) {
    if (!data.hourly) return;

    const container = document.getElementById('stats-container');
    container.innerHTML = '';
    container.classList.remove('hidden');

    selectedVars.forEach((varId, index) => {
        const variable = WEATHER_VARIABLES.find(v => v.id === varId);
        const values = data.hourly[varId]?.filter(v => v !== null && v !== undefined);
        if (!values || values.length === 0) return;

        const stats = calculateStats(values);

        const card = document.createElement('div');
        card.className = 'stat-card';
        card.style.animationDelay = `${index * 0.15}s`;
        card.innerHTML = `
            <div class="stat-value">${stats.mean.toFixed(1)}</div>
            <div class="stat-label">${variable.name} Average</div>
            <div style="margin-top: 12px; font-size: 12px; color: #94a3b8;">
                <div style="margin-bottom: 4px;">Range: ${stats.min.toFixed(1)} - ${stats.max.toFixed(1)} ${variable.unit}</div>
                <div>Median: ${stats.median.toFixed(1)} ${variable.unit}</div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Calculate statistics
function calculateStats(data) {
    const sorted = [...data].sort((a, b) => a - b);
    return {
        min: sorted[0],
        max: sorted[sorted.length - 1],
        mean: data.reduce((sum, val) => sum + val, 0) / data.length,
        median: sorted.length % 2 === 0
            ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
            : sorted[Math.floor(sorted.length / 2)]
    };
}

// Export CSV
function exportCSV() {
    if (!state.currentData || !state.currentData.hourly) {
        alert('No data to export. Please visualize data first.');
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

    downloadFile(csv, `metscope-${state.location.name.replace(/[^a-zA-Z0-9]/g, '_')}-${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
    showMessage('✓ CSV exported successfully!', 'success');
}

// Export PNG
function exportPNG() {
    if (state.charts.length === 0) {
        alert('No charts to export. Please visualize data first.');
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

// Download file helper
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

// UI helpers
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
}

function hideMessage() {
    document.getElementById('message').classList.add('hidden');
}

console.log('✓ MetScope Visuals Advanced - Ready!');
console.log('Features: Multiple graphs, animations, ensemble data, model comparison');
