import { useState, useMemo, useCallback } from 'react';
import scholarships from '../data/scholarships.json';
import { fuzzyMatch } from '../utils/fuzzySearch';
import { Trie } from '../utils/trie';

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
function getSearchIndex() {
  if (!_searchIndex) {
    _searchIndex = buildSearchIndex(scholarships);
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
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState('all');
  const [type, setType] = useState('all');
  const [coverage, setCoverage] = useState('all');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 15;

  const filteredData = useMemo(() => {
    return scholarships.filter(s => {
      const matchQ = matchSearch(s, query);
      const matchLevel = level === 'all' || (Array.isArray(s.level) && s.level.includes(level));
      const matchType = type === 'all' || s.type === type;
      const matchCoverage = coverage === 'all' || s.coverage === coverage;
      return matchQ && matchLevel && matchType && matchCoverage;
    });
  }, [query, level, type, coverage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const pageData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Autocomplete suggestions based on current query
  const suggestions = useMemo(() => {
    if (!query || query.length < 2) return [];
    const trie = getSearchIndex();
    return trie.suggest(query, 5);
  }, [query]);

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
  };
}
