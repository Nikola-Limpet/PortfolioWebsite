import { useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Certifications, Contact, Experience, Hero, Navbar, Projects, SkillSections } from "./components";
import Footer from "./components/Footer";
import SpaceJourney from "./components/SpaceJourney";
import ScrollProgress from "./components/ScrollProgress";
import { ScrollTrigger } from "./utils/gsapUtils";
import { initSmoothScroll, destroySmoothScroll } from "./utils/smoothScroll";

const App = () => {
  useEffect(() => {
    initSmoothScroll();
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => destroySmoothScroll();
  }, []);

  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        {/* Subtle noise texture for depth */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* The world — one continuous 3D journey behind everything */}
        <SpaceJourney />

        {/* Edge vignette keeps overlay text readable against the scene */}
        <div
          className="fixed inset-0 z-[1] pointer-events-none"
          aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.45) 100%)' }}
        />

        <ScrollProgress />
        <Navbar />

        <main className='relative z-10'>
          <div id="hero">
            <Hero />
          </div>
          <div id="projects" className='relative'>
            <Projects />
          </div>
          <div id="skills" className='relative'>
            <SkillSections />
          </div>
          <div id="certifications" className='relative'>
            <Certifications />
          </div>
          <div id="experience" className='relative'>
            <Experience />
          </div>
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
