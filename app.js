// MetScope Visuals - Pure JavaScript Weather Visualization
// No build process required - just open index.html!

console.log('🌍 MetScope Visuals Loading...');

// Weather variables available from Open-Meteo
const WEATHER_VARIABLES = [
    { id: 'temperature_2m', name: 'Temperature (2m)', unit: '°C' },
    { id: 'relative_humidity_2m', name: 'Relative Humidity', unit: '%' },
    { id: 'precipitation', name: 'Precipitation', unit: 'mm' },
    { id: 'rain', name: 'Rain', unit: 'mm' },
    { id: 'snowfall', name: 'Snowfall', unit: 'cm' },
    { id: 'wind_speed_10m', name: 'Wind Speed (10m)', unit: 'km/h' },
    { id: 'wind_direction_10m', name: 'Wind Direction', unit: '°' },
    { id: 'wind_gusts_10m', name: 'Wind Gusts', unit: 'km/h' },
    { id: 'cloud_cover', name: 'Cloud Cover', unit: '%' },
    { id: 'surface_pressure', name: 'Surface Pressure', unit: 'hPa' },
    { id: 'apparent_temperature', name: 'Apparent Temp', unit: '°C' },
    { id: 'dew_point_2m', name: 'Dew Point', unit: '°C' },
];

// App state
let currentLocation = {
    latitude: 51.5074,
    longitude: -0.1278,
    name: 'London, United Kingdom'
};

let currentChart = null;
let currentData = null;

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    console.log('✓ DOM Loaded');

    initializeVariables();
    setupEventListeners();
    setDefaultDates();

    console.log('✓ MetScope Visuals Ready!');
});

// Initialize variable checkboxes
function initializeVariables() {
    const container = document.getElementById('variables');

    WEATHER_VARIABLES.forEach((variable, index) => {
        const label = document.createElement('label');
        label.className = 'checkbox-label';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = variable.id;
        checkbox.id = `var-${variable.id}`;

        // Check first 3 by default
        if (index < 3) {
            checkbox.checked = true;
        }

        const span = document.createElement('span');
        span.textContent = variable.name;

        label.appendChild(checkbox);
        label.appendChild(span);
        container.appendChild(label);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Location search
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

    // Data type change
    document.getElementById('data-type').addEventListener('change', (e) => {
        const dateControls = document.getElementById('date-controls');
        if (e.target.value === 'historical') {
            dateControls.classList.remove('hidden');
        } else {
            dateControls.classList.add('hidden');
        }
    });

    // Fetch button
    document.getElementById('fetch-btn').addEventListener('click', fetchData);

    // Export button
    document.getElementById('export-btn').addEventListener('click', exportCSV);

    // Close location results when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#location-search') && !e.target.closest('#location-results')) {
            hideLocationResults();
        }
    });
}

// Set default dates
function setDefaultDates() {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    document.getElementById('start-date').valueAsDate = thirtyDaysAgo;
    document.getElementById('end-date').valueAsDate = today;
}

// Search location using Open-Meteo Geocoding API
async function searchLocation(query) {
    try {
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
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

// Show location search results
function showLocationResults(results) {
    const container = document.getElementById('location-results');
    container.innerHTML = '';

    results.forEach(result => {
        const div = document.createElement('div');
        div.className = 'location-result';
        div.textContent = `${result.name}${result.admin1 ? ', ' + result.admin1 : ''}, ${result.country}`;

        div.addEventListener('click', () => {
            currentLocation = {
                latitude: result.latitude,
                longitude: result.longitude,
                name: `${result.name}, ${result.country}`
            };

            document.getElementById('location-search').value = currentLocation.name;
            hideLocationResults();
        });

        container.appendChild(div);
    });

    container.classList.remove('hidden');
}

// Hide location results
function hideLocationResults() {
    document.getElementById('location-results').classList.add('hidden');
}

// Get selected variables
function getSelectedVariables() {
    const checkboxes = document.querySelectorAll('#variables input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

// Fetch weather data
async function fetchData() {
    const selectedVars = getSelectedVariables();

    if (selectedVars.length === 0) {
        showMessage('Please select at least one weather variable', 'error');
        return;
    }

    const dataType = document.getElementById('data-type').value;
    const model = document.getElementById('weather-model').value;

    showLoading();
    hideMessage();

    try {
        let data;

        if (dataType === 'forecast') {
            data = await fetchForecast(selectedVars, model);
        } else {
            data = await fetchHistorical(selectedVars);
        }

        currentData = data;
        displayChart(data, selectedVars);
        showStats(data, selectedVars);
        showMessage('Data loaded successfully!', 'success');

    } catch (error) {
        console.error('Fetch error:', error);
        showMessage('Failed to fetch weather data: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

// Fetch forecast data
async function fetchForecast(variables, model) {
    const params = new URLSearchParams({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        hourly: variables.join(','),
        timezone: 'auto',
        forecast_days: 7
    });

    if (model !== 'best_match') {
        params.append('models', model);
    }

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
}

// Fetch historical data
async function fetchHistorical(variables) {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    if (!startDate || !endDate) {
        throw new Error('Please select start and end dates');
    }

    const params = new URLSearchParams({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        start_date: startDate,
        end_date: endDate,
        hourly: variables.join(','),
        timezone: 'auto'
    });

    const response = await fetch(`https://archive-api.open-meteo.com/v1/archive?${params}`);

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
}

// Display chart
function displayChart(data, selectedVars) {
    if (!data.hourly) {
        throw new Error('No hourly data available');
    }

    const ctx = document.getElementById('weather-chart');

    // Destroy existing chart
    if (currentChart) {
        currentChart.destroy();
    }

    // Prepare datasets
    const datasets = selectedVars.map((varId, index) => {
        const variable = WEATHER_VARIABLES.find(v => v.id === varId);
        const colors = [
            '#ef4444', '#3b82f6', '#10b981', '#f59e0b',
            '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'
        ];

        return {
            label: `${variable.name} (${variable.unit})`,
            data: data.hourly[varId],
            borderColor: colors[index % colors.length],
            backgroundColor: colors[index % colors.length] + '20',
            borderWidth: 2,
            tension: 0.4,
            fill: false,
            pointRadius: data.hourly.time.length > 100 ? 0 : 2,
        };
    });

    // Create chart
    currentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.hourly.time,
            datasets: datasets
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
                    display: true,
                    position: 'top',
                    labels: {
                        color: '#e5e7eb',
                        padding: 15,
                        font: { size: 12 }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(17, 24, 39, 0.95)',
                    titleColor: '#f3f4f6',
                    bodyColor: '#e5e7eb',
                    borderColor: '#374151',
                    borderWidth: 1,
                    padding: 12,
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
                        color: 'rgba(75, 85, 99, 0.3)'
                    },
                    ticks: {
                        color: '#9ca3af',
                        maxRotation: 45
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(75, 85, 99, 0.3)'
                    },
                    ticks: {
                        color: '#9ca3af'
                    }
                }
            }
        }
    });
}

// Show statistics
function showStats(data, selectedVars) {
    const statsContainer = document.getElementById('stats');
    statsContainer.innerHTML = '';

    selectedVars.forEach(varId => {
        const variable = WEATHER_VARIABLES.find(v => v.id === varId);
        const values = data.hourly[varId].filter(v => v !== null && v !== undefined);

        if (values.length === 0) return;

        const stats = calculateStats(values);

        const card = document.createElement('div');
        card.className = 'stat-card';
        card.innerHTML = `
            <h4>${variable.name}</h4>
            <div class="stat-row">
                <span class="stat-label">Min</span>
                <span class="stat-value">${stats.min.toFixed(2)} ${variable.unit}</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">Max</span>
                <span class="stat-value">${stats.max.toFixed(2)} ${variable.unit}</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">Mean</span>
                <span class="stat-value">${stats.mean.toFixed(2)} ${variable.unit}</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">Median</span>
                <span class="stat-value">${stats.median.toFixed(2)} ${variable.unit}</span>
            </div>
        `;

        statsContainer.appendChild(card);
    });

    statsContainer.classList.remove('hidden');
}

// Calculate statistics
function calculateStats(data) {
    const sorted = [...data].sort((a, b) => a - b);
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
    const median = sorted.length % 2 === 0
        ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
        : sorted[Math.floor(sorted.length / 2)];

    return { min, max, mean, median };
}

// Export to CSV
function exportCSV() {
    if (!currentData || !currentData.hourly) {
        alert('No data to export. Please visualize data first.');
        return;
    }

    const selectedVars = getSelectedVariables();
    const times = currentData.hourly.time;

    // Create CSV header
    let csv = 'Time,' + selectedVars.map(varId => {
        const variable = WEATHER_VARIABLES.find(v => v.id === varId);
        return `${variable.name} (${variable.unit})`;
    }).join(',') + '\n';

    // Add data rows
    times.forEach((time, index) => {
        const row = [time];
        selectedVars.forEach(varId => {
            row.push(currentData.hourly[varId][index]);
        });
        csv += row.join(',') + '\n';
    });

    // Download file
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `metscope-visuals-${currentLocation.name.replace(/[^a-zA-Z0-9]/g, '_')}-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showMessage('CSV exported successfully!', 'success');
}

// Show loading spinner
function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
}

// Hide loading spinner
function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}

// Show message
function showMessage(text, type = 'info') {
    const messageEl = document.getElementById('message');
    messageEl.textContent = text;
    messageEl.className = `message message-${type}`;
    messageEl.classList.remove('hidden');
}

// Hide message
function hideMessage() {
    document.getElementById('message').classList.add('hidden');
}

console.log('✓ MetScope Visuals App Loaded Successfully!');
