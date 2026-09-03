import { useEffect, useState } from 'react'
import { fetchWeatherByCoords } from '../services/weatherApi'

/** status: 'loading' | 'success' | 'error' */
export function useWeather(lat, lon) {
  const [status, setStatus] = useState('loading')
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    if (lat == null || lon == null) return

    setStatus('loading')
    setError(null)

    fetchWeatherByCoords(lat, lon)
      .then((data) => {
        if (!cancelled) {
          setWeather(data)
          setStatus('success')
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message)
          setStatus('error')
        }
      })

    return () => {
      cancelled = true
    }
  }, [lat, lon])

  return { status, weather, error }
}
