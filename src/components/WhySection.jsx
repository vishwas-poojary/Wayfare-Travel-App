const features = [
  {
    title: 'Live conditions',
    body: 'Real-time weather for any destination, plus your own location if you share it.',
  },
  {
    title: 'Places worth it',
    body: "Every destination's famous places, arranged so you know what they are and why they matter.",
  },
  {
    title: 'A planner that plans',
    body: 'Ask the assistant for an itinerary and get real days, not a wall of chat text.',
  },
]

export default function WhySection() {
  return (
    <section id="why" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="max-w-xl">
        <h2 className="text-balance font-display text-3xl font-light text-ink-900 sm:text-4xl">
          Built around three questions every trip starts with.
        </h2>
      </div>

      <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="border-t border-ink-900/15 pt-5">
            <h3 className="font-display text-xl text-ink-900">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600/75">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
