import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaJs, FaReact, FaNodeJs, FaAws, FaDocker, FaGithub, FaPython } from 'react-icons/fa';
import { SiTypescript, SiExpress, SiMongodb, SiPostgresql, SiNextdotjs, SiTailwindcss, SiHtml5, SiCss3 } from 'react-icons/si';

const SkillSections = () => {
  const [activeTab, setActiveTab] = useState('programming');

  const tabs = [
    { id: 'programming', label: 'Programming Languages' },
    { id: 'web', label: 'Web Technologies' },
    { id: 'cloud', label: 'Cloud & DevOps' },
    { id: 'database', label: 'Database Systems' },
    { id: 'soft', label: 'Soft Skills' },
  ];

  const skills = {
    programming: [
      { name: 'JavaScript', icon: <FaJs size={24} />, level: 90 },
      { name: 'TypeScript', icon: <SiTypescript size={24} />, level: 85 },
      { name: 'Python', icon: <FaPython size={24} />, level: 80 },
    ],
    web: [
      { name: 'React', icon: <FaReact size={24} />, level: 90 },
      { name: 'Next.js', icon: <SiNextdotjs size={24} />, level: 85 },
      { name: 'Node.js', icon: <FaNodeJs size={24} />, level: 85 },
      { name: 'Express', icon: <SiExpress size={24} />, level: 80 },
      { name: 'HTML', icon: <SiHtml5 size={24} />, level: 95 },
      { name: 'CSS', icon: <SiCss3 size={24} />, level: 90 },
      { name: 'Tailwind CSS', icon: <SiTailwindcss size={24} />, level: 90 },
    ],
    cloud: [
      { name: 'AWS', icon: <FaAws size={24} />, level: 75 },
      { name: 'Docker', icon: <FaDocker size={24} />, level: 80 },
      { name: 'GitHub Actions', icon: <FaGithub size={24} />, level: 85 },
    ],
    database: [
      { name: 'MongoDB', icon: <SiMongodb size={24} />, level: 85 },
      { name: 'PostgreSQL', icon: <SiPostgresql size={24} />, level: 80 },
    ],
    soft: [
      { name: 'Communication', level: 95 },
      { name: 'Team Collaboration', level: 90 },
      { name: 'Adaptability', level: 95 },
      { name: 'Problem-solving', level: 90 },
    ],
  };

  // Get skill color based on level
  const getSkillColor = (level) => {
    if (level >= 90) return 'bg-quaternary'; // #1689C8 - highest level
    if (level >= 80) return 'bg-blue-400';
    if (level >= 70) return 'bg-blue-500';
    return 'bg-blue-600';
  };

  // Get icon color based on category
  const getIconColor = (category) => {
    switch(category) {
      case 'programming': return 'text-quaternary'; // JavaScript is yellow but TypeScript is blue
      case 'web': return 'text-cyan-400'; 
      case 'cloud': return 'text-blue-300';
      case 'database': return 'text-green-400';
      case 'soft': return 'text-purple-400';
      default: return 'text-white';
    }
  };
  
  // Get specific color for each programming language icon
  const getLanguageIconColor = (name) => {
    switch(name) {
      case 'JavaScript': return 'text-yellow-400';
      case 'TypeScript': return 'text-blue-500';
      case 'Python': return 'text-green-500';
      default: return getIconColor('programming');
    }
  };

  // Parallax effect ref and state
  const sectionRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll for parallax effect and visibility
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Check if section is visible
        const isInView = rect.top < viewportHeight && rect.bottom > 0;
        setIsVisible(isInView);
        
        if (isInView) {
          setScrollY(window.scrollY);
          
          // Calculate scroll progress through the section (0 to 1)
          const entryPoint = rect.top - viewportHeight;
          const exitPoint = rect.bottom;
          const totalScrollDistance = exitPoint - entryPoint;
          const currentScrollPosition = window.scrollY - entryPoint;
          const progress = Math.min(Math.max(currentScrollPosition / totalScrollDistance, 0), 1);
          setScrollProgress(progress);
        }
      }
    };

    // Add scroll event listener with passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check on mount
    setTimeout(handleScroll, 100); // Small delay to ensure DOM is fully rendered
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 overflow-hidden">
      {/* Base Background - Deep space */}
      <div 
        className="absolute top-0 left-0 w-full h-full"
        style={{ 
          background: 'linear-gradient(to bottom, #011825 0%, #0D3056 100%)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.5s ease-out',
          zIndex: 0
        }} 
      />
      
      {/* Parallax Layer 1 - Stars (slowest movement) */}
      <div 
        className="absolute top-0 left-0 w-full h-full"
        style={{ 
          backgroundImage: 'url("/parallax/1Stars.svg")',
          backgroundSize: 'cover',
          transform: `translateY(${scrollY * 0.01}px) rotate(${scrollProgress * 2}deg)`,
          opacity: isVisible ? Math.min(scrollProgress * 2, 1) : 0,
          transition: 'opacity 0.8s ease-out, transform 0.2s ease-out',
          zIndex: 1
        }}
      />
      
      {/* Parallax Layer 2 - Sun */}
      <div 
        className="absolute top-0 right-0 w-full h-full"
        style={{ 
          backgroundImage: 'url("/parallax/6Sun.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'right top',
          transform: `translateY(${scrollY * 0.02}px) rotate(${scrollProgress * 5}deg)`,
          opacity: isVisible ? Math.min(scrollProgress * 3, 0.9) : 0,
          transition: 'opacity 1s ease-out, transform 0.2s ease-out',
          zIndex: 2
        }}
      />
      
      {/* Parallax Layer 3 - Planets */}
      <div 
        className="absolute top-0 left-0 w-full h-full"
        style={{ 
          backgroundImage: 'url("/parallax/2Planets.svg")',
          backgroundSize: 'cover',
          transform: `translateY(${scrollY * 0.03}px) rotate(${scrollProgress * -3}deg)`,
          opacity: isVisible ? Math.min(scrollProgress * 2.5, 1) : 0,
          transition: 'opacity 1.2s ease-out, transform 0.2s ease-out',
          zIndex: 3
        }}
      />
      
      {/* Parallax Layer 4 - Far Mountains */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-full"
        initial={{ y: 200, opacity: 0 }}
        animate={{ 
          y: isVisible ? scrollY * 0.04 : 200, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ 
          y: { type: 'spring', stiffness: 50, damping: 20, delay: 0.1 },
          opacity: { duration: 0.8, delay: 0.1 }
        }}
        style={{ 
          backgroundImage: 'url("/parallax/3Mountain.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom center',
          zIndex: 4
        }}
      />
      
      {/* Parallax Layer 5 - Close Mountains */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-full"
        initial={{ y: 300, opacity: 0 }}
        animate={{ 
          y: isVisible ? scrollY * 0.05 : 300, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ 
          y: { type: 'spring', stiffness: 40, damping: 15, delay: 0.2 },
          opacity: { duration: 0.8, delay: 0.2 }
        }}
        style={{ 
          backgroundImage: 'url("/parallax/4Mountain.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom center',
          zIndex: 5
        }}
      />
      
      {/* Parallax Layer 6 - Crater/Ground (fastest movement) */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-full"
        initial={{ y: 400, opacity: 0 }}
        animate={{ 
          y: isVisible ? scrollY * 0.06 : 400, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ 
          y: { type: 'spring', stiffness: 30, damping: 10, delay: 0.3 },
          opacity: { duration: 0.8, delay: 0.3 }
        }}
        style={{ 
          backgroundImage: 'url("/parallax/5Crater.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom center',
          zIndex: 6
        }}
      />
      
      {/* Content Container */}
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 pt-8" style={{ zIndex: 20 }}>
        <div className="relative mb-16">
          <motion.div
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-quaternary"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: isVisible ? 80 : 0, opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          />
          <motion.h2 
            className="text-5xl font-bold text-center mb-4 text-white"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -30 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
          >
            <span className="streaky-glow">My Stack</span>
          </motion.h2>
          <motion.div
            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-quaternary"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: isVisible ? 160 : 0, opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </div>
        
        <motion.p 
          className="text-center text-white text-lg mb-16 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Technologies and skills I've mastered throughout my professional journey,
          <br />enabling me to build robust and scalable applications.
        </motion.p>
        
        {/* Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-300 ${activeTab === tab.id 
                ? 'bg-quaternary text-white shadow-lg shadow-quaternary/50' 
                : 'bg-black/60 text-white border border-tertiary/50 hover:border-quaternary/70 hover:bg-black/80'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            key={activeTab} // This forces re-render of motion.div when tab changes
          >
            {skills[activeTab].map((skill, index) => (
              <motion.div 
                key={skill.name}
                className="bg-black/40 backdrop-blur-sm border border-tertiary/30 rounded-lg p-6 hover:border-quaternary/70 transition-all duration-300 shadow-lg shadow-black/50 overflow-hidden relative"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
                transition={{ duration: 0.4, delay: 0.7 + (index * 0.1) }}
                whileHover={{ 
                  y: -5, 
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
                  transition: { duration: 0.2 } 
                }}
              >
                {/* Glowing corner accent */}
                <div className="absolute -top-1 -right-1 w-16 h-16 bg-quaternary/20 rounded-full blur-xl" />
                
                <div className="flex items-center gap-4 mb-5">
                  {skill.icon && (
                    <div className={`text-3xl ${activeTab === 'programming' ? getLanguageIconColor(skill.name) : getIconColor(activeTab)} transition-colors duration-300`}>
                      {skill.icon}
                    </div>
                  )}
                  <h3 className="text-xl font-medium text-white">{skill.name}</h3>
                </div>
                
                <div className="w-full bg-black/50 rounded-full h-3 overflow-hidden">
                  <motion.div 
                    className={`${getSkillColor(skill.level)} h-3 rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.2, delay: 0.9 + (index * 0.1), ease: "easeOut" }}
                  />
                </div>
                <div className="mt-2 text-right text-sm text-white font-medium">
                  {skill.level}%
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SkillSections;