import React from 'react';
import {
  MapPin,
  Clock,
  Compass,
  Droplets,
  Wind,
  CloudRain,
  ArrowUp,
  ArrowDown,
  Info,
} from 'lucide-react';
import { ProcessedWeatherData, TemperatureUnit } from '../types/weather';
import { formatTemperature, formatWindSpeed } from '../utils/formatters';
import { WeatherIcon } from './WeatherIcon';

interface CurrentWeatherCardProps {
  data: ProcessedWeatherData;
  unit: TemperatureUnit;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({ data, unit }) => {
  const { location, current, fetchedAt } = data;
  const condition = current.condition;

  return (
    <div
      id="current-weather-card"
      className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-3xl shadow-xl shadow-black/30 transition-all"
    >
      {/* Dynamic atmospheric subtle gradient accent banner */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${condition.bgGradient} pointer-events-none opacity-90`}
      />

      <div className="relative p-6 sm:p-8">
        {/* Location & Time Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 text-blue-400 font-medium text-xs sm:text-sm uppercase tracking-wider">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>Resolved Location</span>
            </div>
            <div className="flex items-baseline flex-wrap gap-x-2.5 gap-y-1 mt-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {location.name}
              </h2>
              <div className="text-base sm:text-lg text-slate-400 font-medium">
                {location.admin1 ? `${location.admin1}, ` : ''}
                <span className="text-slate-200">{location.country}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400 mt-1.5 font-mono">
              <span>
                Lat {location.latitude.toFixed(2)}°, Lon {location.longitude.toFixed(2)}°
              </span>
              {location.timezone && (
                <span className="hidden sm:inline-flex items-center gap-1">
                  <Compass className="h-3 w-3 text-slate-400" />
                  {location.timezone}
                </span>
              )}
            </div>
          </div>

          {/* Timestamp & WMO Code pill */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-xl border border-slate-700/60">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-slate-300">Updated {fetchedAt}</span>
            </div>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 mt-1 rounded-lg text-[11px] font-medium border ${condition.badgeColor}`}
            >
              WMO Code {current.weatherCode}
            </span>
          </div>
        </div>

        {/* Primary Temperature & Condition Display */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-6 items-center">
          {/* Main Temperature and feels like */}
          <div className="md:col-span-7 flex items-center justify-between sm:justify-start sm:gap-8">
            <div className="flex flex-col">
              <div className="flex items-baseline">
                <span className="text-6xl sm:text-7xl font-extrabold text-white tracking-tighter">
                  {formatTemperature(current.temperature, unit)}
                </span>
                <span className="text-2xl sm:text-3xl font-light text-slate-500 ml-1">
                  {unit === 'celsius' ? 'C' : 'F'}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-2 text-sm text-slate-400">
                <span className="font-medium">
                  Feels like{' '}
                  <strong className="text-slate-100 font-semibold">
                    {formatTemperature(current.apparentTemperature, unit)}
                  </strong>
                </span>
                <span className="text-slate-600">•</span>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center text-rose-400 font-medium">
                    <ArrowUp className="h-3.5 w-3.5 mr-0.5" />
                    {formatTemperature(current.todayMax, unit)}
                  </span>
                  <span className="inline-flex items-center text-blue-400 font-medium">
                    <ArrowDown className="h-3.5 w-3.5 mr-0.5" />
                    {formatTemperature(current.todayMin, unit)}
                  </span>
                </div>
              </div>
            </div>

            {/* Condition Icon */}
            <div className="flex flex-col items-center">
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-inner text-blue-400">
                <WeatherIcon name={condition.iconName} className="h-16 w-16 sm:h-20 sm:w-20" />
              </div>
            </div>
          </div>

          {/* Condition description & overview */}
          <div className="md:col-span-5 md:border-l md:border-slate-800/80 md:pl-6 flex flex-col justify-center">
            <div className="inline-block">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border ${condition.badgeColor}`}
              >
                {condition.label}
              </span>
            </div>
            <p className="text-slate-200 font-medium text-sm sm:text-base mt-2">
              {condition.description}
            </p>
            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5 text-slate-500 shrink-0" />
              Calculated from current Open-Meteo surface weather model.
            </p>
          </div>
        </div>

        {/* Core Environmental Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80">
          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/40 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-950/80 text-blue-400 border border-blue-800/40">
              <Droplets className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Humidity</p>
              <p className="text-base font-bold text-white">{current.humidity}%</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/40 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-950/80 text-teal-400 border border-teal-800/40">
              <Wind className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Wind Speed</p>
              <p className="text-base font-bold text-white">
                {formatWindSpeed(current.windSpeed, unit)}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/40 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-950/80 text-sky-400 border border-sky-800/40">
              <CloudRain className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Rain Chance</p>
              <p className="text-base font-bold text-white">
                {current.todayPrecipitationProbability}%
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/40 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-950/80 text-indigo-400 border border-indigo-800/40">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Condition Code</p>
              <p className="text-base font-bold text-white">WMO #{current.weatherCode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
