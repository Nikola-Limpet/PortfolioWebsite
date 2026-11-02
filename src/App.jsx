import { FiArrowDown, FiArrowUpRight, FiArrowUp, FiPlus } from "react-icons/fi";
import Navigation, { Monogram } from "./components/Navigation";
import HeroScene from "./components/HeroScene";
import Work from "./components/Work";
import ContactForm from "./components/ContactForm";
import CopyEmail from "./components/CopyEmail";
import { experiences, certs, socials } from "./data";

const toolkit = [
  {
    title: "Interfaces",
    copy: "Thoughtful from the first interaction.",
    tools: "React / Next.js / TypeScript / Tailwind CSS",
  },
  {
    title: "Systems",
    copy: "The thinking behind what you see.",
    tools: "Node.js / NestJS / PostgreSQL / MongoDB",
  },
  {
    title: "Infrastructure",
    copy: "From a good idea to a working product.",
    tools: "AWS / Docker / CI/CD / Vercel",
  },
];

export default function App() {
  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <Navigation />
          <div className="hero-layout section-wrap">
            <div className="hero-copy" id="content" tabIndex={-1}>
              <p className="eyebrow hero-name">
                <span className="status-dot" /> Nikola Limpet · Developer &
                founder
              </p>
              <h1 id="hero-title">
                Thoughtful code.
                <br />
                <span>Meaningful</span>
                <br />
                products.
              </h1>
              <p className="hero-description">
                I turn complex ideas into digital experiences that feel simple.
                Built with care, from Cambodia.
              </p>
              <a className="hero-cta button button-dark" href="#projects">
                Explore my work <FiArrowDown aria-hidden="true" />
              </a>
              <div className="hero-footnote">
                <span>Design meets engineering.</span>
                <span>
                  Scroll to discover <FiArrowDown aria-hidden="true" />
                </span>
              </div>
            </div>
            <div className="hero-artwork">
              <HeroScene />
              <div className="artwork-caption">
                <span>Independent by nature.</span>
                <span>Intentional by design.</span>
              </div>
            </div>
          </div>
        </section>
        <div className="intro-strip section-wrap">
          <span className="eyebrow">An idea, all the way to launch.</span>
          <div>
            <span>Product thinking</span>
            <span>Interface design</span>
            <span>Full stack development</span>
          </div>
        </div>
        <Work />
        <section className="about" id="about" aria-labelledby="about-title">
          <div className="section-wrap">
            <div className="section-topline">
              <span>02 — A little about me</span>
              <span>Based in Cambodia</span>
            </div>
            <div className="about-grid">
              <div>
                <h2 id="about-title">
                  A curious mind.
                  <br />
                  A builder
                  <br />
                  <span>at heart.</span>
                </h2>
                <div className="about-signature">
                  <Monogram />
                  <span>
                    Nikola Limpet
                    <br />
                    <small>Based in Cambodia</small>
                  </span>
                </div>
              </div>
              <div className="about-body">
                <p className="large-copy">
                  Good software starts with understanding the people who use it.
                </p>
                <p>
                  I'm Nikola, a full stack developer, founder, and team lead. My
                  work brings thoughtful interfaces and dependable engineering
                  together.
                </p>
                <p>
                  From helping Cambodian landlords manage their properties to
                  making mathematics education more accessible, I build for the
                  people on the other side of the screen.
                </p>
                <a
                  className="text-link"
                  href="https://github.com/Nikola-Limpet"
                  target="_blank"
                  rel="noreferrer"
                >
                  A look inside my GitHub <FiArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="toolkit" id="skills">
              {toolkit.map((item, i) => (
                <div key={item.title}>
                  <span className="toolkit-number">/ 0{i + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                  <span className="toolkit-tools">{item.tools}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          className="experience section-wrap"
          id="experience"
          aria-labelledby="experience-title"
        >
          <div className="section-topline">
            <span>03 — Experience & learning</span>
            <span>Always a work in progress.</span>
          </div>
          <div className="experience-layout">
            <h2 id="experience-title">
              Building things.
              <br />
              <span>
                And growing
                <br />
                along the way.
              </span>
            </h2>
            <div className="experience-list">
              {experiences.map((item) => (
                <details key={item.company} className="experience-item">
                  <summary>
                    <span className="experience-date">{item.date}</span>
                    <span>
                      <strong>{item.title}</strong>
                      <span className="experience-company">{item.company}</span>
                    </span>
                    <FiPlus aria-hidden="true" />
                  </summary>
                  <div className="experience-description">
                    {item.details.map((detail) => (
                      <p key={detail}>{detail}</p>
                    ))}
                  </div>
                </details>
              ))}
              <details className="credentials" id="certifications">
                <summary>
                  <span>Certifications</span>
                  <span>
                    {certs.length} credentials <FiPlus aria-hidden="true" />
                  </span>
                </summary>
                <ul>
                  {certs.map((cert) => (
                    <li key={cert.name}>
                      <a href={cert.url} target="_blank" rel="noreferrer">
                        {cert.name}
                        <FiArrowUpRight aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          </div>
        </section>
        <section
          className="contact"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="section-wrap">
            <div className="section-topline">
              <span>04 — Get in touch</span>
              <span>Your next idea starts here.</span>
            </div>
            <div className="contact-heading">
              <h2 id="contact-title">
                Have something
                <br />
                <span>in mind?</span>
              </h2>
              <a
                className="contact-arrow"
                href="mailto:al9725755@gmail.com"
                aria-label="Email Nikola"
              >
                <FiArrowUpRight aria-hidden="true" />
              </a>
            </div>
            <div className="contact-grid">
              <div className="contact-intro">
                <p>
                  A project, a question, or an interesting idea.
                  <br />
                  I'd love to hear about it.
                </p>
                <a className="email-link" href="mailto:al9725755@gmail.com">
                  al9725755@gmail.com <FiArrowUpRight aria-hidden="true" />
                </a>
                <CopyEmail />
                <div className="socials">
                  {socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {social.name}
                      <FiArrowUpRight aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer section-wrap">
        <a
          className="footer-wordmark"
          href="#home"
          aria-label="Nikola, back to top"
        >
          nikola<span>.</span>
        </a>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Nikola Limpet</p>
          <span>Thoughtfully built, in Cambodia.</span>
          <a href="#home">
            Back to top <FiArrowUp aria-hidden="true" />
          </a>
        </div>
      </footer>
    </>
  );
}
