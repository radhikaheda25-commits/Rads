import React from 'react';
import { ViewState } from '../types.ts';

interface HeroProps {
  onNavigate: (view: ViewState) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-cream/40">
      {/* Decorative Blobs */}
      <div className="absolute top-[-15%] right-[-10%] w-[60%] h-[60%] bg-blush/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-lavender/30 rounded-full blur-[100px]"></div>
      
      {/* Brand Watermark Logo Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <img 
          src="https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/luna-loops-logo.png" 
          alt="" 
          className="w-[120%] max-w-none rotate-[-15deg]"
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="inline-block px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-sm border border-blush/20 mb-8">
          <h2 className="text-blush uppercase tracking-[0.4em] font-bold text-[10px]">
            The Art of Gentle Haircare
          </h2>
        </div>
        
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif text-charcoal leading-[1.1] mb-8">
          Soft on Your Hair. <br />
          <span className="italic font-light text-blush drop-shadow-sm">Strong on Style.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-charcoal/60 font-light mb-12 max-w-xl mx-auto leading-relaxed">
          Premium handmade loops crafted with the finest silk and satin to keep your crown beautiful and break-free.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button
            onClick={() => onNavigate(ViewState.SHOP)}
            className="group relative bg-charcoal text-white px-12 py-5 rounded-full hover:bg-blush hover:text-charcoal transition-all duration-500 overflow-hidden font-semibold tracking-[0.2em] text-xs uppercase shadow-2xl"
          >
            <span className="relative z-10">Shop the Collection</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
          </button>
          
          <button
            onClick={() => onNavigate(ViewState.HOME)}
            className="text-charcoal/70 hover:text-blush transition-colors font-semibold tracking-[0.2em] text-xs uppercase border-b border-charcoal/20 hover:border-blush py-1"
          >
            Discover Our Story
          </button>
        </div>
      </div>

      {/* Floating Product Previews */}
      <div className="hidden xl:block absolute top-[25%] right-[10%] w-56 h-72 rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl rotate-6 animate-float">
        <img
          src="https://images.unsplash.com/photo-1606755456206-b25206cde27e?auto=format&fit=crop&q=80&w=600"
          alt="Silk Scrunchie Aesthetic"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="hidden xl:block absolute bottom-[20%] left-[8%] w-48 h-60 rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl -rotate-12 animate-float" style={{ animationDelay: '2s' }}>
        <img
          src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600"
          alt="Handmade Loop Detail"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default Hero;