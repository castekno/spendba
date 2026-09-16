// Sinkronisasi otomatis data lelang resmi PT Bukit Asam Tbk (SPEND)
// Terakhir diperbarui: 2026-09-16T11:28:20.302Z

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
    "id": "ptba-8574",
    "spphNumber": "7520/EKS-1464/LG.02.03/IX/2026",
    "title": "PENGADAAN KONTAINER PMSE 2 MAINTENANCE",
    "unitKerja": "Satuan Kerja Pengadaan Tanjung Enim",
    "location": "Tanjung Enim, Sumatera Selatan",
    "method": "Lelang Terbuka 2 Sampul",
    "status": "Prakualifikasi",
    "publishDate": "2026-09-14",
    "closingDate": "2026-09-18 12:00",
    "hpsInfo": "Harga Terendah Pasing Grade 80 (Umum)",
    "nib": {
      "category": "Lainnya",
      "kbliCode": "46599",
      "kbliTitle": "Perdagangan Besar Mesin & Perlengkapan Penunjang Industri",
      "ptbaClassification": "(GB.05) Peralatan Kantor, Alat Tulis, Pergudangan,Penyimpanan dan Produk Percetakan Umum",
      "requiredQualifications": [
        "Menengah",
        "Besar"
      ],
      "specialRequirements": [
        "Terdaftar dan aktif pada Spend Management System PTBA dengan klasifikasi (GB.05) Peralatan Kantor, Alat Tulis, Pergudangan,Penyimpanan dan Produk Percetakan Umum",
        "Laporan Keuangan teraudit tahun buku terakhir",
        "Memiliki pengalaman kerja sejenis dalam 3 tahun terakhir"
      ]
    },
    "scopeOfWork": "Pengadaan ini dibuat untuk memenuhi kebutuhan kontainer sebanyak 2 unit kontainer 20ft dan 2 unit kontainer 40ft",
    "documentRequirements": [
      "NIB Berbasis Risiko aktif dengan KBLI 46599",
      "Surat Keterangan Fiskal (SKF) tahun berjalan",
      "Pakta Integritas dan Formulir Bebas Benturan Kepentingan",
      "Surat Kuasa (bila dikuasakan) dan fotokopi KTP direksi"
    ],
    "contactPerson": {
      "division": "Panitia Pengadaan - RANDY ARTHAPUTRA",
      "email": "pengadaan@bukitasam.co.id"
    },
    "externalLink": "https://spend.bukitasam.co.id/web/index/lelang"
  },
  {
    "id": "ptba-8464",
    "spphNumber": "7414/EKS-1465/LG.02.03/IX/2026-1",
    "title": "PEKERJAAN JASA LOGISTIK ANGKUTAN BATUBARA DARI STOCK ROM PTBA PERANAP KE BARGE DI PELABUHAN MUAT KUALA CENAKU RENGAT INDRA GIRI HULU RIAU",
    "unitKerja": "Unit Pelabuhan Tarahan",
    "location": "Dermaga Tarahan, Bandar Lampung",
    "method": "Lelang Terbuka 1 Sampul",
    "status": "Prakualifikasi",
    "publishDate": "2026-09-16",
    "closingDate": "2026-09-18 15:00",
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
    "scopeOfWork": "JASA LOGISTIK ANGKUTAN BATUBARA DARI STOCK ROM PTBA KE BARGE DI PELABUHAN MUAT KUALA CENAKU RENGAT INDRA GIRI HULU RIAU",
    "documentRequirements": [
      "NIB Berbasis Risiko aktif dengan KBLI 49230",
      "Surat Keterangan Fiskal (SKF) tahun berjalan",
      "Pakta Integritas dan Formulir Bebas Benturan Kepentingan",
      "Surat Kuasa (bila dikuasakan) dan fotokopi KTP direksi"
    ],
    "contactPerson": {
      "division": "Panitia Pengadaan - TONY ZATMIKO",
      "email": "pengadaan@bukitasam.co.id"
    },
    "externalLink": "https://spend.bukitasam.co.id/web/index/lelang"
  },
  {
    "id": "ptba-7982",
    "spphNumber": "6932/EKS-1464/LG.02.03/IX/2026",
    "title": "Pekerjaan Jasa Sewa Kendaraan Operasional Termasuk Pengemudi Satuan Kerja Operational Services",
    "unitKerja": "Satuan Kerja Pengadaan Tanjung Enim",
    "location": "Tanjung Enim, Sumatera Selatan",
    "method": "Lelang Terbuka 2 Sampul",
    "status": "Prakualifikasi",
    "publishDate": "2026-09-12",
    "closingDate": "2026-09-18 14:00",
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
    "scopeOfWork": "Pekerjaan Jasa Sewa Kendaraan Operasional Termasuk Pengemudi Satuan Kerja Operational Services",
    "documentRequirements": [
      "NIB Berbasis Risiko aktif dengan KBLI 49230",
      "Surat Keterangan Fiskal (SKF) tahun berjalan",
      "Pakta Integritas dan Formulir Bebas Benturan Kepentingan",
      "Surat Kuasa (bila dikuasakan) dan fotokopi KTP direksi"
    ],
    "contactPerson": {
      "division": "Panitia Pengadaan - MULYADI",
      "email": "pengadaan@bukitasam.co.id"
    },
    "externalLink": "https://spend.bukitasam.co.id/web/index/lelang"
  },
  {
    "id": "ptba-7625",
    "spphNumber": "6575/EKS-1464/LG.02.03/IX/2026-1",
    "title": "Jasa Sewa Kendaraan Operasional Termasuk Pengemudi Satuan Kerja Operational Services",
    "unitKerja": "Satuan Kerja Pengadaan Tanjung Enim",
    "location": "Tanjung Enim, Sumatera Selatan",
    "method": "Lelang Terbuka 2 Sampul",
    "status": "Prakualifikasi",
    "publishDate": "2026-09-15",
    "closingDate": "2026-09-21 14:00",
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
    "scopeOfWork": "Jasa Sewa Kendaraan Operasional Termasuk Pengemudi Satuan Kerja Operational Services",
    "documentRequirements": [
      "NIB Berbasis Risiko aktif dengan KBLI 49230",
      "Surat Keterangan Fiskal (SKF) tahun berjalan",
      "Pakta Integritas dan Formulir Bebas Benturan Kepentingan",
      "Surat Kuasa (bila dikuasakan) dan fotokopi KTP direksi"
    ],
    "contactPerson": {
      "division": "Panitia Pengadaan - MULYADI",
      "email": "pengadaan@bukitasam.co.id"
    },
    "externalLink": "https://spend.bukitasam.co.id/web/index/lelang"
  }
];
