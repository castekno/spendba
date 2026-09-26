import { TenderItem } from '../types/tender';
import { INITIAL_TENDERS } from '../data/tenders';
import { fetchLiveTendersFromPTBA } from './spendBukitAsamApi';
import { parseTenderDate } from '../utils/dateUtils';

export const GATEWAY_STORAGE_KEY = 'ptba_custom_gateway_url';
export const CACHE_KEY = 'ptba_tenders_cached_v3';
export const CACHE_TIME_KEY = 'ptba_tenders_cached_time_v3';
export const CACHE_SOURCE_KEY = 'ptba_tenders_cached_source_v3';
export const CACHE_TIMESTAMP_KEY = 'ptba_tenders_cached_ts_v3';

// 5 minutes TTL for local storage cache
const CACHE_TTL_MS = 5 * 60 * 1000;

// Bersihkan cache lama versi sebelumnya jika ada
export function purgeLegacyCache(): void {
  try {
    localStorage.removeItem('ptba_tenders_cached');
    localStorage.removeItem('ptba_tenders_cached_time');
    localStorage.removeItem('ptba_tenders_cached_source');
    localStorage.removeItem('ptba_tenders_cached_v2');
  } catch {
    // Abaikan jika di private mode
  }
}

// Jalankan pembersihan cache usang saat modul dimuat
purgeLegacyCache();

export function sanitizeTendersList(items: TenderItem[]): TenderItem[] {
  if (!Array.isArray(items)) return [];
  const now = Date.now();
  return items
    // Hapus data dummy lama yang sudah tidak aktif di PTBA
    .filter((t) => t && t.id && t.id !== 'ptba-7625')
    .map((item) => {
      const closeTime = parseTenderDate(item.closingDate).getTime();
      const isExpired = !isNaN(closeTime) && closeTime < now;
      if (isExpired && item.status === 'Prakualifikasi') {
        return { ...item, status: 'Ditutup' as const };
      }
      return item;
    });
}

export interface GatewayInfo {
  name: string;
  url: string;
  type: 'internal' | 'static' | 'worker' | 'public';
  description: string;
}

export function getCustomGatewayUrl(): string {
  try {
    return localStorage.getItem(GATEWAY_STORAGE_KEY) || '';
  } catch {
    return '';
  }
}

export function setCustomGatewayUrl(url: string): void {
  try {
    if (url.trim()) {
      localStorage.setItem(GATEWAY_STORAGE_KEY, url.trim());
    } else {
      localStorage.removeItem(GATEWAY_STORAGE_KEY);
    }
  } catch (e) {
    console.warn('Gagal menyimpan gateway URL:', e);
  }
}

export interface FetchResult {
  tenders: TenderItem[];
  isLive: boolean;
  timestamp: string;
  source: string;
  gatewayUsed?: string;
  error?: string;
}

// Fetch helper with timeout
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 7000): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function executeGatewayFetch(forceRefresh = false): Promise<FetchResult> {
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

  const customGateway = getCustomGatewayUrl();

  // 1. Jalur Utama: Custom Cloudflare Worker Gateway (jika dikonfigurasi)
  if (customGateway) {
    try {
      const cleanGateway = customGateway.replace(/\/+$/, '');
      const testUrl = cleanGateway.includes('?') 
        ? `${cleanGateway}&_t=${Date.now()}`
        : `${cleanGateway}?_t=${Date.now()}`;

      const res = await fetchWithTimeout(testUrl, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      }, 8000);

      if (res.ok) {
        const json = await res.json();
        let items: TenderItem[] = [];
        if (Array.isArray(json)) {
          items = json;
        } else if (json.data && Array.isArray(json.data)) {
          items = json.data;
        }

        const sanitized = sanitizeTendersList(items);
        if (sanitized.length > 0) {
          saveToCache(sanitized, timeStr, 'Cloudflare Gateway');
          return {
            tenders: sanitized,
            isLive: true,
            timestamp: `Hari ini, ${timeStr}`,
            source: 'Cloudflare Gateway',
            gatewayUsed: cleanGateway,
          };
        }
      }
    } catch (err: any) {
      console.warn('Custom Gateway error:', err?.message || err);
    }
  }

  // 2. Jalur Utama: Vercel Serverless Function & Backend Internal (/api/lelang)
  try {
    const internalUrl = `/api/lelang?_t=${Date.now()}${forceRefresh ? '&refresh=1' : ''}`;
    const res = await fetchWithTimeout(internalUrl, {
      method: 'GET',
      headers: { 
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
      },
    }, 12000);

    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const result = await res.json();
        if (result.status && Array.isArray(result.data)) {
          const sanitized = sanitizeTendersList(result.data);
          const liveSource = result.source || 'Live SPEND PTBA';
          saveToCache(sanitized, timeStr, liveSource);
          return {
            tenders: sanitized,
            isLive: true,
            timestamp: `Hari ini, ${timeStr}`,
            source: liveSource,
            gatewayUsed: '/api/lelang (Vercel / Backend)',
          };
        }
      }
    }
  } catch (err) {
    console.warn('Internal /api/lelang not reachable:', err);
  }

  // 3. Jalur Ketiga: Pre-rendered Live Snapshot (/api/lelang.json)
  try {
    const staticUrl = `/api/lelang.json?_t=${Date.now()}`;
    const res = await fetchWithTimeout(staticUrl, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    }, 4000);

    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json') || res.status === 200) {
        const result = await res.json();
        if (result.status && Array.isArray(result.data)) {
          const sanitized = sanitizeTendersList(result.data);
          saveToCache(sanitized, timeStr, 'Live Sinkron PTBA');
          return {
            tenders: sanitized,
            isLive: true,
            timestamp: `Hari ini, ${timeStr}`,
            source: 'Live Sinkron PTBA',
            gatewayUsed: '/api/lelang.json',
          };
        }
      }
    }
  } catch (err) {
    console.warn('Static /api/lelang.json not available:', err);
  }

  // 4. Jalur Keempat: Cache LocalStorage (hanya jika data masih valid dan di bawah 5 menit)
  if (!forceRefresh) {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
      const cachedSource = localStorage.getItem(CACHE_SOURCE_KEY) || 'Cache Lokal';
      const cachedTs = Number(localStorage.getItem(CACHE_TIMESTAMP_KEY) || '0');
      const isFresh = Date.now() - cachedTs < CACHE_TTL_MS;

      if (cached && isFresh) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) {
          const sanitized = sanitizeTendersList(parsed);
          if (sanitized.length > 0) {
            return {
              tenders: sanitized,
              isLive: false,
              timestamp: cachedTime ? `Cache, ${cachedTime}` : `Hari ini, ${timeStr}`,
              source: cachedSource,
            };
          }
        }
      }
    } catch (e) {
      console.warn('Cache read error:', e);
    }
  }

  // 5. Jalur Cadangan Terakhir: INITIAL_TENDERS tersanitasi dalam bundle
  const safeInitial = sanitizeTendersList(INITIAL_TENDERS);
  return {
    tenders: safeInitial,
    isLive: false,
    timestamp: `Hari ini, ${timeStr}`,
    source: 'Data Resmi Tersinkronisasi',
    gatewayUsed: 'bundle',
  };
}

function saveToCache(data: TenderItem[], timeStr: string, source: string): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_TIME_KEY, timeStr);
    localStorage.setItem(CACHE_SOURCE_KEY, source);
    localStorage.setItem(CACHE_TIMESTAMP_KEY, String(Date.now()));
  } catch {
    // Abaikan kegagalan localStorage (misal private mode)
  }
}
