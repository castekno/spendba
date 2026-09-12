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
          // ignore localStorage errors (e.g. private mode)
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
    console.warn('Endpoint /api/lelang not reachable, attempting fallback:', apiErr);
  }

  // 2. Check localStorage cache if available
  try {
    const cachedJson = localStorage.getItem(CACHE_KEY);
    const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
    if (cachedJson) {
      const cachedTenders = JSON.parse(cachedJson);
      if (Array.isArray(cachedTenders) && cachedTenders.length > 0) {
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

  // 3. Fallback to updated INITIAL_TENDERS
  return {
    tenders: INITIAL_TENDERS,
    isLive: false,
    timestamp: `Hari ini, ${timeStr}`,
    source: 'Data Resmi Sinkron',
  };
}
