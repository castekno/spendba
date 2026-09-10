export type NIBCategory = 
  | 'IT' 
  | 'Sipil' 
  | 'Jasa' 
  | 'Mekanikal' 
  | 'Lingkungan' 
  | 'Lainnya';

export type TenderStatus = 
  | 'Pendaftaran' 
  | 'Aanwijzing' 
  | 'Pemasukan Penawaran' 
  | 'Evaluasi' 
  | 'Pengumuman Pemenang';

export type BusinessQualification = 'Kecil' | 'Menengah' | 'Besar' | 'Semua Kualifikasi';

export interface NIBDetail {
  category: NIBCategory;
  kbliCode: string;
  kbliTitle: string;
  ptbaClassification: string;
  requiredQualifications: BusinessQualification[];
  specialRequirements?: string[];
}

export interface TenderItem {
  id: string;
  spphNumber: string;
  title: string;
  unitKerja: string;
  location: string;
  method: string;
  status: TenderStatus;
  publishDate: string;
  closingDate: string; // ISO format or YYYY-MM-DD HH:mm
  hpsInfo: string;
  nib: NIBDetail;
  scopeOfWork: string;
  documentRequirements: string[];
  contactPerson?: {
    division: string;
    email: string;
  };
  externalLink: string;
}

export interface FilterState {
  search: string;
  nibCategory: NIBCategory | 'Semua';
  status: TenderStatus | 'Semua';
  unitKerja: string;
  qualification: BusinessQualification | 'Semua';
  sortBy: 'deadline' | 'latest' | 'title';
  deadlineFilter?: 'all' | 'under3Days' | '3to7Days' | 'over7Days';
  groupByStage?: boolean;
}

export interface TenderTimeStats {
  total: number;
  under3Days: number;
  approaching: number; // 3-7 hari
  relaxed: number;     // > 7 hari
  pendaftaranCount: number;
  penawaranCount: number;
  aanwijzingCount: number;
}
