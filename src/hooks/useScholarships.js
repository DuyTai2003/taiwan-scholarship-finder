import { useState, useMemo, useCallback } from 'react';
import scholarships from '../data/scholarships.json';

function norm(str) {
  if (!str) return '';
  return str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
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
  return fields.some(f => f && (norm(f).includes(nq) || f.toLowerCase().includes(query.toLowerCase())));
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
    setFilters,
    setPage,
    loading,
    isExpired,
  };
}
