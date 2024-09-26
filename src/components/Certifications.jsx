import React, { useState } from 'react';
import { styles } from "../styles";
import Cards from './Cards';
import { certs } from '../data';

const Certs = () => {
  const [visibleCerts, setVisibleCerts] = useState(certs.slice(0, 3));

  const loadMoreCerts = () => {
    setVisibleCerts(certs.slice(0, visibleCerts.length + 3));
  };

  return (
    <>
      <section className='container text-center m-0 p-0'>
        <h4 className={styles.sectionText}>Certifications</h4>
        <div className='container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 m-0 p-0 justify-center items-center'>
          {visibleCerts.map((cert, index) => (
            <div key={index}>
              <Cards 
                index={index}
                name={cert.name}
                image={cert.image}
                url={cert.url}
              />
            </div>
          ))}
        </div>
      {visibleCerts.length < certs.length && (
        <div className='text-center my-8 max-lg:hidden'>
          <button 
            onClick={loadMoreCerts} 
            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 hover:shadow-lg'
          >
            Load More
          </button>
        </div>
      )}
      </section>
    </>
  );
};

export default Certs;