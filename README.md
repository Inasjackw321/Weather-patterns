# 🌦️ Weather Patterns

An advanced, fully-customizable weather visualization tool built with TypeScript, Chart.js, and the Open-Meteo API. Visualize historical weather data, compare weather model forecasts, and explore comprehensive meteorological patterns.

## ✨ Features

### 📊 Data Visualization
- **Interactive Charts**: Powered by Chart.js with smooth animations and responsive design
- **Multiple Variables**: Visualize temperature, precipitation, wind, pressure, humidity, cloud cover, and more
- **Customizable Display**: Toggle grid lines, legends, and adjust line smoothing
- **Real-time Statistics**: View min, max, and mean values for all displayed variables

### 🌐 Weather Data Sources
- **Open-Meteo API Integration**: Free, open-source weather API with no API key required
- **Historical Data**: Access weather archives from 1940 to present
- **7-Day Forecasts**: Get detailed hourly forecasts
- **Multiple Weather Models**: Compare forecasts from:
  - GFS Global (NOAA)
  - ECMWF IFS
  - ICON Global (DWD)
  - MeteoFrance ARPEGE
  - JMA GSM
  - GEM Global

### 🎨 Full Customization
- **Variable Selection**: Choose from 20+ weather parameters
- **Time Range Selection**: Pick any date range for historical analysis
- **Location Search**: Built-in geocoding for easy location lookup
- **Model Comparison**: Compare multiple weather models side-by-side
- **Unit Preferences**: Celsius/Fahrenheit, km/h/mph/m/s, mm/inch

### 📈 Available Weather Variables

**Temperature**:
- Temperature (2m)
- Apparent Temperature
- Dew Point

**Precipitation**:
- Precipitation
- Rain
- Snowfall
- Precipitation Probability

**Wind**:
- Wind Speed (10m & 100m)
- Wind Direction
- Wind Gusts

**Atmospheric**:
- Surface Pressure
- Mean Sea Level Pressure
- Relative Humidity

**Cloud Cover**:
- Total Cloud Cover
- Low/Mid/High Cloud Cover

**Other**:
- Visibility
- Soil Temperature & Moisture

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Weather-patterns.git
cd Weather-patterns
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📖 Usage Guide

### Basic Workflow

1. **Select Location**:
   - Type a city name in the location search box
   - Click on a result to select it

2. **Choose Data Type**:
   - **Forecast**: Next 7 days of hourly weather data
   - **Historical**: Past weather data (select date range)
   - **Model Comparison**: Compare multiple weather models

3. **Select Variables**:
   - Check the weather parameters you want to visualize
   - Multiple variables will be shown on the same chart

4. **Configure Chart**:
   - Toggle grid lines and legend
   - Adjust line smoothing with the slider

5. **Fetch Data**:
   - Click "Fetch Data" to load and visualize
   - View statistics panel for detailed metrics

### Advanced Features

#### Historical Data Analysis
1. Select "Historical Data" from data type dropdown
2. Choose start and end dates
3. Select multiple variables to compare trends
4. Analyze long-term weather patterns

#### Model Comparison
1. Select "Model Comparison" mode
2. Choose one variable to compare
3. All major weather models will be fetched and displayed
4. Identify forecast uncertainties and model agreement

#### Customization Tips
- Use fewer variables for cleaner charts
- Disable grid for minimalist view
- Increase line smoothing for trend analysis
- Check statistics panel for exact values

## 🛠️ Technology Stack

- **Frontend**: TypeScript, Vite
- **Visualization**: Chart.js with date-fns adapter
- **Styling**: Tailwind CSS
- **API**: Open-Meteo API (free, no key required)
- **Deployment**: GitHub Pages

## 📦 Project Structure

```
Weather-patterns/
├── src/
│   ├── api/
│   │   └── openmeteo.ts          # API integration
│   ├── components/
│   │   ├── UI.ts                 # User interface
│   │   └── WeatherChart.ts       # Chart component
│   ├── types/
│   │   └── weather.ts            # TypeScript types
│   ├── utils/
│   │   ├── formatters.ts         # Formatting utilities
│   │   └── weatherVariables.ts   # Variable definitions
│   ├── main.ts                   # Application entry
│   └── style.css                 # Global styles
├── index.html                    # HTML entry point
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript config
└── package.json                 # Dependencies
```

## 🌍 API Information

This project uses the [Open-Meteo API](https://open-meteo.com/), which provides:
- ✅ Free for non-commercial use
- ✅ No API key required
- ✅ High-quality weather data
- ✅ Multiple weather models
- ✅ Historical archives since 1940

### API Endpoints Used
- **Forecast API**: `https://api.open-meteo.com/v1/forecast`
- **Historical API**: `https://archive-api.open-meteo.com/v1/archive`
- **Geocoding API**: `https://geocoding-api.open-meteo.com/v1/search`

## 🎯 Use Cases

- **Weather Research**: Analyze historical climate patterns
- **Model Validation**: Compare forecast model performance
- **Education**: Learn about meteorological variables
- **Planning**: Study seasonal weather trends
- **Data Analysis**: Export and analyze weather data

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Adding New Features

The codebase is modular and easy to extend:

1. **New Variables**: Add to `src/utils/weatherVariables.ts`
2. **New APIs**: Create modules in `src/api/`
3. **New Charts**: Extend `src/components/WeatherChart.ts`
4. **UI Changes**: Modify `src/components/UI.ts`

## 📄 License

MIT License - feel free to use this project for any purpose.

## 🙏 Acknowledgments

- [Open-Meteo](https://open-meteo.com/) for the excellent free weather API
- [Chart.js](https://www.chartjs.org/) for powerful charting capabilities
- Weather data providers: NOAA, ECMWF, DWD, MeteoFrance, JMA, and more

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📧 Support

For questions or issues, please open an issue on GitHub.

---

**Built with ❤️ for weather enthusiasts and data visualization lovers**
