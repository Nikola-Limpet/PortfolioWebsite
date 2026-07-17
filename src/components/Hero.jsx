import { useEffect, useRef } from "react";
import { SpacemanCanvas } from ".";
import Position from "./Position";
import Magnetic from "./Magnetic";
import { gsap, ScrollTrigger } from "../utils/gsapUtils";
import { scrollToSection } from "../utils/smoothScroll";

const Hero = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states explicitly so elements are hidden before GSAP animates
      gsap.set('.hero-tagline', { opacity: 0, y: 20 });
      gsap.set('.hero-stats', { opacity: 0, y: 20 });
      gsap.set('.hero-cta', { opacity: 0, y: 20 });
      gsap.set('.scroll-indicator', { opacity: 0, y: 20 });

      // Timeline for initial layer reveal (on page load)
      const revealTL = gsap.timeline();

      // Reveal layers in order
      revealTL
        .fromTo('.hero-stars',
          { opacity: 0, scale: 1.1 },
          { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }
        )
        .fromTo('.hero-sun',
          { opacity: 0, y: -50 },
          { opacity: 0.9, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.6'
        )
        .fromTo('.hero-planets',
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.5'
        )
        .fromTo('.hero-spaceman',
          { opacity: 0, y: 100 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo('.hero-mountain-far',
          { opacity: 0, y: 100 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.6'
        )
        .fromTo('.hero-mountain-close',
          { opacity: 0, y: 80 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.5'
        )
        .fromTo('.hero-crater',
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.4'
        );

      // Apple-style text reveal - word by word
      const headline = headlineRef.current;
      if (headline) {
        const words = headline.querySelectorAll('.word');
        revealTL.fromTo(words,
          { opacity: 0, y: 40, rotateX: -40 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out'
          },
          '-=0.4'
        );
      }

      // Reveal other content
      revealTL
        .fromTo('.hero-tagline',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo('.hero-stats',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo('.hero-cta',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.2'
        )
        .fromTo('.scroll-indicator',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.2'
        );

      // Continuous Floating Animations
      gsap.to('.hero-planets', {
        y: '-=20',
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.hero-sun', {
        y: '+=15',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.spaceman-floater', {
        y: '+=20',
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Apple-style scroll animations - text moves up faster than background
      gsap.to('.hero-headline-container', {
        y: -200,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '5% top',
          end: '40% top',
          scrub: 1,
        },
      });

      // Parallax layers
      gsap.to('.hero-stars', {
        y: 150,
        rotation: 3,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      gsap.to('.hero-sun', {
        y: -100,
        rotation: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      gsap.to('.hero-planets', {
        y: 200,
        rotation: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.hero-mountain-far', {
        y: 250,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      gsap.to('.hero-mountain-close', {
        y: 350,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      gsap.to('.hero-crater', {
        y: 450,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.3,
        },
      });

      // (Spaceman fall is handled in 3D — position/rotation lerp in Spaceman.jsx —
      // so no DOM translate here; a DOM scrub would fight the depth effect.)

      // Scroll indicator fade
      gsap.to('.scroll-indicator', {
        opacity: 0,
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '3% top',
          end: '10% top',
          scrub: true,
        },
      });

      // Mouse Parallax
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 2;
        const yPos = (clientY / window.innerHeight - 0.5) * 2;

        gsap.to('.hero-stars', { x: xPos * 20, y: yPos * 20, duration: 1, ease: 'power2.out' });
        gsap.to('.hero-sun', { x: xPos * -15, y: yPos * -15, duration: 1, ease: 'power2.out' });
        gsap.to('.hero-planets', { x: xPos * -30, y: yPos * -30, duration: 1, ease: 'power2.out' });
        gsap.to('.hero-mountain-far', { x: xPos * 10, duration: 1, ease: 'power2.out' });
        gsap.to('.hero-mountain-close', { x: xPos * 20, duration: 1, ease: 'power2.out' });
        gsap.to('.hero-crater', { x: xPos * 30, duration: 1, ease: 'power2.out' });
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split text into words for animation
  const AnimatedText = ({ text, className = "" }) => {
    return (
      <span className={className}>
        {text.split(' ').map((word, i) => (
          <span key={i} className="word inline-block" style={{ perspective: '1000px' }}>
            {word}&nbsp;
          </span>
        ))}
      </span>
    );
  };

  return (
    <section ref={sectionRef} className="parallax relative overflow-hidden min-h-screen">
      {/* Base gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, #010d18 0%, #011825 30%, #0D3056 100%)',
          zIndex: 0
        }}
      />

      {/* Parallax Layers */}
      <div
        className="hero-stars absolute inset-0 will-change-transform"
        style={{
          backgroundImage: 'url("/parallax/1Stars.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          opacity: 0,
          zIndex: 1
        }}
      />

      <div
        className="hero-sun absolute inset-0 will-change-transform"
        style={{
          backgroundImage: 'url("/parallax/6Sun.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'right top',
          opacity: 0,
          zIndex: 2
        }}
      />

      <div
        className="hero-planets absolute inset-0 will-change-transform"
        style={{
          backgroundImage: 'url("/parallax/2Planets.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0,
          zIndex: 3
        }}
      />

      <div
        className="hero-mountain-far absolute inset-0 will-change-transform"
        style={{
          backgroundImage: 'url("/parallax/3Mountain.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom center',
          opacity: 0,
          zIndex: 4
        }}
      />

      {/* Spaceman - between mountains */}
      <div className="hero-spaceman absolute inset-0 will-change-transform" style={{ zIndex: 5, opacity: 0 }}>
        <div className="spaceman-floater w-full h-full">
          <SpacemanCanvas />
        </div>
      </div>

      <div
        className="hero-mountain-close absolute inset-0 will-change-transform"
        style={{
          backgroundImage: 'url("/parallax/4Mountain.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom center',
          opacity: 0,
          zIndex: 6
        }}
      />

      <div
        className="hero-crater absolute inset-0 will-change-transform"
        style={{
          backgroundImage: 'url("/parallax/5Crater.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom center',
          opacity: 0,
          zIndex: 7
        }}
      />

      {/* Hero Content - Apple style, left aligned */}
      <div className="hero-headline-container absolute top-[12%] sm:top-[15%] left-0 right-0 px-6 sm:px-12 lg:px-20 z-20">
        <div className="max-w-2xl">
          {/* Main headline with word animation */}
          <div ref={headlineRef} className="mb-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              <AnimatedText text="I'm Nikola." />
              <br />
              <span className="text-quaternary">
                <AnimatedText text="I build products" />
              </span>
              <br />
              <AnimatedText text="that scale." />
            </h1>
          </div>

          {/* Tagline */}
          <p className="hero-tagline text-white/60 text-lg sm:text-xl max-w-lg mb-8 leading-relaxed">
            Full Stack Developer & Team Lead. From freelance projects to leading teams of 5+, I ship scalable web applications that serve thousands of users.
          </p>

          {/* Stats - Apple style minimal */}
          <div className="flex flex-wrap gap-8 sm:gap-12 mb-10">
            <div className="hero-stats">
              <div className="text-3xl sm:text-4xl font-bold text-white">1000+</div>
              <div className="text-white/40 text-sm">Users Served</div>
            </div>
            <div className="hero-stats">
              <div className="text-3xl sm:text-4xl font-bold text-white">5+</div>
              <div className="text-white/40 text-sm">Team Size Led</div>
            </div>
            <div className="hero-stats">
              <div className="text-3xl sm:text-4xl font-bold text-white">2+</div>
              <div className="text-white/40 text-sm">Years Building</div>
            </div>
          </div>

          {/* CTA */}
          <div className="hero-cta flex flex-wrap gap-4">
            <Magnetic>
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); scrollToSection('#projects'); }}
                className="group px-7 py-4 bg-white text-primary font-semibold rounded-full transition-shadow duration-300 hover:shadow-xl hover:shadow-white/20 flex items-center gap-2"
              >
                <span>See My Work</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
                className="block px-7 py-4 border border-white/30 text-white font-semibold rounded-full transition-colors duration-300 hover:bg-white/10 hover:border-white/50"
              >
                Let's Talk
              </a>
            </Magnetic>
          </div>

          <div className="mt-8">
            <Position />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-white/40 text-xs font-mono tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent relative">
          <div className="absolute top-0 left-0 w-full h-4 bg-white animate-pulse" style={{ animation: 'scrollPulse 1.5s ease-in-out infinite' }} />
        </div>
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(32px); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
