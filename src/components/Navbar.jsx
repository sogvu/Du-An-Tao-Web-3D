import React from 'react';
import { Menu, Compass } from 'lucide-react';

export default function Navbar() {
  const menuItems = ['Home', 'About', 'Explore', 'Tours', 'Gallery'];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-12 md:py-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer group">
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

      {/* Right Button / Action */}
      <div className="flex items-center gap-4">
        <button className="hidden sm:flex items-center gap-2 glass px-5 py-2 rounded-full hover:bg-white hover:text-slate-900 transition-all duration-300 border border-white/10 text-sm font-semibold tracking-wide">
          Book a Trip
        </button>
        <button className="p-2.5 rounded-full glass hover:bg-white/10 active:scale-95 transition-all duration-200">
          <Menu className="w-5 h-5 text-white" />
        </button>
      </div>
    </nav>
  );
}
