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

## Easiest way to manage projects (no database)

You can add and edit projects **without any database or Supabase**:

1. **Run the app locally:** `npm run dev`
2. **Open the admin:** [http://localhost:3000/admin](http://localhost:3000/admin) (or `http://localhost:3000/omvrastudios/admin` if using basePath)
3. **Create projects** and upload images as usual. They’re saved on your machine in `data/projects.json` and `public/uploads/`. The same data is also written to `public/projects.json` so the static site can use it.
4. **Commit and push** the new/updated files:
   - `public/projects.json`
   - `public/uploads/` (the image files)
5. After the next deploy (e.g. GitHub Actions), the live site will show your projects.

No signup, no SQL, no env vars. The “database” is just these files in your repo.

---

## Let your client add projects from their computer

You do a **one-time setup** (about 5 minutes). After that, your client goes to **yoursite.com/admin** and adds projects—no git, no dev server, no login.

### One-time setup (you)

1. **Create a free Supabase project** — [supabase.com](https://supabase.com) → New project → name it, set a password, Create.
2. **Run the setup script** — In Supabase: **SQL Editor** → New query → paste the contents of **`supabase-setup.sql`** (in this repo) → **Run**.
3. **Create the image bucket** — **Storage** → **New bucket** → name: `uploads` → turn **Public bucket** ON → Create.
4. **Get your URL and key** — **Project Settings** (gear) → **API** → copy **Project URL** and **anon public** key.
5. **Add them to the build** — **GitHub:** Repo **Settings** → **Secrets and variables** → **Actions** → **Variables** → add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Then push a commit or re-run the workflow so the site rebuilds.

**Done.** Send your client the link: **yoursite.com/admin** (or **yoursite.com/omvrastudios/admin**). They open it, click “New project”, add title, description, and images, and save. No account, no setup for them.

### Using a custom domain (GitHub Pages at root)

If your site is served at a **custom domain** (e.g. `https://omvrastudios.com/`) instead of `https://username.github.io/omvrastudios/`, the app must be built with the site at the **root** so CSS/JS and links work.

1. **GitHub:** Repo **Settings** → **Secrets and variables** → **Actions** → **Variables** → add **Name:** `USE_ROOT_URL`, **Value:** `true`.
2. Re-run the **Deploy to GitHub Pages** workflow (or push a commit). The next build will use `basePath: ""` so assets and routes are at the root and the site will look correct on your custom domain.

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

