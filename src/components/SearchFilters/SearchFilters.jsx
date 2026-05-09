import styles from './SearchFilters.module.css';
import { useLanguage } from '../../context/LanguageContext';
import i18n from '../../data/i18n.json';

const COVERAGE_CHIPS = [
  { key: 'all', i18nKey: 'filterAll' },
  { key: 'full', i18nKey: 'filterFull' },
  { key: 'partial', i18nKey: 'filterPartial' },
  { key: 'urgent', i18nKey: 'filterUrgent' },
];

const LEVELS = [
  { value: 'all', i18nKey: 'levelAll' },
  { value: 'associate', i18nKey: 'levelAssociate' },
  { value: 'bachelor', i18nKey: 'levelBachelor' },
  { value: 'master', i18nKey: 'levelMaster' },
  { value: 'phd', i18nKey: 'levelPhd' },
];

const TYPES = [
  { value: 'all', i18nKey: 'typeAll' },
  { value: 'gov', i18nKey: 'typeGov' },
  { value: 'uni', i18nKey: 'typeUni' },
  { value: 'org', i18nKey: 'typeOrg' },
];

export default function SearchFilters({ filters, onFilterChange }) {
  const { currentLang } = useLanguage();
  const t = i18n[currentLang] || i18n.vi;

  return (
    <div className={styles.searchSection}>
      <div className={styles.searchBox}>
        <div className={styles.searchRow}>
          <div className={styles.searchInputWrap}>
            <span className={styles.searchIcon}>🔍</span>
            <label htmlFor="search-input" className="sr-only">{t.searchPlaceholder}</label>
            <input
              id="search-input"
              className={styles.searchInput}
              type="text"
              placeholder={t.searchPlaceholder}
              value={filters.query}
              onChange={(e) => onFilterChange({ query: e.target.value })}
              aria-label={t.searchPlaceholder}
            />
          </div>
          <label htmlFor="filter-level" className="sr-only">{t.levelAll || 'Filter by level'}</label>
          <select
            id="filter-level"
            className={styles.select}
            value={filters.level}
            onChange={(e) => onFilterChange({ level: e.target.value })}
            aria-label={t.levelAll || 'Filter by education level'}
          >
            {LEVELS.map(l => (
              <option key={l.value} value={l.value}>{t[l.i18nKey] || l.value}</option>
            ))}
          </select>
          <label htmlFor="filter-type" className="sr-only">{t.typeAll || 'Filter by type'}</label>
          <select
            id="filter-type"
            className={styles.select}
            value={filters.type}
            onChange={(e) => onFilterChange({ type: e.target.value })}
            aria-label={t.typeAll || 'Filter by scholarship type'}
          >
            {TYPES.map(ty => (
              <option key={ty.value} value={ty.value}>{t[ty.i18nKey] || ty.value}</option>
            ))}
          </select>
        </div>
        <div className={styles.filterChips}>
          <span className={styles.chipLabel}>{t.quickFilter}</span>
          {COVERAGE_CHIPS.map(chip => (
            <button
              key={chip.key}
              className={`${styles.chip} ${filters.coverage === chip.key ? styles.chipActive : ''}`}
              onClick={() => onFilterChange({ coverage: chip.key })}
            >
              {t[chip.i18nKey] || chip.key}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
