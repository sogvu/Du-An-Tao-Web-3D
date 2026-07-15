import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroText({ activeRegion }) {
  const containerRef = useRef(null);
  const numberRef = useRef(null);
  const titleRef = useRef(null);
  const taglineRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    // GSAP Transition on activeRegion change
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Initial state setup before animation
    tl.to(
      [numberRef.current, titleRef.current, taglineRef.current, descRef.current],
      {
        y: -15,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
      }
    );

    // Fade-in new text
    tl.fromTo(
      [numberRef.current, titleRef.current, taglineRef.current, descRef.current],
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
      },
      "-=0.1" // start slightly before previous completes
    );

    return () => {
      tl.kill();
    };
  }, [activeRegion.id]);

  return (
    <div
      ref={containerRef}
      className="absolute left-6 md:left-16 top-[22%] md:top-[28%] max-w-lg z-20 select-none pointer-events-none"
    >
      {/* Number */}
      <div
        ref={numberRef}
        className="font-sans font-bold text-4xl md:text-5xl text-white/20 tracking-wider mb-2"
      >
        {activeRegion.id}
      </div>

      {/* Main Title */}
      <h1
        ref={titleRef}
        className="font-display font-bold text-5xl md:text-8xl text-white tracking-wide uppercase leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] mb-3"
      >
        {activeRegion.name}
      </h1>

      {/* Tagline */}
      <div
        ref={taglineRef}
        className={`font-sans font-semibold text-xs md:text-sm tracking-[0.2em] uppercase mb-4 ${activeRegion.textColor}`}
      >
        {activeRegion.tagline}
      </div>

      {/* Description */}
      <p
        ref={descRef}
        className="font-sans text-sm md:text-base text-gray-300 leading-relaxed font-light drop-shadow-md pr-4"
      >
        {activeRegion.description}
      </p>
    </div>
  );
}
