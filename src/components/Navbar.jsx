import { useEffect, useState } from "react";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";
const links = [
  ["projects", "Work"],
  ["about", "About"],
  ["experience", "Experience"],
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((section) => observer.observe(section));
    const escape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", escape);
    return () => {
      observer.disconnect();
      document.removeEventListener("keydown", escape);
    };
  }, []);
  return (
    <header className="site-header">
      <a
        className="wordmark"
        href="#hero"
        aria-label="Nikola Limpet home"
        onClick={() => setOpen(false)}
      >
        nikola<span className="wordmark-star">✳</span>
      </a>
      <nav
        id="main-navigation"
        className={open ? "navigation open" : "navigation"}
        aria-label="Main navigation"
      >
        {links.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? "location" : undefined}
            onClick={() => setOpen(false)}
          >
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
      <button
        className="menu-toggle"
        aria-controls="main-navigation"
        aria-expanded={open}
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen(!open)}
      >
        {open ? <FiX /> : <FiMenu />}
      </button>
    </header>
  );
}
