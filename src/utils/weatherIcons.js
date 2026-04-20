
export function getWeatherIcon(wmoCode, precipMm) {
  if ([95, 96, 99].includes(wmoCode))                       return '/icons/icon-storm.webp';
  if ([71, 73, 75, 77, 85, 86].includes(wmoCode))           return '/icons/icon-snow.webp';
  if ([45, 48].includes(wmoCode))                           return '/icons/icon-fog.webp';
  if ([51, 53, 55].includes(wmoCode))                       return '/icons/icon-drizzle.webp';
  if ([61, 63, 65, 80, 81, 82].includes(wmoCode) ||
      (precipMm != null && precipMm > 0.1))                 return '/icons/icon-rain.webp';
  if (wmoCode === 3)                                        return '/icons/icon-overcast.webp';
  if ([1, 2].includes(wmoCode))                             return '/icons/icon-partly-cloudy.webp';
  if (wmoCode === 0)                                        return '/icons/icon-sunny.webp';
  return '/icons/icon-sunny.webp';
}

export const WMO_DESC = {
  0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Fog', 48: 'Depositing rime fog',
  51: 'Light drizzle', 53: 'Drizzle', 55: 'Heavy drizzle',
  61: 'Light rain', 63: 'Rain', 65: 'Heavy rain',
  71: 'Light snow', 73: 'Snow', 75: 'Heavy snow', 77: 'Snow grains',
  80: 'Rain showers', 81: 'Rain showers', 82: 'Heavy rain showers',
  85: 'Snow showers', 86: 'Snow showers',
  95: 'Thunderstorm', 96: 'Thunderstorm with hail', 99: 'Thunderstorm with heavy hail',
};
