import { createContext, useCallback, useContext, useState } from 'react'
import { fetchWeatherByCoords, fetchWeatherByPlaceName } from '../services/weatherApi'

const LocationContext = createContext(null)

// status: 'idle' | 'locating' | 'granted' | 'denied' | 'unsupported' | 'manual' | 'error'
export function LocationProvider({ children }) {
  const [status, setStatus] = useState('idle')
  const [place, setPlace] = useState(null) // { name, country, lat, lon }
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)

  const requestBrowserLocation = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setStatus('unsupported')
      return
    }
    setStatus('locating')
    setError(null)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords
          const w = await fetchWeatherByCoords(latitude, longitude)
          setPlace({ name: w.cityName, country: '', lat: latitude, lon: longitude })
          setWeather(w)
          setStatus('granted')
        } catch (err) {
          setError(err.message)
          setStatus('error')
        }
      },
      () => {
        setStatus('denied')
      },
      { timeout: 10000 },
    )
  }, [])

  const setLocationByName = useCallback(async (query) => {
    setStatus('locating')
    setError(null)
    try {
      const w = await fetchWeatherByPlaceName(query)
      setPlace({ name: w.resolvedName, country: w.resolvedCountry, lat: w.lat, lon: w.lon })
      setWeather(w)
      setStatus('manual')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }, [])

  const clearLocation = useCallback(() => {
    setPlace(null)
    setWeather(null)
    setStatus('idle')
    setError(null)
  }, [])

  return (
    <LocationContext.Provider
      value={{ status, place, weather, error, requestBrowserLocation, setLocationByName, clearLocation }}
    >
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  const ctx = useContext(LocationContext)
  if (!ctx) throw new Error('useLocation must be used within LocationProvider')
  return ctx
}
