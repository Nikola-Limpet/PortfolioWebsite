import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { styles } from "../styles";
import { certs } from '../data';
import { gsap, ScrollTrigger } from '../utils/gsapUtils';

const CertCard = ({ cert, index }) => {
  return (
    <a
      href={cert.url}
      target="_blank"
      rel="noopener noreferrer"
      className="cert-card group block"
    >
      <div className="relative bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-quaternary/50 transition-all duration-500 hover:-translate-y-3 hover:shadow-xl hover:shadow-quaternary/10">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
          <img
            src={cert.image}
            alt={cert.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {/* Shine effect on hover */}
          <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2 group-hover:text-quaternary transition-colors duration-300">
            {cert.name}
          </h3>
          <div className="flex items-center gap-2 mt-3 text-white/40 text-xs group-hover:text-quaternary/70 transition-colors duration-300">
            <span>View Certificate</span>
            <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
};

const Certifications = () => {
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);

  const visibleCerts = showAll ? certs : certs.slice(0, 4);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title scroll reveal
      gsap.fromTo('.cert-title',
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

      // Staggered card reveal on scroll
      gsap.fromTo('.cert-card',
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.cert-grid',
            start: 'top 85%',
            end: 'top 40%',
            scrub: 1,
          }
        }
      );

      // Decorative line
      gsap.fromTo('.cert-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 35%',
            scrub: 1,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [showAll]);

  return (
    <div className="relative py-20" ref={sectionRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-[#0a1628] to-primary z-0" />

      {/* Decorative blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-quaternary/5 rounded-full blur-[150px]" />

      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="cert-title text-center mb-16">
          <h2 className={`${styles.sectionText} mb-4`}>
            <span className="streaky-glow">Certifications</span>
          </h2>
          <p className="text-white/50 text-lg max-w-md mx-auto">
            Professional credentials validating my expertise
          </p>
          <div className="cert-line h-px bg-gradient-to-r from-transparent via-quaternary to-transparent mt-8 mx-auto max-w-md origin-center" />
        </div>

        {/* Certs Grid */}
        <div className="cert-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {visibleCerts.map((cert, index) => (
            <CertCard key={index} cert={cert} index={index} />
          ))}
        </div>

        {/* Show More/Less Button */}
        {certs.length > 4 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="group px-6 py-3 border border-white/20 text-white/70 rounded-full hover:bg-white/5 hover:border-quaternary/50 hover:text-quaternary transition-all duration-300 text-sm font-medium flex items-center gap-2 mx-auto"
            >
              {showAll ? (
                <>
                  <span>Show Less</span>
                  <svg className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </>
              ) : (
                <>
                  <span>View All {certs.length} Certificates</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Certifications;
