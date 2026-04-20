import styles from './CurrentWeatherCard.module.css';


export default function CurrentWeatherCard({ cityName, date, temp, iconSrc, iconAlt }) {
  return (
    <div className={styles.currentCard}>
      <img
        src="/icons/bg-today-large.svg"
        alt=""
        className={styles.currentBg}
        aria-hidden="true"
      />
      <div className={styles.body}>
        <div className={styles.left}>
          <h2 className={styles.cityName}>{cityName}</h2>
          <p className={styles.date}>{date}</p>
        </div>
        <div className={styles.right}>
          <img
            src={iconSrc}
            alt={iconAlt}
            className={styles.weatherIcon}
          />
          <span className={styles.temp}>{temp}</span>
        </div>
      </div>
    </div>
  );
}
