import { certs } from '../data';

const Cards = ({
  index, 
  name,
  image,
  url,
}) => {
  return (
    <section className='py-8'>
    <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
      <div className='p-6'>
        <div className='mb-4'>
          {/* <div className='text-gray-500 font-medium mb-1'>{name}</div> */}
          <h3 className='text-2xl font-bold text-gray-800'>{name}</h3>
        </div>
        <div className='mb-4 w-[100%] text-gray-700'>
          {image}
        </div>
        <div className='border-t border-gray-400 mb-4'></div>
        <div className='flex flex-col lg:flex-row justify-between items-center'>
          <div className='text-gray-600 mb-3 lg:mb-0'>{url}</div>
          <a
            href='https://google.com'
            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm transition-colors duration-300'
          >
            See Details
          </a>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Cards