import type { UserPreferences } from '../types/weather';

export class SimpleUI {
  private app: HTMLElement;

  constructor(appElement: HTMLElement) {
    console.log('SimpleUI constructor');
    this.app = appElement;
  }

  public render(preferences: UserPreferences): void {
    console.log('SimpleUI.render() called');

    this.app.innerHTML = `
      <div style="min-height: 100vh; background: linear-gradient(to bottom right, #0f172a, #1e3a8a, #0f172a); padding: 40px; font-family: sans-serif;">
        <div style="max-width: 1200px; margin: 0 auto;">
          <!-- Header -->
          <div style="background: rgba(15, 23, 42, 0.8); border-radius: 16px; padding: 32px; margin-bottom: 32px; border: 1px solid rgba(59, 130, 246, 0.2);">
            <h1 style="font-size: 48px; margin: 0 0 8px 0; background: linear-gradient(to right, #60a5fa, #22d3ee); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
              🌍 MeteoScope
            </h1>
            <p style="color: #94a3b8; margin: 0;">Professional Weather Data Visualization Platform</p>
          </div>

          <!-- Main Content -->
          <div style="background: rgba(15, 23, 42, 0.6); border-radius: 16px; padding: 32px; border: 1px solid rgba(71, 85, 105, 0.5);">
            <h2 style="color: white; font-size: 24px; margin: 0 0 16px 0;">✓ Application Loaded Successfully!</h2>

            <div style="background: rgba(34, 211, 238, 0.1); border: 1px solid rgba(34, 211, 238, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
              <p style="color: #22d3ee; margin: 0 0 12px 0; font-weight: 600;">Current Location:</p>
              <p style="color: #e5e7eb; margin: 0;">${preferences.location.name || 'Unknown'}</p>
              <p style="color: #94a3b8; margin: 8px 0 0 0; font-size: 14px;">
                Lat: ${preferences.location.latitude.toFixed(4)}, Lon: ${preferences.location.longitude.toFixed(4)}
              </p>
            </div>

            <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
              <p style="color: #10b981; margin: 0 0 12px 0; font-weight: 600;">Selected Variables:</p>
              <p style="color: #e5e7eb; margin: 0;">${preferences.selectedVariables.join(', ')}</p>
            </div>

            <div style="background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 12px; padding: 20px;">
              <p style="color: #8b5cf6; margin: 0 0 12px 0; font-weight: 600;">Weather Model:</p>
              <p style="color: #e5e7eb; margin: 0;">${preferences.model}</p>
            </div>

            <div style="margin-top: 24px; padding: 16px; background: rgba(59, 130, 246, 0.1); border-radius: 8px; border: 1px solid rgba(59, 130, 246, 0.3);">
              <p style="color: #60a5fa; margin: 0; font-size: 14px;">
                ℹ️ <strong>Note:</strong> This is a simplified UI to verify the application is working.
                The full professional interface will be loaded once we confirm everything is functioning correctly.
              </p>
            </div>

            <button
              id="test-btn"
              style="margin-top: 24px; padding: 12px 24px; background: linear-gradient(to right, #3b82f6, #22d3ee); border: none; border-radius: 8px; color: white; font-weight: 600; cursor: pointer; font-size: 16px;"
              onmouseover="this.style.opacity='0.9'"
              onmouseout="this.style.opacity='1'"
            >
              🔄 Test Button - Click Me!
            </button>
          </div>
        </div>
      </div>
    `;

    console.log('SimpleUI: Attaching event listeners...');

    const btn = document.getElementById('test-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        alert('✓ JavaScript event handlers are working! The app is fully functional.');
      });
      console.log('✓ Button event listener attached');
    }

    console.log('✓ SimpleUI rendered successfully');
  }
}
