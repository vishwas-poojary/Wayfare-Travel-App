export default function SearchFilterBar({
  query,
  onQueryChange,
  activeTag,
  onTagChange,
  tags,
  continent,
  onContinentChange,
  continents,
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <label className="relative flex-1 sm:max-w-xs">
        <span className="sr-only">Search destinations</span>
        <svg
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-600/50"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search destinations or countries"
          className="w-full rounded-full border border-ink-900/15 bg-white/60 py-2.5 pl-9 pr-4 text-sm text-ink-900 placeholder:text-ink-600/40 focus:border-gold-500 focus:outline-none"
        />
      </label>

      <div className="flex flex-wrap items-center gap-2">
        <select
          value={continent}
          onChange={(e) => onContinentChange(e.target.value)}
          className="rounded-full border border-ink-900/15 bg-white/60 px-3 py-2 text-xs text-ink-800 focus:border-gold-500 focus:outline-none"
          aria-label="Filter by continent"
        >
          <option value="all">All continents</option>
          {continents.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by interest">
          <button
            onClick={() => onTagChange('all')}
            className={`rounded-full px-3 py-1.5 text-xs transition ${
              activeTag === 'all'
                ? 'bg-ink-900 text-sand-50'
                : 'bg-white/60 text-ink-700 hover:bg-white'
            }`}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagChange(tag)}
              className={`rounded-full px-3 py-1.5 text-xs capitalize transition ${
                activeTag === tag
                  ? 'bg-ink-900 text-sand-50'
                  : 'bg-white/60 text-ink-700 hover:bg-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
