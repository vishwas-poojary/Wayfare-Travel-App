// Static editorial data: names, descriptions, coordinates, famous places.
// Live data (weather, images) is fetched from APIs at runtime — see services/.

export const destinations = [
  {
    slug: 'kyoto-japan',
    name: 'Kyoto',
    country: 'Japan',
    continent: 'Asia',
    lat: 35.0116,
    lon: 135.7681,
    tagline: 'A thousand years of temples, gardens and quiet ritual.',
    description:
      "Kyoto was Japan's imperial capital for over a millennium, and it wears that history calmly. Wooden machiya houses line narrow lanes, moss gardens are raked into silence, and geiko still cross the Gion streets at dusk. It rewards slow mornings and unhurried walks more than any checklist.",
    bestTime: 'Late March to May, or October to November',
    idealStay: '3–4 days',
    tags: ['culture', 'gardens', 'food'],
    places: [
      { name: 'Fushimi Inari Taisha', type: 'Shrine', note: 'Thousands of vermillion torii gates climbing the mountain.' },
      { name: 'Arashiyama Bamboo Grove', type: 'Nature', note: 'A quiet corridor of towering bamboo, best at first light.' },
      { name: 'Kinkaku-ji', type: 'Temple', note: 'A gold-leaf pavilion mirrored in its own pond.' },
      { name: 'Gion District', type: 'Historic quarter', note: "Kyoto's old geisha district, atmospheric after dark." },
      { name: 'Nishiki Market', type: 'Market', note: "Narrow food market known as 'Kyoto's Kitchen'." },
    ],
  },
  {
    slug: 'lisbon-portugal',
    name: 'Lisbon',
    country: 'Portugal',
    continent: 'Europe',
    lat: 38.7223,
    lon: -9.1393,
    tagline: 'Hills, tiled facades, and light off the Tagus.',
    description:
      "Lisbon is built across seven hills, so the city keeps revealing itself in miradouros — viewpoints where the Tagus flashes between rooftops. Yellow trams grind up impossibly steep streets, azulejo tiles cover entire building faces, and fado drifts out of small taverns after dark.",
    bestTime: 'March to May, or September to October',
    idealStay: '3–5 days',
    tags: ['coastal', 'history', 'nightlife'],
    places: [
      { name: 'Belém Tower', type: 'Landmark', note: '16th-century fortress guarding the river mouth.' },
      { name: 'Alfama District', type: 'Historic quarter', note: "Lisbon's oldest neighbourhood, a maze of alleys and fado bars." },
      { name: 'Jerónimos Monastery', type: 'Monument', note: 'A UNESCO site of intricate Manueline stonework.' },
      { name: 'Miradouro da Senhora do Monte', type: 'Viewpoint', note: 'The widest panoramic view over the city.' },
      { name: 'Time Out Market', type: 'Market', note: "A food hall gathering Lisbon's best kitchens under one roof." },
    ],
  },
  {
    slug: 'marrakesh-morocco',
    name: 'Marrakesh',
    country: 'Morocco',
    continent: 'Africa',
    lat: 31.6295,
    lon: -7.9811,
    tagline: 'A walled red city humming at the edge of the Atlas.',
    description:
      'Marrakesh unfolds behind ochre ramparts: a medina of souks selling spice and leather, riads hidden behind plain doors, and Djemaa el-Fna filling with smoke and storytellers as the sun drops. Beyond the walls, the snow-capped Atlas Mountains sit on the skyline.',
    bestTime: 'March to May, or September to November',
    idealStay: '3–4 days',
    tags: ['culture', 'markets', 'desert'],
    places: [
      { name: 'Djemaa el-Fna', type: 'Square', note: "The medina's central square, a market by day and theatre by night." },
      { name: 'Jardin Majorelle', type: 'Garden', note: 'A cobalt-blue garden once owned by Yves Saint Laurent.' },
      { name: 'Bahia Palace', type: 'Palace', note: '19th-century palace with carved cedar ceilings and courtyards.' },
      { name: 'Koutoubia Mosque', type: 'Landmark', note: "The city's tallest minaret, visible from most of the medina." },
      { name: 'Souks of the Medina', type: 'Market', note: 'A dense maze of stalls selling rugs, lanterns and spices.' },
    ],
  },
  {
    slug: 'queenstown-new-zealand',
    name: 'Queenstown',
    country: 'New Zealand',
    continent: 'Oceania',
    lat: -45.0312,
    lon: 168.6626,
    tagline: 'Mountains dropping straight into a glacial lake.',
    description:
      'Queenstown sits on the edge of Lake Wakatipu with the jagged Remarkables rising directly behind it. It built its name on adrenaline — bungee jumping was invented here — but the same landscape rewards a slow drive, a short hike, or a glass of Central Otago pinot at sunset.',
    bestTime: 'December to February (summer), or June to August (ski season)',
    idealStay: '3–4 days',
    tags: ['adventure', 'nature', 'lakes'],
    places: [
      { name: 'Lake Wakatipu', type: 'Lake', note: 'A 80km glacial lake framed by the Remarkables range.' },
      { name: 'Skyline Gondola', type: 'Viewpoint', note: 'Cable car up Bob\'s Peak for a full view over the town.' },
      { name: 'Kawarau Gorge Bridge', type: 'Landmark', note: 'The birthplace of commercial bungee jumping.' },
      { name: 'Milford Sound (day trip)', type: 'Fiord', note: 'Waterfalls and cliffs reachable on a day excursion.' },
      { name: 'Arrowtown', type: 'Historic town', note: 'A preserved 1860s gold-mining town nearby.' },
    ],
  },
  {
    slug: 'oaxaca-mexico',
    name: 'Oaxaca',
    country: 'Mexico',
    continent: 'North America',
    lat: 17.0732,
    lon: -96.7266,
    tagline: 'Mezcal, mole, and the most textured colours in Mexico.',
    description:
      'Oaxaca City is built around a colonial centre of green cantera stone, but its real draw is craft: weavers in Teotitlán, mezcal palenques in the hills, and market stalls stacked with seven kinds of mole. It is widely considered the culinary capital of Mexico.',
    bestTime: 'October to April',
    idealStay: '3–4 days',
    tags: ['food', 'culture', 'markets'],
    places: [
      { name: 'Santo Domingo Church', type: 'Church', note: 'A gold-leaf baroque interior in the city centre.' },
      { name: 'Monte Albán', type: 'Ruins', note: 'Hilltop Zapotec ruins overlooking the whole valley.' },
      { name: 'Mercado Benito Juárez', type: 'Market', note: 'The main market for mole, chapulines and textiles.' },
      { name: 'Hierve el Agua', type: 'Nature', note: 'Petrified mineral waterfalls outside the city.' },
      { name: 'Teotitlán del Valle', type: 'Village', note: 'A weaving village known for natural-dye rugs.' },
    ],
  },
  {
    slug: 'reykjavik-iceland',
    name: 'Reykjavík',
    country: 'Iceland',
    continent: 'Europe',
    lat: 64.1466,
    lon: -21.9426,
    tagline: 'A small capital at the edge of glaciers and geysers.',
    description:
      "Reykjavík is compact and colourful, but it's mainly the gateway to Iceland's interior: waterfalls, black-sand beaches, and geothermal fields within a few hours' drive. In winter, the aurora is visible from just outside the city; in summer, the sun barely sets.",
    bestTime: 'June to August (midnight sun), or September to March (northern lights)',
    idealStay: '4–6 days including day trips',
    tags: ['nature', 'adventure', 'unique'],
    places: [
      { name: 'Hallgrímskirkja', type: 'Church', note: "The city's tallest building, shaped like basalt columns." },
      { name: 'Golden Circle Route', type: 'Day trip', note: 'Geysir, Þingvellir and Gullfoss in a single loop.' },
      { name: 'Blue Lagoon', type: 'Geothermal spa', note: 'Milky-blue geothermal waters near Keflavík.' },
      { name: 'Reykjavík Harbour', type: 'Waterfront', note: 'Whale-watching tours depart from here.' },
      { name: 'Sky Lagoon', type: 'Geothermal spa', note: 'A newer infinity-edge geothermal pool facing the sea.' },
    ],
  },
  {
    slug: 'cape-town-south-africa',
    name: 'Cape Town',
    country: 'South Africa',
    continent: 'Africa',
    lat: -33.9249,
    lon: 18.4241,
    tagline: 'A flat-topped mountain over two oceans meeting.',
    description:
      'Cape Town sits where the Atlantic meets the edge of the Indian Ocean current, with Table Mountain flattened out above the city like a plateau. Beaches, vineyards and townships all sit within an hour of the centre, and the Cape light makes all of it look slightly cinematic.',
    bestTime: 'November to March',
    idealStay: '4–5 days',
    tags: ['nature', 'coastal', 'wine'],
    places: [
      { name: 'Table Mountain', type: 'Mountain', note: 'A cable car climbs to a flat summit above the city.' },
      { name: 'Cape of Good Hope', type: 'Nature reserve', note: 'The rocky southwestern tip of the peninsula.' },
      { name: 'Boulders Beach', type: 'Beach', note: 'Home to a colony of African penguins.' },
      { name: 'Robben Island', type: 'Historic site', note: 'Former prison island, reachable by ferry.' },
      { name: 'Stellenbosch Winelands', type: 'Wine region', note: 'Cape Dutch vineyards about 45 minutes away.' },
    ],
  },
  {
    slug: 'hoi-an-vietnam',
    name: 'Hội An',
    country: 'Vietnam',
    continent: 'Asia',
    lat: 15.8801,
    lon: 108.338,
    tagline: 'A lantern-lit trading port frozen in the 16th century.',
    description:
      "Hội An's Ancient Town survived the wars that reshaped the rest of Vietnam, leaving a riverside grid of merchant houses, Chinese assembly halls and tailor shops largely intact. At night, silk lanterns replace streetlights and the river fills with floating candles.",
    bestTime: 'February to April',
    idealStay: '2–3 days',
    tags: ['culture', 'food', 'coastal'],
    places: [
      { name: 'Japanese Covered Bridge', type: 'Landmark', note: 'A 16th-century bridge-temple at the heart of the old town.' },
      { name: 'Ancient Town', type: 'Historic quarter', note: 'UNESCO-listed merchant houses along the Thu Bồn river.' },
      { name: 'An Bang Beach', type: 'Beach', note: 'A relaxed stretch of sand a short ride from the centre.' },
      { name: "Tailor shops of Hội An", type: 'Shopping', note: 'Custom clothing made to order, often within 24 hours.' },
      { name: 'Cẩm Thanh Coconut Village', type: 'Nature', note: 'Basket-boat rides through palm-lined water canals.' },
    ],
  },
]

export const allTags = Array.from(new Set(destinations.flatMap((d) => d.tags))).sort()
export const allContinents = Array.from(new Set(destinations.map((d) => d.continent))).sort()

export function getDestinationBySlug(slug) {
  return destinations.find((d) => d.slug === slug)
}
