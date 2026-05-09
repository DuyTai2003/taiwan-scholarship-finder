import SkeletonCard from './SkeletonCard';
import styles from '../ScholarshipGrid/ScholarshipGrid.module.css';

export default function SkeletonGrid({ count = 6 }) {
  return (
    <div className={styles.grid} role="status" aria-label="Loading scholarships">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
