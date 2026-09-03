# Wayfare — Travel Explorer

A travel web app to explore destinations, check live weather, browse the famous
places worth visiting, and plan a trip with an AI assistant.

Built for the Design Esthetics front-end assignment.

> **Screenshots:** add screenshots here after you run the app locally or view
> the deployed link (`npm run dev`, then capture the landing page, the explore
> page, a destination page, the chatbot, and a generated itinerary). They were
> not included in this zip because it was generated in an offline sandbox
> without a browser.

## Live link

_Add your deployed URL here after deploying (Vercel/Netlify/GitHub Pages)._

## Features

- **Landing hero** — full-bleed looping background video with a graceful
  static-image fallback if the video fails to load.
- **Destination explorer** — 8 destinations, each with its own detail page;
  search by name/country and filter by continent or interest tag.
- **Famous places** — every destination shows its notable places as an
  editorial image + description layout, not a bare list.
- **Location awareness** — request the visitor's browser location for local
  weather, or search for any place by name; every permission/error state
  (denied, unsupported, not found) has its own UI.
- **Real-time weather** — live conditions for the visitor's location and for
  every destination, via OpenWeather.
- **Images fetched live** — all destination and place photography comes from
  the Pexels API at runtime, never hardcoded into the repo.
- **AI chatbot** — ask a Gemini-powered assistant about a destination: how
  long to stay, what to see, when to go.
- **Itinerary planning** — generate a real day-by-day itinerary from the
  assistant, rendered as a tabbed, structured plan (not a chat transcript).
- **Loading / empty / error states** — designed throughout, not left to
  default browser behaviour.
- **Responsive & accessible** — works from phone to desktop; semantic HTML,
  visible focus states, keyboard-operable controls, `prefers-reduced-motion`
  respected.

## Tech stack

- React 18 + Vite
- React Router
- Tailwind CSS
- Framer Motion (page/element transitions)
- OpenWeather API (weather)
- Pexels API (images)
- Google Gemini API (chat + itinerary generation)

## APIs used

| Purpose | Provider | Docs |
|---|---|---|
| Weather | OpenWeather | https://openweathermap.org/api |
| Images | Pexels | https://www.pexels.com/api/ |
| AI assistant | Google Gemini | https://ai.google.dev/ |
| Background video | Mixkit (hotlinked, royalty-free) | https://mixkit.co/ |

## Run it locally

**1. Install dependencies**

```bash
npm install
```

**2. Set up your API keys**

Copy the example env file and fill in your own keys:

```bash
cp .env.example .env
```

```
VITE_OPENWEATHER_API_KEY=your_openweather_key_here
VITE_PEXELS_API_KEY=your_pexels_key_here
VITE_GEMINI_API_KEY=your_gemini_key_here
```

- Get a free OpenWeather key at https://home.openweathermap.org/api_keys
- Get a free Pexels key at https://www.pexels.com/api/new/
- Get a free Gemini key at https://aistudio.google.com/app/apikey

`.env` is already listed in `.gitignore` — never commit it.

**3. Start the dev server**

```bash
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`).

**4. Build for production**

```bash
npm run build
npm run preview   # to preview the production build locally
```

## Deploying

This is a static Vite app, so it deploys cleanly to Vercel, Netlify, or GitHub
Pages.

**Vercel / Netlify:** connect the GitHub repo, set the build command to
`npm run build` and the output directory to `dist`, then add the three
`VITE_*` environment variables in the project's dashboard (not in the repo).

**Note on API keys in a client-side app:** because this is a pure front-end
app, the keys above are bundled into the client at build time (standard for a
Vite `VITE_*` variable). For a production product handling real traffic, the
Gemini and OpenWeather calls would normally sit behind a small serverless
proxy so the keys never ship to the browser — out of scope for this
assignment, but worth knowing.

## Project structure

```
src/
  components/     UI building blocks (cards, widgets, chatbot, states)
  pages/          Home, Explore, DestinationDetail, NotFound
  data/           Static destination content (names, descriptions, places)
  services/       API clients: weatherApi, imageApi, geminiApi
  hooks/          useWeather, useImages
  context/        LocationContext (geolocation + manual search)
```

## Design notes

The visual direction is an editorial travel-magazine feel rather than a
generic SaaS dashboard: a dark ink background with warm gold and sand tones,
a serif display face (Fraunces) paired with Inter for UI text, and an
asymmetric hero. The famous-places layout alternates image/text sides like a
magazine spread instead of a repeated card grid, since a bare list was
explicitly what the brief asked to avoid.
