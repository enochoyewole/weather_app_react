/**
 * Unit formatters — each takes a raw API value and a prefs object
 * and returns a formatted display string.
 */

export function fmtTemp(celsius, prefs) {
  if (prefs.temp === 'F') return `${Math.round(celsius * 9 / 5 + 32)}°`;
  return `${Math.round(celsius)}°`;
}

export function fmtWind(kmh, prefs) {
  if (prefs.wind === 'mph') return `${Math.round(kmh * 0.621371)} mph`;
  return `${Math.round(kmh)} km/h`;
}

export function fmtPrecip(mm, prefs) {
  if (prefs.precip === 'in') return `${(mm * 0.0393701).toFixed(2)} in`;
  return `${mm.toFixed(1)} mm`;
}

/**
 * Date helpers
 */
const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAYS_LONG  = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function dayNameShort(dateStr) {
  return DAYS_SHORT[new Date(dateStr + 'T00:00:00').getDay()];
}

export function dayNameLong(dateStr) {
  return DAYS_LONG[new Date(dateStr + 'T00:00:00').getDay()];
}

export function isToday(dateStr) {
  return dateStr === new Date().toISOString().split('T')[0];
}

export function longDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', {
    weekday: 'long', month: 'short', day: 'numeric', year: 'numeric',
  });
}

export function fmtHour(isoStr) {
  const d = new Date(isoStr);
  let h = d.getHours();
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h} ${ampm}`;
}
