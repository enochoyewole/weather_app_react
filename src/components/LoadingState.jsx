import StatCard from './StatCard';
import DailyForecast from './DailyForecast';
import HourlyForecast from './HourlyForecast';
import styles from './LoadingState.module.css';

/**
 * LoadingState — full skeleton layout matching the design exactly.
 * Uses the same grid as the weather content so the layout
 * doesn't shift when data arrives.
 */
export default function LoadingState() {
  // Dummy daily object with 7 empty slots so DailyForecast renders 7 skeleton cards
  const skeletonDaily = { time: Array(7).fill('') };

  return (
    <div className={styles.loadingState}>
      <div className={styles.contentGrid}>

        {/* LEFT COLUMN */}
        <div className={styles.leftCol}>
          {/* Skeleton current card */}
          <div className={styles.skeletonCurrent}>
            <div className={styles.dotsWrap}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
            <p className={styles.loadingLabel}>Loading...</p>
          </div>

          {/* Stat cards with dashes */}
          <div className={styles.statsGrid}>
            <StatCard label="Feels Like"    skeleton />
            <StatCard label="Humidity"      skeleton />
            <StatCard label="Wind"          skeleton />
            <StatCard label="Precipitation" skeleton />
          </div>

          {/* Daily skeleton */}
          <DailyForecast daily={skeletonDaily} prefs={{}} skeleton />
        </div>

        {/* RIGHT COLUMN */}
        <div className={styles.rightCol}>
          <HourlyForecast
            daily={skeletonDaily}
            selectedDayIndex={0}
            skeleton
          />
        </div>

      </div>
    </div>
  );
}
