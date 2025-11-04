export default function Landing() {
  return (
    <main className="landing">
      <div className="landing-card">
        <div className="landing-logo">FHQ</div>
        <h1 className="landing-title">FLIXHQ</h1>
        <p className="muted">
          Watch movies and TV shows online free. No sign up. Ad-light. Updated
          daily.
        </p>
        <a href="/home/" className="primary-btn">
          Go to homepage
        </a>
        <section className="small-copy">
          <h3>Watch Movies and TV Shows Online Free</h3>
          <p className="muted">
            This is a compact demo inspired by your screenshots. Buttons and
            texts are small, spacing is tight, and the layout is dark for high
            contrast.
          </p>
        </section>
      </div>
    </main>
  );
}
