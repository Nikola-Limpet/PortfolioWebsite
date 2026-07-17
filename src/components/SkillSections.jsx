import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaJs, FaReact, FaNodeJs, FaAws, FaDocker, FaGithub, FaPython } from 'react-icons/fa';
import { SiTypescript, SiExpress, SiMongodb, SiPostgresql, SiNextdotjs, SiTailwindcss, SiHtml5, SiCss3, SiRedis, SiNestjs } from 'react-icons/si';
import { gsap, ScrollTrigger } from '../utils/gsapUtils';
import { styles } from '../styles';

const SkillSections = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const sectionRef = useRef(null);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title scroll reveal
      gsap.fromTo('.skill-title',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          }
        }
      );

      // Staggered card reveal
      gsap.fromTo('.skill-card',
        { opacity: 0, y: 40, rotateX: -5 },
        {
          opacity: 1, y: 0, rotateX: 0,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.skill-grid',
            start: 'top 85%',
            end: 'top 40%',
            scrub: 1,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden py-24">
      {/* Content */}
      <div className={`${styles.sectionContainer} relative z-20`}>
        {/* Header */}
        <div className="skill-title text-center mb-20">
          <h2 className={`${styles.sectionText} mb-4`}>
            <span className="streaky-glow">Tech Stack</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto font-light">
            Tools I use to build scalable web applications
          </p>
        </div>

        {/* Skill Categories Grid */}
        <div className="skill-grid grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto" style={{ perspective: '1000px' }}>
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className="skill-card"
            >
              <div className={`${styles.glassCard} p-8 h-full`}>
                {/* Category Header */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2 font-display">{category.title}</h3>
                  <p className="text-white/30 text-sm">{category.description}</p>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-3 gap-4">
                  {category.skills.map((skill) => {
                    const IconComponent = skill.icon;
                    const isHovered = hoveredSkill === `${category.title}-${skill.name}`;

                    return (
                      <motion.div
                        key={skill.name}
                        className="relative flex flex-col items-center gap-2.5 p-3 rounded-xl cursor-pointer"
                        onMouseEnter={() => setHoveredSkill(`${category.title}-${skill.name}`)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        whileHover={{ scale: 1.1, y: -4 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        {/* Glow on hover */}
                        <motion.div
                          className="absolute inset-0 rounded-xl"
                          style={{ backgroundColor: skill.color }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isHovered ? 0.12 : 0 }}
                          transition={{ duration: 0.3 }}
                        />

                        {/* Icon */}
                        <div
                          className="relative z-10 transition-all duration-300"
                          style={{ color: isHovered ? skill.color : 'rgba(255,255,255,0.5)' }}
                        >
                          <IconComponent size={28} />
                        </div>

                        {/* Name */}
                        <span
                          className="relative z-10 text-xs font-medium transition-all duration-300 text-center"
                          style={{ color: isHovered ? skill.color : 'rgba(255,255,255,0.4)' }}
                        >
                          {skill.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          className="text-center text-white/20 text-sm mt-16 max-w-md mx-auto font-light"
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
