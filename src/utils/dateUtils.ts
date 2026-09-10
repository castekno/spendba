// Date utility functions for Spend Bukit Asam

const INDONESIAN_MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
  'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
];

const INDONESIAN_FULL_MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

export function parseTenderDate(dateStr: string): Date {
  if (!dateStr) return new Date();
  // Handle 'YYYY-MM-DD HH:mm' or 'YYYY-MM-DD'
  const isoLike = dateStr.includes('T') ? dateStr : dateStr.replace(' ', 'T');
  const parsed = new Date(isoLike);
  if (!isNaN(parsed.getTime())) {
    return parsed;
  }
  // Manual fallback parse
  const parts = dateStr.split(/[- :]/);
  if (parts.length >= 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const hours = parts[3] ? parseInt(parts[3], 10) : 0;
    const minutes = parts[4] ? parseInt(parts[4], 10) : 0;
    return new Date(year, month, day, hours, minutes);
  }
  return new Date();
}

export function formatTenderDate(dateStr: string, includeTime = false): string {
  if (!dateStr) return '-';
  const d = parseTenderDate(dateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const month = INDONESIAN_MONTHS[d.getMonth()] || '';
  const year = d.getFullYear();
  
  if (!includeTime) {
    return `${day} ${month} ${year}`;
  }

  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${day} ${month} ${year}, ${hours}:${minutes} WIB`;
}

export function getDaysRemaining(closingDateStr: string, refDate: Date = new Date()): number {
  const closing = parseTenderDate(closingDateStr);
  const diffMs = closing.getTime() - refDate.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export function getHoursRemaining(closingDateStr: string, refDate: Date = new Date()): number {
  const closing = parseTenderDate(closingDateStr);
  const diffMs = closing.getTime() - refDate.getTime();
  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60)));
}
