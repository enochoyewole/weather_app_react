import styles from './HourlyForecast.module.css';
import { getWeatherIcon } from '../utils/weatherIcons';
import { fmtTemp, fmtHour, dayNameLong, isToday } from '../utils/formatters';

/**
 * HourlyForecast — right-column card with day selector + scrollable hour list
 * Props:
 *  hourly           — Open-Meteo hourly object
 *  daily            — Open-Meteo daily object (for day selector options)
 *  selectedDayIndex — number
 *  onDayChange      — (index) => void
 *  prefs            — { temp, wind, precip }
 *  skeleton         — boolean
 */
export default function HourlyForecast({
  hourly, daily, selectedDayIndex, onDayChange, prefs, skeleton = false,
}) {
  const targetDate = daily?.time[selectedDayIndex];

  // Filter hourly entries for the selected day
  const hourlyItems = !skeleton && hourly
    ? hourly.time.reduce((acc, isoStr, i) => {
        if (isoStr.split('T')[0] === targetDate) {
          acc.push({
            isoStr,
            temp: hourly.temperature_2m[i],
            wmoCode: hourly.weather_code[i],
            precip: hourly.precipitation ? hourly.precipitation[i] : 0,
          });
        }
        return acc;
      }, [])
    : [];

  return (
    <div className={styles.hourlyCard}>
      <div className={styles.header}>
        <span className={styles.sectionTitle}>Hourly forecast</span>

        {skeleton ? (
          <div className={styles.skelPill} />
        ) : (
          <div className={styles.daySelectorWrap}>
            <select
              className={styles.daySelector}
              value={selectedDayIndex}
              onChange={e => onDayChange(parseInt(e.target.value))}
              aria-label="Select day"
            >
              {daily.time.map((dateStr, i) => (
                <option key={dateStr} value={i}>
                  {isToday(dateStr) ? 'Today' : dayNameLong(dateStr)}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className={styles.list}>
        {skeleton
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={styles.skelRow} />
            ))
          : hourlyItems.map(({ isoStr, temp, wmoCode, precip }) => (
              <HourlyItem
                key={isoStr}
                time={fmtHour(isoStr)}
                temp={fmtTemp(temp, prefs)}
                iconSrc={getWeatherIcon(wmoCode, precip)}
              />
            ))
        }
      </div>
    </div>
  );
}

/**
 * HourlyItem — single row (icon + time on left, temp on right)
 * Reused once per visible hour
 */
function HourlyItem({ time, temp, iconSrc }) {
  return (
    <div className={styles.hourlyItem}>
      <div className={styles.left}>
        <img
          src={iconSrc}
          alt=""
          className={styles.hourlyIcon}
          onError={e => { e.target.style.display = 'none'; }}
        />
        <span className={styles.hourlyTime}>{time}</span>
      </div>
      <span className={styles.hourlyTemp}>{temp}</span>
    </div>
  );
}
