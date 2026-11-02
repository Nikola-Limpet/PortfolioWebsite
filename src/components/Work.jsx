import { useState } from "react";
import { FiArrowUpRight, FiPlus } from "react-icons/fi";
import { projects } from "../data";
import ProjectArt from "./ProjectArt";

export default function Work() {
  const [filter, setFilter] = useState("All work");
  const visible = projects.filter(
    (project) => filter === "All work" || project.category === filter,
  );
  return (
    <section
      className="work section-wrap"
      id="projects"
      aria-labelledby="work-title"
    >
      <div className="section-topline">
        <span>01 — Selected projects</span>
        <span>A selection of things I’ve built</span>
      </div>
      <div className="work-heading">
        <h2 id="work-title">
          Selected work<span className="pink-dot">.</span>
        </h2>
        <p>
          Useful products. Thoughtful experiences.
          <br />
          From the first idea to the people using it.
        </p>
      </div>
      <div className="work-filters" role="group" aria-label="Filter projects">
        {["All work", "Platforms", "Websites"].map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
          >
            {item}
            <span>
              {item === "All work" ? "04" : item === "Platforms" ? "03" : "01"}
            </span>
          </button>
        ))}
      </div>
      <div className="project-list">
        {visible.map((project) => (
          <article
            className="project-entry"
            key={project.id}
            aria-labelledby={`project-${project.id}`}
          >
            <div className="project-visual">
              <ProjectArt kind={project.id} />
              <span className="project-number">
                0{projects.indexOf(project) + 1} / {project.category}
              </span>
              <span className="project-art-label">Concept artwork</span>
            </div>
            <div className="project-info">
              <div className="project-meta">
                <span>{project.domain}</span>
                <span>Design & development</span>
              </div>
              <h3 id={`project-${project.id}`}>{project.name}</h3>
              <p className="project-tagline">{project.tagline}</p>
              <div className="project-metrics">
                {project.metrics.map(([number, label]) => (
                  <div key={label}>
                    <strong>{number}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
              <a
                className="text-link"
                href={project.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit project: ${project.name}`}
              >
                Visit project <FiArrowUpRight aria-hidden="true" />
              </a>
              <details className="project-details">
                <summary>
                  Behind the project <FiPlus aria-hidden="true" />
                </summary>
                <p>{project.description}</p>
                <ul className="tech-list" aria-label="Technologies">
                  {project.tech.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </details>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
