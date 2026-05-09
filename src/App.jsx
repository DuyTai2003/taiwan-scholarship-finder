import { useCallback } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { FavoritesProvider } from './context/FavoritesContext';
import useScholarships from './hooks/useScholarships';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import SearchFilters from './components/SearchFilters/SearchFilters';
import ScholarshipGrid from './components/ScholarshipGrid/ScholarshipGrid';
import SkeletonGrid from './components/Skeleton/SkeletonGrid';
import Pagination from './components/Pagination/Pagination';
import EmptyState from './components/EmptyState/EmptyState';
import Footer from './components/Footer/Footer';
import MouseSpotlight from './components/MouseSpotlight/MouseSpotlight';

function ScholarshipApp() {
  const {
    scholarships,
    totalResults,
    totalScholarships,
    currentPage,
    totalPages,
    filters,
    suggestions,
    setFilters,
    setPage,
    loading,
  } = useScholarships();

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
    const l = window.__lenis;
    if (l) {
      const el = document.getElementById('content-start');
      if (el) l.scrollTo(el, { duration: 1.2, offset: -20 });
    }
  }, [setPage]);

  return (
    <>
      <MouseSpotlight />
      <Header />
      <Hero totalScholarships={totalScholarships} />
      <SearchFilters filters={filters} suggestions={suggestions} onFilterChange={setFilters} />
      <section id="content-start" style={{ maxWidth: 1100, margin: '26px auto', padding: '0 24px' }}>
        {loading ? (
          <SkeletonGrid count={6} />
        ) : scholarships.length > 0 ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: '0.86rem', color: 'var(--gray)' }}>
                Hiển thị <strong style={{ color: 'var(--navy)' }}>{totalResults}</strong> học bổng
              </div>
            </div>
            <ScholarshipGrid
              scholarships={scholarships}
              filterKey={`${filters.query}-${filters.level}-${filters.type}-${filters.coverage}-${currentPage}`}
            />
          </>
        ) : (
          <EmptyState onReset={() => setFilters({ query: '', level: 'all', type: 'all', coverage: 'all' })} />
        )}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </section>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <FavoritesProvider>
        <ScholarshipApp />
      </FavoritesProvider>
    </LanguageProvider>
  );
}
