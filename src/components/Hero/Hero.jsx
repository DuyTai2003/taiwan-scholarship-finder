import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.css';
import { useLanguage } from '../../context/LanguageContext';
import i18n from '../../data/i18n.json';

gsap.registerPlugin(ScrollTrigger);

function AnimatedCounter({ target, duration = 1500 }) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const startTime = performance.now();
    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration]);

  return <span>{count}</span>;
}

export default function Hero({ totalScholarships }) {
  const { currentLang } = useLanguage();
  const t = i18n[currentLang] || i18n.vi;
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const statsRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      // Hero section fade out + parallax lift
      gsap.to(hero, {
        opacity: 0,
        y: -60,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      // Glow pulse: shrink + fade on scroll
      gsap.to(glowRef.current, {
        opacity: 0,
        scale: 0.5,
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      // Multi-layered parallax: title, desc, stats move at different speeds
      gsap.to(titleRef.current, {
        y: 30,
        scale: 0.95,
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      gsap.to(descRef.current, {
        y: 20,
        opacity: 0.6,
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      gsap.to(statsRef.current, {
        y: 15,
        opacity: 0.5,
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className={styles.hero}>
      <div ref={glowRef} className={styles.glowPulse} />
      <motion.div
        className={styles.floatingEmoji1}
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >🇹🇼</motion.div>
      <motion.div
        className={styles.floatingEmoji2}
        animate={{ y: [0, 12, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >🎓</motion.div>
      <h1 ref={titleRef} dangerouslySetInnerHTML={{ __html: t.heroTitle }} />
      <p ref={descRef}>{t.heroDesc}</p>
      <div ref={statsRef} className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.statNum}>
            <AnimatedCounter target={totalScholarships} />
          </div>
          <div className={styles.statLabel}>{t.statScholarships}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNum}>100%</div>
          <div className={styles.statLabel}>{t.statFree}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNum}>🇻🇳</div>
          <div className={styles.statLabel}>{t.statFor}</div>
        </div>
      </div>
    </section>
  );
}
