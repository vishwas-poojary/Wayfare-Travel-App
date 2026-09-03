import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-sand-50 px-5 text-center">
      <p className="text-sm text-gold-600">404</p>
      <h1 className="mt-2 font-display text-4xl font-light text-ink-900">This page wandered off.</h1>
      <p className="mt-2 max-w-sm text-ink-600/70">
        The page you're looking for doesn't exist. Let's get you back on the map.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-full bg-ink-900 px-6 py-3 text-sm text-sand-50 transition hover:bg-ink-700"
      >
        Back home
      </Link>
    </div>
  )
}
