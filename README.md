# FLIX Mini

A static front-end demo of a film and series catalogue interface, built with Vite, React and TypeScript. It consists of two pages: an about/landing page and a home page with a rotating hero and horizontally scrolling poster rows. It is a UI exercise only. There is no backend, no movie API, no video player and no real catalogue; nothing on the site can be watched.

## Features

- Two-page Vite multi-page build: an about page (`/`) and a home page (`/home/`), each with its own React entry point
- Sticky top navigation with a slide-in drawer menu on small screens (closes with Escape)
- Full-width hero that crossfades between five featured titles every seven seconds, with previous/next buttons and progress ticks; it pauses on hover and focus and does not auto-advance when reduced motion is requested
- Horizontally scrolling, snap-aligned rows for "Trending", "Latest films", "Latest series" and "Coming soon"; cards are buttons, reachable with Tab and the left/right arrow keys
- All / Films / Series filter on the Trending row
- Details dialog for each title (opened from a card or the hero button)
- Skeleton placeholders shown until the web fonts are ready
- Poster and backdrop art generated in SVG from each title, so nothing is fetched at runtime

## Design

- Black canvas, warm bone text and a single amber accent, with a light film-grain overlay; colours, type scale, spacing and motion are CSS custom properties at the top of `src/styles.css`
- Titles are set in Bodoni Moda and interface text in Instrument Sans, both self-hosted through `@fontsource-variable` packages
- The hero keeps a 2.39:1 scope ratio on wide screens and switches to upright artwork on narrow ones
- Animations and auto-advance are switched off under `prefers-reduced-motion`

## Where the content comes from

- **Titles, years, genres and loglines** are invented sample data in `src/data/titles.ts`. They do not refer to real films or series.
- **Posters and hero backdrops** are drawn by `src/components/TitleArt.tsx`: each title has a palette and a motif, and a generator seeded from the title text fills in the details, so the same title always gets the same picture.
- **Video**: there are no video sources, embeds or stream links anywhere in the code.
- **API keys**: none. The app reads no environment variables.

## Tech stack

- React 18
- TypeScript 5
- Vite 5 (multi-page build via `rollupOptions.input`)
- Plain CSS (`src/styles.css`)
- `@fontsource-variable/bodoni-moda` and `@fontsource-variable/instrument-sans` for self-hosted fonts

## Prerequisites

- Node.js 18 or newer
- npm

## Setup

```bash
npm install
npm run dev
```

Vite prints the local URL (by default `http://localhost:5173`). The about page is at `/` and the home page at `/home/`.

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
index.html              About page entry (loads src/mpa-info.tsx)
home/index.html         Home page entry (loads src/mpa-home.tsx)
vite.config.ts          Registers both HTML files as build inputs
public/favicon.svg      Logo mark
src/
  mpa-info.tsx          Mounts the about page
  mpa-home.tsx          Mounts the home page
  styles.css            Design tokens and all styling
  data/
    titles.ts           Sample catalogue and the row selections
  hooks/
    useFontsReady.ts    Gates content behind skeletons until fonts load
  components/
    TopNavMPA.tsx       Top bar and drawer
    HeroCarousel.tsx    Featured-title hero
    Row.tsx             Scrolling row with heading, arrows and empty state
    PosterCard.tsx      Poster, card button and skeleton
    TitleArt.tsx        SVG poster/backdrop generator
    TitleDialog.tsx     Title details dialog
    Logo.tsx            Logo mark and wordmark
    Icons.tsx           Inline SVG icons
    Footer.tsx          Footer
  pages/
    Info.mpa.tsx        About page shell (nav + Landing + footer)
    Landing.tsx         About page content
    Home.mpa.tsx        Home page shell (nav + Home + footer)
    Home.tsx            Hero, rows and details dialog
```

## Known limitations

- Some controls are visual only: the search boxes, the Genre / Country / Films / Series / Top rated menu links and the Contact / Terms / Privacy footer links do nothing.
- Only the dark theme exists.
- Links between the two pages use absolute paths (`/home/`, `/index.html`), so the build must be served from the root of a domain.
- `npm audit` still reports dev-server advisories against Vite 5 / esbuild; clearing them requires a major Vite upgrade, which has not been done.
- There are no tests and no lint configuration.
