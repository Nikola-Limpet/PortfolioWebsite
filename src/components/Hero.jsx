import { useEffect, useRef } from "react";
import Position from "./Position";
import Magnetic from "./Magnetic";
import { gsap } from "../utils/gsapUtils";
import { scrollToSection } from "../utils/smoothScroll";

const Hero = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.hero-tagline', { opacity: 0, y: 20 });
      gsap.set('.hero-stats', { opacity: 0, y: 20 });
      gsap.set('.hero-cta', { opacity: 0, y: 20 });
      gsap.set('.scroll-indicator', { opacity: 0, y: 20 });
      gsap.set('.hero-mission-tag', { opacity: 0, y: 10 });

      const revealTL = gsap.timeline({ delay: 0.2 });

      revealTL.fromTo('.hero-mission-tag',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );

      // Word-by-word headline reveal
      const headline = headlineRef.current;
      if (headline) {
        const words = headline.querySelectorAll('.word');
        revealTL.fromTo(words,
          { opacity: 0, y: 40, rotateX: -40 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' },
          '-=0.2'
        );
      }

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

      // Text lifts away and fades as the ship departs
      gsap.to('.hero-headline-container', {
        y: -180,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '5% top',
          end: '45% top',
          scrub: 1,
        },
      });

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* Hero content over the 3D world */}
      <div className="hero-headline-container absolute top-[16%] sm:top-[18%] left-0 right-0 px-6 sm:px-12 lg:px-20 z-20">
        <div className="max-w-2xl">
          {/* Mission tag */}
          <p className="hero-mission-tag text-quaternary/80 text-xs font-mono tracking-[0.3em] uppercase mb-6">
            ● Mission 001 — Departure
          </p>

          {/* Main headline */}
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

          {/* Stats */}
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
                <span>Begin the Journey</span>
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
        <span className="text-white/40 text-xs font-mono tracking-widest uppercase">Scroll to fly</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent relative">
          <div className="absolute top-0 left-0 w-full h-4 bg-white" style={{ animation: 'scrollPulse 1.5s ease-in-out infinite' }} />
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
