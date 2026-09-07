import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="w-full space-y-6 animate-pulse" aria-label="Loading weather data">
      {/* Current Weather Skeleton */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="space-y-2.5">
            <div className="h-4 w-32 bg-slate-800 rounded" />
            <div className="h-8 w-64 bg-slate-800 rounded" />
            <div className="h-3 w-44 bg-slate-800/60 rounded" />
          </div>
          <div className="h-8 w-28 bg-slate-800/60 rounded-xl" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 flex items-center justify-between sm:justify-start sm:gap-8">
            <div className="space-y-3">
              <div className="h-16 w-36 bg-slate-800 rounded-xl" />
              <div className="h-4 w-48 bg-slate-800/60 rounded" />
            </div>
            <div className="h-20 w-20 bg-slate-800 rounded-2xl" />
          </div>
          <div className="md:col-span-5 space-y-2">
            <div className="h-5 w-24 bg-slate-800 rounded-full" />
            <div className="h-4 w-full bg-slate-800/60 rounded" />
            <div className="h-3 w-3/4 bg-slate-800/60 rounded" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-slate-800/60 rounded-2xl" />
          ))}
        </div>
      </div>

      {/* 7-Day Forecast Skeleton */}
      <div className="space-y-3">
        <div className="h-5 w-48 bg-slate-800 rounded" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="h-48 bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-3">
              <div className="h-4 w-16 bg-slate-800 rounded" />
              <div className="h-10 w-10 mx-auto bg-slate-800/60 rounded-xl" />
              <div className="h-4 w-20 mx-auto bg-slate-800 rounded" />
              <div className="h-2 w-full bg-slate-800/60 rounded-full" />
              <div className="h-3 w-12 bg-slate-800/60 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Temperature Chart Skeleton */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="h-5 w-56 bg-slate-800 rounded" />
        <div className="h-48 bg-slate-950/40 rounded-2xl" />
      </div>
    </div>
  );
};
