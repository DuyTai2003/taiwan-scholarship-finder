import { useState, useMemo, useCallback, useEffect } from 'react';
import scholarshipsStatic from '../data/scholarships.json';
import { fuzzyMatch } from '../utils/fuzzySearch';
import { Trie } from '../utils/trie';
import { safeFetchJSON } from '../utils/safeFetchJSON';

// ── Guard: validate static import ──────────────────────────────────────────
function isValidScholarshipData(data) {
  return data && Array.isArray(data) && data.length > 0;
}

const STATIC_DATA_VALID = isValidScholarshipData(scholarshipsStatic);
if (!STATIC_DATA_VALID) {
  console.error(
    '[useScholarships] Static import của scholarships.json không hợp lệ: ' +
    `nhận được ${typeof scholarshipsStatic}${Array.isArray(scholarshipsStatic) ? ` với ${scholarshipsStatic.length} phần tử` : ''}. ` +
    'Sẽ thử fetch lại từ server...'
  );
}

// ── Fallback data (tránh crash hoàn toàn) ──────────────────────────────────
const FALLBACK_DATA = [];

function norm(str) {
  if (!str) return '';
  return str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
}

/**
 * Build Trie index from all scholarship searchable fields.
 * Returns a Trie containing all unique searchable terms.
 */
function buildSearchIndex(data) {
  const trie = new Trie();
  if (!data || !Array.isArray(data)) return trie;
  const seen = new Set();
  for (const s of data) {
    const fields = [
      s.name?.vi, s.name?.en, s.name?.['zh-CN'], s.name?.['zh-TW'],
      s.org?.vi, s.org?.en, s.org?.['zh-CN'], s.org?.['zh-TW'],
      ...(s.keywords || []),
    ];
    for (const f of fields) {
      if (f && !seen.has(f)) {
        seen.add(f);
        trie.insert(f);
        // Also index normalized version
        const normalized = norm(f);
        if (normalized !== f) trie.insert(normalized);
      }
    }
  }
  return trie;
}

// Build index once at module level (lazy)
let _searchIndex = null;
function getSearchIndex(data) {
  if (!_searchIndex) {
    _searchIndex = buildSearchIndex(data);
  }
  return _searchIndex;
}

function matchSearch(scholarship, query) {
  if (!query) return true;
  const nq = norm(query);
  const fields = [
    scholarship.name?.vi, scholarship.name?.en,
    scholarship.name?.['zh-CN'], scholarship.name?.['zh-TW'],
    scholarship.org?.vi, scholarship.org?.en,
    scholarship.org?.['zh-CN'], scholarship.org?.['zh-TW'],
    ...(scholarship.keywords || [])
  ];

  // Try exact substring first (fast path)
  const exactMatch = fields.some(f => f && (norm(f).includes(nq) || f.toLowerCase().includes(query.toLowerCase())));
  if (exactMatch) return true;

  // Fall back to fuzzy search for typo tolerance
  return fields.some(f => f && fuzzyMatch(nq, norm(f)));
}

function isExpired(deadline) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const d = new Date(deadline);
  d.setHours(0, 0, 0, 0);
  return d < now;
}

export { isExpired };

export default function useScholarships() {
  // ── State: dữ liệu gốc (có thể load từ static import hoặc fetch fallback) ─
  const [scholarships, setScholarships] = useState(() =>
    STATIC_DATA_VALID ? scholarshipsStatic : FALLBACK_DATA
  );
  const [dataError, setDataError] = useState(
    STATIC_DATA_VALID ? null : 'Dữ liệu học bổng không khả dụng.'
  );

  const [query, setQuery] = useState('');
  const [level, setLevel] = useState('all');
  const [type, setType] = useState('all');
  const [coverage, setCoverage] = useState('all');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 15;

  // ── Fetch fallback nếu static import không hợp lệ ────────────────────────
  useEffect(() => {
    if (STATIC_DATA_VALID) return; // Static import OK, không cần fetch

    let cancelled = false;
    const DATA_URL = import.meta.env.BASE_URL + 'scholarships.json';

    safeFetchJSON(DATA_URL, {}, null)
      .then((json) => {
        if (cancelled) return;
        if (isValidScholarshipData(json)) {
          setScholarships(json);
          setDataError(null);
          // Rebuild search index với dữ liệu mới
          _searchIndex = null;
        } else {
          setDataError('Không thể tải dữ liệu học bổng. Vui lòng thử lại sau.');
          console.error('[useScholarships] Fetch fallback: dữ liệu không hợp lệ');
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setDataError(err.message || 'Lỗi không xác định khi tải dữ liệu.');
        console.error('[useScholarships] Fetch fallback thất bại:', err);
      });

    return () => { cancelled = true; };
  }, []);

  const filteredData = useMemo(() => {
    if (!Array.isArray(scholarships)) return [];
    return scholarships.filter(s => {
      const matchQ = matchSearch(s, query);
      const matchLevel = level === 'all' || (Array.isArray(s.level) && s.level.includes(level));
      const matchType = type === 'all' || s.type === type;
      const matchCoverage = coverage === 'all' || s.coverage === coverage;
      return matchQ && matchLevel && matchType && matchCoverage;
    });
  }, [scholarships, query, level, type, coverage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const pageData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Autocomplete suggestions based on current query
  const suggestions = useMemo(() => {
    if (!query || query.length < 2) return [];
    const trie = getSearchIndex(scholarships);
    return trie.suggest(query, 5);
  }, [query, scholarships]);

  const setFilters = useCallback(({ query: q, level: l, type: t, coverage: c } = {}) => {
    setLoading(true);
    if (q !== undefined) setQuery(q);
    if (l !== undefined) setLevel(l);
    if (t !== undefined) setType(t);
    if (c !== undefined) setCoverage(c);
    setPage(1);
    // Simulate async filter to show skeleton
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setLoading(false));
    });
  }, []);

  return {
    scholarships: pageData,
    totalResults: filteredData.length,
    totalScholarships: scholarships.length,
    currentPage: page,
    totalPages,
    filters: { query, level, type, coverage },
    suggestions,
    setFilters,
    setPage,
    loading,
    isExpired,
    dataError,
  };
}
