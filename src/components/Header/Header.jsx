import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Header.module.css';
import { useLanguage } from '../../context/LanguageContext';
import i18n from '../../data/i18n.json';

gsap.registerPlugin(ScrollTrigger);

const LANG_OPTIONS = [
  { value: 'vi', label: '🌐 Tiếng Việt' },
  { value: 'en', label: '🌐 English' },
  { value: 'zh-CN', label: '🌐 简体中文' },
  { value: 'zh-TW', label: '🌐 繁體中文' },
];

export default function Header() {
  const { currentLang, setLang } = useLanguage();
  const t = i18n[currentLang] || i18n.vi;
  const headerRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const ctx = gsap.context(() => {
      // At top: slightly transparent background, subtle shadow
      // On scroll: fully opaque, stronger shadow
      gsap.fromTo(header,
        {
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
          boxShadow: '0 1px 8px rgba(13,27,62,0.04)',
          backdropFilter: 'blur(12px)',
        },
        {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0 4px 20px rgba(13,27,62,0.10)',
          backdropFilter: 'blur(16px)',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: '+=120',
            scrub: 0.5,
          },
        }
      );
    }, header);

    return () => ctx.revert();
  }, []);

  return (
    <header ref={headerRef} className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🎓</span>
          <div>
            <div className={styles.logoText}>{t.logoText}</div>
            <div className={styles.logoSub}>{t.logoSub}</div>
          </div>
        </div>
        <label htmlFor="lang-select" className="sr-only">{t.langLabel || 'Language'}</label>
        <select
          id="lang-select"
          className={styles.langSelect}
          value={currentLang}
          onChange={(e) => setLang(e.target.value)}
          aria-label={t.langLabel || 'Select language'}
        >
          {LANG_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </header>
  );
}
