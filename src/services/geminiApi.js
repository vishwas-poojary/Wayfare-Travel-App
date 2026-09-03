const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL = "gemini-2.0-flash";
const BASE_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

export class GeminiApiError extends Error {}

function requireKey() {
  if (!API_KEY) {
    throw new GeminiApiError(
      "Missing VITE_GEMINI_API_KEY. Add it to your .env file.",
    );
  }
}

/**
 * Send a chat turn to Gemini about a specific destination.
 * `history` is an array of { role: 'user' | 'model', text }.
 */
export async function askDestinationQuestion({
  destination,
  question,
  history = [],
}) {
  requireKey();

  const systemContext = buildDestinationContext(destination);

  const contents = [
    { role: "user", parts: [{ text: systemContext }] },
    {
      role: "model",
      parts: [
        { text: `Understood — I'm ready to help with ${destination.name}.` },
      ],
    },
    ...history.map((turn) => ({
      role: turn.role,
      parts: [{ text: turn.text }],
    })),
    { role: "user", parts: [{ text: question }] },
  ];

  const res = await fetch(`${BASE_URL}?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents,
      generationConfig: { temperature: 0.7, maxOutputTokens: 500 },
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new GeminiApiError(
      `Assistant request failed (${res.status}): ${body.slice(0, 200)}`,
    );
  }

  const data = await res.json();
  return extractText(data);
}

/**
 * Ask Gemini to generate a structured day-by-day itinerary as JSON.
 * Returns { days: [{ day, title, items: [{ time, activity, note }] }] }
 */
export async function generateItinerary({
  destination,
  days,
  interests,
  pace,
}) {
  requireKey();

  const prompt = `You are a travel planner. Create a ${days}-day itinerary for ${destination.name}, ${destination.country}.
Traveller interests: ${interests || "general sightseeing"}.
Preferred pace: ${pace || "moderate"}.
Known notable places to consider (use, adapt, or add others as relevant): ${destination.places
    .map((p) => p.name)
    .join(", ")}.

Respond with ONLY valid JSON, no markdown fences, no commentary, in exactly this shape:
{
  "days": [
    {
      "day": 1,
      "title": "short theme for the day",
      "items": [
        { "time": "Morning", "activity": "what to do", "note": "one short practical tip" }
      ]
    }
  ]
}
Each day should have 3-4 items covering morning, afternoon, evening (and optionally a meal suggestion). Keep activity text concise (under 12 words) and note text under 16 words.`;

  const res = await fetch(`${BASE_URL}?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 2000,
        responseMimeType: "application/json",
      },
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new GeminiApiError(
      `Itinerary request failed (${res.status}): ${body.slice(0, 200)}`,
    );
  }

  const data = await res.json();
  const text = extractText(data);

  try {
    const cleaned = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);
    if (!Array.isArray(parsed.days)) throw new Error('Missing "days" array');
    return parsed;
  } catch (err) {
    throw new GeminiApiError(
      "The assistant returned an unexpected format. Please try again.",
    );
  }
}

function buildDestinationContext(destination) {
  return `You are Wayfare's travel assistant, a warm and knowledgeable guide focused only on ${destination.name}, ${destination.country}.
Context about this destination:
- ${destination.description}
- Best time to visit: ${destination.bestTime}
- Typical stay length: ${destination.idealStay}
- Notable places: ${destination.places.map((p) => `${p.name} (${p.type})`).join("; ")}

Answer questions about how long to stay, what to see, when to go, budget expectations, and getting around. Keep answers conversational and under 120 words unless asked for more detail. If asked about something unrelated to travel or this destination, gently steer back.`;
}

function extractText(data) {
  const text =
    data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ?? "";
  if (!text)
    throw new GeminiApiError("The assistant returned an empty response.");
  return text;
}
