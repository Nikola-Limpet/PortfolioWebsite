const descriptions = {
  joulhub:
    "Concept artwork: white apartments and a sky-blue glass tower with a pink roof.",
  education:
    "Concept artwork: a pink mathematical arc, blue prism, and white disc.",
  mlc: "Concept artwork: a white learning pavilion with a glass roof and sculptural staircase.",
  alumni: "Concept artwork: interlocking blue glass, pink, and white loops.",
};

export default function ProjectArt({ kind }) {
  return (
    <img
      className="project-art"
      src={`/artwork/${kind}.webp`}
      srcSet={`/artwork/${kind}-small.webp 768w, /artwork/${kind}.webp 1536w`}
      sizes="(max-width: 760px) 100vw, 50vw"
      width="1536"
      height="1024"
      alt={descriptions[kind]}
      loading="lazy"
      decoding="async"
    />
  );
}
