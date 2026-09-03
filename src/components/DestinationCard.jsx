import { Link } from 'react-router-dom'
import { useImages } from '../hooks/useImages'

export default function DestinationCard({ destination, className = '' }) {
  const { status, images } = useImages(`${destination.name} ${destination.country} skyline`, 1)
  const image = images[0]

  return (
    <Link
      to={`/destination/${destination.slug}`}
      className={`group relative block overflow-hidden rounded-2xl bg-ink-800 ${className}`}
    >
      <div className="aspect-[4/5] w-full overflow-hidden">
        {status === 'success' && image ? (
          <img
            src={image.thumb}
            alt={image.alt}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 ease-atlas group-hover:scale-[1.06]"
          />
        ) : status === 'error' ? (
          <div className="flex h-full w-full items-center justify-center bg-ink-700 text-xs text-sand-100/50">
            Image unavailable
          </div>
        ) : (
          <div className="h-full w-full animate-pulse bg-ink-700" />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-xs uppercase tracking-wide text-gold-400/90">{destination.continent}</p>
        <h3 className="mt-1 font-display text-2xl text-sand-50">{destination.name}</h3>
        <p className="mt-1 line-clamp-1 text-sm text-sand-100/70">{destination.tagline}</p>
      </div>
    </Link>
  )
}
