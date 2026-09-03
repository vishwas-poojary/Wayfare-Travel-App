const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'
const GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct'

export class WeatherApiError extends Error {}

/** Fetch current weather for a lat/lon pair. Returns a normalised shape. */
export async function fetchWeatherByCoords(lat, lon, units = 'metric') {
  if (!API_KEY) {
    throw new WeatherApiError('Missing VITE_OPENWEATHER_API_KEY. Add it to your .env file.')
  }
  const url = `${BASE_URL}?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
  const res = await fetch(url)
  if (!res.ok) {
    throw new WeatherApiError(`Weather request failed (${res.status})`)
  }
  const data = await res.json()
  return normaliseWeather(data, units)
}

/** Resolve a free-text place name to coordinates, then fetch weather. */
export async function fetchWeatherByPlaceName(query, units = 'metric') {
  if (!API_KEY) {
    throw new WeatherApiError('Missing VITE_OPENWEATHER_API_KEY. Add it to your .env file.')
  }
  const geoRes = await fetch(`${GEO_URL}?q=${encodeURIComponent(query)}&limit=1&appid=${API_KEY}`)
  if (!geoRes.ok) throw new WeatherApiError(`Location lookup failed (${geoRes.status})`)
  const geo = await geoRes.json()
  if (!geo.length) throw new WeatherApiError(`No location found for "${query}"`)
  const { lat, lon, name, country } = geo[0]
  const weather = await fetchWeatherByCoords(lat, lon, units)
  return { ...weather, resolvedName: name, resolvedCountry: country, lat, lon }
}

function normaliseWeather(data, units) {
  return {
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    condition: data.weather?.[0]?.main ?? 'Unknown',
    description: data.weather?.[0]?.description ?? '',
    icon: data.weather?.[0]?.icon ?? '01d',
    humidity: data.main.humidity,
    windSpeed: data.wind?.speed ?? 0,
    units,
    cityName: data.name,
    raw: data,
  }
}

export function weatherIconUrl(icon) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`
}
