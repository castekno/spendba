import { TenderItem } from '../types/tender';
import { executeGatewayFetch, FetchResult } from './tenderGateway';

export type { FetchResult };

export async function fetchTendersData(forceRefresh = false): Promise<FetchResult> {
  return executeGatewayFetch(forceRefresh);
}

