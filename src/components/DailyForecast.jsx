import styles from './DailyForecast.module.css';
import { getWeatherIcon, WMO_DESC } from '../utils/weatherIcons';
import { fmtTemp, dayNameShort, isToday } from '../utils/formatters';

export default function DailyForecast({ daily, prefs, skeleton = false }) {
  if (skeleton || !daily) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.sectionTitle}>Daily forecast</p>
        <div className={styles.grid}>
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className={styles.skelCard} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.sectionTitle}>Daily forecast</p>
      <div className={styles.grid}>
        {daily.time.map((dateStr, i) => (
          <DayCard
            key={dateStr}
            dateStr={dateStr}
            wmoCode={daily.weather_code[i]}
            precip={daily.precipitation_sum[i]}
            maxTemp={daily.temperature_2m_max[i]}
            minTemp={daily.temperature_2m_min[i]}
            prefs={prefs}
          />
        ))}
      </div>
    </div>
  );
}

function DayCard({ dateStr, wmoCode, precip, maxTemp, minTemp, prefs }) {
  const today   = isToday(dateStr);
  const label   = today ? 'Today' : dayNameShort(dateStr);
  const iconSrc = getWeatherIcon(wmoCode, precip);
  const iconAlt = WMO_DESC[wmoCode] || '';

  return (
    <div className={`${styles.dayCard} ${today ? styles.today : ''}`}>
      <span className={styles.dayLabel}>{label}</span>
      <img
        src={iconSrc}
        alt={iconAlt}
        className={styles.dayIcon}
        onError={e => { e.target.style.display = 'none'; }}
      />
      <div className={styles.temps}>
        <span className={styles.high}>{fmtTemp(maxTemp, prefs)}</span>
        <span className={styles.low}>{fmtTemp(minTemp, prefs)}</span>
      </div>
    </div>
  );
}