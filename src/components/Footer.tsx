import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Logo size={24} />
          <p>
            A front-end demo. The titles are invented, the posters are drawn
            in code, and there is no video anywhere on the site.
          </p>
        </div>
        <nav className="footer-links" aria-label="Footer">
          <a href="/index.html">About this demo</a>
          <a href="/home/">Home</a>
          <a href="#">Contact</a>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
        </nav>
      </div>
      <p className="footer-legal">
        © {new Date().getFullYear()} FLIX Mini. Demo interface with sample data.
      </p>
    </footer>
  );
}
