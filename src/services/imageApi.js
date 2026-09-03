const API_KEY = import.meta.env.VITE_PEXELS_API_KEY
const BASE_URL = 'https://api.pexels.com/v1/search'

export class ImageApiError extends Error {}

const cache = new Map()

/**
 * Search Pexels for photos matching a query.
 * Returns an array of { url, thumb, alt, photographer, photographerUrl }.
 */
export async function searchImages(query, count = 6) {
  const cacheKey = `${query}::${count}`
  if (cache.has(cacheKey)) return cache.get(cacheKey)

  if (!API_KEY) {
    throw new ImageApiError('Missing VITE_PEXELS_API_KEY. Add it to your .env file.')
  }

  const url = `${BASE_URL}?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`
  const res = await fetch(url, {
    headers: { Authorization: API_KEY },
  })
  if (!res.ok) {
    throw new ImageApiError(`Image request failed (${res.status})`)
  }
  const data = await res.json()
  const photos = (data.photos ?? []).map((p) => ({
    id: p.id,
    url: p.src.large2x || p.src.large,
    thumb: p.src.medium,
    alt: p.alt || query,
    photographer: p.photographer,
    photographerUrl: p.photographer_url,
    sourceUrl: p.url,
  }))
  cache.set(cacheKey, photos)
  return photos
}

/** Convenience: fetch a single best-effort hero image for a query. */
export async function searchHeroImage(query) {
  const results = await searchImages(query, 1)
  return results[0] ?? null
}
