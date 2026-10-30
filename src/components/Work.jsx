import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiArrowRight, FiX } from "react-icons/fi";
import { projects } from "../data";

export default function Work() {
  const [filter, setFilter] = useState("All work");
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const trigger = useRef(null);
  const visible = projects.filter(
    (project) => filter === "All work" || project.category === filter,
  );

  useEffect(() => {
    if (!selected) return;
    const modal = dialog.current;
    modal.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      modal.close();
      document.body.style.overflow = previous;
      trigger.current?.focus({ preventScroll: true });
    };
  }, [selected]);

  function close() {
    setSelected(null);
  }
  function open(project, event) {
    trigger.current = event.currentTarget;
    setSelected(project);
  }

  return (
    <section
      className="work section-shell"
      id="projects"
      aria-labelledby="work-title"
    >
      <div className="work-heading">
        <div>
          <p className="section-kicker">Made to make a difference</p>
          <h2 id="work-title">
            Selected <em>work</em>
            <sup>04</sup>
          </h2>
        </div>
        <div className="work-filters" role="group" aria-label="Filter projects">
          {["All work", "Platforms", "Websites"].map((label) => (
            <button
              key={label}
              onClick={() => setFilter(label)}
              aria-pressed={filter === label}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="project-grid">
        {visible.map((project) => (
          <article
            className={`project-card project-${project.id}`}
            key={project.id}
          >
            <button
              className="project-visual"
              onClick={(event) => open(project, event)}
              aria-label={`Explore ${project.name}`}
            >
              <div className="project-browser">
                <div className="browser-bar" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span className="browser-address">{project.domain}</span>
                </div>
                <img
                  src={project.image}
                  srcSet={`${project.image.replace(".webp", "-small.webp")} 600w, ${project.image} 1400w`}
                  sizes="(max-width: 700px) 85vw, 45vw"
                  alt={`${project.name} website preview`}
                  width="1400"
                  height="950"
                  loading="lazy"
                />
              </div>
              <span className="project-open" aria-hidden="true">
                <FiArrowUpRight />
              </span>
            </button>
            <div className="project-caption">
              <div>
                <h3>
                  <button onClick={(event) => open(project, event)}>
                    {project.name}
                  </button>
                </h3>
                <p>{project.tagline}</p>
              </div>
              <span className="project-category">
                {project.category === "Websites"
                  ? "Website"
                  : "Web application"}
              </span>
            </div>
          </article>
        ))}
      </div>
      <div className="work-bottom">
        <p>Good ideas deserve to be built.</p>
        <a
          className="inline-link"
          href="https://github.com/Nikola-Limpet"
          target="_blank"
          rel="noreferrer"
        >
          More on GitHub <FiArrowUpRight />
        </a>
      </div>
      <dialog
        className="project-dialog"
        ref={dialog}
        onCancel={close}
        onClose={close}
        onClick={(event) => {
          if (event.target === dialog.current) {
            const bounds = dialog.current.getBoundingClientRect();
            if (
              event.clientX < bounds.left ||
              event.clientX > bounds.right ||
              event.clientY < bounds.top ||
              event.clientY > bounds.bottom
            )
              close();
          }
        }}
        aria-labelledby="project-dialog-title"
      >
        {selected && (
          <>
            <button
              className="dialog-close"
              onClick={close}
              aria-label="Close project"
            >
              <FiX />
            </button>
            <img
              className="dialog-image"
              src={selected.image}
              alt={`${selected.name} website`}
            />
            <div className="dialog-content">
              <p className="small-label">{selected.tagline}</p>
              <h2 id="project-dialog-title">{selected.name}</h2>
              <p>{selected.description}</p>
              <div className="project-metrics">
                {selected.metrics.map(([value, label]) => (
                  <div key={label}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
              <div className="tech-tags">
                {selected.tech.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <a
                className="button button-dark"
                href={selected.url}
                target="_blank"
                rel="noreferrer"
              >
                Visit live site <FiArrowRight />
              </a>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
