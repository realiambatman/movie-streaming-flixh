import { useRef } from "react";
import type { ReactNode } from "react";
import type { Title } from "../data/titles";
import PosterCard, { PosterSkeleton } from "./PosterCard";
import { ChevronLeft, ChevronRight } from "./Icons";

type Props = {
  id: string;
  heading: string;
  items: Title[];
  loading: boolean;
  onOpen: (item: Title) => void;
  /** Extra controls shown beside the heading, e.g. filter chips. */
  controls?: ReactNode;
  emptyText?: string;
};

export default function Row({
  id,
  heading,
  items,
  loading,
  onOpen,
  controls,
  emptyText = "Nothing to show in this row.",
}: Props) {
  const scroller = useRef<HTMLUListElement>(null);

  const page = (direction: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: direction * el.clientWidth * 0.8,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  // Left and right arrows step between cards, as well as Tab.
  const onKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const cards = Array.from(
      e.currentTarget.querySelectorAll<HTMLButtonElement>("button.card"),
    );
    const at = cards.indexOf(document.activeElement as HTMLButtonElement);
    if (at === -1) return;
    const next = cards[at + (e.key === "ArrowRight" ? 1 : -1)];
    if (next) {
      e.preventDefault();
      next.focus();
    }
  };

  return (
    <section className="row" aria-labelledby={`${id}-heading`}>
      <div className="row-head">
        <h2 id={`${id}-heading`} className="row-heading">
          {heading}
        </h2>
        {controls}
        <div className="row-arrows">
          <button
            type="button"
            className="icon-btn"
            aria-label={`Scroll ${heading} back`}
            onClick={() => page(-1)}
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            className="icon-btn"
            aria-label={`Scroll ${heading} forward`}
            onClick={() => page(1)}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {!loading && items.length === 0 ? (
        <p className="row-empty">{emptyText}</p>
      ) : (
        <ul
          className="row-scroller"
          ref={scroller}
          onKeyDown={onKeyDown}
          aria-busy={loading}
        >
          {loading
            ? Array.from({ length: 8 }, (_, i) => (
                <li key={i}>
                  <PosterSkeleton />
                </li>
              ))
            : items.map((item) => (
                <li key={item.id}>
                  <PosterCard item={item} onOpen={onOpen} />
                </li>
              ))}
        </ul>
      )}
    </section>
  );
}
