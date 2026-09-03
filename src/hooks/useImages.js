import { useEffect, useState } from 'react'
import { searchImages } from '../services/imageApi'

/** status: 'loading' | 'success' | 'error' | 'empty' */
export function useImages(query, count = 6) {
  const [status, setStatus] = useState('loading')
  const [images, setImages] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    if (!query) return

    setStatus('loading')
    setError(null)

    searchImages(query, count)
      .then((results) => {
        if (cancelled) return
        setImages(results)
        setStatus(results.length ? 'success' : 'empty')
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
  }, [query, count])

  return { status, images, error }
}
