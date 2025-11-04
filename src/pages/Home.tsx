import HeroCarousel from "../components/HeroCarousel";

type Card = {
  id: number;
  title: string;
  year: string;
  badge?: string;
  image: string;
};

const sample: Card[] = Array.from({ length: 30 }).map((_, i) => ({
  id: i + 1,
  title: [
    "The Sandman",
    "28 Years Later",
    "Smurfs",
    "Dead Summer",
    "Thunder Rush",
  ][i % 5],
  year: ["2024", "2023", "2022", "2021", "2020"][i % 5],
  badge: ["HD", "CAM", "NEW", "4K", "TS"][i % 5],
  image: `https://picsum.photos/seed/fhq${i}/200/300`,
}));

export default function Home() {
  return (
    <main className="home">
      <HeroCarousel />
      <section className="section">
        <div className="section-header">
          <h3>Trending</h3>
          <div className="filters">
            <button className="chip">All</button>
            <button className="chip">Movies</button>
            <button className="chip">TV</button>
          </div>
        </div>
        <div className="grid">
          {sample.map((card) => (
            <article key={card.id} className="tile">
              <img className="poster" src={card.image} alt={card.title} />
              <span className="badge">{card.badge}</span>
              <div className="tile-footer">
                <div className="title" title={card.title}>
                  {card.title}
                </div>
                <div className="year muted tiny">{card.year}</div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <div className="ad-banner">FREE ANIME STREAMING • No Ads • Dub/Sub</div>

      <section className="section">
        <div className="section-header">
          <h3>Latest Movies</h3>
        </div>
        <div className="grid">
          {sample.slice(0, 20).map((card) => (
            <article key={`lm-${card.id}`} className="tile">
              <img className="poster" src={card.image} alt={card.title} />
              <div className="tile-footer">
                <div className="title" title={card.title}>
                  {card.title}
                </div>
                <div className="year muted tiny">{card.year}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h3>Latest TV Shows</h3>
        </div>
        <div className="grid">
          {sample.slice(10, 30).map((card) => (
            <article key={`tv-${card.id}`} className="tile">
              <img className="poster" src={card.image} alt={card.title} />
              <div className="tile-footer">
                <div className="title" title={card.title}>
                  {card.title}
                </div>
                <div className="year muted tiny">{card.year}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h3>Coming Soon</h3>
          <button className="chip">View more</button>
        </div>
        <div className="grid">
          {sample.slice(5, 25).map((card) => (
            <article key={`cs-${card.id}`} className="tile">
              <img className="poster" src={card.image} alt={card.title} />
              <div className="tile-footer">
                <div className="title" title={card.title}>
                  {card.title}
                </div>
                <div className="year muted tiny">{card.year}</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
