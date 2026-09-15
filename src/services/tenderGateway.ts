import { TenderItem } from '../types/tender';
import { INITIAL_TENDERS } from '../data/tenders';
import { fetchLiveTendersFromPTBA } from './spendBukitAsamApi';

export const GATEWAY_STORAGE_KEY = 'ptba_custom_gateway_url';
export const CACHE_KEY = 'ptba_tenders_cached';
export const CACHE_TIME_KEY = 'ptba_tenders_cached_time';
export const CACHE_SOURCE_KEY = 'ptba_tenders_cached_source';

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
        // Support direct tender array or wrapped { status, data }
        let items: TenderItem[] = [];
        if (Array.isArray(json)) {
          items = json;
        } else if (json.data && Array.isArray(json.data)) {
          items = json.data;
        }

        if (items.length > 0) {
          saveToCache(items, timeStr, 'Cloudflare Gateway');
          return {
            tenders: items,
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

  // 2. Jalur Kedua: Backend Server Express Internal (/api/lelang)
  // Bekerja di development dan saat dideploy ke Full-Stack Cloud Run
  try {
    const internalUrl = `/api/lelang${forceRefresh ? '?refresh=1' : ''}`;
    const res = await fetchWithTimeout(internalUrl, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    }, 6000);

    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      // Pastikan bukan respon HTML SPA fallback (404 ditutupi index.html)
      if (contentType.includes('application/json')) {
        const result = await res.json();
        if (result.status && Array.isArray(result.data) && result.data.length > 0) {
          saveToCache(result.data, timeStr, 'Live SPEND PTBA');
          return {
            tenders: result.data,
            isLive: true,
            timestamp: `Hari ini, ${timeStr}`,
            source: 'Live SPEND PTBA',
            gatewayUsed: '/api/lelang',
          };
        }
      }
    }
  } catch (err) {
    console.warn('Internal /api/lelang not available:', err);
  }

  // 3. Jalur Ketiga: Pre-rendered Live Snapshot (/api/lelang.json)
  // Disinkronkan otomatis saat setiap kali aplikasi di-build untuk publish
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
        if (result.status && Array.isArray(result.data) && result.data.length > 0) {
          saveToCache(result.data, timeStr, 'Live Sinkron PTBA');
          return {
            tenders: result.data,
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

  // 4. Jalur Keempat: Cache LocalStorage (hanya jika tidak dipaksa Muat Ulang)
  if (!forceRefresh) {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
      const cachedSource = localStorage.getItem(CACHE_SOURCE_KEY) || 'Cache Lokal';
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return {
            tenders: parsed,
            isLive: false,
            timestamp: cachedTime ? `Cache, ${cachedTime}` : `Hari ini, ${timeStr}`,
            source: cachedSource,
          };
        }
      }
    } catch (e) {
      console.warn('Cache read error:', e);
    }
  }

  // 5. Jalur Cadangan Terakhir: INITIAL_TENDERS ter-update dalam bundle
  return {
    tenders: INITIAL_TENDERS,
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
  } catch {
    // Abaikan kegagalan localStorage (misal private mode)
  }
}
