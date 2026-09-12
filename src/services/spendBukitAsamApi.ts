import { TenderItem, NIBCategory, TenderStatus } from '../types/tender';

interface RawLelangItem {
  SPPH_NO: string;
  SPPH_ID: number;
  SPPH_NAME: string;
  PQ_OPENING_DATE: string;
  PQ_CLOSING_DATE: string;
  ID_PERSIAPAN: number;
}

interface RawLelangDetail {
  LOCATION?: string;
  namaPegawai?: string;
  PROSES_NAME?: string;
  TEMPLATE_NAME?: string;
  BODYPENGUMUMAN?: string;
  SPPH_DESC?: string;
}

function determineCategory(title: string, rawClass: string): { category: NIBCategory; kbli: string; title: string } {
  const combined = (title + ' ' + rawClass).toLowerCase();
  
  if (rawClass.includes('SB.01') || /wireless|controller|data governance|teknologi|sistem informasi|keamanan siber|jaringan|software|komputer/.test(combined)) {
    return {
      category: 'IT',
      kbli: '62020 / 62019',
      title: 'Aktivitas Konsultasi Keamanan Siber, Integrasi Jaringan & Tata Kelola TI',
    };
  }
  
  if (rawClass.includes('SB.13') || /renovasi|gedung|konstruksi|sipil|bangunan/.test(combined)) {
    return {
      category: 'Sipil',
      kbli: '41012 / 41015',
      title: 'Konstruksi Gedung Pendidikan & Bangunan Sipil',
    };
  }
  
  if (
    rawClass.includes('GB.07') || 
    rawClass.includes('SB.12') || 
    rawClass.includes('SB.21') || 
    /pump|pompa|mekanikal|alat berat|transmisi|overhaul|pipa|mesin|suku cadang/.test(combined)
  ) {
    return {
      category: 'Mekanikal',
      kbli: '33141 / 28120 / 46591',
      title: 'Reparasi, Pemeliharaan & Suku Cadang Alat Berat/Mekanikal',
    };
  }
  
  if (rawClass.includes('SB.18') || /logistik|angkutan|transportasi|barge|sewa alat/.test(combined)) {
    return {
      category: 'Jasa',
      kbli: '49230 / 52291',
      title: 'Angkutan Barang Khusus Tambang & Jasa Pengurusan Transportasi',
    };
  }
  
  if (rawClass.includes('SB.08') || /lingkungan|limbah|reklamasi|das|water treatment/.test(combined)) {
    return {
      category: 'Lingkungan',
      kbli: '39000 / 71102',
      title: 'Aktivitas Remediasi, Pengelolaan Lingkungan & Jasa Terkait Tambang',
    };
  }
  
  return {
    category: 'Lainnya',
    kbli: '46599',
    title: 'Perdagangan Besar Mesin & Perlengkapan Penunjang Industri',
  };
}

function determineStatus(openDateStr: string, closeDateStr: string): TenderStatus {
  const now = Date.now();
  const closeTime = new Date(closeDateStr).getTime();
  
  if (closeTime < now) {
    return 'Ditutup';
  }
  return 'Prakualifikasi';
}

function cleanHtmlText(html: string): string {
  if (!html) return '';
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function fetchLiveTendersFromPTBA(): Promise<TenderItem[]> {
  const url = 'https://spend.bukitasam.co.id/api-spend-vendor/api/v1/VendorProcurement/open-lelang';
  
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Accept: 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error from PTBA portal: ${response.status} ${response.statusText}`);
  }
  
  const json = await response.json();
  const list: RawLelangItem[] = json.data || [];
  
  if (!Array.isArray(list) || list.length === 0) {
    return [];
  }
  
  const tenders = await Promise.all(
    list.map(async (item): Promise<TenderItem> => {
      let detail: RawLelangDetail = {};
      try {
        const detailUrl = `https://spend.bukitasam.co.id/api-spend-vendor/api/v1/VendorProcurement/detail-lelang?id=${item.SPPH_ID}&idPersiapan=${item.ID_PERSIAPAN}`;
        const dRes = await fetch(detailUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            Accept: 'application/json',
          },
        });
        if (dRes.ok) {
          const dJson = await dRes.json();
          detail = dJson.data?.[0] || {};
        }
      } catch (err) {
        console.warn(`Failed to fetch detail for SPPH ${item.SPPH_ID}:`, err);
      }
      
      const bodyText = detail.BODYPENGUMUMAN || '';
      const classMatch = bodyText.match(/Klasifikasi\s*:\s*([^<\n]+)/i);
      const rawClassification = classMatch ? classMatch[1].trim() : '(Pengadaan Terbuka PTBA)';
      
      const catInfo = determineCategory(item.SPPH_NAME || '', rawClassification);
      const status = determineStatus(item.PQ_OPENING_DATE, item.PQ_CLOSING_DATE);
      
      const loc = detail.LOCATION || 'Tanjung Enim';
      let fullLocation = 'Tanjung Enim, Sumatera Selatan';
      let unitKerja = 'Satuan Kerja Pengadaan Tanjung Enim';
      
      if (loc.toLowerCase().includes('jakarta')) {
        fullLocation = 'Head Office Jakarta & Tanjung Enim';
        unitKerja = 'Head Office Jakarta';
      } else if (loc.toLowerCase().includes('tarahan')) {
        fullLocation = 'Dermaga Tarahan, Bandar Lampung';
        unitKerja = 'Unit Pelabuhan Tarahan';
      } else if ((item.SPPH_NAME || '').toLowerCase().includes('peranap')) {
        fullLocation = 'Peranap & Rengat, Indragiri Hulu, Riau';
        unitKerja = 'Unit Pertambangan Peranap Riau';
      }
      
      const pubDate = item.PQ_OPENING_DATE ? item.PQ_OPENING_DATE.split('T')[0] : '2026-09-01';
      const closeDate = item.PQ_CLOSING_DATE
        ? item.PQ_CLOSING_DATE.replace('T', ' ').substring(0, 16)
        : '2026-09-16 10:00';
        
      const rawScope = detail.SPPH_DESC || cleanHtmlText(bodyText);
      const scopeSummary = rawScope.length > 350 ? rawScope.substring(0, 350) + '...' : rawScope;

      return {
        id: `ptba-${item.SPPH_ID}`,
        spphNumber: item.SPPH_NO,
        title: item.SPPH_NAME,
        unitKerja: unitKerja,
        location: fullLocation,
        method: detail.PROSES_NAME || 'Lelang Terbuka 2 Sampul',
        status: status,
        publishDate: pubDate,
        closingDate: closeDate,
        hpsInfo: detail.TEMPLATE_NAME || 'Sesuai Ketentuan Dokumen RKS',
        nib: {
          category: catInfo.category,
          kbliCode: catInfo.kbli,
          kbliTitle: catInfo.title,
          ptbaClassification: rawClassification,
          requiredQualifications: ['Menengah', 'Besar'],
          specialRequirements: [
            `Terdaftar dan aktif pada Spend Management System PTBA dengan klasifikasi ${rawClassification}`,
            'Laporan Keuangan teraudit tahun buku terakhir',
            'Memiliki pengalaman kerja sejenis dalam 3 tahun terakhir',
          ],
        },
        scopeOfWork: scopeSummary || item.SPPH_NAME,
        documentRequirements: [
          `NIB Berbasis Risiko aktif dengan KBLI ${catInfo.kbli.split(' / ')[0]}`,
          'Surat Keterangan Fiskal (SKF) tahun berjalan',
          'Pakta Integritas dan Formulir Bebas Benturan Kepentingan',
          'Surat Kuasa (bila dikuasakan) dan fotokopi KTP direksi',
        ],
        contactPerson: {
          division: detail.namaPegawai
            ? `Panitia Pengadaan - ${detail.namaPegawai}`
            : 'Satuan Kerja Pengadaan PT Bukit Asam Tbk',
          email: 'pengadaan@bukitasam.co.id',
        },
        externalLink: 'https://spend.bukitasam.co.id/web/index/lelang',
      };
    })
  );
  
  return tenders;
}
