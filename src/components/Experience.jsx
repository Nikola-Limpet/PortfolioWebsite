import { motion } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { experiences } from "../data";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { gsap, ScrollTrigger } from "../utils/gsapUtils";

const ExperienceCard = ({ experience, index, isActive, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className={`experience-card cursor-pointer relative pl-8 sm:pl-12 pb-12 last:pb-0 group transition-all duration-500 ${
        isActive ? "opacity-100" : "opacity-60 hover:opacity-80"
      }`}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: isActive ? 1 : 0.6, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      {/* Timeline connector */}
      <div className="absolute left-0 top-0 bottom-0 flex flex-col items-center">
        {/* Dot */}
        <div
          className={`w-4 h-4 rounded-full border-2 transition-all duration-500 z-10 ${
            isActive
              ? "bg-quaternary border-quaternary shadow-glow"
              : "bg-transparent border-white/30 group-hover:border-quaternary/50"
          }`}
        />
        {/* Line */}
        {index < experiences.length - 1 && (
          <div className="w-[2px] flex-1 bg-gradient-to-b from-white/20 to-transparent mt-2" />
        )}
      </div>

      {/* Content */}
      <div className="ml-4">
        {/* Date badge */}
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono tracking-wider mb-3 transition-all duration-300 ${
          isActive
            ? "bg-quaternary/20 text-quaternary border border-quaternary/30"
            : "bg-white/5 text-white/40 border border-white/10"
        }`}>
          {experience.date}
        </span>

        {/* Title */}
        <h3 className={`text-xl lg:text-2xl xl:text-3xl font-bold mb-2 transition-colors duration-300 ${
          isActive ? "text-white" : "text-white/50"
        }`}>
          {experience.title}
        </h3>

        {/* Company */}
        <p className={`text-sm lg:text-base font-medium transition-colors duration-300 ${
          isActive ? "text-quaternary" : "text-white/30"
        }`}>
          {experience.company_name}
        </p>
      </div>
    </motion.div>
  );
};

const ExperienceDetails = ({ experience }) => {
  return (
    <motion.div
      key={experience.title}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative"
    >
      {/* Glow background */}
      <div className="absolute -inset-4 bg-quaternary/5 rounded-3xl blur-2xl" />

      <div className="relative bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 lg:p-10 hover:border-quaternary/20 transition-all duration-500">
        {/* Header inside card */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-quaternary rounded-full" />
          <div>
            <h4 className="text-lg font-bold text-white">{experience.title}</h4>
            <p className="text-quaternary text-sm">{experience.company_name} | {experience.date}</p>
          </div>
        </div>

        {/* Details - content is from our own data file, not user input */}
        <ul className="space-y-6">
          {experience.details.map((detail, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex gap-4 items-start"
            >
              <span className="mt-2 w-2 h-2 rounded-full bg-quaternary/60 flex-shrink-0" />
              <span
                className="text-white/70 text-base lg:text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: detail }}
              />
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const [selectedJob, setSelectedJob] = useState(experiences[0]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-driven section title reveal
      gsap.fromTo('.experience-title',
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 1,
          }
        }
      );

      // Horizontal line reveal
      gsap.fromTo('.experience-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-[#0a1628]/60 to-primary/80 z-0" />

      {/* Decorative elements */}
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-quaternary/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 -left-40 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[150px]" />

      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="experience-title max-w-3xl mb-16">
          <h2 className={`${styles.sectionText} mb-4`}>
            <span className="streaky-glow">Experience</span>
          </h2>
          <p className="text-white/50 text-xl">
            Building products, leading teams, sharing knowledge.
          </p>
          <div className="experience-line h-px bg-gradient-to-r from-quaternary to-transparent mt-8 origin-left" />
        </div>

        {/* Layout: Timeline left, Details right */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Timeline */}
          <div className="lg:w-2/5">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={index}
                experience={experience}
                index={index}
                isActive={selectedJob === experience}
                onClick={() => setSelectedJob(experience)}
              />
            ))}
          </div>

          {/* Details panel */}
          <div className="lg:w-3/5 lg:sticky lg:top-24 lg:self-start">
            <ExperienceDetails experience={selectedJob} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, "experience");
