import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ScholarshipCard.module.css';
import { useLanguage } from '../../context/LanguageContext';
import { useFavorites } from '../../context/FavoritesContext';
import i18n from '../../data/i18n.json';

gsap.registerPlugin(ScrollTrigger);

const LEVEL_KEY_MAP = {
  associate: 'levelAssociate',
  bachelor: 'levelBachelor',
  master: 'levelMaster',
  phd: 'levelPhd',
};

export default function ScholarshipCard({ scholarship, index }) {
  const { currentLang } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const t = i18n[currentLang] || i18n.vi;
  const [clicked, setClicked] = useState(false);
  const cardRef = useRef(null);

  const name = scholarship.name?.[currentLang] || scholarship.name?.vi || '';
  const org = scholarship.org?.[currentLang] || scholarship.org?.vi || '';
  const value = scholarship.value?.[currentLang] || scholarship.value?.vi || '';
  const expired = new Date(scholarship.deadline + 'T23:59:59') < new Date();
  const fav = isFavorite(scholarship.id);

  const levelLabels = (Array.isArray(scholarship.level) ? scholarship.level : [])
    .map(lv => t[LEVEL_KEY_MAP[lv]] || lv)
    .join(', ');

  // GSAP ScrollTrigger: reveal + scrub + floating
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // Kill any existing tweens on this element (React strict mode safety)
    gsap.killTweensOf(el);

    // Stagger delay based on index — creates ripple/wave effect
    const staggerDelay = index * 0.08;

    // Scroll reveal with scrub — GPU-accelerated transforms (no CSS skewY, no blur)
    gsap.fromTo(el,
      {
        opacity: 0,
        y: 60,
        scale: 0.82,
        rotationX: 0.5,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          end: 'top 28%',
          scrub: 1.5,
        },
        ease: 'power3.out',
        duration: 1,
        delay: staggerDelay,
        force3D: true,
      }
    );

    // Floating loop — antigravity "bồng bềnh" effect
    const floatX = (Math.random() - 0.5) * 6; // -3 to +3
    const floatY = (Math.random() - 0.5) * 10; // -5 to +5
    const floatR = (Math.random() - 0.5) * 2; // -1 to +1 deg
    const dur = 4 + Math.random() * 4; // 4–8s, slower = more cinematic

    gsap.to(el, {
      y: floatY,
      x: floatX,
      rotation: floatR,
      duration: dur,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: Math.random() * 3 + staggerDelay,
    });

    // Cleanup on unmount
    return () => {
      gsap.killTweensOf(el);
    };
  }, [index]);

  function handleFavClick(e) {
    e.stopPropagation();
    setClicked(true);
    toggleFavorite(scholarship.id);
    setTimeout(() => setClicked(false), 400);
  }

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${expired ? styles.cardExpired : ''} ${scholarship.hot ? styles.hotCard : ''}`}
      role="button"
      tabIndex={0}
      aria-label={`${name} – ${org}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.open(scholarship.link, '_blank'); } }}
      onClick={() => window.open(scholarship.link, '_blank')}
    >
      <div className={styles.cardTop}>
        <div className={styles.cardBadges}>
          {scholarship.hot && <span className={`${styles.badge} ${styles.badgeHot}`}>🔥 HOT</span>}
          {expired && <span className={`${styles.badge} ${styles.badgeExpired}`}>⚠️ {t.filterUrgent || 'Expired'}</span>}
          <span className={`${styles.badge} ${styles.badgeLevel}`}>{levelLabels}</span>
        </div>
        <div className={`${styles.cardDeadline} ${expired ? styles.cardDeadlineUrgent : ''}`}>
          📅 {scholarship.deadline}
        </div>
      </div>
      <div className={styles.cardOrg}>{org}</div>
      <h3 className={styles.cardTitle}>{name}</h3>
      <div className={styles.cardValue}>{value}</div>
      <div className={styles.cardBottom}>
        <span className={styles.cardLink}>{t.detailLink || 'View details →'}</span>
        <motion.button
          className={styles.favBtn}
          onClick={handleFavClick}
          animate={clicked ? { scale: [1, 1.3, 0.85, 1.05, 1] } : { scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 10 }}
          aria-label={fav ? (t.favRemove || 'Remove from favorites') : (t.favAdd || 'Add to favorites')}
          title={fav ? (t.favRemove || 'Remove from favorites') : (t.favAdd || 'Add to favorites')}
        >
          {fav ? '❤️' : '🤍'}
        </motion.button>
      </div>
    </div>
  );
}
