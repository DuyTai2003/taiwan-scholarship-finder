import styles from './Footer.module.css';
import { useLanguage } from '../../context/LanguageContext';
import i18n from '../../data/i18n.json';

export default function Footer() {
  const { currentLang } = useLanguage();
  const t = i18n[currentLang] || i18n.vi;

  return (
    <footer className={styles.footer} role="contentinfo" aria-label={t.footerLabel || 'Footer'}>
      <p>
        {t.footerBuilt} <strong>{t.myName}</strong> · {t.footerData} · 2026
      </p>
      <p className={styles.footerExtra}>{t.footerProject}</p>
    </footer>
  );
}
