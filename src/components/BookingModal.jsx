import React, { useState } from 'react';
import { X, Calendar, Users, Send, CheckCircle } from 'lucide-react';

export default function BookingModal({ isOpen, onClose, activeRegion, regions }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    guests: '2',
    region: activeRegion.name,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300">
      <div className="glass max-w-md w-full rounded-3xl p-6 md:p-8 border border-white/10 relative shadow-2xl overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-sky-500/20 rounded-full blur-2xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full glass-light hover:bg-white/15 active:scale-95 transition-all text-white/70 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="mb-6">
              <h3 className="font-display font-bold text-2xl text-white">Book Your Adventure</h3>
              <p className="font-sans text-xs text-gray-400 mt-1">Explore the hidden gems of the Indonesian archipelago</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-amber-400/60 focus:bg-white/10 transition-all font-sans text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-amber-400/60 focus:bg-white/10 transition-all font-sans text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Date of Travel</label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-400/60 focus:bg-white/10 transition-all font-sans text-sm [color-scheme:dark]"
                    />
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Guests</label>
                  <div className="relative">
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-400/60 focus:bg-white/10 transition-all font-sans text-sm appearance-none cursor-pointer"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="6">6+ Guests</option>
                    </select>
                    <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Destination</label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-400/60 focus:bg-white/10 transition-all font-sans text-sm cursor-pointer"
                >
                  {regions.map((r) => (
                    <option key={r.id} value={r.name}>{r.name}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold tracking-wide active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <Send className="w-4 h-4 fill-slate-950" />
                Confirm Booking
              </button>
            </form>
          </>
        ) : (
          <div className="py-6 text-center flex flex-col items-center justify-center">
            <CheckCircle className="w-16 h-16 text-emerald-400 animate-bounce mb-4" />
            <h3 className="font-display font-bold text-2xl text-white">Booking Confirmed!</h3>
            <p className="font-sans text-sm text-gray-300 mt-2 max-w-xs">
              Thank you, <span className="font-semibold text-white">{formData.name}</span>! We have sent a travel itinerary for your trip to <span className="font-semibold text-amber-400">{formData.region}</span> to <span className="text-white underline">{formData.email}</span>.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="mt-6 px-6 py-2.5 rounded-xl glass hover:bg-white/10 text-white text-xs font-semibold tracking-wider transition-all"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
