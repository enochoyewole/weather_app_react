import styles from './ErrorState.module.css';


export default function ErrorState({ onRetry }) {
  return (
    <div className={styles.errorState}>
      <svg className={styles.errorIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
      </svg>

      <h2 className={styles.errorTitle}>Something went wrong</h2>
      <p className={styles.errorDesc}>
        We couldn't connect to the server (API error). Please try again in a few moments.
      </p>

      <button className={styles.retryBtn} onClick={onRetry}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
          <polyline points="1 4 1 10 7 10"/>
          <path d="M3.51 15a9 9 0 1 0 .49-3.84"/>
        </svg>
        Retry
      </button>
    </div>
  );
}
