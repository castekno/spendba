// Sinkronisasi otomatis data lelang resmi PT Bukit Asam Tbk (SPEND)
// Terakhir diperbarui: 2026-09-26T02:05:46.657Z

import { TenderItem, NIBCategory } from '../types/tender';

export const PTBA_LOCATIONS = [
  'Semua Lokasi',
  'Tanjung Enim, Sumatera Selatan',
  'Dermaga Tarahan, Bandar Lampung',
  'Peranap & Rengat, Indragiri Hulu, Riau',
  'Head Office Jakarta & Tanjung Enim',
];

export const NIB_CATEGORY_CONFIG: Record<
  NIBCategory,
  {
    label: string;
    description: string;
    bgBadge: string;
    textBadge: string;
    borderBadge: string;
  }
> = {
  IT: {
    label: 'Teknologi Informasi & Siber',
    description: 'KBLI 62020 / 62019 - Konsultasi & Integrasi Jaringan',
    bgBadge: 'bg-blue-50',
    textBadge: 'text-blue-700',
    borderBadge: 'border-blue-200',
  },
  Sipil: {
    label: 'Konstruksi & Bangunan Sipil',
    description: 'KBLI 41012 / 41015 - Gedung Pendidikan & Sipil',
    bgBadge: 'bg-amber-50',
    textBadge: 'text-amber-800',
    borderBadge: 'border-amber-200',
  },
  Mekanikal: {
    label: 'Mekanikal & Alat Berat',
    description: 'KBLI 33141 / 28120 - Reparasi Mesin & Suku Cadang',
    bgBadge: 'bg-orange-50',
    textBadge: 'text-orange-700',
    borderBadge: 'border-orange-200',
  },
  Jasa: {
    label: 'Jasa & Transportasi',
    description: 'KBLI 49230 / 52291 - Logistik & Angkutan Tambang',
    bgBadge: 'bg-emerald-50',
    textBadge: 'text-emerald-700',
    borderBadge: 'border-emerald-200',
  },
  Lingkungan: {
    label: 'Pengelolaan Lingkungan',
    description: 'KBLI 39000 / 71102 - Remediasi & Pengelolaan Limbah',
    bgBadge: 'bg-teal-50',
    textBadge: 'text-teal-700',
    borderBadge: 'border-teal-200',
  },
  Lainnya: {
    label: 'Pengadaan Umum & Lainnya',
    description: 'KBLI 46599 - Perdagangan Mesin & Perlengkapan Industri',
    bgBadge: 'bg-slate-50',
    textBadge: 'text-slate-700',
    borderBadge: 'border-slate-200',
  },
};

export const INITIAL_TENDERS: TenderItem[] = [
  {
    "id": "ptba-8563",
    "spphNumber": "7509/EKS-1466/LG.02.03/IX/2026",
    "title": "Jasa Pengangkutan Bahan Bakar BBM (BBM) Biosolar Industri",
    "unitKerja": "Satuan Kerja Pengadaan Tanjung Enim",
    "location": "Tanjung Enim, Sumatera Selatan",
    "method": "Lelang Terbuka 2 Sampul",
    "status": "Prakualifikasi",
    "publishDate": "2026-09-21",
    "closingDate": "2026-09-28 15:00",
    "hpsInfo": "Harga Terendah Pasing Grade 80 (Umum)",
    "nib": {
      "category": "Jasa",
      "kbliCode": "49230 / 52291",
      "kbliTitle": "Angkutan Barang Khusus Tambang & Jasa Pengurusan Transportasi",
      "ptbaClassification": "(SB.18) Jasa Penyewaan Alat Transportasi",
      "requiredQualifications": [
        "Menengah",
        "Besar"
      ],
      "specialRequirements": [
        "Terdaftar dan aktif pada Spend Management System PTBA dengan klasifikasi (SB.18) Jasa Penyewaan Alat Transportasi",
        "Laporan Keuangan teraudit tahun buku terakhir",
        "Memiliki pengalaman kerja sejenis dalam 3 tahun terakhir"
      ]
    },
    "scopeOfWork": "Jasa Pengangkutan Bahan Bakar BBM (BBM) Biosolar Industri dari Depo Kertapati Ke PTBA Kertapati Port",
    "documentRequirements": [
      "NIB Berbasis Risiko aktif dengan KBLI 49230",
      "Surat Keterangan Fiskal (SKF) tahun berjalan",
      "Pakta Integritas dan Formulir Bebas Benturan Kepentingan",
      "Surat Kuasa (bila dikuasakan) dan fotokopi KTP direksi"
    ],
    "contactPerson": {
      "division": "Panitia Pengadaan - PRAYODI WIBOWO IRAWAN",
      "email": "pengadaan@bukitasam.co.id"
    },
    "externalLink": "https://spend.bukitasam.co.id/web/index/lelang"
  },
  {
    "id": "ptba-8380",
    "spphNumber": "7330/EKS-1464/LG.02.03/IX/2026-1",
    "title": "PENGADAAN JASA ALAT BERAT PRODUKSI – JASA OVERHAUL TRANSMISI SERTA PENYEDIAAN MAJOR COMPONENT & CRITICAL PARTS ALAT BERAT CAT",
    "unitKerja": "Satuan Kerja Pengadaan Tanjung Enim",
    "location": "Tanjung Enim, Sumatera Selatan",
    "method": "Lelang Terbuka 2 Sampul",
    "status": "Prakualifikasi",
    "publishDate": "2026-09-22",
    "closingDate": "2026-09-28 12:00",
    "hpsInfo": "Harga Terendah Pasing Grade 80 (Umum)",
    "nib": {
      "category": "Mekanikal",
      "kbliCode": "33141 / 28120 / 46591",
      "kbliTitle": "Reparasi, Pemeliharaan & Suku Cadang Alat Berat/Mekanikal",
      "ptbaClassification": "(SB.12) Jasa Pemeliharaan Alat Berat",
      "requiredQualifications": [
        "Menengah",
        "Besar"
      ],
      "specialRequirements": [
        "Terdaftar dan aktif pada Spend Management System PTBA dengan klasifikasi (SB.12) Jasa Pemeliharaan Alat Berat",
        "Laporan Keuangan teraudit tahun buku terakhir",
        "Memiliki pengalaman kerja sejenis dalam 3 tahun terakhir"
      ]
    },
    "scopeOfWork": "PENGADAAN JASA ALAT BERAT PRODUKSI – JASA OVERHAUL TRANSMISI SERTA PENYEDIAAN MAJOR COMPONENT & CRITICAL PARTS ALAT BERAT CAT",
    "documentRequirements": [
      "NIB Berbasis Risiko aktif dengan KBLI 33141",
      "Surat Keterangan Fiskal (SKF) tahun berjalan",
      "Pakta Integritas dan Formulir Bebas Benturan Kepentingan",
      "Surat Kuasa (bila dikuasakan) dan fotokopi KTP direksi"
    ],
    "contactPerson": {
      "division": "Panitia Pengadaan - AJI WIRA SASMITA",
      "email": "pengadaan@bukitasam.co.id"
    },
    "externalLink": "https://spend.bukitasam.co.id/web/index/lelang"
  }
];
