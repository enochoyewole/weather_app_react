import { useState, useCallback, useRef } from 'react';
import { geocodeSearch, reverseGeocode, fetchWeather } from '../utils/api';

/**
 * useWeather — central state hook for the entire app.
 *
 * Manages:
 *  - unit preferences (temp / wind / precip)
 *  - location (lat, lon, cityName)
 *  - weather data from Open-Meteo
 *  - UI state (idle | loading | success | error | no-results)
 *  - search suggestions with debounce
 *  - selected day index for hourly forecast
 */

const DEFAULT_PREFS = { temp: 'F', wind: 'mph', precip: 'in' };

export function useWeather() {
  // ── Unit preferences ──────────────────────────────────────────
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);

  // ── App UI state ──────────────────────────────────────────────
  // 'idle' | 'loading' | 'success' | 'error' | 'no-results'
  const [appState, setAppState] = useState('idle');

  // ── Location & data ───────────────────────────────────────────
  const [location, setLocation] = useState({ lat: null, lon: null, cityName: '' });
  const [weatherData, setWeatherData] = useState(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  // ── Search suggestions ────────────────────────────────────────
  const [suggestions, setSuggestions] = useState([]);   // array of Nominatim results
  const [isSearching, setIsSearching] = useState(false); // spinner in suggestion box
  const debounceRef = useRef(null);

  // ── Internal: load weather once lat/lon are known ─────────────
  const loadWeather = useCallback(async (lat, lon, cityName) => {
    setAppState('loading');
    setSelectedDayIndex(0);
    try {
      const data = await fetchWeather(lat, lon);
      setWeatherData(data);
      setLocation({ lat, lon, cityName });
      setAppState('success');
    } catch {
      setAppState('error');
    }
  }, []);

  // ── Geolocation init on mount (called from App) ───────────────
  const initGeolocation = useCallback(() => {
    if (!navigator.geolocation) return;
    setAppState('loading');
    navigator.geolocation.getCurrentPosition(
      async pos => {
        const { latitude: lat, longitude: lon } = pos.coords;
        try {
          const cityName = await reverseGeocode(lat, lon);
          await loadWeather(lat, lon, cityName);
        } catch {
          setAppState('idle');
        }
      },
      () => setAppState('idle'),
      { timeout: 6000 }
    );
  }, [loadWeather]);

  // ── Search input debounce → suggestions ──────────────────────
  const handleSearchInput = useCallback((query) => {
    if (query.length < 2) {
      setSuggestions([]);
      setIsSearching(false);
      return;
    }
    clearTimeout(debounceRef.current);
    setIsSearching(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const results = await geocodeSearch(query);
        setSuggestions(results.slice(0, 5));
      } catch {
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);
  }, []);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
    setIsSearching(false);
  }, []);

  // ── Select a suggestion ───────────────────────────────────────
  const selectSuggestion = useCallback(async (result) => {
    clearSuggestions();
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    const addr = result.address || {};
    const cityName = addr.city || addr.town || addr.village || result.display_name.split(',')[0];
    await loadWeather(lat, lon, cityName);
  }, [clearSuggestions, loadWeather]);

  // ── Direct search (Search button / Enter key) ─────────────────
  const handleSearch = useCallback(async (query) => {
    if (!query.trim()) return;
    clearSuggestions();
    try {
      const results = await geocodeSearch(query);
      if (!results.length) {
        setAppState('no-results');
        return;
      }
      const r = results[0];
      const addr = r.address || {};
      const lat = parseFloat(r.lat);
      const lon = parseFloat(r.lon);
      const cityName = addr.city || addr.town || addr.village || r.display_name.split(',')[0];
      await loadWeather(lat, lon, cityName);
    } catch {
      setAppState('error');
    }
  }, [clearSuggestions, loadWeather]);

  // ── Retry ─────────────────────────────────────────────────────
  const retry = useCallback(() => {
    if (location.lat && location.lon) {
      loadWeather(location.lat, location.lon, location.cityName);
    } else {
      setAppState('idle');
    }
  }, [location, loadWeather]);

  // ── Unit preference helpers ───────────────────────────────────
  const setPref = useCallback((key, val) => {
    setPrefs(prev => ({ ...prev, [key]: val }));
  }, []);

  const applyMetric = useCallback(() => {
    setPrefs({ temp: 'C', wind: 'kmh', precip: 'mm' });
  }, []);

  const applyImperial = useCallback(() => {
    setPrefs({ temp: 'F', wind: 'mph', precip: 'in' });
  }, []);

  const isMetric  = prefs.temp === 'C' && prefs.wind === 'kmh' && prefs.precip === 'mm';
  const isImperial = prefs.temp === 'F' && prefs.wind === 'mph' && prefs.precip === 'in';

  return {
    // state
    prefs, appState, weatherData, location,
    selectedDayIndex, setSelectedDayIndex,
    suggestions, isSearching,
    isMetric, isImperial,
    // actions
    initGeolocation,
    handleSearchInput,
    handleSearch,
    clearSuggestions,
    selectSuggestion,
    retry,
    setPref,
    applyMetric,
    applyImperial,
  };
}
