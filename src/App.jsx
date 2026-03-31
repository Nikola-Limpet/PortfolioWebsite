import { useEffect, useRef } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Certifications, Contact, Experience, Hero, Navbar, Projects, SkillSections } from "./components";
import Footer from "./components/Footer";
import { initScrollTrigger } from "./utils/gsapUtils";

const SectionDivider = () => (
  <div className="section-divider" aria-hidden="true" />
);

const App = () => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    // Initialize ScrollTrigger with the wrapper scroll container after DOM mount
    initScrollTrigger();
  }, []);

  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        {/* Subtle noise texture for depth */}
        <div className="noise-overlay" aria-hidden="true" />

        <Navbar />
        <div className='wrapper' ref={wrapperRef}>
          <div id="hero" className='z-10'>
            <Hero scrollContainer={wrapperRef} />
          </div>
          <div id="projects" className='relative z-30'>
            <Projects />
          </div>
          <SectionDivider />
          <div id="skills" className='relative z-30'>
            <SkillSections />
          </div>
          <SectionDivider />
          <div id="certifications" className='relative z-30'>
            <Certifications />
          </div>
          <SectionDivider />
          <div id="experience" className='relative z-30'>
            <Experience />
          </div>
          <SectionDivider />
          <div id="contact" className='relative z-30'>
            <Contact />
          </div>
          <div id='footer' className='relative z-30'>
            <Footer />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
