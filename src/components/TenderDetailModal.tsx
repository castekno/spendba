import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Copy, 
  Check, 
  Calendar, 
  Clock, 
  Building2, 
  ShieldCheck, 
  FileText, 
  AlertTriangle, 
  Briefcase, 
  Mail, 
  Tag, 
  MapPin,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { TenderItem } from '../types/tender';
import { NIB_CATEGORY_CONFIG } from '../data/tenders';

interface TenderDetailModalProps {
  tender: TenderItem | null;
  onClose: () => void;
}

export const TenderDetailModal: React.FC<TenderDetailModalProps> = ({ tender, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  if (!tender) return null;

  const categoryConfig = (tender?.nib?.category && NIB_CATEGORY_CONFIG[tender.nib.category]) || NIB_CATEGORY_CONFIG.Lainnya;

  const handleCopySPPH = () => {
    navigator.clipboard.writeText(tender.spphNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const text = `Pengadaan PT Bukit Asam Tbk: ${tender.title} (SPPH: ${tender.spphNumber}). Syarat NIB KBLI: ${tender.nib.kbliCode}. Selengkapnya di: ${tender.externalLink}`;
    if (navigator.share) {
      navigator.share({
        title: `Lelang PTBA: ${tender.title}`,
        text: text,
        url: tender.externalLink,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        id="tender-detail-modal"
      >
        {/* Modal Top Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 border-b border-slate-800 relative">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${categoryConfig.badgeClass}`}>
                  <Tag className="w-3.5 h-3.5" />
                  <span>Kategori NIB: {tender.nib.category}</span>
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-medium">
                  {tender.spphNumber}
                </span>

                <button
                  onClick={handleCopySPPH}
                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Salin Nomor SPPH"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                {tender.title}
              </h2>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {tender.location}
                </span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-amber-400" />
                  {tender.unitKerja}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              id="close-modal-btn"
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
              title="Tutup (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-slate-700 text-sm">
          {/* Key Tender Parameters Box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div>
              <div className="text-[11px] text-slate-500 font-medium">Metode Pengadaan</div>
              <div className="font-semibold text-slate-900 text-xs sm:text-sm mt-0.5">{tender.method}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500 font-medium">Status Pengadaan</div>
              <div className="font-semibold text-emerald-700 text-xs sm:text-sm mt-0.5 inline-flex items-center gap-1.5">
                {tender.status === 'Prakualifikasi' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                )}
                {tender.status}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500 font-medium">Tanggal Pembukaan</div>
              <div className="font-semibold text-slate-900 text-xs sm:text-sm mt-0.5">{tender.publishDate}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500 font-medium">Batas Akhir (Penutupan)</div>
              <div className="font-semibold text-rose-700 text-xs sm:text-sm mt-0.5">{tender.closingDate} WIB</div>
            </div>
          </div>

          {/* CRITICAL NIB & KBLI REQUIREMENTS SECTION */}
          <div className="border border-sky-200 bg-sky-50/50 rounded-xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-sky-100 pb-3">
              <ShieldCheck className="w-5 h-5 text-sky-700" />
              <div>
                <h3 className="text-sm font-bold text-sky-950 uppercase tracking-wide">
                  Persyaratan NIB & Klasifikasi Bidang Usaha
                </h3>
                <p className="text-xs text-sky-800">
                  Perusahaan peserta wajib memiliki Nomor Induk Berusaha (NIB) dengan kode KBLI berikut terdaftar di Spend Bukit Asam.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white p-3.5 rounded-lg border border-sky-100 space-y-1">
                <span className="text-xs text-slate-500 font-medium">Kode KBLI Terkait:</span>
                <div className="font-mono font-bold text-sky-900 text-base">
                  KBLI {tender.nib.kbliCode}
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  {tender.nib.kbliTitle}
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-lg border border-sky-100 space-y-1">
                <span className="text-xs text-slate-500 font-medium">Klasifikasi Rekanan PTBA:</span>
                <div className="font-bold text-amber-800 text-sm">
                  {tender.nib.ptbaClassification}
                </div>
                <div className="text-xs text-slate-600 pt-1">
                  Kualifikasi Skala Usaha: <strong className="text-slate-900">{tender.nib.requiredQualifications.join(' / ')}</strong>
                </div>
              </div>
            </div>

            {tender.nib.specialRequirements && tender.nib.specialRequirements.length > 0 && (
              <div className="pt-2">
                <div className="text-xs font-semibold text-slate-800 mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Kualifikasi Teknis Khusus & Sertifikasi:</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {tender.nib.specialRequirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Scope of Work */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-slate-700" />
              <span>Ruang Lingkup Pekerjaan:</span>
            </h4>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {tender.scopeOfWork}
            </div>
          </div>

          {/* Document Requirements */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-700" />
              <span>Dokumen Prakualifikasi / Penawaran yang Diunggah:</span>
            </h4>
            <div className="grid sm:grid-cols-2 gap-2 text-xs">
              {tender.documentRequirements.map((doc, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-800 flex items-center justify-center font-bold text-[11px] flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-slate-700">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Person & Notice */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-amber-950">Unit Penanggung Jawab Pengadaan:</span>
              <p className="text-amber-900">{tender.contactPerson?.division || 'Divisi Pengadaan Barang & Jasa PTBA'}</p>
              <p className="text-amber-800 font-mono">{tender.contactPerson?.email || 'procurement@bukitasam.co.id'}</p>
            </div>

            <div className="text-[11px] text-amber-800/90 sm:text-right max-w-xs">
              Pendaftaran resmi, sanggahan, dan unduh dokumen RKS hanya dilayani melalui portal Spend Bukit Asam.
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
              title="Bagikan informasi lelang ini"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{shareSuccess ? 'Tersalin!' : 'Bagikan'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2.5 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold transition-colors"
            >
              Tutup
            </button>

            <a
              href={tender.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 transition-all"
            >
              <span>Akses di Spend PTBA</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
