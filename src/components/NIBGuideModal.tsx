import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Cpu, 
  Building2, 
  Truck, 
  Wrench, 
  Trees, 
  Layers, 
  CheckCircle2, 
  HelpCircle,
  ExternalLink,
  Search,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { NIBCategory } from '../types/tender';

interface NIBGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: NIBCategory) => void;
}

export const NIBGuideModal: React.FC<NIBGuideModalProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
}) => {
  const [selectedCheckerCategory, setSelectedCheckerCategory] = useState<NIBCategory>('IT');

  if (!isOpen) return null;

  const nibClassifications = [
    {
      category: 'IT' as NIBCategory,
      name: 'Teknologi Informasi & Digital',
      icon: <Cpu className="w-5 h-5 text-sky-600" />,
      kbliCodes: 'KBLI 62019, 62020, 62090, 61999, 63111',
      examples: 'Pengembangan software ERP/web, pemeliharaan controller jaringan (Ruckus/Cisco), tata kelola data & master data management, cyber security, IoT conveyor monitoring.',
      ptbaCode: 'TI.01 s/d TI.05',
      qualifications: 'Menengah s/d Besar',
      accent: 'border-sky-200 bg-sky-50/40 text-sky-900'
    },
    {
      category: 'Sipil' as NIBCategory,
      name: 'Konstruksi & Sipil Pertambangan',
      icon: <Building2 className="w-5 h-5 text-emerald-600" />,
      kbliCodes: 'KBLI 42911, 42912, 42101, 41011, 43120',
      examples: 'Pembangunan jembatan timbang tambang 120 ton, rigid pavement jalan hauling, perkuatan dinding kolam lumpur (sediment pond), drainase tambang, konstruksi workshop.',
      ptbaCode: 'SP.01 s/d SP.08',
      qualifications: 'Kecil, Menengah, Besar (Wajib SBU Konstruksi)',
      accent: 'border-emerald-200 bg-emerald-50/40 text-emerald-900'
    },
    {
      category: 'Jasa' as NIBCategory,
      name: 'Jasa Umum, Logistik & Penunjang',
      icon: <Truck className="w-5 h-5 text-amber-600" />,
      kbliCodes: 'KBLI 49230, 77100, 80100, 52291, 56210',
      examples: 'Angkutan batubara armada tronton dari ROM ke dermaga tongkang, sewa kendaraan ambulans & driver medis, jasa pengamanan Pam Obvitnas, catering karyawan tambang.',
      ptbaCode: 'SB.09, JS.01, JS.04',
      qualifications: 'Kecil s/d Besar (Sesuai paket)',
      accent: 'border-amber-200 bg-amber-50/40 text-amber-900'
    },
    {
      category: 'Mekanikal' as NIBCategory,
      name: 'Mekanikal, Elektrikal & Fabrikasi',
      icon: <Wrench className="w-5 h-5 text-violet-600" />,
      kbliCodes: 'KBLI 33121, 25111, 33111, 28111, 43211',
      examples: 'Overhaul transmisi dan major components alat berat CAT, fabrikasi chute transfer staker reclaimer pelabuhan, penggantian wear plate hardox, pemeliharaan genset & PLTU.',
      ptbaCode: 'GB.04, GB.07',
      qualifications: 'Menengah s/d Besar',
      accent: 'border-violet-200 bg-violet-50/40 text-violet-900'
    },
    {
      category: 'Lingkungan' as NIBCategory,
      name: 'Lingkungan Hidup & Reklamasi Pascatambang',
      icon: <Trees className="w-5 h-5 text-teal-600" />,
      kbliCodes: 'KBLI 01199, 39000, 71200',
      examples: 'Pengadaan benih dan bibit pohon revegetasi, cocomesh penahan erosi lereng disposal, pengujian baku mutu air tambang, revegetasi areal hutan pinjam pakai.',
      ptbaCode: 'JS.08',
      qualifications: 'Kecil & Menengah',
      accent: 'border-teal-200 bg-teal-50/40 text-teal-900'
    },
    {
      category: 'Lainnya' as NIBCategory,
      name: 'Bahan Kimia & Perlengkapan Khusus',
      icon: <Layers className="w-5 h-5 text-stone-600" />,
      kbliCodes: 'KBLI 20119, 46691, 46590',
      examples: 'Bahan kimia penetral air asam tambang (PAC, kapur tohor, polimer), pengadaan alat keselamatan K3, instrumen laboratorium geologi.',
      ptbaCode: 'BK.01, BK.02',
      qualifications: 'Menengah & Besar',
      accent: 'border-stone-200 bg-stone-50/40 text-stone-900'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        id="nib-guide-modal"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Panduan Klasifikasi NIB & KBLI di Spend Bukit Asam
              </h2>
              <p className="text-xs text-slate-400">
                Memahami pemetaan izin usaha Nomor Induk Berusaha (OSS RBA) terhadap lelang PT Bukit Asam Tbk
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* Intro Box */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-950 flex items-start gap-3 leading-relaxed">
            <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Ketentuan Verifikasi NIB pada Portal SPEND PTBA:</p>
              <p className="text-slate-700 text-xs leading-relaxed">
                Setiap calon rekanan / vendor PT Bukit Asam Tbk diwajibkan mendaftarkan Nomor Induk Berusaha (NIB) berbasis risiko melalui portal <strong className="text-slate-900">https://spend.bukitasam.co.id</strong>. Panitia pengadaan akan memverifikasi kesesuaian 5 digit kode KBLI pada NIB Anda dengan kualifikasi paket lelang yang diikuti.
              </p>
            </div>
          </div>

          {/* NIB Category Cards Grid */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center justify-between">
              <span>Direktori Bidang NIB & Contoh KBLI yang Diakui:</span>
              <span className="text-xs font-normal text-slate-500 lowercase">Klik bidang untuk filter proyek</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-3.5">
              {nibClassifications.map((item) => (
                <div
                  key={item.category}
                  onClick={() => {
                    onSelectCategory(item.category);
                    onClose();
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer hover:shadow-md ${item.accent} group`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-white shadow-xs">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 group-hover:text-amber-700 transition-colors">
                          {item.name}
                        </h4>
                        <span className="font-mono text-[11px] font-semibold text-slate-600">
                          {item.kbliCodes}
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-slate-200 font-medium text-slate-700">
                      {item.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                    {item.examples}
                  </p>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Klasifikasi PTBA: <strong>{item.ptbaCode}</strong></span>
                    <span className="text-amber-700 font-semibold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Filter Proyek Ini <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick NIB Eligibility Simulator */}
          <div className="bg-slate-900 text-white rounded-xl p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-2 text-amber-400">
              <Sparkles className="w-4 h-4" />
              <h3 className="font-bold text-sm">Cek Kesesuaian NIB Perusahaan Anda</h3>
            </div>
            <p className="text-xs text-slate-300 mb-4">
              Pilih bidang perizinan NIB utama perusahaan Anda untuk melihat langsung lelang terbuka yang cocok:
            </p>

            <div className="flex flex-wrap gap-2">
              {(['IT', 'Sipil', 'Jasa', 'Mekanikal', 'Lingkungan', 'Lainnya'] as NIBCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    onSelectCategory(cat);
                    onClose();
                  }}
                  className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 border border-slate-700 transition-all flex items-center gap-1.5"
                >
                  <span>Cari Proyek {cat}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <a
            href="https://spend.bukitasam.co.id/web/index/lelang"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-sky-700 hover:text-sky-900 font-medium inline-flex items-center gap-1"
          >
            <span>Petunjuk Pendaftaran Rekanan di SPEND PTBA</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-colors"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
