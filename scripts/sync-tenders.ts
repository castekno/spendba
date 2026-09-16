import fs from 'fs';
import path from 'path';
import { fetchLiveTendersFromPTBA } from '../src/services/spendBukitAsamApi';

async function sync() {
  console.log('🔄 Fetching live tenders from PTBA SPEND...');
  try {
    const tenders = await fetchLiveTendersFromPTBA();
    if (!tenders || tenders.length === 0) {
      console.warn('⚠️ No tenders returned from live API, skipping write.');
      return;
    }
    console.log(`✅ Fetched ${tenders.length} tenders successfully.`);

    // 1. Write public/api/lelang.json
    const publicApiDir = path.join(process.cwd(), 'public', 'api');
    if (!fs.existsSync(publicApiDir)) {
      fs.mkdirSync(publicApiDir, { recursive: true });
    }
    const payload = {
      status: true,
      source: 'spend.bukitasam.co.id',
      count: tenders.length,
      syncedAt: new Date().toISOString(),
      data: tenders,
    };
    fs.writeFileSync(path.join(publicApiDir, 'lelang.json'), JSON.stringify(payload, null, 2), 'utf-8');
    console.log('✅ Generated public/api/lelang.json fallback snapshot');

    // 2. Generate updated src/data/tenders.ts with all required exports
    const tendersFile = path.join(process.cwd(), 'src', 'data', 'tenders.ts');
    const content = `// Sinkronisasi otomatis data lelang resmi PT Bukit Asam Tbk (SPEND)
// Terakhir diperbarui: ${new Date().toISOString()}

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

export const INITIAL_TENDERS: TenderItem[] = ${JSON.stringify(tenders, null, 2)};
`;
    fs.writeFileSync(tendersFile, content, 'utf-8');
    console.log('✅ Updated src/data/tenders.ts with live records & configs');
  } catch (err) {
    console.error('❌ Error syncing tenders:', err);
  }
}

sync();
