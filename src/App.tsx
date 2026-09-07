import React, { useState, useEffect, useCallback } from 'react';
import {
  searchCities,
  fetchWeatherData,
  CityNotFoundError,
} from './services/openMeteo';
import {
  ProcessedWeatherData,
  TemperatureUnit,
  GeoLocation,
} from './types/weather';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { CurrentWeatherCard } from './components/CurrentWeatherCard';
import { WeatherInsights } from './components/WeatherInsights';
import { WeatherMetricsGrid } from './components/WeatherMetricsGrid';
import { TemperatureChart } from './components/TemperatureChart';
import { ForecastCards } from './components/ForecastCards';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { ErrorMessage } from './components/ErrorMessage';
import { CloudSun, ShieldCheck, Database, Globe } from 'lucide-react';

const DEFAULT_CITY = 'San Francisco';
const STORAGE_KEY_UNIT = 'weather_intelligence_unit';
const STORAGE_KEY_LAST_CITY = 'weather_intelligence_last_city';

export default function App() {
  const [unit, setUnit] = useState<TemperatureUnit>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_UNIT);
      return saved === 'fahrenheit' ? 'fahrenheit' : 'celsius';
    } catch {
      return 'celsius';
    }
  });

  const [weatherData, setWeatherData] = useState<ProcessedWeatherData | null>(null);
  const [currentLocation, setCurrentLocation] = useState<GeoLocation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<{ message: string; isNotFound: boolean } | null>(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

  // Toggle temperature unit
  const handleToggleUnit = () => {
    setUnit((prev) => {
      const next = prev === 'celsius' ? 'fahrenheit' : 'celsius';
      try {
        localStorage.setItem(STORAGE_KEY_UNIT, next);
      } catch {
        // ignore localStorage errors
      }
      return next;
    });
  };

  // Perform search by city query using Open-Meteo Geocoding then Forecast API
  const handleSearch = useCallback(async (cityName: string) => {
    if (!cityName.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // 1. Geocode city name to lat/lon
      const locations = await searchCities(cityName);
      const primaryLocation = locations[0];
      setCurrentLocation(primaryLocation);

      // 2. Fetch weather forecast for coordinates
      const data = await fetchWeatherData(primaryLocation);
      setWeatherData(data);
      setSelectedDayIndex(0);

      try {
        localStorage.setItem(STORAGE_KEY_LAST_CITY, primaryLocation.name);
      } catch {
        // ignore storage error
      }
    } catch (err: unknown) {
      if (err instanceof CityNotFoundError) {
        setError({
          message: 'City not found. Please check the city name and try again.',
          isNotFound: true,
        });
      } else {
        const errorMsg =
          err instanceof Error
            ? err.message
            : 'An unexpected error occurred while contacting the Open-Meteo API. Please try again.';
        setError({
          message: errorMsg,
          isNotFound: false,
        });
      }
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch directly from a resolved location
  const handleSelectLocation = useCallback(async (location: GeoLocation) => {
    setIsLoading(true);
    setError(null);
    setCurrentLocation(location);

    try {
      const data = await fetchWeatherData(location);
      setWeatherData(data);
      setSelectedDayIndex(0);

      try {
        localStorage.setItem(STORAGE_KEY_LAST_CITY, location.name);
      } catch {
        // ignore storage error
      }
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : 'Unable to fetch forecast data for this location.';
      setError({
        message: errorMsg,
        isNotFound: false,
      });
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Refresh current location weather data
  const handleRefresh = async () => {
    if (!currentLocation) {
      handleSearch(DEFAULT_CITY);
      return;
    }

    setIsRefreshing(true);
    try {
      const data = await fetchWeatherData(currentLocation);
      setWeatherData(data);
    } catch {
      // Keep existing data on refresh error
    } finally {
      setIsRefreshing(false);
    }
  };

  // Initial load on component mount
  useEffect(() => {
    let initialCity = DEFAULT_CITY;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LAST_CITY);
      if (saved && saved.trim()) {
        initialCity = saved;
      }
    } catch {
      // ignore
    }
    handleSearch(initialCity);
  }, [handleSearch]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600/30 selection:text-blue-200">
      {/* Sticky Header */}
      <Header
        unit={unit}
        onToggleUnit={handleToggleUnit}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Search & Location Bar */}
        <section aria-label="Location Search">
          <SearchBar
            onSearch={handleSearch}
            isLoading={isLoading}
            onSelectLocation={handleSelectLocation}
          />
        </section>

        {/* Content States: Loading, Error, or Weather Dashboard */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorMessage
            message={error.message}
            isNotFound={error.isNotFound}
            onRetry={() => handleSearch(currentLocation ? currentLocation.name : DEFAULT_CITY)}
            onSelectCity={(city) => handleSearch(city)}
          />
        ) : weatherData ? (
          <div className="space-y-8">
            {/* Current Weather Hero Card */}
            <section aria-label="Current Weather Overview">
              <CurrentWeatherCard data={weatherData} unit={unit} />
            </section>

            {/* Weather Intelligence & Planning Recommendations */}
            <section aria-label="Planning Recommendations">
              <WeatherInsights recommendations={weatherData.recommendations} />
            </section>

            {/* Detailed Atmospheric Metrics */}
            <section aria-label="Atmospheric Metrics">
              <WeatherMetricsGrid data={weatherData} unit={unit} />
            </section>

            {/* 7-Day Temperature Trend SVG Chart */}
            <section aria-label="7-Day Temperature Trend Chart">
              <TemperatureChart
                forecasts={weatherData.daily}
                unit={unit}
                selectedDayIndex={selectedDayIndex}
                onSelectDay={(idx) => setSelectedDayIndex(idx)}
              />
            </section>

            {/* 7-Day Individual Forecast Cards */}
            <section aria-label="7-Day Daily Forecast Cards">
              <ForecastCards
                forecasts={weatherData.daily}
                unit={unit}
                selectedDayIndex={selectedDayIndex}
                onSelectDay={(idx) => setSelectedDayIndex(idx)}
              />
            </section>
          </div>
        ) : null}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-blue-950/80 border border-blue-800/50 flex items-center justify-center text-blue-400">
              <CloudSun className="h-4 w-4" />
            </div>
            <span className="font-semibold text-slate-200">Weather Intelligence</span>
            <span>•</span>
            <span>Free &amp; Open Source Meteorological Data</span>
          </div>

          <div className="flex items-center flex-wrap gap-4">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Database className="h-3.5 w-3.5 text-blue-400" />
              <span>Powered by Open-Meteo APIs</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>No API Keys or Auth Required</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Globe className="h-3.5 w-3.5 text-indigo-400" />
              <span>Open-Meteo Public Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
