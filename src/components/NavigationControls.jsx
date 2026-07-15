import React from 'react';
import { ArrowLeft, ArrowRight, Play, Pause } from 'lucide-react';

export default function NavigationControls({
  onNext,
  onPrev,
  currentIndex,
  total,
  isAutoplay,
  onToggleAutoplay
}) {
  return (
    <div className="absolute right-6 md:right-16 top-[45%] md:top-[50%] -translate-y-1/2 z-30 flex flex-col gap-4 select-none items-center">
      {/* Indicator */}
      <div className="text-right font-sans text-xs tracking-[0.25em] text-white/40 mb-1 font-semibold">
        <span className="text-white font-bold">{String(currentIndex + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
      </div>

      {/* Prev Button */}
      <button
        onClick={onPrev}
        className="w-12 h-12 md:w-14 md:h-14 rounded-full glass hover:bg-white hover:text-slate-900 active:scale-95 transition-all duration-300 flex items-center justify-center border border-white/10 group cursor-pointer"
        aria-label="Previous Region"
      >
        <ArrowLeft className="w-5 h-5 text-white group-hover:text-slate-900 transition-colors duration-300" />
      </button>

      {/* Play/Pause Autoplay Button */}
      <button
        onClick={onToggleAutoplay}
        className={`w-10 h-10 md:w-12 md:h-12 rounded-full glass hover:bg-white hover:text-slate-900 active:scale-95 transition-all duration-300 flex items-center justify-center border border-white/10 group cursor-pointer ${
          isAutoplay ? 'text-amber-400 border-amber-400/30' : 'text-white'
        }`}
        aria-label={isAutoplay ? "Pause Autoplay" : "Play Autoplay"}
      >
        {isAutoplay ? (
          <Pause className="w-4 h-4 text-amber-400 group-hover:text-slate-900 transition-colors duration-300" />
        ) : (
          <Play className="w-4 h-4 text-white group-hover:text-slate-900 transition-colors duration-300" />
        )}
      </button>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="w-12 h-12 md:w-14 md:h-14 rounded-full glass hover:bg-white hover:text-slate-900 active:scale-95 transition-all duration-300 flex items-center justify-center border border-white/10 group cursor-pointer"
        aria-label="Next Region"
      >
        <ArrowRight className="w-5 h-5 text-white group-hover:text-slate-900 transition-colors duration-300" />
      </button>
    </div>
  );
}
