import { SpacemanCanvas } from ".";
import Position from "./Position";

const Hero = ({ scrollContainer }) => {
  return (
    <section className="parallax container relative overflow-hidden">
      <div className='parallax__content absolute top-[90%] w-full mx-auto lg:pl-[38vh] lg:pr-[30vh] xl:pl-96 xl:pr-72 2xl:px-40 3xl:px-60 flex flex-col lg:flex-row items-start z-10'>
        <div className="flex-1 lg:mb-0">
          <h4 className=' text-white font-mono font-medium text-lg pt-20 py-6  '>
            <h3 className='animate-textRotate1 font-light text-6xl pl-4 mb-5 p-3 text-teal-300'> <span className="font-mono text-white text-base">Hi, I'm</span> Nikola. </h3>
            <p className='font-mono text-lg pl-4 text-blue-300'>
             I'm always open to new opportunities and challenges.
            </p>
            <p className='font-mono text-lg pl-4 text-blue-300'> 
             Feel free to reach me anytime
            </p>
            <p className='font-mono text-lg pl-4 py-4 text-blue-300'>
              if you have any questions or want to work with me.
            </p>
          </h4>
          <div className=" p-4 mt-10">
            <Position />
          </div>
        </div>
        <div className="flex-1 flex justify-start lg:justify-end mt-9 sm:mt-14 ml-12  xs:ml-[-4vh] sm:ml-[-17vh] md:ml-[-26vh] lg:mt-10 2xl:mt-0">
          <div className='font-bold mt-36 px-12 py-12 text-[17px] sm:text-[25px] md:text-[36px] xs:top-[330px] xs:pr-3 first-letter: md:mt-12 2xl:text-[20px] sm:leading-[40px] md:leading-[50px] 2xl:leading-[60px] streaky-glow max-w-sm 2xl:max-w-lg text-white text-left'>
           If I fall from the sky, I wonder if I would fall infinitely or reach to the stars.
          </div>
        </div>
      </div>

      <img 
        src='https://assets.codepen.io/296057/fem-comet.jpg'
        alt="hero-bg"
        style={{ filter: 'brightness(0.9)', objectFit: 'cover', width: '100%', height: '100%' }} 
        className="parallax__bg absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      <div className="parallax__b absolute top-24 left-0 w-full h-full z-0" >
        <SpacemanCanvas scrollContainer={scrollContainer} />
      </div>

    </section>
  );
};

export default Hero;