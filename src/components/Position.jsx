import React from 'react';

const produceSpans = (text, animation) => {
  return text.split("").map((letter, index) => (
    <span
      key={index}
      className={`inline-block transform-style-3d origin-bottom ${animation}`}
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      {letter === " " ? "\u00A0" : letter}
    </span>
  ));
};

const Position = () => {
  return (
    <div className="relative cursor-default font-medium text-white text-[1rem] xs:text-[12px] sm:text-[30px] md:text-[22px] 2xl:text-[45px] leading-[32px] 2xl:leading-[40px] w-full flex justify-center items-center">
      <div className="absolute inset-0 top-[-60px] md:top-[-10px] sm:top-[-20px] xs:top-[-40px] lg:top-0 flex flex-col">
        <div className="text first absolute left-2 md:left-3 md:top-[-20px] lg:top-[-10px] 2xl:left-4 flex" aria-label="Software Developer">
          {produceSpans("Software Developer", "animate-textRotate1")}
        </div>
      </div>
    </div>
  );
};

export default Position;