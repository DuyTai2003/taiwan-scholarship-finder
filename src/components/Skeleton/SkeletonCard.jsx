import styles from './SkeletonCard.module.css';

export default function SkeletonCard() {
  return (
    <div className={styles.skeleton} role="status" aria-label="Loading">
      <div className={styles.top}>
        <div className={styles.badge} />
        <div className={styles.date} />
      </div>
      <div className={styles.org} />
      <div className={styles.title} />
      <div className={styles.value} />
      <div className={styles.bottom}>
        <div className={styles.link} />
        <div className={styles.heart} />
      </div>
    </div>
  );
}
