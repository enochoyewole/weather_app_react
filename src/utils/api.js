import axios from 'axios';


export async function geocodeSearch(query) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&addressdetails=1`;
  const res = await axios.get(url, { headers: { 'Accept-Language': 'en' } });
  return res.data;
}


export async function reverseGeocode(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
  const res = await axios.get(url, { headers: { 'Accept-Language': 'en' } });
  const addr = res.data.address;
  return addr.city || addr.town || addr.village || addr.county || res.data.display_name.split(',')[0];
}


export async function fetchWeather(lat, lon) {
  const res = await axios.get('https://api.open-meteo.com/v1/forecast', {
    params: {
      latitude:     lat,
      longitude:    lon,
      current:      'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation,weather_code',
      hourly:       'temperature_2m,weather_code,precipitation',
      daily:        'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum',
      timezone:     'auto',
      forecast_days: 7,
    },
  });
  return res.data;
}
