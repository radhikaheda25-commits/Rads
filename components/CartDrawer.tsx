
import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

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

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transition-transform duration-500 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-blush/20 flex justify-between items-center bg-cream/30">
            <h2 className="text-xl font-serif text-charcoal">Your Cart ({items.length})</h2>
            <button onClick={onClose} className="p-2 text-charcoal hover:text-blush transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-blush/20 rounded-full flex items-center justify-center mb-4 text-blush">
                  <ShoppingBag size={40} />
                </div>
                <h3 className="text-lg font-serif mb-2">Your cart is empty</h3>
                <p className="text-charcoal/60 text-sm mb-6">Looks like you haven't added anything yet!</p>
                <button
                  onClick={onClose}
                  className="bg-charcoal text-white px-8 py-3 rounded-full hover:bg-blush transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-32 object-cover rounded-lg bg-cream"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-serif text-charcoal">{item.name}</h4>
                          <button
                            onClick={() => onRemove(item.id)}
                            className="text-xs text-charcoal/40 hover:text-red-400 underline underline-offset-4"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="text-xs text-charcoal/60 mt-1">{item.category} • {item.color}</p>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="flex items-center border border-blush/30 rounded-full px-2 py-1">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 text-charcoal hover:text-blush disabled:opacity-30"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="mx-3 text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 text-charcoal hover:text-blush"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-medium text-charcoal">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-blush/20 bg-cream/10">
              <div className="flex justify-between mb-4">
                <span className="text-charcoal/70">Subtotal</span>
                <span className="font-bold text-charcoal text-lg">${subtotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-center text-charcoal/50 mb-6">
                Shipping and taxes calculated at checkout.
              </p>
              <button
                onClick={onCheckout}
                className="w-full bg-charcoal text-white py-4 rounded-full font-medium tracking-widest text-sm uppercase hover:bg-blush hover:text-charcoal transition-all duration-300 shadow-lg"
              >
                Checkout Now
              </button>
              <button
                onClick={onClose}
                className="w-full mt-4 text-sm text-charcoal/60 hover:text-charcoal transition-colors underline underline-offset-4"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
