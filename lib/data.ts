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

