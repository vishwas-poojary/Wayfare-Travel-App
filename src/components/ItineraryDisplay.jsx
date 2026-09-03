import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ItineraryDisplay({ itinerary }) {
  const [activeDay, setActiveDay] = useState(0)
  const day = itinerary.days[activeDay]

  return (
    <div className="rounded-xl border border-ink-900/10 bg-sand-50">
      <div className="no-scrollbar flex gap-1 overflow-x-auto border-b border-ink-900/10 p-2">
        {itinerary.days.map((d, i) => (
          <button
            key={d.day}
            onClick={() => setActiveDay(i)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${
              i === activeDay ? 'bg-ink-900 text-sand-50' : 'text-ink-700 hover:bg-ink-900/5'
            }`}
          >
            Day {d.day}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeDay}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="p-5"
        >
          <h4 className="font-display text-xl text-ink-900">{day.title}</h4>

          <ol className="mt-4 space-y-4">
            {day.items.map((item, i) => (
              <li key={i} className="flex gap-4">
                <span className="w-20 shrink-0 pt-0.5 text-xs font-medium uppercase tracking-wide text-gold-600">
                  {item.time}
                </span>
                <div className="border-l border-ink-900/10 pl-4">
                  <p className="text-sm font-medium text-ink-900">{item.activity}</p>
                  {item.note && <p className="mt-0.5 text-xs text-ink-600/70">{item.note}</p>}
                </div>
              </li>
            ))}
          </ol>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
