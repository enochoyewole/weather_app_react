import { useState, useRef, useEffect } from 'react';
import styles from './SearchBar.module.css';

/**
 * SearchBar
 * Props:
 *  suggestions  — array of Nominatim result objects
 *  isSearching  — boolean (show spinner row)
 *  onInput      — (query) => void  (debounced autocomplete)
 *  onSearch     — (query) => void  (button / Enter)
 *  onSelect     — (result) => void (click a suggestion)
 *  onClear      — () => void       (clear suggestions)
 *  showNoResults — boolean
 */
export default function SearchBar({
  suggestions, isSearching,
  onInput, onSearch, onSelect, onClear,
  showNoResults,
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  function handleInput(e) {
    setQuery(e.target.value);
    onInput(e.target.value);
  }

  function handleSearch() {
    onSearch(query);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSearch();
    if (e.key === 'Escape') onClear();
  }

  function handleSelect(result) {
    const label = result.display_name.split(',').slice(0, 3).join(', ');
    setQuery(label);
    onSelect(result);
  }

  // Close suggestions on outside click
  useEffect(() => {
    function handler(e) {
      if (!e.target.closest('[data-search-hero]')) onClear();
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClear]);

  const showSuggestions = isSearching || suggestions.length > 0;

  return (
    <section className={styles.hero} data-search-hero>
      <h1 className={styles.heroTitle}>How's the sky looking today?</h1>

      <div className={styles.searchBar}>
        <div className={styles.searchInputWrap}>
          <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            ref={inputRef}
            type="text"
            className={styles.searchInput}
            placeholder="Search for a place..."
            autoComplete="off"
            value={query}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button className={styles.searchBtn} onClick={handleSearch}>Search</button>
      </div>

      {/* Suggestions box */}
      {showSuggestions && (
        <div className={styles.suggestionsBox}>
          {isSearching && (
            <div className={styles.suggestionsSearching}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.spinnerIcon}>
                <path d="M21 12a9 9 0 1 1-6.22-8.56"/>
              </svg>
              Search in progress
            </div>
          )}
          {!isSearching && suggestions.map((r, i) => {
            const label = r.display_name.split(',').slice(0, 3).join(', ');
            return (
              <div key={i} className={styles.suggestionItem} onClick={() => handleSelect(r)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{label}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* No results */}
      {showNoResults && (
        <p className={styles.noResultsMsg}>No search result found!</p>
      )}
    </section>
  );
}
