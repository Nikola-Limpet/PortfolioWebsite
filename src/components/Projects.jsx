import { motion } from "framer-motion";
import React, { useRef, useEffect } from "react";
import { projects } from "../data";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { gsap, ScrollTrigger } from "../utils/gsapUtils";

const ProjectCard = ({ project, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}>
        {/* Image */}
        <div className="w-full lg:w-1/2 relative group">
          <div className="absolute -inset-4 bg-quaternary/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative overflow-hidden rounded-2xl border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
            <img
              src={project.image}
              alt={project.name}
              className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Live badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full border border-white/10">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-white/80 font-medium">Live</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={`w-full lg:w-1/2 ${isEven ? 'lg:pl-4' : 'lg:pr-4'}`}>
          {/* Tagline */}
          <p className="text-quaternary text-sm font-mono mb-2 tracking-wider uppercase">
            {project.tagline}
          </p>

          {/* Title */}
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {project.name}
          </h3>

          {/* Description */}
          <p className="text-white/60 text-lg leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Stats */}
          {project.stats && (
            <div className="flex flex-wrap gap-6 mb-6">
              {Object.entries(project.stats).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-2xl font-bold text-white">{value}</div>
                  <div className="text-xs text-white/40 uppercase tracking-wider">{key}</div>
                </div>
              ))}
            </div>
          )}

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs font-medium text-white/70 bg-white/5 border border-white/10 rounded-full hover:border-quaternary/50 hover:text-quaternary transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA */}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-6 py-3 bg-white text-primary font-semibold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-white/20 hover:scale-105"
          >
            <span>View Project</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal line animation on scroll
      gsap.fromTo('.project-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <div ref={sectionRef} className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-[#0a1628] to-primary z-0" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-quaternary/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 -left-40 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[150px]" />

      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="max-w-3xl mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={`${styles.sectionText} mb-6`}>
            <span className="streaky-glow">Selected Work</span>
          </h2>
          <p className="text-white/50 text-xl">
            Products I've built that serve real users and solve real problems.
          </p>
          {/* Animated line */}
          <div className="project-line h-px bg-gradient-to-r from-quaternary to-transparent mt-8 origin-left" />
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-32">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>

        {/* Other Projects - Grid */}
        {otherProjects.length > 0 && (
          <motion.div
            className="mt-32"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">Other Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherProjects.map((project, index) => (
                <a
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-quaternary/50 transition-all duration-300 hover:-translate-y-2"
                >
                  <p className="text-quaternary text-xs font-mono mb-2 uppercase tracking-wider">
                    {project.tagline}
                  </p>
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-quaternary transition-colors">
                    {project.name}
                  </h4>
                  <p className="text-white/50 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-white/50 bg-white/5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SectionWrapper(Projects, "projects");
