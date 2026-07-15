import React, { useEffect, useRef } from 'react';
import { Star, MapPin, ZoomIn, ZoomOut } from 'lucide-react';
import gsap from 'gsap';

export default function BottomCards({ activeRegion, activeLandmarkIndex, setActiveLandmarkIndex }) {
  const cardsRef = useRef([]);

  useEffect(() => {
    // Reset refs array
    cardsRef.current = cardsRef.current.slice(0, activeRegion.landmarks.length);

    // GSAP Stagger animation for cards
    gsap.fromTo(
      cardsRef.current,
      {
        y: 50,
        opacity: 0,
        scale: 0.95
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        overwrite: 'auto'
      }
    );
  }, [activeRegion.id]);

  const handleCardClick = (index) => {
    if (activeLandmarkIndex === index) {
      setActiveLandmarkIndex(null); // Zoom out if clicked again
    } else {
      setActiveLandmarkIndex(index); // Zoom in on the location
    }
  };

  return (
    <div className="absolute bottom-6 left-6 right-6 md:left-16 md:right-16 z-20 flex flex-col md:flex-row gap-4 items-stretch justify-start select-none">
      {activeRegion.landmarks.map((landmark, index) => {
        const isSelected = activeLandmarkIndex === index;
        return (
          <div
            key={landmark.name}
            ref={(el) => (cardsRef.current[index] = el)}
            onClick={() => handleCardClick(index)}
            className={`glass flex-1 flex flex-col justify-between p-5 rounded-2xl transition-all duration-300 group cursor-pointer border ${
              isSelected
                ? 'border-amber-400 bg-white/15 scale-[1.03] shadow-[0_0_20px_rgba(217,167,76,0.15)]'
                : 'border-white/5 hover:border-white/20 hover:bg-white/10 hover:scale-[1.03]'
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className={`flex items-center gap-1.5 font-display font-semibold text-lg transition-colors duration-300 ${
                isSelected ? 'text-amber-400' : 'text-white group-hover:text-amber-400'
              }`}>
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 animate-bounce" />
                {landmark.name}
              </div>
              <div className="flex items-center gap-1 bg-white/5 px-2.5 py-0.5 rounded-full text-xs font-semibold text-amber-400 border border-white/5 shrink-0">
                <Star className="w-3 h-3 fill-amber-400 stroke-none" />
                {landmark.rating}
              </div>
            </div>

            {/* Description */}
            <p className={`font-sans text-xs font-light leading-relaxed transition-colors duration-300 ${
              isSelected ? 'text-gray-200' : 'text-gray-400 group-hover:text-gray-300'
            }`}>
              {landmark.desc}
            </p>

            {/* Zoom Action Link */}
            <div className={`mt-4 flex items-center justify-between text-xs font-semibold transition-colors duration-300 ${
              isSelected ? 'text-amber-400' : 'text-white/50 group-hover:text-white'
            }`}>
              <span className="flex items-center gap-1">
                {isSelected ? (
                  <>
                    <ZoomOut className="w-3.5 h-3.5" /> Click to zoom out
                  </>
                ) : (
                  <>
                    <ZoomIn className="w-3.5 h-3.5" /> Click to zoom in
                  </>
                )}
              </span>
              <span className="transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300">
                {isSelected ? '←' : '→'}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
