import { useState } from "react";
import { generateItinerary, GeminiApiError } from "../services/geminiApi";
import { LoadingSpinner, ErrorState } from "./StateViews";
import ItineraryDisplay from "./ItineraryDisplay";

export default function ItineraryPlanner({ destination }) {
  const [days, setDays] = useState(3);
  const [interests, setInterests] = useState("");
  const [pace, setPace] = useState("moderate");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState(null);

  async function handleGenerate(e) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      const result = await generateItinerary({
        destination,
        days,
        interests,
        pace,
      });
      setItinerary(result);
      setStatus("success");
    } catch (err) {
      const message =
        err instanceof GeminiApiError
          ? err.message
          : "Could not generate an itinerary right now.";
      setError(message);
      setStatus("error");
    }
  }

  return (
    <div className="rounded-2xl border border-ink-900/10 bg-white/70 p-5 shadow-soft sm:p-6">
      <h3 className="font-display text-lg text-ink-900">
        Plan your days in {destination.name}
      </h3>
      <p className="mt-1 text-sm text-ink-600/70">
        Tell the assistant a little about your trip and it will lay out a
        day-by-day plan.
      </p>

      <form
        onSubmit={handleGenerate}
        className="mt-5 grid gap-4 sm:grid-cols-2"
      >
        <label className="block">
          <span className="text-xs font-medium text-ink-700">
            Number of days
          </span>
          <input
            type="number"
            min={1}
            max={10}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-ink-900/15 bg-white px-3 py-2 text-sm focus:border-gold-500 focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="text-xs font-medium text-ink-700">Pace</span>
          <select
            value={pace}
            onChange={(e) => setPace(e.target.value)}
            className="mt-1 w-full rounded-lg border border-ink-900/15 bg-white px-3 py-2 text-sm focus:border-gold-500 focus:outline-none"
          >
            <option value="relaxed">Relaxed</option>
            <option value="moderate">Moderate</option>
            <option value="packed">Packed</option>
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="text-xs font-medium text-ink-700">
            Interests (optional)
          </span>
          <input
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="e.g. food, architecture, hiking"
            className="mt-1 w-full rounded-lg border border-ink-900/15 bg-white px-3 py-2 text-sm focus:border-gold-500 focus:outline-none"
          />
        </label>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-full bg-ink-900 px-4 py-2.5 text-sm text-sand-50 transition hover:bg-ink-700 disabled:opacity-50 sm:w-auto"
          >
            {status === "loading" ? "Planning…" : "Generate itinerary"}
          </button>
        </div>
      </form>

      <div className="mt-6">
        {status === "loading" && (
          <LoadingSpinner label="Mapping out the days" />
        )}
        {status === "error" && (
          <ErrorState message={error} onRetry={handleGenerate} />
        )}
        {status === "success" && itinerary && (
          <ItineraryDisplay itinerary={itinerary} />
        )}
      </div>
    </div>
  );
}
