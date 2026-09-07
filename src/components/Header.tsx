import React from 'react';
import { CloudSun, RotateCw } from 'lucide-react';
import { TemperatureUnit } from '../types/weather';

interface HeaderProps {
  unit: TemperatureUnit;
  onToggleUnit: () => void;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  unit,
  onToggleUnit,
  onRefresh,
  isRefreshing = false,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <CloudSun className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white tracking-tight leading-none">
                Weather Intelligence
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-blue-950/80 text-blue-400 border border-blue-800/60">
                Open-Meteo
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Live Meteorological &amp; Forecast Analytics
            </p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Unit Toggle Button */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              id="unit-celsius-btn"
              type="button"
              onClick={() => unit !== 'celsius' && onToggleUnit()}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                unit === 'celsius'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              aria-label="Switch to Celsius"
            >
              °C
            </button>
            <button
              id="unit-fahrenheit-btn"
              type="button"
              onClick={() => unit !== 'fahrenheit' && onToggleUnit()}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                unit === 'fahrenheit'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              aria-label="Switch to Fahrenheit"
            >
              °F
            </button>
          </div>

          {/* Refresh Button */}
          <button
            id="refresh-weather-btn"
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors border border-slate-800/80 hover:border-slate-700 disabled:opacity-50"
            title="Refresh current weather data"
            aria-label="Refresh weather data"
          >
            <RotateCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin text-blue-400' : ''}`} />
          </button>
        </div>
      </div>
    </header>
  );
};
