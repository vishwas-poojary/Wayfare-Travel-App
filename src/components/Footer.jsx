export default function Footer() {
  return (
    <footer className="border-t border-ink-900/10 bg-sand-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-ink-600/70 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="font-display text-base text-ink-800">Wayfare</p>
        <p>Weather via OpenWeather · Images via Pexels · Assistant via Gemini</p>
      </div>
    </footer>
  )
}
