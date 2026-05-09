import { useRef } from 'react';
import styles from './Pagination.module.css';
import { useLanguage } from '../../context/LanguageContext';
import i18n from '../../data/i18n.json';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const { currentLang } = useLanguage();
  const t = i18n[currentLang] || i18n.vi;
  const inputRef = useRef(null);

  if (totalPages <= 1) return null;

  const goTo = (page) => {
    onPageChange(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  const handleGoto = () => {
    const val = parseInt(inputRef.current?.value);
    if (!isNaN(val) && val >= 1 && val <= totalPages) {
      goTo(val);
      inputRef.current.value = '';
    }
  };

  return (
    <nav className={styles.pagination} role="navigation" aria-label={t.paginationLabel || 'Pagination'}>
      <button
        className={styles.pageBtn}
        disabled={currentPage === 1}
        onClick={() => goTo(1)}
        aria-label={t.pageFirst || 'First page'}
      >
        «
      </button>
      <button
        className={styles.pageBtn}
        disabled={currentPage === 1}
        onClick={() => { if (currentPage > 1) goTo(currentPage - 1); }}
        aria-label={t.pagePrev || 'Previous page'}
      >
        ‹
      </button>
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`dots${i}`} className={styles.dots}>...</span>
        ) : (
          <button
            key={p}
            className={`${styles.pageBtn} ${p === currentPage ? styles.pageBtnActive : ''}`}
            onClick={() => goTo(p)}
          >
            {p}
          </button>
        )
      )}
      <button
        className={styles.pageBtn}
        disabled={currentPage === totalPages}
        onClick={() => { if (currentPage < totalPages) goTo(currentPage + 1); }}
        aria-label={t.pageNext || 'Next page'}
      >
        ›
      </button>
      <button
        className={styles.pageBtn}
        disabled={currentPage === totalPages}
        onClick={() => goTo(totalPages)}
        aria-label={t.pageLast || 'Last page'}
      >
        »
      </button>
      <div className={styles.gotoWrap}>
        <label htmlFor="goto-page" className="sr-only">{t.pageGoTo || 'Go to page'}</label>
        <input
          id="goto-page"
          ref={inputRef}
          className={styles.gotoInput}
          type="number"
          min={1}
          max={totalPages}
          placeholder={`1–${totalPages}`}
          onKeyDown={(e) => { if (e.key === 'Enter') handleGoto(); }}
          aria-label={t.pageGoTo || 'Go to page number'}
        />
        <button className={styles.gotoBtn} onClick={handleGoto} aria-label={t.pageGo || 'Go'}>
          {t.pageGo || 'Đến'}
        </button>
      </div>
    </nav>
  );
}
