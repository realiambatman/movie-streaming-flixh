import { useState } from "react";
import HeroCarousel from "../components/HeroCarousel";
import Row from "../components/Row";
import TitleDialog from "../components/TitleDialog";
import { useFontsReady } from "../hooks/useFontsReady";
import {
  comingSoon,
  featured,
  latestFilms,
  latestSeries,
  trending,
} from "../data/titles";
import type { Title } from "../data/titles";

type Filter = "All" | "Films" | "Series";
const filters: Filter[] = ["All", "Films", "Series"];

export default function Home() {
  const ready = useFontsReady();
  const [selected, setSelected] = useState<Title | null>(null);
  const [filter, setFilter] = useState<Filter>("All");

  const trendingShown = trending.filter(
    (t) =>
      filter === "All" ||
      (filter === "Films" ? t.kind === "Film" : t.kind === "Series"),
  );

  return (
    <main className="home">
      <HeroCarousel slides={featured} loading={!ready} onOpen={setSelected} />

      <Row
        id="trending"
        heading="Trending"
        items={trendingShown}
        loading={!ready}
        onOpen={setSelected}
        controls={
          <div className="chips" role="group" aria-label="Filter trending titles">
            {filters.map((name) => (
              <button
                key={name}
                type="button"
                className="chip"
                aria-pressed={filter === name}
                onClick={() => setFilter(name)}
              >
                {name}
              </button>
            ))}
          </div>
        }
      />

      <p className="demo-strip">
        This is an interface demo. Every title here is invented sample data,
        and nothing can be played.
      </p>

      <Row
        id="latest-films"
        heading="Latest films"
        items={latestFilms}
        loading={!ready}
        onOpen={setSelected}
      />
      <Row
        id="latest-series"
        heading="Latest series"
        items={latestSeries}
        loading={!ready}
        onOpen={setSelected}
      />
      <Row
        id="coming-soon"
        heading="Coming soon"
        items={comingSoon}
        loading={!ready}
        onOpen={setSelected}
      />

      <TitleDialog item={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
