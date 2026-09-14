import { TenderItem } from '../types/tender';
import { INITIAL_TENDERS } from '../data/tenders';

const CACHE_KEY = 'ptba_tenders_cached';
const CACHE_TIME_KEY = 'ptba_tenders_cached_time';

export interface FetchResult {
  tenders: TenderItem[];
  isLive: boolean;
  timestamp: string;
  source: string;
  error?: string;
}

export async function fetchTendersData(forceRefresh = false): Promise<FetchResult> {
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

  // 1. Try calling the backend API endpoint (/api/lelang)
  try {
    const url = `/api/lelang${forceRefresh ? '?refresh=1' : ''}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      const result = await response.json();
      if (result.status && Array.isArray(result.data) && result.data.length > 0) {
        // Cache to localStorage
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(result.data));
          localStorage.setItem(CACHE_TIME_KEY, timeStr);
        } catch (e) {
          // ignore localStorage errors
        }

        return {
          tenders: result.data,
          isLive: true,
          timestamp: `Hari ini, ${timeStr}`,
          source: 'Live SPEND PTBA',
        };
      }
    }
  } catch (apiErr) {
    console.warn('Endpoint /api/lelang not reachable, attempting static api fallback:', apiErr);
  }

  // 2. Secondary Network Fallback: Try /api/lelang.json (pre-rendered live snapshot from build/sync)
  try {
    const jsonUrl = `/api/lelang.json?_t=${Date.now()}`;
    const jsonRes = await fetch(jsonUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (jsonRes.ok) {
      const jsonResult = await jsonRes.json();
      if (jsonResult.status && Array.isArray(jsonResult.data) && jsonResult.data.length > 0) {
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(jsonResult.data));
          localStorage.setItem(CACHE_TIME_KEY, timeStr);
        } catch (e) {
          // ignore localStorage errors
        }

        return {
          tenders: jsonResult.data,
          isLive: true,
          timestamp: `Hari ini, ${timeStr}`,
          source: 'Live Sinkron PTBA',
        };
      }
    }
  } catch (jsonErr) {
    console.warn('Static /api/lelang.json not reachable, checking cache/initial:', jsonErr);
  }

  // 3. Check localStorage cache only if NOT force refreshing
  if (!forceRefresh) {
    try {
      const cachedJson = localStorage.getItem(CACHE_KEY);
      const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
      if (cachedJson) {
        const cachedTenders = JSON.parse(cachedJson);
        // Only use cache if it has at least as many items as INITIAL_TENDERS
        if (Array.isArray(cachedTenders) && cachedTenders.length >= INITIAL_TENDERS.length) {
          return {
            tenders: cachedTenders,
            isLive: false,
            timestamp: cachedTime ? `Cache, ${cachedTime}` : `Hari ini, ${timeStr}`,
            source: 'Cache Lokal Terakhir',
          };
        }
      }
    } catch (cacheErr) {
      console.warn('Error reading from localStorage cache:', cacheErr);
    }
  }

  // 4. Fallback to updated INITIAL_TENDERS
  return {
    tenders: INITIAL_TENDERS,
    isLive: false,
    timestamp: `Hari ini, ${timeStr}`,
    source: 'Data Resmi Sinkron',
  };
}
