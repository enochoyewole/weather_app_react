import CurrentWeatherCard from './CurrentWeatherCard';
import StatCard from './StatCard';
import DailyForecast from './DailyForecast';
import HourlyForecast from './HourlyForecast';
import { getWeatherIcon, WMO_DESC } from '../utils/weatherIcons';
import { fmtTemp, fmtWind, fmtPrecip, longDate } from '../utils/formatters';
import styles from './WeatherContent.module.css';


export default function WeatherContent({
  weatherData, cityName, prefs, selectedDayIndex, onDayChange,
}) {
  const { current, daily, hourly } = weatherData;

  return (
    <div className={styles.weatherContent}>
      <div className={styles.contentGrid}>

        <div className={styles.leftCol}>

          <CurrentWeatherCard
            cityName={cityName}
            date={longDate(daily.time[0])}
            temp={fmtTemp(current.temperature_2m, prefs)}
            iconSrc={getWeatherIcon(current.weather_code, current.precipitation)}
            iconAlt={WMO_DESC[current.weather_code] || ''}
          />

          <div className={styles.statsGrid}>
            <StatCard label="Feels Like"    value={fmtTemp(current.apparent_temperature, prefs)} />
            <StatCard label="Humidity"      value={`${current.relative_humidity_2m}%`} />
            <StatCard label="Wind"          value={fmtWind(current.wind_speed_10m, prefs)} />
            <StatCard label="Precipitation" value={fmtPrecip(current.precipitation, prefs)} />
          </div>

          <DailyForecast daily={daily} prefs={prefs} />

        </div>

        <div className={styles.rightCol}>
          <HourlyForecast
            hourly={hourly}
            daily={daily}
            selectedDayIndex={selectedDayIndex}
            onDayChange={onDayChange}
            prefs={prefs}
          />
        </div>

      </div>
    </div>
  );
}
