import { useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import styles from './MouseSpotlight.module.css';

export default function MouseSpotlight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 15 });

  useEffect(() => {
    const handler = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [mouseX, mouseY]);

  return (
    <div
      className={styles.spotlight}
      style={{
        '--mx': springX,
        '--my': springY,
      }}
    />
  );
}
