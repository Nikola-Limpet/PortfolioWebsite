import { motion } from "framer-motion";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { projects } from "../data";
import { styles } from "../styles";
import { gsap } from "../utils/gsapUtils";
import Magnetic from "./Magnetic";

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

// One full-viewport panel in the horizontal showcase (stacks vertically on mobile)
const ProjectPanel = ({ project, index, total }) => {
  return (
    <div className="project-panel relative w-full lg:w-screen lg:h-screen shrink-0 flex items-center py-16 lg:py-0">
      {/* Ghost index number */}
      <span
        aria-hidden="true"
        className="hidden lg:block absolute top-16 right-16 text-[10rem] font-bold leading-none text-white/[0.03] font-display select-none"
      >
        0{index + 1}
      </span>

      <div className="container mx-auto px-6 sm:px-10 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Image with 3D tilt */}
        <div className="relative">
          <TiltCard>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-quaternary/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-black/20">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full aspect-video object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-white/80 font-medium">Live</span>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Content */}
        <div>
          <p className="text-white/30 text-xs font-mono mb-2 tracking-widest">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </p>
          <p className="text-quaternary text-xs font-mono mb-3 tracking-widest uppercase">
            {project.tagline}
          </p>

          <h3 className="text-3xl lg:text-5xl font-bold text-white mb-4 font-display tracking-tight">
            {project.name}
          </h3>

          <p className="text-white/50 text-lg leading-relaxed mb-8 max-w-xl">
            {project.description}
          </p>

          {project.stats && (
            <div className="flex flex-wrap gap-8 mb-8">
              {Object.entries(project.stats).map(([key, value]) => (
                <AnimatedStat key={key} value={value} label={key} />
              ))}
            </div>
          )}

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

          <Magnetic>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-7 py-3.5 bg-white text-primary font-semibold rounded-full transition-shadow duration-300 hover:shadow-xl hover:shadow-white/20"
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
          </Magnetic>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Desktop: pin the showcase and scroll the track horizontally
    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      const pin = pinRef.current;
      if (!track || !pin) return;

      const getAmount = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => "+=" + getAmount(),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    // Header underline (all viewports)
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

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      <div className="relative z-10">
        {/* Header */}
        <div className={`${styles.sectionContainer} pt-24`}>
          <motion.div
            className="max-w-3xl"
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
        </div>

        {/* Horizontal showcase — pinned on desktop, stacked on mobile */}
        <div ref={pinRef} className="relative overflow-hidden">
          <div
            ref={trackRef}
            className="flex flex-col gap-20 lg:gap-0 lg:flex-row lg:flex-nowrap will-change-transform py-8 lg:py-0"
          >
            {featuredProjects.map((project, index) => (
              <ProjectPanel
                key={project.name}
                project={project}
                index={index}
                total={featuredProjects.length}
              />
            ))}
          </div>

          {/* Horizontal progress line (desktop only) */}
          <div className="hidden lg:block absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full w-full bg-quaternary origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>

        {/* Other Projects - Grid */}
        {otherProjects.length > 0 && (
          <motion.div
            className={`${styles.sectionContainer} pt-24 pb-24`}
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
    </section>
  );
};

export default Projects;
