import { useState, useEffect, useRef } from 'react';
import styles from './Navbar.module.css';


export default function Navbar({ prefs, isMetric, isImperial, onSetPref, onApplyMetric, onApplyImperial }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const switchLabel = isMetric ? 'Switch to Imperial' : 'Switch to Metric';

  function handleSwitch() {
    if (isMetric) onApplyImperial();
    else onApplyMetric();
    setOpen(false);
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLogo}>
        <img src="/icons/logo.svg" alt="Weather Now" className={styles.logoImg} />
      </div>

      <div className={styles.unitsDropdown} ref={dropdownRef}>
        <button
          className={styles.unitsBtn}
          onClick={() => setOpen(o => !o)}
          aria-haspopup="true"
          aria-expanded={open}
        >
          <svg className={styles.unitsIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14M12 2v2M12 20v2M2 12h2M20 12h2"/>
          </svg>
          Units
          <svg className={`${styles.dropdownArrow} ${open ? styles.open : ''}`} viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 1l4 4 4-4"/>
          </svg>
        </button>

        {open && (
          <div className={styles.dropdownMenu} role="menu">
            <button className={styles.switchBtn} onClick={handleSwitch} role="menuitem">
              {switchLabel}
            </button>

            <div className={styles.sectionLabel}>Temperature</div>
            <DropdownOption label="Celsius (°C)"    active={prefs.temp === 'C'} onClick={() => onSetPref('temp', 'C')} />
            <DropdownOption label="Fahrenheit (°F)" active={prefs.temp === 'F'} onClick={() => onSetPref('temp', 'F')} />

            <div className={styles.sectionLabel}>Wind Speed</div>
            <DropdownOption label="km/h" active={prefs.wind === 'kmh'} onClick={() => onSetPref('wind', 'kmh')} />
            <DropdownOption label="mph"  active={prefs.wind === 'mph'} onClick={() => onSetPref('wind', 'mph')} />

            <div className={styles.sectionLabel}>Precipitation</div>
            <DropdownOption label="Millimeters (mm)" active={prefs.precip === 'mm'} onClick={() => onSetPref('precip', 'mm')} />
            <DropdownOption label="Inches (in)"      active={prefs.precip === 'in'} onClick={() => onSetPref('precip', 'in')} />
          </div>
        )}
      </div>
    </nav>
  );
}

function DropdownOption({ label, active, onClick }) {
  return (
    <button
      className={`${styles.dropdownOption} ${active ? styles.active : ''}`}
      onClick={onClick}
      role="menuitem"
    >
      {label}
      <svg className={styles.optionCheck} viewBox="0 0 14 11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 5.5 5 9.5 13 1.5"/>
      </svg>
    </button>
  );
}
