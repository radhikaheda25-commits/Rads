import React from 'react';
import { ShoppingBag, Heart, Search, Menu, X } from 'lucide-react';
import { ViewState } from '../types.ts';

interface HeaderProps {
  onCartToggle: () => void;
  cartCount: number;
  onNavigate: (view: ViewState) => void;
  currentView: ViewState;
  wishlistCount: number;
}

const Header: React.FC<HeaderProps> = ({ onCartToggle, cartCount, onNavigate, currentView, wishlistCount }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { label: 'Home', view: ViewState.HOME },
    { label: 'Shop All', view: ViewState.SHOP },
    { label: 'Our Story', view: ViewState.HOME },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-blush/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 sm:h-24">
          
          {/* Mobile Menu Toggle */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-charcoal hover:text-blush transition-colors">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation Left */}
          <div className="hidden md:flex flex-1 space-x-8">
            {navItems.slice(0, 2).map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate(item.view)}
                className={`text-[10px] tracking-[0.2em] uppercase font-semibold transition-all duration-300 ${
                  currentView === item.view ? 'text-blush border-b-2 border-blush pb-1' : 'text-charcoal/60 hover:text-blush'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Logo Center */}
          <div className="flex-shrink-0 cursor-pointer flex justify-center" onClick={() => onNavigate(ViewState.HOME)}>
            <img 
              src="https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/luna-loops-logo.png" 
              alt="Luna Loops Logo" 
              className="h-12 sm:h-16 w-auto animate-float object-contain"
              onError={(e) => {
                // Fallback if image fails to load
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = '<h1 class="text-2xl font-serif italic text-charcoal">Luna Loops</h1>';
              }}
            />
          </div>

          {/* Desktop Navigation Right + Icons */}
          <div className="flex flex-1 justify-end items-center space-x-2 sm:space-x-6">
            <div className="hidden lg:flex space-x-8 mr-8">
              <button
                onClick={() => onNavigate(ViewState.HOME)}
                className="text-[10px] tracking-[0.2em] uppercase font-semibold text-charcoal/60 hover:text-blush transition-all duration-300"
              >
                Our Story
              </button>
            </div>
            
            <button className="hidden sm:block p-2 text-charcoal hover:text-blush transition-colors">
              <Search size={20} strokeWidth={1.5} />
            </button>
            
            <div className="relative">
              <button className="p-2 text-charcoal hover:text-blush transition-colors">
                <Heart size={20} strokeWidth={1.5} />
              </button>
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-blush text-white text-[9px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </div>

            <div className="relative">
              <button onClick={onCartToggle} className="p-2 text-charcoal hover:text-blush transition-colors flex items-center">
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-blush text-white text-[9px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Sidebar (Simplified) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-blush/10 p-4 space-y-4 animate-in slide-in-from-top duration-300">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                onNavigate(item.view);
                setIsMenuOpen(false);
              }}
              className="block w-full text-left text-sm uppercase tracking-widest text-charcoal font-medium py-2"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Header;