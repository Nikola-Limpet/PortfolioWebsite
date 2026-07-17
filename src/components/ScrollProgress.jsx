import { useEffect, useRef } from "react";
import { gsap } from "../utils/gsapUtils";

// Thin gradient bar at the very top of the viewport showing scroll progress.
const ScrollProgress = () => {
  const barRef = useRef(null);

  useEffect(() => {
    const tween = gsap.to(barRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        start: 0,
        end: "max",
        scrub: 0.3,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left scale-x-0 bg-gradient-to-r from-quaternary via-cyan-400 to-quaternary shadow-[0_0_8px_rgba(22,137,200,0.6)]"
    />
  );
};

export default ScrollProgress;
