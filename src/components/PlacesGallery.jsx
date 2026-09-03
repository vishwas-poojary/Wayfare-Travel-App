import { useImages } from '../hooks/useImages'
import { LoadingSpinner } from './StateViews'

function PlaceRow({ place, destination, index }) {
  const { status, images } = useImages(`${place.name} ${destination.name}`, 1)
  const image = images[0]
  const reversed = index % 2 === 1

  return (
    <div
      className={`grid items-center gap-6 border-t border-ink-900/10 py-8 sm:grid-cols-5 sm:gap-10 ${
        reversed ? 'sm:[&>*:first-child]:order-2' : ''
      }`}
    >
      <div className="sm:col-span-2">
        <div className="aspect-[4/3] overflow-hidden rounded-xl bg-ink-100">
          {status === 'success' && image ? (
            <img src={image.thumb} alt={image.alt} loading="lazy" className="h-full w-full object-cover" />
          ) : status === 'loading' ? (
            <div className="flex h-full items-center justify-center">
              <LoadingSpinner label="" />
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-ink-600/40">No image found</div>
          )}
        </div>
      </div>
      <div className="sm:col-span-3">
        <p className="text-xs uppercase tracking-wide text-gold-600">{place.type}</p>
        <h4 className="mt-1 font-display text-2xl text-ink-900">{place.name}</h4>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-600/75">{place.note}</p>
      </div>
    </div>
  )
}

export default function PlacesGallery({ destination }) {
  return (
    <div>
      {destination.places.map((place, i) => (
        <PlaceRow key={place.name} place={place} destination={destination} index={i} />
      ))}
    </div>
  )
}
