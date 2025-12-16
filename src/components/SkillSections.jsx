import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaJs, FaReact, FaNodeJs, FaAws, FaDocker, FaGithub, FaPython } from 'react-icons/fa';
import { SiTypescript, SiExpress, SiMongodb, SiPostgresql, SiNextdotjs, SiTailwindcss, SiHtml5, SiCss3, SiRedis, SiNestjs } from 'react-icons/si';
import { gsap, ScrollTrigger } from '../utils/gsapUtils';

const SkillSections = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const sectionRef = useRef(null);

  // Organized by what you actually use - no fake percentages
  const skillCategories = [
    {
      title: 'Frontend',
      description: 'Building responsive, interactive interfaces',
      skills: [
        { name: 'React', icon: FaReact, color: '#61DAFB' },
        { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
        { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
        { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
        { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
        { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
      ]
    },
    {
      title: 'Backend',
      description: 'Scalable server-side architecture',
      skills: [
        { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
        { name: 'NestJS', icon: SiNestjs, color: '#E0234E' },
        { name: 'Express', icon: SiExpress, color: '#ffffff' },
        { name: 'Python', icon: FaPython, color: '#3776AB' },
      ]
    },
    {
      title: 'Database & Cloud',
      description: 'Data management and deployment',
      skills: [
        { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
        { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
        { name: 'Redis', icon: SiRedis, color: '#DC382D' },
        { name: 'AWS', icon: FaAws, color: '#FF9900' },
        { name: 'Docker', icon: FaDocker, color: '#2496ED' },
        { name: 'GitHub Actions', icon: FaGithub, color: '#ffffff' },
      ]
    },
  ];

  // GSAP ScrollTrigger for parallax
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.skill-stars', {
        y: 100,
        rotation: 3,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      gsap.to('.skill-sun', {
        y: -80,
        rotation: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      gsap.to('.skill-planets', {
        y: 150,
        rotation: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.skill-mountain-far', {
        y: 200,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      gsap.to('.skill-mountain-close', {
        y: 280,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      gsap.to('.skill-crater', {
        y: 350,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.3,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden py-20">
      {/* Parallax Background - Same as Hero */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, #010d18 0%, #011825 30%, #0D3056 100%)',
          zIndex: 0
        }}
      />

      <div
        className="skill-stars absolute inset-0 will-change-transform"
        style={{
          backgroundImage: 'url("/parallax/1Stars.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          zIndex: 1
        }}
      />

      <div
        className="skill-sun absolute inset-0 will-change-transform"
        style={{
          backgroundImage: 'url("/parallax/6Sun.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'left top',
          opacity: 0.7,
          zIndex: 2
        }}
      />

      <div
        className="skill-planets absolute inset-0 will-change-transform"
        style={{
          backgroundImage: 'url("/parallax/2Planets.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 3
        }}
      />

      <div
        className="skill-mountain-far absolute inset-0 will-change-transform"
        style={{
          backgroundImage: 'url("/parallax/3Mountain.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom center',
          zIndex: 4
        }}
      />

      <div
        className="skill-mountain-close absolute inset-0 will-change-transform"
        style={{
          backgroundImage: 'url("/parallax/4Mountain.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom center',
          zIndex: 5
        }}
      />

      <div
        className="skill-crater absolute inset-0 will-change-transform"
        style={{
          backgroundImage: 'url("/parallax/5Crater.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom center',
          zIndex: 6
        }}
      />

      {/* Content Container */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Clean, no fluff */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            <span className="streaky-glow">Tech Stack</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Tools I use to build scalable web applications
          </p>
        </motion.div>

        {/* Skill Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.15 }}
            >
              {/* Category Card */}
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full hover:border-white/20 transition-all duration-500">
                {/* Category Header */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                  <p className="text-white/40 text-sm">{category.description}</p>
                </div>

                {/* Skills Grid - Clean icons with hover */}
                <div className="grid grid-cols-3 gap-4">
                  {category.skills.map((skill, index) => {
                    const IconComponent = skill.icon;
                    const isHovered = hoveredSkill === `${category.title}-${skill.name}`;

                    return (
                      <motion.div
                        key={skill.name}
                        className="relative flex flex-col items-center gap-2 p-3 rounded-xl cursor-pointer group/skill"
                        onMouseEnter={() => setHoveredSkill(`${category.title}-${skill.name}`)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {/* Glow on hover */}
                        <motion.div
                          className="absolute inset-0 rounded-xl"
                          style={{ backgroundColor: skill.color }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isHovered ? 0.15 : 0 }}
                          transition={{ duration: 0.3 }}
                        />

                        {/* Icon */}
                        <div
                          className="relative z-10 transition-all duration-300"
                          style={{ color: isHovered ? skill.color : 'rgba(255,255,255,0.6)' }}
                        >
                          <IconComponent size={28} />
                        </div>

                        {/* Name */}
                        <span
                          className="relative z-10 text-xs font-medium transition-all duration-300 text-center"
                          style={{ color: isHovered ? skill.color : 'rgba(255,255,255,0.5)' }}
                        >
                          {skill.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Simple footer note - honest, not bragging */}
        <motion.p
          className="text-center text-white/30 text-sm mt-16 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Always learning, always building. Currently exploring AI/ML integration.
        </motion.p>
      </div>
    </section>
  );
};

export default SkillSections;
