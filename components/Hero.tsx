
import React from 'react';
import { ViewState } from '../types';

interface HeroProps {
  onNavigate: (view: ViewState) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-cream">
      {/* Background blobs for aesthetic vibe */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blush/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-lavender/30 rounded-full blur-3xl"></div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h2 className="text-blush uppercase tracking-[0.3em] font-medium text-sm mb-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
          Ethically Handmade
        </h2>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-charcoal leading-tight mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Soft on Your Hair. <br />
          <span className="italic text-blush">Strong on Style.</span>
        </h1>
        <p className="text-lg text-charcoal/70 font-light mb-10 max-w-lg mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000">
          Discover our collection of ultra-gentle scrunchies designed to prevent breakage while keeping your style flawless.
        </p>
        <button
          onClick={() => onNavigate(ViewState.SHOP)}
          className="bg-charcoal text-white px-10 py-4 rounded-full hover:bg-blush hover:text-charcoal transition-all duration-300 transform hover:scale-105 font-medium tracking-widest text-sm uppercase shadow-lg animate-in fade-in slide-in-from-bottom-8 duration-1000"
        >
          Shop Now
        </button>
      </div>

      {/* Decorative images floating */}
      <img
        src="https://images.unsplash.com/photo-1620331311520-246422ff83f9?auto=format&fit=crop&q=80&w=400"
        alt=""
        className="hidden lg:block absolute top-20 right-[15%] w-48 h-48 rounded-full object-cover border-4 border-white shadow-xl animate-bounce"
        style={{ animationDuration: '6s' }}
      />
      <img
        src="https://images.unsplash.com/photo-1622325313364-500e5728a50c?auto=format&fit=crop&q=80&w=400"
        alt=""
        className="hidden lg:block absolute bottom-20 left-[15%] w-40 h-40 rounded-full object-cover border-4 border-white shadow-xl animate-bounce"
        style={{ animationDuration: '8s' }}
      />
    </section>
  );
};

export default Hero;
