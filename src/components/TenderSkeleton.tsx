import React from 'react';
import { Loader2 } from 'lucide-react';

interface TenderSkeletonProps {
  viewMode?: 'grid' | 'table';
  count?: number;
}

export const TenderSkeleton: React.FC<TenderSkeletonProps> = ({
  viewMode = 'grid',
  count = 2,
}) => {
  return (
    <div className="space-y-6">
      {/* Notice Banner */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0">
            <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-800">
              Menghubungkan ke Portal SPEND PT Bukit Asam...
            </h4>
            <p className="text-[11px] text-slate-500">
              Memuat data paket lelang terbuka & jadwal kualifikasi terbaru secara langsung.
            </p>
          </div>
        </div>
        <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>Live Sync</span>
        </div>
      </div>

      {/* Section Header Skeleton */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-slate-200 animate-pulse flex-shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <div className="h-5 w-24 bg-slate-200 rounded animate-pulse" />
              <div className="h-5 w-48 bg-slate-200 rounded animate-pulse" />
              <div className="h-5 w-16 bg-slate-100 rounded-full animate-pulse" />
            </div>
            <div className="h-3 w-72 bg-slate-100 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Cards or Table Skeleton */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between overflow-hidden animate-pulse"
            >
              {/* Top Banner */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-24 bg-slate-200 rounded" />
                    <div className="h-5 w-20 bg-slate-100 rounded" />
                  </div>
                  <div className="h-6 w-32 bg-slate-100 rounded-md" />
                </div>

                {/* Title */}
                <div className="space-y-2 pt-1">
                  <div className="h-5 bg-slate-200 rounded w-11/12" />
                  <div className="h-5 bg-slate-200 rounded w-3/4" />
                </div>

                {/* Scope */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-2">
                  <div className="h-3.5 bg-slate-200 rounded w-1/3" />
                  <div className="h-3 bg-slate-100 rounded w-full" />
                  <div className="h-3 bg-slate-100 rounded w-4/5" />
                </div>

                {/* Meta Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-slate-200 rounded-full flex-shrink-0" />
                    <div className="h-3.5 bg-slate-100 rounded w-32" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-slate-200 rounded-full flex-shrink-0" />
                    <div className="h-3.5 bg-slate-100 rounded w-28" />
                  </div>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="h-3 bg-slate-100 rounded w-20" />
                  <div className="h-4 bg-slate-200 rounded w-32" />
                </div>
                <div className="h-8 w-28 bg-slate-200 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table Skeleton */
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs animate-pulse">
          <div className="h-12 bg-slate-100 border-b border-slate-200" />
          {Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              className="p-4 border-b border-slate-100 flex items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-slate-200 rounded w-1/4" />
                <div className="h-4 bg-slate-100 rounded w-2/3" />
              </div>
              <div className="h-4 bg-slate-100 rounded w-24" />
              <div className="h-4 bg-slate-100 rounded w-32" />
              <div className="h-8 bg-slate-200 rounded w-24" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
