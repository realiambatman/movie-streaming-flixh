export type Motif = "sun" | "ridges" | "beams" | "rings" | "pillars" | "door";

export type PaletteName =
  | "amber"
  | "teal"
  | "oxblood"
  | "midnight"
  | "moss"
  | "slate";

export type Title = {
  id: string;
  title: string;
  year: number;
  kind: "Film" | "Series";
  genre: string;
  length: string;
  badge?: "New" | "4K" | "HD";
  comingSoon?: boolean;
  logline: string;
  motif: Motif;
  palette: PaletteName;
};

// Every title, year and logline below is invented sample data.
export const titles: Title[] = [
  {
    id: "salt-road",
    title: "The Salt Road",
    year: 2025,
    kind: "Film",
    genre: "Drama",
    length: "2h 08m",
    badge: "4K",
    logline:
      "A truck driver crossing a dry lake bed picks up a passenger who knows the route better than she does.",
    motif: "sun",
    palette: "amber",
  },
  {
    id: "night-ferry",
    title: "Night Ferry",
    year: 2024,
    kind: "Series",
    genre: "Mystery",
    length: "8 episodes",
    badge: "New",
    logline:
      "The last crossing of the evening leaves with eleven passengers and docks with ten.",
    motif: "rings",
    palette: "teal",
  },
  {
    id: "ashfall",
    title: "Ashfall",
    year: 2025,
    kind: "Film",
    genre: "Thriller",
    length: "1h 52m",
    badge: "HD",
    logline:
      "A volcanologist returns to her home town three days before the mountain does what she said it would.",
    motif: "ridges",
    palette: "oxblood",
  },
  {
    id: "projectionist",
    title: "The Projectionist",
    year: 2023,
    kind: "Film",
    genre: "Drama",
    length: "1h 47m",
    logline:
      "On the closing night of a single-screen cinema, the final reel turns out to be missing.",
    motif: "beams",
    palette: "amber",
  },
  {
    id: "seven-bridges",
    title: "Seven Bridges",
    year: 2024,
    kind: "Series",
    genre: "Crime",
    length: "6 episodes",
    badge: "HD",
    logline:
      "A river city, a week of fog, and a detective who has to solve each case before the tide turns.",
    motif: "pillars",
    palette: "midnight",
  },
  {
    id: "quiet-orchard",
    title: "The Quiet Orchard",
    year: 2022,
    kind: "Film",
    genre: "Romance",
    length: "1h 39m",
    logline:
      "Two siblings inherit a failing orchard and one season in which to decide what it is worth.",
    motif: "sun",
    palette: "moss",
  },
  {
    id: "glasshouse",
    title: "Glasshouse",
    year: 2025,
    kind: "Series",
    genre: "Science fiction",
    length: "10 episodes",
    badge: "4K",
    logline:
      "Inside a sealed research garden, the plants start keeping better records than the staff.",
    motif: "door",
    palette: "moss",
  },
  {
    id: "thunder-rush",
    title: "Thunder Rush",
    year: 2023,
    kind: "Film",
    genre: "Action",
    length: "2h 01m",
    badge: "HD",
    logline:
      "A storm chaser and a getaway driver discover they have been following the same weather front.",
    motif: "beams",
    palette: "slate",
  },
  {
    id: "small-hours",
    title: "The Small Hours",
    year: 2024,
    kind: "Series",
    genre: "Drama",
    length: "8 episodes",
    logline:
      "Four night-shift workers share one all-night diner and very little else.",
    motif: "door",
    palette: "oxblood",
  },
  {
    id: "harbour-lights",
    title: "Harbour Lights",
    year: 2021,
    kind: "Film",
    genre: "Drama",
    length: "1h 58m",
    logline:
      "A lighthouse keeper's daughter comes back to automate the lamp her father refuses to leave.",
    motif: "pillars",
    palette: "teal",
  },
  {
    id: "low-tide",
    title: "Low Tide at Midnight",
    year: 2027,
    kind: "Film",
    genre: "Mystery",
    length: "Coming soon",
    comingSoon: true,
    logline:
      "When the sea pulls back further than it ever has, a village walks out to see what it left behind.",
    motif: "rings",
    palette: "midnight",
  },
  {
    id: "paper-lanterns",
    title: "Paper Lanterns",
    year: 2027,
    kind: "Series",
    genre: "Family",
    length: "Coming soon",
    comingSoon: true,
    logline:
      "A grandmother's workshop, one festival a year, and a recipe for light nobody wrote down.",
    motif: "sun",
    palette: "oxblood",
  },
  {
    id: "north-of-nowhere",
    title: "North of Nowhere",
    year: 2027,
    kind: "Film",
    genre: "Adventure",
    length: "Coming soon",
    comingSoon: true,
    logline:
      "A mapmaker follows a road that appears on only one of her maps.",
    motif: "ridges",
    palette: "slate",
  },
  {
    id: "signal-fires",
    title: "Signal Fires",
    year: 2027,
    kind: "Series",
    genre: "Thriller",
    length: "Coming soon",
    comingSoon: true,
    logline:
      "A chain of hilltop beacons is lit for the first time in a century, and nobody admits to starting it.",
    motif: "ridges",
    palette: "amber",
  },
];

const released = titles.filter((t) => !t.comingSoon);

export const featured = released.slice(0, 5);
export const trending = released;
export const latestFilms = released
  .filter((t) => t.kind === "Film")
  .sort((a, b) => b.year - a.year);
export const latestSeries = released
  .filter((t) => t.kind === "Series")
  .sort((a, b) => b.year - a.year);
export const comingSoon = titles.filter((t) => t.comingSoon);
