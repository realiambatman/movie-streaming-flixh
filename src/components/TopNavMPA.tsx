import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { CloseIcon, MenuIcon, SearchIcon } from "./Icons";

const links = [
  { label: "Home", href: "/home/" },
  { label: "Genre", href: "#" },
  { label: "Country", href: "#" },
  { label: "Films", href: "#" },
  { label: "Series", href: "#" },
  { label: "Top rated", href: "#" },
];

export default function TopNavMPA() {
  const [open, setOpen] = useState(false);
  const drawerSearch = useRef<HTMLInputElement>(null);
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "/";
  const isInfo = pathname === "/" || pathname.endsWith("/index.html");
  const isHome = pathname.startsWith("/home");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const openSearch = () => {
    setOpen(true);
    // Wait for the drawer to become visible before moving focus into it.
    window.setTimeout(() => drawerSearch.current?.focus(), 60);
  };

  return (
    <>
      <header className="nav">
        <button
          type="button"
          className="icon-btn nav-menu"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="site-drawer"
          onClick={() => setOpen(true)}
        >
          <MenuIcon />
        </button>
        <a className="nav-brand" href="/index.html" aria-label="FLIX Mini, about this demo">
          <Logo />
        </a>
        <nav className="nav-links" aria-label="Main">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-current={link.href === "/home/" && isHome ? "page" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <form
            className="search nav-search"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <SearchIcon size={16} />
            <input type="search" aria-label="Search" placeholder="Search sample titles" />
          </form>
          <button
            type="button"
            className="icon-btn nav-search-btn"
            aria-label="Search"
            onClick={openSearch}
          >
            <SearchIcon />
          </button>
          <a
            className="nav-info"
            href="/index.html"
            aria-current={isInfo ? "page" : undefined}
          >
            About
          </a>
        </div>
      </header>

      <div
        className={`drawer-backdrop${open ? " is-open" : ""}`}
        onClick={() => setOpen(false)}
      />
      <aside
        id="site-drawer"
        className={`drawer${open ? " is-open" : ""}`}
        aria-label="Menu"
        aria-hidden={!open}
      >
        <div className="drawer-head">
          <Logo size={24} />
          <button
            type="button"
            className="icon-btn"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <CloseIcon />
          </button>
        </div>
        <form className="search" role="search" onSubmit={(e) => e.preventDefault()}>
          <SearchIcon size={16} />
          <input
            ref={drawerSearch}
            type="search"
            aria-label="Search"
            placeholder="Search sample titles"
          />
        </form>
        <nav className="drawer-links" aria-label="Menu">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-current={link.href === "/home/" && isHome ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/index.html"
            aria-current={isInfo ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            About this demo
          </a>
        </nav>
      </aside>
    </>
  );
}
