import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { styles } from "../styles";
import Cards from './Cards';
import { certs } from '../data';
import { fadeIn, textVariant } from "../utils/motion";

const Certs = () => {
  const [visibleCerts, setVisibleCerts] = useState(certs.slice(0, 3));
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const loadMoreCerts = () => {
    setVisibleCerts(certs.slice(0, visibleCerts.length + 3));
  };

  return (
    <div className="relative py-16" ref={sectionRef}>
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-primary z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-quaternary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-quaternary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="relative mb-16 text-center">
          <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-quaternary"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: isVisible ? 80 : 0, opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          />
          <motion.h2 
            className={`${styles.sectionText} relative inline-block`}
            variants={textVariant()}
          >
            Certifications
          </motion.h2>
          <motion.div
            className="w-48 h-1 bg-quaternary/30 mx-auto mt-6"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: isVisible ? 192 : 0, opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </div>
        
        {/* Description */}
        <motion.p 
          variants={fadeIn("up", "spring", 0.2, 0.8)}
          className="text-white/80 text-lg max-w-2xl mx-auto text-center mb-16"
        >
          Professional certifications that validate my expertise and commitment to continuous learning in the field of software development.
        </motion.p>

        {/* Certification Cards Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {visibleCerts.map((cert, index) => (
            <Cards 
              key={index}
              index={index}
              name={cert.name}
              image={cert.image}
              url={cert.url}
            />
          ))}
        </div>

        {/* Load More Button */}
        {visibleCerts.length < certs.length && (
          <motion.div 
            className='text-center mt-16'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <button 
              onClick={loadMoreCerts} 
              className='bg-quaternary hover:bg-quaternary/80 text-white px-6 py-3 rounded-md font-medium transition-all duration-300 hover:shadow-lg hover:shadow-quaternary/30 hover:-translate-y-1 flex items-center gap-2 mx-auto'
            >
              <span>Load More</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Certs;