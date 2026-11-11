import { useEffect, useState } from "react";
import type { Title } from "../data/titles";
import TitleArt from "./TitleArt";
import { ChevronLeft, ChevronRight } from "./Icons";

const SLIDE_MS = 7000;

type Props = {
  slides: Title[];
  loading: boolean;
  onOpen: (item: Title) => void;
};

export default function HeroCarousel({ slides, loading, onOpen }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const autoplay = !loading && !paused && !reduceMotion;

  useEffect(() => {
    if (!autoplay) return;
    const id = window.setTimeout(
      () => setIndex((i) => (i + 1) % slides.length),
      SLIDE_MS,
    );
    return () => window.clearTimeout(id);
  }, [autoplay, index, slides.length]);

  const step = (by: number) =>
    setIndex((i) => (i + by + slides.length) % slides.length);

  if (loading) {
    return (
      <section className="hero hero-loading" aria-label="Featured titles" aria-busy="true">
        <div className="hero-content">
          <span className="skeleton skeleton-title" />
          <span className="skeleton skeleton-line" />
          <span className="skeleton skeleton-line short" />
        </div>
      </section>
    );
  }

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="Featured titles"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((slide, i) => {
        const active = i === index;
        return (
          <div
            key={slide.id}
            className={`hero-slide${active ? " is-active" : ""}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            aria-hidden={!active}
          >
            <TitleArt item={slide} shape="wide" className="hero-art hero-art-wide" />
            <TitleArt item={slide} className="hero-art hero-art-tall" />
            <div className="hero-content">
              <h1 className="hero-title">{slide.title}</h1>
              <ul className="meta">
                <li>{slide.kind}</li>
                <li>{slide.genre}</li>
                <li>{slide.year}</li>
                <li>{slide.length}</li>
              </ul>
              <p className="hero-logline">{slide.logline}</p>
              <button
                type="button"
                className="btn btn-primary"
                tabIndex={active ? 0 : -1}
                onClick={() => onOpen(slide)}
              >
                View details
              </button>
            </div>
          </div>
        );
      })}

      <div className="hero-controls">
        <button
          type="button"
          className="icon-btn"
          aria-label="Previous featured title"
          onClick={() => step(-1)}
        >
          <ChevronLeft />
        </button>
        <div className="hero-ticks">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              className={`hero-tick${i === index ? " is-active" : ""}${
                i === index && autoplay ? " is-running" : ""
              }`}
              aria-label={`Show ${slide.title}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => setIndex(i)}
            >
              <span style={{ animationDuration: `${SLIDE_MS}ms` }} />
            </button>
          ))}
        </div>
        <button
          type="button"
          className="icon-btn"
          aria-label="Next featured title"
          onClick={() => step(1)}
        >
          <ChevronRight />
        </button>
        <span className="hero-count" aria-hidden="true">
          {index + 1} / {slides.length}
        </span>
      </div>
    </section>
  );
}
