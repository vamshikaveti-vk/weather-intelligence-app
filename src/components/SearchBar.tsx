import React, { useState } from 'react';
import { Search, X, Loader2, MapPin } from 'lucide-react';
import { GeoLocation } from '../types/weather';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
  suggestions?: GeoLocation[];
  onSelectLocation?: (location: GeoLocation) => void;
}

const POPULAR_CITIES = [
  'Chennai',
  'London',
  'Tokyo',
  'New York',
  'Paris',
  'Sydney',
  'San Francisco',
  'Singapore',
];

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  isLoading,
  suggestions = [],
  onSelectLocation,
}) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowSuggestions(false);
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    setShowSuggestions(false);
  };

  const handleQuickSelect = (city: string) => {
    setQuery(city);
    setShowSuggestions(false);
    onSearch(city);
  };

  const handleSelectSuggestion = (loc: GeoLocation) => {
    setQuery(loc.name);
    setShowSuggestions(false);
    if (onSelectLocation) {
      onSelectLocation(loc);
    } else {
      onSearch(loc.name);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center shadow-lg shadow-black/20">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
            <Search className="h-5 w-5" />
          </div>

          <input
            id="city-search-input"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (suggestions.length > 0) setShowSuggestions(true);
            }}
            placeholder="Search city (e.g., San Francisco, Paris, Tokyo, London)..."
            disabled={isLoading}
            className="w-full pl-11 pr-28 py-3.5 text-base text-white bg-slate-900 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-500 disabled:bg-slate-950 disabled:text-slate-600 shadow-sm"
            autoComplete="off"
          />

          <div className="absolute inset-y-0 right-1.5 flex items-center gap-1.5">
            {query && !isLoading && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 text-slate-500 hover:text-slate-300 rounded-xl hover:bg-slate-800 transition-colors"
                aria-label="Clear search input"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            <button
              id="search-submit-btn"
              type="submit"
              disabled={isLoading || !query.trim()}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-medium text-sm rounded-xl transition-all shadow-md shadow-blue-600/25"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="hidden sm:inline">Searching...</span>
                </>
              ) : (
                <span>Search</span>
              )}
            </button>
          </div>
        </div>

        {/* Suggestion Dropdown if ambiguous results exist */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-20 top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-64 overflow-y-auto">
            <div className="px-3.5 py-2 bg-slate-950 border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Matching Locations
            </div>
            {suggestions.map((loc) => (
              <button
                key={`${loc.id}-${loc.latitude}-${loc.longitude}`}
                type="button"
                onClick={() => handleSelectSuggestion(loc)}
                className="w-full px-3.5 py-2.5 text-left flex items-center justify-between hover:bg-slate-800/80 transition-colors border-b border-slate-800/60 last:border-0 text-sm"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-400 shrink-0" />
                  <span className="font-semibold text-slate-200">{loc.name}</span>
                  {loc.admin1 && (
                    <span className="text-slate-400 text-xs">{loc.admin1},</span>
                  )}
                  <span className="text-slate-400 text-xs">{loc.country}</span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">
                  {loc.latitude.toFixed(2)}°, {loc.longitude.toFixed(2)}°
                </span>
              </button>
            ))}
          </div>
        )}
      </form>

      {/* Popular Cities quick chips */}
      <div className="mt-3 flex items-center gap-1.5 flex-wrap">
        <span className="text-xs font-medium text-slate-400 mr-1 flex items-center gap-1">
          <MapPin className="h-3 w-3 text-slate-500" />
          Popular:
        </span>
        {POPULAR_CITIES.map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => handleQuickSelect(city)}
            disabled={isLoading}
            className="px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 rounded-xl transition-colors disabled:opacity-50"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};
