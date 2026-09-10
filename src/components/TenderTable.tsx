import React from 'react';
import { ExternalLink, ArrowRight, Tag, Clock, MapPin, Copy, Check, Calendar, AlertTriangle } from 'lucide-react';
import { TenderItem } from '../types/tender';
import { NIB_CATEGORY_CONFIG } from '../data/tenders';
import { formatTenderDate, getDaysRemaining } from '../utils/dateUtils';

interface TenderTableProps {
  tenders: TenderItem[];
  onSelectTender: (tender: TenderItem) => void;
}

export const TenderTable: React.FC<TenderTableProps> = ({ tenders, onSelectTender }) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopySPPH = (spph: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(spph);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200 font-medium';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white text-xs font-semibold uppercase tracking-wider">
              <th className="py-3.5 px-4">Kategori & Tahap</th>
              <th className="py-3.5 px-4">Nomor SPPH & Judul Pengadaan</th>
              <th className="py-3.5 px-4">KBLI & Klasifikasi PTBA</th>
              <th className="py-3.5 px-4">Unit / Lokasi</th>
              <th className="py-3.5 px-4">Tgl Pembukaan</th>
              <th className="py-3.5 px-4">Tgl Penutupan</th>
              <th className="py-3.5 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {tenders.map((tender) => {
              const catConfig = NIB_CATEGORY_CONFIG[tender.nib.category] || NIB_CATEGORY_CONFIG.Lainnya;
              const daysRemaining = getDaysRemaining(tender.closingDate);

              return (
                <tr 
                  key={tender.id}
                  onClick={() => onSelectTender(tender)}
                  className={`hover:bg-slate-50/80 transition-colors cursor-pointer group ${
                    daysRemaining <= 3 ? 'bg-rose-50/30' : ''
                  }`}
                >
                  {/* Category & Tahap */}
                  <td className="py-4 px-4 whitespace-nowrap align-top">
                    <div className="space-y-1.5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] border ${getStatusBadge(tender.status)}`}>
                        {tender.status}
                      </span>
                      <div>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold border ${catConfig.badgeClass}`}>
                          <Tag className="w-3 h-3" />
                          <span>{tender.nib.category}</span>
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {tender.nib.requiredQualifications.join(', ')}
                      </div>
                    </div>
                  </td>

                  {/* SPPH & Title */}
                  <td className="py-4 px-4 align-top max-w-sm">
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500 mb-1">
                      <span className="font-semibold">{tender.spphNumber}</span>
                      <button
                        onClick={(e) => handleCopySPPH(tender.spphNumber, tender.id, e)}
                        className="text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
                        title="Salin Nomor SPPH"
                      >
                        {copiedId === tender.id ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                    <div className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors text-sm line-clamp-2">
                      {tender.title}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Metode: {tender.method}
                    </div>
                  </td>

                  {/* KBLI & Klasifikasi PTBA */}
                  <td className="py-4 px-4 align-top">
                    <div className="font-mono font-semibold text-slate-800 text-[11px]">
                      KBLI {tender.nib.kbliCode}
                    </div>
                    <div className="text-[11px] text-amber-800 font-medium truncate max-w-[180px]" title={tender.nib.ptbaClassification}>
                      {tender.nib.ptbaClassification}
                    </div>
                    <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5" title={tender.nib.kbliTitle}>
                      {tender.nib.kbliTitle}
                    </div>
                  </td>

                  {/* Unit & Lokasi */}
                  <td className="py-4 px-4 align-top whitespace-nowrap">
                    <div className="font-medium text-slate-900 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{tender.location}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {tender.unitKerja}
                    </div>
                  </td>

                  {/* TANGGAL PEMBUKAAN */}
                  <td className="py-4 px-4 align-top whitespace-nowrap">
                    <div className="flex items-center gap-1 text-slate-700 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-sky-600" />
                      <span>{formatTenderDate(tender.publishDate)}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Pembukaan</span>
                  </td>

                  {/* TANGGAL PENUTUPAN & SISA WAKTU */}
                  <td className="py-4 px-4 align-top whitespace-nowrap">
                    <div className={`font-bold flex items-center gap-1 ${
                      daysRemaining <= 3 ? 'text-rose-700' : 'text-slate-900'
                    }`}>
                      <Clock className={`w-3.5 h-3.5 ${daysRemaining <= 3 ? 'text-rose-600' : 'text-amber-600'}`} />
                      <span>{formatTenderDate(tender.closingDate, true)}</span>
                    </div>
                    <div className="mt-1">
                      {daysRemaining > 0 ? (
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          daysRemaining <= 3
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : daysRemaining <= 7
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}>
                          {daysRemaining <= 3 && <AlertTriangle className="w-2.5 h-2.5 text-rose-600" />}
                          {daysRemaining <= 3 ? `Kritis: Sisa ${daysRemaining} Hari` : `Sisa ${daysRemaining} Hari`}
                        </span>
                      ) : (
                        <span className="text-[10px] text-rose-600 font-bold">Ditutup</span>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 align-top text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectTender(tender);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-[11px] inline-flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>Detail</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      <a
                        href={tender.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
                        title="Buka di SPEND PTBA"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
