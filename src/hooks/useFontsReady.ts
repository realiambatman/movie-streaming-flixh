import { useEffect, useState } from "react";

// Poster titles are set in the display face, so content waits (briefly) for
// the web fonts and shows skeletons until they are in. Capped so a slow or
// failed font request never leaves the page stuck on skeletons.
export function useFontsReady(maxWaitMs = 1500): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let live = true;
    const done = () => {
      if (live) setReady(true);
    };
    const timer = window.setTimeout(done, maxWaitMs);
    if (document.fonts?.ready) {
      document.fonts.ready.then(done, done);
    } else {
      done();
    }
    return () => {
      live = false;
      window.clearTimeout(timer);
    };
  }, [maxWaitMs]);

  return ready;
}
