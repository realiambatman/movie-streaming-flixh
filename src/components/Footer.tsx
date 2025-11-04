export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">DMCA</a>
          <a href="#">API</a>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
        </div>
        <div className="footer-actions">
          <button className="chip">Light</button>
          <button className="chip">Auto</button>
          <button className="chip">Dark</button>
        </div>
      </div>
      <div className="footer-bottom muted tiny">
        © {new Date().getFullYear()} FLIX Mini. Demo UI for screenshots.
      </div>
    </footer>
  );
}
