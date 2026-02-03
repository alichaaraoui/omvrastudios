# Omvra Studios

A minimal, high-end portfolio website for Omvra Studios, featuring a 3D sphere gallery built with Next.js, TypeScript, Tailwind CSS, and Three.js.

## Features

- **3D Sphere Gallery**: Interactive Three.js-powered gallery with orbit controls
- **Multiple Gallery Views**: Switch between Sphere, Row, and Grid views
- **Photo Gallery**: Browse and filter photos by series
- **Book Shop**: Browse and purchase photography books
- **Shopping Cart**: Full cart functionality with localStorage persistence
- **Minimalist Design**: Black and white editorial aesthetic
- **Admin interface**: Create and manage projects with image uploads (stored on the server)

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

## Adding projects on the live site (no token for users)

To let anyone create projects from the **public** site (e.g. GitHub Pages) with no login or token:

1. **Create a free [Supabase](https://supabase.com) project.**

2. **Create the table and bucket** in the Supabase SQL Editor:

```sql
-- Table for projects
create table if not exists projects (
  id text primary key,
  title text not null,
  description text not null,
  images jsonb not null default '[]',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Allow public read and insert/update/delete (for admin)
alter table projects enable row level security;
create policy "Allow public read" on projects for select using (true);
create policy "Allow public all" on projects for all using (true);

-- Storage bucket for images (run in SQL or create in Dashboard → Storage)
insert into storage.buckets (id, name, public) values ('uploads', 'uploads', true)
on conflict (id) do nothing;
create policy "Allow public read" on storage.objects for select using (bucket_id = 'uploads');
create policy "Allow public upload" on storage.objects for insert with check (bucket_id = 'uploads');
```

If the bucket already exists, create it in **Dashboard → Storage → New bucket** (name: `uploads`, public: yes), then add policies so **select** and **insert** are allowed for everyone.

3. **Add env vars** (in GitHub: repo → Settings → Secrets and variables → Actions; or for local, `.env.local`):

- `NEXT_PUBLIC_SUPABASE_URL` = your project URL (e.g. `https://xxxx.supabase.co`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your project anon/public key

4. **Redeploy.** After that, anyone can open `/admin` on the live site, create a project, and upload images—no token needed.

## Local / Node backend (optional)

When Supabase is not configured, the app can use a **Node backend** (e.g. `npm run dev` with API routes): projects in `data/projects.json`, images in `public/uploads/`.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (projects, upload)
│   ├── layout.tsx         # Root layout with CartProvider
│   ├── page.tsx           # Home page
│   ├── admin/             # Admin project management
│   ├── gallery/           # Gallery page
│   ├── photo/[id]/        # Photo detail page
│   ├── project/[id]/      # Project detail page
│   ├── about/             # About page
│   ├── books/             # Books shop page
│   └── cart/              # Cart page
├── data/                  # projects.json (created at runtime)
├── public/uploads/        # uploaded images (created at runtime)
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

