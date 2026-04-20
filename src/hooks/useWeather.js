import { useState, useCallback, useRef } from 'react';
import { geocodeSearch, reverseGeocode, fetchWeather } from '../utils/api';

const DEFAULT_PREFS = { temp: 'F', wind: 'mph', precip: 'in' };

export function useWeather() {
  const [prefs, setPrefs]               = useState(DEFAULT_PREFS);
  const [appState, setAppState]         = useState('idle');
  const [location, setLocation]         = useState({ lat: null, lon: null, cityName: '' });
  const [weatherData, setWeatherData]   = useState(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [suggestions, setSuggestions]   = useState([]);
  const [isSearching, setIsSearching]   = useState(false);
  const debounceRef = useRef(null);

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

  const initGeolocation = useCallback(() => {
    if (!navigator.geolocation) {
      setAppState('idle');
      return;
    }
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
      { timeout: 7000 }
    );
  }, [loadWeather]);

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

  const selectSuggestion = useCallback(async (result) => {
    clearSuggestions();
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    const addr = result.address || {};
    const cityName = addr.city || addr.town || addr.village || result.display_name.split(',')[0];
    await loadWeather(lat, lon, cityName);
  }, [clearSuggestions, loadWeather]);

  const handleSearch = useCallback(async (query) => {
    if (!query.trim()) return;
    clearSuggestions();
    setAppState('loading');
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

  const retry = useCallback(() => {
    if (location.lat && location.lon) {
      loadWeather(location.lat, location.lon, location.cityName);
    } else {
      setAppState('idle');
    }
  }, [location, loadWeather]);

  const setPref = useCallback((key, val) => {
    setPrefs(prev => ({ ...prev, [key]: val }));
  }, []);

  const applyMetric = useCallback(() => {
    setPrefs({ temp: 'C', wind: 'kmh', precip: 'mm' });
  }, []);

  const applyImperial = useCallback(() => {
    setPrefs({ temp: 'F', wind: 'mph', precip: 'in' });
  }, []);

  const isMetric   = prefs.temp === 'C'  && prefs.wind === 'kmh' && prefs.precip === 'mm';
  const isImperial = prefs.temp === 'F'  && prefs.wind === 'mph' && prefs.precip === 'in';

  return {
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
  };
}