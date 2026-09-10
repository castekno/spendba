import React from 'react';
import { 
  Search, 
  Filter, 
  X, 
  Cpu, 
  Building2, 
  Truck, 
  Wrench, 
  Trees, 
  Layers, 
  LayoutGrid, 
  List, 
  ArrowUpDown,
  MapPin
} from 'lucide-react';
import { NIBCategory, FilterState, TenderStatus, BusinessQualification } from '../types/tender';
import { NIB_CATEGORY_CONFIG, PTBA_LOCATIONS } from '../data/tenders';

interface FilterBarProps {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  viewMode: 'grid' | 'table';
  setViewMode: (mode: 'grid' | 'table') => void;
  categoryCounts: Record<NIBCategory | 'Semua', number>;
  onReset: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  setFilter,
  viewMode,
  setViewMode,
  categoryCounts,
  onReset,
}) => {
  const nibCategories: Array<NIBCategory | 'Semua'> = [
    'Semua',
    'IT',
    'Sipil',
    'Jasa',
    'Mekanikal',
    'Lingkungan',
    'Lainnya'
  ];

  const getCategoryIcon = (category: NIBCategory | 'Semua') => {
    switch (category) {
      case 'IT':
        return <Cpu className="w-4 h-4" />;
      case 'Sipil':
        return <Building2 className="w-4 h-4" />;
      case 'Jasa':
        return <Truck className="w-4 h-4" />;
      case 'Mekanikal':
        return <Wrench className="w-4 h-4" />;
      case 'Lingkungan':
        return <Trees className="w-4 h-4" />;
      case 'Lainnya':
        return <Layers className="w-4 h-4" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  const hasActiveFilters = 
    filter.search !== '' ||
    filter.nibCategory !== 'Semua' ||
    filter.status !== 'Semua' ||
    filter.unitKerja !== 'Semua Lokasi' ||
    filter.qualification !== 'Semua';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-4 sm:p-5 mb-6">
      {/* Primary Row: Search and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[280px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={filter.search}
            onChange={(e) => setFilter((prev) => ({ ...prev, search: e.target.value }))}
            placeholder="Cari judul lelang, nomor SPPH, kode KBLI, atau kata kunci..."
            id="tender-search-input"
            className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
          />
          {filter.search && (
            <button
              onClick={() => setFilter((prev) => ({ ...prev, search: '' }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              title="Hapus pencarian"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Secondary Selectors & View Toggle */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Location Filter */}
          <div className="relative flex-1 sm:flex-none">
            <select
              value={filter.unitKerja}
              onChange={(e) => setFilter((prev) => ({ ...prev, unitKerja: e.target.value }))}
              id="filter-location"
              className="w-full sm:w-auto text-xs sm:text-sm pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer"
            >
              {PTBA_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative flex-1 sm:flex-none">
            <select
              value={filter.status}
              onChange={(e) => setFilter((prev) => ({ ...prev, status: e.target.value as TenderStatus | 'Semua' }))}
              id="filter-status"
              className="w-full sm:w-auto text-xs sm:text-sm pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer"
            >
              <option value="Semua">Semua Tahap</option>
              <option value="Pendaftaran">Pendaftaran</option>
              <option value="Aanwijzing">Aanwijzing</option>
              <option value="Pemasukan Penawaran">Pemasukan Dokumen</option>
              <option value="Evaluasi">Evaluasi Teknis</option>
              <option value="Pengumuman Pemenang">Pengumuman Pemenang</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="relative flex-1 sm:flex-none">
            <select
              value={filter.sortBy}
              onChange={(e) => setFilter((prev) => ({ ...prev, sortBy: e.target.value as any }))}
              id="filter-sort"
              className="w-full sm:w-auto text-xs sm:text-sm pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer"
            >
              <option value="deadline">Urut: Batas Waktu Terdekat</option>
              <option value="latest">Urut: Proyek Terbaru</option>
              <option value="title">Urut: Judul Proyek (A-Z)</option>
            </select>
          </div>

          {/* Grid/Table View Mode */}
          <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-100 ml-auto sm:ml-0">
            <button
              onClick={() => setViewMode('grid')}
              id="view-mode-grid"
              title="Tampilan Kartu"
              className={`p-1.5 rounded-md transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              id="view-mode-table"
              title="Tampilan Tabel"
              className={`p-1.5 rounded-md transition-all ${
                viewMode === 'table'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* NIB Category Filter Navigation (Requested Specific Feature) */}
      <div className="mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-amber-600" />
              Filter NIB Pekerjaan:
            </span>
            <span className="text-xs text-slate-500 hidden sm:inline">
              (Pilih bidang usaha sesuai perizinan NIB / KBLI perusahaan Anda)
            </span>
          </div>

          {hasActiveFilters && (
            <button
              onClick={onReset}
              id="reset-filter-btn"
              className="text-xs text-rose-600 hover:text-rose-700 font-medium hover:underline flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Filter</span>
            </button>
          )}
        </div>

        {/* Scrollable Pills on Mobile, Clean Flex on Desktop */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-200">
          {nibCategories.map((cat) => {
            const isSelected = filter.nibCategory === cat;
            const count = categoryCounts[cat] || 0;
            const config = NIB_CATEGORY_CONFIG[cat];

            return (
              <button
                key={cat}
                onClick={() => setFilter((prev) => ({ ...prev, nibCategory: cat }))}
                id={`filter-nib-${cat.toLowerCase()}`}
                className={`flex-shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm ring-2 ring-slate-900 ring-offset-1'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200/60'
                }`}
              >
                <span className={isSelected ? 'text-amber-400' : 'text-slate-500'}>
                  {getCategoryIcon(cat)}
                </span>
                <span>{config.label}</span>
                <span
                  className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[11px] font-semibold ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
