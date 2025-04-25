import React from 'react';
import { motion } from 'framer-motion';

const Cards = React.memo(({ name, image, url, index }) => {
  return (
    <motion.div 
      className='py-6'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className='bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl transform transition-all duration-300 hover:shadow-quaternary/20 hover:scale-105 border border-tertiary/30 hover:border-quaternary/50 h-full'>
        <div className='relative'>
          <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 z-10'></div>
          <img 
            src={image} 
            alt={name} 
            className='w-full h-48 object-cover transition-transform duration-500 hover:scale-110' 
            loading="lazy" 
          />
        </div>
        
        <div className='p-6 relative'>
          {/* Decorative accent */}
          <div className='absolute top-0 right-0 w-20 h-20 bg-quaternary/10 rounded-full blur-xl -mt-10 -mr-10'></div>
          
          <h3 className='text-xl font-bold text-white mb-4 line-clamp-2 min-h-[3.5rem]'>{name}</h3>
          
          <div className='pt-2 border-t border-white/10'></div>
          
          <div className='mt-4 flex justify-between items-center'>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className='bg-quaternary hover:bg-quaternary/80 text-white px-5 py-2 rounded-md font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-sm flex items-center gap-2'
            >
              <span>View Certificate</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default Cards;