import { TenderItem } from '../types/tender';

export const INITIAL_TENDERS: TenderItem[] = [
  {
    id: 'ptba-001',
    spphNumber: '7490/EKS-1463/LG.02.03/IX/2026',
    title: 'Pekerjaan Renewal dan Maintenance Wireless Controller Ruckus & Network Infrastructure',
    unitKerja: 'Divisi Teknologi Informasi',
    location: 'Tanjung Enim & Head Office',
    method: 'Lelang Terbuka Prakualifikasi',
    status: 'Pendaftaran',
    publishDate: '2026-09-02',
    closingDate: '2026-09-12 15:00',
    hpsInfo: 'Sesuai Ketentuan RKS (Tercakup HPS)',
    nib: {
      category: 'IT',
      kbliCode: '62020 / 61999',
      kbliTitle: 'Aktivitas Konsultasi Keamanan Siber, Integrasi Sistem Jaringan & Telekomunikasi Lainnya',
      ptbaClassification: 'TI.01 - Perangkat Keras, Jaringan & Keamanan TI',
      requiredQualifications: ['Menengah', 'Besar'],
      specialRequirements: [
        'Memiliki Authorized Partner / Gold Partner Certification dari Vendor Principal (Ruckus)',
        'Tenaga ahli bersertifikat CCNA / CCNP / Ruckus Certified Engineer',
        'Pengalaman sejenis pemeliharaan core switch & wireless controller di industri pertambangan/BUMN minimal 3 tahun'
      ]
    },
    scopeOfWork: 'Pemeliharaan berkala, renewal lisensi smart zone controller, support 24/7 SLA 4 jam, penggantian spare part unit AP (Access Point) indoor dan outdoor di area operasional Tanjung Enim.',
    documentRequirements: [
      'Surat Izin Usaha / NIB Berbasis Risiko aktif dengan KBLI 62020',
      'Surat Dukungan Resmi Principal Ruckus CommScope',
      'Laporan Keuangan teraudit tahun 2024 atau 2025',
      'Pakta Integritas dan Formulir Bebas Benturan Kepentingan'
    ],
    contactPerson: {
      division: 'Subdit Pengadaan Jasa IT & Umum',
      email: 'pengadaan.it@bukitasam.co.id'
    },
    externalLink: 'https://spend.bukitasam.co.id/web/index/lelang'
  },
  {
    id: 'ptba-002',
    spphNumber: '7486/EKS-1463/LG.02.03/IX/2026',
    title: 'Jasa Asesmen Data Governance, Master Data Management & Compliance Arsitektur Informasi',
    unitKerja: 'Satuan Pengawasan Internal & TI',
    location: 'Head Office Jakarta & Tanjung Enim',
    method: 'Seleksi Terbuka Kualifikasi Teknis',
    status: 'Aanwijzing',
    publishDate: '2026-09-04',
    closingDate: '2026-09-12 10:00',
    hpsInfo: 'Ditentukan dalam Dokumen RKS',
    nib: {
      category: 'IT',
      kbliCode: '62019 / 70209',
      kbliTitle: 'Aktivitas Pemrograman Komputer Lainnya & Konsultansi Manajemen Bisnis/Tata Kelola',
      ptbaClassification: 'TI.03 - Konsultansi Tata Kelola Data & Audit TI',
      requiredQualifications: ['Menengah', 'Besar'],
      specialRequirements: [
        'Sertifikasi CDMP (Certified Data Management Professional) atau CGEIT / CISA bagi Team Leader',
        'Portofolio implementasi DAMA-DMBOK atau Data Governance Framework di BUMN/Mining Corp'
      ]
    },
    scopeOfWork: 'Asesmen maturitas data governance, penyusunan Data Architecture Roadmap, master data classification, serta formulasi regulasi perlindungan data pribadi dan rahasia korporasi.',
    documentRequirements: [
      'NIB dengan KBLI 62019 atau 70209',
      'Curriculum Vitae Tenaga Ahli Utama & Sertifikat Keahlian',
      'Surat Keterangan Fiskal (SKF) tahun berjalan',
      'Company Profile & Surat Pengalaman Kerja 3 tahun terakhir'
    ],
    contactPerson: {
      division: 'Tim Pengadaan Jasa Konsultansi',
      email: 'procurement.governance@bukitasam.co.id'
    },
    externalLink: 'https://spend.bukitasam.co.id/web/index/lelang'
  },
  {
    id: 'ptba-003',
    spphNumber: '7414/EKS-1465/LG.02.03/IX/2026',
    title: 'Pekerjaan Jasa Logistik Angkutan Batubara dari Stock ROM PTBA Peranap ke Barge di Pelabuhan Muat Kuala Cenaku',
    unitKerja: 'Unit Pertambangan Peranap Riau',
    location: 'Rengat, Indragiri Hulu, Riau',
    method: 'Lelang Terbuka',
    status: 'Pemasukan Penawaran',
    publishDate: '2026-08-28',
    closingDate: '2026-09-11 11:30',
    hpsInfo: 'HPS Terbuka pada Dokumen Pengadaan',
    nib: {
      category: 'Jasa',
      kbliCode: '49230 / 52291',
      kbliTitle: 'Angkutan Bermotor untuk Barang Khusus (Batubara) & Jasa Pengurusan Transportasi (JPT)',
      ptbaClassification: 'SB.09 - Jasa Angkutan & Logistik Pertambangan',
      requiredQualifications: ['Besar'],
      specialRequirements: [
        'Memiliki armada dump truck tronton/trailer minimal 50 unit berstandar keselamatan tambang',
        'Memiliki Izin Penyelenggaraan Angkutan Barang Khusus Tambang dari Dinas Perhubungan',
        'Penerapan safety monitoring GPS tracking terintegrasi telematika PTBA'
      ]
    },
    scopeOfWork: 'Pengangkutan batubara dari stockpile Pit Peranap menuju dermaga muat tongkang Kuala Cenaku volume rata-rata 120.000 ton/bulan termasuk maintenance haul road dan rambu keselamatan.',
    documentRequirements: [
      'NIB dengan izin operasional angkutan barang khusus pertambangan',
      'Bukti kepemilikan armada (STNK/BPKB/Perjanjian Sewa Jangka Panjang)',
      'Sertifikat CSMS (Contractor Safety Management System) Kategori High Risk',
      'Jaminan Penawaran (Bid Bond) dari Bank BUMN/Swasta Nasional'
    ],
    contactPerson: {
      division: 'Divisi Logistik & Niaga Batubara',
      email: 'logistik.peranap@bukitasam.co.id'
    },
    externalLink: 'https://spend.bukitasam.co.id/web/index/lelang'
  },
  {
    id: 'ptba-004',
    spphNumber: '7330/EKS-1464/LG.02.03/IX/2026',
    title: 'Pengadaan Jasa Alat Berat Produksi: Jasa Overhaul Transmisi serta Penyediaan Major Component & Critical Parts Alat Berat CAT',
    unitKerja: 'Divisi Perawatan Alat Berat & Tambang',
    location: 'Workshop Utama Tanjung Enim',
    method: 'Lelang Terbuka Pra-Kualifikasi',
    status: 'Pendaftaran',
    publishDate: '2026-09-01',
    closingDate: '2026-09-15 16:00',
    hpsInfo: 'Ditentukan Berdasarkan Rencana Anggaran Biaya (RAB)',
    nib: {
      category: 'Mekanikal',
      kbliCode: '33121 / 46591',
      kbliTitle: 'Reparasi & Perawatan Mesin untuk Keperluan Umum / Perdagangan Besar Mesin Pertambangan',
      ptbaClassification: 'GB.07 - Peralatan/Suku Cadang Mekanikal & Overhaul',
      requiredQualifications: ['Menengah', 'Besar'],
      specialRequirements: [
        'Memiliki fasilitas workshop bersertifikasi ISO 9001:2015 dan peralatan dyno-test transmisi',
        'Mekanik memiliki sertifikasi alat berat (Level Pratama/Madya CAT Certified)',
        'Garansi komponen overhaul minimal 3.000 jam operasi atau 1 tahun kalender'
      ]
    },
    scopeOfWork: 'Overhaul transmisi, torque converter, final drive, dan penyediaan parts fast & slow moving untuk armada CAT 777, CAT 785, dan Dozer D10T di area tambang Air Laya dan Muara Tiga Besar.',
    documentRequirements: [
      'NIB dengan KBLI 33121 dan surat keagenan resmi penyedia komponen',
      'Surat Keterangan Pengalaman Kerja Perbaikan Alat Berat sejenis dalam 5 tahun terakhir',
      'Sertifikasi CSMS kategori Medium/High',
      'Laporan audit keuangan 2 tahun terakhir dengan opini WTP'
    ],
    contactPerson: {
      division: 'Subdit Pengadaan Suku Cadang & Alat Berat',
      email: 'parts.procurement@bukitasam.co.id'
    },
    externalLink: 'https://spend.bukitasam.co.id/web/index/lelang'
  },
  {
    id: 'ptba-005',
    spphNumber: '7332/EKS-1464/LG.02.03/IX/2026',
    title: 'Pengadaan Benih-Bibit Tanaman & Sarana Penunjang Pengendalian Erosi Lahan Pascatambang',
    unitKerja: 'Divisi Lingkungan Hidup & Keberlanjutan',
    location: 'Kawasan Reklamasi Tanjung Enim',
    method: 'Tender Terbuka',
    status: 'Pendaftaran',
    publishDate: '2026-09-03',
    closingDate: '2026-09-19 11:30',
    hpsInfo: 'Daftar Harga Satuan Terbuka di RKS',
    nib: {
      category: 'Lingkungan',
      kbliCode: '01199 / 39000',
      kbliTitle: 'Pertanian Tanaman Lainnya & Pengelolaan Lingkungan Pascatambang',
      ptbaClassification: 'JS.08 - Jasa Pengendalian Lingkungan & Kehutanan',
      requiredQualifications: ['Kecil', 'Menengah'],
      specialRequirements: [
        'Memiliki nursery / kebun bibit terdaftar di BPDAS / instansi kehutanan',
        'Penyediaan bibit pohon lokal pionir (Akasia, Sengon, Mahoni, Gaharu) tinggi min 60 cm dalam polybag',
        'Penyediaan jaring sabut kelapa (cocomesh) dan hydroseeding kit penahan erosi lereng'
      ]
    },
    scopeOfWork: 'Penyediaan 85.000 bibit tanaman revegetasi, 25.000 m2 cocomesh penahan erosi, pupuk organik hayati, serta pendampingan teknis penanaman di lereng disposal tambang.',
    documentRequirements: [
      'NIB Usaha Kecil/Menengah dengan KBLI Pembibitan / Jasa Kehutanan',
      'Sertifikat Mutu Benih/Bibit dari instansi berwenang',
      'Bukti kepemilikan/penguasaan lahan pembibitan nursery',
      'Surat Kesanggupan Delivery bertahap sesuai jadwal musim tanam'
    ],
    contactPerson: {
      division: 'Bagian Reklamasi & Lingkungan Hidup',
      email: 'environment@bukitasam.co.id'
    },
    externalLink: 'https://spend.bukitasam.co.id/web/index/lelang'
  },
  {
    id: 'ptba-006',
    spphNumber: '7275/EKS-1465/LG.02.03/IX/2026-1',
    title: 'Pengadaan Jasa Sewa Kendaraan Ambulance & Driver Medis Siaga PT Bukit Asam Tbk Tarahan Port',
    unitKerja: 'K3L & Fasilitas Umum Pelabuhan Tarahan',
    location: 'Pelabuhan Tarahan, Bandar Lampung',
    method: 'Lelang Terbuka',
    status: 'Evaluasi',
    publishDate: '2026-08-25',
    closingDate: '2026-09-12 10:00',
    hpsInfo: 'Sesuai Penetapan Panitia Lelang',
    nib: {
      category: 'Jasa',
      kbliCode: '77100 / 86903',
      kbliTitle: 'Aktivitas Penyewaan Kendaraan & Pelayanan Penunjang Medis Gawat Darurat',
      ptbaClassification: 'JS.04 - Jasa Transportasi Khusus & Pelayanan K3',
      requiredQualifications: ['Kecil', 'Menengah'],
      specialRequirements: [
        'Kendaraan ambulance tipe Emergency / Transportasi medis minimal tahun pembuatan 2023',
        'Dilengkapi peralatan medis standar Kemenkes (Defibrillator, Tabung O2, Suction, Stretcher)',
        'Driver memiliki sertifikasi Basic Trauma & First Aid Rescue (BTCLS) yang valid'
      ]
    },
    scopeOfWork: 'Penyediaan 2 unit ambulance siaga 24 jam beserta 4 orang pengemudi medis rotasi shift, termasuk biaya bahan bakar, asuransi all-risk, dan pemeliharaan berkala selama 24 bulan.',
    documentRequirements: [
      'NIB dengan KBLI Penyewaan Alat Angkutan / Layanan Ambulans Swasta',
      'Izin operasional ambulans dari Dinas Kesehatan setempat',
      'Sertifikat pelatihan medis kegawatdaruratan para driver',
      'Surat Keterangan Domisili Usaha / Kantor Cabang Lampung'
    ],
    contactPerson: {
      division: 'Unit Pengadaan Logistik Pelabuhan Tarahan',
      email: 'pengadaan.tarahan@bukitasam.co.id'
    },
    externalLink: 'https://spend.bukitasam.co.id/web/index/lelang'
  },
  {
    id: 'ptba-007',
    spphNumber: '7512/EKS-1460/LG.02.01/IX/2026',
    title: 'Pekerjaan Konstruksi Sipil Pembangunan Jembatan Timbang Kapasitas 120 Ton & Rigid Pavement Akses Tambang Air Laya',
    unitKerja: 'Divisi Enjiniring Sipil & Infrastruktur',
    location: 'Area Tambang Air Laya, Tanjung Enim',
    method: 'Lelang Terbuka Pascakualifikasi',
    status: 'Pendaftaran',
    publishDate: '2026-09-05',
    closingDate: '2026-09-22 15:30',
    hpsInfo: 'Pagu Anggaran Rp 8.450.000.000,- (Tercantum RKS)',
    nib: {
      category: 'Sipil',
      kbliCode: '42911 / 42101',
      kbliTitle: 'Konstruksi Bangunan Sipil Fasilitas Pertambangan & Konstruksi Jalan Raya Tambang',
      ptbaClassification: 'SP.03 - Konstruksi Sipil & Bangunan Fasilitas Tambang',
      requiredQualifications: ['Menengah', 'Besar'],
      specialRequirements: [
        'Memiliki Sertifikat Badan Usaha (SBU) Konstruksi Jembatan / Jalan Tambang yang masih berlaku',
        'Tenaga Ahli Madya Teknik Sipil (SKA) dengan pengalaman minimal 5 tahun',
        'Peralatan batching plant terkalibrasi dan vibro roller 12 ton milik sendiri atau sewa'
      ]
    },
    scopeOfWork: 'Pekerjaan pondasi bore pile, struktur beton bertulang mutu K-400 untuk pit jembatan timbang, instalasi load cell elektronik 120 ton, serta rigid pavement akses sepanjang 850 meter lebar 14 meter.',
    documentRequirements: [
      'NIB Berbasis Risiko KBLI Konstruksi 42911 / SBU Sipil aktif',
      'Laporan Keuangan Audit Akuntan Publik 3 tahun terakhir',
      'Bukti Kepemilikan Peralatan Utama Konstruksi',
      'Rencana Keselamatan Konstruksi (RKK) sesuai pedoman Permen PUPR'
    ],
    contactPerson: {
      division: 'Subdit Pengadaan Konstruksi Sipil',
      email: 'sipil.tender@bukitasam.co.id'
    },
    externalLink: 'https://spend.bukitasam.co.id/web/index/lelang'
  },
  {
    id: 'ptba-008',
    spphNumber: '7520/EKS-1462/LG.02.02/IX/2026',
    title: 'Pekerjaan Normalisasi & Perkuatan Dinding Saluran Pengendap Lumpur (Sediment Pond) Sub-Catchment Muara Tiga Besar',
    unitKerja: 'Divisi Enjiniring & Operasi Penambangan',
    location: 'Muara Tiga Besar Selatan (MTBS), Muara Enim',
    method: 'Lelang Terbuka',
    status: 'Pendaftaran',
    publishDate: '2026-09-06',
    closingDate: '2026-09-21 14:00',
    hpsInfo: 'Sesuai Bill of Quantities (BoQ) di Dokumen RKS',
    nib: {
      category: 'Sipil',
      kbliCode: '42912 / 43120',
      kbliTitle: 'Konstruksi Bangunan Pengairan & Pekerjaan Penyiapan Lahan / Galian Pertambangan',
      ptbaClassification: 'SP.05 - Konstruksi Saluran Air Tambang & Kolam Pengendap',
      requiredQualifications: ['Kecil', 'Menengah'],
      specialRequirements: [
        'Pengalaman pembuatan kolam pengendap sedimen (KPL) atau bendung tambang minimal 2 paket',
        'Penyediaan excavator long arm 2 unit dan dump truck 6 roda 8 unit'
      ]
    },
    scopeOfWork: 'Pengerukan lumpur sedimen volume 45.000 m3, pemasangan bronjong kawat galvanis (gabion) 1.200 m3, perkuatan tebing geotextile, serta pembuatan pintu limpasan (spillway) beton.',
    documentRequirements: [
      'NIB KBLI Bangunan Pengairan/Drainase Pertambangan',
      'SBU Konstruksi Saluran Air / Irigasi aktif',
      'Surat Keterangan Kelayakan CSMS PTBA',
      'Peta Metode Kerja dan Analisis Risiko Lingkungan Air Limpasan'
    ],
    contactPerson: {
      division: 'Bagian Pengadaan Infrastruktur',
      email: 'procurement.infra@bukitasam.co.id'
    },
    externalLink: 'https://spend.bukitasam.co.id/web/index/lelang'
  },
  {
    id: 'ptba-009',
    spphNumber: '7478/EKS-1461/LG.02.04/IX/2026',
    title: 'Pengembangan & Integrasi Smart Conveyor Monitoring System berbasis IoT & AI Computer Vision di Belt Handling System 2',
    unitKerja: 'Divisi Otomasi & Sistem Kontrol Tambang',
    location: 'Pelabuhan Kertapati Palembang & Tanjung Enim',
    method: 'Lelang Terbuka Seleksi Proposal Teknis',
    status: 'Aanwijzing',
    publishDate: '2026-09-03',
    closingDate: '2026-09-16 15:00',
    hpsInfo: 'Evaluasi Penilaian Teknis & Biaya (Kombinasi)',
    nib: {
      category: 'IT',
      kbliCode: '62012 / 71102',
      kbliTitle: 'Aktivitas Pengembangan Aplikasi & Aktivitas Keinsinyuran Terintegrasi Otomasi Industri',
      ptbaClassification: 'TI.04 - Sistem IoT, Kecerdasan Buatan & SCADA',
      requiredQualifications: ['Menengah', 'Besar'],
      specialRequirements: [
        'Solusi memiliki modul pendeteksi robekan belt conveyor (tear detection) dan roller overheating berbasis thermal camera',
        'Integrasi protokol Modbus TCP/IP & OPC-UA ke SCADA Siemens & SAP ERP PTBA',
        'Sertifikasi insinyur otomasi dan data scientist dalam tim inti'
      ]
    },
    scopeOfWork: 'Pemasangan 36 sensor sensor getaran nirkabel, 12 thermal camera explosion-proof IP67, edge server gateway, implementasi model AI deteksi anomali real-time, dan dashboard monitoring terpusat.',
    documentRequirements: [
      'NIB dengan KBLI 62012 atau Jasa Rekayasa Sistem Kontrol',
      'Dokumen Whitepaper & Desain Arsitektur Sistem IoT yang diajukan',
      'Surat Dukungan Pabrikan Sensor Industri & Hardware Server',
      'Surat Pernyataan Alih Pengetahuan & Pelatihan Operasional (Knowledge Transfer)'
    ],
    contactPerson: {
      division: 'Subdit Pengadaan Teknologi & Digitalisasi',
      email: 'digital.procurement@bukitasam.co.id'
    },
    externalLink: 'https://spend.bukitasam.co.id/web/index/lelang'
  },
  {
    id: 'ptba-010',
    spphNumber: '7395/EKS-1466/LG.02.05/IX/2026',
    title: 'Jasa Pengelolaan Keamanan Objek Vital Nasional (Pam Obvitnas) & Pengawalan Aset Jalur Kereta Api Batubara',
    unitKerja: 'Divisi Corporate Security & Keamanan',
    location: 'Lintas Rel Tanjung Enim - Kertapati - Tarahan',
    method: 'Lelang Terbuka',
    status: 'Pemasukan Penawaran',
    publishDate: '2026-08-30',
    closingDate: '2026-09-14 13:00',
    hpsInfo: 'Sesuai UMR Regional & Standar Biaya Masukan',
    nib: {
      category: 'Jasa',
      kbliCode: '80100',
      kbliTitle: 'Aktivitas Jasa Keamanan Swasta (Badan Usaha Jasa Pengamanan / BUJP)',
      ptbaClassification: 'JS.01 - Jasa Pengamanan & Pengawalan Aset Korporasi',
      requiredQualifications: ['Besar'],
      specialRequirements: [
        'Surat Izin Operasional (SIO) dari Mabes Polri yang masih berlaku',
        'Personel satpam memiliki sertifikasi Gada Pratama / Gada Madya aktif',
        'Pengalaman pengamanan fasilitas tambang batubara atau BUMN minimal 5 tahun'
      ]
    },
    scopeOfWork: 'Penyediaan 180 personil pengamanan bersertifikat, patroli mobile 24 jam dengan kendaraan 4x4, pengamanan gardu sinyal, jembatan KA, dan stockpile pelabuhan penumpukan.',
    documentRequirements: [
      'NIB BUJP dengan izin operasional Mabes Polri',
      'Bukti KTA dan Ijazah Satpam seluruh personil yang ditugaskan',
      'Kepesertaan BPJS Ketenagakerjaan & Kesehatan 100%',
      'Struktur SOP Penanganan Konflik & Tanggap Darurat'
    ],
    contactPerson: {
      division: 'Bagian Pengadaan Jasa Umum & Keamanan',
      email: 'security.procurement@bukitasam.co.id'
    },
    externalLink: 'https://spend.bukitasam.co.id/web/index/lelang'
  },
  {
    id: 'ptba-011',
    spphNumber: '7355/EKS-1462/LG.02.06/IX/2026',
    title: 'Pekerjaan Fabrikasi, Rekondisi Chute Transfer & Penggantian Wear Plate Hardox pada Stack Reclaimer Dermaga Tarahan',
    unitKerja: 'Divisi Pemeliharaan Pelabuhan Tarahan',
    location: 'Pelabuhan Tarahan, Lampung Selatan',
    method: 'Lelang Terbuka',
    status: 'Pendaftaran',
    publishDate: '2026-09-04',
    closingDate: '2026-09-24 16:30',
    hpsInfo: 'Ditentukan dalam Dokumen Spesifikasi Teknis',
    nib: {
      category: 'Mekanikal',
      kbliCode: '25111 / 33111',
      kbliTitle: 'Industri Barang dari Logam untuk Konstruksi & Reparasi Produk Logam Fabrikasi',
      ptbaClassification: 'GB.04 - Fabrikasi Logam & Mekanikal Pelabuhan',
      requiredQualifications: ['Menengah', 'Besar'],
      specialRequirements: [
        'Sertifikat WPS/PQR las berstandar AWS D1.1',
        'Welder bersertifikat BNSP / Migas 6G',
        'Sertifikat uji material (Mill Certificate) wear plate tahan abrasi HB 450/500'
      ]
    },
    scopeOfWork: 'Fabrikasi dan pemasangan liner chute transfer kapasitas 3.000 ton/jam, penggantian plate tebal 16mm-20mm, pengelasan struktur penopang staker reclaimer, dan uji NDT (Non-Destructive Testing).',
    documentRequirements: [
      'NIB KBLI Fabrikasi Logam/Konstruksi Mekanikal',
      'Daftar peralatan bengkel fabrikasi (Mesin roll, bending, plasma cutting CNC)',
      'Laporan keuangan terakhir dan sertifikat ISO 45001 (K3)',
      'Jaminan penawaran dari bank persepsi'
    ],
    contactPerson: {
      division: 'Tim Pengadaan Pelabuhan Tarahan',
      email: 'tarahan.proc@bukitasam.co.id'
    },
    externalLink: 'https://spend.bukitasam.co.id/web/index/lelang'
  },
  {
    id: 'ptba-012',
    spphNumber: '7304/EKS-1467/LG.02.07/IX/2026',
    title: 'Pengadaan Bahan Kimia Flokulan & Koagulan untuk Unit Pengolahan Air Asam Tambang (Acid Mine Drainage)',
    unitKerja: 'Divisi Lingkungan & Pengelolaan Air Asam Tambang',
    location: 'Tanjung Enim & Lahat',
    method: 'Lelang Terbuka Pasca-Kualifikasi',
    status: 'Evaluasi',
    publishDate: '2026-08-20',
    closingDate: '2026-09-10 14:00',
    hpsInfo: 'Harga Kontrak Pay-per-Consumption (Katalog Harga)',
    nib: {
      category: 'Lainnya',
      kbliCode: '20119 / 46691',
      kbliTitle: 'Industri Bahan Kimia Dasar & Perdagangan Besar Bahan dan Barang Kimia',
      ptbaClassification: 'BK.02 - Bahan Kimia Pengolahan Air Tambang',
      requiredQualifications: ['Menengah', 'Besar'],
      specialRequirements: [
        'Penyedia melampirkan Material Safety Data Sheet (MSDS) dan Certificate of Analysis (CoA)',
        'Uji jar test di lab terakreditasi KAN dengan efektivitas netralisasi pH 3 ke pH 7-8',
        'Kapasitas supply minimal 100 ton per bulan ke lokasi site PTBA'
      ]
    },
    scopeOfWork: 'Supply Poly Aluminium Chloride (PAC), Polimer Anionik bubuk, dan kapur tohor (Quicklime) aktif selama periode 12 bulan termasuk pengiriman Franco Gudang Tanjung Enim.',
    documentRequirements: [
      'NIB dengan izin edar dan perdagangan bahan kimia B3',
      'Surat Penunjukan Distributor / Keagenan dari Pabrik',
      'Hasil pengujian mutu independen laboratorium KAN',
      'Surat pernyataan ketersediaan buffer stock'
    ],
    contactPerson: {
      division: 'Pengadaan Bahan Kimia & Eksplorasi',
      email: 'chemical.proc@bukitasam.co.id'
    },
    externalLink: 'https://spend.bukitasam.co.id/web/index/lelang'
  }
];

export const NIB_CATEGORY_CONFIG = {
  Semua: {
    label: 'Semua Bidang NIB',
    badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
    iconName: 'LayoutGrid',
    description: 'Seluruh lelang terbuka yang sedang aktif di portal Spend Bukit Asam'
  },
  IT: {
    label: 'IT & Telekomunikasi',
    badgeClass: 'bg-sky-50 text-sky-700 border-sky-200 ring-1 ring-sky-300/40',
    accentColor: '#0284c7',
    iconName: 'Cpu',
    description: 'Software, Jaringan, Hardware, Cyber Security, IoT, Data Governance, Konsultansi TI (KBLI 62xxx / 63xxx / 61xxx)'
  },
  Sipil: {
    label: 'Sipil & Konstruksi',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-300/40',
    accentColor: '#059669',
    iconName: 'Building2',
    description: 'Konstruksi Jalan Tambang, Jembatan Timbang, Kolam Sedimen, Drainase, Gedung & Struktur Baja (KBLI 41xxx / 42xxx / 43xxx)'
  },
  Jasa: {
    label: 'Jasa Umum & Logistik',
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-200 ring-1 ring-amber-300/40',
    accentColor: '#d97706',
    iconName: 'Truck',
    description: 'Angkutan Batubara, Alat Berat, Sewa Ambulans & Kendaraan, Keamanan Obvitnas, Catering, Jasa Tambang (KBLI 49xxx / 77xxx / 80xxx)'
  },
  Mekanikal: {
    label: 'Mekanikal & Elektrikal',
    badgeClass: 'bg-violet-50 text-violet-700 border-violet-200 ring-1 ring-violet-300/40',
    accentColor: '#7c3aed',
    iconName: 'Wrench',
    description: 'Overhaul Transmisi CAT, Fabrikasi Chute, Wear Plate, Belt Conveyor, Trafo & Genset (KBLI 33xxx / 25xxx / 28xxx)'
  },
  Lingkungan: {
    label: 'Lingkungan & Reklamasi',
    badgeClass: 'bg-teal-50 text-teal-700 border-teal-200 ring-1 ring-teal-300/40',
    accentColor: '#0d9488',
    iconName: 'Trees',
    description: 'Pembibitan Tanaman, Pengendalian Erosi Lahan Pascatambang, Cocomesh & Revegetasi (KBLI 01xxx / 39xxx)'
  },
  Lainnya: {
    label: 'Bahan Kimia & Lainnya',
    badgeClass: 'bg-stone-50 text-stone-700 border-stone-200 ring-1 ring-stone-300/40',
    accentColor: '#57534e',
    iconName: 'Package',
    description: 'Bahan Kimia Flokulan Air Asam Tambang, ATK, Perlengkapan Khusus Tambang (KBLI 20xxx / 46xxx)'
  }
} as const;

export const PTBA_LOCATIONS = [
  'Semua Lokasi',
  'Tanjung Enim & Head Office',
  'Head Office Jakarta & Tanjung Enim',
  'Rengat, Indragiri Hulu, Riau',
  'Workshop Utama Tanjung Enim',
  'Kawasan Reklamasi Tanjung Enim',
  'Pelabuhan Tarahan, Bandar Lampung',
  'Area Tambang Air Laya, Tanjung Enim',
  'Muara Tiga Besar Selatan (MTBS), Muara Enim',
  'Pelabuhan Kertapati Palembang & Tanjung Enim'
];
