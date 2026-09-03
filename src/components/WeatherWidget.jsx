import { useWeather } from '../hooks/useWeather'
import { weatherIconUrl } from '../services/weatherApi'
import { LoadingSpinner, ErrorState } from './StateViews'

export default function WeatherWidget({ destination }) {
  const { status, weather, error } = useWeather(destination.lat, destination.lon)

  return (
    <div className="rounded-2xl border border-ink-900/10 bg-white/70 p-5 shadow-soft">
      <h3 className="font-display text-lg text-ink-900">Right now in {destination.name}</h3>

      {status === 'loading' && (
        <div className="mt-4">
          <LoadingSpinner label="Checking the sky" />
        </div>
      )}

      {status === 'error' && (
        <div className="mt-4">
          <ErrorState message={error} />
        </div>
      )}

      {status === 'success' && weather && (
        <div className="mt-4 flex items-center gap-4">
          <img src={weatherIconUrl(weather.icon)} alt={weather.description} className="h-16 w-16" />
          <div>
            <p className="font-display text-3xl text-ink-900">{weather.temp}°C</p>
            <p className="text-sm capitalize text-ink-600/70">
              {weather.description} · feels like {weather.feelsLike}°C
            </p>
            <p className="mt-0.5 text-xs text-ink-600/50">
              Humidity {weather.humidity}% · Wind {weather.windSpeed} m/s
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
