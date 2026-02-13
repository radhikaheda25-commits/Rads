
import React from 'react';
import { ShoppingBag, Heart, Search, Menu, X } from 'lucide-react';
import { ViewState } from '../types';

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
    { label: 'Our Story', view: ViewState.HOME }, // Simple anchors for this demo
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-blush/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Mobile Menu Toggle */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-charcoal hover:text-blush transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer group" onClick={() => onNavigate(ViewState.HOME)}>
            <h1 className="text-2xl sm:text-3xl font-serif italic text-charcoal group-hover:text-blush transition-colors">
              Luna Loops
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate(item.view)}
                className={`text-sm tracking-widest uppercase font-medium transition-colors ${
                  currentView === item.view ? 'text-blush border-b border-blush' : 'text-charcoal hover:text-blush'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="hidden sm:block p-2 text-charcoal hover:text-blush transition-colors">
              <Search size={22} />
            </button>
            <div className="relative group">
              <button className="p-2 text-charcoal hover:text-blush transition-colors">
                <Heart size={22} />
              </button>
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-blush text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </div>
            <div className="relative group">
              <button
                onClick={onCartToggle}
                className="p-2 text-charcoal hover:text-blush transition-colors flex items-center"
              >
                <ShoppingBag size={22} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-blush text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-blush/20 pb-4 px-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col space-y-4 pt-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  onNavigate(item.view);
                  setIsMenuOpen(false);
                }}
                className="text-left text-lg font-serif text-charcoal hover:text-blush transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
