import React from "react";

export default function TopNavMPA() {
  const [open, setOpen] = React.useState(false);
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "/";
  const isInfo = pathname === "/" || pathname.endsWith("/index.html");

  return (
    <>
      <header className="nav">
        <div className="brand">
          <button
            className="icon-btn menu-toggle"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            ☰
          </button>
          <div className="logo">FHQ</div>
          <span className="brand-text">FLIXHQ</span>
        </div>
        <div className="nav-center">
          <a className="menu-item" href="/home/">
            Home
          </a>
          <a className="menu-item" href="#">
            Genre
          </a>
          <a className="menu-item" href="#">
            Country
          </a>
          <a className="menu-item" href="#">
            Movies
          </a>
          <a className="menu-item" href="#">
            TV Shows
          </a>
          <a className="menu-item" href="#">
            Top IMDB
          </a>
          <a className="menu-item" href="#">
            Android App
          </a>
        </div>
        <div className="nav-actions">
          <div className="search desktop-only">
            <span>⌕</span>
            <input type="search" aria-label="Search" placeholder="Enter keywords..." />
          </div>
          <button className="icon-btn mobile-only" aria-label="Search">
            ⌕
          </button>
          <a className={isInfo ? "active" : ""} href="/index.html">
            Info
          </a>
        </div>
      </header>

      <div
        className={`drawer-backdrop ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      />
      <aside className={`drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="drawer-header">
          <span className="brand-text">Menu</span>
          <button
            className="icon-btn"
            aria-label="Close"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>
        <div className="drawer-search">
          <div className="search">
            <span>⌕</span>
            <input type="search" aria-label="Search" placeholder="Enter keywords..." />
          </div>
        </div>
        <nav className="drawer-nav">
          <a href="/home/" onClick={() => setOpen(false)}>
            Home
          </a>
          <a href="#" onClick={() => setOpen(false)}>
            Genre
          </a>
          <a href="#" onClick={() => setOpen(false)}>
            Country
          </a>
          <a href="#" onClick={() => setOpen(false)}>
            Movies
          </a>
          <a href="#" onClick={() => setOpen(false)}>
            TV Shows
          </a>
          <a href="#" onClick={() => setOpen(false)}>
            Top IMDB
          </a>
          <a href="#" onClick={() => setOpen(false)}>
            Android App
          </a>
        </nav>
      </aside>
    </>
  );
}
