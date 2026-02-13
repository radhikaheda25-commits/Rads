
import React, { useState, useMemo } from 'react';
import { ViewState, Product, CartItem, FabricType } from './types';
import { PRODUCTS } from './constants';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import About from './components/About';
import Reviews from './components/Reviews';
import Newsletter from './components/Newsletter';
import { ChevronRight, Filter, ShoppingBag, CreditCard, CheckCircle, ArrowLeft } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState<FabricType | 'All'>('All');

  const categoryImages: Record<FabricType, string> = {
    'Satin': 'https://images.unsplash.com/photo-1630138222384-5f56f1a8cc39?auto=format&fit=crop&q=80&w=800',
    'Silk': 'https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?auto=format&fit=crop&q=80&w=800',
    'Velvet': 'https://images.unsplash.com/photo-1615396899839-c99c121888b0?auto=format&fit=crop&q=80&w=800'
  };

  // Logic: Add to cart
  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  // Logic: Wishlist toggle
  const toggleWishlist = (id: string) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  // Logic: Cart Update
  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);
  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0), [cartItems]);

  const filteredProducts = useMemo(() => {
    if (filterCategory === 'All') return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === filterCategory);
  }, [filterCategory]);

  return (
    <div className="min-h-screen selection:bg-blush selection:text-white">
      {/* Free Shipping Banner */}
      <div className="bg-blush text-white py-2 px-4 text-center text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold">
        Free Shipping on all orders over $35 🌸 code: LUNALOVE
      </div>

      <Header
        onCartToggle={() => setIsCartOpen(true)}
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onNavigate={setCurrentView}
        currentView={currentView}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setCurrentView(ViewState.CHECKOUT);
        }}
      />

      <main>
        {currentView === ViewState.HOME && (
          <>
            <Hero onNavigate={setCurrentView} />
            
            {/* Featured Collections */}
            <section className="py-20 px-4">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-blush uppercase tracking-[0.3em] font-medium text-sm mb-4">The Collection</h2>
                  <h3 className="text-3xl sm:text-4xl font-serif text-charcoal">Shop by Fabric</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {(['Satin', 'Silk', 'Velvet'] as FabricType[]).map((type) => (
                    <div
                      key={type}
                      onClick={() => {
                        setFilterCategory(type);
                        setCurrentView(ViewState.SHOP);
                      }}
                      className="group cursor-pointer relative overflow-hidden rounded-[2rem] aspect-[4/5]"
                    >
                      <img
                        src={categoryImages[type]}
                        alt={type}
                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-10 left-10 text-white">
                        <h4 className="text-3xl font-serif mb-2">{type}</h4>
                        <div className="flex items-center text-sm uppercase tracking-widest font-medium group-hover:translate-x-2 transition-transform duration-300">
                          Explore <ChevronRight size={16} className="ml-1" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Best Sellers */}
            <section className="py-20 bg-cream/20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                  <div className="text-left">
                    <h2 className="text-blush uppercase tracking-[0.3em] font-medium text-sm mb-4">Trending Now</h2>
                    <h3 className="text-3xl sm:text-4xl font-serif text-charcoal">Best Sellers</h3>
                  </div>
                  <button
                    onClick={() => setCurrentView(ViewState.SHOP)}
                    className="mt-6 md:mt-0 text-charcoal border-b-2 border-blush hover:text-blush transition-colors font-medium tracking-widest text-xs uppercase py-1"
                  >
                    View All Products
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                  {PRODUCTS.filter(p => p.isBestSeller).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={addToCart}
                      onToggleWishlist={toggleWishlist}
                      isWishlisted={wishlist.includes(product.id)}
                    />
                  ))}
                </div>
              </div>
            </section>

            <About />
            <Reviews />
          </>
        )}

        {currentView === ViewState.SHOP && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-6 md:space-y-0">
              <h2 className="text-4xl font-serif text-charcoal">All Products</h2>
              <div className="flex items-center space-x-4 overflow-x-auto pb-2 sm:pb-0 w-full md:w-auto">
                <Filter size={18} className="text-charcoal/40 hidden sm:block" />
                {(['All', 'Satin', 'Silk', 'Velvet'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest font-medium transition-all whitespace-nowrap ${
                      filterCategory === cat
                        ? 'bg-blush text-white shadow-md'
                        : 'bg-white border border-blush/20 text-charcoal hover:border-blush'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                  isWishlisted={wishlist.includes(product.id)}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl font-serif text-charcoal/40 italic">No products found in this category.</p>
                <button
                  onClick={() => setFilterCategory('All')}
                  className="mt-4 text-blush underline underline-offset-4 font-medium"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}

        {currentView === ViewState.CHECKOUT && (
          <div className="max-w-5xl mx-auto px-4 py-16">
            <button
              onClick={() => setCurrentView(ViewState.SHOP)}
              className="flex items-center text-charcoal/60 hover:text-blush mb-8 transition-colors text-sm font-medium tracking-widest uppercase"
            >
              <ArrowLeft size={16} className="mr-2" /> Back to Shop
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Checkout Form */}
              <div className="space-y-10">
                <section>
                  <h3 className="text-2xl font-serif mb-6 flex items-center">
                    <span className="w-8 h-8 bg-blush text-white rounded-full text-xs flex items-center justify-center mr-3 font-sans">1</span>
                    Contact Information
                  </h3>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-6 py-4 rounded-2xl bg-cream/20 border border-blush/20 focus:outline-none focus:border-blush"
                  />
                  <div className="mt-4 flex items-center">
                    <input type="checkbox" id="news" className="mr-2 accent-blush" />
                    <label htmlFor="news" className="text-xs text-charcoal/60">Keep me updated on news and exclusive offers</label>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-serif mb-6 flex items-center">
                    <span className="w-8 h-8 bg-blush text-white rounded-full text-xs flex items-center justify-center mr-3 font-sans">2</span>
                    Shipping Address
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" className="px-6 py-4 rounded-2xl bg-cream/20 border border-blush/20 focus:outline-none focus:border-blush" />
                    <input type="text" placeholder="Last Name" className="px-6 py-4 rounded-2xl bg-cream/20 border border-blush/20 focus:outline-none focus:border-blush" />
                  </div>
                  <input type="text" placeholder="Address" className="w-full mt-4 px-6 py-4 rounded-2xl bg-cream/20 border border-blush/20 focus:outline-none focus:border-blush" />
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <input type="text" placeholder="City" className="px-6 py-4 rounded-2xl bg-cream/20 border border-blush/20 focus:outline-none focus:border-blush" />
                    <input type="text" placeholder="State" className="px-6 py-4 rounded-2xl bg-cream/20 border border-blush/20 focus:outline-none focus:border-blush" />
                    <input type="text" placeholder="Zip" className="px-6 py-4 rounded-2xl bg-cream/20 border border-blush/20 focus:outline-none focus:border-blush" />
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-serif mb-6 flex items-center">
                    <span className="w-8 h-8 bg-blush text-white rounded-full text-xs flex items-center justify-center mr-3 font-sans">3</span>
                    Payment Information
                  </h3>
                  <div className="bg-white border border-blush/20 rounded-2xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <CreditCard size={24} className="text-charcoal/40" />
                      <div className="flex space-x-2">
                        <div className="w-8 h-5 bg-gray-100 rounded"></div>
                        <div className="w-8 h-5 bg-gray-100 rounded"></div>
                        <div className="w-8 h-5 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                    <input type="text" placeholder="Card Number" className="w-full px-6 py-4 rounded-xl bg-cream/10 border border-blush/10 mb-4 focus:outline-none" />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="MM / YY" className="px-6 py-4 rounded-xl bg-cream/10 border border-blush/10 focus:outline-none" />
                      <input type="text" placeholder="CVV" className="px-6 py-4 rounded-xl bg-cream/10 border border-blush/10 focus:outline-none" />
                    </div>
                  </div>
                  <button
                    className="w-full mt-8 bg-charcoal text-white py-5 rounded-full font-bold tracking-widest uppercase hover:bg-blush hover:text-charcoal transition-all shadow-xl"
                  >
                    Complete Order • ${(subtotal + 5).toFixed(2)}
                  </button>
                </section>
              </div>

              {/* Order Summary */}
              <div className="bg-cream/30 rounded-[3rem] p-8 md:p-12 self-start sticky top-28">
                <h3 className="text-2xl font-serif mb-8">Order Summary</h3>
                <div className="space-y-6 mb-8 max-h-80 overflow-y-auto custom-scrollbar pr-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="relative">
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover border border-blush/20" />
                        <span className="absolute -top-2 -right-2 bg-charcoal text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">{item.quantity}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-serif text-charcoal">{item.name}</p>
                        <p className="text-[10px] text-charcoal/40 uppercase tracking-widest">{item.category}</p>
                      </div>
                      <p className="font-medium text-charcoal">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-6 border-t border-blush/20">
                  <div className="flex justify-between text-sm text-charcoal/60">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-charcoal/60">
                    <span>Shipping</span>
                    <span>$5.00</span>
                  </div>
                  <div className="flex justify-between text-xl font-serif text-charcoal pt-4">
                    <span>Total</span>
                    <span>${(subtotal + 5).toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-8 bg-white/50 backdrop-blur-md p-4 rounded-2xl flex items-center text-xs text-charcoal/60">
                  <CheckCircle size={16} className="text-blush mr-2" />
                  Your payment is secured with industry-standard encryption.
                </div>
              </div>
            </div>
          </div>
        )}

        <Newsletter />
      </main>

      {/* Footer */}
      <footer className="bg-cream/40 border-t border-blush/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-serif italic text-charcoal mb-6">Luna Loops</h2>
              <p className="text-sm text-charcoal/50 leading-relaxed font-light">
                Handmade scrunchies that celebrate your hair's natural beauty. Designed in sunny California, loved everywhere.
              </p>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-widest font-bold text-charcoal mb-6">Shop</h4>
              <ul className="space-y-4 text-sm text-charcoal/60">
                <li><button onClick={() => { setFilterCategory('Satin'); setCurrentView(ViewState.SHOP); }} className="hover:text-blush transition-colors">Satin Collection</button></li>
                <li><button onClick={() => { setFilterCategory('Silk'); setCurrentView(ViewState.SHOP); }} className="hover:text-blush transition-colors">Silk Whisper</button></li>
                <li><button onClick={() => { setFilterCategory('Velvet'); setCurrentView(ViewState.SHOP); }} className="hover:text-blush transition-colors">Velvet Cloud</button></li>
                <li><button onClick={() => setCurrentView(ViewState.SHOP)} className="hover:text-blush transition-colors">Best Sellers</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-widest font-bold text-charcoal mb-6">Help</h4>
              <ul className="space-y-4 text-sm text-charcoal/60">
                <li><button className="hover:text-blush transition-colors">Shipping Info</button></li>
                <li><button className="hover:text-blush transition-colors">Returns & Exchanges</button></li>
                <li><button className="hover:text-blush transition-colors">Track Order</button></li>
                <li><button className="hover:text-blush transition-colors">Wholesale</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-widest font-bold text-charcoal mb-6">Follow Us</h4>
              <div className="flex justify-center md:justify-start space-x-6 text-charcoal/60">
                <button className="hover:text-blush transition-colors">Instagram</button>
                <button className="hover:text-blush transition-colors">TikTok</button>
                <button className="hover:text-blush transition-colors">Pinterest</button>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-blush/10 text-center text-[10px] text-charcoal/30 uppercase tracking-[0.3em]">
            © 2024 Luna Loops. All Rights Reserved. Crafted with love.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
