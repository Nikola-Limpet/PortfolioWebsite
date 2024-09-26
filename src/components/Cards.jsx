import React from 'react';

const Cards = React.memo(({ name, image, url }) => {
  return (
    <section className='py-8'>
      <div className='bg-[#d1d5db] rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 w-full h-full border border-gray-300'>
        <div className='p-6'>
          <div className='mb-4'>
            <h3 className='text-2xl font-bold text-gray-800'>{name}</h3>
          </div>
          <div className='mb-4 w-full h-48 text-gray-700'>
            <img src={image} alt={name} style={{filter: 'brightness(0.85)'}} className='w-full h-full object-cover' loading="lazy" />
          </div>
          <div className='border-t border-gray-400 mb-4'></div>
          <div className='flex flex-col lg:flex-row justify-between items-center'>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className='bg-blue-500  hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm transition-colors duration-300'
              style={{ width: 'fit-content' }}
            >
              See Details
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Cards;