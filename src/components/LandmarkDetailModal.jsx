import React from 'react';
import { X, Calendar, Compass, Landmark, ShieldCheck } from 'lucide-react';

export default function LandmarkDetailModal({ isOpen, onClose, landmark, region, onBookTrip }) {
  if (!isOpen || !landmark) return null;

  // Mock travel tips and details depending on the landmark name to make the site feel complete
  const getTravelTips = (name) => {
    switch (name) {
      case "Tangkoeban Parahoe":
        return {
          bestTime: "June - September (Dry Season)",
          fee: "$20 USD (Approx. 300,000 IDR)",
          duration: "3 - 4 Hours",
          tips: "Wear warm clothing as highland winds are cold. Consider wearing a mask to filter the strong sulfur vapors at the main crater."
        };
      case "Kawah Putih":
        return {
          bestTime: "Early Morning (7:00 AM - 9:00 AM) for morning mist",
          fee: "$15 USD (Approx. 220,000 IDR)",
          duration: "2 Hours",
          tips: "Avoid staying near the acid lake shores for more than 30 minutes due to heavy sulfur concentrations. Rent a local shuttle (Ontang-Anting) for easy access."
        };
      case "Raja Ampat":
        return {
          bestTime: "October - April (Calm waters, perfect for diving)",
          fee: "$70 USD Marine Park Entry Permit",
          duration: "5 - 7 Days Recommended",
          tips: "Book local eco-homestays to support island communities. Carry reef-safe sunscreen to protect the fragile marine biodiversity."
        };
      case "Carstensz Pyramid":
        return {
          bestTime: "Dry spells in February or November",
          fee: "$10,000+ USD Expedition Permits & Guides",
          duration: "10 - 14 Days",
          tips: "Extreme high altitude. Requires advanced mountaineering certifications, physical training, and certified local guides (Gore-Tex gear is mandatory)."
        };
      case "Tanjung Puting":
        return {
          bestTime: "July - September (Dry season, active feeding times)",
          fee: "$30 USD (Klotok houseboat tour packages vary)",
          duration: "3 Days / 2 Nights",
          tips: "Hire a traditional Klotok river houseboat. Pack strong insect repellent and light long-sleeved clothing to guard against mosquitoes."
        };
      default:
        return {
          bestTime: "April - October (Dry season)",
          fee: "$5 - $10 USD",
          duration: "Half-day trip",
          tips: "Hire a local guide to learn historical stories. Keep clean, avoid littering, and respect local custom rules."
        };
    }
  };

  const tips = getTravelTips(landmark.name);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300">
      <div className="glass max-w-lg w-full rounded-3xl p-6 md:p-8 border border-white/10 relative shadow-2xl overflow-hidden">
        {/* Top bar */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] text-amber-400 uppercase">{region.name} landmark</span>
            <h3 className="font-display font-bold text-2xl md:text-3xl text-white mt-1">{landmark.name}</h3>
          </div>
          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 rounded-full glass-light hover:bg-white/15 active:scale-95 transition-all text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Detail Card Content */}
        <div className="space-y-6 text-sans">
          {/* Rating / Quick facts */}
          <div className="flex flex-wrap gap-3">
            <span className="glass-light text-xs font-semibold px-3 py-1 rounded-full text-amber-400 flex items-center gap-1">
              ★ {landmark.rating} Rating
            </span>
            <span className="glass-light text-xs font-semibold px-3 py-1 rounded-full text-white/70 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-sky-400" /> {tips.bestTime}
            </span>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              Overview
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed font-light">
              {landmark.desc} This landmark represents the signature geographical and cultural beauty of the region, offering travelers an unforgettable immersion into Indonesia's pristine landscapes and local heritage.
            </p>
          </div>

          {/* Travel details grid */}
          <div className="grid grid-cols-2 gap-4 bg-white/3 p-4 rounded-2xl border border-white/5">
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-white/40">Estimated Fees</span>
              <span className="text-sm font-semibold text-white mt-1 block">{tips.fee}</span>
            </div>
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-white/40">Suggested Stay</span>
              <span className="text-sm font-semibold text-white mt-1 block">{tips.duration}</span>
            </div>
          </div>

          {/* Tips panel */}
          <div className="bg-amber-500/5 p-4 rounded-2xl border border-amber-500/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Travelers' Tips
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed font-light">
              {tips.tips}
            </p>
          </div>

          {/* Book buttons */}
          <div className="flex gap-4 pt-2">
            <button
              onClick={() => {
                onClose();
                onBookTrip();
              }}
              className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold tracking-wide active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 text-sm"
            >
              Book Tour Package
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3.5 rounded-xl glass hover:bg-white/10 text-white text-xs font-semibold tracking-wider transition-all"
            >
              Close Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
