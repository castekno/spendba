import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Tag, 
  ExternalLink, 
  Copy, 
  Check, 
  ArrowRight,
  Building,
  AlertTriangle,
  CalendarRange
} from 'lucide-react';
import { TenderItem } from '../types/tender';
import { NIB_CATEGORY_CONFIG } from '../data/tenders';
import { formatTenderDate, getDaysRemaining } from '../utils/dateUtils';

interface TenderCardProps {
  tender: TenderItem;
  onSelectTender: (tender: TenderItem) => void;
}

export const TenderCard: React.FC<TenderCardProps> = ({ tender, onSelectTender }) => {
  const [copied, setCopied] = useState(false);
  const categoryConfig = NIB_CATEGORY_CONFIG[tender.nib.category] || NIB_CATEGORY_CONFIG.Lainnya;

  const handleCopySPPH = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(tender.spphNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const daysRemaining = getDaysRemaining(tender.closingDate);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pendaftaran':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold';
      case 'Pemasukan Penawaran':
        return 'bg-amber-100 text-amber-900 border-amber-300 font-bold';
      case 'Aanwijzing':
        return 'bg-sky-100 text-sky-800 border-sky-300 font-bold';
      case 'Evaluasi':
        return 'bg-purple-100 text-purple-800 border-purple-300 font-bold';
      case 'Pengumuman Pemenang':
        return 'bg-slate-100 text-slate-700 border-slate-300 font-bold';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div 
      className={`group bg-white rounded-xl border shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden ${
        daysRemaining <= 3 
          ? 'border-rose-300 hover:border-rose-400' 
          : daysRemaining <= 7
          ? 'border-amber-200/90 hover:border-amber-300'
          : 'border-slate-200/90 hover:border-slate-300'
      }`}
      id={`tender-card-${tender.id}`}
    >
      {/* Top Banner: Category & SPPH */}
      <div className="p-4 sm:p-5 pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          {/* Stage & NIB Badges */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] border ${getStatusBadge(tender.status)}`}>
              {tender.status}
            </span>
            <span 
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold border ${categoryConfig.badgeClass}`}
              title={`Bidang: ${categoryConfig.label}`}
            >
              <Tag className="w-3 h-3" />
              <span>{tender.nib.category}</span>
            </span>
          </div>

          {/* SPPH Number with Copy Button */}
          <div className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/80 px-2 py-1 rounded-md text-xs font-mono text-slate-700 transition-colors">
            <span className="font-medium truncate max-w-[150px] sm:max-w-[190px]" title={tender.spphNumber}>
              {tender.spphNumber}
            </span>
            <button
              onClick={handleCopySPPH}
              className="text-slate-400 hover:text-slate-700 transition-colors p-0.5 cursor-pointer"
              title="Salin Nomor SPPH"
              id={`copy-spph-${tender.id}`}
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Tender Title */}
        <h3 
          onClick={() => onSelectTender(tender)}
          className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug cursor-pointer mb-2.5"
        >
          {tender.title}
        </h3>

        {/* Location & Unit Kerja */}
        <div className="flex flex-wrap items-center gap-y-1.5 gap-x-3 text-xs text-slate-500 mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{tender.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Building className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{tender.unitKerja}</span>
          </div>
        </div>

        {/* PROMINENT JADWAL PENGADAAN (TANGGAL PEMBUKAAN & PENUTUPAN) */}
        <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/90 mb-3 space-y-2">
          <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-200/60">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <CalendarRange className="w-3.5 h-3.5 text-amber-600" />
              Jadwal Lelang
            </span>

            {/* Countdown Badge */}
            {daysRemaining > 0 ? (
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                daysRemaining <= 3
                  ? 'bg-rose-100 text-rose-800 border border-rose-200 animate-pulse'
                  : daysRemaining <= 7
                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}>
                {daysRemaining <= 3 && <AlertTriangle className="w-3 h-3 text-rose-600" />}
                {daysRemaining <= 3 ? `Kritis: Sisa ${daysRemaining} Hari!` : `Sisa ${daysRemaining} Hari`}
              </span>
            ) : daysRemaining === 0 ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-600 text-white animate-pulse">
                Hari Terakhir!
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-200 text-slate-600">
                Telah Ditutup
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* Tanggal Pembukaan */}
            <div className="bg-white p-2 rounded-md border border-slate-200/70">
              <div className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                <Calendar className="w-3 h-3 text-sky-600" />
                Tanggal Pembukaan
              </div>
              <div className="font-bold text-slate-900 mt-1">
                {formatTenderDate(tender.publishDate)}
              </div>
            </div>

            {/* Tanggal Penutupan */}
            <div className={`bg-white p-2 rounded-md border ${
              daysRemaining <= 3 ? 'border-rose-200 bg-rose-50/40' : 'border-slate-200/70'
            }`}>
              <div className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                <Clock className={`w-3 h-3 ${daysRemaining <= 3 ? 'text-rose-600' : 'text-amber-600'}`} />
                Tanggal Penutupan
              </div>
              <div className={`font-bold mt-1 ${daysRemaining <= 3 ? 'text-rose-700' : 'text-slate-900'}`}>
                {formatTenderDate(tender.closingDate, true)}
              </div>
            </div>
          </div>
        </div>

        {/* Specific NIB Requirement Box */}
        <div className="bg-slate-50/70 rounded-lg p-2.5 border border-slate-200/60 mb-2.5 text-xs space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <span className="text-slate-500 font-medium">KBLI NIB:</span>
            <span className="font-mono font-semibold text-slate-800 text-right">
              {tender.nib.kbliCode}
            </span>
          </div>
          <div className="flex items-start justify-between gap-2">
            <span className="text-slate-500 font-medium">Klasifikasi:</span>
            <span className="font-semibold text-amber-800 text-right truncate max-w-[190px]">
              {tender.nib.ptbaClassification}
            </span>
          </div>
        </div>

        {/* Brief Scope Summary */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {tender.scopeOfWork}
        </p>
      </div>

      {/* Card Footer: Action Buttons */}
      <div className="px-4 sm:px-5 py-3 bg-slate-50/70 border-t border-slate-100">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onSelectTender(tender)}
            id={`btn-detail-${tender.id}`}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors active:scale-98 shadow-xs cursor-pointer"
          >
            <span>Detail & NIB</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <a
            href={tender.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            id={`btn-portal-${tender.id}`}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold transition-colors text-center"
            title="Buka pengumuman lelang resmi di Spend Bukit Asam"
          >
            <span>Buka di SPEND</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        </div>
      </div>
    </div>
  );
};
