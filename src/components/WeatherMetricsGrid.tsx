import React from 'react';
import {
  Thermometer,
  Droplets,
  Wind,
  CloudRain,
  Compass,
  Gauge,
} from 'lucide-react';
import { ProcessedWeatherData, TemperatureUnit } from '../types/weather';
import { formatTemperature, formatWindSpeed } from '../utils/formatters';

interface WeatherMetricsGridProps {
  data: ProcessedWeatherData;
  unit: TemperatureUnit;
}

export const WeatherMetricsGrid: React.FC<WeatherMetricsGridProps> = ({ data, unit }) => {
  const { current } = data;

  const metrics = [
    {
      id: 'feels-like',
      label: 'Feels Like',
      value: formatTemperature(current.apparentTemperature, unit),
      subtext:
        Math.abs(current.temperature - current.apparentTemperature) < 1
          ? 'Matches air temp'
          : current.apparentTemperature > current.temperature
          ? 'Warmer due to humidity'
          : 'Cooler due to wind',
      icon: <Thermometer className="h-5 w-5 text-amber-400" />,
      bg: 'bg-amber-950/70 border border-amber-800/40',
    },
    {
      id: 'humidity',
      label: 'Relative Humidity',
      value: `${current.humidity}%`,
      subtext:
        current.humidity > 70
          ? 'High humidity'
          : current.humidity < 30
          ? 'Dry conditions'
          : 'Comfortable range',
      icon: <Droplets className="h-5 w-5 text-blue-400" />,
      bg: 'bg-blue-950/70 border border-blue-800/40',
    },
    {
      id: 'wind',
      label: 'Wind Speed',
      value: formatWindSpeed(current.windSpeed, unit),
      subtext:
        current.windSpeed < 15
          ? 'Gentle breeze'
          : current.windSpeed < 30
          ? 'Moderate breeze'
          : 'Brisk wind',
      icon: <Wind className="h-5 w-5 text-teal-400" />,
      bg: 'bg-teal-950/70 border border-teal-800/40',
    },
    {
      id: 'precipitation',
      label: 'Precipitation Probability',
      value: `${current.todayPrecipitationProbability}%`,
      subtext:
        current.todayPrecipitationProbability > 50
          ? 'Rain likely today'
          : current.todayPrecipitationProbability > 20
          ? 'Low chance of rain'
          : 'Minimal chance of rain',
      icon: <CloudRain className="h-5 w-5 text-sky-400" />,
      bg: 'bg-sky-950/70 border border-sky-800/40',
    },
    {
      id: 'temp-range',
      label: "Today's Temperature Span",
      value: `${formatTemperature(current.todayMin, unit)} - ${formatTemperature(
        current.todayMax,
        unit
      )}`,
      subtext: 'Daily minimum to maximum',
      icon: <Gauge className="h-5 w-5 text-indigo-400" />,
      bg: 'bg-indigo-950/70 border border-indigo-800/40',
    },
    {
      id: 'weather-code',
      label: 'WMO Standard Code',
      value: `#${current.weatherCode}`,
      subtext: current.condition.label,
      icon: <Compass className="h-5 w-5 text-slate-300" />,
      bg: 'bg-slate-800/80 border border-slate-700/40',
    },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white">Atmospheric Observations</h3>
          <p className="text-xs text-slate-400">Detailed surface readings for the current hour</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {metrics.map((m) => (
          <div
            key={m.id}
            className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm flex flex-col justify-between hover:border-slate-700/80 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 truncate">{m.label}</span>
              <div className={`p-1.5 rounded-xl ${m.bg}`}>{m.icon}</div>
            </div>
            <div>
              <p className="text-lg sm:text-xl font-bold text-white">{m.value}</p>
              <p className="text-[11px] text-slate-400 mt-0.5 truncate">{m.subtext}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
