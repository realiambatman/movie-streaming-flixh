import React from "react";

type Slide = {
  title: string;
  meta: string;
  image: string;
};

const slides: Slide[] = [
  {
    title: "The Sandman",
    meta: "Drama • Netflix • 2024 • 8.9",
    image: "https://picsum.photos/seed/sandman/1200/500",
  },
  {
    title: "28 Years Later",
    meta: "Horror • 2024 • 8.1",
    image: "https://picsum.photos/seed/28years/1200/500",
  },
  {
    title: "The Smurfs",
    meta: "Family • 2017 • 6.1",
    image: "https://picsum.photos/seed/smurfs/1200/500",
  },
  {
    title: "Widowson",
    meta: "Action • 2022 • 7.2",
    image: "https://picsum.photos/seed/widowson/1200/500",
  },
  {
    title: "Jurassic World Reborn",
    meta: "Sci‑Fi • 2023 • 7.9",
    image: "https://picsum.photos/seed/jurassic/1200/500",
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const visible = [slides[index], slides[(index + 1) % slides.length]];

  return (
    <section className="carousel">
      <div className="carousel-grid">
        {visible.map((s, i) => (
          <div
            key={i}
            className="hero-card"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(16,22,38,.86), rgba(16,22,38,.55)), url(${s.image})`,
            }}
          >
            <div className="hero-info">
              <h2 className="hero-title">{s.title}</h2>
              <p className="muted tiny">{s.meta}</p>
              <button className="tiny-btn">Watch now</button>
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            className={`carousel-dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
