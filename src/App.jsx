import { useEffect, useRef } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Certifications, Contact, Experience, Hero, Navbar, Projects, SkillSections } from "./components";
import Footer from "./components/Footer";

const App = () => {
  const wrapperRef = useRef(null);

  return (
    <BrowserRouter>
      <div className='relative z-0 bg-[#101827]'>
        <Navbar />
        <div className='wrapper' ref={wrapperRef}>
          <div id="hero" className='z-10'>
            <Hero scrollContainer={wrapperRef} />
          </div>
          <div id="projects" className='relative z-30'>
            <Projects />
          </div>
          <div id="skills" className='relative z-30'>
            <SkillSections />
          </div>
          <div id="certifications" className='relative z-30 bg-primary'>
            <Certifications/>
          </div>
          <div id="experience" className='relative z-30 bg-primary'>
            <Experience />
          </div>
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
