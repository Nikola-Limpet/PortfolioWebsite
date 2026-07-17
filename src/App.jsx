import { useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Certifications, Contact, Experience, Hero, Navbar, Projects, SkillSections } from "./components";
import Footer from "./components/Footer";
import Starfield from "./components/Starfield";
import ScrollProgress from "./components/ScrollProgress";
import { ScrollTrigger } from "./utils/gsapUtils";
import { initSmoothScroll, destroySmoothScroll } from "./utils/smoothScroll";

const SectionDivider = () => (
  <div className="section-divider" aria-hidden="true" />
);

const App = () => {
  useEffect(() => {
    initSmoothScroll();
    // Recalculate trigger positions once layout has settled
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => destroySmoothScroll();
  }, []);

  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        {/* Subtle noise texture for depth */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Global 3D starfield behind all sections */}
        <Starfield />

        <ScrollProgress />
        <Navbar />

        <main className='relative z-10'>
          <div id="hero">
            <Hero />
          </div>
          <div id="projects" className='relative'>
            <Projects />
          </div>
          <SectionDivider />
          <div id="skills" className='relative'>
            <SkillSections />
          </div>
          <SectionDivider />
          <div id="certifications" className='relative'>
            <Certifications />
          </div>
          <SectionDivider />
          <div id="experience" className='relative'>
            <Experience />
          </div>
          <SectionDivider />
          <div id="contact" className='relative'>
            <Contact />
          </div>
          <div id='footer' className='relative'>
            <Footer />
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
