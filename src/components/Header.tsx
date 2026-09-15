import React from 'react';
import { 
  ExternalLink, 
  ShieldCheck, 
  RefreshCw, 
  FileText, 
  AlertTriangle, 
  Clock, 
  CalendarCheck,
  Server
} from 'lucide-react';
import { TenderTimeStats } from '../types/tender';

interface HeaderProps {
  timeStats: TenderTimeStats;
  selectedDeadlineFilter?: string;
  onSelectDeadlineFilter?: (filter: 'all' | 'under3Days' | '3to7Days' | 'over7Days') => void;
  onOpenNIBGuide: () => void;
  onOpenGateway?: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  lastUpdated: string;
}

export const Header: React.FC<HeaderProps> = ({
  timeStats,
  selectedDeadlineFilter = 'all',
  onSelectDeadlineFilter,
  onOpenNIBGuide,
  onOpenGateway,
  onRefresh,
  isRefreshing,
  lastUpdated,
}) => {
  return (
    <header className="relative bg-gradient-to-r from-slate-900 via-[#0B2545] to-slate-900 text-white shadow-xl border-b border-slate-800">
      {/* Top Notification Bar */}
      <div className="bg-slate-950/60 border-b border-white/5 py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-4 text-slate-300">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2.5">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-medium border border-emerald-500/30 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Portal Terbuka
              </span>
            </div>
            <span className="hidden sm:inline text-slate-500">|</span>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] text-slate-400">
              <span>Sinkronisasi: {lastUpdated}</span>
              <button
                onClick={onRefresh}
                id="header-refresh-btn"
                title="Perbarui status lelang"
                disabled={isRefreshing}
                className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>{isRefreshing ? 'Memuat...' : 'Muat Ulang'}</span>
              </button>
              {onOpenGateway && (
                <button
                  onClick={onOpenGateway}
                  id="header-gateway-btn"
                  title="Status & Pengaturan Jembatan Gateway"
                  className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  <Server className="w-3 h-3" />
                  <span>Gateway</span>
                </button>
              )}
              <a
                href="https://spend.bukitasam.co.id/web/index/lelang"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-sky-400 hover:text-sky-300 hover:underline"
                title="Buka situs resmi SPEND PTBA"
              >
                <span>spend.bukitasam.co.id</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-7">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Logo & Main Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-amber-400">
                    CST
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                    Spend Bukit Asam
                  </h1>
                  <span className="hidden sm:inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/25">
                    e-Procurement
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-medium">
                  Monitoring Lelang & Tahapan Pengadaan PTBA
                </p>
              </div>
            </div>

          </div>

          {/* Action CTAs: Only View Data actions */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <button
              onClick={onOpenNIBGuide}
              id="nib-guide-btn"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/90 text-slate-200 hover:text-white border border-slate-700 text-xs sm:text-sm font-medium transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Syarat NIB PTBA</span>
            </button>

            
          </div>
        </div>

        {/* TIME URGENCY INFO CARDS: Width hugs longest text, compact & not overly wide */}
        <div className="mt-5 pt-4 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Card 1: Total Lelang Aktif */}
            <div 
              onClick={() => onSelectDeadlineFilter && onSelectDeadlineFilter('all')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer border w-fit inline-flex items-center gap-3 flex-shrink-0 ${
                selectedDeadlineFilter === 'all'
                  ? 'bg-slate-800/95 border-amber-500 ring-2 ring-amber-500/30'
                  : 'bg-slate-800/60 hover:bg-slate-800/90 border-slate-700/70'
              }`}
              title="Klik untuk melihat semua lelang"
            >
              <div className="w-7 h-7 rounded-lg bg-slate-700/80 text-slate-300 flex items-center justify-center flex-shrink-0">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <div className="leading-tight">
                <div className="text-[11px] font-semibold text-slate-300 whitespace-nowrap">
                  Total Paket Aktif
                </div>
                <div className="text-base font-black text-white whitespace-nowrap">
                  {timeStats.total} <span className="text-[11px] font-medium text-slate-400">Paket</span>
                </div>
              </div>
            </div>

            {/* Card 2: Kritis < 3 Hari */}
            <div 
              onClick={() => onSelectDeadlineFilter && onSelectDeadlineFilter('under3Days')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer border w-fit inline-flex items-center gap-3 flex-shrink-0 ${
                selectedDeadlineFilter === 'under3Days'
                  ? 'bg-rose-950/90 border-rose-500 ring-2 ring-rose-500/40'
                  : 'bg-rose-950/40 hover:bg-rose-950/70 border-rose-700/60'
              }`}
              title="Klik untuk menyaring lelang dengan sisa waktu < 3 hari"
            >
              <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center flex-shrink-0 border border-rose-500/30">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
              <div className="leading-tight">
                <div className="text-[11px] font-bold text-rose-300 flex items-center gap-1.5 whitespace-nowrap">
                  <span>Kritis &lt; 3 Hari</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
                </div>
                <div className="text-base font-black text-rose-400 whitespace-nowrap">
                  {timeStats.under3Days} <span className="text-[11px] font-medium text-rose-300/80">Paket</span>
                </div>
              </div>
            </div>

            {/* Card 3: Mendekati (3 - 7 Hari) */}
            <div 
              onClick={() => onSelectDeadlineFilter && onSelectDeadlineFilter('3to7Days')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer border w-fit inline-flex items-center gap-3 flex-shrink-0 ${
                selectedDeadlineFilter === '3to7Days'
                  ? 'bg-amber-950/90 border-amber-500 ring-2 ring-amber-500/40'
                  : 'bg-amber-950/40 hover:bg-amber-950/70 border-amber-700/60'
              }`}
              title="Klik untuk menyaring lelang dengan sisa waktu 3-7 hari"
            >
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 border border-amber-500/30">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <div className="leading-tight">
                <div className="text-[11px] font-bold text-amber-300 whitespace-nowrap">
                  Mendekati (3–7 Hari)
                </div>
                <div className="text-base font-black text-amber-400 whitespace-nowrap">
                  {timeStats.approaching} <span className="text-[11px] font-medium text-amber-300/80">Paket</span>
                </div>
              </div>
            </div>

            {/* Card 4: Waktu Longgar (> 7 Hari) */}
            <div 
              onClick={() => onSelectDeadlineFilter && onSelectDeadlineFilter('over7Days')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer border w-fit inline-flex items-center gap-3 flex-shrink-0 ${
                selectedDeadlineFilter === 'over7Days'
                  ? 'bg-emerald-950/90 border-emerald-500 ring-2 ring-emerald-500/40'
                  : 'bg-emerald-950/40 hover:bg-emerald-950/70 border-emerald-700/60'
              }`}
              title="Klik untuk menyaring lelang dengan sisa waktu > 7 hari"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-500/30">
                <CalendarCheck className="w-3.5 h-3.5" />
              </div>
              <div className="leading-tight">
                <div className="text-[11px] font-bold text-emerald-300 whitespace-nowrap">
                  Waktu Longgar (&gt; 7 Hari)
                </div>
                <div className="text-base font-black text-emerald-400 whitespace-nowrap">
                  {timeStats.relaxed} <span className="text-[11px] font-medium text-emerald-300/80">Paket</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
