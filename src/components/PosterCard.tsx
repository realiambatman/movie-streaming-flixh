import type { Title } from "../data/titles";
import TitleArt from "./TitleArt";

type PosterProps = { item: Title };

/** The one-sheet itself: generated art with the title set on top of it. */
export function Poster({ item }: PosterProps) {
  return (
    <span className="poster">
      <TitleArt item={item} className="poster-art" />
      <span className="poster-text">
        <span className="poster-title">{item.title}</span>
        <span className="poster-credit">
          {/^[aeiou]/i.test(item.genre) ? "An" : "A"} {item.genre.toLowerCase()}{" "}
          {item.kind.toLowerCase()}
        </span>
      </span>
      {item.badge && <span className="badge">{item.badge}</span>}
    </span>
  );
}

type CardProps = { item: Title; onOpen: (item: Title) => void };

export default function PosterCard({ item, onOpen }: CardProps) {
  return (
    <button
      type="button"
      className="card"
      onClick={() => onOpen(item)}
      aria-label={`${item.title}, ${item.genre} ${item.kind.toLowerCase()}, ${item.year}. View details`}
    >
      <Poster item={item} />
      <span className="card-meta">
        <span>{item.year}</span>
        <span>{item.kind}</span>
      </span>
    </button>
  );
}

export function PosterSkeleton() {
  return (
    <div className="card card-skeleton" aria-hidden="true">
      <span className="poster skeleton" />
      <span className="card-meta">
        <span className="skeleton skeleton-line" />
      </span>
    </div>
  );
}
