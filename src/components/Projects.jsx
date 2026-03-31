import { motion } from "framer-motion";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { projects } from "../data";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { gsap, ScrollTrigger } from "../utils/gsapUtils";

const TiltCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale3d(1.02, 1.02, 1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
  }, []);

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
};

const AnimatedStat = ({ value, label }) => {
  const [display, setDisplay] = useState("0");
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const numMatch = value.match(/(\d+)/);
          if (!numMatch) { setDisplay(value); return; }
          const target = parseInt(numMatch[1]);
          const suffix = value.replace(/\d+/, '');
          const duration = 1500;
          const start = performance.now();

          const animate = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.floor(target * eased) + suffix);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl font-bold text-white font-display">{display}</div>
      <div className="text-xs text-white/40 uppercase tracking-wider font-mono">{label}</div>
    </div>
  );
};

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
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}>
        {/* Image with 3D tilt */}
        <div className="w-full lg:w-1/2 relative">
          <TiltCard>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-quaternary/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-black/20">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Live badge */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-white/80 font-medium">Live</span>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Content */}
        <div className={`w-full lg:w-1/2 ${isEven ? 'lg:pl-4' : 'lg:pr-4'}`}>
          <p className="text-quaternary text-xs font-mono mb-3 tracking-widest uppercase">
            {project.tagline}
          </p>

          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-display tracking-tight">
            {project.name}
          </h3>

          <p className="text-white/50 text-lg leading-relaxed mb-8">
            {project.description}
          </p>

          {/* Stats with animated counters */}
          {project.stats && (
            <div className="flex flex-wrap gap-8 mb-8">
              {Object.entries(project.stats).map(([key, value]) => (
                <AnimatedStat key={key} value={value} label={key} />
              ))}
            </div>
          )}

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs font-medium text-white/60 bg-white/[0.04] border border-white/[0.08] rounded-full hover:border-quaternary/40 hover:text-quaternary transition-all duration-300 font-mono"
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
            className="group inline-flex items-center gap-3 px-7 py-3.5 bg-white text-primary font-semibold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-white/20 hover:scale-[1.03]"
          >
            <span>View Project</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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
    <div ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-[#081a2e] to-primary z-0" />

      {/* Unique decoration for Projects — diagonal gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-quaternary/[0.03] to-transparent z-0" />

      <div className={`${styles.sectionContainer} relative z-10`}>
        {/* Header */}
        <motion.div
          className="max-w-3xl mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={`${styles.sectionText} mb-6`}>
            <span className="streaky-glow">Selected Work</span>
          </h2>
          <p className="text-white/40 text-xl font-light">
            Products I've built that serve real users and solve real problems.
          </p>
          <div className="project-line h-px bg-gradient-to-r from-quaternary to-transparent mt-10 origin-left" />
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-36">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>

        {/* Other Projects - Grid */}
        {otherProjects.length > 0 && (
          <motion.div
            className="mt-36"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-white mb-10 font-display">Other Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherProjects.map((project) => (
                <TiltCard key={project.name}>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group block ${styles.glassCard} p-8`}
                  >
                    <p className="text-quaternary text-xs font-mono mb-2 uppercase tracking-widest">
                      {project.tagline}
                    </p>
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-quaternary transition-colors font-display">
                      {project.name}
                    </h4>
                    <p className="text-white/40 text-sm mb-6 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs text-white/40 bg-white/[0.04] rounded font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </a>
                </TiltCard>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SectionWrapper(Projects, "projects");
