import type { IncomingMessage, ServerResponse } from 'http';
import { fetchLiveTendersFromPTBA } from '../src/services/spendBukitAsamApi';

/**
 * Vercel Serverless Function Handler
 * Endpoint: /api/lelang
 * Berjalan langsung di backend serverless Vercel (Node.js)
 * Mengambil data live lelang langsung dari portal resmi SPEND PT Bukit Asam (PTBA)
 * Tanpa CORS issue, tanpa butuh domain, dan tanpa butuh Cloudflare.
 */
export default async function handler(req: any, res: any) {
  // Set CORS Headers untuk fleksibilitas pemanggilan
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // Pastikan browser & proxy Vercel tidak menyimpan cache usang saat refresh
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'OPTIONS') {
    if (typeof res.status === 'function') {
      return res.status(204).end();
    }
    res.statusCode = 204;
    return res.end();
  }

  try {
    const tenders = await fetchLiveTendersFromPTBA();

    const responseData = {
      status: true,
      source: 'spend.bukitasam.co.id (Vercel Serverless)',
      count: tenders.length,
      syncedAt: new Date().toISOString(),
      data: tenders,
    };

    if (typeof res.status === 'function') {
      return res.status(200).json(responseData);
    }
    res.statusCode = 200;
    return res.end(JSON.stringify(responseData));
  } catch (error: any) {
    console.error('Vercel Serverless PTBA fetch error:', error);
    const errorResponse = {
      status: false,
      error: error?.message || 'Gagal memuat lelang langsung dari portal SPEND PTBA',
    };

    if (typeof res.status === 'function') {
      return res.status(502).json(errorResponse);
    }
    res.statusCode = 502;
    return res.end(JSON.stringify(errorResponse));
  }
}
