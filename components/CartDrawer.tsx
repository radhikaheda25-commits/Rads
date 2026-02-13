import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types.ts';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove, onCheckout }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const SHIPPING_THRESHOLD = 999;
  const shippingCost = (subtotal >= SHIPPING_THRESHOLD || subtotal === 0) ? 0 : 99;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transition-transform duration-500 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-blush/20 flex justify-between items-center bg-cream/30">
            <h2 className="text-xl font-serif text-charcoal font-semibold">Your Cart ({items.length})</h2>
            <button onClick={onClose} className="p-2 text-charcoal hover:text-blush transition-colors rounded-full hover:bg-white/50">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-blush/20 rounded-full blur-2xl animate-pulse"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400" 
                    alt="Empty Cart Aesthetic" 
                    className="relative w-48 h-48 object-cover rounded-full border-4 border-white shadow-xl"
                  />
                </div>
                <h3 className="text-2xl font-serif mb-3 text-charcoal">Your bag is empty</h3>
                <p className="text-charcoal/50 text-sm mb-8 max-w-[240px]">
                  Looks like you haven't found your perfect loop yet. Let's change that!
                </p>
                <button
                  onClick={onClose}
                  className="bg-charcoal text-white px-10 py-4 rounded-full hover:bg-blush hover:text-charcoal transition-all duration-300 uppercase tracking-widest text-xs font-bold shadow-lg"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex space-x-4 group">
                    <div className="w-24 h-32 overflow-hidden rounded-xl bg-cream border border-blush/10">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-serif text-charcoal font-medium">{item.name}</h4>
                          <p className="text-[10px] text-blush uppercase tracking-widest font-bold mt-1">{item.category}</p>
                        </div>
                        <button onClick={() => onRemove(item.id)} className="text-xs text-charcoal/30 hover:text-red-400 p-1">
                          <X size={14} />
                        </button>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="flex items-center border border-blush/20 rounded-full px-1.5 py-0.5 bg-white">
                          <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-1 hover:text-blush transition-colors" disabled={item.quantity <= 1}><Minus size={12} /></button>
                          <span className="mx-2 text-xs font-semibold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-1 hover:text-blush transition-colors"><Plus size={12} /></button>
                        </div>
                        <span className="font-serif text-charcoal font-bold">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t border-blush/20 bg-cream/20">
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal/50">Subtotal</span>
                  <span className="text-charcoal font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal/50">Shipping</span>
                  <span className={shippingCost === 0 ? "text-mint font-bold uppercase tracking-widest text-[10px]" : "text-charcoal font-medium"}>
                    {shippingCost === 0 ? "FREE" : `₹${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-blush/10">
                  <span className="text-charcoal font-serif font-bold text-lg">Estimated Total</span>
                  <span className="font-serif text-charcoal font-bold text-xl">₹{(subtotal + shippingCost).toFixed(2)}</span>
                </div>
              </div>
              <button onClick={onCheckout} className="w-full bg-charcoal text-white py-5 rounded-full font-bold tracking-[0.2em] text-xs uppercase hover:bg-blush hover:text-charcoal transition-all duration-300 shadow-xl group">
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;