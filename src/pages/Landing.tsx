import { Poster } from "../components/PosterCard";
import { useFontsReady } from "../hooks/useFontsReady";
import { titles } from "../data/titles";

const shown = [titles[0], titles[1], titles[3]];
const filmCount = titles.filter((t) => t.kind === "Film").length;
const seriesCount = titles.length - filmCount;

export default function Landing() {
  const ready = useFontsReady();

  return (
    <main className="landing">
      <section className="landing-frame">
        <div className="landing-copy">
          <h1 className="landing-title">
            FLIX <span>Mini</span>
          </h1>
          <p className="landing-lede">
            A two-page interface study for a film and series catalogue. Every
            title is invented, every poster is drawn in code, and nothing here
            plays.
          </p>
          <a href="/home/" className="btn btn-primary">
            Open the home page
          </a>
        </div>
        <div className="landing-posters" aria-hidden="true">
          {shown.map((item) =>
            ready ? (
              <Poster key={item.id} item={item} />
            ) : (
              <span key={item.id} className="poster skeleton" />
            ),
          )}
        </div>
      </section>

      <section className="landing-notes" aria-labelledby="notes-heading">
        <h2 id="notes-heading" className="row-heading">
          What you are looking at
        </h2>
        <dl className="facts">
          <div>
            <dt>Catalogue</dt>
            <dd>
              {titles.length} made-up titles, {filmCount} films and{" "}
              {seriesCount} series, kept in one TypeScript file.
            </dd>
          </div>
          <div>
            <dt>Artwork</dt>
            <dd>
              Posters and backdrops are SVG generated from each title, so the
              same title always gets the same picture and no image is fetched.
            </dd>
          </div>
          <div>
            <dt>Playback</dt>
            <dd>
              None. There are no video files, embeds or stream links in the
              project.
            </dd>
          </div>
          <div>
            <dt>Built with</dt>
            <dd>React, TypeScript, Vite and plain CSS. No backend and no API.</dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
