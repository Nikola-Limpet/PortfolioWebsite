import { useEffect, useRef, useState } from "react";
import {
  FiArrowDown,
  FiArrowUpRight,
  FiArrowUp,
  FiCopy,
  FiCheck,
} from "react-icons/fi";
import Navigation from "./components/Navigation";
import Studio from "./components/Studio";
import Work from "./components/Work";
import ContactForm from "./components/ContactForm";
import { certs, experiences, socials } from "./data";

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    try {
      await navigator.clipboard.writeText("al9725755@gmail.com");
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = "mailto:al9725755@gmail.com";
    }
  }
  return (
    <button
      className="copy-button"
      onClick={copy}
      aria-label={copied ? "Email copied" : "Copy email address"}
    >
      {copied ? <FiCheck /> : <FiCopy />}
      <span aria-live="polite">{copied ? "Copied!" : "Copy"}</span>
    </button>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <section
          className="hero section-shell"
          id="hero"
          aria-labelledby="hero-title"
        >
          <div className="hero-copy">
            <p className="eyebrow">Full stack developer & founder</p>
            <h1 id="hero-title">
              Ideas into
              <br />
              <em>real things.</em>
            </h1>
            <p className="hero-description">
              I’m Nikola. I build thoughtful digital products that make everyday
              life a little better.
            </p>
            <a className="button button-dark" href="#projects">
              Discover my work <FiArrowDown />
            </a>
          </div>
          <Studio />
          <div className="hero-footnote">
            <span>Code with purpose. Design with feeling.</span>
            <span>Independent developer, based in Cambodia.</span>
          </div>
        </section>
        <Work />
        <section
          className="about section-shell"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="section-kicker">A little about me</div>
          <div className="about-layout">
            <h2 id="about-title">
              Curious mind.
              <br />
              Builder <em>at heart.</em>
            </h2>
            <div className="about-story">
              <p>
                I’m Nikola Limpet, a full stack developer, founder, and team
                lead. I turn the messy beginnings of an idea into products
                people can actually use.
              </p>
              <p>
                My work lives where thoughtful interfaces meet dependable
                engineering. From helping landlords manage their properties to
                making math education more accessible, I like building things
                that matter to the people using them.
              </p>
              <a
                className="inline-link"
                href="https://github.com/Nikola-Limpet"
                target="_blank"
                rel="noreferrer"
              >
                A look inside my GitHub <FiArrowUpRight />
              </a>
            </div>
          </div>
          <div className="expertise" id="skills">
            <div className="expertise-intro">
              <span className="small-label">My toolkit</span>
              <p>
                From the first sketch
                <br />
                to the final deploy.
              </p>
            </div>
            {[
              ["Interface", "React · Next.js", "TypeScript · Tailwind CSS"],
              ["Architecture", "Node.js · NestJS", "PostgreSQL · MongoDB"],
              ["Infrastructure", "AWS · Docker", "CI/CD · Vercel"],
            ].map(([title, first, second]) => (
              <div className="expertise-item" key={title}>
                <h3>{title}</h3>
                <p>
                  {first}
                  <br />
                  {second}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section
          className="experience section-shell"
          id="experience"
          aria-labelledby="experience-title"
        >
          <div className="experience-heading">
            <h2 id="experience-title">
              Always <em>building.</em>
            </h2>
            <p>A few chapters in the story so far.</p>
          </div>
          <div className="experience-list">
            {experiences.map((item) => (
              <details className="experience-item" key={item.company}>
                <summary>
                  <span className="experience-date">{item.date}</span>
                  <span className="experience-role">
                    <strong>{item.title}</strong>
                    <span>{item.company}</span>
                  </span>
                  <span className="disclosure-icon" aria-hidden="true">
                    +
                  </span>
                </summary>
                <div className="experience-details">
                  {item.details.map((detail) => (
                    <p key={detail}>{detail}</p>
                  ))}
                </div>
              </details>
            ))}
            <details className="credentials" id="certifications">
              <summary>
                <span>Certifications</span>
                <span className="credentials-count">
                  {certs.length} credentials
                </span>
                <span className="disclosure-icon" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="credentials-list">
                {certs.map((cert) => (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer"
                    key={cert.name}
                  >
                    {cert.name}
                    <FiArrowUpRight />
                  </a>
                ))}
              </div>
            </details>
          </div>
        </section>
        <section
          className="contact section-shell"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="contact-intro">
            <p className="section-kicker">Have something in mind?</p>
            <h2 id="contact-title">
              Good things start
              <br />
              with a <em>hello.</em>
            </h2>
            <p>
              Have a project, a question, or an interesting idea?
              <br />
              I’d love to hear about it.
            </p>
            <div className="email-row">
              <a href="mailto:al9725755@gmail.com">al9725755@gmail.com</a>
              <CopyEmail />
            </div>
            <div className="social-links">
              {socials.map((social) => (
                <a
                  href={social.url}
                  key={social.name}
                  target="_blank"
                  rel="noreferrer"
                >
                  {social.name}
                  <FiArrowUpRight />
                </a>
              ))}
            </div>
          </div>
          <ContactForm />
        </section>
      </main>
      <footer className="footer section-shell">
        <a className="wordmark" href="#hero" aria-label="Nikola, back to top">
          nikola<span>.</span>
        </a>
        <p>© {new Date().getFullYear()} Nikola Limpet</p>
        <a className="back-top" href="#hero">
          Back to top <FiArrowUp />
        </a>
      </footer>
    </>
  );
}
