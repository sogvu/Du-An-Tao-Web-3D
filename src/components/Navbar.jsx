import React, { useState, useRef } from 'react';
import { Menu, X, Compass, Volume2, VolumeX, PhoneCall } from 'lucide-react';

export default function Navbar({ onBookClick }) {
  const menuItems = ['Home', 'About', 'Explore', 'Tours', 'Gallery'];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.warn("Audio playback blocked by browser security policy. User interaction required.", err);
      });
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-12 md:py-6 flex items-center justify-between">
      {/* Hidden Audio Player for relaxing background music */}
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
        loop
        volume="0.25"
      />

      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer group z-50">
        <Compass className="w-6 h-6 text-amber-400 animate-spin-slow group-hover:rotate-45 transition-transform duration-500" />
        <span className="font-display font-bold text-xl tracking-[0.25em] text-white group-hover:text-amber-300 transition-colors duration-300">
          INDONESIA
        </span>
      </div>

      {/* Center Links - Desktop */}
      <div className="hidden md:flex items-center gap-8 glass-light px-8 py-2.5 rounded-full">
        {menuItems.map((item, index) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className={`font-sans text-sm font-medium tracking-wider text-gray-300 hover:text-white transition-colors duration-300 relative py-1 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-amber-400 after:transition-all after:duration-300 hover:after:w-full ${
              index === 2 ? 'text-amber-400' : ''
            }`}
          >
            {item}
          </a>
        ))}
      </div>

      {/* Right Buttons / Actions */}
      <div className="flex items-center gap-3 z-50">
        {/* Ambient Music Button */}
        <button
          onClick={toggleMusic}
          className="glass px-4 py-2 rounded-full hover:bg-white/10 active:scale-95 transition-all duration-300 border border-white/5 text-white/80 hover:text-white flex items-center gap-2 cursor-pointer"
          aria-label="Toggle Background Music"
        >
          {isMusicPlaying ? (
            <Volume2 className="w-4 h-4 text-amber-400" />
          ) : (
            <VolumeX className="w-4 h-4 text-white/60" />
          )}
          <div className="flex gap-0.5 items-end h-3 w-3 shrink-0">
            <span className={`w-0.5 bg-amber-400 rounded-full transition-all duration-300 ${isMusicPlaying ? 'animate-eq1' : 'h-1'}`}></span>
            <span className={`w-0.5 bg-amber-400 rounded-full transition-all duration-300 ${isMusicPlaying ? 'animate-eq2' : 'h-2.5'}`}></span>
            <span className={`w-0.5 bg-amber-400 rounded-full transition-all duration-300 ${isMusicPlaying ? 'animate-eq3' : 'h-1.5'}`}></span>
          </div>
        </button>

        {/* Book a Trip Button */}
        <button
          onClick={onBookClick}
          className="hidden sm:flex items-center gap-2 glass px-5 py-2 rounded-full hover:bg-white hover:text-slate-900 transition-all duration-300 border border-white/10 text-sm font-semibold tracking-wide cursor-pointer"
        >
          Book a Trip
        </button>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2.5 rounded-full glass hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
        </button>
      </div>

      {/* Mobile Full Screen Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center gap-8 md:hidden transition-all duration-300">
          <div className="flex flex-col items-center gap-6">
            {menuItems.map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-display text-2xl tracking-wider text-gray-300 hover:text-amber-400 transition-all duration-300 ${
                  index === 2 ? 'text-amber-400 font-bold' : ''
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onBookClick();
            }}
            className="mt-6 flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold tracking-wide active:scale-95 transition-all shadow-lg shadow-amber-500/20 text-sm cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 fill-slate-950" />
            Book a Trip Now
          </button>
        </div>
      )}
    </nav>
  );
}
