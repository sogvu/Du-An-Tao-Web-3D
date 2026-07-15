import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroText from './components/HeroText';
import BottomCards from './components/BottomCards';
import NavigationControls from './components/NavigationControls';
import ThreeCanvas from './components/ThreeCanvas';
import BookingModal from './components/BookingModal';
import LandmarkDetailModal from './components/LandmarkDetailModal';
import { regions } from './data/regions';
import { Minimize2 } from 'lucide-react';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeLandmarkIndex, setActiveLandmarkIndex] = useState(null);
  
  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeDetailedLandmark, setActiveDetailedLandmark] = useState(null);

  // Autoplay state
  const [isAutoplay, setIsAutoplay] = useState(true);

  const activeRegion = regions[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % regions.length);
    setActiveLandmarkIndex(null);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + regions.length) % regions.length);
    setActiveLandmarkIndex(null);
  };

  // Autoplay Slideshow logic (pauses if zoomed in or any modal is open)
  useEffect(() => {
    if (!isAutoplay || activeLandmarkIndex !== null || isBookingOpen || activeDetailedLandmark !== null) return;

    const interval = setInterval(() => {
      handleNext();
    }, 9000); // 9 seconds

    return () => clearInterval(interval);
  }, [isAutoplay, activeLandmarkIndex, currentIndex, isBookingOpen, activeDetailedLandmark]);

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden bg-gradient-to-br ${activeRegion.gradient} transition-all duration-1000 ease-in-out`}
    >
      {/* Autoplay Progress Countdown Bar */}
      {isAutoplay && activeLandmarkIndex === null && !isBookingOpen && activeDetailedLandmark !== null && (
        <div
          key={currentIndex}
          className="absolute top-0 left-0 h-1.5 bg-gradient-to-r from-amber-400 to-amber-500 z-50 animate-progress opacity-80"
        ></div>
      )}

      {/* 1. Subtle overlay grid texture for premium tech look */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-10 animate-pulse-slow"></div>

      {/* 2. Soft vignette vignette shadow around edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.4)_100%)] pointer-events-none z-10"></div>

      {/* 3. Three.js / React Three Fiber 3D Scene */}
      <ThreeCanvas 
        activeRegion={activeRegion} 
        regions={regions} 
        activeLandmarkIndex={activeLandmarkIndex}
      />

      {/* 4. HTML/Tailwind CSS UI Overlays */}
      <Navbar onBookClick={() => setIsBookingOpen(true)} />

      <HeroText activeRegion={activeRegion} />

      {/* Floating Reset View Button */}
      {activeLandmarkIndex !== null && (
        <button
          onClick={() => setActiveLandmarkIndex(null)}
          className="absolute left-6 md:left-16 bottom-[36%] md:bottom-[32%] z-30 flex items-center gap-2 glass px-4 py-2 rounded-full hover:bg-white hover:text-slate-900 active:scale-95 transition-all duration-300 text-xs font-semibold tracking-wider text-amber-400 border border-amber-400/20 group cursor-pointer"
        >
          <Minimize2 className="w-3.5 h-3.5 group-hover:scale-90 transition-transform duration-300" />
          BACK TO ISLAND VIEW
        </button>
      )}

      {/* Integrated Navigation and Autoplay Controls */}
      <NavigationControls
        onNext={handleNext}
        onPrev={handlePrev}
        currentIndex={currentIndex}
        total={regions.length}
        isAutoplay={isAutoplay}
        onToggleAutoplay={() => setIsAutoplay(!isAutoplay)}
      />

      <BottomCards 
        activeRegion={activeRegion} 
        activeLandmarkIndex={activeLandmarkIndex}
        setActiveLandmarkIndex={setActiveLandmarkIndex}
        onExploreDetail={(landmark) => setActiveDetailedLandmark(landmark)}
      />

      {/* --- POPUP MODALS --- */}
      {/* 1. Trip Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        activeRegion={activeRegion}
        regions={regions}
      />

      {/* 2. Landmark Travel Guide Modal */}
      <LandmarkDetailModal
        isOpen={activeDetailedLandmark !== null}
        onClose={() => setActiveDetailedLandmark(null)}
        landmark={activeDetailedLandmark}
        region={activeRegion}
        onBookTrip={() => setIsBookingOpen(true)}
      />
    </div>
  );
}
