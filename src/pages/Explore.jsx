import { useMemo, useState } from "react";
import { destinations, allTags, allContinents } from "../data/destinations";
import DestinationCard from "../components/DestinationCard";
import SearchFilterBar from "../components/SearchFilterBar";
import LocationPicker from "../components/LocationPicker";
import ItineraryPlanner from "../components/ItineraryPlanner";
import { EmptyState } from "../components/StateViews";

export default function Explore() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("all");
  const [continent, setContinent] = useState("all");
  const [plannerSlug, setPlannerSlug] = useState(destinations[0].slug);
  const plannerDestination = destinations.find((d) => d.slug === plannerSlug);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return destinations.filter((d) => {
      const matchesQuery =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q);
      const matchesTag = activeTag === "all" || d.tags.includes(activeTag);
      const matchesContinent = continent === "all" || d.continent === continent;
      return matchesQuery && matchesTag && matchesContinent;
    });
  }, [query, activeTag, continent]);

  return (
    <div className="min-h-screen bg-sand-50 pb-24 pt-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <h1 className="font-display text-4xl font-light text-ink-900 sm:text-5xl">
              Explore
            </h1>
            <p className="mt-2 max-w-lg text-ink-600/70">
              Eight destinations, each with live weather, real places, and an
              assistant to help you plan.
            </p>

            <div className="mt-8">
              <SearchFilterBar
                query={query}
                onQueryChange={setQuery}
                activeTag={activeTag}
                onTagChange={setActiveTag}
                tags={allTags}
                continent={continent}
                onContinentChange={setContinent}
                continents={allContinents}
              />
            </div>

            {filtered.length === 0 ? (
              <div className="mt-10">
                <EmptyState
                  title="No destinations match that"
                  hint="Try clearing a filter or searching a different country."
                  action={
                    <button
                      onClick={() => {
                        setQuery("");
                        setActiveTag("all");
                        setContinent("all");
                      }}
                      className="mt-4 rounded-full border border-ink-900/20 px-4 py-2 text-sm text-ink-800 hover:bg-ink-900 hover:text-sand-50"
                    >
                      Clear filters
                    </button>
                  }
                />
              </div>
            ) : (
              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {filtered.map((d) => (
                  <DestinationCard
                    key={d.slug}
                    destination={d}
                    className="aspect-auto"
                  />
                ))}
              </div>
            )}
          </div>

          <aside className="lg:pt-[76px]">
            <div className="lg:sticky lg:top-28">
              <LocationPicker />
            </div>
          </aside>
        </div>

        <section
          id="assistant"
          className="mt-20 scroll-mt-28 border-t border-ink-900/10 pt-14"
        >
          <h2 className="font-display text-3xl font-light text-ink-900">
            Plan a trip
          </h2>
          <p className="mt-2 max-w-lg text-ink-600/70">
            Pick a destination and the assistant will lay out a day-by-day plan.
          </p>

          <label className="mt-6 block max-w-xs">
            <span className="text-xs font-medium text-ink-700">
              Destination
            </span>
            <select
              value={plannerSlug}
              onChange={(e) => setPlannerSlug(e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink-900/15 bg-white px-3 py-2 text-sm focus:border-gold-500 focus:outline-none"
            >
              {destinations.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.name}, {d.country}
                </option>
              ))}
            </select>
          </label>

          <div className="mt-6">
            {plannerDestination && (
              <ItineraryPlanner
                key={plannerSlug}
                destination={plannerDestination}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
