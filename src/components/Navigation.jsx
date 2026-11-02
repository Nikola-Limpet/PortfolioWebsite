import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";

export function Monogram() {
  return (
    <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path
        d="M5 30V6h6l14 24h6V6"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M5 30 31 6" stroke="currentColor" strokeWidth="1" opacity=".5" />
    </svg>
  );
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);
  return (
    <header className={`site-header ${open ? "menu-open" : ""}`}>
      <a
        className="brand"
        href="#home"
        aria-label="Nikola Limpet, home"
        onClick={() => setOpen(false)}
      >
        <Monogram />
        <span>
          nikola<span className="brand-dot">.</span>
        </span>
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="main-navigation"
        onClick={() => setOpen(!open)}
        ref={toggle}
      >
        {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
      </button>
      <nav
        id="main-navigation"
        aria-label="Main navigation"
        className={open ? "is-open" : ""}
      >
        <a href="#projects" onClick={() => setOpen(false)}>
          Work <span>04</span>
        </a>
        <a href="#about" onClick={() => setOpen(false)}>
          About
        </a>
        <a
          className="nav-contact"
          href="#contact"
          onClick={() => setOpen(false)}
        >
          Let's talk <FiArrowUpRight aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}
