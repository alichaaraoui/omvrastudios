# Omvra Studios

A minimal, high-end portfolio website for Omvra Studios, featuring a 3D sphere gallery built with Next.js, TypeScript, Tailwind CSS, and Three.js.

## Features

- **3D Sphere Gallery**: Interactive Three.js-powered gallery with orbit controls
- **Multiple Gallery Views**: Switch between Sphere, Row, and Grid views
- **Photo Gallery**: Browse and filter photos by series
- **Book Shop**: Browse and purchase photography books
- **Shopping Cart**: Full cart functionality with localStorage persistence
- **Minimalist Design**: Black and white editorial aesthetic

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React Three Fiber** (@react-three/fiber)
- **Drei** (@react-three/drei)
- **Three.js**

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with CartProvider
│   ├── page.tsx           # Home page
│   ├── gallery/           # Gallery page
│   ├── photo/[id]/        # Photo detail page
│   ├── about/             # About page
│   ├── books/             # Books shop page
│   └── cart/              # Cart page
├── components/            # React components
│   ├── CartProvider.tsx   # Cart context provider
│   ├── Navbar.tsx         # Navigation bar
│   ├── GallerySwitcher.tsx # Gallery view switcher
│   ├── SphereGallery.tsx  # 3D sphere gallery
│   ├── RowGallery.tsx     # Horizontal row gallery
│   ├── GridGallery.tsx    # Grid gallery
│   ├── PhotoCard.tsx      # Photo card component
│   └── BookCard.tsx       # Book card component
└── lib/                   # Utilities and data
    ├── data.ts            # Photos and books data
    └── types.ts           # TypeScript types
```

## Build

```bash
npm run build
```

## License

Private project for Omvra Studios.

