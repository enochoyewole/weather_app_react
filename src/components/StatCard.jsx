import styles from './StatCard.module.css';


export default function StatCard({ label, value, skeleton = false }) {
  return (
    <div className={styles.statCard}>
      <span className={styles.statLabel}>{label}</span>
      <span className={`${styles.statValue} ${skeleton ? styles.skeleton : ''}`}>
        {skeleton ? '—' : value}
      </span>
    </div>
  );
}
