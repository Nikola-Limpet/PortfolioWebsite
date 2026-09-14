import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { experiences } from "../data";
import Reveal from "./Reveal";

export default function Experience() {
  const [selected, setSelected] = useState(0);
  return (
    <section id="experience" className="section experience-section">
      <Reveal>
        <h2>Experience.</h2>
      </Reveal>
      <div className="experience-list">
        {experiences.map((experience, i) => (
          <article
            key={experience.company_name}
            className={
              selected === i ? "experience-item expanded" : "experience-item"
            }
          >
            <h3>
              <button
                aria-expanded={selected === i}
                aria-controls={`experience-${i}`}
                onClick={() => setSelected(selected === i ? -1 : i)}
              >
                <span className="experience-date">{experience.date}</span>
                <span className="experience-role">
                  {i === 1 ? "Co-founder, CIMOC" : experience.title}
                  <small>{experience.company_name}</small>
                </span>
                <span className="experience-toggle">
                  {selected === i ? <FiMinus /> : <FiPlus />}
                </span>
              </button>
            </h3>
            <div
              id={`experience-${i}`}
              hidden={selected !== i}
              className="experience-detail"
            >
              <p>
                {
                  [
                    "400+ rooms. 100+ properties. One platform for Cambodian landlords.",
                    "An exam platform connecting 1,000+ students across 25 provinces.",
                    "Hands-on React training for 20+ students at AUPP.",
                  ][i]
                }
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
