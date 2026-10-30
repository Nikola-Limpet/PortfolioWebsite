import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";

const links = [
  ["projects", "Work"],
  ["about", "About"],
  ["experience", "Experience"],
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  const nav = useRef(null);
  useEffect(() => {
    if (!open) return;
    const close = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (event) => {
      if (!nav.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);
  return (
    <header className="header section-shell" ref={nav}>
      <a
        href="#hero"
        className="wordmark"
        aria-label="Nikola, home"
        onClick={() => setOpen(false)}
      >
        nikola<span>.</span>
      </a>
      <button
        ref={toggle}
        className="menu-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="main-navigation"
      >
        {open ? <FiX /> : <FiMenu />}
      </button>
      <nav
        id="main-navigation"
        className={open ? "navigation is-open" : "navigation"}
        aria-label="Main navigation"
      >
        {links.map(([id, label]) => (
          <a href={`#${id}`} key={id} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a
          className="nav-contact"
          href="#contact"
          onClick={() => setOpen(false)}
        >
          Let’s talk <FiArrowUpRight />
        </a>
      </nav>
    </header>
  );
}
