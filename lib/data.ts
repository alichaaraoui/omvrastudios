export interface Photo {
  id: string;
  title: string;
  series: string;
  location: string;
  year: string;
  thumbnailUrl: string;
  imageUrl: string;
  description: string;
}

export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  price: number;
  description: string;
  coverUrl: string;
  pages: number;
  releaseYear: string;
  inStock: boolean;
}

export const photos: Photo[] = [
  {
    id: "1",
    title: "Morning Light",
    series: "Urban Landscapes",
    location: "New York, NY",
    year: "2023",
    thumbnailUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    description: "The first light of day breaking through the urban skyline, capturing the quiet moments before the city awakens."
  },
  {
    id: "2",
    title: "Desert Silence",
    series: "Natural Forms",
    location: "Mojave Desert, CA",
    year: "2023",
    thumbnailUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&h=800&fit=crop",
    description: "The vast emptiness of the desert, where time seems to stand still and the landscape speaks in whispers."
  },
  {
    id: "3",
    title: "Coastal Fog",
    series: "Natural Forms",
    location: "Big Sur, CA",
    year: "2022",
    thumbnailUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&h=800&fit=crop",
    description: "Mist rolling over the coastal cliffs, creating a dreamlike atmosphere where land and sea merge."
  },
  {
    id: "4",
    title: "City Shadows",
    series: "Urban Landscapes",
    location: "Chicago, IL",
    year: "2023",
    thumbnailUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&h=800&fit=crop",
    description: "Geometric patterns of light and shadow cast by architectural forms, revealing the hidden geometry of the city."
  },
  {
    id: "5",
    title: "Mountain Solitude",
    series: "Natural Forms",
    location: "Rocky Mountains, CO",
    year: "2022",
    thumbnailUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    description: "A lone peak standing against an endless sky, a testament to nature's enduring presence."
  },
  {
    id: "6",
    title: "Street Geometry",
    series: "Urban Landscapes",
    location: "Tokyo, Japan",
    year: "2024",
    thumbnailUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&h=800&fit=crop",
    description: "The intersection of traditional and modern architecture, where lines and angles create visual poetry."
  },
  {
    id: "7",
    title: "Forest Path",
    series: "Natural Forms",
    location: "Pacific Northwest",
    year: "2023",
    thumbnailUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop",
    description: "A quiet path through ancient trees, where dappled light creates patterns on the forest floor."
  },
  {
    id: "8",
    title: "Night Lights",
    series: "Urban Landscapes",
    location: "Los Angeles, CA",
    year: "2024",
    thumbnailUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&h=800&fit=crop",
    description: "The city at night, where artificial light creates its own constellation of human activity."
  },
  {
    id: "9",
    title: "Ocean Horizon",
    series: "Natural Forms",
    location: "Maine Coast",
    year: "2022",
    thumbnailUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&h=800&fit=crop",
    description: "Where sky meets sea in an infinite line, a meditation on the horizon and what lies beyond."
  },
  {
    id: "10",
    title: "Architectural Detail",
    series: "Urban Landscapes",
    location: "Paris, France",
    year: "2023",
    thumbnailUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&h=800&fit=crop",
    description: "The intricate details of historical architecture, capturing the craftsmanship of another era."
  },
  {
    id: "11",
    title: "Desert Bloom",
    series: "Natural Forms",
    location: "Death Valley, CA",
    year: "2023",
    thumbnailUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&h=800&fit=crop",
    description: "Rare flowers emerging from the harsh desert, a reminder of life's persistence in unlikely places."
  },
  {
    id: "12",
    title: "Metropolitan Flow",
    series: "Urban Landscapes",
    location: "San Francisco, CA",
    year: "2024",
    thumbnailUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    description: "The rhythm of urban movement, where people and architecture create a dynamic visual symphony."
  },
  {
    id: "13",
    title: "Alpine Vista",
    series: "Natural Forms",
    location: "Swiss Alps",
    year: "2023",
    thumbnailUrl: "https://images.unsplash.com/photo-1464822759844-d150ad6c0f0e?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1464822759844-d150ad6c0f0e?w=1200&h=800&fit=crop",
    description: "Snow-capped peaks reaching toward an endless sky, a study in elevation and perspective."
  },
  {
    id: "14",
    title: "Neon Reflections",
    series: "Urban Landscapes",
    location: "Hong Kong",
    year: "2024",
    thumbnailUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&h=800&fit=crop",
    description: "Electric light painting the urban canvas, where technology and tradition intersect."
  },
  {
    id: "15",
    title: "Prairie Winds",
    series: "Natural Forms",
    location: "Great Plains, USA",
    year: "2023",
    thumbnailUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&h=800&fit=crop",
    description: "Endless grasslands swaying in the wind, a meditation on horizontal space."
  },
  {
    id: "16",
    title: "Concrete Dreams",
    series: "Urban Landscapes",
    location: "Berlin, Germany",
    year: "2024",
    thumbnailUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&h=800&fit=crop",
    description: "Modernist architecture standing as monuments to human ambition and design."
  },
  {
    id: "17",
    title: "River Bend",
    series: "Natural Forms",
    location: "Colorado River, AZ",
    year: "2022",
    thumbnailUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&h=800&fit=crop",
    description: "Water carving through stone over millennia, a testament to persistence and time."
  },
  {
    id: "18",
    title: "Glass Towers",
    series: "Urban Landscapes",
    location: "Dubai, UAE",
    year: "2024",
    thumbnailUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    description: "Reflections of sky and structure, where architecture becomes a mirror of aspiration."
  },
  {
    id: "19",
    title: "Moss Covered",
    series: "Natural Forms",
    location: "Pacific Northwest",
    year: "2023",
    thumbnailUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop",
    description: "Ancient trees cloaked in green, a world within a world."
  },
  {
    id: "20",
    title: "Subway Geometry",
    series: "Urban Landscapes",
    location: "London, UK",
    year: "2023",
    thumbnailUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&h=800&fit=crop",
    description: "Underground spaces where light and shadow create abstract compositions."
  },
  {
    id: "21",
    title: "Canyon Depth",
    series: "Natural Forms",
    location: "Grand Canyon, AZ",
    year: "2022",
    thumbnailUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&h=800&fit=crop",
    description: "Layers of time exposed in stone, a geological narrative written in color."
  },
  {
    id: "22",
    title: "Bridge Span",
    series: "Urban Landscapes",
    location: "Golden Gate, CA",
    year: "2024",
    thumbnailUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&h=800&fit=crop",
    description: "Engineering as art, where function and form create iconic structures."
  },
  {
    id: "23",
    title: "Frozen Lake",
    series: "Natural Forms",
    location: "Lake Superior, MN",
    year: "2023",
    thumbnailUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&h=800&fit=crop",
    description: "Ice formations creating abstract patterns, nature's temporary sculptures."
  },
  {
    id: "24",
    title: "Market Square",
    series: "Urban Landscapes",
    location: "Barcelona, Spain",
    year: "2023",
    thumbnailUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    description: "Public spaces where architecture frames human interaction and movement."
  },
  {
    id: "25",
    title: "Dune Patterns",
    series: "Natural Forms",
    location: "Sahara Desert, Morocco",
    year: "2024",
    thumbnailUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop",
    description: "Wind-sculpted sand creating flowing lines and organic geometry."
  },
  {
    id: "26",
    title: "Skyline Dusk",
    series: "Urban Landscapes",
    location: "Seattle, WA",
    year: "2024",
    thumbnailUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&h=800&fit=crop",
    description: "The transition from day to night, when artificial light begins to dominate."
  },
  {
    id: "27",
    title: "Waterfall Mist",
    series: "Natural Forms",
    location: "Iceland",
    year: "2023",
    thumbnailUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&h=800&fit=crop",
    description: "Power and grace combined, where water meets stone in perpetual motion."
  },
  {
    id: "28",
    title: "Industrial Complex",
    series: "Urban Landscapes",
    location: "Detroit, MI",
    year: "2022",
    thumbnailUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&h=800&fit=crop",
    description: "Abandoned structures telling stories of industry and transformation."
  },
  {
    id: "29",
    title: "Bamboo Forest",
    series: "Natural Forms",
    location: "Kyoto, Japan",
    year: "2024",
    thumbnailUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&h=800&fit=crop",
    description: "Vertical lines creating rhythm and depth, a natural cathedral of green."
  },
  {
    id: "30",
    title: "Historic Quarter",
    series: "Urban Landscapes",
    location: "Prague, Czech Republic",
    year: "2023",
    thumbnailUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    description: "Centuries of architecture layered together, history made visible in stone."
  },
  {
    id: "31",
    title: "Volcanic Rock",
    series: "Natural Forms",
    location: "Hawaii, USA",
    year: "2023",
    thumbnailUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop",
    description: "Raw earth exposed, where creation and destruction meet in black stone."
  },
  {
    id: "32",
    title: "Metro Station",
    series: "Urban Landscapes",
    location: "Moscow, Russia",
    year: "2024",
    thumbnailUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&h=800&fit=crop",
    description: "Underground palaces of transit, where function meets opulent design."
  },
  {
    id: "33",
    title: "Tundra Expanse",
    series: "Natural Forms",
    location: "Alaska, USA",
    year: "2022",
    thumbnailUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&h=800&fit=crop",
    description: "Vast emptiness where the horizon seems infinite, a study in minimalism."
  },
  {
    id: "34",
    title: "Rooftop Gardens",
    series: "Urban Landscapes",
    location: "Singapore",
    year: "2024",
    thumbnailUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&h=800&fit=crop",
    description: "Nature integrated into vertical architecture, green spaces in the sky."
  },
  {
    id: "35",
    title: "Cave Formations",
    series: "Natural Forms",
    location: "New Mexico, USA",
    year: "2023",
    thumbnailUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&h=800&fit=crop",
    description: "Subterranean beauty formed drop by drop over millennia."
  },
  {
    id: "36",
    title: "Pedestrian Bridge",
    series: "Urban Landscapes",
    location: "Copenhagen, Denmark",
    year: "2024",
    thumbnailUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    description: "Modern design connecting spaces, where architecture facilitates movement."
  },
  {
    id: "37",
    title: "Marshland",
    series: "Natural Forms",
    location: "Everglades, FL",
    year: "2023",
    thumbnailUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop",
    description: "Wetlands where water and land merge, creating unique ecosystems."
  },
  {
    id: "38",
    title: "Art Deco Facade",
    series: "Urban Landscapes",
    location: "Miami, FL",
    year: "2024",
    thumbnailUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&h=800&fit=crop",
    description: "Decorative architecture from another era, preserved in pastel colors."
  },
  {
    id: "39",
    title: "Glacier Blue",
    series: "Natural Forms",
    location: "Alaska, USA",
    year: "2023",
    thumbnailUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&h=800&fit=crop",
    description: "Ancient ice reflecting sky, a frozen moment in geological time."
  },
  {
    id: "40",
    title: "Vertical City",
    series: "Urban Landscapes",
    location: "Shanghai, China",
    year: "2024",
    thumbnailUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&h=800&fit=crop",
    description: "Towers reaching for the sky, density and scale redefining urban space."
  },
  {
    id: "41",
    title: "Rocky Shore",
    series: "Natural Forms",
    location: "Maine, USA",
    year: "2022",
    thumbnailUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&h=800&fit=crop",
    description: "Coastal erosion creating abstract forms, where water shapes stone."
  },
  {
    id: "42",
    title: "Street Art",
    series: "Urban Landscapes",
    location: "Melbourne, Australia",
    year: "2024",
    thumbnailUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    description: "Public walls transformed into canvases, art integrated into urban fabric."
  },
  {
    id: "43",
    title: "Meadow Light",
    series: "Natural Forms",
    location: "Switzerland",
    year: "2023",
    thumbnailUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop",
    description: "Golden hour light painting fields, a pastoral scene of tranquility."
  },
  {
    id: "44",
    title: "Modernist Library",
    series: "Urban Landscapes",
    location: "Seattle, WA",
    year: "2024",
    thumbnailUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&h=800&fit=crop",
    description: "Contemporary architecture housing knowledge, form following function."
  },
  {
    id: "45",
    title: "Coral Reef",
    series: "Natural Forms",
    location: "Great Barrier Reef, Australia",
    year: "2023",
    thumbnailUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&h=800&fit=crop",
    description: "Underwater gardens of color and form, ecosystems of incredible diversity."
  },
  {
    id: "46",
    title: "Historic Market",
    series: "Urban Landscapes",
    location: "Istanbul, Turkey",
    year: "2024",
    thumbnailUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&h=800&fit=crop",
    description: "Ancient marketplaces where commerce and culture intersect across centuries."
  },
  {
    id: "47",
    title: "Autumn Forest",
    series: "Natural Forms",
    location: "Vermont, USA",
    year: "2023",
    thumbnailUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&h=800&fit=crop",
    description: "Seasonal transformation in full display, color as transition."
  },
  {
    id: "48",
    title: "Futuristic Architecture",
    series: "Urban Landscapes",
    location: "Dubai, UAE",
    year: "2024",
    thumbnailUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    description: "Bold forms challenging gravity, architecture as statement and spectacle."
  },
  {
    id: "49",
    title: "Desert Oasis",
    series: "Natural Forms",
    location: "Sahara, Algeria",
    year: "2023",
    thumbnailUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop",
    description: "Life finding a way in the harshest conditions, water as miracle."
  },
  {
    id: "50",
    title: "Neighborhood Streets",
    series: "Urban Landscapes",
    location: "Portland, OR",
    year: "2024",
    thumbnailUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&h=800&fit=crop",
    description: "Residential architecture creating community, scale and intimacy balanced."
  },
  {
    id: "51",
    title: "Mountain Stream",
    series: "Natural Forms",
    location: "Rocky Mountains, CO",
    year: "2023",
    thumbnailUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&h=800&fit=crop",
    description: "Clear water flowing over stones, movement and stillness in harmony."
  },
  {
    id: "52",
    title: "Cultural Center",
    series: "Urban Landscapes",
    location: "Bilbao, Spain",
    year: "2024",
    thumbnailUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&h=800&fit=crop",
    description: "Iconic architecture transforming cities, culture as catalyst for change."
  },
  {
    id: "53",
    title: "Tropical Beach",
    series: "Natural Forms",
    location: "Maldives",
    year: "2023",
    thumbnailUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&h=800&fit=crop",
    description: "Paradise defined by simplicity, sand and sea in perfect balance."
  },
  {
    id: "54",
    title: "Rooftop View",
    series: "Urban Landscapes",
    location: "New York, NY",
    year: "2024",
    thumbnailUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    description: "The city from above, patterns and scale revealed from elevation."
  },
  {
    id: "55",
    title: "Cactus Garden",
    series: "Natural Forms",
    location: "Arizona, USA",
    year: "2023",
    thumbnailUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop",
    description: "Desert plants creating sculptural forms, adaptation as art."
  },
  {
    id: "56",
    title: "Historic District",
    series: "Urban Landscapes",
    location: "Charleston, SC",
    year: "2024",
    thumbnailUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&h=800&fit=crop",
    description: "Preserved architecture telling stories of the past, history in brick and wood."
  },
  {
    id: "57",
    title: "Fjord Landscape",
    series: "Natural Forms",
    location: "Norway",
    year: "2023",
    thumbnailUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&h=800&fit=crop",
    description: "Dramatic valleys carved by ice, where water meets mountain in grandeur."
  },
  {
    id: "58",
    title: "Modern Plaza",
    series: "Urban Landscapes",
    location: "Tokyo, Japan",
    year: "2024",
    thumbnailUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&h=800&fit=crop",
    description: "Contemporary public spaces designed for gathering and movement."
  },
  {
    id: "59",
    title: "Lava Fields",
    series: "Natural Forms",
    location: "Iceland",
    year: "2023",
    thumbnailUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&h=800&fit=crop",
    description: "Raw volcanic terrain, earth's power made visible in black rock."
  },
  {
    id: "60",
    title: "Waterfront Promenade",
    series: "Urban Landscapes",
    location: "Vancouver, Canada",
    year: "2024",
    thumbnailUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    description: "Urban design meeting natural beauty, where city and water coexist."
  }
];

export const books: Book[] = [
  {
    id: "book-1",
    title: "Omvra: Selected Works",
    subtitle: "2018-2024",
    price: 65.00,
    description: "A comprehensive retrospective of work spanning six years. This limited edition volume includes both published and previously unseen photographs, offering a complete view of the artist's evolving vision.",
    coverUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=600&fit=crop",
    pages: 200,
    releaseYear: "2024",
    inStock: true
  }
];

