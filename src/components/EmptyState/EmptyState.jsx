import styles from './EmptyState.module.css';
import { useLanguage } from '../../context/LanguageContext';
import i18n from '../../data/i18n.json';

export default function EmptyState({ onReset }) {
  const { currentLang } = useLanguage();
  const t = i18n[currentLang] || i18n.vi;

  return (
    <div className={styles.empty} role="status" aria-live="polite">
      <div className={styles.emptyIcon} aria-hidden="true">🔭</div>
      <h3>{t.emptyTitle}</h3>
      <p>{t.emptyDesc}</p>
      {onReset && (
        <button className={styles.resetBtn} onClick={onReset} aria-label={t.emptyReset}>
          {t.emptyReset || 'Clear filters'}
        </button>
      )}
    </div>
  );
}
