import { certs } from '../data';

const Cards = ({
  index, 
  name,
  image,
  url,
}) => {
  return (
    <section className='py-8 px-2'>
      <div className='bg-[#a3a3a3] rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 w-full h-full border border-gray-300'>
        <div className='p-6 my-0'>
          <div className='mb-4'>
            <h4 className='text-xl font-bold text-gray-800'>{name}</h4>
          </div>
          <div className='mb-4 w-full h-52 text-gray-700'>
            <img src={image} alt={name} className='w-full h-full object-cover' />
          </div>
          <div className='border-t border-gray-400 mb-4'></div>
          <div className='flex flex-col lg:flex-row justify-between items-center'>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm transition-colors duration-300'
            >
              See Details
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cards;