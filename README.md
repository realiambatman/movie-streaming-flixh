# movie-streaming-flixh

A static front-end demo of a dark, compact movie-streaming site layout, built with Vite, React and TypeScript. It consists of two pages: an info/landing page and a home page with a rotating hero carousel and poster grids. It is a UI exercise only. There is no backend, no movie API, no video player and no real catalogue; nothing on the site can be watched.

## Features

- Two-page Vite multi-page build: an info page (`/`) and a home page (`/home/`), each with its own React entry point
- Sticky top navigation with a slide-in drawer menu on small screens
- Hero carousel that advances every four seconds, with clickable dot indicators
- Responsive poster grids (2 to 8 columns) for "Trending", "Latest Movies", "Latest TV Shows" and "Coming Soon"
- Dark theme written in plain CSS with custom properties

## Where the content comes from

- **Titles, years and badges** are hardcoded sample arrays in `src/pages/Home.tsx` and `src/components/HeroCarousel.tsx`. The same five titles are repeated to fill the grids.
- **Posters and hero images** are random placeholder photos loaded at runtime from [picsum.photos](https://picsum.photos) using seeded URLs. They are not real movie artwork, and the pages need a network connection to show them.
- **Video**: there are no video sources, embeds or stream links anywhere in the code.
- **API keys**: none. The app reads no environment variables.

## Tech stack

- React 18
- TypeScript 5
- Vite 5 (multi-page build via `rollupOptions.input`)
- Plain CSS (`src/styles.css`)

## Prerequisites

- Node.js 18 or newer
- npm

## Setup

```bash
npm install
npm run dev
```

Vite prints the local URL (by default `http://localhost:5173`). The info page is at `/` and the home page at `/home/`.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build both pages into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run typecheck` | Run `tsc --noEmit` |

## Environment variables

None.

## Project structure

```
index.html              Info page entry (loads src/mpa-info.tsx)
home/index.html         Home page entry (loads src/mpa-home.tsx)
vite.config.ts          Registers both HTML files as build inputs
src/
  mpa-info.tsx          Mounts the info page
  mpa-home.tsx          Mounts the home page
  styles.css            All styling
  components/
    TopNavMPA.tsx       Top bar and mobile drawer
    HeroCarousel.tsx    Auto-rotating hero cards
    Footer.tsx          Footer links and theme chips
  pages/
    Info.mpa.tsx        Info page shell (nav + Landing + footer)
    Landing.tsx         Landing card
    Home.mpa.tsx        Home page shell (nav + Home + footer)
    Home.tsx            Carousel and poster grids
```

## Known limitations

- Most controls are visual only: the search boxes, the genre/country/movies/TV menu links, the filter chips, the "Watch now" buttons, the footer links and the Light/Auto/Dark chips do nothing.
- Only the dark theme exists.
- Links between the two pages use absolute paths (`/home/`, `/index.html`), so the build must be served from the root of a domain.
- The layout and the "FLIXHQ" / "FHQ" wordmark in the navigation and landing card are modelled on an existing third-party streaming site. This project is not affiliated with it. Rename the wordmark before using this for anything beyond a personal demo.
- `npm audit` still reports dev-server advisories against Vite 5 / esbuild; clearing them requires a major Vite upgrade, which has not been done.
- There are no tests and no lint configuration.
