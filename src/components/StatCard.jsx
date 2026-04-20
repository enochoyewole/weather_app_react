import styles from './StatCard.module.css';

/**
 * StatCard — reusable card for Feels Like, Humidity, Wind, Precipitation
 * Props:
 *  label — string  e.g. "Feels Like"
 *  value — string  e.g. "64°"
 *  skeleton — boolean  (loading state, shows dash)
 */
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
