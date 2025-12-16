import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { styles } from "../styles";
import { certs } from '../data';

const CertCard = ({ cert, index }) => {
  return (
    <motion.a
      href={cert.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-quaternary/50 transition-all duration-300 hover:-translate-y-2">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
          <img
            src={cert.image}
            alt={cert.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2 group-hover:text-quaternary transition-colors">
            {cert.name}
          </h3>
          <div className="flex items-center gap-2 mt-3 text-white/40 text-xs">
            <span>View Certificate</span>
            <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </motion.a>
  );
};

const Certifications = () => {
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);

  // Show 4 by default, all when expanded
  const visibleCerts = showAll ? certs : certs.slice(0, 4);

  return (
    <div className="relative py-20" ref={sectionRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-[#0a1628] to-primary z-0" />

      {/* Decorative blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-quaternary/5 rounded-full blur-[150px]" />

      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={`${styles.sectionText} mb-4`}>
            Certifications
          </h2>
          <p className="text-white/50 text-lg max-w-md mx-auto">
            Professional credentials validating my expertise
          </p>
        </motion.div>

        {/* Certs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
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
              className="px-6 py-3 border border-white/20 text-white/70 rounded-lg hover:bg-white/5 hover:border-white/30 transition-all duration-300 text-sm font-medium flex items-center gap-2 mx-auto"
            >
              {showAll ? (
                <>
                  <span>Show Less</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </>
              ) : (
                <>
                  <span>View All {certs.length} Certificates</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
