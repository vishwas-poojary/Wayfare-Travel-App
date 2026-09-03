import { useState } from 'react'
import { useLocation } from '../context/LocationContext'
import { weatherIconUrl } from '../services/weatherApi'
import { LoadingSpinner, ErrorState } from './StateViews'

export default function LocationPicker() {
  const { status, place, weather, error, requestBrowserLocation, setLocationByName, clearLocation } =
    useLocation()
  const [query, setQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) setLocationByName(query.trim())
  }

  return (
    <div className="rounded-2xl border border-ink-900/10 bg-white/70 p-5 shadow-soft sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-lg text-ink-900">Your weather, right now</h3>
        {(status === 'granted' || status === 'manual') && (
          <button onClick={clearLocation} className="text-xs text-ink-600/60 underline-offset-2 hover:underline">
            Reset
          </button>
        )}
      </div>

      {status === 'idle' && (
        <div className="mt-4 space-y-3">
          <p className="text-sm text-ink-600/70">
            Share your location for local conditions, or search for a place instead.
          </p>
          <button
            onClick={requestBrowserLocation}
            className="w-full rounded-full bg-ink-900 px-4 py-2.5 text-sm text-sand-50 transition hover:bg-ink-700"
          >
            Use my location
          </button>
        </div>
      )}

      {status === 'locating' && (
        <div className="mt-4">
          <LoadingSpinner label="Finding conditions" />
        </div>
      )}

      {status === 'denied' && (
        <div className="mt-4 rounded-lg bg-gold-500/10 px-3 py-2 text-sm text-ink-700">
          Location permission was declined — search for a place below instead.
        </div>
      )}

      {status === 'unsupported' && (
        <div className="mt-4 rounded-lg bg-gold-500/10 px-3 py-2 text-sm text-ink-700">
          Your browser doesn't support geolocation — search for a place below instead.
        </div>
      )}

      {status === 'error' && <ErrorState message={error} onRetry={requestBrowserLocation} />}

      {(status === 'granted' || status === 'manual') && weather && (
        <div className="mt-4 flex items-center gap-4">
          <img src={weatherIconUrl(weather.icon)} alt={weather.description} className="h-16 w-16" />
          <div>
            <p className="font-display text-3xl text-ink-900">{weather.temp}°C</p>
            <p className="text-sm capitalize text-ink-600/70">
              {weather.description} · {place?.name}
              {place?.country ? `, ${place.country}` : ''}
            </p>
          </div>
        </div>
      )}

      {status !== 'granted' && status !== 'manual' && (
        <form onSubmit={handleSearch} className="mt-4 flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Lisbon, Portugal"
            className="flex-1 rounded-full border border-ink-900/15 bg-white px-4 py-2 text-sm focus:border-gold-500 focus:outline-none"
            aria-label="Search for a location"
          />
          <button
            type="submit"
            className="rounded-full border border-ink-900/20 px-4 py-2 text-sm text-ink-800 transition hover:bg-ink-900 hover:text-sand-50"
          >
            Search
          </button>
        </form>
      )}
    </div>
  )
}
