import React from 'react';
import { 
  UserCheck, 
  Send, 
  HelpCircle, 
  Award, 
  Clock, 
  AlertTriangle, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { TenderItem, TenderStatus } from '../types/tender';
import { TenderCard } from './TenderCard';
import { TenderTable } from './TenderTable';
import { getDaysRemaining } from '../utils/dateUtils';

export interface StageGroupConfig {
  id: string;
  stageName: TenderStatus | 'Evaluasi';
  stageNumber: number;
  title: string;
  subtitle: string;
  badgeClass: string;
  headerBorder: string;
  iconBg: string;
  iconColor: string;
}

interface TenderGroupSectionProps {
  config: StageGroupConfig;
  tenders: TenderItem[];
  viewMode: 'grid' | 'table';
  onSelectTender: (tender: TenderItem) => void;
}

export const TenderGroupSection: React.FC<TenderGroupSectionProps> = ({
  config,
  tenders,
  viewMode,
  onSelectTender,
}) => {
  if (tenders.length === 0) return null;

  // Count items with < 3 days in this group
  const criticalCount = tenders.filter((t) => getDaysRemaining(t.closingDate) <= 3).length;
  const approachingCount = tenders.filter((t) => {
    const d = getDaysRemaining(t.closingDate);
    return d > 3 && d <= 7;
  }).length;

  const getStageIcon = () => {
    switch (config.stageName) {
      case 'Pendaftaran':
        return <UserCheck className="w-5 h-5 text-emerald-700" />;
      case 'Pemasukan Penawaran':
        return <Send className="w-5 h-5 text-amber-700" />;
      case 'Aanwijzing':
        return <HelpCircle className="w-5 h-5 text-sky-700" />;
      case 'Evaluasi':
      default:
        return <Award className="w-5 h-5 text-purple-700" />;
    }
  };

  return (
    <section className="mb-10 last:mb-4" id={`group-section-${config.id}`}>
      {/* Group Header Banner */}
      <div className={`bg-white rounded-xl border p-4 sm:p-5 shadow-xs mb-4 ${config.headerBorder}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Left: Icon, Number, Title & Subtitle */}
          <div className="flex items-start gap-3.5">
            <div className={`p-2.5 rounded-xl ${config.iconBg} flex-shrink-0 mt-0.5 border border-slate-200/50`}>
              {getStageIcon()}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold border uppercase tracking-wider ${config.badgeClass}`}>
                  Tahap {config.stageNumber} • {config.stageName}
                </span>

                <span className="font-bold text-slate-900 text-sm sm:text-base">
                  {config.title}
                </span>

                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  {tenders.length} Paket
                </span>
              </div>

              <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
                {config.subtitle}
              </p>
            </div>
          </div>

          {/* Right: Urgency Indicators for this group */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            {criticalCount > 0 && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold animate-pulse">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                <span>{criticalCount} Paket Segera Ditutup (&lt; 3 Hari)</span>
              </span>
            )}

            {approachingCount > 0 && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>{approachingCount} Paket (3–7 Hari)</span>
              </span>
            )}

            <span className="text-[11px] text-slate-400 font-medium">
              Diurutkan: Penutupan Terdekat
            </span>
          </div>
        </div>
      </div>

      {/* Tender Items Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {tenders.map((tender) => (
            <TenderCard
              key={tender.id}
              tender={tender}
              onSelectTender={onSelectTender}
            />
          ))}
        </div>
      ) : (
        <TenderTable
          tenders={tenders}
          onSelectTender={onSelectTender}
        />
      )}
    </section>
  );
};
