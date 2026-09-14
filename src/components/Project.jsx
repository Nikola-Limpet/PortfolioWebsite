import { FiArrowUpRight } from "react-icons/fi";
import Reveal from "./Reveal";

export default function Project({ project, index }) {
  return (
    <article id={`work-${index}`} className={`project-stop project-${index}`}>
      <Reveal className="project-panel">
        <a
          className="project-image"
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${project.name}`}
        >
          <img
            src={project.image}
            srcSet={`${project.image.replace(".webp", "-small.webp")} 600w, ${project.image} 1195w`}
            sizes="(max-width: 767px) 75vw, (max-width: 1600px) 48vw, 720px"
            alt={`${project.name} website preview`}
            loading="lazy"
            width="1440"
            height="900"
          />
          <span className="project-open">
            <FiArrowUpRight />
          </span>
        </a>
        <div className="project-info">
          <div>
            <p className="eyebrow">{project.tagline}</p>
            <h3>
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                {project.name}
              </a>
            </h3>
          </div>
          <FiArrowUpRight aria-hidden="true" />
        </div>
        <div className="project-tech">
          {project.tech.slice(0, 3).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </Reveal>
    </article>
  );
}
