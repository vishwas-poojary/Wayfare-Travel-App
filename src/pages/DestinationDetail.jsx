import { useParams, Link, Navigate } from "react-router-dom";
import { getDestinationBySlug } from "../data/destinations";
import { useImages } from "../hooks/useImages";
import WeatherWidget from "../components/WeatherWidget";
import PlacesGallery from "../components/PlacesGallery";
import Chatbot from "../components/Chatbot";
import ItineraryPlanner from "../components/ItineraryPlanner";

export default function DestinationDetail() {
  const { slug } = useParams();
  const destination = getDestinationBySlug(slug);

  if (!destination) return <Navigate to="/explore" replace />;

  return (
    <div className="min-h-screen bg-sand-50">
      <DetailHero destination={destination} />

      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="max-w-2xl text-lg leading-relaxed text-ink-700">
              {destination.description}
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-6 border-y border-ink-900/10 py-6 sm:grid-cols-4">
              <div>
                <dt className="text-xs uppercase tracking-wide text-ink-600/50">
                  Best time
                </dt>
                <dd className="mt-1 text-sm text-ink-900">
                  {destination.bestTime}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-ink-600/50">
                  Ideal stay
                </dt>
                <dd className="mt-1 text-sm text-ink-900">
                  {destination.idealStay}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-ink-600/50">
                  Country
                </dt>
                <dd className="mt-1 text-sm text-ink-900">
                  {destination.country}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-ink-600/50">
                  Continent
                </dt>
                <dd className="mt-1 text-sm text-ink-900">
                  {destination.continent}
                </dd>
              </div>
            </dl>

            <div className="mt-14">
              <h2 className="font-display text-3xl font-light text-ink-900">
                Famous places
              </h2>
              <PlacesGallery destination={destination} />
            </div>
          </div>

          <aside className="space-y-6 lg:pt-1">
            <WeatherWidget destination={destination} />
            <div style={{ height: 440 }}>
              <Chatbot destination={destination} />
            </div>
          </aside>
        </div>

        <div id="assistant" className="mt-16 scroll-mt-28">
          <ItineraryPlanner destination={destination} />
        </div>

        <div className="mt-16">
          <Link
            to="/explore"
            className="text-sm text-ink-600/70 hover:text-ink-900"
          >
            ← Back to all destinations
          </Link>
        </div>
      </div>
    </div>
  );
}

function DetailHero({ destination }) {
  const { status, images } = useImages(
    `${destination.name} ${destination.country} landmark`,
    1,
  );
  const image = images[0];

  return (
    <section className="relative flex h-[56vh] min-h-[380px] items-end overflow-hidden bg-ink-900 text-sand-50">
      {status === "success" && image ? (
        <img
          src={image.url}
          alt={image.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 animate-pulse bg-ink-800" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-ink-900/10" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-10 sm:px-8">
        <p className="text-sm text-gold-400">{destination.country}</p>
        <h1 className="mt-1 font-display text-5xl font-light text-sand-50 sm:text-6xl">
          {destination.name}
        </h1>
        <p className="mt-2 max-w-md text-sand-100/80">{destination.tagline}</p>
      </div>
    </section>
  );
}
