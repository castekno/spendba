import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { TenderDetailModal } from './components/TenderDetailModal';
import { NIBGuideModal } from './components/NIBGuideModal';
import { TenderGroupSection, StageGroupConfig } from './components/TenderGroupSection';
import { INITIAL_TENDERS } from './data/tenders';
import { fetchTendersData } from './services/tenderClient';
import { TenderItem, FilterState, NIBCategory, TenderTimeStats, TenderStatus } from './types/tender';
import { parseTenderDate, getDaysRemaining } from './utils/dateUtils';
import { 
  AlertCircle, 
  ExternalLink, 
  ShieldCheck, 
  Building, 
  Mail,
  FileCheck2,
  ChevronRight,
  Clock,
  X,
  AlertTriangle
} from 'lucide-react';

export default function App() {
  const [tenders, setTenders] = useState<TenderItem[]>(INITIAL_TENDERS);
  const [selectedTender, setSelectedTender] = useState<TenderItem | null>(null);
  const [isNIBGuideOpen, setIsNIBGuideOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>(() => {
    const now = new Date();
    return `Hari ini, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;
  });
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const loadTenders = async (force = false) => {
    setIsRefreshing(true);
    try {
      const res = await fetchTendersData(force);
      setTenders(res.tenders);
      setLastUpdated(res.isLive ? `${res.timestamp} (${res.source})` : res.timestamp);
    } catch (err) {
      console.warn('Gagal memuat data live:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Muat ulang dan sinkronisasi data lelang otomatis setiap kali aplikasi dibuka atau browser di-refresh
  useEffect(() => {
    loadTenders(false);
  }, []);

  const [filter, setFilter] = useState<FilterState>({
    search: '',
    nibCategory: 'Semua',
    status: 'Semua',
    unitKerja: 'Semua Lokasi',
    qualification: 'Semua',
    sortBy: 'latest',
    deadlineFilter: 'all',
  });

  // Calculate real-time counts per NIB Category (for filter bar)
  const categoryCounts = useMemo(() => {
    const counts: Record<NIBCategory | 'Semua', number> = {
      Semua: tenders.length,
      IT: 0,
      Sipil: 0,
      Jasa: 0,
      Mekanikal: 0,
      Lingkungan: 0,
      Lainnya: 0,
    };

    tenders.forEach((item) => {
      const cat = item.nib.category;
      if (cat in counts) {
        counts[cat] = (counts[cat] || 0) + 1;
      } else {
        counts.Lainnya = (counts.Lainnya || 0) + 1;
      }
    });

    return counts;
  }, [tenders]);

  // Calculate real-time deadline urgency & status breakdown for Header
  const timeStats = useMemo<TenderTimeStats>(() => {
    let under3Days = 0;
    let approaching = 0;
    let relaxed = 0;
    let prakualifikasiCount = 0;
    let ditutupCount = 0;

    tenders.forEach((item) => {
      const days = getDaysRemaining(item.closingDate);
      if (days <= 3) {
        under3Days++;
      } else if (days <= 7) {
        approaching++;
      } else {
        relaxed++;
      }

      if (item.status === 'Prakualifikasi') {
        prakualifikasiCount++;
      } else {
        ditutupCount++;
      }
    });

    return {
      total: tenders.length,
      under3Days,
      approaching,
      relaxed,
      prakualifikasiCount,
      ditutupCount,
    };
  }, [tenders]);

  // Filter tenders based on all active criteria
  const filteredTenders = useMemo(() => {
    return tenders.filter((tender) => {
      // 1. Search query
      if (filter.search.trim()) {
        const query = filter.search.toLowerCase();
        const matchTitle = tender.title.toLowerCase().includes(query);
        const matchSPPH = tender.spphNumber.toLowerCase().includes(query);
        const matchKBLI = tender.nib.kbliCode.toLowerCase().includes(query);
        const matchPTBAClass = tender.nib.ptbaClassification.toLowerCase().includes(query);
        const matchLocation = tender.location.toLowerCase().includes(query);
        const matchScope = tender.scopeOfWork.toLowerCase().includes(query);

        if (!matchTitle && !matchSPPH && !matchKBLI && !matchPTBAClass && !matchLocation && !matchScope) {
          return false;
        }
      }

      // 2. NIB Category filter
      if (filter.nibCategory !== 'Semua') {
        if (tender.nib.category !== filter.nibCategory) {
          return false;
        }
      }

      // 3. Status filter
      if (filter.status !== 'Semua') {
        if (tender.status !== filter.status) {
          return false;
        }
      }

      // 4. Location filter
      if (filter.unitKerja !== 'Semua Lokasi') {
        if (!tender.location.includes(filter.unitKerja) && !tender.unitKerja.includes(filter.unitKerja)) {
          return false;
        }
      }

      // 5. Qualification filter
      if (filter.qualification !== 'Semua') {
        if (!tender.nib.requiredQualifications.includes(filter.qualification as any)) {
          return false;
        }
      }

      // 6. Deadline Urgency filter (triggered by Header cards)
      if (filter.deadlineFilter && filter.deadlineFilter !== 'all') {
        const days = getDaysRemaining(tender.closingDate);
        if (filter.deadlineFilter === 'under3Days' && days > 3) {
          return false;
        }
        if (filter.deadlineFilter === '3to7Days' && (days <= 3 || days > 7)) {
          return false;
        }
        if (filter.deadlineFilter === 'over7Days' && days <= 7) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      // Selalu urutkan proyek dari yang terbaru
      const timeA = parseTenderDate(a.publishDate).getTime();
      const timeB = parseTenderDate(b.publishDate).getTime();
      if (timeB !== timeA) {
        return timeB - timeA;
      }
      return Number(b.id) - Number(a.id);
    });
  }, [tenders, filter]);

  // Status Group Configurations based on official portal statuses
  const stageConfigs: StageGroupConfig[] = useMemo(() => [
    {
      id: 'prakualifikasi',
      stageName: 'Prakualifikasi',
      stageNumber: 1,
      title: 'Lelang Terbuka (Prakualifikasi)',
      subtitle: 'Status resmi portal SPEND PTBA: Pengadaan aktif terbuka untuk pendaftaran rekanan dan pemenuhan dokumen kualifikasi/NIB.',
      badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold',
      headerBorder: 'border-emerald-200/90',
      iconBg: 'bg-emerald-100/80',
      iconColor: 'text-emerald-700'
    },
    {
      id: 'ditutup',
      stageName: 'Ditutup',
      stageNumber: 2,
      title: 'Lelang Ditutup',
      subtitle: 'Paket lelang yang masa pendaftaran kualifikasinya telah melewati tanggal penutupan.',
      badgeClass: 'bg-slate-100 text-slate-800 border-slate-300 font-bold',
      headerBorder: 'border-slate-200/90',
      iconBg: 'bg-slate-100/80',
      iconColor: 'text-slate-600'
    }
  ], []);

  // Group tenders into status groups, with each group sorted by newest project first
  const groupedTenders = useMemo(() => {
    return stageConfigs.map((config) => {
      // Filter items belonging to this status group
      const items = filteredTenders
        .filter((item) => {
          if (config.stageName === 'Ditutup') {
            return item.status === 'Ditutup' || item.status === 'Selesai';
          }
          return item.status === config.stageName;
        })
        // Selalu urutkan dari proyek terbaru
        .sort((a, b) => {
          const timeA = parseTenderDate(a.publishDate).getTime();
          const timeB = parseTenderDate(b.publishDate).getTime();
          if (timeB !== timeA) {
            return timeB - timeA;
          }
          return Number(b.id) - Number(a.id);
        });

      return {
        config,
        items
      };
    }).filter((group) => group.items.length > 0);
  }, [filteredTenders, stageConfigs]);

  const handleRefresh = () => {
    loadTenders(true);
  };

  const handleResetFilter = () => {
    setFilter({
      search: '',
      nibCategory: 'Semua',
      status: 'Semua',
      unitKerja: 'Semua Lokasi',
      qualification: 'Semua',
      sortBy: 'latest',
      deadlineFilter: 'all',
    });
  };

  const handleSelectDeadlineFilter = (filterType: 'all' | 'under3Days' | '3to7Days' | 'over7Days') => {
    setFilter((prev) => ({
      ...prev,
      deadlineFilter: filterType,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      {/* Header with "Spend Bukit Asam" title, compact deadline cards, and official link */}
      <Header
        timeStats={timeStats}
        selectedDeadlineFilter={filter.deadlineFilter}
        onSelectDeadlineFilter={handleSelectDeadlineFilter}
        onOpenNIBGuide={() => setIsNIBGuideOpen(true)}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        lastUpdated={lastUpdated}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* Filter and Search Bar */}
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          viewMode={viewMode}
          setViewMode={setViewMode}
          categoryCounts={categoryCounts}
          onReset={handleResetFilter}
        />

        {/* Active Urgency Filter Notice (if selected via Header cards) */}
        {filter.deadlineFilter && filter.deadlineFilter !== 'all' && (
          <div className="mb-6 p-3.5 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between gap-3 text-xs text-amber-900">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>
                Menampilkan paket lelang dengan filter batas waktu:{' '}
                <strong>
                  {filter.deadlineFilter === 'under3Days' && 'Kritis (< 3 Hari Segera Ditutup)'}
                  {filter.deadlineFilter === '3to7Days' && 'Mendekati Waktu (3 - 7 Hari)'}
                  {filter.deadlineFilter === 'over7Days' && 'Waktu Longgar (> 7 Hari)'}
                </strong>
              </span>
            </div>
            <button
              onClick={() => handleSelectDeadlineFilter('all')}
              className="inline-flex items-center gap-1 font-bold text-amber-800 hover:text-amber-950 underline cursor-pointer"
            >
              <span>Tampilkan Semua</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Results Overview Bar */}
        <div className="flex items-center justify-between gap-4 mb-5 text-xs text-slate-600">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-slate-900 text-sm">
              Daftar Paket Lelang
            </span>
            <span className="px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700 font-semibold">
              {filteredTenders.length} dari {tenders.length} Paket
            </span>

            {filter.nibCategory !== 'Semua' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 font-semibold border border-amber-200 text-xs">
                Kategori NIB: {filter.nibCategory}
              </span>
            )}
          </div>
        </div>

        {/* GROUPED TENDER SECTIONS */}
        {filteredTenders.length > 0 ? (
          <div>
            {groupedTenders.map(({ config, items }) => (
              <TenderGroupSection
                key={config.id}
                config={config}
                tenders={items}
                viewMode={viewMode}
                onSelectTender={setSelectedTender}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-xl border border-slate-200/80 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-xs">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Tidak Ada Paket Pengadaan yang Sesuai
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-5 leading-relaxed">
              Tidak ditemukan lelang dengan filter atau kriteria pencarian saat ini. Silakan atur ulang filter untuk melihat seluruh paket lelang.
            </p>
            <button
              onClick={handleResetFilter}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              <span>Tampilkan Semua Paket</span>
            </button>
          </div>
        )}

        {/* Informative Guidance Section at Bottom */}
        <section className="mt-12 bg-white rounded-xl border border-slate-200 p-5 sm:p-7 shadow-xs">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">
                Verifikasi Izin Usaha & NIB
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                PT Bukit Asam Tbk menerapkan verifikasi NIB Berbasis Risiko sesuai OSS-RBA. Pastikan kode KBLI 5 digit pada NIB badan usaha Anda sesuai dengan bidang pengadaan (IT, Sipil, Jasa, Mekanikal, atau Yang Bersesuaian).
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <Building className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">
                Pendaftaran Rekanan SPEND
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pendaftaran tender dilakukan secara mandiri di portal resmi{' '}
                <a 
                  href="https://spend.bukitasam.co.id/web/index/lelang" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-amber-700 font-semibold underline"
                >
                  spend.bukitasam.co.id
                </a>
                . Calon rekanan wajib mengunggah NIB, KBLI, serta dokumen kualifikasi lainnya sebelum tanggal penutupan.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">
                Bantuan & Layanan Panitia Lelang
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pertanyaan seputar dokumen tender, jadwal aanwijzing, atau kendala upload penawaran dapat dikomunikasikan ke helpdesk pengadaan PT Bukit Asam Tbk di masing-masing unit kerja operasional.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-sm">
              CST
            </div>
            <div>
              <div className="text-white font-bold text-sm">Spend Bukit Asam</div>
              <p className="text-[11px] text-slate-400">
                Portal Informasi Lelang, Jadwal Penutupan & Pengelompokan Tahap Pengadaan PT Bukit Asam Tbk
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <a
              href="https://spend.bukitasam.co.id/web/index/lelang"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline inline-flex items-center gap-1"
            >
              <span>Portal Lelang Asli PTBA</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-600">•</span>
            <button
              onClick={() => setIsNIBGuideOpen(true)}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Panduan KBLI NIB
            </button>
            <span className="text-slate-600">•</span>
            <span className="text-slate-500"> © 2026 CasTekno. All rights reserved</span>
          </div>
        </div>
      </footer>

      {/* Tender Detail Modal */}
      <TenderDetailModal
        tender={selectedTender}
        onClose={() => setSelectedTender(null)}
      />

      {/* NIB Guide Modal */}
      <NIBGuideModal
        isOpen={isNIBGuideOpen}
        onClose={() => setIsNIBGuideOpen(false)}
        onSelectCategory={(cat) => setFilter((prev) => ({ ...prev, nibCategory: cat }))}
      />
    </div>
  );
}
