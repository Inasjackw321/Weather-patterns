import './style.css';
import { SimpleUI } from './components/SimpleUI';
import { format, subDays } from 'date-fns';
import type { UserPreferences } from './types/weather';

console.log('=== SIMPLE MAIN SCRIPT LOADED ===');

document.addEventListener('DOMContentLoaded', () => {
  console.log('=== DOM CONTENT LOADED ===');

  try {
    const appElement = document.getElementById('app');

    if (!appElement) {
      throw new Error('App element not found!');
    }

    console.log('✓ App element found');

    const preferences: UserPreferences = {
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

    console.log('✓ Preferences created');

    const ui = new SimpleUI(appElement);
    console.log('✓ SimpleUI instantiated');

    ui.render(preferences);
    console.log('✓ UI rendered');

    console.log('=== APP INITIALIZED SUCCESSFULLY ===');

  } catch (error) {
    console.error('=== ERROR INITIALIZING APP ===', error);

    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = `
        <div style="padding: 40px; background: #0f172a; color: white; font-family: sans-serif;">
          <h1 style="color: #ef4444; font-size: 32px; margin-bottom: 20px;">❌ Application Failed to Load</h1>
          <div style="background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #ef4444;">
            <h2 style="margin-top: 0;">Error Details:</h2>
            <pre style="color: #fca5a5; overflow-x: auto; white-space: pre-wrap;">${error instanceof Error ? error.message + '\n\n' + error.stack : String(error)}</pre>
          </div>
        </div>
      `;
    }
  }
});
