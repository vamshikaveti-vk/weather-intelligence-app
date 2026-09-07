import React from 'react';
import { CloudRain, Wind } from 'lucide-react';
import { DayForecast, TemperatureUnit } from '../types/weather';
import { formatTemperature, formatWindSpeed } from '../utils/formatters';
import { WeatherIcon } from './WeatherIcon';

interface ForecastCardsProps {
  forecasts: DayForecast[];
  unit: TemperatureUnit;
  selectedDayIndex?: number;
  onSelectDay?: (index: number) => void;
}

export const ForecastCards: React.FC<ForecastCardsProps> = ({
  forecasts,
  unit,
  selectedDayIndex,
  onSelectDay,
}) => {
  // Compute overall min & max across the 7 days to size temperature relative progress bars
  const allMax = Math.max(...forecasts.map((f) => f.maxTemp));
  const allMin = Math.min(...forecasts.map((f) => f.minTemp));
  const tempRange = Math.max(allMax - allMin, 1);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white">7-Day Weather Forecast</h3>
          <p className="text-xs text-slate-400">
            Daily projections with temperature ranges and precipitation chances
          </p>
        </div>
        <span className="text-xs text-slate-400 font-medium hidden sm:inline">
          Click any card to inspect
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {forecasts.map((day, idx) => {
          const isSelected = selectedDayIndex === idx;
          const leftPercent = Math.max(0, Math.min(100, ((day.minTemp - allMin) / tempRange) * 100));
          const widthPercent = Math.max(
            15,
            Math.min(100 - leftPercent, ((day.maxTemp - day.minTemp) / tempRange) * 100)
          );

          return (
            <div
              key={day.date}
              id={`forecast-card-${idx}`}
              onClick={() => onSelectDay && onSelectDay(idx)}
              className={`cursor-pointer group flex flex-col justify-between p-3.5 rounded-2xl border transition-all ${
                day.isToday
                  ? 'bg-blue-950/40 border-blue-600/80 ring-1 ring-blue-500/50 shadow-md'
                  : isSelected
                  ? 'bg-slate-800/90 border-blue-500 ring-2 ring-blue-500/30 shadow-md'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60 shadow-sm'
              }`}
            >
              {/* Header: Day and Date */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex flex-col">
                  <span
                    className={`text-sm font-bold tracking-tight ${
                      day.isToday ? 'text-blue-400' : 'text-white'
                    }`}
                  >
                    {day.dayName}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {day.formattedDate}
                  </span>
                </div>
                {day.isToday && (
                  <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-blue-900/80 text-blue-300 border border-blue-700/50">
                    Now
                  </span>
                )}
              </div>

              {/* Weather Icon and condition */}
              <div className="my-2.5 flex flex-col items-center text-center">
                <div className="p-2.5 rounded-xl bg-slate-800/80 group-hover:bg-slate-700/60 transition-colors text-blue-400 border border-slate-700/40 mb-1.5">
                  <WeatherIcon name={day.condition.iconName} className="h-7 w-7" />
                </div>
                <span className="text-xs font-semibold text-slate-200 line-clamp-1">
                  {day.condition.label}
                </span>
              </div>

              {/* High & Low Temperatures */}
              <div className="mt-1 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-rose-400 font-bold">
                    {formatTemperature(day.maxTemp, unit)}
                  </span>
                  <span className="text-slate-600">/</span>
                  <span className="text-blue-400 font-bold">
                    {formatTemperature(day.minTemp, unit)}
                  </span>
                </div>

                {/* Relative Temperature Spread Bar */}
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden relative">
                  <div
                    className="absolute h-full rounded-full bg-gradient-to-r from-blue-500 to-rose-400"
                    style={{
                      left: `${leftPercent}%`,
                      width: `${widthPercent}%`,
                    }}
                  />
                </div>
              </div>

              {/* Footer Metrics: Rain Probability & Wind */}
              <div className="mt-3 pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-1 text-[11px] text-slate-400">
                <div className="flex items-center gap-1" title="Precipitation Probability">
                  <CloudRain
                    className={`h-3 w-3 ${
                      day.precipitationProbability > 40 ? 'text-blue-400' : 'text-slate-500'
                    }`}
                  />
                  <span
                    className={
                      day.precipitationProbability > 40
                        ? 'font-semibold text-blue-400'
                        : 'text-slate-400'
                    }
                  >
                    {day.precipitationProbability}%
                  </span>
                </div>

                <div className="flex items-center justify-end gap-1" title="Peak Wind Speed">
                  <Wind className="h-3 w-3 text-slate-500" />
                  <span className="truncate">{formatWindSpeed(day.maxWindSpeed, unit)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
