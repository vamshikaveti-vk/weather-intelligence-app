import React, { useState } from 'react';
import { DayForecast, TemperatureUnit } from '../types/weather';
import { formatTemperature, formatTemperatureValue } from '../utils/formatters';
import { WeatherIcon } from './WeatherIcon';

interface TemperatureChartProps {
  forecasts: DayForecast[];
  unit: TemperatureUnit;
  selectedDayIndex?: number;
  onSelectDay?: (index: number) => void;
}

export const TemperatureChart: React.FC<TemperatureChartProps> = ({
  forecasts,
  unit,
  selectedDayIndex,
  onSelectDay,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!forecasts || forecasts.length === 0) return null;

  // Compute coordinate system
  const chartWidth = 700;
  const chartHeight = 220;
  const paddingLeft = 45;
  const paddingRight = 45;
  const paddingTop = 35;
  const paddingBottom = 45;

  const usableWidth = chartWidth - paddingLeft - paddingRight;
  const usableHeight = chartHeight - paddingTop - paddingBottom;

  // Convert values to active unit for correct scaling and labels
  const maxTemps = forecasts.map((f) => formatTemperatureValue(f.maxTemp, unit));
  const minTemps = forecasts.map((f) => formatTemperatureValue(f.minTemp, unit));

  const globalMax = Math.max(...maxTemps);
  const globalMin = Math.min(...minTemps);
  // Add a buffer so lines don't hit the absolute edges
  const yMax = globalMax + 2;
  const yMin = globalMin - 2;
  const yRange = Math.max(yMax - yMin, 4);

  const stepX = usableWidth / (forecasts.length - 1);

  // Compute (x, y) coordinates for each point
  const pointsMax = maxTemps.map((val, i) => {
    const x = paddingLeft + i * stepX;
    const y = paddingTop + (1 - (val - yMin) / yRange) * usableHeight;
    return { x, y, val };
  });

  const pointsMin = minTemps.map((val, i) => {
    const x = paddingLeft + i * stepX;
    const y = paddingTop + (1 - (val - yMin) / yRange) * usableHeight;
    return { x, y, val };
  });

  // SVG Line paths
  const maxLinePath = pointsMax.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x},${pt.y}`, '');
  const minLinePath = pointsMin.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x},${pt.y}`, '');

  // Shaded area under the max curve
  const areaPath = `${maxLinePath} L ${pointsMax[pointsMax.length - 1].x},${chartHeight - paddingBottom} L ${pointsMax[0].x},${chartHeight - paddingBottom} Z`;

  const activeIndex = hoverIndex !== null ? hoverIndex : selectedDayIndex ?? null;

  return (
    <div className="w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl shadow-black/20">
      {/* Header & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-base font-bold text-white">7-Day Temperature Trend</h3>
          <p className="text-xs text-slate-400">
            Daily maximum &amp; minimum temperature progression ({unit === 'celsius' ? '°C' : '°F'})
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-500" />
            <span className="text-slate-300">Max Temp</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-blue-500" />
            <span className="text-slate-300">Min Temp</span>
          </div>
        </div>
      </div>

      {/* SVG Chart Container */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-auto overflow-visible select-none"
        >
          <defs>
            {/* Soft gradient fill for temperature range */}
            <linearGradient id="tempAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Horizontal grid lines */}
          {[0, 0.33, 0.66, 1].map((ratio) => {
            const y = paddingTop + ratio * usableHeight;
            const tempLevel = Math.round(yMax - ratio * yRange);
            return (
              <g key={ratio}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={chartWidth - paddingRight}
                  y2={y}
                  stroke="#1e293b"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  fontSize="10"
                  fill="#64748b"
                  fontFamily="monospace"
                >
                  {tempLevel}°
                </text>
              </g>
            );
          })}

          {/* Area fill under the maximum temperature curve */}
          <path d={areaPath} fill="url(#tempAreaGradient)" />

          {/* Active column highlight bar */}
          {activeIndex !== null && (
            <line
              x1={pointsMax[activeIndex].x}
              y1={paddingTop - 10}
              x2={pointsMax[activeIndex].x}
              y2={chartHeight - paddingBottom + 5}
              stroke="#3b82f6"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              opacity="0.8"
            />
          )}

          {/* Max Temperature Line */}
          <path
            d={maxLinePath}
            fill="none"
            stroke="#f43f5e"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Min Temperature Line */}
          <path
            d={minLinePath}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points, Labels and Click Areas */}
          {forecasts.map((day, i) => {
            const ptMax = pointsMax[i];
            const ptMin = pointsMin[i];
            const isHovered = activeIndex === i;

            return (
              <g
                key={day.date}
                className="cursor-pointer"
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
                onClick={() => onSelectDay && onSelectDay(i)}
              >
                {/* Transparent hover column */}
                <rect
                  x={ptMax.x - stepX / 2}
                  y={paddingTop - 15}
                  width={stepX}
                  height={usableHeight + 45}
                  fill="transparent"
                />

                {/* Day Label at bottom */}
                <text
                  x={ptMax.x}
                  y={chartHeight - 16}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight={day.isToday || isHovered ? '700' : '500'}
                  fill={day.isToday ? '#60a5fa' : isHovered ? '#ffffff' : '#94a3b8'}
                >
                  {day.dayName}
                </text>
                <text
                  x={ptMax.x}
                  y={chartHeight - 4}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#64748b"
                >
                  {day.formattedDate}
                </text>

                {/* Max Temp Dot and Text */}
                <circle
                  cx={ptMax.x}
                  cy={ptMax.y}
                  r={isHovered ? 6 : 4}
                  fill="#0f172a"
                  stroke="#f43f5e"
                  strokeWidth={isHovered ? 3 : 2.5}
                  className="transition-all duration-150"
                />
                <text
                  x={ptMax.x}
                  y={ptMax.y - 10}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="#fb7185"
                >
                  {formatTemperature(day.maxTemp, unit)}
                </text>

                {/* Min Temp Dot and Text */}
                <circle
                  cx={ptMin.x}
                  cy={ptMin.y}
                  r={isHovered ? 6 : 4}
                  fill="#0f172a"
                  stroke="#3b82f6"
                  strokeWidth={isHovered ? 3 : 2.5}
                  className="transition-all duration-150"
                />
                <text
                  x={ptMin.x}
                  y={ptMin.y + 18}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="#60a5fa"
                >
                  {formatTemperature(day.minTemp, unit)}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating tooltip when a day is active */}
        {activeIndex !== null && (
          <div className="mt-3 py-2 px-3.5 bg-slate-800/95 border border-slate-700/80 text-white rounded-2xl text-xs flex items-center justify-between shadow-xl">
            <div className="flex items-center gap-2">
              <WeatherIcon
                name={forecasts[activeIndex].condition.iconName}
                className="h-4 w-4 text-blue-400"
              />
              <span className="font-semibold text-white">{forecasts[activeIndex].dayName}</span>
              <span className="text-slate-400">({forecasts[activeIndex].formattedDate}):</span>
              <span className="text-slate-200">{forecasts[activeIndex].condition.label}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-rose-400 font-bold">
                Max: {formatTemperature(forecasts[activeIndex].maxTemp, unit)}
              </span>
              <span className="text-blue-400 font-bold">
                Min: {formatTemperature(forecasts[activeIndex].minTemp, unit)}
              </span>
              <span className="text-slate-300">
                Rain: {forecasts[activeIndex].precipitationProbability}%
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
