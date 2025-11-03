# 🌍 MeteoScope

**Professional Weather Data Visualization Platform**

A comprehensive, production-ready weather visualization application featuring global coverage, 40+ weather models, historical archives dating back to 1940, and advanced data export capabilities.

![MeteoScope](https://img.shields.io/badge/Weather-Visualization-blue) ![License](https://img.shields.io/badge/license-MIT-green) ![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)

---

## ✨ Key Features

### 🌐 **Global Coverage & Data Sources**
- **40+ Weather Models** from leading meteorological agencies worldwide
- **Open-Meteo API** integration (free, no API key required)
- **Historical Archives** from 1940 to present
- **7-Day Hourly Forecasts** with high-resolution data
- **Global Location Search** with geocoding

### 📊 **Advanced Visualization**
- **Interactive Charts** powered by Chart.js
- **Multi-Model Comparison** view
- **Real-Time Statistics** (min, max, mean, median)
- **Customizable Display** (grid, legend, smoothing)
- **20+ Weather Variables** available

### 💾 **Export Capabilities**
- **PNG Export** - High-quality chart images
- **SVG Export** - Vector graphics for publications
- **CSV Export** - Raw data for analysis
- **Timestamped Filenames** for organization

### 🎨 **Professional Interface**
- Modern dark theme with gradient backgrounds
- Responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Intuitive controls and workflows

---

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/Weather-patterns.git
cd Weather-patterns

# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

---

## 📖 Usage Guide

### Basic Workflow

1. **Select Location**
   - Type any city name in the location search
   - Choose from the dropdown results
   - Global coverage with precise coordinates

2. **Choose Data Type**
   - **Forecast**: Next 7 days hourly forecast
   - **Historical**: Custom date range (1940-present)
   - **Model Comparison**: Compare multiple models side-by-side

3. **Select Weather Variables**
   - Choose from 20+ parameters
   - Multiple selections supported
   - Organized by category

4. **Configure Visualization**
   - Toggle grid lines and legend
   - Adjust line smoothing
   - Customize appearance

5. **Visualize & Analyze**
   - Click "Visualize Data"
   - Interactive charts with hover details
   - Statistical analysis panel

6. **Export Results**
   - PNG for presentations
   - SVG for publications
   - CSV for further analysis

---

## 🌐 Available Weather Models

MeteoScope includes **40+ professional weather models**:

### Global Models
- **ECMWF IFS** (0.25°, 0.4°) - European Centre for Medium-Range Weather Forecasts
- **GFS** (Global, HRRR, GraphCast) - NOAA Global Forecast System
- **ICON** (Global, EU, D2) - DWD German Weather Service
- **GEM** (Global, Regional, HRDPS) - Environment Canada
- **JMA** (GSM, MSM) - Japan Meteorological Agency
- **UKMO** (Global, UK) - UK Met Office
- **BOM ACCESS** - Australian Bureau of Meteorology

### Regional High-Resolution Models
- **AROME France** (1.5 km)
- **HARMONIE** (Netherlands, Europe)
- **COSMO** (Italy, Mediterranean)
- **MetNo Nordic** (1 km)
- And many more...

---

## 📈 Weather Variables

### Temperature
- Temperature (2m, apparent, dew point)
- Soil temperature

### Precipitation
- Precipitation, rain, snowfall
- Precipitation probability
- Precipitation hours

### Wind
- Wind speed (10m, 100m)
- Wind direction
- Wind gusts

### Atmospheric
- Surface & sea level pressure
- Relative humidity
- Visibility

### Cloud Cover
- Total, low, mid, high cloud cover

### Other
- Soil moisture
- Sunrise/sunset times

---

## 🛠️ Technology Stack

- **Frontend**: TypeScript, Vite
- **Visualization**: Chart.js with time scale adapter
- **Styling**: Tailwind CSS v3
- **API**: Open-Meteo (free, open-source)
- **Deployment**: GitHub Pages ready

---

## 📦 Project Structure

```
meteoscope/
├── src/
│   ├── api/
│   │   └── openmeteo.ts          # API integration
│   ├── components/
│   │   ├── ProfessionalUI.ts     # Main interface
│   │   └── WeatherChart.ts       # Chart component with export
│   ├── types/
│   │   └── weather.ts            # TypeScript definitions
│   ├── utils/
│   │   ├── formatters.ts         # Data formatting
│   │   ├── models.ts             # Model definitions (40+ models)
│   │   └── weatherVariables.ts  # Variable definitions
│   ├── main.ts                   # Application entry
│   └── style.css                 # Global styles
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 🎯 Use Cases

- **Meteorological Research**: Analyze weather patterns and trends
- **Model Validation**: Compare forecast model performance
- **Climate Studies**: Historical data analysis
- **Education**: Learn about atmospheric science
- **Planning**: Seasonal weather trend analysis
- **Data Science**: Export data for ML/AI projects
- **Publications**: Export charts for papers and reports

---

## 🌟 Advanced Features

### Model Comparison Mode
Compare forecasts from 5 leading global models simultaneously:
- ECMWF IFS 0.25°
- GFS Global
- ICON Global
- MeteoFrance ARPEGE World
- GEM Global

### Historical Data Analysis
- Date range selection
- Multi-variable plotting
- Long-term trend visualization
- Statistical analysis

### Export Options
All exports include:
- Automatic timestamping
- Location in filename
- Optimized file sizes
- Professional formatting

---

## 📊 API Information

MeteoScope uses the [Open-Meteo API](https://open-meteo.com/):

### Benefits
✅ **Free** for non-commercial use
✅ **No API key** required
✅ **High quality** data from national weather services
✅ **40+ models** available
✅ **Historical data** from 1940
✅ **Global coverage**

### Endpoints Used
- **Forecast API**: `api.open-meteo.com/v1/forecast`
- **Historical API**: `archive-api.open-meteo.com/v1/archive`
- **Geocoding API**: `geocoding-api.open-meteo.com/v1/search`

---

## 🚀 Deployment

### GitHub Pages

1. **Configure Repository**:
   - Go to Settings → Pages
   - Source: GitHub Actions

2. **Push to Main**:
   ```bash
   git push origin main
   ```

3. **Automatic Deployment**:
   - GitHub Actions workflow included
   - Automatic builds on push to main
   - Site available at `username.github.io/Weather-patterns`

### Other Platforms
- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop `dist/` folder
- **Custom Server**: Serve `dist/` directory

---

## 🎨 Customization

### Adding New Variables
Edit `src/utils/weatherVariables.ts`:
```typescript
export const WEATHER_VARIABLES: WeatherVariable[] = [
  {
    id: 'your_variable',
    name: 'Your Variable Name',
    unit: 'unit',
    category: 'temperature', // or other category
  },
  // ...
];
```

### Adding New Models
All 40+ models are already included! See `src/utils/models.ts` for the complete list.

### Styling
Modify `src/style.css` and Tailwind classes in `src/components/ProfessionalUI.ts`.

---

## 📄 License

MIT License - Free for personal and commercial use.

---

## 🙏 Acknowledgments

- **[Open-Meteo](https://open-meteo.com/)** - Excellent free weather API
- **[Chart.js](https://www.chartjs.org/)** - Powerful charting library
- **Weather Services**: ECMWF, NOAA, DWD, MeteoFrance, ECCC, JMA, UKMO, BOM, and more

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/Weather-patterns/issues)
- **Documentation**: See this README and inline code documentation
- **API Docs**: [Open-Meteo Documentation](https://open-meteo.com/en/docs)

---

## 🔮 Roadmap

- [ ] Ensemble forecast visualization
- [ ] Weather alerts and warnings
- [ ] Radar and satellite imagery
- [ ] Mobile app version
- [ ] Custom model selection for comparison
- [ ] Advanced statistical analysis tools
- [ ] Interactive map interface
- [ ] Share visualization URLs

---

**Built with ❤️ for meteorology enthusiasts, researchers, and data scientists worldwide.**

**MeteoScope** - Professional Weather Data Visualization | Powered by Open-Meteo | 2024
