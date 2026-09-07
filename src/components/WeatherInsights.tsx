import React from 'react';
import { Sparkles, Umbrella, Shirt, Droplets, Wind, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { WeatherRecommendation } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';

interface WeatherInsightsProps {
  recommendations: WeatherRecommendation[];
}

export const WeatherInsights: React.FC<WeatherInsightsProps> = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) return null;

  const getSeverityBadge = (severity: WeatherRecommendation['severity']) => {
    switch (severity) {
      case 'favorable':
        return {
          label: 'Favorable',
          badgeClass: 'bg-emerald-950/60 text-emerald-400 border-emerald-800/50',
          icon: <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />,
        };
      case 'warning':
        return {
          label: 'Advisory',
          badgeClass: 'bg-rose-950/60 text-rose-400 border-rose-800/50',
          icon: <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />,
        };
      case 'caution':
        return {
          label: 'Notice',
          badgeClass: 'bg-amber-950/60 text-amber-400 border-amber-800/50',
          icon: <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />,
        };
      case 'info':
      default:
        return {
          label: 'Guidance',
          badgeClass: 'bg-blue-950/60 text-blue-400 border-blue-800/50',
          icon: <Info className="h-3.5 w-3.5 text-blue-400" />,
        };
    }
  };

  return (
    <div id="weather-intelligence-recommendations" className="w-full">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="p-2 rounded-xl bg-blue-950/80 text-blue-400 border border-blue-800/50">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">
            Weather Intelligence &amp; Planning Recommendations
          </h3>
          <p className="text-xs text-slate-400">
            Actionable daily guidance derived from real-time meteorological metrics
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {recommendations.map((rec) => {
          const badge = getSeverityBadge(rec.severity);

          return (
            <div
              key={rec.id}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div>
                {/* Header with Icon and Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-slate-800/80 text-blue-400 border border-slate-700/50">
                    <WeatherIcon name={rec.icon} className="h-5 w-5" />
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${badge.badgeClass}`}
                  >
                    {badge.icon}
                    {badge.label}
                  </span>
                </div>

                {/* Title and Description */}
                <h4 className="text-sm font-bold text-white leading-snug">{rec.title}</h4>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{rec.description}</p>
              </div>

              {/* Category tag at bottom */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                <span className="capitalize font-medium text-slate-400">{rec.category} advice</span>
                <span className="text-[10px] uppercase font-mono text-slate-500">Open-Meteo Rules</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
