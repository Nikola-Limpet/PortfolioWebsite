import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { projects } from "../data";  // use prop of this to retrive image and description
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { projectBg } from "../assets";

const ProjectCard = ({
  index,
  name,
  description,
  image,
  url,
}) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={fadeIn("up", "spring", index * 0.15, 0.75)}
      className={`w-full mt-10 flex flex-col md:flex-row ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-7 bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl`}
    >
      <div className='relative w-full md:w-3/5 overflow-hidden group'>
        <div className="absolute inset-0 bg-quaternary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
        <img
          src={image}
          alt='project_image'
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-70'
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent h-1/4 z-20"></div>
      </div>

      <div className={`w-full md:w-2/5 px-6 py-8 md:p-10 flex flex-col justify-center ${isEven ? "text-left md:text-left" : "text-left md:text-right"}`}>
        <h3 className='text-white font-bold text-2xl md:text-3xl xl:text-4xl leading-tight'>{name}</h3>
        <div className="w-16 h-1 bg-quaternary my-4 rounded-full"></div>
        {Array.isArray(description) ? (
          <ul className={`mt-4 text-white/90 space-y-2 ${isEven ? "list-disc pl-5" : "list-disc md:list-none pl-5 md:pl-0"}`}>
            {description.map((item, idx) => (
              <li key={idx} className="text-sm md:text-base">{item}</li>
            ))}
          </ul>
        ) : (
          <p className='mt-4 text-white/90 text-sm md:text-base'>{description}</p>
        )}
        <a 
          href={url} 
          className="bg-quaternary hover:bg-quaternary/80 text-white font-medium py-3 px-6 mt-6 rounded-md inline-block transition-all duration-300 hover:shadow-lg hover:shadow-quaternary/30 hover:-translate-y-1 w-auto self-start"
          target="_blank" 
          rel="noopener noreferrer"
        > 
          View Project
        </a>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <div className='relative'>
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src={projectBg} 
          alt="Background" 
          className="w-full h-full object-cover opacity-40"
          style={{ filter: 'brightness(0.7) contrast(1.1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary/95"></div>
      </div>
      
      {/* Content */}
      <div className='relative z-10 text-center md:text-left md:px-18 lg:px-38 py-16'>
        <motion.div 
          variants={textVariant()}
          className="relative mb-16"
        >
          <div className="absolute -top-8 left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0 w-20 h-1 bg-quaternary"></div>
          <h2 className={`${styles.sectionText} relative inline-block`}>Projects</h2>
          <div className="w-full md:w-1/3 h-px bg-quaternary/30 mt-6"></div>
        </motion.div>

        <motion.p 
          variants={fadeIn("up", "spring", 0.2, 0.8)}
          className="text-white/80 text-lg max-w-2xl mx-auto md:mx-0 mb-16"
        >
          Here are some of my recent projects that showcase my skills and experience. Each project reflects my ability to solve complex problems, work with different technologies, and manage projects effectively.
        </motion.p>

        <div className='flex flex-col gap-16 md:gap-24'>
          {projects.map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Projects, "projects");
