import { destinations } from '../data/destinations'
import DestinationCard from './DestinationCard'
import { Link } from 'react-router-dom'

export default function DestinationStrip() {
  return (
    <section className="bg-ink-900 py-24 text-sand-50">
      <div className="mx-auto flex max-w-6xl items-end justify-between px-5 sm:px-8">
        <h2 className="text-balance font-display text-3xl font-light sm:text-4xl">
          Eight places to start from.
        </h2>
        <Link
          to="/explore"
          className="hidden text-sm text-gold-400 transition hover:text-gold-300 sm:inline"
        >
          View all →
        </Link>
      </div>

      <div className="no-scrollbar mt-10 flex gap-4 overflow-x-auto px-5 pb-4 sm:px-8">
        {destinations.map((d) => (
          <DestinationCard key={d.slug} destination={d} className="w-[220px] shrink-0 sm:w-[260px]" />
        ))}
      </div>

      <div className="mt-6 px-5 sm:hidden">
        <Link to="/explore" className="text-sm text-gold-400">
          View all destinations →
        </Link>
      </div>
    </section>
  )
}
