import React from 'react';
import { SearchX, AlertTriangle, RefreshCw, MapPin } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  isNotFound?: boolean;
  onRetry?: () => void;
  onSelectCity?: (city: string) => void;
}

const RECOVERY_CITIES = ['Chennai', 'London', 'New York', 'Tokyo', 'Paris'];

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  isNotFound = false,
  onRetry,
  onSelectCity,
}) => {
  return (
    <div
      id="weather-error-banner"
      className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center shadow-xl"
    >
      <div className="mx-auto w-12 h-12 rounded-2xl bg-rose-950/70 border border-rose-800/60 flex items-center justify-center text-rose-400 mb-4">
        {isNotFound ? <SearchX className="h-6 w-6" /> : <AlertTriangle className="h-6 w-6" />}
      </div>

      <h3 className="text-lg font-bold text-white mb-1">
        {isNotFound ? 'City Not Found' : 'Weather Service Notice'}
      </h3>

      <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
        {message || 'City not found. Please check the city name and try again.'}
      </p>

      {/* Recovery action buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Try Again
          </button>
        )}

        {onSelectCity && (
          <div className="flex items-center gap-1.5 flex-wrap justify-center mt-1">
            <span className="text-xs text-slate-400">Or try:</span>
            {RECOVERY_CITIES.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => onSelectCity(city)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 hover:border-blue-500/50 rounded-xl transition-colors"
              >
                <MapPin className="h-3 w-3 text-blue-400" />
                {city}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
