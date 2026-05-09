import styles from './ScholarshipGrid.module.css';
import ScholarshipCard from './ScholarshipCard';

export default function ScholarshipGrid({ scholarships, filterKey }) {
  return (
    <div className={styles.grid} key={filterKey}>
      {scholarships.map((s, i) => (
        <ScholarshipCard key={s.id} scholarship={s} index={i} />
      ))}
    </div>
  );
}
