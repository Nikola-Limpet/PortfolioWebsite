import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  FiArrowUpRight,
  FiArrowDown,
  FiArrowRight,
  FiPlus,
  FiPause,
  FiPlay,
  FiCheck,
} from "react-icons/fi";
import { projects, certs } from "./data";
import ContactForm from "./components/ContactForm";
import Navigation from "./components/Navbar";
import Experience from "./components/Experience";
import Project from "./components/Project";
import Reveal from "./components/Reveal";
import useMotionPreference from "./hooks/useMotionPreference";

const SpaceJourney = lazy(() => import("./components/SpaceJourney"));

export default function App() {
  const reduced = useMotionPreference();
  const [paused, setPaused] = useState(false);
  const motionPaused = reduced || paused;
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef();
  useEffect(() => () => clearTimeout(copyTimer.current), []);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("al9725755@gmail.com");
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = "mailto:al9725755@gmail.com";
    }
  };
  return (
    <>
      <a className="skip-link" href="#projects">
        Skip to work
      </a>
      <div className="journey-background" aria-hidden="true" />
      <div className="hero-background" aria-hidden="true" />
      <Suspense
        fallback={
          <div className="space-scene">
            <div className="planet-fallback" />
          </div>
        }
      >
        <SpaceJourney paused={motionPaused} />
      </Suspense>
      <Navigation />
      <div className="journey-controls">
        <button
          className="motion-control"
          onClick={() => setPaused(!paused)}
          disabled={reduced}
          aria-pressed={motionPaused}
        >
          {motionPaused ? <FiPlay /> : <FiPause />}
          {reduced
            ? "Reduced motion"
            : motionPaused
              ? "Resume motion"
              : "Pause motion"}
        </button>
      </div>

      <main>
        <section id="hero" className="hero">
          <div className="hero-content">
            <p className="eyebrow hero-intro">
              Full stack developer & team lead
            </p>
            <h1>
              Nikola
              <br />
              <span>Limpet.</span>
            </h1>

            <div className="hero-actions">
              <a href="#projects" className="button button-primary">
                Explore my work <FiArrowDown />
              </a>
              <a href="#contact" className="text-link">
                Let’s talk <FiArrowUpRight />
              </a>
            </div>
          </div>
        </section>
        <div className="journey-transition" aria-hidden="true" />
        <section id="projects" className="section work-section">
          <Reveal className="section-heading">
            <h2>
              Selected
              <br />
              work.
            </h2>
          </Reveal>
          <div className="project-grid">
            {[projects[1], projects[0], projects[2], projects[3]].map(
              (project, index) => (
                <Project key={project.name} project={project} index={index} />
              ),
            )}
          </div>
          <Reveal className="more-project">
            <div>
              <p className="section-label">Also built</p>
              <h3>BigFat Pizza</h3>
            </div>
            <a
              className="text-link"
              href={projects[4].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View project <FiArrowUpRight />
            </a>
          </Reveal>
          <a
            className="text-link github-link"
            href="https://github.com/Nikola-Limpet"
            target="_blank"
            rel="noopener noreferrer"
          >
            More on GitHub <FiArrowUpRight />
          </a>
        </section>
        <section id="about" className="section about-section">
          <Reveal className="about-intro">
            <h2>
              Developer.
              <br />
              Founder.
              <br />
              <span className="muted">Team lead.</span>
            </h2>

            <div className="impact-strip">
              <div>
                <strong>1,000+</strong>
                <span>Users served</span>
              </div>
              <div>
                <strong>5+</strong>
                <span>Team members led</span>
              </div>
            </div>
          </Reveal>
          <Reveal className="capabilities">
            {[
              ["Frontend", "React / Next.js / TypeScript"],
              ["Backend", "Node.js / NestJS / Python"],
              ["Data", "PostgreSQL / MongoDB / Redis"],
              ["Cloud", "AWS / Docker / CI/CD"],
            ].map(([title, tools]) => (
              <div className="capability" key={title}>
                <h3>{title}</h3>
                <p>{tools}</p>
              </div>
            ))}
          </Reveal>
        </section>
        <Experience />
        <section id="certifications" className="section certifications-section">
          <details className="credentials">
            <summary>
              Credentials <FiPlus />
            </summary>
            <div>
              {certs.map((cert) => (
                <a
                  key={cert.name}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{cert.name}</span>
                  <FiArrowUpRight />
                </a>
              ))}
            </div>
          </details>
        </section>
        <section id="contact" className="section contact-section">
          <div className="contact-copy">
            <h2>
              Let’s build
              <br />
              <span>something.</span>
            </h2>
            <a className="email-link" href="mailto:al9725755@gmail.com">
              al9725755@gmail.com <FiArrowUpRight />
            </a>
            <button className="copy-email" onClick={copyEmail}>
              {copied && <FiCheck />}
              <span aria-live="polite">
                {copied ? "Email copied" : "Copy email address"}
              </span>
            </button>
            <div className="social-links">
              <a
                href="https://github.com/Nikola-Limpet"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <FiArrowUpRight />
              </a>
              <a
                href="https://www.linkedin.com/in/nikola-limpet-64a68227a/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <FiArrowUpRight />
              </a>
              <a
                href="https://t.me/yuujin168"
                target="_blank"
                rel="noopener noreferrer"
              >
                Telegram <FiArrowUpRight />
              </a>
            </div>
          </div>
          <ContactForm />
        </section>
      </main>
      <footer className="site-footer">
        <a className="wordmark" href="#hero">
          nikola<span className="wordmark-star">✳</span>
        </a>
        <span>© {new Date().getFullYear()} Nikola Limpet</span>
        <a href="#hero" className="text-link">
          Back to top <FiArrowRight className="up-arrow" />
        </a>
      </footer>
    </>
  );
}
