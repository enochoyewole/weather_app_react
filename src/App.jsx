import { useEffect } from 'react';
import { useWeather } from './hooks/useWeather';

import Navbar         from './components/Navbar';
import SearchBar      from './components/SearchBar';
import LoadingState   from './components/LoadingState';
import ErrorState     from './components/ErrorState';
import WeatherContent from './components/WeatherContent';

import styles from './App.module.css';

/**
 * App — root component.
 *
 * Owns no state itself — all state lives in useWeather().
 * Renders the correct UI state based on appState:
 *   'idle'       → just the hero search
 *   'loading'    → skeleton layout
 *   'success'    → full weather data
 *   'error'      → error screen with retry
 *   'no-results' → "No search result found!" inline
 */
export default function App() {
  const {
    prefs, appState, weatherData, location,
    selectedDayIndex, setSelectedDayIndex,
    suggestions, isSearching,
    isMetric, isImperial,
    initGeolocation,
    handleSearchInput,
    handleSearch,
    clearSuggestions,
    selectSuggestion,
    retry,
    setPref,
    applyMetric,
    applyImperial,
  } = useWeather();

  // Try geolocation once on mount
  useEffect(() => {
    initGeolocation();
  }, [initGeolocation]);

  return (
    <div className={styles.appWrapper}>

      {/* ── Navbar (always visible) ── */}
      <Navbar
        prefs={prefs}
        isMetric={isMetric}
        isImperial={isImperial}
        onSetPref={setPref}
        onApplyMetric={applyMetric}
        onApplyImperial={applyImperial}
      />

      {/* ── Main content ── */}
      <main className={styles.mainContainer}>

        {/* Search bar — hidden during error state, visible otherwise */}
        {appState !== 'error' && (
          <SearchBar
            suggestions={suggestions}
            isSearching={isSearching}
            onInput={handleSearchInput}
            onSearch={handleSearch}
            onSelect={selectSuggestion}
            onClear={clearSuggestions}
            showNoResults={appState === 'no-results'}
          />
        )}

        {/* Loading skeleton */}
        {appState === 'loading' && <LoadingState />}

        {/* Error screen */}
        {appState === 'error' && <ErrorState onRetry={retry} />}

        {/* Weather data */}
        {appState === 'success' && weatherData && (
          <WeatherContent
            weatherData={weatherData}
            cityName={location.cityName}
            prefs={prefs}
            selectedDayIndex={selectedDayIndex}
            onDayChange={setSelectedDayIndex}
          />
        )}

      </main>
    </div>
  );
}
