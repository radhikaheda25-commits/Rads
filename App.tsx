import React, { useState, useMemo } from 'react';
import { ViewState, Product, CartItem, FabricType } from './types.ts';
import { PRODUCTS } from './constants.tsx';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import ProductCard from './components/ProductCard.tsx';
import CartDrawer from './components/CartDrawer.tsx';
import About from './components/About.tsx';
import Reviews from './components/Reviews.tsx';
import Newsletter from './components/Newsletter.tsx';
import Gallery from './components/Gallery.tsx';
import { ChevronRight, Filter, ShoppingBag, CreditCard, CheckCircle, ArrowLeft, ShieldCheck, Truck, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState<FabricType | 'All'>('All');

  const SHIPPING_THRESHOLD = 999;
  const SHIPPING_FEE = 99;

  const categoryImages: Record<FabricType, string> = {
    'Satin': 'https://images.unsplash.com/photo-1610134954271-70977d24220b?auto=format&fit=crop&q=80&w=800',
    'Silk': 'https://images.unsplash.com/photo-1606755456206-b25206cde27e?auto=format&fit=crop&q=80&w=800',
    'Velvet': 'https://images.unsplash.com/photo-1594913217401-78240ec86c07?auto=format&fit=crop&q=80&w=800'
  };

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

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

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
  const shippingCost = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shippingCost;

  const filteredProducts = useMemo(() => {
    if (filterCategory === 'All') return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === filterCategory);
  }, [filterCategory]);

  return (
    <div className="min-h-screen selection:bg-blush selection:text-white">
      <div className="bg-blush text-white py-2 px-4 text-center text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold">
        Free Shipping on all orders over ₹{SHIPPING_THRESHOLD} 🌸 code: LUNALOVE
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
          <div className="fade-in">
            <Hero onNavigate={setCurrentView} />
            
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
                      className="group cursor-pointer relative overflow-hidden rounded-[2rem] aspect-[4/5] shadow-lg"
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

            <section className="py-20 bg-cream/20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                  <div className="text-left">
                    <h2 className="text-blush uppercase tracking-[0.3em] font-medium text-sm mb-4">Trending Now</h2>
                    <h3 className="text-3xl sm:text-4xl font-serif text-charcoal">Best Sellers</h3>
                  </div>
                  <button
                    onClick={() => setCurrentView(ViewState.SHOP)}
                    className="mt-6 md:mt-0 text-charcoal border-b-2 border-blush hover:text-blush transition-colors font-bold tracking-widest text-[10px] uppercase py-2"
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
            <Gallery />
            <Reviews />
          </div>
        )}

        {currentView === ViewState.SHOP && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-6 md:space-y-0">
              <h2 className="text-4xl font-serif text-charcoal">All Products</h2>
              <div className="flex items-center space-x-4 overflow-x-auto pb-2 sm:pb-0 w-full md:w-auto px-1">
                <Filter size={18} className="text-charcoal/40 hidden sm:block" />
                {(['All', 'Satin', 'Silk', 'Velvet'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-6 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all whitespace-nowrap ${
                      filterCategory === cat
                        ? 'bg-blush text-white shadow-lg'
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
          </div>
        )}

        {currentView === ViewState.CHECKOUT && (
          <div className="max-w-7xl mx-auto px-4 py-16 fade-in">
            <button
              onClick={() => setCurrentView(ViewState.SHOP)}
              className="flex items-center text-charcoal/40 hover:text-blush mb-12 transition-colors text-xs font-bold tracking-[0.2em] uppercase"
            >
              <ArrowLeft size={16} className="mr-2" /> Back to Boutique
            </button>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Checkout Form */}
              <div className="lg:col-span-7 space-y-12">
                <section>
                  <div className="flex items-center mb-8">
                    <div className="w-10 h-10 bg-blush text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg shadow-blush/20 mr-4">1</div>
                    <h3 className="text-2xl font-serif text-charcoal">Contact Details</h3>
                  </div>
                  <div className="bg-cream/10 p-8 rounded-[2rem] border border-blush/10">
                    <input type="email" placeholder="Email Address" className="w-full px-8 py-5 rounded-2xl bg-white border border-blush/10 focus:outline-none focus:border-blush transition-all" />
                    <div className="mt-4 flex items-center">
                      <input type="checkbox" id="newsletter" className="w-4 h-4 rounded border-blush text-blush focus:ring-blush" defaultChecked />
                      <label htmlFor="newsletter" className="ml-3 text-sm text-charcoal/60">Email me with news and offers</label>
                    </div>
                  </div>
                </section>

                <section>
                  <div className="flex items-center mb-8">
                    <div className="w-10 h-10 bg-blush text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg shadow-blush/20 mr-4">2</div>
                    <h3 className="text-2xl font-serif text-charcoal">Shipping Address</h3>
                  </div>
                  <div className="bg-cream/10 p-8 rounded-[2rem] border border-blush/10 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="First Name" className="px-8 py-5 rounded-2xl bg-white border border-blush/10 focus:outline-none focus:border-blush transition-all" />
                      <input type="text" placeholder="Last Name" className="px-8 py-5 rounded-2xl bg-white border border-blush/10 focus:outline-none focus:border-blush transition-all" />
                    </div>
                    <input type="text" placeholder="Address" className="w-full px-8 py-5 rounded-2xl bg-white border border-blush/10 focus:outline-none focus:border-blush transition-all" />
                    <div className="grid grid-cols-3 gap-4">
                      <input type="text" placeholder="City" className="col-span-1 px-8 py-5 rounded-2xl bg-white border border-blush/10 focus:outline-none focus:border-blush transition-all" />
                      <input type="text" placeholder="State" className="col-span-1 px-8 py-5 rounded-2xl bg-white border border-blush/10 focus:outline-none focus:border-blush transition-all" />
                      <input type="text" placeholder="Zip" className="col-span-1 px-8 py-5 rounded-2xl bg-white border border-blush/10 focus:outline-none focus:border-blush transition-all" />
                    </div>
                  </div>
                </section>

                <section>
                  <div className="flex items-center mb-8">
                    <div className="w-10 h-10 bg-blush text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg shadow-blush/20 mr-4">3</div>
                    <h3 className="text-2xl font-serif text-charcoal">Payment</h3>
                  </div>
                  <div className="bg-cream/10 p-8 rounded-[2rem] border border-blush/10">
                    <div className="flex items-center justify-between mb-8 p-4 bg-white rounded-2xl border border-blush/20">
                      <span className="text-sm font-medium text-charcoal">Credit Card</span>
                      <div className="flex space-x-2">
                        <CreditCard className="text-blush" size={20} />
                      </div>
                    </div>
                    <button className="w-full bg-charcoal text-white py-6 rounded-full font-bold tracking-[0.25em] uppercase hover:bg-blush hover:text-charcoal transition-all duration-300 shadow-2xl flex items-center justify-center space-x-3 group">
                      <span>Complete My Order • ₹{total.toFixed(2)}</span>
                      <CheckCircle className="group-hover:translate-x-1 transition-transform" size={18} />
                    </button>
                  </div>
                </section>
                
                {/* Trust Badges Section */}
                <div className="grid grid-cols-3 gap-4 py-8 border-t border-blush/10">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center mb-3 text-blush">
                      <ShieldCheck size={24} strokeWidth={1.5} />
                    </div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-charcoal/60">Secure SSL Payment</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center mb-3 text-lavender">
                      <Truck size={24} strokeWidth={1.5} />
                    </div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-charcoal/60">Eco-Friendly Shipping</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center mb-3 text-mint">
                      <Sparkles size={24} strokeWidth={1.5} />
                    </div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-charcoal/60">100% Quality Guaranteed</p>
                  </div>
                </div>
              </div>

              {/* Order Summary Sticky Sidebar */}
              <div className="lg:col-span-5">
                <div className="bg-cream/30 rounded-[3rem] p-8 md:p-12 sticky top-32 border border-blush/10 shadow-sm">
                  <h3 className="text-2xl font-serif mb-8 text-charcoal border-b border-blush/10 pb-4">Order Summary</h3>
                  <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto custom-scrollbar pr-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-6">
                        <div className="relative flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-md" />
                          <span className="absolute -top-2 -right-2 bg-blush text-white text-[10px] w-6 h-6 flex items-center justify-center rounded-full font-bold shadow-md border-2 border-white">{item.quantity}</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-serif text-charcoal font-medium">{item.name}</p>
                          <p className="text-[10px] text-blush uppercase tracking-widest font-bold mt-1">{item.category}</p>
                        </div>
                        <p className="font-bold text-charcoal">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-4 pt-8 border-t border-blush/10">
                    <div className="flex justify-between text-sm text-charcoal/60 uppercase tracking-widest font-medium">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-charcoal/60 uppercase tracking-widest font-medium">
                      <span>Shipping</span>
                      <span className={shippingCost === 0 ? "text-mint font-bold" : ""}>
                        {shippingCost === 0 ? "FREE" : `₹${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-6 text-2xl font-serif text-charcoal border-t-2 border-white">
                      <span>Total</span>
                      <span className="font-bold font-serif">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <Newsletter />
      </main>

      <footer className="bg-cream/40 border-t border-blush/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 text-center md:text-left">
            <div>
               <img 
                src="https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/luna-loops-logo.png" 
                alt="Luna Loops Logo" 
                className="h-12 w-auto opacity-40 mx-auto md:mx-0 grayscale hover:grayscale-0 transition-all duration-500"
              />
              <p className="mt-4 text-[10px] text-charcoal/30 uppercase tracking-[0.4em]">Crafting hair-safe jewelry for your crown.</p>
            </div>
            <div className="flex space-x-12">
              <div className="space-y-2">
                <h4 className="text-[10px] text-charcoal uppercase tracking-[0.3em] font-bold">Shop</h4>
                <ul className="text-[10px] text-charcoal/40 uppercase tracking-[0.2em] space-y-1">
                  <li><button onClick={() => {setFilterCategory('Satin'); setCurrentView(ViewState.SHOP);}}>Satin</button></li>
                  <li><button onClick={() => {setFilterCategory('Silk'); setCurrentView(ViewState.SHOP);}}>Silk</button></li>
                  <li><button onClick={() => {setFilterCategory('Velvet'); setCurrentView(ViewState.SHOP);}}>Velvet</button></li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-[10px] text-charcoal uppercase tracking-[0.3em] font-bold">Info</h4>
                <ul className="text-[10px] text-charcoal/40 uppercase tracking-[0.2em] space-y-1">
                  <li><button>Story</button></li>
                  <li><button>Contact</button></li>
                  <li><button>Shipping</button></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-16 text-center text-[9px] text-charcoal/20 uppercase tracking-[0.5em] border-t border-blush/5 pt-8">
            © 2024 Luna Loops • Handcrafted with love • All rights reserved
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;