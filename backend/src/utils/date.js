// "15-10-2026" biçimindeki metni Date'e çevirir, geçersizse geçersiz bir Date döner
export function parseDate(value) {
  if (typeof value !== "string") return value;

  const parts = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value);
  if (!parts) return new Date(NaN);

  const day = Number(parts[1]);
  const month = Number(parts[2]);
  const year = Number(parts[3]);

  const result = new Date(Date.UTC(year, month - 1, day));
  // 31-02-2026 gibi tarihler bir sonraki aya taşar, onları reddediyoruz
  if (result.getUTCDate() !== day || result.getUTCMonth() !== month - 1) {
    return new Date(NaN);
  }
  return result;
}

// Date'i "15-10-2026" biçiminde metne çevirir
export function formatDate(date) {
  if (!(date instanceof Date)) return date;

  const dd = String(date.getUTCDate()).padStart(2, "0");
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${dd}-${mm}-${date.getUTCFullYear()}`;
}

// Bugünün başlangıcı, /events/upcoming için kullanacağız
export function todayStart() {
  const now = new Date();
  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );
}