import { useEffect } from 'react';
import { useWeather } from './hooks/useWeather';

import Navbar         from './components/Navbar';
import SearchBar      from './components/SearchBar';
import LoadingState   from './components/LoadingState';
import ErrorState     from './components/ErrorState';
import WeatherContent from './components/WeatherContent';

import styles from './App.module.css';


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

  
  useEffect(() => {
    initGeolocation();
  }, [initGeolocation]);

  return (
    <div className={styles.appWrapper}>

      <Navbar
        prefs={prefs}
        isMetric={isMetric}
        isImperial={isImperial}
        onSetPref={setPref}
        onApplyMetric={applyMetric}
        onApplyImperial={applyImperial}
      />

      <main className={styles.mainContainer}>

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

        {appState === 'loading' && <LoadingState />}

        {appState === 'error' && <ErrorState onRetry={retry} />}

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
