import StatCard from './StatCard';
import DailyForecast from './DailyForecast';
import HourlyForecast from './HourlyForecast';
import styles from './LoadingState.module.css';

export default function LoadingState() {
  return (
    <div className={styles.loadingState}>
      <div className={styles.contentGrid}>

        <div className={styles.leftCol}>
          <div className={styles.skeletonCurrent}>
            <div className={styles.dotsWrap}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
            <p className={styles.loadingLabel}>Loading...</p>
          </div>

          <div className={styles.statsGrid}>
            <StatCard label="Feels Like"    skeleton />
            <StatCard label="Humidity"      skeleton />
            <StatCard label="Wind"          skeleton />
            <StatCard label="Precipitation" skeleton />
          </div>

          <DailyForecast daily={null} prefs={{}} skeleton />
        </div>

        <div className={styles.rightCol}>
          <HourlyForecast
            daily={null}
            selectedDayIndex={0}
            skeleton
          />
        </div>

      </div>
    </div>
  );
}