import { useEffect, useRef } from "react";
import type { Title } from "../data/titles";
import TitleArt from "./TitleArt";
import { CloseIcon } from "./Icons";

type Props = { item: Title | null; onClose: () => void };

export default function TitleDialog({ item, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (item && !dialog.open) dialog.showModal();
    if (!item && dialog.open) dialog.close();
  }, [item]);

  return (
    <dialog
      ref={ref}
      className="title-dialog"
      aria-labelledby="title-dialog-heading"
      onClose={onClose}
      onClick={(e) => {
        // A click on the backdrop lands on the dialog element itself.
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {item && (
        <div className="title-dialog-body">
          <div className="title-dialog-art">
            <TitleArt item={item} shape="wide" />
          </div>
          <div className="title-dialog-text">
            <h2 id="title-dialog-heading" className="title-dialog-heading">
              {item.title}
            </h2>
            <ul className="meta">
              <li>{item.kind}</li>
              <li>{item.genre}</li>
              <li>{item.year}</li>
              <li>{item.length}</li>
            </ul>
            <p className="title-dialog-logline">{item.logline}</p>
            <p className="note">
              Invented sample title. This demo has no video, so there is
              nothing to play.
            </p>
          </div>
          <button
            type="button"
            className="icon-btn title-dialog-close"
            aria-label="Close details"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </dialog>
  );
}
