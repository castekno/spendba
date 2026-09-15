/**
 * CLOUDFLARE WORKER CORS GATEWAY UNTUK PORTAL SPEND PT BUKIT ASAM (PTBA)
 * 
 * Cara deploy sangat mudah & 100% Gratis:
 * 1. Buka https://dash.cloudflare.com/ (daftar gratis jika belum punya akun).
 * 2. Masuk ke menu "Workers & Pages" -> Klik "Create Application" -> "Create Worker".
 * 3. Beri nama (contoh: ptba-gateway) -> Klik "Deploy".
 * 4. Klik "Edit Code", hapus semua kode bawaan, lalu copy-paste seluruh kode di bawah ini.
 * 5. Klik "Save and Deploy".
 * 6. Salin URL Worker Anda (misal: https://ptba-gateway.<username>.workers.dev).
 * 7. Masukkan URL tersebut pada tombol "Gateway" di header portal ini.
 */

export default {
  async fetch(request, env, ctx) {
    // 1. Handle CORS Preflight (OPTIONS)
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    const url = new URL(request.url);
    const targetUrl = 'https://spend.bukitasam.co.id/api-spend-vendor/api/v1/VendorProcurement/open-lelang';

    try {
      // Ambil data langsung dari server resmi PTBA
      const ptbaResponse = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/json',
        },
      });

      if (!ptbaResponse.ok) {
        return new Response(JSON.stringify({
          status: false,
          error: `PTBA Server HTTP ${ptbaResponse.status}`,
        }), {
          status: ptbaResponse.status,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      const rawJson = await ptbaResponse.json();
      const rawList = rawJson.data || [];

      // Transformasi & Pemetaan NIB otomatis di Cloudflare Edge
      const tenders = rawList.map((item) => {
        const title = item.SPPH_NAME || 'Pengadaan Tanpa Judul';
        const spphNo = item.SPPH_NO || '-';
        const spphId = String(item.SPPH_ID || '');
        const idPersiapan = item.ID_PERSIAPAN || 0;

        const titleLower = title.toLowerCase();
        let category = 'Lainnya';
        let kbli = '46599';
        let nibTitle = 'Perdagangan Besar Mesin & Perlengkapan Penunjang Industri';

        if (/wireless|controller|data governance|teknologi|sistem informasi|keamanan siber|jaringan|software|komputer/.test(titleLower)) {
          category = 'IT';
          kbli = '62020 / 62019';
          nibTitle = 'Aktivitas Konsultasi Keamanan Siber, Integrasi Jaringan & Tata Kelola TI';
        } else if (/renovasi|gedung|konstruksi|sipil|bangunan|gorong/.test(titleLower)) {
          category = 'Sipil';
          kbli = '41012 / 41015';
          nibTitle = 'Konstruksi Gedung Pendidikan & Bangunan Sipil';
        } else if (/pump|pompa|mekanikal|alat berat|transmisi|overhaul|pipa|mesin|suku cadang|kontainer/.test(titleLower)) {
          category = 'Mekanikal';
          kbli = '33141 / 28120 / 46591';
          nibTitle = 'Reparasi, Pemeliharaan & Suku Cadang Alat Berat/Mekanikal';
        } else if (/logistik|angkutan|transportasi|barge|sewa alat|sewa kendaraan/.test(titleLower)) {
          category = 'Jasa';
          kbli = '49230 / 52291';
          nibTitle = 'Angkutan Barang Khusus Tambang & Jasa Pengurusan Transportasi';
        } else if (/lingkungan|limbah|reklamasi|das|water treatment/.test(titleLower)) {
          category = 'Lingkungan';
          kbli = '39000 / 71102';
          nibTitle = 'Aktivitas Remediasi, Pengelolaan Lingkungan & Jasa Terkait Tambang';
        }

        const now = Date.now();
        const closeTime = new Date(item.PQ_CLOSING_DATE).getTime();
        const status = closeTime < now ? 'Ditutup' : 'Prakualifikasi';

        return {
          id: `ptba-${spphId}`,
          spphNumber: spphNo,
          title: title,
          unitKerja: 'Satuan Kerja Pengadaan PTBA',
          qualification: 'Semua Kualifikasi (Usaha Menengah/Besar)',
          status: status,
          estimatedValue: 'Nilai HPS Ditentukan dalam Dokumen Pengadaan',
          announcementDate: item.PQ_OPENING_DATE,
          closingDate: item.PQ_CLOSING_DATE,
          downloadDeadline: item.PQ_CLOSING_DATE,
          nib: {
            category: category,
            kbli: kbli,
            title: nibTitle,
            description: `Klasifikasi terverifikasi untuk SPPH ${spphNo}`,
          },
          detailLink: `https://spend.bukitasam.co.id/web/index/lelang-detail?id=${spphId}&idPersiapan=${idPersiapan}`,
          description: `Pengadaan resmi PT Bukit Asam Tbk. Nomor SPPH: ${spphNo}. Batas submit: ${item.PQ_CLOSING_DATE}.`,
          location: 'Tanjung Enim, Sumatera Selatan',
          pic: 'Panitia Pengadaan PT Bukit Asam Tbk',
        };
      });

      return new Response(JSON.stringify({
        status: true,
        source: 'spend.bukitasam.co.id via Cloudflare Gateway',
        count: tenders.length,
        syncedAt: new Date().toISOString(),
        data: tenders,
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=30',
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({
        status: false,
        error: err.message || 'Gateway Internal Error',
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  },
};
