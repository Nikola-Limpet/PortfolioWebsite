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
          <div id="projects" className='relative z-30 bg-[#101827] mt-[-2px]'>
            <Projects />
          </div>
          <div id="certifications" className='relative z-30 bg-[#101827] mt-[-2px]'>
            <Certifications/>
          </div>
          <div id="skills" className='relative z-30 bg-[#101827] mt-[-2px]'>
            <SkillSections />
          </div>
          <div id="experience" className='relative z-30 mt-[-2px] bg-[#101827]'>
            <Experience />
          </div>
          <div id="contact" className='relative z-30 bg-[#101827]'>
            <Contact />
          </div>
          <div id='footer' className='relative z-30 bg-[#101827]'>
            <Footer />
          </div>

          
        </div>
      </div>
    </BrowserRouter>

  );
};

export default App;
