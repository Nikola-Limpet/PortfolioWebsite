import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { close, menu, logo } from "../assets";
import { navLinks } from "../data";
import { scrollToSection } from "../utils/smoothScroll";

// Shooting-star scroll indicator that travels along the dot rail.
// Falls downward when scrolling down, rises when scrolling up, and grows a
// light trail opposite to its direction of travel — brighter the faster you go.
const RailComet = ({ railRef }) => {
  const cometRef = useRef(null);
  const tailUpRef = useRef(null);
  const tailDownRef = useRef(null);

  useEffect(() => {
    let raf;
    let cur = 0;

    const tick = () => {
      const rail = railRef.current;
      const comet = cometRef.current;
      if (rail && comet) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
        const range = rail.clientHeight - 8;
        const target = progress * range;

        // Trailing ease — the comet lags behind the scroll, like it's falling
        const v = target - cur;
        cur += v * 0.1;
        comet.style.transform = `translateY(${cur}px)`;

        // Trail stretches with speed, in the direction we came from
        const stretch = Math.min(Math.abs(v) * 0.3, 3.5);
        if (tailUpRef.current && tailDownRef.current) {
          tailUpRef.current.style.transform = `translateX(-50%) scaleY(${v > 0.05 ? stretch : 0})`;
          tailDownRef.current.style.transform = `translateX(-50%) scaleY(${v < -0.05 ? stretch : 0})`;
        }
        comet.style.opacity = String(0.45 + Math.min(Math.abs(v) * 0.04, 0.55));
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [railRef]);

  return (
    <div
      ref={cometRef}
      aria-hidden="true"
      className="absolute right-[2px] top-0 w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9),0_0_20px_rgba(103,232,249,0.4)] pointer-events-none will-change-transform"
    >
      <span
        ref={tailUpRef}
        className="absolute bottom-full left-1/2 w-px h-6 bg-gradient-to-t from-cyan-300/70 to-transparent origin-bottom"
        style={{ transform: "translateX(-50%) scaleY(0)" }}
      />
      <span
        ref={tailDownRef}
        className="absolute top-full left-1/2 w-px h-6 bg-gradient-to-b from-cyan-300/70 to-transparent origin-top"
        style={{ transform: "translateX(-50%) scaleY(0)" }}
      />
    </div>
  );
};

const Navbar = () => {
  const [active, setActive] = useState("hero");
  const [toggle, setToggle] = useState(false);
  const railRef = useRef(null);

  // Track which section crosses the viewport center. threshold: 0 (not a
  // percentage) is required here — pinned sections are taller than the
  // viewport, so a fractional threshold would never fire for them.
  useEffect(() => {
    const ids = navLinks.map((n) => n.id);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "-45% 0px -45% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setActive(id);
    scrollToSection(`#${id}`);
  };

  return (
    <>
      {/* Top bar: logo + mobile menu */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-start justify-between p-6 sm:px-10 sm:py-8 pointer-events-none">
        <a
          className="pointer-events-auto cursor-pointer"
          href="#hero"
          onClick={(e) => handleNavClick(e, "hero")}
          aria-label="Back to top"
        >
          <img src={logo} alt="logo" className="w-[50px] h-[70px] object-contain" />
        </a>

        {/* Mobile hamburger */}
        <div className="sm:hidden pointer-events-auto">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: toggle ? 1 : 0, y: toggle ? 0 : -20 }}
            transition={{ duration: 0.3 }}
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 absolute top-20 right-4 min-w-[160px] rounded-xl bg-primary/90 backdrop-blur-md border border-tertiary/30`}
          >
            <ul className="list-none flex flex-col gap-4 w-full">
              {navLinks.map((nav) => (
                <li key={nav.id}>
                  <a
                    href={`#${nav.id}`}
                    onClick={(e) => {
                      setToggle(false);
                      handleNavClick(e, nav.id);
                    }}
                    className={`font-medium text-[16px] transition-colors duration-300 ${
                      active === nav.id ? "text-quaternary" : "text-white/70"
                    } hover:text-quaternary`}
                  >
                    {nav.title}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </nav>

      {/* Desktop dot rail — right edge, vertically centered */}
      <div
        ref={railRef}
        className="hidden sm:flex fixed right-5 lg:right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-5"
      >
        {/* Faint track the comet travels along */}
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 right-[4px] w-px bg-white/10"
        />

        {/* Shooting-star scroll indicator */}
        <RailComet railRef={railRef} />

        {navLinks.map((nav) => {
          const isActive = active === nav.id;
          return (
            <a
              key={nav.id}
              href={`#${nav.id}`}
              onClick={(e) => handleNavClick(e, nav.id)}
              className="group relative flex items-center justify-end cursor-pointer py-1"
              aria-label={nav.title}
              aria-current={isActive ? "true" : undefined}
            >
              {/* Label — slides in on hover, always visible for active section */}
              <span
                className={`absolute right-7 px-2.5 py-1 rounded-md text-xs font-medium tracking-wide whitespace-nowrap bg-black/60 backdrop-blur-md border border-white/10 transition-all duration-300 ${
                  isActive
                    ? "opacity-100 translate-x-0 text-quaternary"
                    : "opacity-0 translate-x-2 text-white/80 group-hover:opacity-100 group-hover:translate-x-0"
                }`}
              >
                {nav.title}
              </span>

              {/* Dot — elongates and glows when active */}
              <span
                className={`block rounded-full transition-all duration-500 ease-out ${
                  isActive
                    ? "w-2.5 h-8 bg-quaternary shadow-[0_0_14px_rgba(22,137,200,0.9)]"
                    : "w-2.5 h-2.5 bg-white/25 group-hover:bg-white/60 group-hover:scale-125"
                }`}
              />
            </a>
          );
        })}
      </div>
    </>
  );
};

export default Navbar;
