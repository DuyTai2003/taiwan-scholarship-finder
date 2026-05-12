/**
 * safeFetchJSON — Fetch wrapper với guard clause chống lỗi HTML fallback.
 *
 * Vấn đề: Khi SPA (Vite) không tìm thấy asset (sai base path, 404...),
 * server trả về index.html thay vì JSON. Hàm này phát hiện và ném lỗi
 * rõ ràng thay vì JSON.parse bị văng SyntaxError.
 *
 * @param {string} url - Đường dẫn đến file JSON
 * @param {Object} [options] - Tuỳ chọn fetch bổ sung
 * @param {any} [fallback] - Dữ liệu fallback nếu fetch thất bại
 * @returns {Promise<any>} Dữ liệu JSON đã parse
 */
export async function safeFetchJSON(url, options = {}, fallback = null) {
  let response;

  // --- Guard 1: fetch với try-catch (lỗi mạng, CORS, etc.) ---
  try {
    response = await fetch(url, {
      headers: { Accept: 'application/json' },
      ...options,
    });
  } catch (networkError) {
    console.error(`[safeFetchJSON] Network error fetching "${url}":`, networkError);
    if (fallback !== null) return fallback;
    throw new Error(`Không thể kết nối đến "${url}". Kiểm tra mạng hoặc CORS.`);
  }

  // --- Guard 2: Kiểm tra HTTP status (404, 500...) ---
  if (!response.ok) {
    console.error(
      `[safeFetchJSON] HTTP ${response.status} (${response.statusText}) for "${url}"`
    );
    if (fallback !== null) return fallback;
    throw new Error(`Server trả về ${response.status} cho "${url}". Có thể file không tồn tại.`);
  }

  // --- Guard 3: Kiểm tra Content-Type header ---
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json') && !contentType.includes('application/vnd.api+json')) {
    console.warn(
      `[safeFetchJSON] Content-Type không phải JSON: "${contentType}" cho "${url}". Đang kiểm tra nội dung...`
    );
  }

  // --- Guard 4: Đọc text & kiểm tra HTML fallback ---
  let text;
  try {
    text = await response.text();
  } catch (readError) {
    console.error(`[safeFetchJSON] Error reading response body for "${url}":`, readError);
    if (fallback !== null) return fallback;
    throw new Error(`Không thể đọc dữ liệu từ "${url}".`);
  }

  // Phát hiện HTML fallback (index.html của SPA)
  const trimmed = text.trimStart();
  if (
    trimmed.startsWith('<!DOCTYPE') ||
    trimmed.startsWith('<html') ||
    trimmed.startsWith('<!doctype')
  ) {
    console.error(
      `[safeFetchJSON] Nhận được HTML thay vì JSON cho "${url}". ` +
      `Có thể file không tồn tại (404) hoặc sai base path.`
    );
    if (fallback !== null) return fallback;
    throw new Error(
      `File "${url}" không được tìm thấy. Server trả về trang HTML thay vì JSON. ` +
      `Kiểm tra lại base path trong vite.config.js.`
    );
  }

  // --- Guard 5: JSON.parse với try-catch ---
  try {
    return JSON.parse(text);
  } catch (parseError) {
    console.error(
      `[safeFetchJSON] JSON parse error for "${url}". ` +
      `Nội dung nhận được (100 ký tự đầu): "${text.substring(0, 100)}"`,
      parseError
    );
    if (fallback !== null) return fallback;
    throw new Error(`Dữ liệu từ "${url}" không phải JSON hợp lệ.`);
  }
}

/**
 * safeJsonParse — Parse chuỗi JSON với validation.
 * Dùng cho các nguồn không đảm bảo (localStorage, sessionStorage...).
 *
 * @param {string} raw - Chuỗi cần parse
 * @param {any} [fallback] - Giá trị fallback nếu parse thất bại
 * @returns {any} Dữ liệu đã parse hoặc fallback
 */
export function safeJsonParse(raw, fallback = null) {
  if (!raw || typeof raw !== 'string') return fallback;

  const trimmed = raw.trim();
  if (trimmed.length === 0) return fallback;

  // Phát hiện HTML
  if (
    trimmed.startsWith('<!DOCTYPE') ||
    trimmed.startsWith('<html') ||
    trimmed.startsWith('<!doctype')
  ) {
    console.error('[safeJsonParse] Chuỗi đầu vào là HTML, không phải JSON.');
    return fallback;
  }

  try {
    return JSON.parse(trimmed);
  } catch (e) {
    console.error('[safeJsonParse] Lỗi parse JSON:', e.message);
    return fallback;
  }
}
